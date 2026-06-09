declare module 'b-validate' {
  /* eslint-disable @typescript-eslint/no-explicit-any -- library declarations inherently use any for generic validation shapes */
  interface ValidateMessages {
    [key: string]: any;
  }

  type ValidateCallback = (errors?: Record<string, any>) => void;

  interface SchemaOptions {
    ignoreEmptyString?: boolean;
    validateMessages?: Record<string, any>;
  }

  class Schema {
    constructor(rules: Record<string, any[]>, options?: SchemaOptions);
    validate(data: Record<string, any>, callback: ValidateCallback): void;
  }

  const DefaultValidateMessage: ValidateMessages;

  export { DefaultValidateMessage, Schema };
  export type { ValidateCallback, SchemaOptions };
}
