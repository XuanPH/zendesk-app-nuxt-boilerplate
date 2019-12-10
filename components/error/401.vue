<template>
  <div class="p401">
    We can't connect to O2O CRM. Please update your O2O Token in
    <b>Admin > Manage > SERA-CD > Change Setting</b>
    <hr />
    <span>After that, need refresh app to apply new token, following below image to refresh.</span>
    <img style="box-shadow: 2px 2px 5px;" src="~/assets/img/tutorial.png" />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("resizeClient");
  }
};
</script>
<style scoped>
img {
  width: 100%;
}
.p401 {
  text-align: center;
  padding: 0px 30px;
}
.p401 hr {
  margin: 15px 30px;
}
</style>