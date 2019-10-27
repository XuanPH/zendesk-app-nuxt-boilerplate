<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" v-loading="loading">
        <el-form
          class="form-care-infomation"
          ref="form"
          label-width="120px"
          :model="form"
          label-position="top"
        >
          <el-form-item
            :label="getLabel(item)"
            :prop="item.text"
            v-for="(item, index) in listInterest"
            :key="index"
          >
            <el-select
              v-if="item.inputType === 'remote' || item.inputType === 'address' || item.inputType === 'dropdown'"
              :class="item.inputType"
              v-model="form.interest[item.code]"
              multiple
              filterable
              clearable
              default-first-option
              remote
              :placeholder="item.text"
              :remote-method="value => remoteMethod(item.code, value)"
              :loading="loadingRemote"
              style="width:100%"
            >
              <el-option
                v-for="(item1, i) in options[item.code]"
                :key="i"
                :label="item1.value"
                :value="item1.value"
              ></el-option>
            </el-select>
            <!-- <el-select
              v-if="item.inputType === 'address' || item.inputType === 'dropdown'"
              :class="item.inputType"
              filterable
              multiple
              v-model="form[item.code]"
              default-first-option
              style="width:100%"
              placeholder="Select"
              remote
              :remote-method="value => remoteMethod(item.code, value)"
            >
              <el-option
                v-for="item1 in options[item.code]"
                :key="item1.value"
                :label="item1.value"
              ></el-option>
            </el-select>-->
            <el-select
              v-if="item.inputType === 'freeText' || item.inputType === 'freedom'"
              :class="item.inputType"
              filterable
              default-first-option
              v-model="form.interest[item.code]"
              style="width:100%"
              multiple
              allow-create
              :placeholder="item.text"
            ></el-select>
            <el-input
              placeholder="Please input"
              maxlength="100"
              v-model="form.interest[item.code]"
              show-word-limit
              style="width:100%"
              v-if="item.inputType === 'text'"
              clearable
            ></el-input>
            <el-input-number
              controls-position="right"
              style="width:100%;"
              class="numberleft"
              v-model.number="form.interest[item.code][0]"
              v-if="item.inputType === 'number'"
              :step="1000000"
              :min="0"
              :max="900000000000"
            ></el-input-number>
            <div v-if="item.inputType === 'boolean'">
              <el-radio label="1" border>Option A</el-radio>
              <el-radio label="2" border>Option B</el-radio>
            </div>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="submitForm"
          :disabled="submiting"
        >{{ submiting ? 'Updating...' : 'Update'}}</el-button>
        <el-button @click="closeModal" :disabled="submiting">Cancel</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import zaf from "~/common/zaf";
import ls from "~/common/localStorage";
import { formatMoney } from "../../../common/func";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      submiting: false,
      loading: true,
      loadingRemote: false,
      parentClient: null,
      form: {
        id: "",
        fullName: "",
        email: "",
        phone: " passParam.data.phone",
        status: "",
        staffInCharge: "",
        note: "",
        interest: {}
      },
      options: {
        remote: [],
        address: [],
        dropdown: []
      },
      childClient: {},
      passData: {}
    };
  },
  methods: {
    closeModal() {
      this.childClient.invoke("destroy");
    },
    async submitForm() {
      let self = this;
      var res = await self.$store.dispatch("leads/updateLead", self.form);
      self.submiting = false;
      if (res.data.isSuccess) {
        setTimeout(() => {
          self.parentClient.trigger("data_modal_passing", {
            type: "updateLead"
          });
          self.loading = false;
          self.closeModal();
        }, 1000);
      } else {
        self.loading = false;
      }
      // let self = this;
      // self.submiting = true;
      // self.loading = true;
      // self.$refs["form"].validate(async valid => {
      //   if (valid) {
      //     var res = await self.$store.dispatch("leads/updateLead", self.form);
      //     self.submiting = false;
      //     if (res.data.isSuccess) {
      //       setTimeout(() => {
      //         self.parentClient.trigger("data_modal_passing", {
      //           type: "updateLead"
      //         });
      //         self.loading = false;
      //         self.closeModal();
      //       }, 1000);
      //     } else {
      //       self.loading = false;
      //     }
      //   } else {
      //     self.loading = false;
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    remoteMethod: _.debounce(async function(code, query) {
      if (query && query !== "") {
        this.loadingRemote = true;
        var refData = await this.$store.dispatch("interest/getRefData", code);
        var commonData = refData.data;
        this.loadingRemote = false;
        this.options[code] = _.filter(commonData, o => {
          return o.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.options[code] = [];
      }
    }, 200),
    getLabel(item) {
      if (item.inputType === "number") {
        return `${item.text} ${formatMoney(
          this.form.interest[item.code] ? this.form.interest[item.code] : 0,
          0
        )}`;
      }
      return item.text;
    }
  },
  computed: {
    ...mapGetters({
      masterData: "commonData"
    }),
    listInterest() {
      return this.masterData && this.masterData.interests
        ? this.masterData.interests.interestConfigResponse
        : [];
    },
    listStatus() {
      return this.masterData
        ? _.filter(this.masterData.commonData, o => o.isDelete === false)
        : [];
    }
  },
  async beforeMount() {
    await this.$store.dispatch("getCommonData");
    let passParam = ls.getLocalStorage("modal_render", true);
    try {
      this.childClient = this.$store.getters.zafClient.instance(
        passParam.modalGuid
      );
      this.parentClient = this.$store.getters.zafClient.instance(
        passParam.parentGuid
      );
      console.log("parentClient", this.parentClient);
    } catch (err) {
      console.log("init error", err);
    }
    this.form = {
      id: passParam.data.id,
      fullName: passParam.data.name,
      email: passParam.data.email,
      phone: passParam.data.phone,
      status: passParam.data.care_status_id,
      staffInCharge: passParam.data.sales_man_id,
      note: passParam.data.take_note,
      interest: passParam.data.interest
    };
    this.loading = false;
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
button {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
<style>
.form-care-infomation label.el-form-item__label {
  padding: 0px !important;
}
.numberleft input {
  text-align: left !important;
}
</style>