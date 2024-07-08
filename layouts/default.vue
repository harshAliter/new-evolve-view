<template>
  <client-only>
    <div
      :aria-expanded="focusedMode"
      :style="fullscreen != undefined && fullscreen != 0 ? 'padding: 0px;' : ''"
    >
      <app-header
        v-show="!focusedMode"
        :logo="AppLogo"
        :style="
          fullscreen != undefined && fullscreen != 0 ? 'display: none;' : ''
        "
        @triggersearch="openFinder"
      >
      </app-header>

      <app-sidebar
        v-show="!focusedMode"
        enable-menu-search
        :style="
          fullscreen != undefined && fullscreen != 0 ? 'display: none;' : ''
        "
      ></app-sidebar>

      <app-main :width-opt="collapsedSidebar">
        <div id="evolve_tabs_root">
          <div class="evolve-tabs-container">
            <ul class="evolve-tabs">
              <li
                v-for="(tabItem, tabItemIndex) in tabs"
                :key="tabItemIndex"
                :class="{
                  'evolve-tab-item': true,
                  active: tabItem.url === activeTab,
                }"
                @click="handleTabSwitchAction(tabItem)"
              >
                <span class="evolve-tab-item-content">
                  <span class="label">{{ tabItem.title }}</span>
                  <span
                    class="close-icon close-icon-area"
                    title="Close this tab"
                    :data-tab-name="tabItem.title"
                    :data-tab-index="tabItemIndex"
                    @click.stop="handleCloseTabAction(tabItem.url)"
                  >
                    <i
                      class="close-icon-area mdi mdi-close"
                      style="color: #000 !important"
                    ></i>
                  </span>
                </span>
              </li>
              <li v-if="tabs.length == 0" class="evolve-tab-item active">
                <span class="evolve-tab-item-content">
                  <span class="label">{{ $route.name }}</span>
                  <span
                    class="close-icon close-icon-area"
                    title="Close this tab"
                    :data-tab-name="$route.name"
                    data-tab-index="1"
                    @click.stop="handleCloseTabAction($route.path)"
                  >
                    <i
                      class="close-icon-area mdi mdi-close"
                      style="color: #000 !important"
                    ></i>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div id="evolve_tabs_contecnt_root">
          <NuxtPage :keepalive="true"  />
        </div>
      </app-main>

      <template v-if="finderView">
        <app-finder
          :autofocus="finderView"
          @blur="closeFinder"
          @escape="closeFinder"
        />
      </template>

      <template v-if="focusedMode">
        <div class="focused-mode-exit-button">
          <app-icon-button
            icon="close"
            tooltip="Escape"
            size="small"
            @click="exitFocusedMode"
          />
        </div>
      </template>
      <div id="user-name-label">
        <div class="copyright">
          <span
            >© 2023 Aliter Business Solutions Pvt Ltd. All Rights
            Reserved.</span
          >
        </div>
        <div class="notification_area">
          <!-- <span v-if="notificationDiv">{{ notificationMsgAction.msg }}</span> -->
        </div>
        <div class="server_datetime">
          {{ timer }}
        </div>

        <div class="user_name">
          {{ user.EvolveUser_Name }}
        </div>
      </div>
    </div>
  </client-only>
</template>

<style>
.copyright {
  display: inline-block;
  /* float: left; */
  padding-left: 175px;
}
.icon_anim {
  animation: fade 1s infinite;
}
@keyframes fade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.container {
  margin: 0 auto;
  padding: 20px;
}
.mdi-book-open-variant::before {
  font-size: 26px !important;
  line-height: 28px !important;
}
.container p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
  font-family: "Roboto" !important;
  font-weight: 500;
}
i.mdi.mdi-information-outline:before {
  font-size: 50px;
  line-height: normal;
}
.evolve-noti-lable i {
  float: left;
}

.evolve-noti-lable-txt {
  font-size: 18px;
}

.evolve-noti-text {
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 395px;
  font-family: monospace;
}

.evolve-notification {
  padding: 5% 5%;
  margin: -17px;
}

.evolve-noti-lable {
  margin-bottom: 8px;
}

.uk-notification-message {
  margin-left: -120px;
  width: 400px;
  top: 40%;
  left: 40%;
}
@media (max-width: 540px) {
  .uk-notification-message {
    width: 280px !important;
  }
  .uk-notification {
    left: 0px;
  }
  .uk-notification.uk-notification-top-right {
    right: 60px !important;
  }
}

.uk-notification.uk-notification-top-center {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  transition: opacity 0.15s linear;
  width: 100% !important;
  margin: 0px !important;
}

.uk-notification.uk-notification-bottom-right {
  right: 120px !important;
}

.uk-notification.uk-notification-top-left {
  top: 10%;
}

.uk-notification.uk-notification-top-right {
  right: 180px;
  top: 10%;
}
@viewport {
  zoom: 80%;
  width: extend-to-zoom;
}

</style>
<script>
import AppLogo from "~/assets/logo/logo.png";
const keyStroke = new Set();
var captureSession = false;
import { scHelpers } from "@/assets/js/utils";
const { uniqueID } = scHelpers;
import html2canvas from "html2canvas";
import appHeader from "~/components/default/AppHeader/index.vue";
import AppSidebar from "~/components/default/AppSidebar/index.vue";
import AppMain from "~/components/default/AppMain/index.vue";

export default {
  name: "Default",
  components: {
    "app-header": appHeader,
    "app-sidebar": AppSidebar,
    "app-main": AppMain,
    ScInput: () =>defineAsyncComponent(import("~/components/Input")),
    "app-finder": () =>defineAsyncComponent(import("~/components/default/AppFinder")),
  },

  data() {
    return {
      
      uniqId: uniqueID(),
      isTicketCreateBtn: false,
      ersubject: "",
      erbody: "",
      ermsg: "",
      fileData: "",

      timerInt: "",
      timer: "HH:MM:SS",
      appsList: [],
      appCode: useStore().EvolveAppCode,
      AppLogo,
      notificationDiv: false,

      timeleft: 30,
      warningTimer: null,
      IdleTimeout: false,
      translate: {
        create_country: "Country Create",
        upload_country: "Upload Country",
        search_here: "Search Here",
        country_code: "Country Code",
        country_desc: "Country Desc.",
        sample_file: "Sample File",
        action: "Action",
      },
      intervalObj: {},
      token: useStore().user.EvolveToken,
      downtimeWarningData: "",
      downtimeActiveData: "",
      isDownTimeActive: true,
      // askEvyUrl : 'https://embed.tawk.to/6643002e9a809f19fb30a8a8/1htqrhe3n'

      askEvyUrl: "https://embed.tawk.to/664359379a809f19fb30c2f0/1htrh9174",
      socket: null,
      // user: {},
    };
  },
  computed: {
    // 	scriptTag () {

    // 	  return `
    //   		 <script type="text/javascript">
    // 			var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    // 			(function(){
    // 			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    // 			s1.async=true;
    // 			s1.src='${this.askEvyUrl}';
    // 			s1.charset='UTF-8';
    // 			s1.setAttribute('crossorigin','*');
    // 			s0.parentNode.insertBefore(s1,s0);
    // 			})();
    // 		<\/script>
    //   `;
    // 	},

    user() {
      return useStore().user;
    },
    appTheme() {
      return useStore().appTheme;
    },
    cardFixed() {
      return useStore().cardFixed;
    },
    pageFixed() {
      return useStore().pageFixed;
    },
    headerExpanded() {
      return useStore().headerExpanded;
    },
    activeTab() {
      return useStore().activeTab;
    },
    collapsedSidebar() {
      return useStore().collapsedSidebar;
    },
    focusedMode() {
      return useStore().focusedMode;
    },
    finderView() {
      return useStore().finderView;
    },
    notificationMsgAction() {
      return useStore().notificationMsgAction;
    },
    tabs() {
      return useStore().tabs;
    },
    fullscreen() {
      return useStore().fullscreen;
    },
    pageData() {
      return useStore().pageData;
    },
    evolveTicketGenrateAction() {
      return useStore().evolveTicketGenrateAction;
    },
   
  },
  onIdle() {
    console.log("onIdle>>>>>>>>>>>>>>>>>>>");
    if (this.IdleTimeout == true) {
      UIkit.modal("#idle-modal").show();
      this.countDown();
    }
  },
  onActive() {},
  watch: {
    $route(newRoute) {
      this.updateCurrentApp();
    },
    appTheme(theme) {
      const $html = $("html");
      const themes =
        "sc-theme-a sc-theme-b sc-theme-c sc-theme-d sc-theme-e sc-theme-f sc-theme-g sc-theme-h";
      $html.removeClass(themes);
      if (theme !== "theme-default") {
        $html.addClass("sc-" + theme);
      }
    },
    pageFixed() {
      const $html = $("html");
      $html.toggleClass("sc-page-fixed");
    },
    cardFixed() {
      const $html = $("html");
      $html.toggleClass("sc-card-fixed");
    },
    headerExpanded() {
      const $html = $("html");
      $html.toggleClass("sc-header-expanded");
    },
    notificationMsgAction(data) {
      this.notificationDiv = true;
      let thisObj = this;
      setTimeout(function () {
        thisObj.notificationDiv = false;
      }, data.time);
    },
    notificationMsgAction(data) {
      console.log("Notifications >>>", data);
      // this.notificationBg = true;
      this.isTicketCreateBtn = false;
      let msg =
        data.type == "danger"
          ? '<div class="evolve-notification"><div class="evolve-noti-lable"><button class="sc-button sc-button-primary waves-effect  waves-button waves-light" style="position: absolute !important;right: 50px !important;top:6px;" id="uikitid" ><i class="mdi mdi-book-open-variant"></i></button>'
          : '<div class="evolve-notification"><div class="evolve-noti-lable">';
      let icon = "";
      icon =
        data.type == "primary"
          ? '<i class="mdi mdi-alert  md-color-green-400 sc-icon-24"></i><span class="uk-flex-1">'
          : icon;
      icon =
        data.type == "success"
          ? '<i class="mdi mdi-check-circle  md-color-green-400 sc-icon-24"></i><span class="uk-flex-1">'
          : icon;
      icon =
        data.type == "danger"
          ? '<i class="mdi mdi-alarm-light  md-color-black-400 sc-icon-24"></i><span class="uk-flex-1">'
          : icon;
      icon =
        data.type == "warning"
          ? '<i class="mdi mdi-alert  md-color-red-400 sc-icon-24"></i><span class="uk-flex-1">'
          : icon;

      let msgTxt = data.type == "primary" ? "INFO" : "INFO";
      msgTxt = data.type == "success" ? "INFO " : msgTxt;
      msgTxt = data.type == "danger" ? "ERROR !!" : msgTxt;
      msgTxt = data.type == "warning" ? "WARNINIG !!" : msgTxt;

      let pos = data.pos == "C" ? "top-center" : "top-center";
      pos = data.pos == "TL" ? "top-left" : pos;
      pos = data.pos == "TR" ? "top-right" : pos;
      pos = data.pos == "BL" ? "bottom-left" : pos;
      pos = data.pos == "BC" ? "bottom-center" : pos;
      pos = data.pos == "BR" ? "bottom-right" : pos;

      msg +=
        icon +
        '<div class="evolve-noti-lable-txt">' +
        msgTxt +
        '</div></div><div class="evolve-noti-text">' +
        data.message;
      ("</div></div>");
      console.log("msg: ", msg);

      let config = {
        timeout: data.timeout,
        pos: pos,
        status: data.type,
      };
      UIkit.notification(msg, config);

      if (data.type == "danger") {
        let this1 = this;

        let id = document.getElementById("uikitid");

        id.addEventListener("click", async (evt) => {
          if (id && data?.isTicketCreate) {
            UIkit.notification.closeAll();
            console.log("onClick:");
            // async function captureB () {
            // // (A) GET MEDIA STREAM
            // 	const stream = await navigator.mediaDevices.getDisplayMedia({
            // 		preferCurrentTab: true
            // 	});

            // 	// (B) STREAM TO VIDEO
            // 	const vid = document.createElement("video");

            // 	// (C) VIDEO TO CANVAS
            // 	vid.addEventListener("loadedmetadata", function () {
            // 	// (C1) CAPTURE VIDEO FRAME ON CANVAS
            // 		const canvas = document.createElement("canvas"),
            // 			ctx = canvas.getContext("2d");
            // 		ctx.canvas.width = vid.videoWidth;
            // 		ctx.canvas.height = vid.videoHeight;
            // 		ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

            // 		// (C2) STOP MEDIA STREAM
            // 		stream.getVideoTracks()[0].stop();

            // 		// (C3) "FORCE DOWNLOAD"
            // 		let a = document.createElement("a");
            // 		a.download = "ss.png";
            // 		a.href = canvas.toDataURL("image/png");
            // 		a.click(); // MAY NOT ALWAYS WORK!
            // 	});

            // 	// (D) GO!
            // 	vid.srcObject = stream;
            // 	vid.play();
            // }
            this.isTicketCreateBtn = data.isTicketCreate;
            html2canvas(document.body).then(async (canvas) => {
              // Export the canvas to its data URI representation
              var base64image = canvas.toDataURL("image/png");
              this1.fileData = base64image;

              const a = document.getElementById("FileSS");
              a.setAttribute("download", "image.png");
              a.setAttribute("href", base64image);

              // Select all tab items
              const tabItems = document.querySelectorAll(".evolve-tab-item");

              for (let i = 0; i < tabItems.length; i++) {
                const tabItem = tabItems[i];

                // Check if the current tab item has the 'active' class
                if (tabItem.classList.contains("active")) {
                  // Get the label content of the active tab
                  const labelElement = tabItem.querySelector(
                    ".evolve-tab-item-content .label"
                  );
                  this1.ermsg = data.message;
                  this1.erbody = data.message;
                  this1.ersubject = labelElement.textContent.trim();
                }
              }
              UIkit.modal("#SCREENSHOT" + this1.uniqId).show();
            });

            // captureB()
          } else {
            this1.ermsg = data.message;
            UIkit.modal("#SCREENSHOT" + this1.uniqId).show();
          }
        });
      }
    },
    pageData(data) {
      this.$eventBus.$emit(data.masterCode, data.pageData);
    },

    evolveTicketGenrateAction(data) {
      console.log("on Screen Shot >>>", data);
      let this1 = this;
      this.isTicketCreateBtn = true;
      html2canvas(document.body).then(async (canvas) => {
        // Export the canvas to its data URI representation
        var base64image = canvas.toDataURL("image/png");
        this1.fileData = base64image;

        const a = document.getElementById("FileSS");
        a.setAttribute("download", "image.png");
        a.setAttribute("href", base64image);

        // Select all tab items
        const tabItems = document.querySelectorAll(".evolve-tab-item");

        for (let i = 0; i < tabItems.length; i++) {
          const tabItem = tabItems[i];

          // Check if the current tab item has the 'active' class
          if (tabItem.classList.contains("active")) {
            // Get the label content of the active tab
            const labelElement = tabItem.querySelector(
              ".evolve-tab-item-content .label"
            );
            this1.ermsg = data.message;
            this1.erbody = data.message;
            this1.ersubject = labelElement.textContent.trim();
          }
        }
        UIkit.modal("#SCREENSHOT" + this1.uniqId).show();
      });
    },
  },
  async created() {
    // console.log("useStore().user", useStore().user);
    if (this.isDownTimeActive) {
      setTimeout(() => {
        //UIkit.modal("#downtime-active-modal").show();
      }, 10000);
    }

    // clearInterval(this.intervalObj);
    this.removeModal();
    await this.updateCurrentApp();

    /**
     * Get Default Units List
     */
    // this.$store.dispatch('getuserCompanyList');
    useStore().userUnits();

    let setting = await this.$axios.$get(
      "/api/v1/evolve/getSecurityCofigurationMaster"
    );

    if (setting.statusCode === 200) {
      if (setting.result.Evolve_IdleTimeoutMinute != undefined) {
        this.IdleTimeout =
          parseInt(setting.result.Evolve_IdleTimeoutMinute) > 0 ? true : false;
        this.timeleft =
          setting.result.Evolve_IdleTimeoutCounter == undefined
            ? 30
            : parseInt(setting.result.Evolve_IdleTimeoutCounter);
      }
    }

    clearTimeout(this.intervalObj);
    this.imAlive();
    let thisl = this;
  },
  beforeDestroy() {
    // $("#downtime-active-modal").remove();
    // $("#downtime-warning-modal").remove();
  },
  mounted() {
    this.$eventBus.$on("onChangeLanguage", () => {
      // this.translateLanguage();
    });
    // Reserve key events
    this.reserveKeyEvents();
    this.socket = this.$nuxtSocket({
      persist: true,
      reconnection: true, 
      reconnectionDelay: 2000,
    });

    let thisObj = this;

    this.socket.on("timeDates", (msg, cb) => {
      thisObj.timer = msg.dateTime;
    });

    this.socket.on(thisObj.token, (data) => {
      if (data.statusCode == 400) {
        thisObj.token = undefined;
        clearTimeout(thisObj.intervalObj);

        useStore().logout(); // Delete Data
        useStore().clearAllTab(); // Clear All Tab for Memory
        thisObj.$router.push("/home");

        /**END */
      }
    });
  },
  beforeDestroy() {},
  beforeMount() {
    let thisObj = this;

    if (
      thisObj.token != undefined &&
      thisObj.token != "" &&
      thisObj.token != null
    ) {
      if (thisObj.token.startsWith("Bearer ")) {
       
        thisObj.token = thisObj.token.slice(7, thisObj.token.length);
      }
    }
  },

  unmounted() {
    this.socket.disconnect();
  },

  methods: {
    SaveAlertFile: async function () {
      try {
        if (this.ersubject && this.erbody) {
          let formData = {
            subject: this.ersubject,
            erbody: this.erbody,
            currentUri: window?.location?.origin + this.$route.fullPath,
          };

          let data = new FormData();
          data.append("fileData", this.fileData);
          data.append("formData", JSON.stringify(formData));
          this.loaderShow();
          let ticketGenerationApi = await this.$axios
            .$post("/api/v1/evolve/ticketGenerationApi", data)
            .catch((e) => {
              this.loaderHide();
            });
          console.log("ticketGenerationApi: ", ticketGenerationApi);

          if (ticketGenerationApi.statusCode == 200) {
            useStore().evolveNotification(ticketGenerationApi.message);
          } else {
            useStore().evolveNotification(ticketGenerationApi.message);
          }
          this.loaderHide();
          UIkit.modal("#SCREENSHOT" + this.uniqId).hide();
        } else {
          this.notification(
            "danger",
            3000,
            "Please Enter Subject and Reason!!"
          );
        }
      } catch (error) {
        this.loaderHide();
        console.log("error: ", error);
        this.notification("danger", 3000, "Error while Save!!");
      }
    },

    translateLanguage: async function () {
      try {
        let languageId = useStore().EvolveLanguage_ID();
        if (languageId != undefined) {
          const languageTranstale = await this.$axios
            .$post("/api/v1/evolve/translate", {
              languageId: languageId,
              translate: this.translate,
            })
            .catch((e) => {});
          if (languageTranstale) {
            let tra = this.translate;
            Object.keys(this.translate).forEach(function (key) {
              languageTranstale.result.forEach(function (obj) {
                if (obj.EvolvelLabel_KeyWord == key) {
                  tra[key] = obj.EvolveLabel_Term;
                }
              });
            });
          }
        }
      } catch (error) {
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },
    removeModal: async function (e) {
      // $("#idle-modal")?.remove(); // Remove Old Model From DOM
    },
    imAlive: async function (e) {
      if (import.meta.client) {
        let thisObj = this;
        this.intervalObj = setTimeout(async function () {

          if (
            thisObj.token != undefined &&
            thisObj.token != "" &&
            thisObj.token != null
          ) {
            thisObj.socket.emit("imAlive", thisObj.token);
            thisObj.imAlive();
          } else {
            clearTimeout(thisObj.intervalObj);
              thisObj.logout();
          }
         
        }, 5000);
      }
    },
    handleCloseTabAction(tabName) {
      this.$eventBus.$emit("onCloseTabCalled", tabName);
      useStore().removeOneTab(tabName);
    },
    handleTabSwitchAction(tabName) {
      useStore().setActiveTab(tabName);
    },

    dateFormat() {
      let date = new Date();

      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //  Splicing
      this.timer = hours + ":" + minutes + ":" + seconds;
    },

    async updateCurrentApp() {
      const path = this.$route.path;
      let urlPrefix, appCode, activeApp;

      urlPrefix = path
        .split("/")
        .filter((item) => typeof item === "string" && item.length > 0)[0];

      if (
        typeof urlPrefix === "string" &&
        urlPrefix.length > 0 &&
        urlPrefix.indexOf("/") === -1
      ) {
        urlPrefix = "/" + urlPrefix + "/";
      }

      if (useStore().appUrlPrefix === urlPrefix) {
        return;
      }

      activeApp = await this.getAppDetail(urlPrefix);

      if (typeof activeApp === "object") {
        appCode = activeApp.EvolveApp_Code || "EAC";

        useStore().changeActiveAppCode(appCode);
        useStore().changeActiveApp(activeApp);
      }
    },

    /**
     * Fetch detail about specific Evolve app
     * @async
     * @param {object} axios - Axios instance
     * @param {string} url - App code
     * @returns {Promise<object>}
     */
    async getAppDetail(url) {
      // const payload = {
      //   EvolveApp_Url: url,
      // };
      // const response = await this.$axios.$post(
      //   "/api/v1/evolve/getDetailByCode",
      //   payload
      // );
      // if (response.statusCode === 200) {
      //   const result = response.result;
      //   if (Array.isArray(result)) {
      //     return result[0];
      //   }
      //   return null;
      // } else {
      //   this.notification("success", 3000, "Error while getting app detail");
      // }
    },

    /** Reserve regular key events */
    reserveKeyEvents() {
      // Toggle finder with key events
      window.addEventListener("keydown", (event) => {
        const key = event.key;

        captureSession = true;

        if (event.target === document.body) {
          // Ignore escape key event
          if (key !== "Escape") {
            keyStroke.add(key);
          } else {
            // exit focused mode
            if (this.focusedMode) {
              this.exitFocusedMode();
            }
          }

          if (captureSession === false) {
            return;
          }

          // handle Ctrl + b
          if (
            keyStroke.has("Control") &&
            (keyStroke.has("B") || keyStroke.has("b"))
          ) {
            keyStroke.clear();

            useStore().toggleSidebar();
            return;
          }

          // handle Ctrl + Shift + f key
          else if (
            keyStroke.has("Control") &&
            keyStroke.has("Shift") &&
            (keyStroke.has("F") || keyStroke.has("f"))
          ) {
            keyStroke.clear();

            if (this.finderView === false) {
              this.openFinder();
            }

            return;
          }

          // handle Ctrl + Shift + 1
          else if (event.altKey && (keyStroke.has("1") || keyStroke.has("!"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-theme-toggle-button");
          }

          // handle Ctrl + Shift + 2
          else if (event.altKey && (keyStroke.has("2") || keyStroke.has("@"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-screen-resizer-button");
          }

          // handle Ctrl + Shift + 3
          else if (event.altKey && (keyStroke.has("3") || keyStroke.has("#"))) {
            keyStroke.clear();

            useStore().toggleFocusedMode();
            return;
          }

          // handle Ctrl + Shift + 4
          else if (event.altKey && (keyStroke.has("4") || keyStroke.has("$"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-language-select-button");
          }

          // handle Ctrl + Shift + 5
          else if (event.altKey && (keyStroke.has("5") || keyStroke.has("%"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-view-notification-button");
          }

          // handle Ctrl + Shift + 6
          else if (event.altKey && (keyStroke.has("6") || keyStroke.has("^"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-active-app-selector-button");
          }

          // handle Ctrl + Shift + 7
          else if (event.altKey && (keyStroke.has("7") || keyStroke.has("&"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-app-selector-button");
          }

          // handle Ctrl + Shift + 8
          else if (event.altKey && (keyStroke.has("8") || keyStroke.has("*"))) {
            keyStroke.clear();

            return this.$tapOnElement("#app-view-active-user-profile-button");
          }
        }
      });

      window.addEventListener("keyup", (event) => {
        const key = event.key;
        captureSession = false;
        keyStroke.clear();

        // handle single key events
        if (event.target === document.body) {
          switch (key) {
            // handle '/' key for finder
            case "/": {
              if (this.finderView === false) {
                this.openFinder();
              }

              break;
            }
          }
        }
      });
    },

    openFinder() {
      //   this.$store.commit("CHANGE_FINDER_VIEW", true);
      useStore().CHANGE_FINDER_VIEW(true);
    },
    closeFinder() {
      //   this.$store.commit("CHANGE_FINDER_VIEW", false);
      useStore().CHANGE_FINDER_VIEW(false);
    },
    exitFocusedMode() {
      //   this.$store.commit("changeFocusedMode", false);
      useStore().changeFocusedMode(false);
    },

    async notification(type = "danger", timeout = 3000, message = "") {
      let config = {
        timeout: timeout,
        status: type,
      };
      UIkit.notification(message, config);
    },
    // evolve_v4
    countDown() {
      this.warningTimer = setInterval(() => {
        this.timeleft -= 1;
        if (this.timeleft <= 0) {
          this.logout();
        }
      }, 1000);
    },
    clearTimer() {
      try {
        clearInterval(this.warningTimer);
        UIkit.modal("#idle-modal").hide();
        this.timeleft = 30;
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      if (this.intervalObj) {
        clearInterval(this.intervalObj);
      }
      await useStore().logout();

      await this.$router.push("/home");
      await this.$router.go("/home");
    },

    async onClickDwnTime() {
      try {
        this.loaderShow();
        let dwntime = this.$axios
          .$post("/api/v3/evolve/downtime", {
            dwntimedata: this.downtimeWarningData,
          })
          .catch((error) => {
            this.loaderHide();
            console.error(error);
          });
        if (dwntime) {
          if (dwntime.statusCode == 400) {
            this.notification("danger", 3000, dwntime.message);
          }
        }
        this.loaderHide();
      } catch (error) {
        this.loaderHide();
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/v2/vars";
@import "../assets/scss/v2/mixins";
@import "../assets/scss/v2/utils/scroll";

#user-name-label {
  position: fixed;
  bottom: 0px;
  // font-size: 14px;
  font-size: 12px;
  width: 96% !important;
  text-align: right;
  font-family: sans-serif;
  background: #5a87c5;
  // padding: 6px 30px;
  padding: 4px 30px;
  color: #fff;

  .server_datetime {
    float: right;
    margin-left: 14px;
    margin-right: 12px;
  }

  .user_name {
    float: right;
  }

  .notification_area {
    float: left;
    font-size: 12px;
  }
}
#app {
  padding-top: 56px;
  width: inherit;
  height: 94vh; //$bg-1;
  // background-image: linear-gradient(to bottom, #dfe9f3 0%, white 100%);
  background-size: 100%;
  transition: background-color 120ms linear;
  color: $fr;
  height: 100% !important;

  &[aria-expanded] {
    padding-top: 0;
    //   height: 100vh;
  }

  .container {
    display: flex;
    flex-direction: row;
    height: inherit;
    overflow: hidden;
    height: 100%;
  }

  .focused-mode-exit-button {
    position: fixed;
    top: 2px;
    right: 6px;
    z-index: 1000;
  }
}

// #sc-page-wrapper { 0001
// 	padding-left: 0;
// 	// padding-left: 260px;
// }

.evolve-tabs {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.evolve-tab-item {
  // min-width: 170px;
  min-width: 126px;
  // padding: 3px 15px;
  padding: 1px 15px;
  text-align: left;
  text-transform: capitalize;
  font-family: sans-serif;
  cursor: pointer;
  background: #ffffff;
  color: #b8b7c0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-right: 6px;
  border: 1px solid #cecece;

  &.active {
    background-color: $primary;
    border-color: $primary;
    color: $primary-fr;

    .close-icon {
      color: $primary-fr !important;

      .mdi {
        color: $primary-fr !important;
      }
    }
  }

  &:hover .close-icon {
    opacity: 1;
  }
}

.evolve-tab-item-content {
  display: flex;
  width: inherit;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: inherit;
  text-transform: inherit;
  // font-size: inherit;
  font-size: 13px;
  background-color: inherit;
  color: inherit;

  .close-icon {
    opacity: 0.3;
    color: rgba(120, 116, 134, 0.5) !important;

    .mdi::before {
      font-size: 14px;
    }

    &:hover {
      transform: scale(1.15);
    }
  }
}

@include use-dark {
  #app {
    background-image: none;
    background-color: $bg-dark;
    color: $fr-dark;
  }
}
@media (max-width: 561px) {
  .server_datetime {
    float: left !important;
    margin-left: 50px !important;
  }

  .user_name {
    float: left !important;
  }
}
@media (max-width: 991px) {
  #user-name-label {
    bottom: 47px;
  }
  .copyright {
    padding-left: 0px;
  }
}
</style>