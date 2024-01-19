import { Toggle } from "@components/inputs/Toggle";
import useUser from "./_user-view-model";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import ModalConfirm from "@components/modals/ModalConfirm";
import ModalDelete from "@components/modals/ModalDelete";
import ModalSuccess from "@components/modals/ModalSuccess";
import { Plus, Search, PlusCircle, Eye, Pencil, Trash, ArrowUp, ArrowDown } from "lucide-react";
import Loading from "@components/loading/loading";
import Pagination from "@components/table/pagination";
import useGlobalHooks from "@hooks/global-hooks";

export default function UserView() {
    const userModel = useUser();
    const globalModel = useGlobalHooks();
    const tableColumn = [
        { name: `status`, label: `Status`, },
        { name: `name`, label: `Name`, },
        { name: `email`, label: `Email`, },
        { name: `role`, label: `Role`, },
    ]

    return (
        <main className="flex flex-col gap-[28px] justify-between">
            <ModalDelete
                open={userModel.openModalDelete}
                setOpen={userModel.setOpenModalDelete}
                cb={userModel.onDelete}
            />
            <ModalConfirm
                isLoading={userModel.isLoading}
                open={userModel.openModalConfirm}
                setOpen={userModel.setOpenModalConfirm}
                cb={() => { }} />
            <ModalSuccess
                open={userModel.openModalSuccess}
                setOpen={userModel.setOpenModalSuccess}
            />
            <Breadcrumbs data={[
                {
                    name: `User`,
                    link: `User`,
                },
            ]}
            />

            <div className="rounded border border-[#D0D3D9] bg-white p-8">
                {/* TEXT HEAD */}
                <div className="w-full flex items-center justify-between">
                    <div>
                        <span className="text-2xl text-[#514E4E] font-bold ">User Account</span>
                        <p className="text-[#667085]">Management account & access</p>
                    </div>
                    <button
                        className="flex items-center gap-2 h-[46px] px-[20px] bg-red-500 rounded-xl"
                        onClick={() => userModel.navigate("create")}>
                        <Plus color="white" size={16} />
                        <span className="text-white text-sm font-semibold">Create New User</span>
                    </button>
                </div>

                {/* TAB */}
                <div className="mt-3 w-fit text-sm flex gap-2 items-center rounded-md bg-gray-100 p-1">
                    <button className={`p-2 rounded-md text-gray-500 bg-white font-bold`}>
                        <span className="">Account</span>
                    </button>
                    <button className={`p-2 rounded-md text-gray-500`}
                        onClick={() => userModel.navigate('../role')}>
                        <span className="">Access</span>
                    </button>
                </div>

                {/* SEARCH */}
                <div className="my-5 flex gap-3 items-center py-[8px] px-[12px] bg-[#F0F1F3] rounded">
                    <div className={`bg-white h-[36px] px-[18px] flex items-center gap-[16px] rounded-lg border-2`}>
                        <Search color="grey" />
                        <input
                            type="text"
                            name="search"
                            placeholder="search"
                            className="bg-transparent w-full h-full outline-none"
                            onChange={globalModel.handleSearch}
                        />
                    </div>
                    {/* CHIP */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border-dashed border-2">
                        <PlusCircle color="black" size={12} />
                        <span>Status</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border-dashed border-2">
                        <PlusCircle color="black" size={12} />
                        <span>Role</span>
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-lg border overflow-hidden">
                    {userModel.isLoading
                        ? <Loading />
                        : <table className="w-full">
                            <thead className="bg-gray-100 h-[48px] text-sm border-b border-[#D0D3D9]">
                                <tr className="">
                                    {/* TABLE COLUMN */}
                                    {tableColumn.map((item) => <th className="px-3 font-normal text-start" key={item.name}>
                                        <button className="flex items-center gap-2"
                                            onClick={() => userModel.handleSort(item.name)}>
                                            <span>{item.label}</span>
                                            {userModel.sortType === `DESC` && userModel.orderBy === item.name
                                                ? <ArrowDown size={14} />
                                                : <ArrowUp size={14} />}
                                        </button>
                                    </th>)}
                                    <th className="px-3 font-normal text-start">
                                        <div className="flex items-center gap-2">
                                            <span>Action</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-[#514E4E]">
                                {userModel.users.data.map((item) => <tr className="border-b border-[#D0D3D9] h-[64px]" key={item.id}>
                                    <td className="px-3 ">
                                        <Toggle id={item.id} name={item.name} activeText="Active" inactiveText="Inactive" checked={item.isActive}
                                            cb={(toggleValue: boolean) => userModel.onChangeStatus(item.id, toggleValue)}>
                                        </Toggle>
                                    </td>
                                    <td className="px-3 ">{item.name}</td>
                                    <td className="px-3 ">{item.email}</td>
                                    <td className="px-3 ">{item.role.name}</td>
                                    <td className="px-3 ">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="flex justify-center items-center gap-2 w-[46px] h-[46px] px-[13px] bg-[#1BBDD4] rounded-xl"
                                                onClick={() => userModel.navigate(`detail/${item.id}`)}>
                                                <Eye color="white" size={19} />
                                            </button>
                                            <button
                                                className="flex justify-center items-center gap-2 w-[46px] h-[46px] bg-[#F79009] rounded-xl"
                                                onClick={() =>
                                                    userModel.navigate(`edit/${item.id}`)
                                                }>
                                                <Pencil color="white" size={19} />
                                            </button>
                                            <button
                                                className="flex justify-center items-center gap-2 w-[46px] h-[46px] bg-[#F04438] rounded-xl"
                                                onClick={() => { userModel.setOpenModalDelete(true); userModel.setSelectedId(item.id) }}>
                                                <Trash color="white" size={19} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>}
                </div>

                {/* NAVIGATOIN */}
                <Pagination dataState={userModel.users} setDataState={userModel.setUser} />

            </div>
        </main>
    );
}
