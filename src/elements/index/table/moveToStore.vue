<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header" style="background: none ">
            <h4 class="card-header-title">نقل الي مخزن</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <connectionInput
                title="المخزن المنقول الية المنتحات "
                v-model="store"
                :values="$database.stores.filter(el => el.id != $parent.move_store_id)"
              />
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="colse()">
                  <i class="far fa-times"></i>
                  اغلاق
                </button>
                <button
                  @click="changeStatus()"
                  class="btn btn-dark"
                  v-if="!loading"
                >
                  <i class="far fa-check"></i>
                  نقل
                </button>
                <button class="btn btn-dark" v-if="loading">
                  جاري التحميل <span class="loading-s1 sm-j">.</span
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
  import connectionInput from "@/elements/add/form/connectionInput.vue";
  export default {
    data() {
      return {
        loading: false,
        store: null
      }
    },
    methods: {
      colse() {
        this.$parent.move_store_id = null;
      },
      changeStatus() {
        this.$parent.doMoveStore(this.store);
        this.loading = true;
      }
    },
    components: {
      connectionInput,
    },
  }

</script>