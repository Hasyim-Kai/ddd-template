import { v4 as uuid } from "uuid";

export interface IEntityProps {
  id?: string;
}

export interface IEntity<TProps> {
  _props: TProps & IEntityProps;
  id: string;
}

export class Entity<TProps> implements IEntity<TProps> {
  private _id: string;
  public _props: TProps & IEntityProps;
  constructor(props: TProps & IEntityProps) {
    this._props = props;
    this._id = this._props.id || uuid();
  }
  get id(): string {
    return this._id;
  }
}
