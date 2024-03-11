export class KassandraError extends Error {
  constructor(errorMsg: string) {
    super(errorMsg)
  }
}
