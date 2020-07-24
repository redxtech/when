exports.handler = async event => {
  // noinspection JSUnresolvedVariable
  const subject = event.queryStringParameters.name || 'World'
  return {
    statusCode: 200,
    body: `Hello ${subject}!`
  }
}
