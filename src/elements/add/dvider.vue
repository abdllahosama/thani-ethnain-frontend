<template>
    <div class="col-12">
        <hr v-if="!noLine">
        <!-- Label -->
        <label class="mb-1">{{title}}</label>
        <!-- Text -->
        <small class="form-text text-muted">{{description}}</small>
    </div>
</template>
<script>
    export default {
        props: ['title', 'description', 'noLine']
    };
</script>