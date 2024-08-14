<template>
  <div class="modal fade show cash-form">
    <div class="modal-dialog modal-dialog-centered big-model">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.orderDetails')}}</h4>
          </div>
          <div class="card-body">
            <div class="row" v-if="$parent.options.change_customer">
              <customerSearchInput class="col-6" :id="!$parent.options.show_rest ? 'cashInput' : ''" />
              <phoneInput class="col-6" />
            </div>
            <hr v-if="$parent.options.show_rest"/>
            <div class="row" v-if="$parent.options.show_rest">
              <div class="col-6">
                <div class="form-group row">
                  <label class="col-sm-3"> {{$t('components.pointOfSalesPopUp.total')}}</label>
                  <div class="col-md-7 add-input ">
                      <input type="number" disabled class="form-control" v-model="$parent.item.total">
                      <span>{{$option.currency}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group row">
                  <label class="col-sm-3"> {{$t('components.pointOfSalesPopUp.cash')}}</label>
                  <div class="col-md-7 add-input ">
                      <input type="number" class="form-control" v-model="$parent.item.cash" id="cashInput" autofocus>
                      <span>{{$option.currency}}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group row">
                  <label class="col-sm-3"> {{$t('components.pointOfSalesPopUp.rest')}}</label>
                  <div class="col-md-7 add-input ">
                      <input type="number" disabled class="form-control" :value="$parent.item.cash ? $parent.item.cash - $parent.item.total : 0">
                      <span>{{$option.currency}}</span>
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
  mounted () {
    document.getElementById("cashInput").focus();
  },
  methods: {
    checkOut() {
      this.$parent.checkOut();
      this.$parent.cashFormShow = false;
    },
    close() {
      this.$parent.cashFormShow = false;
    },
  },
  components: {
    customerSearchInput,
    phoneInput
  }
};
</script>
