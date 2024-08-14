<template>
    <div class="form-group row inpt-control " :class="col != null ? col : 'col-md-6'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-2' :'col-md-4'">{{title}}</label>
        <!-- Input -->
        <div :class="col != null ? 'col-md-95' :'col-md-7'">
            <input :type="typeof type !== 'undefined'? type : 'text'" class="form-control" :class="{ 'is-invalid' : hasErorr}" :value="value? value : ''" @input="$emit('input', $event.target.value)" @change="hasErorr = false" :disabled='disabled' :maxlength="maxlength">
            <div class="invalid-feedback">
                {{error}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type', 'title', 'value', 'col', 'error', 'hasErorr', 'disabled', 'maxlength']
    };

</script>
