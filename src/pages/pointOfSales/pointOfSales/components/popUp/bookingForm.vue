<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.TableReservation')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.Table')}}</label>
              <div class="col-md-12">
                <input class="form-control" v-model="fromTable" disabled />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.Observation')}}</label>
                  <div class="col-md-12">
                    <textarea class="form-control" v-model="comment"></textarea>
                  </div>
                </div>
              </div>
            </div>
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
                  @click="bookTable()"
                  class="btn btn-dark"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
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
      fromTable : "",
      comment   :"",
      showError : false
    };
  },
  methods: {
    bookTable() {
        this.$parent.aletText = "تم حجز الطاولة بنجاح"
        this.$parent.alertType = "success"
        this.$bookTable(this.$parent.options.id, this.$parent.moveTableId, this.comment)
        this.close()
    },
    close() {
      this.$parent.bookingFormShow = false;
      this.$parent.casherTableShow = true;
    },
  },
  mounted() {
    this.fromTable = this.$tables[this.$parent.options.id][this.$parent.moveTableId].name
  },
};
</script>
