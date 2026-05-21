import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { T } from "src/locale";
import styles from "./Loading.module.css";

interface Props {
	label?: string | ReactNode;
	noLogo?: boolean;
}
export function Loading({ label, noLogo }: Props) {
	return (
		<motion.div
			className="empty text-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{noLogo ? null : (
				<motion.div className="mb-3">
					<motion.img
						className={styles.logo}
						src="/images/logo-no-text.svg"
						alt=""
						animate={{ rotate: 360 }}
						transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
					/>
				</motion.div>
			)}
			<motion.div
				className="text-secondary mb-3"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1.5, repeat: Infinity }}
			>
				{label || <T id="loading" />}
			</motion.div>
			<div className="progress progress-sm">
				<motion.div
					className="progress-bar progress-bar-indeterminate"
					style={{
						background: "linear-gradient(90deg, var(--cyber-cyan), var(--cyber-magenta), var(--cyber-cyan))",
						backgroundSize: "200% 100%",
						animation: "dataStream 2s linear infinite",
					}}
				/>
			</div>
		</motion.div>
	);
}
