<template>
	<div class="my-favourite">
		<div class="fav-header">
			<p>
				<i class="mdi mdi-star md-color-yellow-800" />	<span :style="(collapsed != undefined && collapsed != 0) ? 'display:none; ' : '' " class="fav-head-lable">Favourite</span>  
			</p>
		</div>
		<div class="my-favourite-list">
			<nav class="menu" :aria-collapsed="null">
				<div
					v-for="fav in favouriteList" 
					:key="fav.EvolveFavourite_ID"
					class="menu-item"
				>
					<div 
						class="menu-item-content" 
						aria-label="menu-item"
						@click="handleClick(fav.EvolveMenu_Name, fav.EvolveMenu_Url,fav.EvolveMenu_SrNo)"
					>
						<i class="mdi mdi-star md-color-yellow-600" :class="fav.EvolveMenu_Ico" :title="fav.EvolveMenu_Name" aria-label="menu-item"></i>
						<span :style="(collapsed != undefined && collapsed != 0) ? 'display:none; ' : '' " class="label" aria-label="menu-item">{{ fav.EvolveMenu_Name }}</span>
					</div>
				</div>
			</nav>
		</div>
		<!-- <div class="ask-evy">
			<img src="../../../assets/img/Ask_EVY.png" alt="askyEVY">
		</div> -->
	</div>
</template>

<script>

export default {
	name: 'AppSidebarMyFavourite',
	props: {
		list: {
			type: Array,
			default: function () {
				return []
			}
		},
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			favouriteList : [],
			dataWidth :  0,
		}
	},
	computed: {
		favouriteChange(){
			return useStore().favouriteChange
		},
		user () {
			return this.$auth.$state.user;
		},
	},
	 watch: {
		 favouriteChange (){
			this.getFavourite();
			useStore().evolveNotification({code: 121});
		 }
	},
	created: async function () {
		await this.getFavourite();
		if (process.browser) {
			this.dataWidth = window.innerWidth;
			window.addEventListener('resize', this.onResize);
		}
		
	},
	methods: {
		onResize () {
			this.dataWidth = window.innerWidth
		},
		handleClick (title, url, id) {
			if(!url.startsWith("#")){

				useStore().addNewTab({
					title, url,
					params: {
						EvolveMenu_Id: id,
						pageTitle : title
					}
				});


				/**  Start : EvolveV3TA */
				// this.$store.dispatch('addNewTab', {
				// 	title, url,
				// 	params: {
				// 		EvolveMenu_Id: id
				// 	}
				// });
				/**  Start : EvolveV3TAB  */
			}
		},
		getFavourite: async function () {
			let  getFavourite = await this.$axios.$post("/api/v1/evolve/getFavourite", {}).catch((e) => {});
			if (getFavourite) {
				if (getFavourite.statusCode == 200) {
					this.favouriteList = getFavourite.result;
				}else{
					this.favouriteList = [];
				}
			}
		},
	}
}
</script>
<style lang="scss" scoped>
@import "./index.scss";

.my-favourite {
    
       height: 350px;
     //  border-top: 1.3px solid #887878;
       
       .fav-header{
            padding: 8px 8px;
            background-color:#5a87c5;
            font-size: 14px;
            margin: 0px;
			height: 19px;
			//border-radius: 0px 12px 12px 0px;
			color: #FFF;
       }
	   .fav-head-lable{
		font-size: 14px !important;
	   }
       .my-favourite-list{
		   .menu {
			  	   max-height:170px;
			   height: 100%;
		   }
           ul{
               list-style-type:none;
               padding-left: 2px;
           }
            .mdi:before {
                font-size: 15px;
            }
           span{
               font-size: 12px;
               font-family: sans-serif;
           }
       }
}
#sc-sidebar-main:hover .fav-head-lable{
	display: inline-block !important;
}
.ask-evy{
	    position: absolute;
    bottom: 26px;
}
.ask-evy img{
	    height: 74px;
    width: 120px;
}
@media(max-width:991px){
.fav-head-lable{
	display: inline-block !important;
}
}

</style>
 