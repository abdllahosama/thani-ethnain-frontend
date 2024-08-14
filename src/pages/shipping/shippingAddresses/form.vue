<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader :title="$t('shippingAddresses.form.createShippingAddress')"
                   :description="$t('shippingAddresses.form.fromHereYouCanCreateNewShippingAddress')"
                   v-if="$route.name == 'shippingAddressesCreate'"/>
        <addHeader :title="$t('shippingAddresses.form.editShippingAddress')"
                   :description="$t('shippingAddresses.form.fromHereYouCanEditTheShippingAddress')"
                   v-if="$route.name == 'shippingAddressesEdit'"/>
        <div class="mb-4 row">

          <dvider :title="$t('customers.form.basicInformation')" :description="$t('shippingAddresses.form.basicInformationForShippingAddresses')"
                  noLine="true"/>

          <searchGroupInput
          :type="'customer'"
          :values="$database.customers.filter((el) => el.stat == 1)"
          />
          <formInput :title="$t('customers.form.customerName')" v-model="item.name" maxlength="255"/>
          <formInput :title="$t('customers.form.title')" v-model="item.address1" maxlength="255"/>
          <formInput :title="$t('customers.form.supplement')" v-model="item.address2" maxlength="255"/>
          <formInput :title="$t('shippingAddresses.form.floor')" v-model="item.floor" maxlength="255"/>
          <formInput :title="$t('shippingAddresses.form.flat')" v-model="item.flat" maxlength="255"/>
          <connectionInput :title="$t('customers.form.city')" :group="$t('shippingAddresses.form.cities')" :values="$database.cities" v-model="item.city_id"/>
          <iconInput :type="'text'" :title="$t('customers.form.mobileNumber')" :icon="'phone'" v-model="item.mobile"/>
          <iconInput :type="'text'" :title="$t('customers.form.anotherNumber')" :icon="'phone'" v-model="item.mobile2"/>
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12">
          <!-- Buttons -->
          <a @click="saveItem" class="btn btn-block btn-primary" v-if="$route.name == 'shippingAddressesCreate' && !$parent.stopEdit">
              {{$t('shippingAddresses.form.createShippingAddress')}}
          </a>
          <a @click="saveItem" class="btn btn-block btn-primary" v-if="$route.name == 'shippingAddressesEdit' && !$parent.stopEdit">
              {{$t('shippingAddresses.form.editShippingAddress')}}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import formInput from '@/elements/add/form/formInput.vue'
  import fileInput from '@/elements/add/form/fileInput.vue'
  import monyInput from '@/elements/add/form/monyInput.vue'
  import checkInput from '@/elements/add/form/checkInput.vue'
  import iconInput from '@/elements/add/form/iconInput.vue'
  import dvider from '@/elements/add/dvider.vue'
  import addHeader from '@/elements/add/header.vue'
  import loading from '@/elements/add/loading.vue'
  import connectionInput from '@/elements/add/form/connectionInput.vue'

  import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

  export default {
    data() {
      return {
        path: '/shippingAddresses',
        item: {
          stat: 1,
          customer_id: 0,
          customer: {
            name: '',
            balance : ''
          },
            city_id: 0
        },
        errors: {
        }
      }
    },
    methods: {
      saveItem() {
        var error = 0
        if (error == 0) {
          if (this.$route.name == 'shippingAddressesCreate') {
              this.$parent.aletText = this.$t('allerts.customerSuccessfullyAdde')
              this.$parent.alertType = 'success'
              this.$addToLocalDatabase(this.item, 'shippingAddresses');
              this.$router.go(-1)
          } else if (this.$route.name == 'shippingAddressesEdit') {
            this.item._method = 'PUT'
            this.$parent.stopEdit = true
            axios.post(this.$linkGnirator(this.path + '/' + this.item.id), this.item).then(response => {
                this.$parent.aletText = this.$t('allerts.customerHasBeenModifiedSuccessfully')
                this.$parent.alertType = 'success'
                this.$router.go(-1)
                this.$parent.stopEdit = false
                this.loading = false
            })
          }
        } else {
          this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput')
          this.$parent.alertType = 'danger'
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      },
      getItem() {
        var item = this.$database.shippingAddresses.find(el => el.id == this.$route.params.id)
        if (item) {
          item.customer = this.$database.customers.find(el => el.id == item.customer_id)
          this.item = item
        }
        this.$parent.stopEdit = false
      }
    },
    mounted() {
      this.$updateDatabase(['customers'])
      if (this.$route.name == 'shippingAddressesEdit') {
        this.$parent.stopEdit = true
        this.getItem()
      }
      var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
      })
    },
    components: {
      formInput,
      fileInput,
      dvider,
      addHeader,
      monyInput,
      checkInput,
      iconInput,
      loading,
      connectionInput,
      searchGroupInput
    }
  }

</script>
