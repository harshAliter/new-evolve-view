<template>
	<div>
		<client-only>
		<div v-if="((user.EvolveEnvironment)?.toLowerCase() == 'development')" class="development-type">
			<h6>Evolve {{ user.EvolveEnvironment }} Environment</h6>
		</div>
		<!--:style="(user.EvolveEnvironment == 'development') ? 'border-bottom: 4px solid #e3f021;' : ''" --> 
		<div id="app-header" ref="header" :class="((user.EvolveEnvironment)?.toLowerCase() == 'development') ? 'development-header' : ''">
			<!-- Container -->
			<div class="app-header-container">
				<div class="app-header-card">
					<!-- App sidebar toggler -->
					<app-icon-button 
						id="app-mobile-sidebar-toggler" 
						:icon="mobileSidebarTogglerIcon"
						@click="handleMobileSidebarToggleAction"
					/>

					<!-- <div class="aria-left"> -->
					<!-- App header logo -->
					<app-header-logo :url="logo" />

					<!-- App finder invoker -->
					<!-- <app-header-fake-search-bar @click="handleSearchAction" />  -->

					<!-- -->
					<app-evolve-bar />
				<!--</div> -->
				</div>

				<div v-if="isCounter" class="countdown" :class="isCounterEnd ? 'blink-border' : '' ">
					<div class="uk-flex uk-flex-middle" :class="isCounterEnd ? 'blink-hard' : '' ">
						<i class="mdi mdi-clock-outline"></i>
						<h1>
							{{ minutes }}:{{ seconds }}
						</h1>
					</div>
				</div>

				<!-- App navigation bar -->
				<nav class="app-header-navmenu">
					<!-- Theme toggler -->
					<!-- <app-header-theme-toggler />   -->

					<!-- Screen resizer -->
					<app-header-screen-resizer /> 

					<!-- Focused mode -->
					<!-- <app-header-focused-mode class="hide-mobile" />  -->

					<!-- For choose language -->
					<app-header-translate />

					<!-- App notifications -->
					<app-header-notifications :notifications="notificationsList" :count="notiCount" @clearall="clearNotifications" />

					<!-- Apps by evolve -->
					<app-header-appbar /> 

					<!-- User profile -->
					<app-header-user-profile />
				</nav>
			</div>
		<!-- End app-header-container -->
		</div>
		</client-only>
	</div>
</template>

<script>
import AppLogo from './Logo.vue';
// import AppFakeSearchBar from './FakeSearchBar.vue';
import AppHeaderAppbar from './Appbar';
import AppUserProfile from './UserProfile';
import AppNotifications from './Notifications';
import AppTranslate from './Translate';
import AppEvolveBar from './EvolveBar';
import AppScreenResizer from './ScreenResizer';

export default {
	name: 'AppHeader',

	components: {
		'app-header-logo': AppLogo,
		// 'app-header-fake-search-bar': AppFakeSearchBar,
		'app-header-appbar': AppHeaderAppbar,
		'app-header-user-profile': AppUserProfile,
		'app-header-notifications': AppNotifications,
		'app-header-translate': AppTranslate,
		'app-evolve-bar':AppEvolveBar,
		// 'app-header-theme-toggler': AppThemeToggler,
		'app-header-screen-resizer': AppScreenResizer,
		// 'app-header-focused-mode': AppFocusedMode
	},

	filters: {
	
	},

	props: {
		logo: {
			type: String,
			required: true
		}
	},

	data () {
		return {
			appTitle: 'Evolve',
			mobileSidebarTogglerIcon: 'menu',
			notificationsList : [],
			notiCount : '0',
			timer : '',
			minutes: 0,
      		seconds: 0,
			isCounter:false,
			isCounterEnd:false,
		}
	},
	computed: { 
		collapsedSidebar () {
			return useStore().collapsedSidebar
		},
		user () {
			return useStore().user;
		},
	},
	watch: {
		collapsedSidebar (newState) {
			let icon;

			if (newState=== true) {
				icon = 'menu'
			}
			else {
				icon = 'close';
			}

			this.mobileSidebarTogglerIcon = icon;
		}
	},
	created: async function () {
		this.getNotifications();
		//  this.$socket.on('ISNOTIFICATION'+ this.$auth.$state.user.EvolveUser_ID, (data)=>{
		// 	this.getNotifications();
		//  });
	},
	beforeDestroy () {
		 clearInterval(this.timer)
	},
	beforeMount () {
		
		// this.$socket.on('SocketTime_'+ this.$auth.$state.user.EvolveUser_ID, (data) =>{
		// 	this.isCounter=true,
		
		// 	this.minutes=data.minutes;
		// 	this.seconds=data.seconds;
		// 	if(data.minutes==0 && data.seconds==0)
		// 	{
		// 		setTimeout(()=>{
		// 			this.isCounter=false;
		// 		}, 2000)
    	// 	} 
		// 	if(data.minutes==0 && data.seconds<=30){
		// 		this.isCounterEnd=true;
		// 	}
        
		// })
	},
	methods: {
    
		handleSearchAction (event) {
			this.$emit('triggersearch', event);
		},
		handleMobileSidebarToggleAction () {
			useStore().toggleSidebar();
		},
		async getNotifications () {
			const response = await this.$axios.$get('/api/v1/evolve/getNotifications').catch ((error) => {});
			// console.log("response>>>", response);
			if (response.statusCode === 200) {
				this.notificationsList = response.result;
				this.notiCount = response.count;
			} 
		},
		clearNotifications () {
			 this.notificationsList = [];
			 this.notiCount = '0'; 
		}
	}
}
</script>

<style lang="scss">
@import './index.scss';
.development-type{
	background-image: linear-gradient(rgba(221,0,0, 1), rgb(237,1,1));
	text-align: center;
	height: 16px;
	h6{
    font-size: 12px;
	line-height: 2px;
	color: #fff;
	}
}
#app-header {

    // display: flex;
    // flex-direction: column;
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // width: 100%;
    // height: 55px;
    // z-index: 500;
    // border-bottom: 1px solid #DBDBDB;
    // background-color: #f8f9fa;
    // transition: background-color .12s linear,box-shadow 80ms ease;

   /*  display: flex;
    // flex-direction: column;
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
    z-index: 500;
    // border-bottom-left-radius: 24px;
    // border-bottom-right-radius: 24px;
    border-width: 2px;
    border-style: solid;
    border-color: #000000; // $stroke-1;
    background-color:#1565c0;// $bg;
    box-shadow: 0 2px 12px #DDD;
    transition: background-color 120ms linear, box-shadow 80ms ease; */
.countdown{
    color: #fff;
    // font-size: 24px;
    border: 2px solid ;
    padding: 0px 22px;
	margin: 2px;
	// height: 25px;
	// width: 70px;
	
}
.countdown h1{
    color: #fff;
    font-size: 20px;
    padding: 0px;
	font-weight: bolder;
}



	.app-header-card {
		display: flex;
		align-items: center;
		#evolve-selection-bar{
			padding-left: 120px;
			@media screen and (max-width: 767px) {
				padding-left: 46px;
			}
		}
	}

    @media screen and (max-width: 991px) {
        height: 44px;
    }

    .app-header-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: inherit;
        height: inherit;

		.aria-left {
			width: auto;
			display: flex;
			height: inherit;
		}

        #app-mobile-sidebar-toggler{
			  	display: none;
            margin-left: 1rem;

    			@media screen and (max-width: 991px) {
					 display: flex;
				}
        }
    }

    .extended-bar {
        position: relative;
    }

    .app-header-navmenu {
        // margin-right: 1.3rem;
		margin-right: 16.4px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        @media screen and (max-width: 991px) {
            justify-content: space-evenly;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: $stroke-1;
            background-color: $bg;
        }
    }
}

@include use-dark {
    #app-header {
        border-bottom-color: $stroke-dark-1;
        background-color: #1565c0; // $bg-dark-2;
        box-shadow: none;

        &:hover {
            box-shadow: none;
        }

		.app-header-card {
			display: flex;
			#evolve-selection-bar{
				padding-left: 145px;
			}
		}

        .app-header-navmenu {
            @media screen and (max-width: 991px) {
                border-top-color: $stroke-dark-1;
                background-color: $bg-dark;
            }
        }
    }
}
.mdi-clock-outline:before{
	font-size: 18px !important;
	padding-top: 0px !important;
	color: #fff;
}
.mdi-clock-outline{
	font-size: 11px;
	margin-right: 5px;
}
.blink-hard *{
  color: #fff;
  animation: blinker 1s step-end infinite;
}
.blink-hard .mdi-clock-outline:before{
  animation: blinker 1s step-end infinite;
}
.blink-border{
	animation: border 1s step-end infinite;
}
@keyframes blinker {
	0% {
	color: #900000 ;
  }
  50% {
	color: #fff ;
  }
}
@keyframes border {
  0% {
	border-color: #900000;
  }
  50%{
	border-color: #fff;
  }
  
}
.development-header{
	top: 16px !important;
}



</style>