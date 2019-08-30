<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Web accessed</span>
      </div>
      <div v-loading="loading" v-show="expanded">
        <el-row>
          <el-col :span="4">
            <i class="el-icon-info" style="color: #11cb11;" />
          </el-col>
          <el-col :span="20" class="text-left">
            <b>First accessed</b>
            <br />
            <small>an hour agoat 09:29 AM 29 August 2019</small>
          </el-col>
          <el-col :span="4">
            <i class="el-icon-info" style="color: red;" />
          </el-col>
          <el-col :span="20" class="text-left">
            <b>Last accessed</b>
            <br />
            <small>an hour agoat 09:29 AM 29 August 2019</small>
          </el-col>
          <el-col :span="24" style="margin-top:20px;">
            <a href="javascript:void(0)" @click="openModalSync">
              View detailed log accessed
              <i class="el-icon-right"></i>
            </a>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      expanded: true
    };
  },
  methods: {
    handleChange() {
      this.expanded = !this.expanded;
    },
    openModalSync(type) {
      return this.zafClient
        .invoke("instances.create", {
          location: "modal",
          url: "http://localhost:3000",
          size: {
            width: "800px",
            height: "600px"
          }
        })
        .then(function(modalContext) {
          var modalGuid = modalContext["instances.create"][0].instanceGuid;
        });
    }
  }
};
</script>