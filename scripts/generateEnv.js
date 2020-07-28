const { resolve } = require('path')
const { writeFileSync } = require('fs')
require('dotenv').config()

const main = () => {
  const {
    VITE_TRAKT_API_KEY,
    TRAKT_API_SECRET,
    VITE_TMDB_KEY,
    VITE_ORIGIN,
    VITE_SERVER,
    VITE_ENDPOINT
  } = process.env

  const variables = {
    VITE_TRAKT_API_KEY,
    TRAKT_API_SECRET,
    VITE_TMDB_KEY,
    VITE_ORIGIN,
    VITE_SERVER,
    VITE_ENDPOINT
  }

  const content = Object.keys(variables)
    .map(key => `${key}=${variables[key]}`)
    .join('\n')

  const envFile = resolve(process.cwd(), '.env')

  writeFileSync(envFile, content)
}

main()
