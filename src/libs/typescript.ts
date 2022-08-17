// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DropFirstParameter<T extends (...args: any) => any> = Parameters<T> extends [unknown, ...infer U]
  ? U
  : never
