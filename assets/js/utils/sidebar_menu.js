export const menuEntries = [
	{
		section_title: "Applications"
	},
	{
		id: 47,
		title: "Chat",
		icon: "mdi mdi-message-outline",
		page: "/pages/chat"
	},
	{
		id: 41,
		title: "Invoices",
		icon: "mdi mdi-receipt",
		page: "/pages/invoices"
	},
	{
		id: 42,
		title: "Mailbox",
		icon: "mdi mdi-email-outline",
		page: "/pages/mailbox"
	},
	{
		id: 43,
		title: "Task Board",
		icon: "mdi mdi-calendar-text",
		page: "/pages/task_board"
	},
	{
		id: 44,
		title: "Notes",
		icon: "mdi mdi-note-outline",
		page: "/pages/notes"
	},
	{
		section_title: "Menu"
	},
	{
		id: 1,
		title: "Dashboards",
		page: "/dashboard",
		icon: "mdi mdi-view-dashboard-variant",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 11,
				title: "Dashboard 1",
				page: "/dashboard/v1"
			},
			{
				id: 12,
				title: "Dashboard 2",
				page: "/dashboard/v2"
			}
		]
	},
	{
		id: 2,
		title: "Forms",
		page: "/forms",
		icon: "mdi mdi-format-line-style",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 21,
				title: "Regular Elements",
				page: "/forms/regular_elements"
			},
			{
				id: 22,
				title: "Advanced Elements",
				page: "/forms/advanced_elements",
				isOpen: false,
				submenu: [
					{
						id: 221,
						title: "Chackboxes, Radio Buttons",
						page: "/forms/advanced_elements/checkbox_radio"
					},
					{
						id: 222,
						title: "Color Picker",
						page: "/forms/advanced_elements/color_picker"
					},
					{
						id: 223,
						title: "Date Picker",
						page: "/forms/advanced_elements/date_picker"
					},
					{
						id: 224,
						title: "Date Range Picker",
						page: "/forms/advanced_elements/date_range_picker"
					},
					{
						id: 225,
						title: "Input Mask",
						page: "/forms/advanced_elements/inputmask"
					},
					{
						id: 226,
						title: "Multiselect",
						page: "/forms/advanced_elements/multiselect"
					},
					{
						id: 227,
						title: "Range Slider",
						page: "/forms/advanced_elements/range_slider"
					},
					{
						id: 228,
						title: "Rating",
						page: "/forms/advanced_elements/rating"
					},
					{
						id: 229,
						title: "Select 2",
						page: "/forms/advanced_elements/select2"
					},
					{
						id: 2210,
						title: "Switches",
						page: "/forms/advanced_elements/switches"
					},
					{
						id: 2211,
						title: "Time Picker",
						page: "/forms/advanced_elements/time_picker"
					}
				]
			},
			{
				id: 23,
				title: "Dynamic Fields",
				page: "/forms/dynamic_fields"
			},
			{
				id: 24,
				title: "Validation",
				page: "/forms/validation"
			},
			{
				id: 25,
				title: "Form Examples",
				page: "/forms/examples/",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: 251,
						title: "Advertising Evaluation Form",
						page: "/forms/examples/advertising_evaluation_form"
					},
					{
						id: 252,
						title: "Booking Form",
						page: "/forms/examples/booking_form"
					},
					{
						id: 253,
						title: "Car Rental Form",
						page: "/forms/examples/car_rental_form"
					},
					{
						id: 254,
						title: "Checkout Form",
						page: "/forms/examples/checkout_form"
					},
					{
						id: 255,
						title: "Contact Forms",
						page: "/forms/examples/contact_forms"
					},
					{
						id: 256,
						title: "Job Application Form",
						page: "/forms/examples/job_application_form"
					},
					{
						id: 257,
						title: "Medical History Form",
						page: "/forms/examples/medical_history_form"
					},
					{
						id: 258,
						title: "Registration Form",
						page: "/forms/examples/registration_form"
					},
					{
						id: 259,
						title: "Rental Application Form",
						page: "/forms/examples/rental_application_form"
					},
					{
						id: 2510,
						title: "Transaction Feedback Form",
						page: "/forms/examples/transaction_feedback_form"
					}
				]
			},
			{
				id: 26,
				title: "Wizard",
				page: "/forms/wizard"
			},
			{
				section_title: "WYSIWYG Editors"
			},
			{
				id: 271,
				title: "CKEditor",
				page: "/forms/wysiwyg/ckeditor",
				tag: 'new'
			},
			{
				id: 272,
				title: "Quill",
				page: "/forms/wysiwyg/quill",
				tag: 'new'
			}
		]
	},
	{
		id: 3,
		title: "Components",
		page: "/components",
		icon: "mdi mdi-puzzle",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 31,
				title: "Accordion",
				page: "/components/accordion"
			},
			{
				id: 32,
				title: "Alert",
				page: "/components/alert"
			},
			{
				id: 33,
				title: "Animations",
				page: "/components/animations",
				tag: 'new'
			},
			{
				id: 34,
				title: "Avatars",
				page: "/components/avatars"
			},
			{
				id: 35,
				title: "Badge, Label",
				page: "/components/badge_label"
			},
			{
				id: 36,
				title: "Base",
				page: "/components/base"
			},
			{
				id: 37,
				title: "Buttons",
				page: "/components/buttons"
			},
			{
				id: 38,
				title: "FAB Buttons",
				page: "/components/fab_buttons"
			},
			{
				id: 39,
				title: "Cards",
				page: "/components/cards"
			},
			{
				id: 310,
				title: "Color Palette",
				page: "/components/color_palette"
			},
			{
				id: 311,
				title: "Drop/Dropdowns",
				page: "/components/drop_dropdowns"
			},
			{
				id: 312,
				title: "Filters",
				page: "/components/filters"
			},
			{
				id: 3121,
				title: "Footer",
				page: "/components/footer",
				tag: 'new'
			},
			{
				id: 313,
				title: "Grid",
				page: "/components/grid"
			},
			{
				id: 314,
				title: "Icons",
				page: "/components/icons"
			},
			{
				id: 315,
				title: "Lists",
				page: "/components/lists"
			},
			{
				id: 316,
				title: "Masonry",
				page: "/components/masonry"
			},
			{
				id: 317,
				title: "Modals/Dialogs",
				page: "/components/modals_dialogs"
			},
			{
				id: 318,
				title: "Notifications",
				page: "/components/notifications"
			},
			{
				id: 3181,
				title: "Scrollable",
				page: "/components/scrollable",
				tag: 'new'
			},
			{
				id: 319,
				title: "Progress/Spinners",
				page: "/components/progress_spinners"
			},
			{
				id: 320,
				title: "Slider",
				page: "/components/slider"
			},
			{
				id: 321,
				title: "Sortable",
				page: "/components/sortable"
			},
			{
				id: 322,
				title: "Tables",
				page: "/components/tables"
			},
			{
				id: 323,
				title: "Tabs",
				page: "/components/tabs"
			},
			{
				id: 324,
				title: "Timeline",
				page: "/components/timeline"
			},
			{
				id: 325,
				title: "Toolbar",
				page: "/components/toolbar"
			},
			{
				id: 326,
				title: "Tooltips",
				page: "/components/tooltips"
			},
			{
				id: 327,
				title: "Transitions",
				page: "/components/transitions",
				tag: 'new'
			}
		]
	},
	{
		id: 4,
		title: "Pages",
		page: "/pages",
		icon: "mdi mdi-application",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 45,
				title: "Blank",
				page: "/pages/blank"
			},
			{
				id: 46,
				title: "Blank (expanded header)",
				page: "/pages/blank_header_expanded"
			},
			{
				id: 48,
				title: "Contact List",
				page: "/pages/contact_list"
			},
			{
				id: 49,
				title: "Contact List (single)",
				page: "/pages/contact_list_single"
			},
			{
				id: 410,
				title: "404 Error Page",
				page: "/url_to_test_404_error"
			},
			{
				id: 411,
				title: "Gallery",
				page: "/pages/gallery"
			},
			{
				id: 412,
				title: "Help/Faq",
				page: "/pages/help_faq"
			},
			{
				id: 413,
				title: "Login Page",
				page: "/login_page"
			},
			{
				id: 414,
				title: "POI listing",
				page: "/pages/poi_listing"
			},
			{
				id: 415,
				title: "Pricing Tables",
				page: "/pages/pricing_tables"
			},
			{
				id: 416,
				title: "Settings",
				page: "/pages/settings"
			},
			{
				id: 417,
				title: "User Profile",
				page: "/pages/user_profile"
			}
		]
	},
	{
		id: 5,
		title: "Plugins",
		page: "/plugins",
		icon: "mdi mdi-power-plug",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 51,
				title: "Ajax",
				page: "/plugins/ajax"
			},
			{
				id: 52,
				title: "Calendar",
				page: "/plugins/calendar"
			},
			{
				id: 53,
				title: "Charts",
				page: "/plugins/charts"
			},
			{
				id: 54,
				title: "Code Editor",
				page: "/plugins/code_editor"
			},
			{
				id: 55,
				title: "Data Grid",
				page: "/plugins/data_grid"
			},
			{
				id: 56,
				title: "Datatables",
				page: "/plugins/datatables"
			},
			{
				id: 57,
				title: "Diff Tool",
				page: "/plugins/diff_tool"
			},
			{
				id: 58,
				title: "Gantt Chart",
				page: "/plugins/gantt_chart"
			},
			{
				id: 59,
				title: "Google Maps",
				page: "/plugins/google_maps"
			},
			{
				id: 510,
				title: "Idle Timeout",
				page: "/plugins/idle_timeout"
			},
			{
				id: 511,
				title: "Image Cropper",
				page: "/plugins/image_cropper"
			},
			{
				id: 512,
				title: "Push Notifications",
				page: "/plugins/push_notifications"
			},
			{
				id: 513,
				title: "Tour",
				page: "/plugins/tour"
			},
			{
				id: 514,
				title: "Tree",
				page: "/plugins/tree"
			},
			{
				id: 515,
				title: "Vector Maps",
				page: "/plugins/vector_maps"
			}
		]
	},
	{
		id: 6,
		title: "Multi level",
		page: "",
		icon: "mdi mdi-format-line-weight",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: 61,
				title: "Submenu 1",
				page: ""
			},
			{
				id: 62,
				title: "Submenu 2",
				page: "",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: 621,
						title: "Submenu 2.1",
						page: ""
					},
					{
						id: 622,
						title: "Submenu 2.2",
						page: "",
						isOpen: false,
						level: 2,
						submenu: [
							{
								id: 6221,
								title: "Submenu 2.2.1",
								page: ""
							},
							{
								id: 6222,
								title: "Submenu 2.2.2",
								page: ""
							},
							{
								id: 6223,
								title: "Submenu 2.2.3",
								page: ""
							}
						]
					},
					{
						id: 623,
						title: "Submenu 2.3",
						page: ""
					},
					{
						id: 624,
						title: "Submenu 2.4",
						page: ""
					}
				]
			},
			{
				id: 63,
				title: "Submenu 3",
				page: ""
			},
			{
				id: 64,
				title: "Submenu 4",
				page: "",
				isOpen: false,
				level: 1,
				submenu: [
					{
						id: 641,
						title: "Submenu 4.1",
						page: ""
					},
					{
						id: 642,
						title: "Submenu 4.2",
						page: ""
					},
					{
						id: 643,
						title: "Submenu 4.3",
						page: ""
					}
				]
			}
		]
	}
];
