<template>





  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
          {{$t('components.pointOfSalesHallTable.tableName')}}
        </div>
        <div class="col-xl-5">
            {{$t('components.pointOfSalesHallitem.ListOfPrices')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <hallItem v-for="(rowItem, index) in $parent.item.hall_tables" :key="index" :index="index" :item="rowItem" />
    <button class="btn btn-success w-100 mb-4" @click="$parent.addTable()">
        <i class="fas fa-plus"></i> {{$t('components.pointOfSalesHallTable.addition')}}
    </button>
  </div>
</template>
<script>

  import hallItem from './hallItem.vue'
  export default {
    components: {
      hallItem
    }
  }

</script>
