<template>
  <div class="p401">
    <el-row :gutter="20">
      <el-col :span="24">
        <p>
          +
          <b>Update people phone number</b>
        </p>
        <p>
          +
          <b>Enable phone number as direct line</b>
        </p>
        <p>
          <img style="box-shadow: 2px 2px 5px;margin: 10px 0px;" src="~/assets/img/tutorial2.png" />
        </p>
        <p>
          +
          <b>After that click Retry button</b>
        </p>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;">
        <el-button type="primary" @click="updateUser">Update</el-button>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;">
        <el-button @click="refreshApp">Refresh</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("resizeClient");
  },
  methods: {
    updateUser() {
      this.$store.getters.zafClient.invoke("routeTo", "user", 12);
    },
    refreshApp() {
      this.$store.getters.zafClient.invoke("destroy");
      setTimeout(() => {
        window.location.href = process.env.URL;
      }, 3000);
    }
  }
};
</script>
<style scoped>
img,
button {
  width: 100%;
}
.p401 {
  text-align: left;
  padding: 0px 10px;
}
.p401 hr {
  margin: 15px 30px;
}
</style>