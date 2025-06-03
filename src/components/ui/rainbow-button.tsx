import React from "react";

import { cn } from "@/lib";
interface RainbowButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "default" | "sm" | "lg" | "icon";
}

export function RainbowButton({
	children,
	className,
	size = "default", // Default size
	...props
}: RainbowButtonProps) {
	const sizeClasses = {
		default: "h-9 px-4 py-2",
		sm: "h-8 rounded-md px-3 text-xs",
		lg: "h-10 rounded-md px-8",
		icon: "h-9 w-9",
	};

	return (
		<button
			className={cn(
				"group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				sizeClasses[size], // Apply size classes
				"bg-white bg-[length:200%] px-8 py-2 font-medium text-black transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",
				"before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
				"bg-[linear-gradient(white,white),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
				"bg-blend-overlay cursor-pointer",
				className
			)}
			{...props}>
			{children}
		</button>
	);
}
