<template>
  <div>
    <el-row class="Loadingtop2p" v-loading="loading" :element-loading-text="loadingText">
      <el-col :span="24" v-if="!loading">
        Click the&nbsp;
        <nuxt-link to="/">here</nuxt-link>&nbsp;if app don't auto refresh
        <p></p>
      </el-col>
    </el-row>
    <!-- <a :href="baseUrl" target="_self">open</a> -->
    <!-- <nuxt-link to="/">Home</nuxt-link> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      loadingText: "Creating lead..."
    };
  },
  computed: {
    baseUrl: function() {
      return process.env.URL;
    }
  },
  mounted() {
    let self = this;
    self.$store.dispatch("resizeClient");
    setTimeout(() => {
      self.loadingText = "Created";
      self.loading = false;
      self.$router.push("/");
    }, 3000);
  }
};
</script>
<style scoped>
div {
  height: 100px;
}
button {
  width: 100%;
}
</style>