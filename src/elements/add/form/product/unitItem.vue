<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-6">
      <label class="d-xl-none">{{$t('products.form.unit')}} </label>
      <select type="text"
             class="form-control w-100"
             :class="{ 'is-invalid' : item.productNameError}"
             v-model="item.unit_id">
             <option value="">{{$t('products.form.chooseTheUnit')}}</option>
             <optgroup :label="$t('products.form.units')">
               <option v-for="unit in $database.units" :value="unit.id" v-if="unit.id != $parent.$parent.item.unit_id">{{unit.name}}</option>
             </optgroup>
      </select>
    </div>
    <div class="col-xl-5">
      <label class="d-xl-none"> {{$t('products.form.quantity')}} </label>
      <div class="add-input">
        <input type="number" class="form-control w-100" :class="{ 'is-invalid' : item.quantityError}" placeholder="0" min="1" :max="item.maxQuantity"   v-model="item.quantity">
        <span>{{$parent.$parent.item.unit_name}}</span>
      </div>
    </div>
    <div class="col-xl-1">
      <button class="btn btn-danger" @click="deleteItem()" :disabled="$parent.$parent.item.productUnits.length <= 1" >
          <i class="far fa-trash"></i>
      </button>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        path: '/invoiceItems',
        searchProducts: {},
        noSearch: false,
        showItemsList: false,
      }
    },
    methods: {
      deleteItem() {
          this.$parent.$parent.item.productUnits.splice(this.$parent.$parent.item.productUnits.indexOf(this.item), 1)
      },
    },

    props: ['item', 'index']
  }

</script>
