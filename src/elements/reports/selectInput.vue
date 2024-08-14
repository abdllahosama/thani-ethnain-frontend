<template>
  <div>
    <div class="form-group">
      <label>{{title}}</label>
      <select class="form-control"  @input="$emit('input', $event.target.value)">
        <option value="">{{plaseholder}}</option>
        <option  v-for="value in values" :key="value.id" :value="value.value">{{value.name}}</option>
      </select>
    </div>
  </div>

</template>
<script>

  export default {
    props: ['title', 'plaseholder', 'values'],
  }

</script>
