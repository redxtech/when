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
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}
