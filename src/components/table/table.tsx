export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex overflow-hidden">
      <table className="flex-1">
        {children}
      </table>
    </div>
  );
}
