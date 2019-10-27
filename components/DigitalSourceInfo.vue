<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Online Info (from Digital)</span>
      </div>
      <div v-loading="loading" v-show="expanded">
        <el-row>
          <el-col :span="24" class="text-left" v-if="isNotEmptyDigital">
            <div v-if="conversion.length > 0">
              <b>Conversion (Goals hit)</b>
              <div>
                <el-tag
                  v-for="(item, index) in conversion"
                  :key="index"
                  type="danger"
                  effect="dark"
                  size="mini"
                >{{item}}</el-tag>
              </div>
            </div>
            <div v-if="sourceMedium.length > 0">
              <b>
                <b>Source / Medium</b>
              </b>
              <div>
                <el-tag
                  v-for="(item, index) in sourceMedium"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >{{item}}</el-tag>
              </div>
            </div>
            <div v-if="campaignName.length > 0">
              <b>Campaign name</b>
              <div>
                <el-tag
                  v-for="(item, index) in campaignName"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >{{item}}</el-tag>
              </div>
            </div>
            <div v-if="keywordsTerms.length > 0">
              <b>Keyword and terms</b>
              <div>
                <el-tag
                  v-for="(item, index) in keywordsTerms"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >{{item}}</el-tag>
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="text-left" v-else>
            <i>(Not available data)</i>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h2>Web accessed</h2>
        <br />
        <app-web></app-web>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import WebAccessed from "../components/WebAccessed.vue";
export default {
  data() {
    return {
      loading: false,
      expanded: false
    };
  },
  components: {
    appWeb: WebAccessed
  },
  methods: {
    handleChange() {
      this.expanded = !this.expanded;
      this.$store.dispatch("resizeClient");
    }
  },
  computed: {
    ...mapGetters({
      digitalSourceInfo: "leads/getDigitalSourceInfo"
    }),
    conversion() {
      return _.filter(this.digitalSourceInfo.conversion, o => o && o !== "");
    },
    sourceMedium() {
      return _.filter(this.digitalSourceInfo.source_medium, o => o && o !== "");
    },
    campaignName() {
      return _.filter(this.digitalSourceInfo.campaign_name, o => o && o !== "");
    },
    keywordsTerms() {
      return _.filter(
        this.digitalSourceInfo.keywords_terms,
        o => o && o !== ""
      );
    },
    isNotEmptyDigital() {
      return (
        this.conversion.length > 0 ||
        this.sourceMedium.length > 0 ||
        this.campaignName.length > 0 ||
        this.keywordsTerms.length > 0
      );
    }
  }
};
</script>