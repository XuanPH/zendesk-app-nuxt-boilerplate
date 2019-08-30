<template>
  <div>Xin to âu to âu</div>
</template>
<script>
export default {
  updated() {
    console.info("mounted modal");
    var data = this.getLocalStorage("modal_render", true);
  }
};
</script>