<template>
<div>
  <div class="row">
    <div :class="box.class" v-for="box in boxs">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="text-uppercase text-muted mb-2">
                {{box.title}}
              </h6>
              <span class="h2 mb-0">
                 {{box.value}}
              </span>
            </div>
            <div class="col-auto">
              <span :class="'h2 fa fa-' + box.icon + ' text-muted mb-0'"></span>
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
    props: ['boxs']
  }

</script>
