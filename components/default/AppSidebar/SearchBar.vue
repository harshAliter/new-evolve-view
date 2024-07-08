<template>
	<div class="search-bar">
		<label for="app-sidebar-menu-search-bar" class="material-icons icon">search</label>  
		 
		<input 
			id="app-sidebar-menu-search-bar" 
			v-model="search" 
			type="search" 
			placeholder="Search menu"
			class="menu-search-bar"
			spellcheck="off"
			autocomplete="off"
			:style="('collapsed' != undefined && 'collapsed' != 0) ? 'dispay: none;' : '' "
			@input="handleSearchInput(false)"
		>
		<button id="voiceBtn" class="hide-btn">
			<!-- <i id="icon" class="mdi mdi-microphone sc-icon-32" style="color: #fff;"></i> -->
			<i id="icon" class="material-icons icon">mic</i>
		</button>
	</div>
</template>

<script>
export default {
	name: 'AppSidebarSearch',

	data () {
		return {

			/**
             * Search value
             * @type {string}
             */
			search: '',
			isFirefox : false,
		}
	},
	mounted () {
		this.isFirefox = typeof InstallTrigger !== 'undefined';
		if(!this.isFirefox){
			this.speechFunc();
		}
	},

	methods: {
		/**
         * Handle key press event
         * @description Emit the 'searchinput' event
         * @param {InputEvent} event - Event
         */
		handleSearchInput (isVoice) {
			
			const value = this.search;
            
			this.$emit('searchinput', value, isVoice);
		},
		speechFunc (){
			const $icon = document.getElementById("icon");
			const $button = document.getElementById("voiceBtn");
			const recognition = new webkitSpeechRecognition();
			recognition.continuous = false;
			recognition.interimResults = true;
			recognition.lang = 'en-US';
			recognition.maxAlternatives = 1;
			$button.onclick = () => {
				if ($icon.textContent === 'mic') {
					recognition.start();
					$icon.textContent = 'stop';
					return;
				}
				recognition.stop();
			};
			recognition.onend = () => {
				console.log("end");
				$icon.textContent = 'mic';
				recognition.stop();	
				this.search = document.getElementById('app-sidebar-menu-search-bar').value;
				this.handleSearchInput(true)
			};

			recognition.onerror = e => {
				console.log('Error occurred in recognition: ' + e.error);
			};

			recognition.onresult = (e) => {
				document.getElementById('app-sidebar-menu-search-bar').value = e.results[0][0].transcript;
				recognition.stop();
				
			};
		},
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.search-bar {
    display: flex;
    width: 100%;
    // height: 34px;
    height: 25px;
    margin: 0px;
    background: #FFFFFF;
    border-radius: 5px;
    .icon {
        padding-left: 10px;
        padding-right: 10px;
        // font-size: 18px;
        font-size: 15px;
        color: #787486;
        // line-height: 34px;
        line-height: 28px;
    }

    .menu-search-bar {
        border: none;
        outline: none;
        // height: 34px;
        height: 25px;
        width: inherit;
        // font-size: 14px;
        font-size: 11px;
        // width: 100% ;
        &::placeholder {
            color: $fr-4;
        }
    }
}

@include use-dark {
    .search-bar {
        .icon {
            color: $fr-dark-4;
        }

        .menu-search-bar {
            background-color: transparent;
            color: inherit;

            &::placeholder {
                color: $fr-dark-4;
            }
        }
    }
}
#sc-sidebar-main:hover .search-bar{
display: flex !important;
}
@media(max-width:991px){
    #sc-sidebar-main .search-bar{
        display: flex !important;
    }
}
.hide-btn{
    border: none;
    background: none;
}
</style>