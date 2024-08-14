<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.breakTheTable')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <p>{{$t('components.pointOfSalesPopUp.AreYouSureToSeparateTheTable')}}</p>
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
                  @click="splitTable()"
                  class="btn btn-dark"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.emphasis')}}
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
    };
  },
  methods: {
    splitTable() {
      var error = 0;
      if (error == 0) {
        this.$parent.aletText = this.$t('components.pointOfSalesPopUp.TableSeparatedSuccessfully');
        this.$parent.alertType = "success";
        this.$removeMargeTable(this.$parent.options.id, this.$parent.moveTableId)
        localStorage.localDatabase = JSON.stringify(this.$localDatabase);
        this.close();
      }
    },
    close() {
      this.$parent.splitTableFormShow = false;
      this.$parent.casherTableShow = true;
    },
  },
};
</script>
