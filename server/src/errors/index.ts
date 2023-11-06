// validation error
export class ValidationError extends Error {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

// not found error
export class NotFoundError extends Error {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}
