class Request {
  constructor() {}

  beforeHooks: IRequest.BeforeHookItem[] = [];
  afterHooks: IRequest.AfterHookItem = [];

  send() {}

  readCache() {}
  writeCache() {}
  execBeforeHook() {}
  execAfterHook() {}
  registerHook(type) {
    console.log(this.beforeHooks);
    console.log(type);
  }
}
