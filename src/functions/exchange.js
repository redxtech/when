import { exchange } from './utils/auth.js'

exports.handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      await exchange(event.queryStringParameters.code),
      null,
      2
    )
  }
}
