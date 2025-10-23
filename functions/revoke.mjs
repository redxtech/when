import { revokeHandler, response } from './utils/auth.mjs'

export default async req => {
  if (req.httpMethod === 'OPTIONS') {
    return response
  }

  const { token } = await req.json()

  try {
    await revokeHandler(token)

		return new Response(
			JSON.stringify({ status: 'success' }),
			response
		)
  } catch (err) {
		return new Response(
			JSON.stringify({ status: 'failed', error: err }),
			{
				status: 400,
				headers: response.headers
			}
		)
  }
}

