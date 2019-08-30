<template>
  <div v-loading="loading">
    {{modalRedirect ? 'Modal' :'Ticket'}}
    <el-row class="center" :gutter="20" v-if="!modalRedirect">
      <el-col :span="24">
        <CustomerInfo />
        <DigitalSourceInfo />
        <WebAccessed />
        <InteractionHistory />
      </el-col>
    </el-row>
    <el-row class="center" :gutter="20" v-if="modalRedirect">
      <el-col :span="24">
        <Modal />
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
import Modal from "~/components/modal/Modal.vue";
export default {
  data() {
    return {
      loading: true
    };
  },
  components: {
    Logo,
    CustomerInfo,
    DigitalSourceInfo,
    WebAccessed,
    InteractionHistory
  },
  mounted() {
    let self = this;
    setTimeout(() => {
      self.loading = false;
      this.$store.dispatch("resizeClient", this.zafClient);
    }, 3000);
  },
  computed: {
    modalRedirect() {
      return this.$store.getters.currentLocation;
    }
  },
  beforeMount() {
    var client = ZAFClient.init();
    let self = this;
    try {
      client.on("app.registered", function(appData) {
        //client.invoke("resize", { height: document.body.clientHeight + 50 });
        self.appData = appData;
        console.log("appData zaf ", appData);
        localStorage.removeItem("token");
        localStorage.removeItem("leadId");
      });
      this.zafClient = client;
    } catch (error) {}
    if (this.appData) {
      this.$store.dispatch("setLocation", this.appData.context.location);
    }
  }
};
</script>

<style scoped>
.el-loading-spinner {
  top: 0 !important;
  margin-top: 0 !important;
}
</style>