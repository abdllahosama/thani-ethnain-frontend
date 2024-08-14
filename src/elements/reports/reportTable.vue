<template>

    <div :class="withoutCard ? '' : 'card'">
        <div class="table-responsive">
            <table class="table table-sm table-nowrap card-table table-hover">
                <tableHeader :cloumns="cloumns" :selectAll="selectAll" />
                <loader v-if="$parent.loading == 1" />
                <tableInnerHeader :header="header" v-if="$parent.items.length != 0 && $parent.loading == 0" />
                <tableBody :cloumns="cloumns" :emptyTableText="emptyTableText" :emptyTableSubText="emptyTableSubText" :selectAll="selectAll" />
                <tablefooter :footer="footer" v-if="$parent.items.length != 0 && $parent.loading == 0" />
            </table>
            <p class="tafqeet-style text-center" v-if="typeof tafqeet != undefined &&  tafqeet != null && tafqeet != ''">{{tafqeet}}</p>
        </div>
    </div>

</template>
<script>
    import tableHeader from './table/tableHeader.vue'
    import tableInnerHeader from './table/tableInnerHeader.vue'
    import tableBody from './table/tableBody.vue'
    import tablefooter from './table/tablefooter.vue'
    import loader from './table/loader.vue'


    export default {
        components: {
            loader,
            tableHeader,
            tableInnerHeader,
            tableBody,
            tablefooter
        },
        props: [
            'searchText',
            'withoutCard',
            'taxNumberSearch',
            'taxNumberText',
            'header',
            'emptyTableText',
            'emptyTableSubText',
            'cloumns',
            'footer',
            'deleteText',
            'statusSearch',
            'statusValues',
            'selectAll',
            'deleteAllRole',
            'localData',
            'filter',
            'tafqeet'
        ]
    }

</script>
