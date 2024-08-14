<template>

  <tbody class="list">
    <tr>
      <template v-for="foot in footer">
          <td :colspan="foot.colspan" :class="foot.supData ? 'sup_data' : ''" v-if="!foot.disable">
              <strong>{{foot.value}} {{foot.after}}</strong>
          </td>
      </td>
      </template>
    </tr>
  </tbody>

</template>
<script>


  export default {
    props: ['footer']
  }

</script>
