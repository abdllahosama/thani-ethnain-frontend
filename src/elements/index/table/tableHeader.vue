<template>

  <thead>
    <tr>
      <th v-if="selectAll"></th>
      <template v-for="cloumn in cloumns">
        <tableTh :text="cloumn.title" :sort="cloumn.sort ? cloumn.column : null" v-if="!cloumn.disable" :class="cloumn.supData ? 'sup_data' : ''"></tableTh>
      </template>
    </tr>
  </thead>

</template>
<script>

  import tableTh from './tableTh.vue'

  export default {
    components: { tableTh },
    props: ['cloumns', 'selectAll']
  }

</script>
