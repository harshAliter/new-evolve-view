<template>
	<div ref="contextRoot" class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-view-notification-button"
			icon="notifications"
			tooltip="Notifications"
			:badge="count"
			:fill="viewContext"
			:active="viewContext"
			@click="handleIconAction"
		/>
		<!-- Context -->
		<!-- notificationList -->
		<app-notifications-context 
			v-if="viewContext"
			:notifications="notifications" 
			@clearall="clearNotifications"
		/>
	</div>
</template>
<script>
import NotificationsContext from './Context';
import SkippableContext from '~/mixins/skippable-context';

export default {
	name: 'AppHeaderNotifications',
	components: {
		'app-notifications-context': NotificationsContext
	},
	mixins: [SkippableContext],
	props: {
		notifications: {
			type: Array,
			default: function () {
				return [];
			}
		},
		count: {
			type: String,
			default: '0'
		}
	},

	data () {
		return { }
	},

	methods: {
		clearNotifications ($event) {
			this.$emit('clearall', $event);
			// this.notifications = [];
		}
		 
		
	}
}
</script>