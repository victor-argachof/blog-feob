"use client";

import { cx, focusInput, hasErrorInput } from "@/lib/utils";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const selectStyles = tv({
  base: [
    // Estilos base semelhantes ao Input.tsx
    "block w-full appearance-none rounded-md border px-2.5 py-2 shadow-sm outline-none transition sm:text-sm",
    // Cores de borda
    "border-gray-300 dark:border-gray-800",
    // Cor do texto
    "text-gray-900 dark:text-gray-50",
    // Placeholder
    "placeholder-gray-400 dark:placeholder-gray-500",
    // Fundo
    "bg-white dark:bg-gray-950",
    focusInput,
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
});

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
  VariantProps<typeof selectStyles> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, ...props }, forwardedRef) => {
    return (
      <select
        ref={forwardedRef}
        className={cx(selectStyles({ hasError }), className)}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export { Select, selectStyles };
