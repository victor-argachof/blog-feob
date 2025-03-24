import Spinner from "@/components/Spinner";
import { cx, focusRing } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Define os estilos base e variantes para o botão usando tailwind-variants.
 */
const buttonVariants = tv({
  base: [
    // Estilos base: posicionamento, espaçamento, borda, tipografia, sombra e transição.
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
    // Estilos para quando o botão estiver desabilitado.
    "disabled:pointer-events-none disabled:shadow-none",
    // Estilos de foco, utilizando uma função utilitária.
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        "border-transparent",
        "text-white dark:text-black",
        "bg-primary dark:bg-primary",
        "hover:bg-indigo-600 dark:hover:bg-indigo-500",
        "disabled:bg-indigo-100 disabled:text-indigo-400",
        "disabled:dark:bg-indigo-800 disabled:dark:text-indigo-600",
      ],
      secondary: [
        "border-gray-300 dark:border-gray-800",
        "text-gray-900 dark:text-gray-50",
        "bg-white dark:bg-gray-950",
        "hover:bg-gray-50 dark:hover:bg-gray-900/60",
        "disabled:text-gray-400",
        "disabled:dark:text-gray-600",
      ],
      light: [
        "shadow-none",
        "border-transparent",
        "text-gray-900 dark:text-gray-50",
        "bg-gray-200 dark:bg-gray-900",
        "hover:bg-gray-300/70 dark:hover:bg-gray-800/80",
        "disabled:bg-gray-100 disabled:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-600",
      ],
      ghost: [
        "shadow-none",
        "border-transparent",
        "text-gray-900 dark:text-gray-50",
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80",
        "disabled:text-gray-400",
        "disabled:dark:text-gray-600",
      ],
      destructive: [
        "text-white",
        "border-transparent",
        "bg-red-600 dark:bg-red-700",
        "hover:bg-red-700 dark:hover:bg-red-600",
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * Interface que estende as propriedades padrão de um botão HTML e adiciona:
 * - as propriedades geradas pelo tailwind-variants para as variantes de estilo,
 * - a propriedade `asChild` para permitir renderizar o botão como outro elemento,
 * - a propriedade `isLoading` para indicar estado de carregamento,
 * - a propriedade `loadingText` para exibir um texto alternativo durante o carregamento.
 */
interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Componente Button com suporte a estado de carregamento.
 * Utiliza forwardRef para permitir referências do elemento nativo.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    // Se `asChild` for true, utiliza o componente Slot (do Radix) para renderizar o botão,
    // caso contrário, utiliza a tag "button".
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading} // Desabilita o botão se estiver carregando.
        {...props}
      >
        {isLoading ? (
          // Se estiver no estado de carregamento, exibe somente o Spinner centralizado.
          <span className="pointer-events-none flex shrink-0 items-center justify-center">
            <Spinner size="sm" />
          </span>
        ) : (
          // Caso contrário, renderiza os filhos normalmente.
          children
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
