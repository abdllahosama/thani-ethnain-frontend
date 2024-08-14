<template>

  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">تغيير الحالة</h4>
            <button type="button" class="close" @click="colse()">
                <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-12">  عدد العناصر المعدلة</label>
                    <div class=" col-12">
                      <input type="text" class="form-control" disabled :value="$parent.selectedItems.length" />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-12"> الحالة </label>
                    <div class="col-12">
                      <select class="form-control" v-model="$parent.status">
                        <option v-for="value in values" :value="value.value" :key="value.value">{{value.name}}</option>
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
                      اغلاق
                  </button>
                <button @click="$parent.changeStatusAll(); loading = true;" class="btn btn-dark" v-if="!loading">
                      <i class="far fa-check"></i>
                      تعديل
                  </button>
                <button class="btn btn-dark" v-if="loading">
                      جاري التحميل  <span class="loading-s1 sm-j">.</span><span class="loading-s2 sm-j">.</span><span class="loading-s3 sm-j">.</span>
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
        loading: false,
        values: [
          { name: this.$t('orders.NewOrder'), value: 0},
          { name: this.$t('orders.BeingProcessed'), value: 1 },
          { name: this.$t('orders.readyForShipping'), value: 2 },
          { name: this.$t('orders.UnderShipping'), value: 3 },
          { name: this.$t('orders.shipped'), value: 4 },
          { name: this.$t('orders.complete'), value: 5 },
          { name: this.$t('orders.returnd'), value: 6 },
          { name: this.$t('orders.canceled'), value: 7}
        ],

      }
    },
    methods: {
      colse() {
        this.$parent.changeStatAll = null;
      }
    },
    mounted () {
      this.$parent.status = 0
    }
  }

</script>
