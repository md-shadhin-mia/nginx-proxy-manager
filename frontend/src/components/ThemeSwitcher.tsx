import cn from "classnames";
import { motion } from "framer-motion";
import { Button, CyberIcon } from "src/components";
import { useTheme } from "src/hooks";
import styles from "./ThemeSwitcher.module.css";

interface Props {
	className?: string;
}
function ThemeSwitcher({ className }: Props) {
	const { setTheme } = useTheme();

	return (
		<motion.div
			className={cn("d-print-none", "d-inline-block", className)}
			whileHover={{ scale: 1.1 }}
		>
			<Button
				size="sm"
				className={cn("btn-ghost-dark", "hide-theme-dark", styles.lightBtn)}
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				aria-label="Enable dark mode"
				data-bs-original-title="Enable dark mode"
				onClick={() => setTheme("dark")}
			>
				<motion.div
					whileHover={{ rotate: 360 }}
					transition={{ duration: 0.5 }}
				>
					<CyberIcon name="eye-off" size={24} color="cyan" />
				</motion.div>
			</Button>
			<Button
				size="sm"
				className={cn("btn-ghost-light", "hide-theme-light", styles.darkBtn)}
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				aria-label="Enable dark mode"
				data-bs-original-title="Enable dark mode"
				onClick={() => setTheme("light")}
			>
				<motion.div
					whileHover={{ rotate: 360 }}
					transition={{ duration: 0.5 }}
				>
					<CyberIcon name="zap" size={24} color="yellow" />
				</motion.div>
			</Button>
		</motion.div>
	);
}

export { ThemeSwitcher };
