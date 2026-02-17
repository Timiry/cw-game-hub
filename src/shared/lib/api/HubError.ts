export class HubError extends Error {
  status: number | string;

  constructor(init: { status: number | string; message: string }) {
    super();
    this.status = init.status;
    this.message = init.message;
  }
}
