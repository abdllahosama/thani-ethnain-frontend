<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-4">
      <label class="d-xl-none">{{$t('components.pointOfSalesPrinterItem.PrinterName')}} </label>
      <input
        type="text"
        class="form-control w-100"
        :placeholder="$t('components.pointOfSalesPrinterItem.PrinterName')"
        v-model="item.name"
      />
    </div>
    <div class="col-xl-1">
      <label class="d-xl-none"> {{$t('components.pointOfSalesPrinterItem.alert')}} </label>
      <input
        type="text"
        class="form-control w-100"
        :placeholder="$t('components.pointOfSalesPrinterItem.NumberOfCopies')"
        v-model="item.alert"
      />
    </div>
    <div class="col-xl-2">
      <label class="d-xl-none"> {{$t('components.pointOfSalesPrinterItem.NumberOfCopies')}} </label>
      <input
        type="text"
        class="form-control w-100"
        :placeholder="$t('components.pointOfSalesPrinterItem.NumberOfCopies')"
        v-model="item.copies"
      />
    </div>

    <div class="col-xl-5">
      <label class="d-xl-none">{{$t('components.pointOfSalesPrinterItem.SelectedSections')}}</label>
      <multiselect
        v-model="selectedSections"
        :options="$parent.$parent.filterdSections"
        input-class="form-control w-100"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        :placeholder="$t('components.pointOfSalesPrinterItem.ChooseDepartment')"
        label="name"
        track-by="name"
        :hide-selected="true"
      />
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
    data() {
      return {
        path: '/invoiceItems',
        searchProducts: {},
        noSearch: false,
        showItemsList: false,
        selectedSections: [],
      }
    },
    methods: {
      deleteItem() {
          this.$parent.$parent.item.printers.splice(this.$parent.$parent.item.printers.indexOf(this.item), 1)
      },
      changeSections() {
          var sections = JSON.parse(JSON.stringify(this.$database.sections));
          sections.push({ id: 0, name: "غير مصنف" });

          this.filterdSections = sections;
        },
    },
    mounted() {
      if (Array.isArray(this.item.sections)) {
        this.item.sections.forEach((id) => {
          var section = this.$database.sections.find((el) => el.id == id);

          if (section) {
            this.selectedSections.push(section);
          }
          if (id == 0) {
            this.selectedSections.push({
              id: 0,
              name: 'غير مصنف'
            });
          }
        });
      }
    },
    watch: {
      "$database.sections": function () {
        this.changeSections();
      },
      selectedSections: function (val) {
        this.item.sections = val.map((el) => el.id);
      },
    },
    props: ['item', 'index']
  }

</script>
