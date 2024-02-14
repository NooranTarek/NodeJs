// eslint-disable-next-line import/prefer-default-export
export class handleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
