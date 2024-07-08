var multiple_menu = {};
export const menuEntries = [
	// {
	// 	id: 1,
	// 	title: "MDM",
	// 	icon: "mdi mdi-receipt",
	// 	page: "",
	// 	submenu: [
	// 		{
	// 			id: 7,
	// 			title: "Company Options",
	// 			page: "/evolve/ComplanyOptions"
	// 		},
	// 		{
	// 			id: 8,
	// 			title: "Company demo",
	// 			page: "/evolve/demo"
	// 		}
	// 	]
	// },
	{
		id: 0,
		title: "Dashboard",
		icon: "mdi mdi-receipt",
		page: "/evolve/dashboard"
	},
	{
		id: 1,
		title: "Company",
		icon: "mdi mdi-office-building",
		page: "/evolve/companies/list"
	},
	{
		id: 2,
		title: "Units",
		icon: "mdi mdi-factory",
		page: "/evolve/units/list"
	},
	{
		id: 3,
		title: "Users",
		icon: "mdi mdi-account-tie",
		page: "/evolve/users/list"
	},
	{
		id: 4,
		title: "Roles",
		icon: "mdi mdi-server-security",
		page: "/evolve/roles/list"
	},
	{
		id: 5,
		title: "Menus",
		icon: "mdi mdi-format-line-weight",
		page: "/evolve/menus/list"
	},
	{
		id: 6,
		title: "Evolve Multi level",
		page: "",
		icon: "mdi mdi-format-line-weight",
		submenu: multiple_menu
	}
	// {
	// 	id: 3,
	// 	title: "Smart Factory",
	// 	icon: "mdi mdi-receipt",
	// 	page: "/dashboard/smartFactory"
	// },

	// {
	// 	id: 4,
	// 	title: "Supplier List",
	// 	icon: "mdi mdi-view-dashboard-variant",
	// 	page: "#"
	// },
	// {
	// 	id: 5,
	// 	title: "Role Management",
	// 	icon: "mdi mdi-view-dashboard-variant",
	// 	page: "#"
	// },
	// {
	// 	id: 6,
	// 	title: "Settings",
	// 	icon: "mdi mdi-view-dashboard-variant",
	// 	page: "/evolve/hello"
	// },
];
