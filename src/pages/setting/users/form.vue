<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('users.form.createUser')"
          :description="$t('users.form.FromHereYouCanCreateAnewUser')"
          v-if="$route.name == 'usersCreate'"
        />
        <addHeader
          :title="$t('users.form.editUser')"
          :description="$t('users.form.fromHereYouCanModifyTheUserData')"
          v-if="$route.name == 'usersEdit' || this.$route.name == 'profile'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('users.form.basicInformation')"
            :description="$t('users.form.userBasicInformation')"
            noLine="true"
          />
          <fileInput
            :title="$t('users.form.userPicture')"
            v-model="item.image"
            :image="item.image"
            :path="'users'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
          />
          <formInput
            :title="$t('users.form.userName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t('users.form.email') }}</label>
            <div class="col-md-7">
              <input
                type="email"
                class="form-control"
                v-model="item.email"
                :class="{ 'is-invalid': errors.email }"
              />
              <div class="invalid-feedback">
                {{ $t('allerts.thisFieldIsRequired') }}
              </div>
            </div>
          </div>

          <formInput
            :type="'password'"
            :title="$t('users.form.password')"
            v-model="item.password"
            :hasErorr="errors.password"
            :error="$t('allerts.passwordMustBeCharactersLong')"
            maxlength="255"
          />
          <formInput
            :type="'password'"
            :title="$t('users.form.repeatThePassword')"
            v-model="item.repassword"
            :hasErorr="errors.repassword"
            :error="$t('allerts.passwordDoesNotMatch')"
            maxlength="255"
          />
          <connectionInput
            :title="$t('users.form.rolesGroup')"
            :group="$t('users.form.role')"
            v-model="item.role_id"
            :hasAdd="false"
            :open="'addStore'"
            :values="roles"
            :hasErorr="errors.role_id"
            :error="$t('allerts.thisFieldIsRequired')"
            v-if="$route.name != 'profile'"
          />
          <connectionInput
            :title="$t('users.form.availableCompanies')"
            :group="$t('users.form.chooseCompaniesAvailableToTheEmployee')"
            v-model="item.company_id"
            :hasAdd="false"
            :values="companies"
            :hasErorr="errors.company_id"
            :error="$t('allerts.thisFieldIsRequired')"
            v-if="$route.name != 'profile'"
          />
          <selectInput
          :title="$t('users.form.language')" 
          v-model="item.language"
          :values="[
            {value: 'ar', name: $t('users.form.arabic')},
            {value: 'en', name: $t('users.form.english')}
          ]"
        />


          <dvider
            :title="$t('users.form.UserPermissions')"
            :description="$t('users.form.PermissionsAvailableToTheUser')"
            v-if="$route.name != 'profile'"
          />

          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('users.form.UserLockers')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedSafes"
                :options="$database.safes"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('users.form.ChooseTheLockersAvailableToTheUser')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('users.form.UserStores')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedStores"
                :options="$database.stores"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('users.form.ChooseTheStoresAvailableToTheUser')"
                label="name"
                track-by="name"
                :hide-selected="true"

              />
            </div>
          </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('users.form.UserPointsOfSale')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedPointOfSales"
                :options="$database.pointOfSales"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('users.form.AvailablePointsOfSaleToTheUser')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('users.form.UserPriceLists')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedPriceLists"
                :options="$database.priceLists"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('users.form.PriceListsAvailableToTheUser')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('users.form.UserProjects')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedProjects"
                :options="$database.projects"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('users.form.ProjectsAvailableToTheUser')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>

          <dvider
            :title="$t('users.form.contactInformation')"
            :description="$t('users.form.customerContactInformation')"
          />

          <iconInput
            :type="'number'"
            :title="$t('users.form.telephoneNumber')"
            :icon="'phone-office'"
            v-model="item.telephone"
          />
          <iconInput
            :type="'number'"
            :title="$t('users.form.faxNumber')"
            :icon="'fax'"
            v-model="item.fax"
          />
          <iconInput
            :type="'number'"
            :title="$t('users.form.mobileNumber')"
            :icon="'phone'"
            v-model="item.mobile"
          />
          <iconInput
            :type="'link'"
            :title="$t('users.form.theSiteIsOnTheInternet')"
            :icon="'browser'"
            v-model="item.website"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'usersCreate' && !$parent.stopEdit"
          >
            {{ $t('users.form.createUser') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="
              ($route.name == 'usersEdit' && !$parent.stopEdit) ||
              ($route.name == 'profile' && !$parent.stopEdit)
            "
          >
            {{ $t('users.form.editUser') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import fileInput from "@/elements/add/form/fileInput.vue";
import formInput from "@/elements/add/form/formInput.vue";
import iconInput from "@/elements/add/form/iconInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/users",
      item: {
        company_id: 0,
        language: 'ar',
        store_id: [],
        safe_id: [],
        point_of_sale_id: [],
        price_list_id: [],
        project_id: [],
      },
      roles: {},
      companies: [],
      errors: {
        name: false,
        email: false,
        password: false,
        repassword: false,
        role_id: false,
      },
      selectedSafes: [],
      readySafes: 0,
      selectedStores: [],
      readyStores: 0,
      selectedPointOfSales: [],
      selectedPriceLists: [],
      selectedProjects: [],
      readyPointOfSales: 0,
    };
  },
  methods: {
    getRoles() {
      axios.get(this.$linkGnirator("/rolesItems")).then((response) => {
        this.roles = response.data;
      });
    },
    getCompanies() {
      axios.get(this.$linkGnirator("/companiesItems")).then((response) => {
        this.companies = response.data;
      });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (typeof this.item.email === "undefined" || this.item.email == "") {
        error = 1;
        this.errors.email = true;
      }
      if (this.$route.name != "usersEdit" && this.$route.name != 'profile') {
        if (
          typeof this.item.password === "undefined" ||
          this.item.password == "" ||
          this.item.password.length < 7
        ) {
          error = 1;
          this.errors.password = true;
        }
        if (
          typeof this.item.repassword === "undefined" ||
          this.item.repassword == "" ||
          this.item.password !== this.item.repassword
        ) {
          error = 1;
          this.errors.repassword = true;
        }
      }
      if (
        this.$route.name != "profile" &&
        (typeof this.item.role_id === "undefined" || this.item.role_id == "")
      ) {
        error = 1;
        this.errors.role_id = true;
      }
      if (error == 0) {
        if (this.$route.name == "usersCreate") {
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path), this.item)
            .then((response) => {
              if (response.data == "emailError") {
                this.$parent.aletText =
                  this.$t('allerts.emailIsAlreadyInUse');
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else if (response.data == "limited") {
                this.$parent.aletText =
                  this.$t('allerts.YouHaveReachedTheLimitForUsersPleaseUpdatePackage');
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText =
                  this.$t('allerts.userSuccessfullyAdded');
                this.$parent.alertType = "success";
                this.$router.push(this.path);
              }
              this.$parent.stopEdit = false;
            });
        } else if (
          this.$route.name == "usersEdit" ||
          this.$route.name == "profile"
        ) {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              if (response.data == "emailError") {
                this.$parent.aletText =
                  this.$t('allerts.emailIsAlreadyInUse');
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText =
                  this.$t('allerts.userHasBeenModifiedSuccessfully');
                this.$parent.alertType = "success";
                if (this.$route.name == "usersEdit") {
                  this.$router.go(-1);
                } else {
                  this.$router.push("/");
                }
                this.$parent.stopEdit = false;
                if (this.item.id == this.$option.id) {
                  this.$parent.getCompanies();
                }
              }
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
      if (this.$route.name == "profile") {
        var user = JSON.parse(localStorage.getItem("user"));
        var id = user.id;
      } else {
        var id = this.$route.params.id;
      }

      axios.get(this.$linkGnirator(this.path + "/" + id)).then((response) => {
        this.item = response.data;
        this.$parent.stopEdit = false;
        if (Array.isArray(JSON.parse(this.item.company_id))) {
          JSON.parse(this.item.company_id).forEach((id) => {
            var company = this.companies.find((el) => el.id == id);
            this.selectedCompanies.push(company);
          });
        }
        if (Array.isArray(this.item.safe_id)) {
          this.item.safe_id.forEach((id) => {
            var safe = this.$database.safes.find((el) => el.id == id);
            if (safe) {
              this.selectedSafes.push(safe);
            }
          });
        }
        if (Array.isArray(this.item.store_id)) {
          this.item.store_id.forEach((id) => {
            var store = this.$database.stores.find((el) => el.id == id);
            if (store) {
              this.selectedStores.push(store);
            }
          });
        }
        if (Array.isArray(this.item.point_of_sale_id)) {
          this.item.point_of_sale_id.forEach((id) => {
            var pointOfSale = this.$database.pointOfSales.find(
              (el) => el.id == id
            );
            if (pointOfSale) {
              this.selectedPointOfSales.push(pointOfSale);
            }
          });
        }

        if (Array.isArray(this.item.price_list_id)) {
          this.item.price_list_id.forEach((id) => {
            var priceList = this.$database.priceLists.find(
              (el) => el.id == id
            );
            if (priceList) {
              this.selectedPriceLists.push(priceList);
            }
          });
        }

        if (Array.isArray(this.item.project_id)) {
          this.item.project_id.forEach((id) => {
            var project = this.$database.projects.find(
              (el) => el.id == id
            );
            if (project) {
              this.selectedProjects.push(project);
            }
          });
        }
      });
    },
  },
  watch: {
    selectedSafes: function (val) {
      this.item.safe_id = val.map((el) => el.id);
    },
    selectedStores: function (val) {
      this.item.store_id = val.map((el) => el.id);
    },
    selectedPointOfSales: function (val) {
      this.item.point_of_sale_id = val.map((el) => el.id);
    },
    selectedPriceLists: function (val) {
      this.item.price_list_id = val.map((el) => el.id)
    },
    selectedProjects: function (val) {
      this.item.project_id = val.map((el) => el.id)
    } 
  },
  mounted() {
    this.$updateDatabase(["stores", "safes", "pointOfSales"]);
    this.getRoles();
    this.getCompanies();
    if (this.$route.name == "usersEdit" || this.$route.name == "profile") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.readySafes = 1;
      this.readyStores = 1;
      this.readyStores = 1;
    }
  },
  components: {
    fileInput,
    formInput,
    dvider,
    addHeader,
    iconInput,
    connectionInput,
    loading,
    selectInput,
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__tag,
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: #2c7ae5;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  content: "أضغط للألغاء";
}

.multiselect__option--selected:after {
  content: "تم الأختيار";
}

.multiselect__option--highlight:after {
  content: "أضغط للأختيار";
}

.multiselect__tags {
  border: 1px solid #d2ddec;
  height: 40px;
}
</style>
