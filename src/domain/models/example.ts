import { Entity } from "./_entity";

export interface IExampleProps {
  id: string;
  name: string;
}

export interface IExample {
  unmarshall(): IExampleProps;
}

export class Example extends Entity<IExampleProps> {
  static create(props: IExampleProps): Example {
    return new Example(props);
  }

  unmarshall(): IExampleProps {
    return {
      id: this._props.id,
      name: this._props.name,
    };
  }

  get id(): string {
    return this._props.id;
  }
  get name(): string {
    return this._props.name;
  }
}
