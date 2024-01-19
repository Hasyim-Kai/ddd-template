import ModalContainer from "../modal-container";
import { X } from "lucide-react";
import { LogTargetDetail } from "@domain/models/master-data/target/log-target";
import Loading from "@components/loading/loading";
import { useState, useEffect } from "react";

interface Props {
    open: boolean;
    setOpen: Function;
    isModalLoading: boolean;
    logData: LogTargetDetail
}

interface ProcessedLogTargetDetailTypes {
    month: string
    value: number | null
    isDifferent?: boolean
}

export default function ModalLogTargetDetail({ open = false, setOpen, isModalLoading, logData }: Props) {
    const [processedLogTargetDetailBefore, setProcessedLogTargetDetailBefore] = useState<ProcessedLogTargetDetailTypes[]>([]);
    const [processedLogTargetDetailAfter, setProcessedLogTargetDetailAfter] = useState<ProcessedLogTargetDetailTypes[]>([]);

    useEffect(() => {
        const arrBefore: ProcessedLogTargetDetailTypes[] = [];
        const arrAfter: ProcessedLogTargetDetailTypes[] = [];
        // 12 is Month count in 1 year (january, fecruary, .....)
        // + 5 is to match the index position in object response form BE
        for (let monthIndex = 0 + 5; monthIndex < (12 + 5); monthIndex++) {
            arrBefore.push({ month: Object.keys(logData.before)[monthIndex], value: Object.values(logData.before)[monthIndex] })
            arrAfter.push({ month: Object.keys(logData.after)[monthIndex], value: Object.values(logData.after)[monthIndex], isDifferent: Object.values(logData.before)[monthIndex] !== Object.values(logData.after)[monthIndex] })
        }
        setProcessedLogTargetDetailBefore(arrBefore)
        setProcessedLogTargetDetailAfter(arrAfter)
    }, [logData])


    return <ModalContainer open={open}>
        <div className="w-[65rem] flex flex-col gap-2 relative">
            <button className="absolute top-1 right-1" onClick={() => { setOpen(false); }}>
                <X />
            </button>
            <div>
                <h1 className="text-2xl text-[#514E4E] font-bold ">Log Target</h1>
                <p className="text-[#667085]">History of data changes</p>
            </div>
            {isModalLoading ? <Loading /> : <>
                <section className="flex gap-72 items-center mt-2">
                    <div>
                        <span className="text-sm text-[#514E4E] ">Timestamps</span>
                        <p className="font-semibold">{logData.after.updatedAt}</p>
                    </div>
                    <div>
                        <span className="text-sm text-[#514E4E] ">Process Name</span>
                        <p className="font-semibold">{logData.after.processName}</p>
                    </div>
                    <div>
                        <span className="text-sm text-[#514E4E] ">Year</span>
                        <p className="font-semibold">{logData.before.year} - <span className="text-orange-400">{logData.after.year}</span></p>
                    </div>
                </section>

                <section className="mt-2">
                    <h1>Before</h1>
                    <div className="grid grid-cols-12 rounded-lg bg-gray-100 mt-2">
                        {processedLogTargetDetailBefore.map((item: ProcessedLogTargetDetailTypes, index: number) => <div className="p-3 h-24 flex flex-col justify-center" key={index}>
                            <p className="text-sm">{item.month}</p>
                            <p className="font-medium">{item.value == null ? `-` : item.value}</p>
                        </div>)}
                    </div>
                </section>

                <section className="mt-2">
                    <h1>After</h1>
                    <div className="grid grid-cols-12 rounded-lg bg-gray-100 mt-2">
                        {processedLogTargetDetailAfter.map((item: ProcessedLogTargetDetailTypes, index: number) => <div className="p-3 h-24 flex flex-col justify-center" key={index}>
                            <p className="text-sm">{item.month}</p>
                            <p className={`font-medium ${item.isDifferent ? 'text-orange-400' : ''}`}>{item.value == null ? `-` : item.value}</p>
                        </div>)}
                    </div>
                </section>
            </>}

            <button className="mt-4 w-60 p-3 bg-red-500 text-white rounded-lg ml-auto"
                onClick={() => { setOpen(false); }}>
                Close
            </button>
        </div>
    </ModalContainer>
}