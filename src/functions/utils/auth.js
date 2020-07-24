import bent from 'bent'
import { config } from 'dotenv'

config()

const post = bent('POST', 'json', 'https://api.trakt.tv/oauth/', 200)

const body = {
  client_id: process.env.VITE_TRAKT_API_KEY,
  client_secret: process.env.TRAKT_API_SECRET
}

const headers = {
  'Content-Type': 'application/json'
}

export const exchange = async code => {
  try {
    return post(
      'token',
      {
        code,
        redirect_uri: process.env.VITE_ORIGIN,
        grant_type: 'authorization_code',
        ...body
      },
      headers
    )
  } catch (err) {
    return {
      access_token: undefined,
      refresh_token: undefined,
      expires_in: undefined
    }
  }
}

export const refresh = async refresh_token => {
  try {
    return post(
      'token',
      {
        refresh_token,
        redirect_uri: process.env.VITE_ORIGIN,
        grant_type: 'refresh_token',
        ...body
      },
      headers
    )
  } catch (err) {
    return {
      access_token: undefined,
      refresh_token: undefined,
      expires_in: undefined
    }
  }
}

export const revoke = async token => {
  return post(
    'revoke',
    {
      token,
      ...body
    },
    headers
  )
}

export const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': process.env.VITE_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}
