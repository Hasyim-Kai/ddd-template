
export interface IPaginationProps {
    page: number
    limit: number
    totalRows: number
    currentRowsCount: number
    totalPages: number
    nextPage: number
    prevPage: number
}
export interface INewPaginatedData<T> {
    q?: string;
    pagination: IPaginationProps
    data: T[];
}

export class NewPaginatedData<T> {
    q?: string;
    pagination: IPaginationProps;
    data: T[];

    constructor(props: INewPaginatedData<T>) {
        this.q = props.q;
        this.pagination = props.pagination;
        this.data = props.data;
    }

    static create<T>(props: INewPaginatedData<T>) {
        return new NewPaginatedData<T>(props);
    }

    unmarshall() {
        return {
            q: this.q,
            pagination: this.pagination,
            data: this.data,
        };
    }

    duplicate(): NewPaginatedData<T> {
        return NewPaginatedData.create<T>(this.unmarshall());
    }
}

export interface IPaginatedData<T> {
    q?: string;
    page: number;
    limit: number;
    search: string
    totalRows: number
    currentRows: number
    totalPages: number
    nextPage: number
    prevPage: number
    data: T[];
}

export class PaginatedData<T> {
    q?: string;
    page: number;
    limit: number;
    search: string
    totalRows: number
    currentRows: number
    totalPages: number
    nextPage: number
    prevPage: number
    data: T[];

    constructor(props: IPaginatedData<T>) {
        this.q = props.q;
        this.page = props.page;
        this.limit = props.limit;
        this.search = props.search;
        this.totalRows = props.totalRows;
        this.currentRows = props.currentRows;
        this.totalPages = props.totalPages;
        this.nextPage = props.nextPage;
        this.prevPage = props.prevPage;
        this.data = props.data;
    }

    static create<T>(props: IPaginatedData<T>) {
        return new PaginatedData<T>(props);
    }

    // next(): PaginatedData<T> {
    //     if (this.lastPage < this.page) {
    //         this.page++;
    //     }
    //     return this;
    // }

    prev(): PaginatedData<T> {
        if (this.page > 1) {
            this.page--;
        }
        return this;
    }

    unmarshall() {
        return {
            q: this.q,
            page: this.page,
            limit: this.limit,
            search: this.search,
            totalRows: this.totalRows,
            currentRows: this.currentRows,
            totalPages: this.totalPages,
            nextPage: this.nextPage,
            prevPage: this.prevPage,
            data: this.data,
        };
    }

    duplicate(): PaginatedData<T> {
        return PaginatedData.create<T>(this.unmarshall());
    }
}