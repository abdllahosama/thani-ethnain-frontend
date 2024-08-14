<template>
    <td class="orders-order">
        <strong class="mobile-title"><i v-if="icon" :class="'fas fa-' + icon"></i>{{title}}</strong>
        <!-- Badge -->
        <div class="badge badge-success" v-if="text == 1">
            فعال
        </div>

        <div class="badge badge-danger" v-if="text == 0">
            غير فعال
        </div>
    </td>
</template>
<script>
    export default {
        props: ['text', 'title', 'icon']
    };

</script>
