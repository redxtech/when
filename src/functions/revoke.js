import { corsHeaders, revoke } from './utils/auth.js'

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    }
  }

  const { token } = JSON.parse(event.body)

  return {
    statusCode: 200,
    body: JSON.stringify(await revoke(token), null, 2)
  }
}
