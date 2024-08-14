<template>
    <div class="container-fluid alert-container">
        <div class="alert alert-dismissible fade show" :class="'alert-' + type" role="alert">
            <i class="fas fa-check" v-if="type == 'success'"></i>
            <i class="fas fa-times" v-if="type == 'danger'"></i>
            <strong>{{text}}</strong>
            <!-- Button -->
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>

        </div>
    </div>
</template>
<script>
    export default {
      props: ['text', 'type']  
    };
</script>