const post = (endpoint, body) => fetch(`https://api.trakt.tv/oauth/${endpoint}`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		...body,
		client_id: process.env.VITE_TRAKT_API_KEY,
		client_secret: process.env.TRAKT_API_SECRET
	})
}).then(res => res.json())


export const exchangeHandler = async code => {
  try {
    return post(
      'token',
      {
        code,
        redirect_uri: process.env.VITE_ORIGIN,
        grant_type: 'authorization_code',
      }
    )
  } catch (err) {
		console.error('error in exchangeHandler:', err)
    return {
      access_token: undefined,
      refresh_token: undefined
    }
  }
}

export const refreshHandler = async refresh => {
  try {
    return post(
      'token',
      {
        refresh_token: refresh,
        redirect_uri: process.env.VITE_ORIGIN,
        grant_type: 'refresh_token',
      }
    )
  } catch (err) {
		console.error('error in refreshHandler:', err)
    return {
      access_token: undefined,
      refresh_token: undefined
    }
  }
}

export const revokeHandler = async token => {
  try {
		return post(
		  'revoke',
		  { token }
		)
  } catch (err) {
		console.error('error in revokeHandler:', err)
    return {
      access_token: undefined,
      refresh_token: undefined
    }
  }
}

export const response = {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': process.env.VITE_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

