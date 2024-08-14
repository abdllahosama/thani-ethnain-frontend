<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-12'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-4' :'col-md-2'">{{title}}</label>
        <!-- Input -->
        <div :class="col != null ? 'col-md-7' :'col-md-95'">
            <textarea type="text" class="form-control" maxlength="65000" :value="value" @input="$emit('input', $event.target.value)"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'value', 'col']
    };

</script>
