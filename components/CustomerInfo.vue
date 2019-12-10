<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span style="font-size: 14px;">Customer info (from CRM)</span>
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
          <el-dropdown class="pointer" trigger="click" @command="openModalUpdate">
            <span class="el-dropdown-link">
              <i class="el-icon-edit"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="care_infomation">Care infomation</el-dropdown-item>
              <el-dropdown-item command="interest_infomation">Interest infomation</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-plus pointer"></i>
        </div>
      </div>
      <transition name="fade">
        <div v-loading="loading" v-show="expanded" :class="{'isHide' : !expanded}">
          <el-row>
            <el-col :span="24">
              <el-select v-model="leadModel" placeholder="Select" style="width:100%">
                <el-option
                  v-for="(item, index) in leadSelectList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <el-avatar :src="setAvatar(customerInfo.name)"></el-avatar>
              </div>
            </el-col>
            <el-col :span="16" class="text-left">
              <p>{{customerInfo.name}}</p>
              <p v-if="customerInfo.email" style="color: cornflowerblue;">{{customerInfo.email}}</p>
              <p v-else>
                <i>(Email not avaialbe)</i>
              </p>
              <p v-if="customerInfo.phone">
                {{customerInfo.phone}}
                <el-link type="primary" :href="'tel:' + customerInfo.phone">
                  <i class="el-icon-phone-outline"></i>
                </el-link>
                <el-link type="primary" :href="'tel:' + customerInfo.phone">
                  <i class="el-icon-s-comment"></i>
                </el-link>
              </p>
              <p v-else></p>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="margin-bottom-0">
            <el-col :span="24" class="text-left">
              <p>
                <i class="el-icon-info"></i>
                <span>&nbsp;Care status {{customerInfo.care_status}}</span>
              </p>
              <p>
                <i class="el-icon-user"></i>
                <span
                  v-if="customerInfo.sales_man"
                >&nbsp;{{customerInfo.sales_man_first_name}} | {{customerInfo.sales_man}}</span>
                <span v-else>&nbsp;(Not available data)</span>
              </p>
              <p>
                <i class="el-icon-date"></i>
                <span v-if="customerInfo.appointment_time">
                  <b>&nbsp;{{customerInfo.appointment_time | zFormat}}</b>
                </span>
                <span v-else>&nbsp;(Not available data)</span>
              </p>
              <p>
                <i class="el-icon-notebook-2"></i>
                <span v-if="customerInfo.take_note">&nbsp;{{customerInfo.take_note}}</span>
                <span v-else></span>
              </p>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            v-if="customerInfo.tags_keywords && customerInfo.tags_keywords.length > 0"
          >
            <el-col :span="24" class="text-left">
              <el-tag
                v-for="(item, index) in filterTags"
                :key="index"
                type="info"
                effect="dark"
                size="mini"
              >{{item}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </transition>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import ls from "../common/localStorage";
import { mapGetters } from "vuex";
import _ from "lodash";
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
      this.$store.dispatch("resizeClient");
    },
    openModalSync() {
      let self = this;
      return this.$store.getters.zafClient
        .invoke("instances.create", {
          location: "modal",
          url: `${process.env.URL}/modal/sync`,
          size: {
            width: "470px",
            height: "150px"
          }
        })
        .then(function(modalContext) {
          let modalGuid = modalContext["instances.create"][0].instanceGuid;
          let type = "sync";
          ls.setLocalStorage("modal_render", { modalGuid, type });
        });
    },
    openModalUpdate(command) {
      let params = {
        width: command === "care_infomation" ? "450px" : "800px",
        height: command === "care_infomation" ? "600px" : "570px",
        type: command
      };
      let self = this;
      return this.$store.getters.zafClient
        .invoke("instances.create", {
          location: "modal",
          url: `${process.env.URL}/modal/${params.type}`,
          size: {
            width: params.width,
            height: params.height
          }
        })
        .then(function(modalContext) {
          let modalGuid = modalContext["instances.create"][0].instanceGuid;
          let parentGuid = self.$store.getters.zafClient._instanceGuid;
          let type = params.type;
          ls.setLocalStorage("modal_render", {
            modalGuid,
            parentGuid,
            type,
            data: self.customerInfo
          });
        });
    },
    setAvatar(name) {
      return `https://ui-avatars.com/api/?name=${name}&rounded=true&size=64&color=ff0000&bold=true%20alt=`;
    }
  },
  computed: {
    ...mapGetters({
      leadSelectList: "leads/getLeadsSelect",
      leadSelected: "leads/getCurrentLead",
      customerInfo: "leads/getCustomerInfo"
    }),
    leadModel: {
      get: function() {
        return this.leadSelected;
      },
      set: function(newValue) {
        this.$store.dispatch("leads/setLead", newValue);
      }
    },
    filterTags() {
      return _.filter(this.customerInfo.tags_keywords, o => o && o !== "");
    }
  }
};
</script>

<style scoped>
[class*="el-icon"] {
  font-size: 14px;
}
.el-avatar {
  width: 70px;
  height: 70px;
}
</style>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>