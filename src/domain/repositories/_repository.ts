export type getParam = {
  q?: string | undefined | null;
  limit: number | undefined;
  page: number | undefined;
  orderBy?: string;
  sortType?: `ASC` | `DESC`;
};

export type getFilterBearingFactory = {
  date: string;
  bearingType: string;
  factoryId: string;
  buildingId?: string | undefined;
};

export type getFilterDateShift = {
  date: string;
  shift: string;
};

export type getFilterDateBearing = {
  date: string;
  bearingType: string;
};

export interface IRepository<T> {
  get(param?: getParam): Promise<T[]>;
  create(props: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
