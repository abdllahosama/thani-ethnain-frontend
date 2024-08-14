<template>
    <div class="modal fade show">
      <div class="modal-dialog modal-dialog-centered big-model">
        <div class="modal-content">
          <div class="modal-card card">
            <div class="card-header">
              <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.orderDetails')}}</h4>
            </div>
            <div class="card-body">
              <div class="row" v-if="$parent.options.change_customer">
                <customerSearchInput class="col-6" />
                <phoneInput class="col-6" />
              </div>
              <hr/>
              <div class="row" >
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-md-3">عنوان الشحن</label>
                    <div class="col-md-7">
                      <select class="form-control" v-model="$parent.shippingOperation.shipping_address_id">
                        <option value="0">اختر عنوان</option>
                        <option v-for="(shippingAddress, index) in $database.shippingAddresses.filter(el => el.customer_id == $parent.item.customer_id)" :value="shippingAddress.id" :key="index">{{shippingAddress.address1}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">العنوان</label>
                    <div class="col-md-7">
                      <input class="form-control" v-model="$parent.shippingOperation.address1"  maxlength="200">
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">التكملة</label>
                    <div class="col-md-7">
                      <input class="form-control" v-model="$parent.shippingOperation.address2" maxlength="200">
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">الطابق</label>
                    <div class="col-md-7">
                      <input class="form-control" v-model="$parent.shippingOperation.floor" maxlength="200">
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">الشقة</label>
                    <div class="col-md-7">
                      <input class="form-control" v-model="$parent.shippingOperation.flat" maxlength="200">
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">رقم الهاتف</label>
                    <div class="col-md-7">
                      <input class="form-control" v-model="$parent.shippingOperation.mobile" maxlength="200">
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">المدينة</label>
                    <div class="col-md-7">
                      <select class="form-control" v-model="$parent.shippingOperation.city_id">
                        <option value="0">اختر مدينة</option>
                        <option :value="city.id" v-for="(city, index) in $database.cities" :key="index">{{city.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">{{$t('pointOfSales.show.delivery')}}</label>
                    <div class="col-md-7">
                      <input
                      type="number"
                      v-model="$parent.shippingOperation.cost"
                      class="form-control"
                      maxlength="10"
                    />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label class="col-sm-3">{{$t('components.pointOfSalesShow.shippingRepresentative')}}</label>
                    <div class="col-md-7">
                      <select class="form-control m-w-50" v-model="$parent.shippingOperation.delivery_id">
                      <option value="0">{{$t('components.pointOfSalesShow.ChooseTheDelegate')}}</option>
                      <optgroup :label="$t('components.pointOfSalesShow.freightForwarders')">
                        <option v-for="(delivery, index) in $database.deliveries" :value="delivery.id" :key="index">{{ delivery.name }}</option>
                      </optgroup>
                    </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="card-footer card-footer-boxed">
              <div class="row align-items-center justify-content-between">
                <div class="col-auto"></div>
                <div class="col-auto">
                  <button class="btn btn-outline-danger" @click="close()">
                    <i class="far fa-times"></i>
                    {{$t('components.pointOfSalesPopUp.Close')}}
                  </button>
                  <button
                    @click="checkOut()"
                    class="btn btn-dark"
                  >
                    <i class="far fa-save"></i>
                    {{$t('components.pointOfSalesPopUp.emphasis')}}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import customerSearchInput from "../inputs/customerSearchInput.vue";
  import phoneInput from "../inputs/phoneInput.vue";
  
  export default {
    data() {
      return {
      };
    },
    methods: {
      checkOut() {
        this.$parent.saveTable()
        this.$parent.calculateTotal()
        this.$parent.shippingOperationShow = false;
      },
      close() {
        this.$parent.calculateTotal()
        this.$parent.shippingOperationShow = false;
      }
    },
    watch: {
      '$parent.item.customer_id': function (val) {
        let shippingAddresses = this.$database.shippingAddresses.filter(el => el.customer_id == val)
        if (shippingAddresses.length > 0) {
          this.$parent.shippingOperation.shipping_address_id = shippingAddresses[0].id
        }
      },
      '$parent.shippingOperation.delivery_id': function (val) {
        this.$parent.shippingOperation.delivery = this.$database.deliveries.find(el => el.id == val)
      },
      '$parent.shippingOperation.city_id': function (val) {
        if (val) {
          this.$parent.shippingOperation.cost = this.$database.cities.find(el => el.id == val).price
        } else {
          this.$parent.shippingOperation.cost = ""
        }
      },
      '$parent.shippingOperation.shipping_address_id': function (val){
        if (val) {
          let shippingAdress = this.$database.shippingAddresses.find(el => el.id == val)
          if (shippingAdress) {
            this.$parent.shippingOperation.address1 = shippingAdress.address1
            this.$parent.shippingOperation.address2 = shippingAdress.address2
            this.$parent.shippingOperation.floor = shippingAdress.floor
            this.$parent.shippingOperation.flat = shippingAdress.flat
            this.$parent.shippingOperation.mobile = shippingAdress.mobile
            this.$parent.shippingOperation.city_id = shippingAdress.city_id
            if (shippingAdress.city_id) {
              let city = this.$database.cities.find(el => el.id == shippingAdress.city_id)
              if (city) {
                this.$parent.shippingOperation.cost = city.price
              } else {
                this.$parent.shippingOperation.cost = ""
              }
            } else {
              this.$parent.shippingOperation.cost = ""
            }
          } else {
            this.$parent.shippingOperation.address1 = ""
            this.$parent.shippingOperation.address2 = ""
            this.$parent.shippingOperation.floor = ""
            this.$parent.shippingOperation.flat = ""
            this.$parent.shippingOperation.mobile = ""
            this.$parent.shippingOperation.city_id = 0
            this.$parent.shippingOperation.cost = ""
          }
        }
      }
    },
    components: {
      customerSearchInput,
      phoneInput
    }
  };
  </script>
  