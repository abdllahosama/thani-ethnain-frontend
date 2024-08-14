<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-6'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-2' :'col-md-4'">{{title}}</label>
        <!-- Input -->
        <div :class="col != null ? 'col-md-95' :'col-md-7'">
            <select class="form-control" :value="value" @input="$emit('input', $event.target.value)" :class="{ 'is-invalid' : hasErorr}" :multiple="typeof multiple !== 'undefined'? true : false"  :disabled='disabled'>
                <option value="0">لا يوجد</option>
                <option value="add" v-if="hasAdd">[+] أضافة</option>
                <optgroup :label="group">
                    <option v-for="value in values" :key="value.id" :value="value.id" v-if="value.id != except">{{value.name}} {{value.balance ? '(' + value.balance + ' ' + $option.currency + ')' : "" }}</option>
                </optgroup>
            </select>
            <div class="invalid-feedback">
                {{error}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'group', 'values', 'value', 'col', 'error', 'hasErorr', 'hasAdd', 'open', 'multiple', 'disabled', 'except'],
        watch: {
            value: function() {
                if (this.value == 'add') {
                    this.$parent.$parent.model = 1;
                    //this.value = 0;
                    this.$parent.model = this.open;
                }
            }
        }
    };

</script>
