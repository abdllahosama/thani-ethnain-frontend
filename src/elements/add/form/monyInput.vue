<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-6'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-2' :'col-md-4'">{{title}}</label>
        <!-- Input -->
        <div class="add-input" :class="col != null ? 'col-md-95' :'col-md-7'">
            <input type="number" class="form-control" :class="{ 'is-invalid' : hasErorr}" min="0" :value="value" @change="hasErorr = false" @keyup="fixNumbers" @input="$emit('input', $event.target.value)"  :disabled='disabled'>
            <span>{{$option.currency}}</span>
        </div>
        <div class="invalid-feedback d-block" v-if="hasErorr">
            {{error}}
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            fixNumbers () {
                let arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
                var str = this.value
                if(typeof this.value === 'string')
                {
                    for(var i=0; i<10; i++)
                    {
                     str = str.replace(arabicNumbers[i], i);
                    }
                }
                this.$emit("input", str);
            }
        },
        props: ['title', 'value', 'col', 'error', 'hasErorr', 'disabled']
    };

</script>
