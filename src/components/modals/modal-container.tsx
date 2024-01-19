export default function ModalContainer({
  open = false,
  children,
  isWithPadding = true,
}: {
  open: boolean;
  children: React.ReactNode;
  isWithPadding?: boolean,
}) {
  return (
    <dialog
      open={open}
      className="bg-black bg-opacity-50 w-[100dvw] h-[100dvh] z-50 top-0 left-0 fixed p-0 m-0"
    >
      <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg ${isWithPadding ? 'p-5' : ''}`}>
        {children}
      </div>
    </dialog>
  );
}
