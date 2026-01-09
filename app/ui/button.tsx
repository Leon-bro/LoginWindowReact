import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    mode: "link" | "primary";
    children: ReactNode;
}
// 2. Use '...props' to capture standard attributes
export function Button({ mode, children, className = "", ...props }: ButtonProps) {
    const variants = {
        primary: "mt-4 py-3 rounded-full primary-button border-[#92a4b1] border-2 text-foreground font-bold hover:shadow-[0_0_5px_#00EEFF] uppercase tracking-widest transform active:scale-95 duration-200",
        link: "bg-transparent border-none p-0 text-white hover:text-[#00EEFF] transition-colors underline decoration-1 underline-offset-4 cursor-pointer"
    };

    return (
        <button
            // 3. Merge your variant classes with any extra className passed in
            className={`${variants[mode]} ${className} w-full`}
            // 4. Spread standard props (onClick, type, disabled, etc.) here
            {...props}
        >
            {children}
        </button>
    );
}