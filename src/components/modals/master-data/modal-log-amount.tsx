import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import ModalContainer from "../modal-container";
import { getToday } from "@commons/utils/date";

type PackingType = "small" | "normal";
interface Props {
    open: boolean;
    setOpen: Function;
    cb: Function;
    isSmallFilled: boolean
    isNormalFilled: boolean
}


export default function ModalLogPackAmount({ open = false, setOpen, cb, isSmallFilled, isNormalFilled }: Props) {
    const todayString = getToday().toLocaleDateString('id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    const [packingType, setPackingType] = useState<PackingType>("small");
    const [logAmount, setlogAmount] = useState(``)
    function onChangeLogAmount(e: ChangeEvent<HTMLInputElement>) {
        setlogAmount(e.target.value);
    }
    function onChangeLogType(e: ChangeEvent<HTMLInputElement>) {
        setPackingType(e.target.value as PackingType);
    }
    function onCancel() {
        setOpen(false);
    }
    function onDownload(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        cb({ amount: logAmount, type: packingType })
        setlogAmount(``)
    }

    useEffect(() => {
    }, []);

    return (
        <ModalContainer open={open}>
            <div className="w-[405px] flex flex-col gap-2">
                <h1 className="font-bold text-2xl">Update for Today</h1>

                <form onSubmit={onDownload}>
                    <div className='mb-3'>
                        <label htmlFor="packingAmount">Packing Amount</label>
                        <div className="flex mt-2">
                            <div className="flex items-center text-xl bg-[#667085] rounded-l-lg text-white px-3">
                                $
                            </div>
                            <input type={`number`} step={0.00001} id="packingAmount" onChange={onChangeLogAmount}
                                className={`h-12 w-40 rounded-r-lg px-3 border`}
                            />
                        </div>
                    </div>
                    <p className="text-sm font-normal text-gray-300">*Please fill out the PA for {todayString}</p>

                    {/* TYPE RADIO BUTTON */}
                    <div className="my-4 text-sm flex gap-3">
                        {!isSmallFilled && <label className={`flex gap-2 py-2 px-3 items-center rounded-md w-fit border`}>
                            <input
                                className="px-10 ml-auto"
                                type="radio" name="type" onChange={onChangeLogType}
                                value={`small`} required
                            />
                            Small
                        </label>}
                        {!isNormalFilled && <label className={`flex gap-2 py-2 px-3 items-center rounded-md w-fit border`}>
                            <input
                                className="px-10 ml-auto"
                                type="radio" name="type" onChange={onChangeLogType}
                                value={`normal`} required
                            />
                            Normal
                        </label>}
                    </div>

                    <div className="flex flex-col items-center gap-5 mt-5">
                        <button type="submit" disabled={logAmount == ``}
                            className={`p-3  rounded-lg w-full text-sm text-white
                            ${logAmount == `` ? 'bg-gray-400' : 'bg-red-500'}`}>
                            Submit
                        </button>
                        <button type="button" onClick={onCancel}
                            className="font-semibold text-sm border-b-2 text-red-500 border-red-500">
                            Later
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    );
}