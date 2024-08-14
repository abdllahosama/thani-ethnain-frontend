<template>

  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{$t('components.pointOfSalesShow.newSession')}}
            </h4>
            <button type="button" class="close" @click="colse()">
                <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12">
                      {{$t('components.pointOfSalesShow.pointOfSale')}}
                  </label>
                  <div class="icon-input col-md-12">
                    <span>
                        <i class="far fa-cash-register"></i>
                    </span>
                    <input type="text" disabled class="form-control" v-model="pointOfSaleName">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                      <label class="col-sm-12">
                          {{$t('components.pointOfSalesShow.withdrawnTreasury')}}
                      </label>
                      <div class="icon-input col-md-12">
                          <span>
                              <i class="far fa-treasure-chest"></i>
                          </span>
                          <input type="text" disabled class="form-control" v-model="safeName">
                      </div>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="form-group row">
                      <label class="col-sm-12">
                          {{$t('components.pointOfSalesShow.discountedAmount')}}
                      </label>
                      <div class="icon-input col-md-12">
                          <span>
                              <i class="far fa-dollar-sign"></i>
                          </span>
                          <input type="number" :class="{ 'is-invalid' : errors.balance}" class="form-control" v-model="move.balance">
                      </div>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="form-group row">
                      <label class="col-sm-12">
                          {{$t('components.pointOfSalesShow.notes')}}
                      </label>
                      <div class="col-md-12">
                          <textarea class="form-control" v-model="move.notes"></textarea>
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
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="colse()">
                    <i class="far fa-times"></i>
                    {{$parent.$t('components.pointOfSalesShow.colse')}}
                </button>
                <button @click="createَMove()" class="btn btn-dark" v-if="!loading">
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

  import axios from 'axios'

  export default {
    data() {
      return {
        pointOfSaleName: '',
        safeName: '',
        move: {
            safe_id : '',
            balance : ''
        },
        errors: {
            to_id : false,
            balance: false
        },
        id: this.$parent.changePointOfSale,
        loading: false
      }
    },
    methods: {
      createَMove() {
          this.loading = true
          axios.post(this.$linkGnirator('/pointofsales/' + this.id + '/newSession'), this.move).then(response => {
            this.$updateDatabase(['pointOfSales'])
            this.$parent.$parent.aletText = this.$t('components.pointOfSalesShow.ANewSessionHasBeenStartedSuccessfully')
            this.$parent.$parent.alertType = 'success'
            this.colse()
            this.loading = false

            localStorage.setItem("orderNumber", 0);
            return response
          })
      },
      colse() {
        this.$parent.changePointOfSale = false
      }
    },
    mounted() {
      var pointOfSale = this.$database.pointOfSales.find(el => el.id == this.id)
      this.pointOfSaleName = pointOfSale.name

      var safe = this.$database.safes.find(el => el.id == pointOfSale.safe_id)
      this.safeName = safe.name
      this.move.safe_id = safe.id
      this.move.balance = pointOfSale.balance
    }
  }

</script>
