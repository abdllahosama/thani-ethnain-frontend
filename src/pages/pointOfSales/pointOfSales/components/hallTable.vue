<template>
  <tr>
    <td>
      <input
        type="text"
        class="form-control m-w-200"
        placeholder="$t('components.pointOfSalesShow.tableName')"
        v-model="item.name"
      />
    </td>
    <td>
      <select
        type="text"
        class="form-control m-w-200"
        v-model="item.priceList_id"
      >
        <option value="">{{$t('components.pointOfSalesShow.ThereIsNo')}}</option>
        <optgroup label="$t('components.pointOfSalesShow.PriceLists')">
          <option
            :value="priceList.id"
            v-for="priceList in $database.priceLists"
            :key="priceList.id"
          >
            {{ priceList.name }}
          </option>
        </optgroup>
      </select>
    </td>
    <td class="with-padding">
      <button class="btn btn-danger" @click="deleteItem()">
        <i class="far fa-trash"></i>
      </button>
    </td>
  </tr>
</template>
<script>
export default {
  methods: {
    deleteItem() {
      this.$parent.item.hall_tables.splice(
        this.$parent.item.hall_tables.indexOf(this.item),
        1
      );
    },
  },
  props: ["item", "index"],
};
</script>
