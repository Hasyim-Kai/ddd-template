type TInputProps = {
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
};

export const Select = ({
  defaultValue = "",
  className,
  placeholder,
  ...props
}: TInputProps) => {
  return (
    <>
      <select
        defaultValue={defaultValue}
        className={`appearance-none rounded-lg bg-white py-2 px-4 min-w-[171px] text-center text-gray-200 ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
      </select>
    </>
  );
};
