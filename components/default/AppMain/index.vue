<template>
	<div id="sc-page-wrapper" :style="(widthOpt == false && (fullscreen == undefined || fullscreen == 0))? 'padding-left: 60px !important;' : (fullscreen != undefined && fullscreen != 0) ? 'padding-left: 0px !important;margin-top:0px !important' : '' ">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'AppMain',
	props: {
		widthOpt: {
			type: Boolean
            
		}
	},

	computed: {
	
        fullscreen() {
            return useStore().fullscreen;
        }
	},
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

#app-main {
    @extend .regular-scroll;
    margin-top: 7px;
    //padding-left: 0;
    padding-right: 0;
    // overflow: auto;
    padding-bottom: 3rem;
    // width: 100%; //width: 100vw;
    // height: 100%; //width: 100vw;
    width: 100vw;
    height: 1000px;
//   object-fit: cover;
//   object-position: bottom;




    margin-top: 5px !important;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-left: 10px !important;
    background-color: #FFFFFF;
}

</style>