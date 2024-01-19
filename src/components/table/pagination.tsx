import { NewPaginatedData } from "@domain/models/paginated-data";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
  dataState: NewPaginatedData<any>
  setDataState: any
}

export default function Pagination({ dataState, setDataState }: Props) {
  const onDataPerPageLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDataState(NewPaginatedData.create<any>({ ...dataState, pagination: { ...dataState.pagination, limit: Number(event.target.value) }, }))
  }

  const onFirstPage = () => {
    setDataState(NewPaginatedData.create<any>({ ...dataState, pagination: { ...dataState.pagination, page: 1 }, }))
  }

  const onPreviousPage = () => {
    setDataState(NewPaginatedData.create<any>({ ...dataState, pagination: { ...dataState.pagination, page: dataState.pagination.page - 1 }, }))
  }

  const onNextPage = () => {
    setDataState(NewPaginatedData.create<any>({ ...dataState, pagination: { ...dataState.pagination, page: dataState.pagination.page + 1 }, }))
  }

  const onLastPage = () => {
    setDataState(NewPaginatedData.create<any>({ ...dataState, pagination: { ...dataState.pagination, page: dataState.pagination.totalPages }, }))
  }

  return <div className="mt-3 w-full h-[57px] flex items-center justify-between">
    <span className="text-gray-400">{dataState.data.length} of {dataState.pagination.totalRows} row(s) selected.</span>
    <div className="flex items-center gap-[32px]">
      <div className="flex items-center gap-3">
        <span>Limit</span>
        <select onChange={onDataPerPageLimitChange}
          className="border bg-white h-[42px] px-1 rounded-md">
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <span>Page {dataState.pagination.page} of {dataState.pagination.totalPages}</span>
      <div className="flex items-center gap-2">
        <button onClick={onFirstPage}
          className="w-[32px] h-[32px] border rounded-md bg-white flex items-center justify-center">
          <ChevronsLeft color="black" />
        </button>
        <button onClick={onPreviousPage}
          disabled={dataState.pagination.page === 1}
          className="w-[32px] h-[32px] border rounded-md bg-white flex items-center justify-center">
          <ChevronLeft color="black" />
        </button>
        <button onClick={onNextPage}
          disabled={dataState.pagination.page === dataState.pagination.totalPages}
          className="w-[32px] h-[32px] border rounded-md bg-white flex items-center justify-center">
          <ChevronRight color="black" />
        </button>
        <button onClick={onLastPage}
          className="w-[32px] h-[32px] border rounded-md bg-white flex items-center justify-center">
          <ChevronsRight color="black" />
        </button>
      </div>
    </div>
  </div>
}
