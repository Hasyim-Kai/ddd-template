import { twMerge } from "tailwind-merge";

export default function Th({
  className,
  children,
  props,
}: {
  className?: string | undefined;
  children: React.ReactNode;
  props?: any | undefined;
}) {
  return (
    <th
      className={twMerge(
        "text-start px-4 py-3 text-base font-medium border-l border-white",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}
