<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('capitals.form.addCustomer')"
          :description="
            $t('capitals.form.fromHereYouCanCreateANewCustomer')
          "
          v-if="$route.name == 'capitalsCreate'"
        />
        <addHeader
          :title="$t('capitals.form.editCustomer')"
          :description="
            $t('capitals.form.fromHereYouCanModifyTheCustomerInformation')
          "
          v-if="$route.name == 'capitalsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('capitals.form.basicInformation')"
            :description="$t('capitals.form.safesBasicInformation')"
            noLine="true"
          />
          <formInput
            :title="$t('capitals.form.customerName')"
            :checkError="'nameErorr'"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <monyInput
            :title="$t('capitals.form.initialBalance')"
            v-model="item.cost"
          />

          <formInput
            type="number"
            :title="$t('capitals.form.DepreciationRate')"
            v-model="item.depreciation_rate"
            maxlength="255"
          />

          <checkInput
            :title="$t('capitals.form.customerCase')"
            :value="item.stat"
            v-model="item.stat"
          />

          <dvider
            :title="$t('capitals.form.AssetValidityPeriod')"
            :description="$t('capitals.form.EnterFixedAssetValidityPeriods')"
          />

          <div class="form-group row col-md-6">
            <label class="col-md-4">{{$t('capitals.form.PurchaseDate')}}</label>
             <div class="col-md-7 icon-input w-100">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('capitals.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('capitals.form.Now')"
                  v-model="item.date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"/>
              </div>
          </div>

          <div class="form-group row col-md-6">
            <label class="col-md-4">{{$t('capitals.form.DateOfSale')}}</label>
             <div class="col-md-7 icon-input w-100">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('capitals.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('capitals.form.Now')"
                  v-model="item.expiry_date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"/>
              </div>
          </div>

          <dvider
            :title="$t('capitals.form.AdditionalInformation')"
            :description="$t('capitals.form.EnterTheDetailsOfTheFixedAsset')"
          />

          <formTextarea
            :title="$t('capitals.form.DescriptionOfTheOriginal')"
            v-model="item.descripton"
          />

          <formTextarea
            :title="$t('capitals.form.OtherDetailedData')"
            v-model="item.details"
          />

          <formTextarea :title="$t('capitals.form.Reviews')" v-model="item.notes"/>

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'capitalsCreate' && !$parent.stopEdit"
          >
            {{ $t('capitals.form.addCustomer') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'capitalsEdit' && !$parent.stopEdit"
          >
            {{ $t('capitals.form.editCustomer') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/capitals",
      item: {
        stat: 1,
        date: new Date().toISOString("ar-EG", { timeZone: "Africa/Cairo" }),
        expiry_date: "",
      },
      users: [],
      selectedUsers: [],
      errors: {
        name: false,
      },
      readyUsers: 0,
    };
  },
  methods: {
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "capitalsCreate") {
          this.$parent.aletText = "تم اضافة الأصل بنجاح";
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "capitalsEdit") {
          
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.customerHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    getItem() {
      var item = this.$database.capitals.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
      }
      this.$parent.stopEdit = false;
    },
    getUsers() {
      axios.get(this.$linkGnirator("/usersItems")).then((response) => {
        this.users = response.data;
        this.readyUsers += 1;
      });
    },
  },
  mounted() {
    this.getUsers();
    if (this.$route.name == "capitalsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else{
       var date = new Date()
        date.setDate(date.getDate() + 5)
        this.item.expiry_date = date.toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10)

    }
  },
  watch: {
    selectedUsers: function (val) {
      this.item.user_id = val.map((el) => el.id);
    },
    readyUsers: function (val) {
      if (val == 2) {
        if (Array.isArray(this.item.user_id)) {
          this.item.user_id.forEach((id) => {
            var user = this.users.find((el) => el.id == id);
            this.selectedUsers.push(user);
          });
        }
      }
    },
  },
  components: {
    formInput,
    formTextarea,
    dvider,
    addHeader,
    monyInput,
    checkInput,
    loading,
    VueCtkDateTimePicker,

  },
};
</script>
<style></style>
