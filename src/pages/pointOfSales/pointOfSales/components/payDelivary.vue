<template>

  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{$t('components.pointOfSalesShow.payTheBill')}}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <p>{{$t('components.pointOfSalesShow.areYouSurYouHaveReceivedTheAmount')}}</p>
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
                    {{$parent.$t('components.pointOfSalesShow.confirm')}}
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

  import axios from 'axios'

  export default {
    data() {
      return {
        move: {
          id: this.$parent.payShippingOperation
        },

        showError: false,
        loading: false
      }
    },
    methods: {
      createMove() {
        var error = 0
        if (error == 0) {
          this.$parent.$parent.aletText = 'تم استلام المبلغ بنجاح'
          this.$parent.$parent.alertType = 'success'
          if (this.ofline) {
            let shippingOperation = this.$localDatabase.shippingOperations[this.$parent.payShippingOperation]
            shippingOperation.status    = 2
            this.$saveLocalDatabase()
            this.colse()
          } else {
            let data = JSON.parse(localStorage.getItem('pointOfSales/shippingOperations/showCashe'))
            let items = data.data
            let item = items.find(el => el.id == this.move.id)
            item.status    = 2
            localStorage.setItem('pointOfSales/shippingOperations/showCashe', JSON.stringify(data))
            this.$parent.reload += 1;
            this.$addToLocalDatabase(this.move, 'resiveMonies');
          }
          this.colse()
        }
      },
      colse() {
        this.$parent.payShippingOperation = null
      }
    },
    props: ["ofline"]
  }

</script>
