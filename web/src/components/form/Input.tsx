import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

const Password = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isShow, setShow] = React.useState<boolean>(false);
  return (
    <Input.Text
      className={cn('pr-[2rem]', className)}
      type={isShow ? 'text' : 'password'}
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
};

const Text = ({
  className,
  placeholder,
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative">
      <input
        className={cn(
          'peer border-b border-black/50 w-full outline-none placeholder-transparent placeholder:select-none placeholder:pointer-events-none',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
      <label className="absolute text-xs -translate-y-4 left-0 peer-focus:-translate-y-4 transition-all peer-focus:text-xs peer-placeholder-shown:-translate-y-2 peer-placeholder-shown:text-base pointer-events-none select-none">
        {placeholder}
      </label>
      {children}
    </div>
  );
};

const Input = {
  Password,
  Text,
};

export default Input;
