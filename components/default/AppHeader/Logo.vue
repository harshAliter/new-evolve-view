<template>
	<div
		title="Evolve Dashbaord"
		class="app-logo"
		@click="handleLogoClick()"
	>
		<img :src="url" :alt="title" class="app-logo-image">
		<h2 class="app-logo-title">
			{{ title }}
		</h2>
	</div>
</template>

<script>
// import { mapActions, mapState } from "vuex";

export default {
	name: "AppHeaderLogo",

	props: {
		url: {
			type: String,
			required: true,
		},

		title: {
			type: String,
			default: "Evolve",
		},
	},
	computed: { 
		collapsedSidebar(){
			return useStore().collapsedSidebar
		},
		user () {
			return this.$auth.$state.user;
		},
	},
	methods: {
		
		/**
         * Handle app selection
         * @param {MouseEvent} $event
         */
		handleLogoClick () {
			let obj = {
				title: "Evolve App",
				icon: "mdi mdi-format-list-bulleted",
				code: "NOCODE"
			}
		  
			useStore().changeActiveApp(obj);
			useStore().toggleSidebar();

			
		}
	}

};
</script>

<style lang="scss">
@import "./index.scss";

.app-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
//   height: 30px;
height: 24px;
margin-left: 12px;
//  margin-left: 16px;
 cursor: pointer;

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }

  .app-logo-image {
    width: auto;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    @media screen and (max-width: 767px) {
      width: 32px;
    }
  }

  .app-logo-title {
    // font-size: 22px;
	font-size: 17px;
    font-family: sans-serif;
color: #FFF;
    @media screen and (max-width: 767px) {
     // font-size: 1.3rem;
      margin-left: 2px;
    }
  }
}

@include use-dark {
  .app-logo {
    .app-logo-title {
      color: $fr-dark;
    }
  }
}
</style>