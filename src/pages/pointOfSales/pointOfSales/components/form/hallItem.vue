<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-6">
      <label class="d-xl-none">{{$t('components.pointOfSalesHallitem.tableName')}}</label>
      <input
        type="text"
        class="form-control w-100"
        :placeholder="$t('components.pointOfSalesHallitem.tableName')"
        v-model="item.name"
      />
    </div>
    <div class="col-xl-5">
      <label class="d-xl-none"> {{$t('components.pointOfSalesHallitem.ListOfPrices')}} </label>
      <select type="text"
             class="form-control w-100"
             v-model="item.priceList_id">
             <option value="0">{{$t('components.pointOfSalesHallitem.chooseAList')}}</option>
             <optgroup :label="$t('components.pointOfSalesHallitem.PriceLists')">
               <option v-for="priceList in $database.priceLists" :value="priceList.id" >{{priceList.name}}</option>
             </optgroup>
      </select>
    </div>

    <div class="col-xl-1">
      <button class="btn btn-danger" @click="deleteItem()" >
          <i class="far fa-trash"></i>
      </button>
    </div>
  </div>

</template>
<script>

  export default {
    methods: {
      deleteItem() {
          this.$parent.$parent.item.hall_tables.splice(this.$parent.$parent.item.hall_tables.indexOf(this.item), 1)
      },
    },

    props: ['item', 'index']
  }

</script>
