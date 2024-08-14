<template>
    <div class="form-group row col-md-6">
        <label class="col-md-4">{{$t("groupInput." +  type + show)}}</label>
        <div class="add-input col-md-7">
            <input type="number" class="form-control" v-model="$parent.$parent.item[innerTarget][show]"  :disabled="true">
            <span>{{$option.currency}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'show', 'plaseholder', 'type', 'innerTarget']
    };

</script>
