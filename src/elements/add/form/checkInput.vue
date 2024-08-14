<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-6'">
        <label :class="col != null ? 'col-2' :'col-4'">{{title}}</label>
        <div :class="col != null ? 'col-95' :'col-7'">
            <div class="custom-control custom-switch">
                <input type="checkbox" :id="randid" :checked="value == 1" class="custom-control-input" @change="changevalue()">
                <label :for="randid" class="custom-control-label"></label>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                randid: Math.random().toString(36).substring(7)
            }
        },
        props: ['title', 'value', 'col'],
        methods: {
            changevalue() {
                if (this.value == 1) {
                    this.$emit("input", 0);
                } else if (this.value == 0) {
                    this.$emit("input", 1);
                }
            }
        }
    };

</script>
