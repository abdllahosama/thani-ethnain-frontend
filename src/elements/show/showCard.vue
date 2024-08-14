<template>

  <div >
    <div class="card show-card" :class="active ? 'active': ''" @click="toggleBody">

      <div class="card-header">
        <h4 class="card-header-title">
          {{title}}
        </h4>
      </div>

      <div class="card-body">
        <div class="row">

          <div class="col-sm-6">
            <div class="list-group list-group-flush list-group-activity my-n3">
              <div class="list-group-item"  v-for="item in cloumns.firstCloum">
                <div class="row">
                  <div class="col-auto">
                    <div class="avatar avatar-sm">
                      <div class="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary">
                        <i :class="'far fa-' + item.icon"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col ml-n2">
                    <h5 class="mb-1">
                      {{item.title}}
                    </h5>
                    <p class="small text-gray-700 mb-0">
                      <router-link  :to="'/' + item.to + 's/' + item.value.id" v-if="item.type == 'link' && item.value && item.link" >{{item.value.name}}</router-link>
                      {{item.type == 'link' && item.value && !item.link ? item.value.name : ''}}
                      {{item.type != 'link' ? item.value : ''}}
                      {{!item.value ? '--' : ''}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="list-group list-group-flush list-group-activity my-n3">
              <div class="list-group-item" v-for="item in cloumns.scondCloum">
                <div class="row">
                  <div class="col-auto">
                    <div class="avatar avatar-sm">
                      <div class="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary">
                        <i :class="'far fa-' + item.icon"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col ml-n2">
                    <h5 class="mb-1">
                      {{item.title}}
                    </h5>
                    <p class="small text-gray-700 mb-0">
                      <router-link  :to="'/' + item.to + 's/' + item.value.id" v-if="item.type == 'link' && item.value && item.link" >{{item.value.name}}</router-link>
                      {{item.type == 'link' && item.value && !item.link ? item.value.name : ''}}
                      {{item.type != 'link' ? item.value : ''}}
                      {{!item.value ? '--' : ''}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12" v-for="paragraph in paragraphs">
            <hr>
            <h3>{{paragraph.title}}</h3>
            <p>{{paragraph.value}}</p>
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
          active: false
        }
      },
      methods: {
        toggleBody () {
          this.active = !this.active
        }
      },
      props: ['title', 'cloumns', 'paragraphs'],
    };
</script>
