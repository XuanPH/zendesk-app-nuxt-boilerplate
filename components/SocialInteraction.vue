<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <i
          :class="{'el-icon-arrow-up' : expanded,'el-icon-arrow-down' : !expanded }"
          @click="handleChange"
        ></i>
        <span>Social Interaction</span>
      </div>
      <div v-loading="loading" v-show="expanded">Social Interaction</div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      expanded: false,
      loading: false
    };
  },
  methods: {
    handleChange(val) {
      this.expanded = !this.expanded;
      this.$store.dispatch("resizeClient");
    }
  },
  computed: {
    ...mapGetters({
      leadId: "leads/getCurrentLead"
    })
  },
  watch: {
    interaction: function(val) {
      this.$store.dispatch("resizeClient");
    }
  },
  async mounted() {
    await this.$store.dispatch("interactionSocial/getInteraction", this.leadId);
  }
};
</script>
