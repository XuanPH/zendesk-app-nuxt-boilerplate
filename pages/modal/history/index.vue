<template>
  <div v-loading="loading">
    <el-button type="primary" @click="renderP = true">Primary</el-button>
    <el-card v-for="(item,i) in weblogs" :key="i" class="box-card">
      <div class="text item">
        <el-row>
          <el-col :span="20">
            <b>{{item.timestamp | zFormat}}</b>
          </el-col>
          <el-col :span="20">{{`${item.geoLocation} / ${item.device} / ${item.opSystem}`}}</el-col>
          <el-col :span="20">
            <a :href="item.domain + item.urlPath">{{(item.domain + item.urlPath) | cut40Chars}}</a>
          </el-col>
          <el-col :span="20" v-if="item.refererDomain">
            <a
              :href="item.refererDomain + item.refererUrlPath"
            >{{(item.refererDomain + item.refererUrlPath) | cut40Chars}}</a>
          </el-col>
          <el-col :span="20">
            <span>{{item.utmSource}}</span>
            /
            <span>{{item.utmMedium}}</span>
            /
            <span>{{item.utmCampaign}}</span>
            <span v-if="item.utmContent">/ {{item.utmContent}}</span>
            <span v-if="item.utmKeyword">/ {{item.utmKeyword}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paging.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.totalRecords"
      ></el-pagination>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="data.results.page.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="data.results.page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.results.page.totalRecords"
      ></el-pagination>-->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import ls from "../../../common/localStorage";
import _ from "lodash";
export default {
  data() {
    return {
      childClient: {},
      renderP: false
    };
  },
  methods: {
    handleSizeChange: _.debounce(async function(val) {
      let self = this;
      self.paging.pageSize = val;
      await self.$store.dispatch("weblogs/getWeblogs");
    }, 500),
    handleCurrentChange: _.debounce(async function(val) {
      let self = this;
      self.paging.currentPage = val;
      await self.$store.dispatch("weblogs/getWeblogs");
    }),
    reload() {
      window.location.reload(true);
    }
  },
  watch: {
    paging: function(value) {}
  },
  computed: {
    ...mapGetters({
      weblogs: "weblogs/weblogs",
      zafClient: "zafClient",
      loading: "weblogs/loading"
    }),
    ...mapState({
      paging: state => state.weblogs.paging
    })
  },
  async fetch({ route, store }) {
    var notReload = ls.getLocalStorage("notreload", true);
    if (!notReload) {
      window.location.reload(true);
      ls.setLocalStorage("notreload", true);
    }

    let passParam = ls.getLocalStorage("modal_render");
    await store.dispatch("weblogs/setLead", passParam.data);
    await store.dispatch("weblogs/getWeblogs");
  },
  mounted() {
    console.log("rendered history");
  }
};
</script>
<style scoped>
.block {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: white;
  border-top: 1px solid #fafafa;
  padding: 2px 0px;
}
.box-card div.el-card__body {
  padding: 0px !important;
}
.el-col {
  padding: 4px 0px;
}
a {
  color: blue;
}
</style>
