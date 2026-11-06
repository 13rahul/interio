import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-center text-xs font-medium tracking-brand uppercase transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "h-11 bg-brass px-6 text-ink hover:bg-brass-light",
        outline: "h-11 border border-beige/40 px-6 text-beige hover:border-gold hover:text-gold",
        text: "h-11 px-1 text-beige hover:text-gold",
        circle:
          "size-36 rounded-full bg-brass px-6 leading-relaxed text-ink hover:bg-brass-light sm:size-40",
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
