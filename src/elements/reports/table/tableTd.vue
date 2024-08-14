<template>
    <td class="orders-order">
        {{before}} {{ text != null ? text : '--'}} {{after}}
    </td>
</template>
<script>
    export default {
        props: ['text', 'after', 'before']
    };

</script>
