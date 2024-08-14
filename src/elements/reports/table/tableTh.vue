<template>
    <th>
        <span class="text-muted" :class="sort!= null ? 'list-sort' : ''" @click="sort!= null ? changeOrder(sort) : ''">
            {{text}}
        </span>
    </th>
</template>
<script>
    export default {
        props: ['text', 'sort'],
        methods: {
          changeOrder(name) {
              this.$parent.$parent.$parent.params.page = 1;
              if (this.$parent.$parent.$parent.params.orderType == 'asc' && this.$parent.$parent.$parent.params.orderBy == name) {
                  this.$parent.$parent.$parent.params.orderType = 'desc';
              } else {
                  this.$parent.$parent.$parent.params.orderType = 'asc';
              }
              this.$parent.$parent.$parent.params.orderBy = name;
              this.$parent.$parent.$parent.getItems();
          }
        }
    };
</script>
