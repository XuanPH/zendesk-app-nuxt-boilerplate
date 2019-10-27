<template>
  <div>
    <el-row>
      <el-col :span="24">
        <component :is="isErrorPage" :error="error"></component>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Page401 from "../components/error/401";
import Page400 from "../components/error/400";
import Page204 from "../components/error/204";
import UnknowLead from "../components/error/UnknowLead";
export default {
  props: ["error"],
  components: {
    Page401
  },
  computed: {
    statusCode: function() {
      if (this.error.statusCode) return this.error.statusCode;
      return -1;
    },
    isErrorPage: function() {
      if (this.statusCode === 401) return Page401;
      if (this.statusCode === 400) return Page400;
      if (this.statusCode === 204) return Page204;
    }
  },
  mounted() {
    this.$store.dispatch("loading", false);
    console.log(this.error);
  }
};
</script>
