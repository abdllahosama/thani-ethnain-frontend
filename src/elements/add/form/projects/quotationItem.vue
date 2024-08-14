<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-5">
      <label class="d-xl-none"> {{$t('projects.form.outputName')}} </label>
      <div class="search-container">
        <div>
          <input type="text"
                 class="form-control w-100"
                 autocomplete="off"
                 :placeholder="$t('projects.form.outputName')"
                 v-model="item.name">
        </div>
      </div>
    </div>
    <div class="col-xl-6">
      <textarea class="form-control w-100"
                :placeholder="$t('projects.form.outputDescription')"
                v-model="item.description"></textarea>
    </div>
    
    <div class="col-xl-1">
        <button class="btn btn-danger" @click="deleteItem()" :disabled="$parent.$parent.item.projectItems.length <= 1">
            <i class="far fa-trash"></i>
        </button>
      </div>
    </div>

</template>
<script>

  export default {
    data() {
      return {
  
      }
    },
    methods: {
      deleteItem() {
        this.$parent.$parent.item.projectItems.splice(this.$parent.$parent.item.projectItems.indexOf(this.item), 1)
      },
    },
    props: ['item', 'index']
  }

</script>
