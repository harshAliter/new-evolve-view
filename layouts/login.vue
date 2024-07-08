<template>
  <div id="app">
    <!-- { 'background-image': `url(${AppLoginElevationBackground})` } -->
    <div class="elevation" style="background: #5a87c5">
      <div class="container">
        <h1 class="title">
          {{ translate.welcome_to_evolve }}
        </h1>
        <h2 class="subtitle">
          IOT Enabled Automation Platform
          <span class="stroke"></span>
        </h2>
        <div class="login_feature_div">
          <p class="login_feature">Features Include:</p>
          <ul>
            <li>Manufaturing Operations Management</li>
            <li>Inbuilt IOT Framework for Device Integrations</li>
            <li>Support for Machine to Machine Communication</li>
            <li>Process Workflow</li>
          </ul>
        </div>

        <p>
          <span class="label">
            Powered by: Aliter Business Solutions Private Limited<br />
            <a
              class="ref-link"
              target="_blank"
              title="Learn more about Evolve Automation Platform"
              href="https://www.alitersolutions.com/evolve-automation-platform.html"
              >Website: www.alitersolutions.com
            </a>
          </span>
        </p>
        <div class="evolve-type">Evolve Test</div>
      </div>
    </div>

    <div v-if="isForgotPass" class="ground">
      <div
        name="forgotPassForm"
        class="login-form"
        @submit.prevent="onClickForgotPass"
      >
        <h3 class="form-title">
          {{ translate.forgot_Pass }}
        </h3>
        <p>Enter Your Email For Reset Password....</p>
        <p></p>
        <div class="input-wrapper">
          <label for="login-email-input" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
              />
            </svg>
          </label>
          <input
            id="login-email-input"
            ref="username"
            v-model="loginData.EvolveUser_EmailID"
            type="text"
            class="input-control"
            :placeholder="translate.email_login"
            required
          />
        </div>

        <div class="input-wrapper">
          <label for="login-password-input" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path
                    d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"
                  />
                </g>
              </g>
            </svg>
          </label>
          <input
            id="forgot-password-input"
            v-model="forgotPassword"
            type="password"
            class="input-control"
            :placeholder="translate.forgot_Password"
            required
          />
        </div>
        <div class="input-wrapper">
          <label for="login-password-input" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path
                    d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"
                  />
                </g>
              </g>
            </svg>
          </label>
          <input
            id="forgot-confirmPassword-input"
            v-model="confirmPassWord"
            type="password"
            class="input-control"
            :placeholder="translate.confirm_PassWord"
            required
          />
        </div>

        <div class="input-wrapper">
          <button
            type="submit"
            style="width: 110%; height: 45px; font-size: 19px !important"
            class="sc-button sc-button-primary"
            @click="sendOtpForPassReset()"
          >
            {{ translate.send_Otp }}
          </button>
          <div class="forgot-password-link">
            <small>
              <a href="/login">{{ translate.backTo_SignIn }}</a>
            </small>
          </div>
          <!-- <div class="forgot-password-link">
						<small>
							<a href="javascript:void(0)" @click="onClickForgotPass()">{{ translate.forgot_password }}</a>
						</small>
					</div> -->
        </div>
      </div>
      <div class="contact-section">
        <a href="tel:+919811185685" class="contact-field">
          <span class="icon material-icons">phone</span>&nbsp;
          <span class="label">+91 9811185685</span>
        </a>
        <a href="mailto:vijay@alitersolutions.com" class="contact-field">
          <span class="icon material-icons">email</span>&nbsp;
          <span class="label">vijay@alitersolutions.com</span>
        </a>
      </div>
    </div>
    <div v-else-if="isEmailSend" class="ground">
      <div
        name="OTPForm"
        class="login-form"
        @submit.prevent="resetUserPassword"
      >
        <h3 class="form-title">
          {{ translate.otp }}
        </h3>
        <p></p>
        <p></p>
        <div class="input-wrapper">
          <label for="otp" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
              />
            </svg>
          </label>
          <input
            id="otp"
            ref="otp"
            v-model="verifyOtp"
            type="number"
            class="input-control"
            :placeholder="translate.otp"
            required
          />
        </div>

        <div class="input-wrapper">
          <button
            type="submit"
            style="width: 110%; height: 45px; font-size: 19px !important"
            class="sc-button sc-button-primary"
            @click="resetUserPassword()"
          >
            {{ translate.verify_Otp }}
          </button>
        </div>
        <!-- <div class="forgot-password-link">
					<small>
						<a href="/login">{{ translate.backTo_SignIn }}</a>
					</small>
				</div> -->
      </div>
      <div class="contact-section">
        <a href="tel:+919811185685" class="contact-field">
          <span class="icon material-icons">phone</span>&nbsp;
          <span class="label">+91 9811185685</span>
        </a>
        <a href="mailto:vijay@alitersolutions.com" class="contact-field">
          <span class="icon material-icons">email</span>&nbsp;
          <span class="label">vijay@alitersolutions.com</span>
        </a>
      </div>
    </div>
    <div v-else class="ground">
      <form name="loginForm" class="login-form" @submit.prevent="login">
        <h3 class="form-title">
          {{ translate.sign_in }}
        </h3>
        <p>Login with the data you entered during your registration.</p>
        <p></p>
        <div class="input-wrapper">
          <label for="login-email-input" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
              />
            </svg>
          </label>
          <input
            id="login-email-input"
            ref="username"
            v-model="loginData.EvolveUser_EmailID"
            type="text"
            class="input-control"
            :placeholder="translate.email_login"
            required
          />
        </div>
        <div class="input-wrapper">
          <label for="login-password-input" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path
                    d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"
                  />
                </g>
              </g>
            </svg>
          </label>
          <input
            id="login-password-input"
            v-model="loginData.EvolveUser_password"
            type="password"
            class="input-control"
            :placeholder="translate.password"
            required
          />
        </div>

        <div class="input-wrapper">
          <button
            type="submit"
            style="width: 110%; height: 45px; font-size: 19px !important"
            class="sc-button sc-button-primary"
          >
            {{ translate.sign_in }}
          </button>
          <div class="forgot-password-link">
            <small>
              <a href="javascript:void(0)" @click="onClickForgotPass()">{{
                translate.forgot_password
              }}</a>
            </small>
          </div>
        </div>
      </form>
      <div class="contact-section">
        <a href="tel:+919811185685" class="contact-field">
          <span class="icon material-icons">phone</span>&nbsp;
          <span class="label">+91 9811185685</span>
        </a>
        <a href="mailto:vijay@alitersolutions.com" class="contact-field">
          <span class="icon material-icons">email</span>&nbsp;
          <span class="label">vijay@alitersolutions.com</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.evolve-type {
  position: fixed;
  bottom: 0px;
  color: #5a87c5;
}
</style>
<script>
import AppLoginElevationBackground from "@/assets/img/login/bg2.jpg";
//import globalMixin from "~/mixins/global";

export default {
  name: "AppLoginV2",
  //mixins: [globalMixin],

  layout: "eDefaultV2",

  data() {
    return {
      AppLoginElevationBackground,
      ip: "",
      appLogo: "",
      loginBgStyle: "",
      loginData: {
        EvolveUser_EmailID: "",
        EvolveUser_password: "",
      },
      form: {
        name: "",
        EvolveUser_EmailID: "",
        EvolveUser_password: "",
      },
      recoverPassEmail: "",
      errors: "",

      // Language Translate
      translate: {
        sign_in: "Sign In",
        welcome_to_evolve: "Welcome to Evolve",
        email_login: "Email/Login",
        password: "Password",
        more_info: "More info",
        forgot_password: "Did you forget your password?",
        dont_have_an_account: "Don't have an account?",
        contact_us: "Contact us",
        forgot_Pass: "Forgot Password....",
        send_Otp: "Send Otp",
        confirm_PassWord: "Confirm Password...",
        forgot_Password: "Reset Password...",
        otp: "Enter Otp",
        verify_Otp: "Verify Otp",
        backTo_SignIn: "Go Back To Your Login Page...",
      },
      isForgotPass: false,
      confirmPassWord: "",
      forgotPassword: "",
      isEmailSend: false,
      verifyOtp: "",
    };
  },
  computed: {
    evolveConfig() {
      return useStore().evolveConfig;
    },
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    async login() {
      try {
        this.errors = "";
        this.loaderShow();
        const result = await this.$axios
          .$post("/api/v1/evolve/auth/login", this.loginData)
          .catch((error) => this.loaderHide());
        
        if (result.statusCode == 200) {
          await useStore().setUserData(result.result);
          this.$router.push("/root");
        }
        this.loaderHide();
      } catch (error) {
        this.notification("danger", 3000, "Problem with connecting to server!");
        this.loaderHide();
      }
    },

    async notification(type = "danger", timeout = 3000, message = "") {
      let config = {
        timeout: timeout,
        status: type,
      };
      UIkit.notification(message, config);
    },

    async onClickForgotPass(data) {
      try {
        this.isForgotPass = true;
      } catch (error) {
        this.notification("danger", 3000, "Problem with connecting to server!");
      }
    },

    async sendOtpForPassReset() {
      try {
        if (!this.loginData.EvolveUser_EmailID) {
          this.notification("danger", 3000, "Please Add Email First!!");
        } else if (!this.forgotPassword) {
          this.notification("danger", 3000, "Please Add Password!!");
        } else if (!this.confirmPassWord) {
          this.notification("danger", 3000, "Please Add Confirm Password!!");
        } else if (!(this.confirmPassWord === this.forgotPassword)) {
          this.notification(
            "danger",
            3000,
            "Password And Confirm Password Are Different!!"
          );
        } else {
          let objBody = {
            operation: "FUSOTP", // Reset Password Otp
            email: this.loginData.EvolveUser_EmailID,
            password: this.confirmPassWord,
          };
          this.loaderShow();
          let userRes = await this.$axios
            .$post(`/api/v1/evolve/auth/sendOtp`, objBody)
            .catch((e) => {
              thisl.loaderHide();
              this.$store.dispatch("evolveNotification", {
                code: 117,
                type: 2,
              });
            });
          if (userRes.statusCode == 200) {
            this.notification("success", 3000, userRes.message.code);
            this.isEmailSend = true;
            this.isForgotPass = false;
            this.dataObj = userRes.result;
            this.loaderHide();
          } else {
            this.loaderHide();
            this.notification("danger", 3000, userRes.message.code);
          }
        }
      } catch (error) {
        this.notification("danger", 3000, "Problem with connecting to server!");
      }
    },

    async resetUserPassword() {
      try {
        if (!this.verifyOtp) {
          this.notification("danger", 3000, "Please Add Otp");
        } else {
          let userRes = {};
          this.loaderShow();
          let userDetails = {
            EvolveUser_Name: this.dataObj.EvolveUser_Name,
            EvolveUser_EmailID: this.dataObj.EvolveUser_EmailID,
            EvolveUser_login: this.dataObj.EvolveUser_login,
            EvolveUser_password: this.confirmPassWord,
            EvolveUser_Otp: parseInt(this.verifyOtp),
            EvolveUser_IsActive: this.dataObj.EvolveUser_IsActive,
            EvolveLanguage_ID: this.dataObj.EvolveLanguage_ID,
            EvolveUser_MobileNumber: this.dataObj.EvolveUser_MobileNumber,
            EvolveUnit_Data: this.dataObj.EvolveUnit_Data,
          };

          let condition = {
            _id: this.dataObj.userID,
          };

          let objBody = {
            userData: userDetails,
            condition: condition,
          };
          console.log("objBody", objBody);
          userRes = await this.$axios
            .$post("/api/v1/evolve/auth/resetPassword", objBody)
            .catch((e) => {
              thisl.loaderHide();
              this.$store.dispatch("evolveNotification", {
                code: "Problem with 	connecting to server!",
                pos: "BL",
                type: 2,
                time: 2000,
              });
            });
          if (userRes.statusCode == 200) {
            this.notification(
              "success",
              3000,
              "Password Updated Successfully!!"
            );
            this.loaderHide();
            setTimeout(() => {
              // this.$router.push("/home");
            }, 1000);
          } else {
            this.loaderHide();
            this.notification("danger", 3000, userRes.message.code);
          }
        }
      } catch (error) {
        this.notification("danger", 3000, "Problem with connecting to server!");
      }
    },

    async onClickGoToSignInPage() {
      try {
        this.isEmailSend = false;
        this.isForgotPass = false;
        this.$router.push("/login");
      } catch (error) {
        this.notification("danger", 3000, "Problem with connecting to server!");
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/v2/vars";
@import "@/assets/scss/v2/mixins";

$bg-gradient: linear-gradient(
  137deg,
  rgba(0, 198, 255, 1) 0%,
  rgba(0, 114, 255, 1) 100%
);

#app {
  width: 100% !important;
  height: 100vh !important;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 767px) {
    height: 100%;
    flex-direction: column;
  }
}

.elevation {
  width: 970px;
  height: 100%;
  background-size: 100%;
  position: relative;
  background-color: transparent;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 5px 0 18px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 767px) {
    display: none;
  }

  .ref-link {
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      color: $fr-dark;

      .label {
        text-decoration: underline;
      }
    }
  }

  .container {
    display: flex;
    height: inherit;
    padding-left: 3rem;
    padding-right: 3rem;
    flex-direction: column;
    justify-content: center;
    color: $fr-dark;
    .login_feature_div {
      margin-top: 97px;
    }
    .title {
      position: relative;
      font-size: 2.3rem;
      font-weight: 600;
      line-height: 3.4rem;
      padding: 0;
      color: $fr-dark;
    }
    .subtitle {
      position: relative;
      padding: 0;
      line-height: 2rem;
      font-size: 1.7rem;
      color: $fr-dark;

      .stroke {
        position: absolute;
        display: block;
        left: 0;
        width: 100px;
        height: 2px;
        bottom: -12px;
        background-color: $fr-dark;
      }
    }

    .tagline {
      line-height: 1.5rem;
      margin-top: 3.6rem;
    }
  }
}

.ground {
  position: relative;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    height: inherit;
  }

  .login-form {
    text-align: left;
    width: 330px;
    p {
      font-size: 12px;
      margin: 0px;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
    }

    .form-title {
      font-size: 2rem;
      margin: 0;
      padding: 0;
      line-height: 3.4rem;
      width: inherit;
    }

    .input-wrapper {
      position: relative;
      padding-top: 4px;
      padding-bottom: 4px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: inherit;

      .icon {
        position: absolute;
        z-index: 3;
        top: 14px;
        left: 0;

        svg {
          width: 18px;
          height: 18px;
          fill: $fr-4;
        }
      }

      .input-control {
        width: inherit;
        height: 2rem;
        font-size: 15px;
        padding: 6px 6px;
        padding-left: 2rem;
        outline: none;
        border: none;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: $fr-5;
        transition: border-bottom-color 120ms linear;
      }
      .input-control::placeholder {
        color: $fr-5;
      }
      .input-control:focus {
        border-bottom-color: $primary;
      }

      .input-button {
        width: 111%;
        height: 2.6rem;
        font-size: 1rem;
        border-radius: 0px;
        cursor: pointer;

        background-color: #1088f9;
        border: none;
        outline: none;
      }

      .forgot-password-link {
        width: 100%;
        margin: 0;
        padding: 0;
        margin-top: 8px;
        text-align: right;
      }
    }

    .form-actions {
      margin-top: 2.4rem;
      display: flex;
      justify-content: center;
    }
  }

  .contact-section {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    .contact-field {
      display: flex;
      align-items: center;
      color: $fr-4;
      padding: 12px 1rem;

      .icon {
        font-size: 16px;
        margin-right: 2px;
      }
      .label {
        font-size: 14px;
      }

      &:hover {
        color: $primary;
      }
    }
  }
}

@include use-native-dark {
  #app,
  html {
    background-color: $bg-dark;
    color: $fr-dark;
  }

  .elevation {
    .container {
      color: $fr;

      .title {
        color: $fr;
      }

      .subtitle {
        color: $fr;

        .stroke {
          background-color: $fr;
        }
      }
    }
  }

  .ground {
    color: $fr-dark;

    .form-title {
      color: $fr-dark;
    }

    .input-wrapper {
      .icon {
        svg {
          fill: $fr-dark-3 !important;
        }
      }
      .input-control {
        background-color: transparent;
        color: $fr-dark;
      }
      .input-control::placeholder {
        color: $fr-dark-3;
      }
      .input-control:focus {
        background-color: $bg-dark;
        border-bottom-color: $primary-lighten;
      }
      .input-control:active {
        background-color: $fr-dark;
        color: $fr-dark;
      }
      .forgot-password-link {
        color: $fr-dark-3;
      }
    }

    .contact-field {
      .icon,
      .label {
        color: $fr-dark-4;
      }
    }
  }
}
</style>