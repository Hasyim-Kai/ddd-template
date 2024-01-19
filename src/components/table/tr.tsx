export default function Tr({
  children,
  props,
}: {
  children: React.ReactNode;
  props?: any | undefined;
}) {
  return (
    <tr className="px-4 bg-[#13005A] text-white border-b border-l border-r border-white" {...props}>
      {children}
    </tr>
  );
}
