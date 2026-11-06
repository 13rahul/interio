import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden text-center text-xs font-medium tracking-brand uppercase transition-[color,background-color,border-color] duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "h-12 bg-brass px-7 text-ink before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-champagne before:transition-transform before:duration-500 before:ease-lux hover:before:translate-x-0",
        dark: "h-12 bg-emerald px-7 text-ivory before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-pine before:transition-transform before:duration-500 before:ease-lux hover:before:translate-x-0",
        outline: "h-12 border border-beige/35 px-7 text-beige hover:border-brass hover:text-gold",
        text: "h-11 px-1 text-beige hover:text-gold",
        circle:
          "size-36 rounded-full bg-brass px-6 leading-relaxed text-ink transition-transform hover:scale-105 hover:bg-brass-light sm:size-40",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
