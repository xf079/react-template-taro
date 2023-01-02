declare namespace IRequest {
  type Options = {
    url: string;
  };
  type BeforeHookItem = (_options: Options) => Promise<Options>;
  type AfterHookItem = (_options: Options) => Promise<Options>;
}
