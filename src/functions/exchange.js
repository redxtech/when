import { exchange, corsHeaders } from './utils/auth.js'

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    }
  }

  const { code } = JSON.parse(event.body)

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(await exchange(code), null, 2)
  }
}
