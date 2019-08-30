<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Customer info</span>
        <div class="icon-bar">
          <el-dropdown class="pointer" trigger="click" @command="openModalSync">
            <span class="el-dropdown-link">
              <i class="el-icon-refresh"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="z2o">
                Zendesk
                <i class="el-icon-arrow-right"></i>
                O2O
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="pointer" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-edit"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Care infomation</el-dropdown-item>
              <el-dropdown-item>Interest infomation</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-plus pointer"></i>
        </div>
      </div>
      <div v-loading="loading" v-show="expanded">
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-avatar :src="circleUrl"></el-avatar>
            </div>
          </el-col>
          <el-col :span="16" class="text-left">
            <p>Liem chrome</p>
            <p>liem.nguyen@quesera.sg</p>
            <p>84986858724</p>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20" class="margin-bottom-0">
          <el-col :span="24" class="text-left">
            <p>
              <i class="el-icon-info"></i>&nbsp;&nbsp;Care status Potential
            </p>
            <p>
              <i class="el-icon-user"></i>&nbsp;&nbsp;Saihoong | sai.chan@quesera.sg
            </p>
            <p>
              <i class="el-icon-date"></i>&nbsp;&nbsp;(Not available data)
            </p>
            <p>
              <i class="el-icon-notebook-2"></i>&nbsp;&nbsp;Liem test lan 2
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="text-left">
            <el-tag
              v-for="(item, index) in 4"
              :key="index"
              type="info"
              effect="dark"
              size="mini"
            >Tag 3</el-tag>
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
      expanded: true,
      circleUrl:
        "https://ui-avatars.com/api/?name=Liem%20chrome&rounded=true&size=64&color=ff0000&bold=true%20alt="
    };
  },
  methods: {
    handleChange() {
      this.expanded = !this.expanded;
    },
    openModalSync() {
      var self = this;
      return this.zafClient
        .invoke("instances.create", {
          location: "modal",
          url: "http://localhost:3000",
          size: {
            width: "470px",
            height: "200px"
          }
        })
        .then(function(modalContext) {
          var modalGuid = modalContext["instances.create"][0].instanceGuid;
          var type = "sync";
          self.setLocalStorage("modal_render", { modalGuid, type });
        });
    }
  }
};
</script>

<style scoped>
[class*="el-icon"] {
  font-size: 17px;
}
.el-avatar {
  width: 70px;
  height: 70px;
}
</style>