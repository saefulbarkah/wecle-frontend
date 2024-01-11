import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { FieldError } from "react-hook-form";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Password = React.forwardRef<HTMLInputElement, inputProps>(
  ({ className, ...props }, ref) => {
    const [isShow, setShow] = React.useState<boolean>(false);
    return (
      <Input.Text
        className={cn(`pr-[2rem]`, className)}
        type={isShow ? "text" : "password"}
        ref={ref}
        {...props}
      >
        <button
          className="absolute right-0 -translate-x-1"
          type="button"
          onClick={() => setShow((prev) => !prev)}
        >
          {isShow ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </Input.Text>
    );
  },
);
Password.displayName = "Password";

const Text = React.forwardRef<HTMLInputElement, inputProps>(
  ({ className, placeholder, children, error, ...props }, ref) => {
    return (
      <div className={`relative ${error ? "my-2" : ""}`}>
        <input
          className={cn(
            `peer w-full appearance-none bg-transparent p-1 placeholder-transparent outline-none transition selection:bg-yellow-50  placeholder:pointer-events-none placeholder:select-none autofill:bg-transparent focus:border-primary motion-reduce:transition-none dark:border-white/20 dark:focus:border-primary`,
            className,
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        <div
          className={`absolute h-[1px] w-full bg-black/20 transition-colors peer-focus:bg-primary motion-reduce:transition-none dark:bg-white/20 ${
            error ? "bg-danger peer-focus:bg-danger" : ""
          }`}
        ></div>
        <label className="pointer-events-none absolute left-[1px] -translate-y-[1.1rem] text-xs transition-[transform,font] !duration-150 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:text-sm peer-focus:-translate-y-[1.1rem] peer-focus:text-xs peer-focus:font-normal peer-focus:text-black motion-reduce:transition-none dark:peer-focus:text-white">
          {placeholder}
        </label>
        {error && (
          <p className="absolute translate-y-[1px] text-sm font-semibold text-danger">
            {error.message}
          </p>
        )}
        {children}
      </div>
    );
  },
);

Text.displayName = "Text";

const Input = {
  Password,
  Text,
};

export default Input;
