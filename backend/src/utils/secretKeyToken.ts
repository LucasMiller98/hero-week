export function secretKeyToken() {

  const secretKey: string | undefined = process.env.ACCESS_TOKEN_SECRET_KEY

  if(!secretKey) {
    throw new Error('Token is missing')
  }

  return secretKey
}