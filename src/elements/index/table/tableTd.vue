<template>
    <td class="orders-order">
        <strong class="mobile-title"><i v-if="icon" :class="'fas fa-' + icon"></i>{{title}}</strong>
        {{before}} {{ text != null ? text : '--'}} {{after}}
    </td>
</template>
<script>
    export default {
        props: ['text', 'after', 'before', 'title', 'icon']
    };

</script>
