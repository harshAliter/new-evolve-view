<template>
  <div id="evolve-selection-bar">
    <!-- <div data-uk-form-custom="target: > * > span:first-child">
			<b> Scale :</b>
			<select>
				<option value="1">
					Option 01
				</option>
				<option value="2">
					Option 02
				</option>
				<option value="3">
					Option 03
				</option>
				<option value="4">
					Option 04
				</option>
			</select>
			<button class="  sc-button-outline" type="button">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button>
		</div> -->

    <!-- <div data-uk-form-custom="target: > * > span:first-child">
			<b>Label :</b>	<select>
				<option value="1">
					Option 01
				</option>
				<option value="2">
					Option 02
				</option>
				<option value="3">
					Option 03
				</option>
				<option value="4">
					Option 04
				</option>
			</select>
			<button class=" sc-button-outline" type="button">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button>
		</div> -->
    <div class="evolve-unit-bar">
      <select @change="handleUnitSwitchAction($event)">
        <option
          v-for="usr in userUnitList"
          :key="usr.EvolveUnit_ID._id"
          :value="usr.EvolveUnit_ID._id"
          :selected="user.EvolveUnit_ID == usr.EvolveUnit_ID._id"
        >
          {{ usr.EvolveUnit_ID.EvolveCompany_ID.EvolveCompany_Code }} -
          {{ usr.EvolveUnit_ID.EvolveUnit_Code }} (
          {{ usr.EvolveUnit_ID.EvolveUnit_Name }} )
        </option>
      </select>
      <!--  data-uk-form-custom="target: > * > span:first-child" <button class="sc-button-outline" type="button" style="width: 165px;">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "EvolveBar",
  computed: {
    userUnitList() {
      return useStore().userUnitList;
    },
    userCompanyList() {
      return useStore().userCompanyList;
    },

    user() {
      return useStore().user;
    },
  },
  // eslint-disable-next-line vue/order-in-components
  components: {},
  // eslint-disable-next-line vue/order-in-components
  mixins: [],
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {};
  },

  created: async function () {},
  methods: {
    async handleUnitSwitchAction(event) {
      try {
        this.loaderShow();
        let changeunitDetails = await this.$axios
          .$post("/api/v1/evolve/changeUserUnit", {
            data: {
              EvolveUnit_ID: event.target.value,
            },
          })
          .catch((e) => {});
        if (changeunitDetails) {
          let userDetails = await this.$axios
            .$get("/api/v1/evolve/me")
            .catch((e) => {});

          if (userDetails && userDetails.success) {
            useStore().setUserData(userDetails.data);
          }
        }
        window.location = "/root";
        this.loaderHide();
      } catch (error) {
        console.log("ERROR IN UNIT SWITCH>>>", error.message);
        this.loaderHide();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#evolve-selection-bar {
  display: flex;
  flex-direction: row;
  width: auto;

  [data-uk-form-custom] {
    display: inherit;
    height: 100%;
    align-items: center;
  }

  .evolve-unit-bar {
    float: right;
    select {
      background: #ffffff;
      border-radius: 6px;
      font-weight: 500;
      // font-size: 16px;
      font-size: 13px;
      line-height: 19px;
      color: #787486;
      border: none;
      // padding: 5px 15px;
      padding: 4px 15px;
      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
