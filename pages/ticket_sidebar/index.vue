<template>
  <div v-loading="loading2">
    <el-row class="center" :gutter="20">
      <el-col :span="24">
        <CustomerInfo />
        <DigitalSourceInfo />
        <SocialInteraction />
        <SalesOrderInfo />
        <LoyaltyInfo />
        <InteractionHistory />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import CustomerInfo from "~/components/CustomerInfo.vue";
import DigitalSourceInfo from "~/components/DigitalSourceInfo.vue";
import WebAccessed from "~/components/WebAccessed.vue";
import InteractionHistory from "~/components/InteractionHistory.vue";
import SocialInteraction from "../../components/SocialInteraction.vue";
import SalesOrderInfo from "../../components/SalesOrderInfo.vue";
import LoyaltyInfo from "../../components/LoyaltyInfo.vue";
// import Modal from "~/components/modal/Modal.vue";
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading2: true,
      appData: null
    };
  },
  components: {
    Logo,
    CustomerInfo,
    DigitalSourceInfo,
    WebAccessed,
    InteractionHistory,
    SocialInteraction,
    SalesOrderInfo,
    LoyaltyInfo
  },
  async mounted() {
    let self = this;
    self.loading2 = false;
    this.$store.dispatch("resizeClient");
    // console.log("mouted");
    // let _self = this;
    // var data = await zaf.init(this.$store);
    // if (!data.code) {
    //   let intervalSet = setInterval(() => {
    //     let i = 0;
    //     try {
    //       _self.$store.dispatch("setZAFClient", data);
    //       _self.$store.dispatch("setParams", data.appData);
    //       clearInterval(intervalSet);
    //       console.info("Zendesk app framework created");
    //       if (data.appData.context.location === "ticket_sidebar") {
    //         this.$store.state.zafClient.on("data_modal_passing", modalData => {
    //           if (modalData.type === "updateLead") {
    //             this.$store.dispatch("leads/initLeads", {
    //               zendeskId: 389547012574,
    //               fullName: "Dzung Nguyen",
    //               email: "dzung.nguyen@quesera.sg",
    //               phone: ""
    //             });
    //           }
    //         });
    //       }
    //     } catch (err) {}
    //   }, 100);
    // } else {
    //   console.info("Created fails, it't may be created");
    // }
  },
  async fetch({ route, store }) {
    await store.dispatch("leads/initLeads", {
      zendeskId: 389547012574,
      fullName: "Dzung Nguyen",
      email: "dzung.nguyen@quesera.sg",
      phone: ""
    });
  }
};
</script>

<style scoped>
.el-loading-spinner {
  top: 0 !important;
  margin-top: 0 !important;
}
</style>