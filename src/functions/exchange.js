import { exchange, response } from './utils/auth.js'

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return response
  }

  const { code } = JSON.parse(event.body)

  try {
    const auth = await exchange(code)

    return {
      ...response,
      body: JSON.stringify(
        {
          status: 'success',
          auth
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
