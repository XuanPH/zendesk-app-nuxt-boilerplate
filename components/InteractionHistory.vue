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
              <el-dropdown-item v-for="(item, index) in filterMenu" :key="index" :command="index">
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
          <el-col :span="24" class="text-left" v-if="interaction.length === 0">
            <i>(Not available data)</i>
          </el-col>
          <el-col :span="24" style="margin-left: -40px !important;" v-else>
            <el-timeline class="text-left">
              <el-timeline-item v-for="(item, index) in interaction" :key="index" color="#0298e9">
                <span class="size-14 display-block break-word" v-if="item.type == 'assignment'">
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.allocateLead`)}}</span>
                  <br />
                  <span v-if="item.staffInCharge">{{$t(`callLogs.leadAllocateFor`)}}:</span>
                  <a
                    :href="`mailto:${item.staffInCharge}`"
                    target="_top"
                    class="break-word"
                    v-if="item.staffInCharge"
                  >{{item.staffInCharge}}</a>
                </span>
                <span class="size-14 display-block break-word" v-else-if="item.type == 'status'">
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.changeStatusLead`)}}</span>
                  <br />
                  <span>
                    {{$t(`callLogs.from`)}}
                    <span
                      v-if="item.previousStatus"
                      style="font-weight: bold"
                    >{{item.previousStatusValue}}</span>
                    <span style="font-weight: bold" v-else>{{$t(`callLogs.notStatus`)}}</span>
                  </span>
                  <span>
                    {{$t(`callLogs.to`)}}
                    <span
                      v-if="item.currentStatus"
                      style="font-weight: bold"
                    >{{item.currentStatusValue}}</span>
                    <span style="font-weight: bold" v-else>{{$t(`callLogs.notStatus`)}}</span>
                  </span>
                </span>
                <span
                  class="size-14 display-block break-word"
                  v-else-if="item.type == 'statusCalendar'"
                >
                  <router-link
                    :to="`/calendar/edit/${item.extension}`"
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.changeCalendar`)}}</router-link>
                  <br />
                  <span>
                    {{$t(`callLogs.from`)}}
                    <span
                      v-if="item.previousStatus"
                      style="font-weight: bold"
                    >{{$t('history.' + item.previousStatus)}}</span>
                    <span style="font-weight: bold" v-else>{{$t(`callLogs.notStatus`)}}</span>
                  </span>
                  <span>
                    {{$t(`callLogs.to`)}}
                    <span
                      v-if="item.currentStatus"
                      style="font-weight: bold"
                    >{{$t('history.' + item.currentStatus)}}</span>
                    <span style="font-weight: bold" v-else>{{$t(`callLogs.notStatus`)}}</span>
                  </span>
                </span>
                <span class="size-14 display-block break-word" v-else-if="item.type == 'edit'">
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t('history.' + item.currentStatus)}}</span>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span
                  class="size-14 display-block break-word"
                  v-else-if="item.type == 'editCalendar'"
                >
                  <router-link
                    :to="`/calendar/edit/${item.extension}`"
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t('history.' + item.currentStatus)}}</router-link>
                  <br />
                </span>
                <span class="size-14 display-block break-word" v-else-if="item.type == 'note'">
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.updateNot`)}}</span>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span class="size-14 display-block break-word" v-else-if="item.type == 'sendLead'">
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.sendTelegram`)}}</span>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span
                  class="size-14 display-block break-word"
                  v-else-if="item.type == 'recieveTelegram'"
                >
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.replyTelegram`)}}</span>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span
                  class="size-14 display-block break-word"
                  v-else-if="item.type == 'sendCalendar'"
                >
                  <router-link
                    :to="`/calendar/edit/${item.extension}`"
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t(`callLogs.setupCalendarToTelegram`)}}</router-link>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span
                  class="size-14 display-block break-word"
                  v-else-if="item.type == 'responseSale'"
                >
                  <span
                    class="size-14 blue--text"
                    style="padding: 0px;"
                  >{{$t('responseSale.' + item.currentStatus)}}</span>
                  <br />
                  <span>
                    <span
                      v-if="item.note"
                      style="font-style: italic;text-align: justify"
                      class="break-word"
                    >{{item.note}}</span>
                  </span>
                </span>
                <span class="size-14 display-block break-word" v-else>
                  <span class="size-14 blue--text" style="padding: 0px;">{{item.type}}</span>
                  <br />
                  <span>
                    <span v-if="item.note" style="font-style: italic">{{item.note}}</span>
                  </span>
                </span>
                <span v-if="item.botId && item.refIds && item.refIds.length" class="mt-1">
                  <span
                    v-if="item.refIds.length>-1"
                  >{{$t('sendSmsList.sentSuccess')}} {{item.refIds.length}} {{$t('imageTelegram')}}</span>
                  <br />
                  <span v-for="(item1,i1) in item.refIds" :key="i1" class="mr-1">
                    <el-button
                      type="success"
                      icon="el-icon-picture"
                      @click="showImage(item, i1)"
                      circle
                    ></el-button>
                  </span>
                </span>
                <p>
                  <small>
                    <i
                      style="color:#bcbcbc"
                    >{{item.createdAt | fromNow}} at {{item.createdAt | zFormat}}</i>
                  </small>
                </p>
              </el-timeline-item>
            </el-timeline>
          </el-col>
          <el-col :span="24" style="margin-left: -40px !important;" v-if="showReadMore">
            <a :href="interactionHistoryLink" target="_blank">
              <i style="font-size: 12px;">Load more</i>
              <!-- <i style="font-size: 12px;" @click="loadMore">Load more</i> -->
            </a>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    handleChange(val) {
      this.expanded = !this.expanded;
      this.$store.dispatch("resizeClient");
    },
    async selectFilter(value) {
      await this.$store.dispatch("leads/selectFilter", value);
      await this.$store.dispatch("leads/resetInteractionList");
      this.readData();
    },
    readData: _.debounce(async function(callback) {
      await this.$store.dispatch("leads/initInteraction");
    }, 500),
    loadMore: async function() {
      await this.$store.dispatch("leads/initInteraction");
    }
  },
  computed: {
    ...mapGetters({
      filterMenu: "leads/getFilterMenu",
      interaction: "leads/getInteraction",
      loading: "leads/getInteractionLoading",
      showReadMore: "leads/showReadMore"
    }),
    ...mapState({
      lead: state => state.leads.lead,
      currentLead: state => state.leads.currentLead
    }),
    interactionHistoryLink() {
      return `${this.lead.customer_info.companyLink}/lead/history/${this.currentLead}/`;
    }
  },
  watch: {
    interaction: function(val) {
      this.$store.dispatch("resizeClient");
    }
  }
};
</script>
