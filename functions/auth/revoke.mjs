import { revokeHandler, mkResponse } from './utils/auth.mjs'

export async function onRequest(ctx) {
	if (ctx.request.httpMethod === 'OPTIONS') {
		return mkResponse(ctx)
	}

	const { token } = await ctx.request.json()

	try {
		await revokeHandler(ctx, token)

		return new Response(JSON.stringify({ status: 'success' }), mkResponse(ctx))
	} catch (err) {
		return new Response(JSON.stringify({ status: 'failed', error: err }), {
			status: 400,
			headers: mkResponse(ctx).headers
		})
	}
}
