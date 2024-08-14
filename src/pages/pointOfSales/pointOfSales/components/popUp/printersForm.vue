<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.AvailablePrinters')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
                  <button
                     v-for="(printer, index) in $parent.options.printers" 
                     :key="index"
                     @click="addPrinter(index)"
                     class="btn col-2 ml-2 pos-main-btn"
                     :class="$parent.selectedPrenters.indexOf(index) == -1 ? ' btn-outline-primary' : 'btn-primary'"
                     title="item.product.name"
                    >
                    {{printer.name}}
                  </button>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
                <button
                  class="btn btn-dark"
                  v-if="!loading"
                  @click="print"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.Printing')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      showError: false,
      loading: false,
      productOptions: [],
      selectedProductOptions: []
    }
  },
  methods:{
    close() {
      this.$parent.printersShow = false
    },
    print () {
        this.$parent.printersAllaw = true
        this.$parent.multiPrint()
        this.close()
    },
    addPrinter (index) {
        var check = this.$parent.selectedPrenters.indexOf(index)
        if (check == -1) {
            this.$parent.selectedPrenters.push(index)
        } else {
            this.$parent.selectedPrenters.splice(check, 1);
        }
    }
  },
  mounted () {
      this.$parent.options.printers.forEach((printer, index) => {
            if (printer.alert != 1) {
                this.addPrinter(index)
            }
        })
  }
};
</script>