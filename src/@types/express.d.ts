
// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    account: {
      name: string
      email: string
    }
  }
}
