<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Digital source info</span>
      </div>
      <div v-loading="loading" v-show="expanded">
        <el-row>
          <el-col :span="24" class="text-left">
            <div>
              <b>Conversion (Goals hit)</b>
              <div>
                <el-tag
                  v-for="(item, index) in 4"
                  :key="index"
                  type="danger"
                  effect="dark"
                  size="mini"
                >Tag 3</el-tag>
              </div>
            </div>
            <div>
              <b>
                <b>Source / Medium</b>
              </b>
              <div>
                <el-tag
                  v-for="(item, index) in 4"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >Tag 3</el-tag>
              </div>
            </div>
            <div>
              <b>Campaign name</b>
              <div>
                <el-tag
                  v-for="(item, index) in 4"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >Tag 3</el-tag>
              </div>
            </div>
            <div>
              <b>Keyword and terms</b>
              <div>
                <el-tag
                  v-for="(item, index) in 4"
                  :key="index"
                  type="info"
                  effect="dark"
                  size="mini"
                >Tag 3</el-tag>
              </div>
            </div>
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
    }
  }
};
</script>