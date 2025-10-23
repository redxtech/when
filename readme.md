# when.

>when. is a website that tells you when tv shows & movies are coming out - to the second.

## setup

```bash
npm install
npm run dev

# only run vite (no netlify functions)
npm run develop
```

### env vars

- `TRAKT_API_SECRET`: trakt client secret (required)
- `VITE_TRAKT_API_KEY`: trakt client id (required)
- `VITE_ENDPOINT`: netlify functions endpoint (default: `/.netlify/functions`)
- `VITE_ORIGIN`: website url for oauth redirect (default: `http://localhost:8888`)
- `VITE_SERVER`: url for functions server (default: `http://localhost:8888`)
- `VITE_TMDB_KEY`: tmdb api key (required)
