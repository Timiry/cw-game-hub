export class HubError extends Error {
  status: number | string;

  constructor(init: { status: number | string }) {
    super();
    this.status = init.status;
  }
}