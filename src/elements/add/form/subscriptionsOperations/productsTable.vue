<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-4">
          {{$t('subscriptionsOperations.form.Subscription')}}
        </div>
        <div class="col-xl-3">
          <div class="row">
            <div :class="'col-xl-6'">
              {{$t('invoices.form.Quantity')}}
            </div>
            <div class="col-xl-6">
              {{$t('invoices.form.price')}}
            </div>
          </div>
        </div>
        <div class="col-xl-2">
          {{$t('subscriptionsOperations.form.taxAndDiscount')}}
        </div>
        <div class="col-xl-3">
          <div class="row">
            <div class="col-xl-3" v-html="$t('invoices.form.subTotal')">

            </div>
            <div class="col-xl-3">
              {{$t('invoices.form.theAverage')}}
            </div>
            <div class="col-xl-3">
              {{$t('invoices.form.Total')}}
            </div>
            <div class="col-xl-3"></div>
          </div>
        </div>
      </div>
    </div>
    <quotationItem v-for="(rowItem, index) in $parent.item.quotationItems" :key="index" :index="index" :item="rowItem"></quotationItem>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addQuotationItem()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>

</template>
<script>

  import quotationItem from './quotationItem.vue'
  export default {
    data(){
      return{
        filteredItems: [],
      }
    },
    mounted () {
      this.filteredItems = this.$database.subscriptions
    },
    components: {
      quotationItem
    }
  }

</script>
