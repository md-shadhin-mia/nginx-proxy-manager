import cn from "classnames";
import { motion } from "framer-motion";
import { CyberIcon, HasPermission, NavLink } from "src/components";
import { T } from "src/locale";
import {
	ACCESS_LISTS,
	ADMIN,
	CERTIFICATES,
	DEAD_HOSTS,
	type MANAGE,
	PROXY_HOSTS,
	REDIRECTION_HOSTS,
	type Section,
	STREAMS,
	VIEW,
} from "src/modules/Permissions";

interface MenuItem {
	label: string;
	icon?: string;
	to?: string;
	items?: MenuItem[];
	permissionSection?: Section | typeof ADMIN;
	permission?: typeof VIEW | typeof MANAGE;
}

const menuItems: MenuItem[] = [
	{
		to: "/",
		icon: "home",
		label: "dashboard",
	},
	{
		icon: "server",
		label: "hosts",
		items: [
			{
				to: "/nginx/proxy",
				label: "proxy-hosts",
				permissionSection: PROXY_HOSTS,
				permission: VIEW,
			},
			{
				to: "/nginx/redirection",
				label: "redirection-hosts",
				permissionSection: REDIRECTION_HOSTS,
				permission: VIEW,
			},
			{
				to: "/nginx/stream",
				label: "streams",
				permissionSection: STREAMS,
				permission: VIEW,
			},
			{
				to: "/nginx/404",
				label: "dead-hosts",
				permissionSection: DEAD_HOSTS,
				permission: VIEW,
			},
		],
	},
	{
		to: "/access",
		icon: "lock",
		label: "access-lists",
		permissionSection: ACCESS_LISTS,
		permission: VIEW,
	},
	{
		to: "/certificates",
		icon: "shield",
		label: "certificates",
		permissionSection: CERTIFICATES,
		permission: VIEW,
	},
	{
		to: "/users",
		icon: "users",
		label: "users",
		permissionSection: ADMIN,
	},
	{
		to: "/audit-log",
		icon: "file-text",
		label: "auditlogs",
		permissionSection: ADMIN,
	},
	{
		to: "/settings",
		icon: "settings",
		label: "settings",
		permissionSection: ADMIN,
	},
];

const getMenuItem = (item: MenuItem, onClick?: () => void) => {
	if (item.items && item.items.length > 0) {
		return getMenuDropown(item, onClick);
	}

	return (
		<HasPermission
			key={`item-${item.label}`}
			section={item.permissionSection}
			permission={item.permission || VIEW}
			hideError
		>
			<motion.li
				className="nav-item"
				whileHover={{ x: 4 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			>
				<NavLink to={item.to} onClick={onClick}>
					<span className="nav-link-icon d-md-none d-lg-inline-block">
						{item.icon && <CyberIcon name={item.icon} size={24} color="cyan" />}
					</span>
					<span className="nav-link-title">
						<T id={item.label} />
					</span>
				</NavLink>
			</motion.li>
		</HasPermission>
	);
};

const getMenuDropown = (item: MenuItem, onClick?: () => void) => {
	const cns = cn("nav-item", "dropdown");
	return (
		<HasPermission
			key={`item-${item.label}`}
			section={item.permissionSection}
			permission={item.permission || VIEW}
			hideError
		>
			<motion.li
				className={cns}
				whileHover={{ x: 4 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			>
				<a
					className="nav-link dropdown-toggle"
					href={item.to}
					data-bs-toggle="dropdown"
					data-bs-auto-close="outside"
					aria-expanded="false"
					role="button"
				>
					<span className="nav-link-icon d-md-none d-lg-inline-block">
						<CyberIcon name="server" size={24} color="cyan" />
					</span>
					<span className="nav-link-title">
						<T id={item.label} />
					</span>
				</a>
				<div className="dropdown-menu">
					{item.items?.map((subitem, idx) => {
						return (
							<HasPermission
								key={`${idx}-${subitem.to}`}
								section={subitem.permissionSection}
								permission={subitem.permission || VIEW}
								hideError
							>
								<NavLink to={subitem.to} isDropdownItem onClick={onClick}>
									<T id={subitem.label} />
								</NavLink>
							</HasPermission>
						);
					})}
				</div>
			</motion.li>
		</HasPermission>
	);
};

export function SiteMenu() {
	const closeMenu = () => setTimeout(() => {
		const navbarToggler = document.querySelector<HTMLElement>(".navbar-toggler");
		const navbarMenu = document.querySelector("#navbar-menu");
		if (navbarToggler && navbarMenu?.classList.contains("show")) {
			navbarToggler.click();
		}
	}, 300);

	return (
		<motion.header
			className="navbar-expand-md"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2, duration: 0.5 }}
		>
			<div className="collapse navbar-collapse" id="navbar-menu">
				<div className="navbar">
					<div className="container-xl">
						<div className="row flex-column flex-md-row flex-fill align-items-center">
							<div className="col">
								<ul className="navbar-nav">
									{menuItems.length > 0 &&
										menuItems.map((item) => {
											return getMenuItem(item, closeMenu);
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.header>
	);
}
