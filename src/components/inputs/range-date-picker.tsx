import { formatDateForBackEnd } from "@commons/utils/date";
import { CalendarRange } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    datePickerId: string
    startDateState: Date | null
    setStartDateState: Dispatch<SetStateAction<Date | null>>
    endDateState: Date | null
    setEndDateState: Dispatch<SetStateAction<Date | null>>
    isWidthFull?: boolean;
    calenderMonth?: number
    setEndDateAdditionalFn?: Function
}

export const RangeDatePicker = ({ datePickerId, startDateState, setStartDateState, endDateState, setEndDateState, isWidthFull = false, calenderMonth = 2, setEndDateAdditionalFn = () => { } }: Props) => {
    return <section className={`h-12 border border-[#D0D3D9] rounded-lg flex items-center text-sm overflow-hidden text-gray-500 ${isWidthFull ? 'w-full justify-between' : 'w-fit'}`}>
        <CalendarRange className=" ml-3" />
        <label htmlFor={datePickerId}><div className={`flex font-semibold outline-none py-3 ml-3 h-full w-40`}>
            <p>{formatDateForBackEnd(startDateState)}</p>
            <span className="font-bold mx-1">-</span>
            <p>{formatDateForBackEnd(endDateState)}</p>
        </div></label>
        <DatePicker
            id={datePickerId}
            className={`hidden font-semibold outline-none py-3 ml-3 h-full w-20`}
            selected={startDateState}
            onChange={(date) => {
                setStartDateState(date[0])
                setEndDateState(date[1])
                setEndDateAdditionalFn()
            }}
            startDate={startDateState}
            endDate={endDateState}
            monthsShown={calenderMonth}
            selectsRange
        />
        {/* <span className="font-bold mx-1">-</span>
        <DatePicker
            className={`font-semibold outline-none py-3 h-full w-20`}
            selected={endDateState}
            onChange={(date) => setEndDateState(date)}
            selectsEnd
            startDate={startDateState}
            endDate={endDateState}
            minDate={startDateState}
            monthsShown={calenderMonth}
        /> */}
    </section>;
};