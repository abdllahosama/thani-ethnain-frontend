<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.addANote')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">

            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.productName')}}</label>
              <div class="col-md-12">
                  <input type="text" class="form-control" v-model="productName" disabled>
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
                  @click="addComment()"
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
      comment: "",
      productName: ""
    }
  },
  methods:{
    addComment () {
      this.$parent.aletText = "تم إضافة التعليق بنجاح";
      this.$parent.alertType = "success";
      this.$parent.item.invoiceItems[this.$parent.selectedProduct].comment = this.comment
      this.close()
    },
    close() {
      this.$parent.productCommentFormShow = false
    },
  },
  mounted () {
    this.productName = this.$parent.item.invoiceItems[this.$parent.selectedProduct].name
    this.comment = this.$parent.item.invoiceItems[this.$parent.selectedProduct].comment
  }
};
</script>