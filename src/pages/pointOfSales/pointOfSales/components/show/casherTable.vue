<template>
  <div class="table-btn" 
  :class="{ 
          'btn-empty': table.item.invoiceItems.length == 0,
          'btn-pepole': table.item.invoiceItems.length > 0 && !table.item.awaitPay,
          'btn-selecterd': index == $parent.$parent.selectedTable,
          'btn-money': table.item.invoiceItems.length > 0 && table.item.awaitPay}"
          >
    <button
      class="btn w-100"
      @click="openTable(index)"
    >
      <p class="table-name">
        {{ table.name }}
        <span v-if="index != 0 && !(!table.addedName)">
        <template v-for="name in this.$tables[this.$parent.$parent.options.id][index].addedName">
        +
        {{ name }}
        </template>
        </span>
      </p>
      <p
       v-if="table.item.invoiceItems.length > 0 && !table.item.awaitPay"
       class="empty-text"
      > 
      <img src="accounting/img/table-busy.png" class="table-img">
      </p>
      <p v-if="index == 0 && table.item.invoiceItems.length == 0">بيع</p>
      <p v-if="index != 0 && table.item.invoiceItems.length > 0 && table.item.awaitPay">بانتظار الدفع</p>
      <p v-if="index != 0 && !(table.book) && table.item.invoiceItems.length == 0">فارغ</p>
      <p v-if="index != 0 && (table.book) && table.item.invoiceItems.length == 0">محجوز</p>
    </button>
      <i 
      class="fas fa-arrows table-edit-btn" 
      @click="moveTable(index)" 
      v-if="
          table.item.invoiceItems.length > 0 &&
          index != 0 "></i>

       <i 
        class="far fa-lock table-edit-btn" 
        @click="showBookingForm(index)"
        v-if="
        index != 0 &&

        !(table.item.invoiceItems.length > 0 ) &&

        !(table.book) 
          
          "></i>

        <i 
        class="far fa-object-group table-edit-btn-right" 
        @click="margeForm(index)"
         v-if="
        index != 0 && !(table.book) "></i>

          <i 
        class="far fa-object-ungroup table-edit-btn-right-buttom" 
        @click="splitTableForm(index)"
         v-if="
        index != 0 &&
      !(!table.addedName.length != 0) && 

      !(table.book) &&

      !(table.item.invoiceItems.length > 0 ) 
          "></i>


  </div>
</template>
<script>
export default {
  methods: {
    openTable(id) {
      if (!this.$tables[this.$parent.$parent.options.id][id].book) {
        this.$parent.$parent.saveTable()
        var data = this.$getTable(this.$parent.$parent.options.id, id);

        this.$parent.$parent.selectedTable = id
        this.$parent.$parent.item = data.item;
        this.$parent.$parent.item.priceList_id = this.$parent.$parent.selectedTable == 0 ? this.$parent.$parent.options.priceList_id : this.$parent.$parent.options.hall_tables[this.$parent.$parent.selectedTable].priceList_id;
        this.$parent.$parent.addedName = data.addedName
        this.$parent.$parent.calculateTotal();
        this.$parent.$parent.selectedSecton = this.$parent.$parent.options.sections ? this.$parent.$parent.options.sections[0].id: null;
        this.$parent.$parent.sectionItems = this.$parent.$parent.filteredProducts.filter((el) => el.section_id == this.$parent.$parent.selectedSecton);
        this.$parent.$parent.casherTableShow = false;
        this.$parent.$parent.changeProductsPrice()
      } else {
        this.showRemoveBookingForm(id)
      }
    },
    moveTable(id) {
      this.$parent.$parent.moveFormShow = true
      this.$parent.$parent.moveTableId = id
      this.$parent.$parent.casherTableShow = false;
    },
    showBookingForm(id) {
      this.$parent.$parent.bookingFormShow = true;
      this.$parent.$parent.moveTableId = id
      this.$parent.$parent.casherTableShow = false;
    },
    showRemoveBookingForm(id) {
      this.$parent.$parent.removeBookingFormShow = true;
      this.$parent.$parent.moveTableId = id
      this.$parent.$parent.casherTableShow = false;
    },
    margeForm(id) {
      this.$parent.$parent.margeFormShow = true
      this.$parent.$parent.moveTableId = id
      this.$parent.$parent.casherTableShow = false;
    },
    splitTableForm(id) {
      this.$parent.$parent.splitTableFormShow = true
      this.$parent.$parent.moveTableId = id
      this.$parent.$parent.casherTableShow = false;
    }
  },
  props: ["table", "index"],
};
</script>
