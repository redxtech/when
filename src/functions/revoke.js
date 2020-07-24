import { revoke, response } from './utils/auth.js'

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return response
  }

  const { token } = JSON.parse(event.body)

  try {
    const revoked = await revoke(token)

    return {
      ...response,
      body: JSON.stringify(
        {
          status: 'success',
          revoked
        },
        null,
        2
      )
    }
  } catch (err) {
    return {
      statusCode: 500,
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
