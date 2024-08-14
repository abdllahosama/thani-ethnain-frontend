<template>

  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{$t('components.pointOfSalesShow.pilotModification')}}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12">
                      {{$t('components.pointOfSalesShow.ChosenPilot')}}
                  </label>
                  <div class="icon-input col-md-12">
                    <span>
                        <i class="far fa-truck"></i>
                    </span>
                    <select class="form-control" v-model="move.delivery_id" :class="{ 'is-invalid' : errors.delivery_id}" @change="errors.delivery_id = false">
                        <option value="">{{$t('components.pointOfSalesShow.ChooseThePilot')}}</option>
                        <option  v-for="delivery in $deliveries[$route.params.id]" :value="delivery.id" :key="delivery.id">{{delivery.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto">
              </div>
              <div class="col-auto">
                <button class="btn btn-outline-danger" @click="colse()">
                    <i class="far fa-times"></i>
                    {{$parent.$t('components.pointOfSalesShow.colse')}}
                </button>
                <button @click="createMove()" class="btn btn-dark" v-if="!loading">
                    <i class="far fa-save"></i>
                    {{$parent.$t('components.pointOfSalesShow.create')}}
                </button>
                <button class="btn btn-dark" v-if="loading">
                    {{$parent.$t('allerts.loading')}} <span class="loading-s1 sm-j">.</span><span class="loading-s2 sm-j">.</span><span class="loading-s3 sm-j">.</span>
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
        move: {
          id: this.$parent.changeShippingOperation,
          delivery_id: '',
          out_date: Math.floor(Date.now() / 1000)
        },
        errors: {
          delivery_id: false
        },

        showError: false,
        loading: false,
        filterdDelivries: []
      }
    },
    methods: {
      createMove() {
        var error = 0
        if (typeof this.move.delivery_id === 'undefined' || this.move.delivery_id == '') {
          error = 1
          this.errors.delivery_id = true
        }
        if (error == 0) {
          this.$parent.$parent.aletText = 'تم تعديل المندوب بنجاح'
          this.$parent.$parent.alertType = 'success'
          var fakeId = 0
          if (this.ofline) {
            let shippingOperation = this.$localDatabase.shippingOperations[this.$parent.changeShippingOperation]
            shippingOperation.delivery_id = this.move.delivery_id
            shippingOperation.status      = 1
            shippingOperation.delivery    = this.$database.deliveries.find(el => el.id == this.move.delivery_id)
            shippingOperation.out_date    = Math.floor(Date.now() / 1000)
            this.$sendToOrder(this.$route.params.id, this.move.delivery_id)
            let invoice = this.$localDatabase.pointOfSalesInvoices.find(el => el.upload_key == shippingOperation.refrance_invoice)
            fakeId = invoice.upload_key
            this.$saveLocalDatabase()
            
          } else {
            let data = JSON.parse(localStorage.getItem('pointOfSales/shippingOperations/showCashe'))
            let items = data.data
            let item = items.find(el => el.id == this.move.id)
            item.delivery = this.$database.deliveries.find(el => el.id == this.move.delivery_id)
            item.out_date = Math.floor(Date.now() / 1000)
            item.status      = 1
            localStorage.setItem('pointOfSales/shippingOperations/showCashe', JSON.stringify(data))
            fakeId = item.invoice.upload_key
            this.$sendToOrder(this.$route.params.id, this.move.delivery_id)
            this.move.out_date = Math.floor(Date.now() / 1000)
            this.$parent.reload += 1;
            this.$addToLocalDatabase(this.move, 'updateDeliveries');
          }
          var invoice = this.$getPosInvoice(fakeId)
          invoice.quotationItems =  invoice.invoiceItems
          invoice.quotationItems.forEach(el => {el.product_name = el.name})
          invoice.subtotal = parseFloat(invoice.subTotal)
          this.$parent.$parent.printPointOfSale = invoice

          this.colse()
        }
      },
      colse() {
        this.$parent.changeShippingOperation = null
      }
    },
    mounted() {
      this.$updateDatabase(['deliveries'])
      this.filterdDelivries = this.$database.deliveries.filter(el => JSON.parse(this.$database.pointOfSales.find(el => el.id == this.$route.params.id).delivery_id).includes(el.id))
    },
    props: ["ofline"]
  }

</script>
