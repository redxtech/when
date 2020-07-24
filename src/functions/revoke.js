import { revoke } from './utils/auth.js'

exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      await revoke(event.queryStringParameters.token),
      null,
      2
    )
  }
}
