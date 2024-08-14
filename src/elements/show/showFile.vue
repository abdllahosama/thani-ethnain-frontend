<template>
    <div class="card" v-if="$parent.item.file">
        <div class="card-header">
            <h4 class="card-header-title">
                {{$t('quotations.show.opreationFile')}}
            </h4>
        </div>
        <div class="card-body">
            <img :src="$linkGnirator('/companiesUploads/' + subdomain + '/files/' + $parent.item.file, true)" style="width: 100%;"/>
            <!-- <a :href="$linkGnirator('/companiesUploads/' + subdomain + '/files/' + $parent.item.file, true)" download><i class="fas fa-file"></i> {{$parent.item.file}} </a> -->
        </div>
    </div>
</template>
<script>

  export default {
    data() {
      return {
        subdomain: localStorage.getItem('subdomain'),
      }
    }
  }

</script>