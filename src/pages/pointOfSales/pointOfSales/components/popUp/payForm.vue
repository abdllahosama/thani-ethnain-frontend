<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.batchAdd')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <customerNameInput class="form-group row" />
              </div>
              <div class="col-12">
                <div class="form-group row">
                  <label class="col-sm-12"> {{$t('components.pointOfSalesPopUp.balance')}} </label>
                  <div class="icon-input col-md-12">
                    <span>
                      <i class="far fa-dollar-sign"></i>
                    </span>
                    <input
                      type="number"
                      class="form-control"
                      v-model="item.customer.balance"
                      disabled="disabled"
                      @keyup="calculateTotal()"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group row" >
                  <label class="col-sm-12"> {{$t('components.pointOfSalesPopUp.ReceivedAmount')}} </label>
                  <div class="icon-input col-md-12">
                    <span>
                      <i class="far fa-dollar-sign"></i>
                    </span>
                    <input
                      type="number"
                      class="form-control"
                      v-model="item.cost"
                      :class="{ 'is-invalid' : errors.cost}"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12"> {{$t('components.pointOfSalesPopUp.notes')}} </label>
                  <div class="col-md-12">
                    <textarea class="form-control" v-model="notes"></textarea>
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
                <button
                  @click="createَSalary()"
                  class="btn btn-dark"
                  v-if="!loading"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
                </button>
                <button class="btn btn-dark" v-if="loading">
                  {{$t('components.pointOfSalesPopUp.Download')}} <span class="loading-s1 sm-j">.</span
                  ><span class="loading-s2 sm-j">.</span
                  ><span class="loading-s3 sm-j">.</span>
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
import axios from "axios";
import customerNameInput from "./customerNameInput.vue";

export default {
  data() {
    return {
      notes: "",

      item: {
        invoice_group: this.$option.expense_invoice_group_id,
        point_of_sale_id: this.$parent.options.id,
        session_number: this.$parent.options.session_number,
        safe_id: this.$parent.options.safe_id,
        client_type: 0,
        customer_id: "",
        customer: {
          name: "",
          balance: 0,
        },
        cost: "",
        payment_fee_id: [],
        date: new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10)
      },

      errors: {
        date: false,
        cost: false,
      },

      showError: false,
      loading: false,
    };
  },
  methods: {
    createَSalary() {
      var error = 0
      if (typeof this.item.customer_id === 'undefined' || this.item.customer_id == '') {
        error = 1
        this.errors.name = true
      }
      if (typeof this.item.cost === 'undefined' || this.item.cost == '' || this.item.cost == 0) {
        error = 1
        this.errors.cost = true
      }
      if (error == 0) {
        this.$parent.aletText = this.$t('components.pointOfSalesPopUp.PaymentAddedSuccessfully')
        this.$parent.alertType = 'success'
        var key = new Date().getTime().toString() + Math.floor(Math.random() * 999)
        this.item.ofline = true
        this.item.upload_key = key
        this.item.old_balance = this.item.customer.balance
        this.item.new_balance = this.item.old_balance - 0 + (this.item.cost - 0)
        this.$localDatabase.salesPayments.unshift(this.item)
        this.$parent.options.balance = this.$parent.options.balance - 0  + (this.item.cost - 0)
        localStorage.localDatabase = JSON.stringify(this.$localDatabase)


        var customer = this.$database.customers.find(el => el.id == this.item.customer_id)
        if (customer) {
          customer.balance = this.item.new_balance
        }

        var safe = this.$database.safes.find(el => el.id == this.item.safe_id)
        safe.balance = safe.balance - 0 + (this.item.cost - 0)
        localStorage.database = JSON.stringify(this.$database)
        this.$parent.$parent.uploadLocalDatabase()
        this.close();
      }
    },
    close() {
      this.$parent.payFormShow = false;
    },
  },
  mounted() {

  },
  components: {
    customerNameInput,
  },
};
</script>
