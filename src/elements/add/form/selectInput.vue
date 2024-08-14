<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-6'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-2' :'col-md-4'">{{title}}</label>
        <!-- Input -->
        <div :class="col != null ? 'col-md-95' :'col-md-7'">
        <select type="text" class="form-control" :class="{ 'is-invalid' : hasErorr}"   :value="value" @input="$emit('input', $event.target.value)" :disabled='disabled'>
            <template v-for="value in values">
                <option  :key="value.id" :value="value.value" v-if="typeof vaslusRole === 'undefined' || vaslusRole.length == 0 || vaslusRole.find(el => el.id == value.value)">{{value.name}}</option>
            </template>
        </select>
        <div class="invalid-feedback">
            {{error}}
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'value', 'col', 'error', 'hasErorr', 'disabled', 'values', 'vaslusRole']
    };

</script>
