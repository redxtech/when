import bent from 'bent'

export default class TraktAPI {
  // private fields
  api_key
  origin
  server

  constructor(api_key) {
    // initialize the instance with the api key
    this.api_key = api_key
    this.origin = import.meta.env.VITE_ORIGIN
    this.server = import.meta.env.VITE_SERVER
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

  get({ path, extended = false, token = false, status = 200 }) {
    try {
      return bent(
        'https://api.trakt.tv',
        'GET',
        'json',
        this.createHeaders(token),
        status
      )(`${path}${extended ? '?extended=full' : ''}`)
    } catch (err) {
      throw new Error(`GET request to ${path} failed (token=${!!token}).`)
    }
  }

  post({ path, token, body, status = 200 }) {
    try {
      return bent(
        `https://api.trakt.tv`,
        'POST',
        'json',
        status
      )(path, body, this.createHeaders(token))
    } catch (err) {
      throw new Error(`POST request to ${path} failed.`)
    }
  }

  postServer(path, body) {
    return bent(
      `${this.server}/.netlify/functions/`,
      'POST',
      'json',
      200
    )(path, body)
  }

  getShow(id) {
    return this.get({ path: `/shows/${id}` })
  }

  getNextEpisode(id) {
    return this.get({ path: `/shows/${id}/next_episode`, extended: true })
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
        auth: { access_token, refresh_token }
      } = await this.postServer('exchange', { code })

      return {
        token: access_token,
        refresh: refresh_token
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
        auth: { access_token, refresh_token }
      } = await this.postServer('refresh', { refresh_token: refresh })

      return {
        token: access_token,
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
    // noinspection JSUnresolvedVariable
    return lists.some(list => list.ids.slug === 'when' && list.name === 'when.')
  }
}
