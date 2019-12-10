<template>
  <div v-loading="loading" v-show="expanded">
    <el-row v-if="webAccess.first_web_access_time && webAccess.last_web_access_time">
      <el-col :span="4">
        <i class="el-icon-info" style="color: #11cb11;" />
      </el-col>
      <el-col :span="20" class="text-left">
        <b>First accessed</b>
        <br />
        <small v-if="webAccess.first_web_access_time !== ''">
          {{webAccess.first_web_access_time | fromNow}}
          <span>at {{webAccess.first_web_access_time | zFormat}}</span>
        </small>
      </el-col>
      <el-col :span="4">
        <i class="el-icon-info" style="color: red;" />
      </el-col>
      <el-col :span="20" class="text-left">
        <b>Last accessed</b>
        <br />
        <small v-if="webAccess.first_web_access_time !== ''">
          {{webAccess.first_web_access_time | fromNow}}
          <span>at {{webAccess.first_web_access_time | zFormat}}</span>
        </small>
      </el-col>
      <el-col :span="24" style="margin-top:20px;">
        <a :href="webAccessDetail" target="_blank" style="color: blue">
          View detailed log accessed
          <i class="el-icon-right"></i>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import ls from "../common/localStorage";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      expanded: true
    };
  },
  computed: {
    ...mapGetters({
      webAccess: "leads/getWebAccess",
      currentLead: "leads/getCurrentLead"
    }),
    ...mapState({
      lead: state => state.leads.lead
    }),
    webAccessDetail() {
      return `${this.lead.customer_info.companyLink}/lead/o2oTracking/${this.currentLead}/`;
    }
  },
  methods: {
    handleChange() {
      this.expanded = !this.expanded;
    },
    openModalSync(type) {
      let self = this;
      return self.$store.getters.zafClient
        .invoke("instances.create", {
          location: "modal",
          url: `${process.env.URL}/modal/history`,
          //url: `${process.env.URL}/`,
          size: {
            width: "650px",
            height: "600px"
          }
        })
        .then(function(modalContext) {
          let modalGuid = modalContext["instances.create"][0].instanceGuid;
          let type = "history";
          ls.setLocalStorage("modal_render", {
            modalGuid,
            type,
            data: self.currentLead
          });
        });
    }
  }
};
</script>
