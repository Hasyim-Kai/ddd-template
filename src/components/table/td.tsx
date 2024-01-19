import { twMerge } from "tailwind-merge";

export default function Td({
  className,
  children,
  props,
}: {
  className?: string | undefined;
  children: React.ReactNode;
  props?: any | undefined;
}) {
  return (
    <td className={twMerge("text-start p-4 text-base bg-[#576CBC] text-white border-l border-white", className)} {...props}>
      {children}
    </td>
  );
}
