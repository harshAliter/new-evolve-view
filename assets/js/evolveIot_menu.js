export const menuEntries = [
	{
		id: 0,
		title: "Analytics",
		icon: "mdi mdi-receipt",
		page: "/evolve_iot/analytics"
	},
	{
		id: 1,
		title: "Setup",
		icon: "mdi mdi-settings-outline",
        page: "",
        submenu: [
			{
				id: 11,
				title: "Define Device Type",
				page: "/evolve_iot/setup/defineDeviceType/list"
			},
			{
				id: 12,
				title: "Define Device Group",
				page: "/evolve_iot/setup/defineDeviceGroup/list"
            },
            {
				id: 13,
				title: "Attributes",
				page: "/evolve_iot/setup/attributes/list"
            },
        ]
	},
	{
		id: 3,
		title: "Devices",
		icon: "mdi mdi-airplay",
        page: "/evolve_iot/devices/list",
	},
	{
		id: 4,
		title: "View Activity",
		icon: "mdi mdi-view-list",
        page: "/evolve_iot/viewActivity",
	},
	{
		id: 5,
		title: "Learn",
		icon: "mdi mdi-lead-pencil",
        page: "",
	},
	{
		id: 6,
		title: "Settings",
		icon: "mdi mdi-settings",
        page: "/evolve_iot/settings",
	}
];
