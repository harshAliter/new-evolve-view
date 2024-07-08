import { version } from '../package.json';
import config from '~/evolve.config.json'; 
import Cookies from 'js-cookie';

export const useStore = defineStore({
    id: 'main', // unique identifier for the store
    state: () => {
        return {
            appVersion: version,
            sidebarMainExpanded: true,
            sidebarMainAccordionMode: false,
            sidebarMainScrollToActive: false,
            cardFixed: false,
            headerExpanded: false,
            pageFixed: false,
            appTheme: 'theme-default',
            offcanvasPresent: false,
            offcanvasActive: false,
            evolveConfig: config,
            loggedIn: false,
            strategy: "local",
            user: false,
            evolveHeaderData: [],
            collapsedSidebar: reactive(true),
            activeAppCode: null,
            activeApp: {
                title: "Evolve App",
                icon: "mdi mdi-format-list-bulleted",
                code: "NOCODE"
            },
            activeFocusedMode: false,
            activeFinder: false,
            activeTheme: 'light',
            tabStack: [],
            tabStackParams: {},
            activeTab: null,
            favouriteChange: false,
            userUnit: [],
            notificationMsg: "this is test",
            enableFullscreen: 0,
            notificationMsg: {
                timeout: '',
                message: '',
                type: ''
            },
            screenshotMsg: {
                message: '',
                isTicketCreate: false,
            },
            pageData: {
                masterCode: "",
                pageData: {}
            },
            menuList: [],
            roleMenuArray: [],
            auth: {}
        }
    },

    getters: {
        getSidebarState: state => state.sidebarMainExpanded,

        authenticated(state) { return state.loggedIn },

        evolveUser(state) { return state.auth.user },

        appCode(state) {
            return state.activeAppCode;
        },

        activeAppList(state) {
            return state.activeApp;
        },

        focusedMode(state) {
            return state.activeFocusedMode;
        },

        finderView(state) {
            return state.activeFinder;
        },

        tabs(state) {
            return state.tabStack;
        },

        tabParams(state) {
            return state.tabStackParams;
        },

        userUnitList(state) {
            return state.userUnit;
        },

        fullscreen(state) {
            return state.enableFullscreen;
        },

        evolveTicketGenrateAction: state => {
            return state.screenshotMsg
        },

        notificationMsgAction: state => state.notificationMsg,

        pageDataList: state => state.pageData,

        menuAppList: state => state.menuList,

        roleMenuArrayList(state) { return state.roleMenuArray },

        userDetails(state) { return state.user },

        collapsedSidebarValue(state) { return state.collapsedSidebar }

    },

    actions: {

        toggleSidebar(data) {
            this.collapsedSidebar = !data;
        },

        toggleFocusedMode(data) {
            this.activeFocusedMode = !data.activeFocusedMode;
        },

        async addNewTab(newTab) {
            try {
                let ts = new Date().getTime();
                if (newTab.url.charAt(0) == '~') { // check is URL have ~ Sign
                    newTab.url = newTab.url.substring(1); // Remove ~ from URL 
                    newTab.params.tempUrl = newTab.url + '~' + ts;
                } else {
                    newTab.params.tempUrl = newTab.url
                }

                const tab = this.tabStack.find(item => item.url === newTab.url);
                console.log("this.tabStack", this.tabStack);
                if (tab) {
                    delete this.tabStackParams[newTab.url];
                } else {
                    this.tabStack.push(newTab);
                    if (newTab.params.EvolveMenu_Id != undefined) {
                    }
                }

                if ('params' in newTab) {
                    this.tabStackParams[newTab.url] = newTab.params;
                }

                // remove first tab to prevent tab stack overflow.
                if (this.tabStack.length > 5) {
                    this.tabStack.shift();
                }

                this.CHANGE_ACTIVE_TAB(newTab.url);

            } catch (error) {
                console.error(error);
            }
        },

        async removeOneTab(tabUrl) {
            try {
                let EvolveMenu_Id = "";
                if (tabUrl in this.tabStackParams) {
                    EvolveMenu_Id = this.tabStackParams[tabUrl].EvolveMenu_Id;
                    delete this.tabStackParams[tabUrl];
                }

                if (EvolveMenu_Id != "" && EvolveMenu_Id != undefined) {
                    await this.$axios.$post('/api/v1/evolve/addAction', { menuUrl: tabUrl, EvolveMenu_Id: EvolveMenu_Id, actionType: 'REMOVE' }).catch(e => { });
                }

                const stack = this.tabStack.filter(tab => tab.url !== tabUrl);

                this.tabStack = stack || [];

                if (this.tabStack.length > 0 && this.activeTab === tabUrl) {
                    const firstTab = this.tabStack[this.tabStack.length - 1];

                    this.CHANGE_ACTIVE_TAB(firstTab.url);
                }
                if (this.tabStack.length === 0) {

                    this.CHANGE_ACTIVE_TAB(null);
                    this.$router.push({
                        path: '/root',
                        query: {}
                    });
                }
            } catch (error) {
                console.error("Error While Remove Tab", error.message);
            }
        },

        setActiveTab(tabData) {
            const exists = this.tabStack.findIndex(item => item.url === tabData.url);
            if (exists !== -1) {
                this.CHANGE_ACTIVE_TAB(tabData.url);
                if (tabData.params) {
                    if (tabData.params.EvolveMenu_Id != undefined) {
                        // const { axios } = useNuxtApp();
                        this.$axios.$post('/api/v1/evolve/addAction', { menuUrl: tabData.url, EvolveMenu_Id: tabData.params.EvolveMenu_Id, actionType: 'SWITCH' }).catch(e => { });
                    }
                }

            }
        },

        async addToFavouriteClick(id) {
            try {
                let FavouriteObj = await this.$axios.$post('/api/v1/evolve/setFavourite', { EvolveMenu_Id: id, EvolveUser_ID: useStore().user.EvolveUser_ID }).catch(e => {
                });

                if (FavouriteObj) {
                    this.favouriteChange = (this.favouriteChange == true) ? false : true;
                }

            } catch (error) {
                console.log(error);
            }
        },

        clearAllTab() {
            this.tabStack = [];
            this.tabStackParams = [];
            this.activeTab = null;
        },

        async userUnits() {
            try {
                this.clearAllTab();
                this.userUnit = [];
                let userUnitsObj = await this.$axios.$get('/api/v1/evolve/getUserUnits').catch(e => { });
                if (userUnitsObj.result != null) {
                    for (let i = 0; i < userUnitsObj.result.length; i++) {
                        this.userUnit.push(userUnitsObj.result[i]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        async evolveNotification(data) {
            let errormsg = data.code;
            let isTicketCreate;
            let varb = (data.var == undefined) ? [] : data.var;
            if (typeof data === 'string' || data instanceof String) {
                errormsg = data;
                data = {
                    code: '',
                    type: 0
                }
            }

            if ((!isNaN(errormsg)) && data.code != '') {

                let notiMsg = await this.$axios.$post('/api/v1/evolve/evolveNotificationMsg', { code: data.code, var: varb }).catch(e => { });
                if (notiMsg.result != null) {
                    errormsg = notiMsg.result.code;
                    data.pos = (data.pos == undefined) ? notiMsg.result.pos : data.pos;
                    data.type = (data.type == undefined) ? notiMsg.result.type : data.type;
                    data.time = (data.type == undefined) ? notiMsg.result.time : data.time;
                    isTicketCreate = notiMsg.result?.isTicketCreate
                }
            }
            let type = (data.type == undefined) ? 'primary' : 'primary';
            type = (data.type == 0) ? 'primary' : type;
            type = (data.type == 1) ? 'success' : type;
            type = (data.type == 2) ? 'danger' : type;
            type = (data.type == 3) ? 'warning' : type;
            data.time = (data.type == 0 && data.time == undefined) ? 2000 : data.time;
            data.time = (data.type == 1 && data.time == undefined) ? 2000 : data.time;
            let pos = (data.pos == undefined) ? 'C' : data.pos;


            let dataNoti = {
                timeout: (data.time == undefined) ? false : data.time,
                message: errormsg,
                type: type,
                pos: pos,
                isTicketCreate: isTicketCreate ? isTicketCreate : data.isTicketCreate
            }

            this.notificationMsg = {
                timeout: dataNoti.timeout,
                message: dataNoti.message,
                type: dataNoti.type,
                pos: dataNoti.pos,
                isTicketCreate: dataNoti.isTicketCreate

            };

        },

        async evolveTicketGenrate(data) {
            this.screenshotMsg = {
                message: data.message,
                isTicketCreate:true
            };
        },

        async loadPageData(data) {
            try {
                let pageData = await this.$axios.$post('/pageData', data).catch(e => { });
                if (pageData.result != undefined && pageData.result != null) {

                    this.pageData = {
                        masterCode: data.masterCode,
                        pageData: data.pageData
                    }
                }

            } catch (error) {
                console.log(error);
            }
        },

        async menuApps(data) {
            this.menuList = data;
        },

        async setRoleMenuArray(data) {
            this.roleMenuArray = data;
        },

        async setUserData(data) {
            let token = Cookies.get('authToken') || localStorage.getItem('token');

            if (data) {
                if (token) {
                    data["EvolveToken"] = token;
                }
                this.user = data;
                this.loggedIn = true;
                if (data?.EvolveToken) {
                    Cookies.set('authToken', data.EvolveToken, { expires: 7 });
                    localStorage.setItem('token', data.EvolveToken);
                }
            } else {
                this.user = {};
                this.loggedIn = false;
                Cookies.remove('authToken');
                localStorage.removeItem('token');
            }

        },

        changeActiveAppCode(code) {
            this.activeAppCode = code;
        },

        changeActiveApp(data) {
            this.activeApp = data;
        },

        CHANGE_ACTIVE_TAB(tab) {
            if (!tab) {
                this.activeTab = null;
                return;
            };
            let tabData = null;
            if (typeof tab === 'object') {
                tabData = tab;
            } else {
                if (this.tabStack) {
                    if (this.tabStack.length > 0) {
                        let tabInd = this.tabStack.findIndex(v => v.url === tab);
                        if (tabInd != -1) {
                            tabData = this.tabStack[tabInd];
                        };
                    }
                }
            };
            if (tabData) {
                if (tabData.params) {
                    if (tabData.params.EvolveMenu_Id != undefined) {
                        // const { axios } = useNuxtApp();
                        this.$axios.$post('/api/v1/evolve/addAction', { menuUrl: tabData.url, EvolveMenu_Id: tabData.params.EvolveMenu_Id, actionType: 'SWITCH' }).catch(e => { });
                    }
                }
            }
            let url = (typeof tab === 'object') ? tab.url : tab;

            this.activeTab = url;
            this.$router.push({
                path: this.tabStackParams[url].tempUrl,
                query: this.tabStackParams[url]
            });
        },

        logout() {
            this.setUserData(null);
        },

        async setFullscreen(data) {
            this.enableFullscreen = data;
        },

    },
});