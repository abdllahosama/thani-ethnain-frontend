<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-4">
          {{$t('components.pointOfSalesPrintersTable.PrinterName')}}
        </div>
        <div class="col-xl-1">
            {{$t('components.pointOfSalesPrintersTable.alert')}}
        </div>
        <div class="col-xl-2">
            {{$t('components.pointOfSalesPrintersTable.NumberOfCopies')}}
        </div>
        <div class="col-xl-4">
            {{$t('components.pointOfSalesPrintersTable.AvailableSections')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <printerItem v-for="(rowItem, index) in $parent.item.printers" :key="index" :index="index" :item="rowItem" />
    <button class="btn btn-success w-100 mb-4" @click="$parent.addPrinter()">
        <i class="fas fa-plus"></i> {{$parent.$t('components.pointOfSalesPrintersTable.addition')}}
    </button>
  </div>
</template>
<script>

  import printerItem from './printerItem.vue'
  export default {
    components: {
      printerItem
    }
  }

</script>
