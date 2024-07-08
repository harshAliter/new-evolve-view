<template>
	<div class="appbar-apps">
		<div
			v-for="app in list"
			:key="app.id"
			class="app"
			@click="handleAppClick(app.code,app.title,app.icon)" 
		>
			<!-- @click="handleAppClick(app.EvolveApp_ID,app.EvolveApp_Code,app.EvolveApp_Url,app.EvolveApp_Icon,app.EvolveApp_Name )" :aria-active="app.EvolveApp_ID == activeApp.EvolveApp_ID" -->
			<!-- App icon -->
			<div class="icon-container">
				<i :class="app.icon" class="app-icon-evolve"></i>
			</div>

			<!-- App detail -->
			<div class="detail">
				<div class="name">
					{{ app.title }}
				</div>
			</div>
		</div>
		<!-- </nuxt-link> -->
	</div>
</template>
<style scoped>
.app-icon-evolve:before{
        font-size: 24px;
}
</style>

<script>

export default {
	name: 'AppList',

	filters: {
		appDescription (val) {
			// return 'Evolve - '.concat(val);
			return 'Evolve Automation Platform';
		}
	},

	props: {
		list: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},

    computed: {
		activeApp(){
			return useStore().activeApp
		},
    },

	methods: {
		/**
         * Handle app selection
         * @param {MouseEvent} $event
         */
		handleAppClick (code, title, icon) {
			let obj = {
				title: title,
				code: code,
				icon:icon
			}
			// 	URL : URL,
			// 	ICON : ICON,
			// 	NAME : NAME
			// }
		  console.log("$event>>>>>", obj);
		    useStore().changeActiveApp(obj);
			// this.$store.commit("changeActiveApp", obj);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../index.scss";

.appbar-apps {
    @extend .regular-scroll;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 90px;
    grid-gap: 4px;
    margin-top: 1rem;
    height: auto;
    overflow-y: auto;

    @media screen and (max-width: 767px) {
        height: 210px;
        grid-auto-rows: auto;
        grid-gap: 2px;
        grid-template-columns: 1fr 1fr;
    }

    .app {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        transition: background-color 80ms linear;

        @media screen and (max-width: 767px) {
            flex-direction: row;
            justify-content: flex-start;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }

        &[aria-active] {
            background-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .icon-container {
            padding-top: 6px;
            padding-bottom: 6px;
    
            .app-icon {
                width: 36px;
                height: auto;
            }

            .mdi::before {
                color: #FFF;

                @media screen and (max-width: 767px) {
                    font-size: 22px;
                }
            }
        }

        .detail {
            padding-top: 6px;

            .name {
                font-family: $primary-font-stack;
                font-size: 1rem;
                line-height: 1rem;
                text-align: center;
                color: #FFF;

                @media screen and (max-width: 767px) {
                    margin-left: 4px;
                }
            }
        }
    }
}

@include use-dark {
    .appbar-apps {
        .app {
            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
            }

            &[aria-active] {
                box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
                background-color: rgba(255, 255, 255, 0.2);
            }


            .detail {
                .name {
                    color: $fr-dark-1;
                }
                .desc {
                    color: $fr-dark-4;
                }
            }
        }
    }
}
</style>