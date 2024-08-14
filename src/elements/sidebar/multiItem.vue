<template>
  <li class="nav-item">
    <a
      class="nav-link"
      role="button"
      data-toggle="collapse"
      :aria-expanded="!showItem ? 'false' : 'true'"
      @click="toggleItem"
    >
      <i :class="icon"></i> {{headname}}
    </a>
    <div class="collapse" :class="{ show: showItem }">
      <ul class="nav nav-sm flex-column">
        <template v-for="(item, index) in items">
          <li class="nav-item" v-if="item.role && item.name != 'devider'" :key="index">
            <router-link :to="item.link" class="nav-link">
                {{item.name}}
            </router-link>
          </li>
          <li class="nav-item" v-if="item.role && item.name == 'devider'" :key="index">
            <a class="nav-link">
              <hr class="navbar-divider my-3 w-100" />
            </a>
          </li>
        </template>
      </ul>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      showItem: false,
    };
  },
  methods: {
    toggleItem() {
      this.showItem = !this.showItem;
    },
  },
  props: ["icon", "headname", "items"],
};
</script>
