import Button from "../buttons/button";

export default function ModalDetail({ setOpen, }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
  return (
    <>
      <div className="flex flex-col gap-4 w-[600px] h-[500px] bg-white p-4">
        <div className="flex-1">
          <span className="text-center">Detail</span>
        </div>
        <Button type="button" onClick={() => setOpen(false)} />
      </div>
    </>
  );
}
