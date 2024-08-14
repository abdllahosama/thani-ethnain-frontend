<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.mergeTable')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">

            <div class="form-group row">
              <label class="col-sm-12"> {{$t('components.pointOfSalesPopUp.baseTable')}}</label>
              <div class="col-md-12">
                  <input
                  class="form-control"
                  v-model="fromTable"
                  disabled
                  />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.subTable')}} </label>
              <div class="col-md-12">
                  <select
                  class="form-control"
                  v-model="toTable"
                  :class="{ 'is-invalid' : errors.toTable}"
                  >
                  <option value="">{{$t('components.pointOfSalesPopUp.ChooseATable')}}</option>
                  <template v-for="(table, index) in $tables[$parent.options.id]">
                    <option  :key="index" :value="index" v-if="
                      index != 0 &&
                      index != $parent.moveTableId &&
                      $tables[$parent.options.id][index].item.invoiceItems.length == 0 &&
                      $tables[$parent.options.id][index].margeId == null &&
                      $tables[$parent.options.id][index].addedName.length == 0
                    ">{{table.name}}</option>
                  </template>
                  </select>
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
                  @click="margeTable()"
                  class="btn btn-dark"
                  v-if="!loading"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
                </button>
                <button class="btn btn-dark" v-if="loading">
                  {{$t('components.pointOfSalesPopUp.Download')}} <span class="loading-s1 sm-j">.</span
                  ><span class="loading-s2 sm-j">.</span
                  ><span class="loading-s3 sm-j">.</span>
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
      fromTable: "",
      toTable: "",
      items: [],

      errors: {
        toTable: false
      },

      showError: false,
      loading: false,

    }
  },
  methods:{
    margeTable () {
      var error = 0
      if (typeof this.toTable === 'undefined' || this.toTable == '') {
        error = 1
        this.errors.toTable = true
      }
      if (!error) {
        this.$parent.aletText = "تم دمج الطاولة بنجاح";
        this.$parent.alertType = "success";
        this.$margeTable(this.$parent.options.id, this.toTable, this.$parent.moveTableId)
        this.close()
      }
    },
    close() {
      this.$parent.margeFormShow = false
      this.$parent.casherTableShow = true;
    }
  },
  mounted() {
      this.fromTable = this.$tables[this.$parent.options.id][this.$parent.moveTableId].name

  },
};
</script>