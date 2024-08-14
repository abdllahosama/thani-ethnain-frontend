<template>
    <div>
        <!-- Header -->
        <h2 class="mb-3 mt-3">
            {{title}}
        </h2>

        <!-- Title -->
        <p class="text-muted">
            {{description}}
        </p>
    </div>
</template>
<script>
    export default {
        props: ['title', 'description']
    };

</script>
