import { refreshHandler, mkResponse } from './utils/auth.mjs'

export async function onRequest(ctx) {
	if (ctx.request.httpMethod === 'OPTIONS') {
		return mkResponse(ctx)
	}

	const { refresh_token: token } = await ctx.request.json()

	try {
		const auth = await refreshHandler(ctx, token)

		return new Response(
			JSON.stringify({ status: 'success', auth }),
			mkResponse(ctx)
		)
	} catch (err) {
		return new Response(JSON.stringify({ status: 'failed', error: err }), {
			status: 401,
			headers: mkResponse(ctx).headers
		})
	}
}
