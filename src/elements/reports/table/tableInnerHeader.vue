<template>

  <tbody class="list">
    <tr>
      <template v-for="head in header">
            <td :colspan="head.colspan">
                <strong>{{head.value}} {{head.after}}</strong>
            </td>
        </td>
        </template>
    </tr>
  </tbody>

</template>
<script>

  export default {
    props: ['header']
  }

</script>
