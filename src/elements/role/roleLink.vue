<template>
    <router-link :to="to">
        <div class="btn-overview">
          <i :class="'icon-report far fa-' + icon"></i>
          <h4 class="title-overview">{{title}}</h4>
          <p class="p-overview">{{text}}</p>
        </div>
      </router-link>
</template>
<script>
export default {
    props: ["to", "icon", "title", "text"]
}
</script>