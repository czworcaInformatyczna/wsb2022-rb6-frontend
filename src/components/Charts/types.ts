export interface IChart<T, S> {
  config?: Partial<S>;
  data: T[];
}
