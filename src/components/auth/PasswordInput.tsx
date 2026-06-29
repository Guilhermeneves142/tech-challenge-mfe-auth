"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@vandrei/finance-ui";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  "aria-invalid"?: boolean;
}

export function PasswordInput({
  id,
  placeholder = "Digite sua senha",
  autoComplete,
  value,
  onChange,
  className,
  "aria-invalid": ariaInvalid,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        className={`pr-14 !py-0 ${className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {show ? (
          <EyeOff className="h-5 w-5 block" aria-hidden />
        ) : (
          <Eye className="h-5 w-5 block" aria-hidden />
        )}
      </button>
    </div>
  );
}