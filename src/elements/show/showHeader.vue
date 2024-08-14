<template>

  <div>
    <div class="card show-header">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto">
            <a class="avatar avatar-lg">
                  <img :src="$linkGnirator('/companiesUploads/' + subdomain + '/' + $parent.path + '/' + image, true)" class="avatar-img rounded" v-if="image">
                  <div class="avatar-img rounded empty-avatar" v-if="!image">
                      <i :class="'fas fa-' + icon + ' d-block'"></i>
                  </div>
              </a>
          </div>
          <div class="col ml-n2">
            <h4 class="mb-1">
              <a>{{title}}</a>
            </h4>
            <p class="small text-muted mb-0" v-for="data in subData">
              <span>{{data.title}} :</span> <strong>{{ data.value != null ? data.value : '--'}}</strong>
            </p>
            <p class="small mb-0" v-if="stat == 1">
              <span class="text-success">●</span> {{statText}}
            </p>
            <p class="small mb-0" v-if="stat == 0">
              <span class="text-danger">●</span> {{statText}}
            </p>
          </div>
          <div class="col-auto">
            <router-link v-for="button in buttons" :to="button.link" class="btn btn-sm btn-primary" :title="button.title" v-if="button.role">
              <i :class="'fas fa-' + button.icon"></i>
            </router-link>
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
        subdomain: localStorage.getItem('subdomain'),
      }
    },
    props: ['image', 'icon', 'title', 'subData', 'stat', 'statText', 'buttons']
  }

</script>
