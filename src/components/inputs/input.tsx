// import { twMerge } from "tailwind-merge";
// import { forwardRef } from "react";

// type TInputProps = {
//   type?: string;
//   placeholder?: string;
//   className?: string;
//   error?: boolean;
//   props?: React.ReactNode;
// };

// const Input = forwardRef<HTMLInputElement, TInputProps>(
//   (
//     {
//       type = "text",
//       placeholder = "",
//       className = "",
//       error = false,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <input
//         ref={ref}
//         type={type}
//         placeholder={placeholder}
//         className={twMerge(
//           `h-[48px] w-full outline-none border px-4 ${
//             error ? "border-red-500" : ""
//           }`,
//           className
//         )}
//         {...props}
//       />
//     );
//   }
// );

// export default Input;
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  register: UseFormRegisterReturn;
  isPassword?: boolean;
  onPasswordToggle?: () => void;
  isWithLabel?: boolean;
  iconLabel?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  iconLabel,
  className,
  isPassword = false,
  onPasswordToggle,
  isWithLabel = true,
  ...inputProps
}) => {
  return (
    <div className={`w-full relative ${isWithLabel ? 'h-[52px]' : ''}`}>
      {isWithLabel ? <label className="block mb-1 text-[#514E4E]">{label}</label> : null}
      <div
        className={twMerge(
          `h-[48px] w-full outline-none border px-4 ${error ? "border-red-500" : ""
          }`,
          className
        )}
      >
        {iconLabel}
        <input
          type={
            isPassword
              ? inputProps.type === "text"
                ? "text"
                : "password"
              : "text"
          }
          className={`bg-transparent w-full h-full outline-none`}
          {...register}
          {...inputProps}
        />
        {isPassword && (
          <div
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={onPasswordToggle}
          >
            {inputProps.type === "text" ? (
              <EyeIcon color="#6E7079" />
            ) : (
              <EyeOffIcon color="#6E7079" />
            )}
          </div>
        )}
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Input;
