import dotenv from 'dotenv'
dotenv.config()

export const config = {
  mongo: {
    url: process.env.MONGO_URL
  },
  github: {
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  jwt: {
    privateKey: process.env.PRIVATE_KEY_TOKEN
  },
  admin: {
    email: process.env.USER_EMAIL_ADMIN,
    password: process.env.USER_PASSWORD_ADMIN
  }
}
