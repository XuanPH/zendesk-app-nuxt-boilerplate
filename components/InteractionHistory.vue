<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Interaction history</span>
        <div class="icon-bar">
          <el-dropdown
            :hide-on-click="false"
            class="pointer"
            trigger="click"
            @command="selectFilter"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-finished"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in listFilter" :key="index" :command="index">
                <i class="el-icon-check" v-if="item.selected"></i>
                <i class="el-icon-check2" v-else></i>
                {{item.text}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div v-loading="loading" v-show="expanded">
        <el-row>
          <el-col :span="24" style="margin-left: -25px !important;">
            <el-timeline class="text-left">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >{{activity.content}}</el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import filterMenu from "../data/filterData";
export default {
  data() {
    return {
      loading: false,
      listFilter: [],
      expanded: true,
      activities: [
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0298e9"
        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0298e9"
        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0298e9"
        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0298e9"
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      this.expanded = !this.expanded;
    },
    selectFilter(value) {
      if (
        value === 0 &&
        this.listFilter.filter(o => o.selected === true).length === 1
      ) {
        return;
      } else {
        this.listFilter[value].selected = !this.listFilter[value].selected;
      }
    }
  },
  mounted() {
    this.listFilter = filterMenu;
  }
};
</script>