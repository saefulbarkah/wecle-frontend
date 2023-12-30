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
            `peer w-full border-b border-black/50 placeholder-transparent outline-none transition placeholder:pointer-events-none placeholder:select-none focus:border-primary ${
              error ? "border-b-danger" : ""
            }`,
            className,
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        <label className="pointer-events-none absolute left-0 -translate-y-4 transform-gpu select-none text-[13px] transition-none duration-150 peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-[13px] md:transition-all">
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
