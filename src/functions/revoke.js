import { revokeHandler, response } from './utils/auth.js'

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return response
  }

  const { token } = JSON.parse(event.body)

  try {
    await revokeHandler(token)

    return {
      ...response,
      body: JSON.stringify(
        {
          status: 'success'
        },
        null,
        2
      )
    }
  } catch (err) {
    return {
      statusCode: 400,
      headers: response.headers,
      body: JSON.stringify(
        {
          status: 'failed',
          error: err
        },
        null,
        2
      )
    }
  }
}
