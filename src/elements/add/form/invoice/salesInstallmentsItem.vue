<template>
  <div class="row pt-4 quotation-item mb-3 pb-3">

    <div class="col-xl-6">
      <label class="d-xl-none">{{$t('salesInstallments.form.paymentsDate')}}</label>
      <div class="add-input table-add-input">
        <VueCtkDateTimePicker
          :label="$t('salesInstallments.form.choosePaymentDate')"
          :button-now-translation="$t('salesInstallments.form.Now')"
          v-model="item.date"
          format="YYYY-MM-DD hh:mm a"
          color="#631263"
          button-color="#631263"
        />
      </div>
    </div>
    <div class="col-xl-5">
      <label class="d-xl-none"> {{$t('salesInstallments.form.cost')}} </label>
      <div class="add-input table-add-input">
        <input
          type="number"
          class="form-control w-100"
          :class="{ 'is-invalid': item.priceError }"
          placeholder="0"
          v-model="item.total"
        />
        <span>{{ $parent.$option.currency }}</span>
      </div>
    </div>
    
    <div class="col-xl-1">
      <button
        class="btn btn-danger"
        @click="deleteItem()"
        :disabled="$parent.$parent.item.salesInstallmentItems.length <= 1"
      >
        <i class="far fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/invoiceItems",
      searchProducts: {},
      noSearch: false,
      showItemsList: false,
    };
  },
  methods: {
    deleteItem() {
      this.$parent.$parent.item.salesInstallmentItems.splice(
        this.$parent.$parent.item.salesInstallmentItems.indexOf(this.item),
        1
      );
    },
  },
  props: ["item", "index"],
  components: {
    VueCtkDateTimePicker
  }
};
</script>
