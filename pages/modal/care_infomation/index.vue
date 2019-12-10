<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" v-loading="loading">
        <el-form
          class="form-care-infomation"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          label-position="top"
        >
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.fullName"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="Activity zone" prop="status">
            <el-select v-model="form.status" placeholder="Status" style="width:100%">
              <el-option
                v-for="(item, index) in listStatus"
                :key="index"
                :label="item.dataValue"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Salesman" prop="salesman">
            <el-select v-model="form.staffInCharge" placeholder="Salesman" style="width:100%">
              <el-option
                v-for="(item, index) in listSalesman"
                :key="index"
                :value="item.id"
                :label="item.firstName + ' | ' + item.email"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Note" prop="note">
            <el-input type="textarea" v-model="form.note"></el-input>
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
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      submiting: false,
      loading: true,
      parentClient: null,
      form: {
        id: "",
        fullName: "",
        email: "",
        phone: "",
        status: "",
        staffInCharge: "",
        note: "",
        interest: []
      },
      rules: {
        fullName: [
          {
            required: true,
            message: "Please input Name",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            message: "Please input Phone",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "Please input Status",
            trigger: "blur"
          }
        ],
        staffInCharge: [
          {
            required: true,
            message: "Please input Salesman",
            trigger: "blur"
          }
        ]
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
      self.submiting = true;
      self.loading = true;
      self.$refs["form"].validate(async valid => {
        if (valid) {
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
        } else {
          self.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
  },
  computed: {
    ...mapGetters({
      masterData: "commonData"
    }),
    listSalesman() {
      return this.masterData ? this.masterData.users : [];
    },
    listStatus() {
      return this.masterData
        ? _.filter(this.masterData.commonData, o => o.isDelete === false)
        : [];
    }
  },
  async mounted() {
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
    // var ex = {
    //   id: "5d6e2751f754dd00116da23e",
    //   fullName: "Xuân",
    //   phone: "902967712",
    //   email: "xuandeptrai@gmail.com",
    //   status: "5c6bfcbdc0cde7000fe2a0d4",
    //   staffInCharge: "5c25a06a606286000f4b5faf",
    //   note: "",
    //   interest: {}
    // };
    this.loading = false;
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>
<style>
.form-care-infomation label.el-form-item__label {
  padding: 0px !important;
}
</style>