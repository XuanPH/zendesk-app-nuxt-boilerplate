<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" class="text-center">
        <h2>Confirm synchronization from Zendesk to O2O ?</h2>
      </el-col>
    </el-row>
    <el-row class="text-center">
      <el-button type="info" plain @click="closeModal">Cancel</el-button>
      <el-button type="primary" plain>Confirm</el-button>
    </el-row>
  </div>
</template>
<script>
import ls from "~/common/localStorage";
import zaf from "~/common/zaf";
export default {
  data() {
    return {
      childClient: {}
    };
  },
  mounted() {
    let _self = this;
    let passParam = ls.getLocalStorage("modal_render", true);
    try {
      _self.childClient = _self.$store.getters.zafClient.instance(
        passParam.modalGuid
      );
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    closeModal() {
      this.childClient.invoke("destroy");
    }
  }
};
</script>