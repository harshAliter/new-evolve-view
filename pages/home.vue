<template>
  <div>
    <!-- Copyright (C) 2024 Aliter business solutions Pvt Ltd to Present * All
		Rights Reserved. * Version : 1.1.0 * This code may not be used, copied, *
		modified, merged, published, distributed, sublicensed, or * sold in any
		form, without the explicit written permission * of the copyright holder. * *
		Any information please Write to : vijay@alitersolutions.com, * or visit :
		https://www.alitersolutions.com  -->

    <header id="sc-header">
      <div class="uk-container">
        <div class="uk-flex uk-flex-middle">
          <div class="uk-flex-1">
            <div class="sc-logo-wrapper">
              <a href=""
                ><img
                  :src="logo != '' ? logo : ''"
                  alt=""
                  style="width: 140px"
                />
              </a>
              <svg
                width="400"
                height="200"
                viewBox="0 0 400 200"
                xmlns="http://www.w3.org/2000/svg"
                class="uk-visible@m"
              >
                <g transform="translate(150,-100)">
                  <path
                    d="M57.8,-54.7C83.9,-47,120.2,-37.3,151.7,-5.1C183.2,27.1,209.8,81.8,194.3,115.5C178.8,149.3,121.2,162,65.7,183.6C10.1,205.2,-43.3,235.5,-73.4,217.7C-103.5,199.8,-110.2,133.6,-126.4,83.6C-142.6,33.6,-168.3,-0.3,-175.9,-43.9C-183.5,-87.4,-173.1,-140.6,-140.8,-147.2C-108.4,-153.9,-54.2,-113.9,-19.2,-91.1C15.9,-68.2,31.7,-62.5,57.8,-54.7Z"
                    fill="#abb8c3"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div class="uk-flex uk-flex-middle">
            <div class="uk-margin-left">
              <a
                class="sc-button sc-button-flex"
                href="/login"
                style="background: #5a87c5; color: #fff"
              >
                <span
                  data-uk-icon="icon: sign-in"
                  class="uk-margin-small-right uk-icon"
                >
                  <polygon
                    points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3" /><polygon
                    points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5"
                /></span>
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="gradient top-section">
      <div class="uk-container">
        <div class="uk-flex-middle" data-uk-grid>
          <div class="uk-width-2-5@m">
            <h1>Welcome to the Future<br /><b>Industry 4.0</b></h1>
            <p>
              Helping customer's drive pragmatic business outcomes, through
              comprehensive and intuitive technology solutions. We are
              passionate about your business outcomes and outcomes that drive
              success.
            </p>
            <div class="uk-flex">
              <a
                href="https://www.alitersolutions.com/"
                class="sc-button sc-button-secondary sc-button-large"
                style="background: #eb7472"
              >
                Get Started
              </a>
              <a
                href="https://www.alitersolutions.com/"
                class="sc-button sc-button-outline sc-button-large uk-margin-left"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div class="uk-width-3-5@m uk-flex uk-flex-right">
            <img
              :src="maps != '' ? maps : ''"
              class="top-section-main-img"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>

    <section class="bg">
      <div class="uk-container">
        <hr />
      </div>
    </section>
  </div>
</template>
<style scoped>
@import "@/assets/css/style.min.css";
@import "@/assets/css/uikit.min.css";
</style>

<script>
import maps from "@/assets/img/undraw_connected_world_wuay.svg";
import logo from "@/assets/logo/label-logo.png";

export default {
setup() {
        definePageMeta({
            layout: 'home',
        })
    },
  data() {
    return {
      maps: maps,
      logo: logo,
    };
  },
};
</script> 
