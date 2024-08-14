<template>
    <div class="col-sm-3">
        <div class="custom-control custom-switch small-switch">
            <label for="companies_show" class="check-label">{{title}} : </label>
            <input type="checkbox" id="companies_show" @input="$emit('input', $event.target.value)" class="custom-control-input" :value="value" :checked="value">
            <label for="companies_show" class="custom-control-label"></label>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'value', 'col']
    };

</script>
