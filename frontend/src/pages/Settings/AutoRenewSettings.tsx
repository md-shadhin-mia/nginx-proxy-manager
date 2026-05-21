import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "src/components";
import { useSetting, useSetSetting } from "src/hooks";
import { T } from "src/locale";
import { toast } from "react-toastify";

interface AutoRenewFormValues {
	autoRenewEnabled: boolean;
	daysBeforeExpiry: number;
	checkIntervalHours: number;
}

export default function AutoRenewSettings() {
	const { data: autoRenewEnabledSetting } = useSetting("auto-renew-enabled");
	const { data: autoRenewDaysBeforeSetting } = useSetting("auto-renew-days-before");
	const { data: autoRenewCheckIntervalSetting } = useSetting("auto-renew-check-interval");
	const updateSettingMutation = useSetSetting();
	const [saving, setSaving] = useState(false);

	const initialValues: AutoRenewFormValues = {
		autoRenewEnabled: true,
		daysBeforeExpiry: 30,
		checkIntervalHours: 1,
	};

	useEffect(() => {
		if (autoRenewEnabledSetting) {
			initialValues.autoRenewEnabled = autoRenewEnabledSetting.value === "true";
		}
		if (autoRenewDaysBeforeSetting) {
			initialValues.daysBeforeExpiry = parseInt(autoRenewDaysBeforeSetting.value || "30", 10);
		}
		if (autoRenewCheckIntervalSetting) {
			initialValues.checkIntervalHours = parseInt(autoRenewCheckIntervalSetting.value || "1", 10);
		}
	}, [autoRenewEnabledSetting, autoRenewDaysBeforeSetting, autoRenewCheckIntervalSetting]);

	const onSubmit = async (values: AutoRenewFormValues) => {
		setSaving(true);
		try {
			await Promise.all([
				updateSettingMutation.mutateAsync({ id: "auto-renew-enabled", value: values.autoRenewEnabled ? "true" : "false" }),
				updateSettingMutation.mutateAsync({ id: "auto-renew-days-before", value: String(values.daysBeforeExpiry) }),
				updateSettingMutation.mutateAsync({ id: "auto-renew-check-interval", value: String(values.checkIntervalHours) }),
			]);
			toast.success("Auto-renewal settings updated successfully");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update settings");
		}
		setSaving(false);
	};

	if (!autoRenewEnabledSetting || !autoRenewDaysBeforeSetting || !autoRenewCheckIntervalSetting) {
		return <div className="p-4"><T id="loading" /></div>;
	}

	return (
		<div className="card-body">
			<h3 className="card-title mb-3">
				<T id="settings.auto-renew" />
			</h3>
			<p className="text-secondary mb-4">
				Configure automatic SSL certificate renewal for Let's Encrypt certificates.
			</p>
			<Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
				{({ isSubmitting, values }) => (
					<Form>
						<div className="mb-4">
							<div className="form-label">
								<T id="settings.auto-renew-enabled" />
							</div>
							<label className="form-check form-switch">
								<Field
									name="autoRenewEnabled"
									type="checkbox"
									className="form-check-input"
								/>
								<span className="form-check-label">
									{values.autoRenewEnabled ? "Enabled" : "Disabled"}
								</span>
							</label>
							<div className="form-hint">
								When enabled, certificates will be automatically renewed before they expire.
							</div>
						</div>

						<div className="mb-4">
							<label className="form-label">
								<T id="settings.auto-renew-days" />
							</label>
							<Field
								name="daysBeforeExpiry"
								type="number"
								className="form-control"
								min={1}
								max={90}
							/>
							<div className="form-hint">
								Renew certificates this many days before they expire (1-90).
							</div>
						</div>

						<div className="mb-4">
							<label className="form-label">
								<T id="settings.auto-renew-interval" />
							</label>
							<Field
								name="checkIntervalHours"
								type="number"
								className="form-control"
								min={1}
								max={24}
							/>
							<div className="form-hint">
								How often to check for certificates needing renewal (1-24 hours).
								Note: Changes take effect after restarting the application.
							</div>
						</div>

						<div className="form-footer">
							<Button type="submit" actionType="primary" isLoading={isSubmitting || saving}>
								<T id="save" />
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
