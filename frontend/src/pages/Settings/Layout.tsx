import { useState } from "react";
import { T } from "src/locale";
import AutoRenewSettings from "./AutoRenewSettings";
import DefaultSite from "./DefaultSite";

type TabKey = "default-site" | "auto-renew";

export default function Layout() {
	const [activeTab, setActiveTab] = useState<TabKey>("default-site");

	return (
		<div className="card mt-4">
			<div className="card-status-top bg-teal" />
			<div className="card-table">
				<div className="card-header">
					<div className="row w-full">
						<h2 className="mt-1 mb-0">
							<T id="settings" />
						</h2>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-12 col-md-3 border-end">
						<div className="card-body mt-0 pt-0">
							<div className="list-group list-group-transparent">
								<a
									href="#"
									className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "default-site" ? "active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("default-site");
									}}
								>
									<T id="settings.default-site" />
								</a>
								<a
									href="#"
									className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === "auto-renew" ? "active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("auto-renew");
									}}
								>
									<T id="settings.auto-renew" />
								</a>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-9 d-flex flex-column">
						{activeTab === "default-site" && <DefaultSite />}
						{activeTab === "auto-renew" && <AutoRenewSettings />}
					</div>
				</div>
			</div>
		</div>
	);
}
