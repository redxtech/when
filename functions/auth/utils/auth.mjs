const post = (endpoint, body) =>
	fetch(`https://api.trakt.tv/oauth/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'when-sh/0.0.0'
		},
		body: JSON.stringify(body)
	}).then(res => res.json())

const mkBody = ctx => {
	return {
		client_id: ctx.env.VITE_TRAKT_API_KEY,
		client_secret: ctx.env.TRAKT_API_SECRET
	}
}

export const exchangeHandler = async (ctx, code) => {
	try {
		return post('token', {
			code,
			redirect_uri: ctx.env.VITE_ORIGIN,
			grant_type: 'authorization_code',
			...mkBody(ctx)
		})
	} catch (err) {
		console.error('error in exchangeHandler:', err)
		return {
			access_token: undefined,
			refresh_token: undefined
		}
	}
}

export const refreshHandler = async (ctx, refresh) => {
	try {
		return post('token', {
			refresh_token: refresh,
			redirect_uri: ctx.env.VITE_ORIGIN,
			grant_type: 'refresh_token',
			...mkBody(ctx)
		})
	} catch (err) {
		console.error('error in refreshHandler:', err)
		return {
			access_token: undefined,
			refresh_token: undefined
		}
	}
}

export const revokeHandler = async (ctx, token) => {
	try {
		return post('revoke', {
			token,
			...mkBody(ctx)
		})
	} catch (err) {
		console.error('error in revokeHandler:', err)
		return {
			access_token: undefined,
			refresh_token: undefined
		}
	}
}

export const mkResponse = ctx => {
	return {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': ctx.env.VITE_ORIGIN,
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	}
}
