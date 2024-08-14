<template>
    <div :class="innerInputs.length == 1 ? 'col-md-6 row ' : 'col-12'">
        <div class="row" v-if="innerInputs.length > 1">
            <template v-for="(input, index) in innerInputs">
                <searchInput
                    v-if="!input.moany"
                    :key="index"
                    class="col-md-3"
                    :type="type"
                    :values="values"
                    :title="input.title"
                    :show="input.show"
                    :close="index == 0 ? true : false" 
                    :innerModel="innerModel"
                    :innerType="innerType"
                    :innerTarget="innerTarget"
                    :database="database"
                />
                <monyGroupInput
                    v-if="input.moany"
                    :key="index"
                    :type="type"
                    :title="input.title"
                    :show="input.show"
                    :innerTarget="innerTarget"
                />
            </template>
        </div>
        <template v-if="innerInputs.length == 1">
            <template v-for="(input, index) in innerInputs" >
                <searchInput
                    v-if="!input.moany"
                    :key="index"
                    :type="type"
                    :values="values"
                    :title="input.title"
                    :show="input.show"
                    :close="index == 0 ? true : false" 
                    :innerModel="innerModel"
                    :innerType="innerType"
                    :innerTarget="innerTarget"
                    :withoutGroup="true"
                />
            </template>
        </template>
    </div>
</template>
<script>
  import searchInput from './searchInput.vue'
  import monyGroupInput from './monyGroupInput.vue'
  export default {
    data() {
        return {
            innerInputs: [],
            innerType : '',
            innerModel: '',
            innerTarget: ''
        }
    },
    methods: {
        updateInner () {
            if (!this.inputs || this.inputs == 'null' || this.inputs.length == 0 ) {
                this.innerInputs = [
                    {title: 'اسم العميل', show: 'name'},
                    {title: 'الرصيد' , show: 'balance', moany: true}
                ];
            } else {
                this.innerInputs = this.inputs
            }
        }
    },
    mounted () {
        this.updateInner()
        this.innerModel = this.model ? this.model + '_id' : this.type + '_id'
        this.innerType = this.model ? this.model + 's' : this.type + 's'
        this.innerTarget = this.model ? this.model : this.type
    },
    watch: {
        'inputs': function () {
            this.updateInner()
        },
        'type': function () {
            this.innerModel = this.model ? this.model + '_id' : this.type + '_id'
            this.innerType = this.model ? this.model + 's' : this.type + 's'
            this.innerTarget = this.model ? this.model : this.type
        },
        'model': function () {
            this.innerModel = this.model ? this.model + '_id' : this.type + '_id'
            this.innerType = this.model ? this.model + 's' : this.type + 's'
            this.innerTarget = this.model ? this.model : this.type
        }
    },
    props: ['type', 'values', 'inputs', 'model', 'database'],
    components: {searchInput, monyGroupInput}
  }
</script>