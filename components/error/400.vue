<template>
  <div class="p401">
    We can't connect to server please check your network
    <hr />
    <span>Try refresh app, following below image to refresh.</span>
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