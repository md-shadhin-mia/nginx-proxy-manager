import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Button, LocalePicker, Page, ThemeSwitcher } from "src/components";
import { useAuthState } from "src/context";
import { useHealth } from "src/hooks";
import { intl, T } from "src/locale";
import { validateEmail, validateString } from "src/modules/Validations";
import styles from "./index.module.css";

function TwoFactorForm() {
	const codeRef = useRef<HTMLInputElement>(null);
	const [formErr, setFormErr] = useState("");
	const { verifyTwoFactor, cancelTwoFactor } = useAuthState();

	const onSubmit = async (values: any, { setSubmitting }: any) => {
		setFormErr("");
		try {
			await verifyTwoFactor(values.code);
		} catch (err) {
			if (err instanceof Error) {
				setFormErr(err.message);
			}
		}
		setSubmitting(false);
	};

	useEffect(() => {
		codeRef.current?.focus();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
		>
			<h2 className="h2 text-center mb-4" style={{ color: "var(--cyber-cyan-500)", textShadow: "var(--glow-text-cyan)" }}>
				<T id="login.2fa-title" />
			</h2>
			<p className="text-secondary text-center mb-4">
				<T id="login.2fa-description" />
			</p>
			{formErr !== "" && <Alert variant="danger">{formErr}</Alert>}
			<Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="cyber-field mb-3">
							<Field name="code" validate={validateString(6, 20)}>
								{({ field, form }: any) => (
									<>
										<label className="cyber-field__label">
											<T id="login.2fa-code" />
										</label>
										<input
											{...field}
											ref={codeRef}
											type="text"
											inputMode="numeric"
											autoComplete="one-time-code"
											required
											maxLength={20}
											className={`cyber-input ${form.errors.code && form.touched.code ? "is-invalid" : ""}`}
											placeholder={intl.formatMessage({ id: "login.2fa-code-placeholder" })}
										/>
										<div className="invalid-feedback">{form.errors.code}</div>
									</>
								)}
							</Field>
						</div>
						<div className="form-footer d-flex gap-2">
							<Button type="button" fullWidth onClick={cancelTwoFactor} disabled={isSubmitting}>
								<T id="cancel" />
							</Button>
							<Button type="submit" fullWidth color="azure" isLoading={isSubmitting}>
								<T id="login.2fa-verify" />
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</motion.div>
	);
}

function LoginForm() {
	const emailRef = useRef<HTMLInputElement>(null);
	const [formErr, setFormErr] = useState("");
	const { login } = useAuthState();

	const onSubmit = async (values: any, { setSubmitting }: any) => {
		setFormErr("");
		try {
			await login(values.email, values.password);
		} catch (err) {
			if (err instanceof Error) {
				setFormErr(err.message);
			}
		}
		setSubmitting(false);
	};

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
		>
			<h2 className="h2 text-center mb-4" style={{ color: "var(--cyber-cyan-500)", textShadow: "var(--glow-text-cyan)" }}>
				<T id="login.title" />
			</h2>
			{formErr !== "" && <Alert variant="danger">{formErr}</Alert>}
			<Formik
				initialValues={
					{
						email: "",
						password: "",
					} as any
				}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="cyber-field mb-3">
							<Field name="email" validate={validateEmail()}>
								{({ field, form }: any) => (
									<>
										<label className="cyber-field__label">
											<T id="email-address" />
										</label>
										<input
											{...field}
											ref={emailRef}
											type="email"
											required
											className={`cyber-input ${form.errors.email && form.touched.email ? " is-invalid" : ""}`}
											placeholder={intl.formatMessage({ id: "email-address" })}
										/>
										<div className="invalid-feedback">{form.errors.email}</div>
									</>
								)}
							</Field>
						</div>
						<div className="cyber-field mb-2">
							<Field name="password" validate={validateString(8, 255)}>
								{({ field, form }: any) => (
									<>
										<label className="cyber-field__label">
											<T id="password" />
										</label>
										<input
											{...field}
											type="password"
											autoComplete="current-password"
											required
											maxLength={255}
											className={`cyber-input ${form.errors.password && form.touched.password ? " is-invalid" : ""}`}
											placeholder={intl.formatMessage({ id: "password" })}
										/>
										<div className="invalid-feedback">{form.errors.password}</div>
									</>
								)}
							</Field>
						</div>
						<div className="form-footer">
							<Button type="submit" fullWidth color="azure" isLoading={isSubmitting}>
								<T id="sign-in" />
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</motion.div>
	);
}

export default function Login() {
	const { twoFactorChallenge } = useAuthState();
	const health = useHealth();

	const getVersion = () => {
		if (!health.data) {
			return "";
		}
		const v = health.data.version;
		return `v${v.major}.${v.minor}.${v.revision}`;
	};

	return (
		<Page className="page page-center">
			<motion.div
				className="container container-tight py-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className="d-flex justify-content-between align-items-center mb-4 ps-4 pe-3"
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<motion.img
						className={styles.logo}
						src="/images/logo-text-horizontal-grey.png"
						alt="Nginx Proxy Manager"
						style={{
							filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))",
						}}
						whileHover={{ scale: 1.05 }}
					/>
					<div className="d-flex align-items-center gap-1">
						<LocalePicker />
						<ThemeSwitcher />
					</div>
				</motion.div>
				<motion.div
					className="cyber-card"
					style={{
						maxWidth: "400px",
						margin: "0 auto",
					}}
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
				>
					<div className="card-body">
						{twoFactorChallenge ? <TwoFactorForm /> : <LoginForm />}
					</div>
				</motion.div>
				<motion.div
					className="text-center text-secondary mt-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					style={{
						fontFamily: "var(--font-mono)",
						color: "var(--cyber-chrome-500)",
					}}
				>
					{getVersion()}
				</motion.div>
			</motion.div>
		</Page>
	);
}
