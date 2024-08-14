<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-5">
            {{$t('projects.form.theResulting')}}
        </div>
        <div class="col-xl-6">
          {{$t('projects.form.theDescription')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <quotationItem v-for="(rowItem, index) in $parent.item.projectItems" :key="index" :index="index" :item="rowItem"></quotationItem>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addQuotationItem()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>

</template>
<script>

  import quotationItem from './quotationItem.vue'
  export default {
    
    components: {
      quotationItem,
    }
  }

</script>
