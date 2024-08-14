<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered big-model">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.heights')}} </h4>
          </div>
          <div class="card-body">
            <div class="row" v-if="$parent.options.hall_allow">
              <template v-for="(table, index) in $tables[$route.params.id]">
                <div
                    class="col-md-2 col-6 mb-3"
                    :key="index"
                    v-if="!table.margeId"
                >
                    <casherTable :table="table" :index="index"></casherTable>
                </div>
              </template>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <button class="btn btn-outline-danger" @click="colse()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
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
import casherTable from "../show/casherTable.vue"
export default {
  methods: {
    colse() {
      this.$parent.casherTableShow = false;
    },
  },
  components: {
      casherTable
  }


};
</script>
