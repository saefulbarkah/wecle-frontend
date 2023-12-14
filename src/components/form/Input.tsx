import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Password = React.forwardRef<HTMLInputElement, inputProps>(
  ({ className, ...props }, ref) => {
    const [isShow, setShow] = React.useState<boolean>(false);
    return (
      <Input.Text
        className={cn(`pr-[2rem]`, className)}
        type={isShow ? 'text' : 'password'}
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
  }
);
Password.displayName = 'Password';

const Text = React.forwardRef<HTMLInputElement, inputProps>(
  ({ className, placeholder, children, error, ...props }, ref) => {
    return (
      <div className={`relative ${error ? 'my-2' : ''}`}>
        <input
          className={cn(
            `peer border-b border-black/50 w-full outline-none placeholder-transparent placeholder:select-none placeholder:pointer-events-none transition ${
              error ? 'border-b-danger' : ''
            }`,
            className
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        <label className="absolute text-xs -translate-y-4 left-0 peer-focus:-translate-y-4 transition-all peer-focus:text-xs peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:text-base pointer-events-none select-none">
          {placeholder}
        </label>
        {error && (
          <p className="text-sm text-danger font-semibold absolute translate-y-[1px]">
            {error.message}
          </p>
        )}
        {children}
      </div>
    );
  }
);

Text.displayName = 'Text';

const Input = {
  Password,
  Text,
};

export default Input;
