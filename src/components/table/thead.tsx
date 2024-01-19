export default function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-[rgb(198, 198, 198)]">{children}</thead>
  );
}
