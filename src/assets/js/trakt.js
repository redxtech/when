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
    this.status = status
  }
}

export default class TraktAPI {
  api_key
  origin
  server
  endpoint

  constructor(
    api_key,
    origin,
    server = origin,
    endpoint = '/.netlify/functions/'
  ) {
    // initialize the instance with the api key
    this.api_key = api_key
    this.origin = origin
    this.server = server
    this.endpoint = endpoint
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

  async get({
    path,
    extended = false,
    token = false,
    status = [200, 201, 204, 401, 403, 404]
  }) {
    return bent(
      'https://api.trakt.tv',
      'GET',
      'json',
      this.createHeaders(token),
      status
    )(`${path}${extended ? '?extended=full' : ''}`)
  }

  // function to make a post request to the trakt api
  async post({ path, token, body, status = [200, 201, 204, 401, 403, 404] }) {
    return bent(
      `https://api.trakt.tv`,
      'POST',
      'json',
      status
    )(path, body, this.createHeaders(token))
  }

  // function to make a post request to the oauth endpoints
  async postServer(path, body) {
    return bent(
      `${this.server}${this.endpoint}`,
      'POST',
      'json',
      200
    )(path, body)
  }

  // function to get a show's summary with optional extended info
  async getShow(id, extended = false) {
    try {
      return this.get({
        path: `/shows/${id}`,
        extended
      })
    } catch (err) {
      throw new TraktError(err, 'getShow', { id, extended }, err.statusCode)
    }
  }

  async getNextEpisode(id) {
    try {
      return this.get({
        path: `/shows/${id}/next_episode`,
        extended: true
      })
    } catch (err) {
      throw new TraktError(err, 'getNextEpisode', { id }, err.statusCode)
    }
  }

  async getUserLists(token) {
    try {
      return this.get({ path: '/users/me/lists', token })
    } catch (err) {
      throw new TraktError(
        err,
        'getUserLists',
        { token: '[redacted]' },
        err.statusCode
      )
    }
  }

  async getUserWhenListItems(token) {
    try {
      return this.get({
        path: '/users/me/lists/when/items/shows',
        token
      })
    } catch (err) {
      throw new TraktError(
        err,
        'getUserWhenListItems',
        { token: '[redacted]' },
        err.statusCode
      )
    }
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

  async getDefaultListItems() {
    try {
      return this.get({
        path: '/users/redxtech/lists/default-when-list/items/shows'
      })
    } catch (err) {
      throw new TraktError(err, 'getDefaultWhenListItems', {}, err.statusCode)
    }
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
      throw new TraktError(
        err,
        'getOAuthToken',
        { code: '[redacted]' },
        err.statusCode
      )
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
      throw new TraktError(
        err,
        'refreshOAuthToken',
        { refresh: '[redacted]' },
        err.statusCode
      )
    }
  }

  async revokeOAuthToken(token) {
    try {
      return this.postServer('revoke', { token })
    } catch (err) {
      throw new TraktError(
        err,
        'revokeOAuthToken',
        { token: '[redacted]' },
        err.statusCode
      )
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
