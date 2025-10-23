import { exchangeHandler, response } from './utils/auth.mjs'

export default async req => {
  if (req.httpMethod === 'OPTIONS') {
    return response
  }

  const { code } = await req.json()

  try {
    const auth = await exchangeHandler(code)

    return new Response(
      JSON.stringify({ status: 'success', auth }),
			response
    )
  } catch (err) {
    return new Response(
			JSON.stringify({ status: 'failed', error: err }),
			{
				status: 401,
				headers: response.headers
			}
		)
  }
}
