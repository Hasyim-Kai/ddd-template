import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import ModalContainer from "../modal-container";
import downloadImg from "@assets/img/download-img.png";
import { RangeDatePicker } from "@components/inputs/range-date-picker";

interface Props {
  open: boolean;
  setOpen: Function;
}

export default function ModalReportDownload({ open = false, setOpen }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [isLoading, setIsLoading] = useState({
    loading: false,
    exec: false,
  });

  function onCancel() {
    setOpen(false);
    setIsLoading({ loading: false, exec: false });
  }
  function onDownload() {

  }

  useEffect(() => {
    console.log(startDate, endDate)
  }, []);

  const labelStyle = `text-sm mt-3 mb-1`;
  return (
    <ModalContainer open={open}>
      <div className="w-[405px] flex flex-col gap-2">
        <div className="flex gap-3">
          <img src={downloadImg} alt="recycle icon" />
          <div>
            <h1 className="font-bold text-2xl">Download</h1>
            <p className="text-gray-400 text-sm">Download report file.</p>
          </div>
        </div>

        <form className="">
          <div className="flex flex-col w-full gap-1">
            <span className={labelStyle}>Date</span>
            <RangeDatePicker
              datePickerId="ModalReportDownload"
              isWidthFull
              startDateState={startDate}
              setStartDateState={setStartDate}
              endDateState={endDate}
              setEndDateState={setEndDate}
              calenderMonth={1} />
          </div>
        </form>


        <div className="mt-5 flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-400 rounded-xl text-red-400 text-sm font-semibold"
            onClick={onCancel}
          >
            cancel
          </button>
          {isLoading.loading ? (
            <button className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-[#20519F] rounded-xl text-white text-sm font-semibold">
              <RefreshCcw
                color="white"
                className="w-[24px] h-[24px] animate-spin"
              />
            </button>
          ) : (
            <button
              className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-500 rounded-xl"
              onClick={onDownload}>
              <span className="text-white text-sm font-semibold">Download</span>
            </button>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
