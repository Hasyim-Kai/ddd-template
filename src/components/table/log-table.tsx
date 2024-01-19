import Loading from "@components/loading/loading";
import useGlobalHooks from "@hooks/global-hooks";
import { SearchIcon, ArrowDown, ArrowUp, ArrowLeft } from "lucide-react";
import Pagination from "./pagination";
import { Dispatch, SetStateAction } from "react";
import { NewPaginatedData } from "@domain/models/paginated-data";

interface Props {
    title: string
    tabCol: { name: string, label: string, }[]
    tabSortOrderHandler: Function
    sortType: string
    orderBy: string
    isLoading: boolean
    logData: NewPaginatedData<any>
    setLogData: Dispatch<SetStateAction<NewPaginatedData<any>>>
    isWithPagination?: boolean
    isWithBackBtn?: boolean
}

export default function LogTable({ title, tabCol, tabSortOrderHandler, sortType, orderBy, isLoading, logData, setLogData, isWithPagination = true, isWithBackBtn = true }: Props) {
    const globalModel = useGlobalHooks()
    return <section className="flex flex-col gap-[28px] justify-between">
        <div className="rounded-lg border border-[#D0D3D9] bg-white p-8">
            {/* TEXT HEAD */}
            <div className="w-full flex items-center justify-between">
                <div>
                    <span className="text-2xl text-[#514E4E] font-bold ">Log {title}</span>
                    <p className="text-[#667085]">History of data changes</p>
                </div>
                {isWithBackBtn && <button
                    className="flex items-center gap-2 text-sm h-[46px] px-[20px] border text-red-500 border-red-500 rounded-xl"
                    onClick={() => globalModel.navigate(-1)}>
                    <ArrowLeft color="red" size={16} />
                    <span className="font-semibold">Back</span>
                </button>}
            </div>

            {/* SEARCH */}
            <div className="my-5 flex items-center justify-between py-[8px] px-[12px] bg-[#F0F1F3] rounded">
                <div className={`bg-white h-[32px] px-[18px] flex items-center gap-[16px] rounded-lg border-2`}>
                    <SearchIcon color="grey" />
                    <input
                        type="text"
                        name="search"
                        placeholder="search"
                        className="bg-transparent w-full h-full outline-none"
                        onChange={globalModel.handleSearch}
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="rounded-lg border overflow-hidden">
                {isLoading
                    ? <Loading />
                    : <table className="w-full rounded-full border">
                        <thead className="bg-gray-100 h-[48px] text-sm border-b border-[#D0D3D9]">
                            <tr className="">
                                {/* TABLE COLUMN */}
                                {tabCol.map((item) => <th className="px-3 font-normal text-start" key={item.name}>
                                    <button className="flex items-center gap-2"
                                        onClick={() => tabSortOrderHandler(item.name)}>
                                        <span>{item.label}</span>
                                        {sortType === `DESC` && orderBy === item.name
                                            ? <ArrowDown size={14} />
                                            : <ArrowUp size={14} />}
                                    </button>
                                </th>)}
                            </tr>
                        </thead>
                        <tbody className="text-sm text-[#514E4E]">
                            {logData.data.map((item) => <tr className="border-b border-[#D0D3D9] h-[64px]" key={item.id}>
                                {tabCol.map((tabItem) => <td className="px-3 ">{item[tabItem.name]}</td>)}
                            </tr>)}
                        </tbody>
                    </table>}
            </div>

            {/* NAVIGATOIN */}
            {isWithPagination && <Pagination dataState={logData} setDataState={setLogData} />}

        </div>
    </section>
}