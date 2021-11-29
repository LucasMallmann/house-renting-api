export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized Server Error')
    this.name = 'UnauthorizedError'
  }
}
