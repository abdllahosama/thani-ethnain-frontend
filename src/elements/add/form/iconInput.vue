<template>
    <div class="form-group row" :class="col != null ? col : 'col-md-6'">
        <!-- Label -->
        <label :class="col != null ? 'col-md-2' :'col-md-4'">{{title}}</label>
        <!-- Input -->
        <div :class="col != null ? 'col-md-95' :'col-md-7'">
            <div class="icon-input">
                <span>
                    <i v-if="iconTtype == 'social'" :class="'fab fa-' + icon"></i>
                    <i v-if="iconTtype != 'social'" :class="'far fa-' + icon"></i>
                </span>
                <input :type="type" class="form-control" min="0" maxlength="255" :value="value" @input="$emit('input', $event.target.value)">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'value', 'col', 'icon', 'type', 'iconTtype']
    };

</script>
