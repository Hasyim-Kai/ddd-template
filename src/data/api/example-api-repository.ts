import { ExampleRepository } from "@domain/repositories/example-repository";
import { api } from "./_api";
import { Example, IExampleProps } from "@domain/models/example";

export class ExampleApiRepository implements ExampleRepository {
  async get(): Promise<IExampleProps> {
    try {
      const { data } = await api.get(`web/example`, {});
      return Example.create({
        id: data.data.id,
        name: data.data.name,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
}
