import { type TargetAndTransition, type Transition, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CyberIcon, HasPermission } from "src/components";
import { useHostReport } from "src/hooks";
import { T } from "src/locale";
import { DEAD_HOSTS, PROXY_HOSTS, REDIRECTION_HOSTS, STREAMS, VIEW } from "src/modules/Permissions";

const springTransition: Transition = { type: "spring", stiffness: 100, damping: 15 };

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: springTransition },
};

const Dashboard = () => {
	const { data: hostReport } = useHostReport();
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.h2
				className="page-header"
				initial={{ x: -20, opacity: 0 } as TargetAndTransition}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<T id="dashboard" />
			</motion.h2>
			<motion.div
				className="row row-deck row-cards"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<div className="col-12 my-4">
					<div className="row row-cards">
						<HasPermission section={PROXY_HOSTS} permission={VIEW} hideError>
							<motion.div className="col-sm-6 col-lg-3" variants={item}>
								<div
									className="cyber-card cyber-card--interactive cyber-card--green"
									onClick={() => navigate("/nginx/proxy")}
									style={{ cursor: "pointer" }}
								>
									<div className="cyber-card__header">
										<div className="cyber-card__icon">
											<CyberIcon name="zap" size={24} color="green" />
										</div>
										<div className="cyber-card__title">
											<T id="proxy-hosts" />
										</div>
										<span className="cyber-card__badge">
											{hostReport?.proxy || 0}
										</span>
									</div>
								</div>
							</motion.div>
						</HasPermission>
						<HasPermission section={REDIRECTION_HOSTS} permission={VIEW} hideError>
							<motion.div className="col-sm-6 col-lg-3" variants={item}>
								<div
									className="cyber-card cyber-card--interactive cyber-card--yellow"
									onClick={() => navigate("/nginx/redirection")}
									style={{ cursor: "pointer" }}
								>
									<div className="cyber-card__header">
										<div className="cyber-card__icon">
											<CyberIcon name="arrow-right" size={24} color="yellow" />
										</div>
										<div className="cyber-card__title">
											<T id="redirection-hosts" />
										</div>
										<span className="cyber-card__badge">
											{hostReport?.redirection || 0}
										</span>
									</div>
								</div>
							</motion.div>
						</HasPermission>
						<HasPermission section={STREAMS} permission={VIEW} hideError>
							<motion.div className="col-sm-6 col-lg-3" variants={item}>
								<div
									className="cyber-card cyber-card--interactive"
									onClick={() => navigate("/nginx/stream")}
									style={{ cursor: "pointer" }}
								>
									<div className="cyber-card__header">
										<div className="cyber-card__icon">
											<CyberIcon name="signal" size={24} color="cyan" />
										</div>
										<div className="cyber-card__title">
											<T id="streams" />
										</div>
										<span className="cyber-card__badge">
											{hostReport?.stream || 0}
										</span>
									</div>
								</div>
							</motion.div>
						</HasPermission>
						<HasPermission section={DEAD_HOSTS} permission={VIEW} hideError>
							<motion.div className="col-sm-6 col-lg-3" variants={item}>
								<div
									className="cyber-card cyber-card--interactive cyber-card--magenta"
									onClick={() => navigate("/nginx/404")}
									style={{ cursor: "pointer" }}
								>
									<div className="cyber-card__header">
										<div className="cyber-card__icon">
											<CyberIcon name="error" size={24} color="magenta" />
										</div>
										<div className="cyber-card__title">
											<T id="dead-hosts" />
										</div>
										<span className="cyber-card__badge">
											{hostReport?.dead || 0}
										</span>
									</div>
								</div>
							</motion.div>
						</HasPermission>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Dashboard;
