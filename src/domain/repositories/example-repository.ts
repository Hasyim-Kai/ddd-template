import { IExampleProps } from "@domain/models/example";

export interface ExampleRepository {
  get(): Promise<IExampleProps>;
}
