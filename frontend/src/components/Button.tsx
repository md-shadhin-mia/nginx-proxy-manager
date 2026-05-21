import cn from "classnames";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
	type?: "button" | "submit";
	actionType?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark";
	variant?: "ghost" | "outline" | "pill" | "square" | "action" | "filled";
	size?: "sm" | "md" | "lg" | "xl";
	fullWidth?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	color?:
		| "blue"
		| "azure"
		| "indigo"
		| "purple"
		| "pink"
		| "red"
		| "orange"
		| "yellow"
		| "lime"
		| "green"
		| "teal"
		| "cyan"
		| "magenta";
	onClick?: () => void;
}
function Button({
	children,
	className,
	onClick,
	type,
	actionType,
	variant,
	size,
	color,
	fullWidth,
	isLoading,
	disabled,
}: Props) {
	const myOnClick = () => {
		!isLoading && onClick && onClick();
	};

	const cns = cn(
		"cyber-btn",
		className,
		actionType === "success" && "cyber-btn--green",
		actionType === "danger" && "cyber-btn--magenta",
		actionType === "warning" && "cyber-btn--yellow",
		variant === "ghost" && "cyber-btn--ghost",
		variant === "filled" && "cyber-btn--filled",
		variant === "outline" && "cyber-btn--outline",
		size === "sm" && "cyber-btn--sm",
		size === "lg" && "cyber-btn--lg",
		color === "magenta" && "cyber-btn--magenta",
		color === "green" && "cyber-btn--green",
		color === "yellow" && "cyber-btn--yellow",
		fullWidth && "w-100",
		isLoading && "btn-loading",
	);

	return (
		<motion.button
			type={type || "button"}
			className={cns}
			onClick={myOnClick}
			disabled={disabled}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			{children}
		</motion.button>
	);
}

export { Button };
