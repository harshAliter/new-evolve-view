<template>
	<div>Logout.....</div>
</template>
<script>
export default {
	head () {
		return {
			'title': 'Evolve - ' + this.$route.path
		}
	},
	setup() {
		definePageMeta({
			layout: 'logout',
		})
	},
	created: async function () {
 
		await this.$axios.$get('/api/v1/evolve/auth/logout').catch(e => { 
			 console.log("Error in Logout...")
		});
		useStore().logout(); 
		useStore().clearAllTab(); 
		this.$router.push('/home');
	}
	 
}
</script>
