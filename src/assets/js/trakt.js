import bent from 'bent'

// TODO: wrap most functions with error handlers

class TraktError extends Error {
  constructor(err, resource, params = {}, status) {
    super(
      `${resource}(${Object.keys(params)
        .map(key => `${key}: ${params[key]}`)
        .join(', ')})${status ? ` [${status}]` : ''} failed: ${err}`
    )

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TraktError)
    }

    this.name = 'TraktError'
  }
}

export default class TraktAPI {
  api_key
  origin
  server

  constructor(api_key, origin, server = origin) {
    // initialize the instance with the api key
    this.api_key = api_key
    this.origin = origin
    this.server = server
  }

  createHeaders(token = false) {
    // create the default headers
    const headers = {
      'Content-Type': 'application/json',
      'trakt-api-key': this.api_key,
      'trakt-api-version': '2'
    }

    // add an oauth header if a token is supplied
    if (token) headers['Authorization'] = `Bearer ${token}`

    // return the completed headers object
    return headers
  }

  async get({ path, extended = false, token = false, status = [] }) {
    return bent(
      'https://api.trakt.tv',
      'GET',
      'json',
      this.createHeaders(token),
      ...[200, 201, 204, 401, 403, 404, ...status]
    )(`${path}${extended ? '?extended=full' : ''}`)
  }

  // function to make a post request to the trakt api
  async post({ path, token, body, status = [] }) {
    return bent(
      `https://api.trakt.tv`,
      'POST',
      'json',
      ...[200, 201, 204, 401, 403, 404, ...status]
    )(path, body, this.createHeaders(token))
  }

  // function to make a post request to the oauth endpoints
  async postServer(path, body) {
    return bent(
      `${this.server}/.netlify/functions/`,
      'POST',
      'json',
      200
    )(path, body)
  }

  getShow(id, extended = false) {
    return this.get({ path: `/shows/${id}`, extended })
  }

  async getNextEpisode(id) {
    try {
      return await this.get({
        path: `/shows/${id}/next_episode`,
        extended: true
      })
    } catch (err) {
      return {
        title: undefined,
        first_aired: undefined,
        season: undefined,
        number: undefined
      }
    }
  }

  getUserLists(token) {
    return this.get({ path: '/users/me/lists', token })
  }

  getUserWhenListItems(token) {
    return this.get({
      path: '/users/me/lists/when/items/shows',
      token
    })
  }

  createUserWhenList(token) {
    return this.post({
      path: '/users/me/lists',
      token,
      body: {
        name: 'when.',
        description: 'List of shows to track on when. by @RedXTech.'
      },
      status: 201
    })
  }

  addShowToUserWhenList(token, id) {
    return this.post({
      path: '/users/me/lists/when/items',
      token,
      body: { shows: [{ ids: { slug: id } }] },
      status: 201
    })
  }

  removeShowFromUserWhenList(token, id) {
    return this.post({
      path: '/users/me/lists/when/items/remove',
      token,
      body: { shows: [{ ids: { slug: id } }] }
    })
  }

  getDefaultListItems() {
    return this.get({
      path: '/users/redxtech/lists/default-when-list/items/shows'
    })
  }

  getOAuthURL() {
    return `https://trakt.tv/oauth/authorize?response_type=code&client_id=${this.api_key}&redirect_uri=${this.origin}`
  }

  async getOAuthToken(code) {
    try {
      const {
        auth: { access_token: token, refresh_token: refresh }
      } = await this.postServer('exchange', { code })

      return {
        token,
        refresh
      }
    } catch (err) {
      return {
        token: undefined,
        refresh: undefined
      }
    }
  }

  async refreshOAuthToken(refresh) {
    try {
      const {
        auth: { access_token: token, refresh_token }
      } = await this.postServer('refresh', { refresh_token: refresh })

      return {
        token,
        refresh: refresh_token
      }
    } catch (err) {
      return {
        token: undefined,
        refresh: undefined
      }
    }
  }

  async revokeOAuthToken(token) {
    try {
      return this.postServer('revoke', { token })
    } catch (err) {
      return {
        status: 'failed'
      }
    }
  }

  async checkOAuthToken(token) {
    try {
      await this.get({ path: '/users/me', token })
      return true
    } catch (e) {
      return false
    }
  }

  userHasWhenList(lists) {
    return lists.some(list => list.ids.slug === 'when' && list.name === 'when.')
  }
}
