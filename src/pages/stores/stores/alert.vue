<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
              <indexHeader :title="$t('stores.alert.StoresAlerts')"
                           :description="$t('stores.alert.fromHereYouCanSeeTheProductsAreAboutToRunOut')"/>
               <indexTable :searchText="$t('stores.alert.SearchForAStore')"
                           :emptyTableText="$t('stores.alert.thereAreNoAlerts')"
                           :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                           :cloumns="[
                           {column: 'product_id',    title:$t('stores.alert.productName')   ,type: 'link', to:'product', sort: true, link: true},
                           {column: 'stores',        title:$t('stores.alert.storeName')           ,type: 'text'},
                           {column: 'quantity',      title:$t('stores.alert.quantity')      ,type: 'text', sort: true },
                           {column: 'min_quantity',  title:$t('stores.alert.lessAmount')    ,type: 'text', sort: true },
                           {value: $t('stores.alert.attention'), title:$t('stores.alert.situation') ,type: 'outText' },
                           {value: $t('stores.alert.belowTheLowerBoundOrZero'), title:$t('stores.alert.attention') ,type: 'outText' },

                         ]" />
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    import indexHeader from '@/elements/index/indexHeader.vue';
    import indexTable from '@/elements/index/indexTable.vue';

    export default {
        data() {
            return {
                path: '/productalerts',
                items: [],

                totalPages: 0,
                loading: 0,

                params: {},
            }
        },
        methods: {
            getItems() {
                this.loading = 1;
                this.totalPages = 0;
                this.items = [];
                axios
                    .get(this.$linkGnirator(this.path), {params: this.params})
                    .then(response => {
                        this.items = response.data.data;
                        this.totalPages = response.data.last_page;
                        this.page = response.data.current_page;
                        this.loading = 0;
                        localStorage.storesAlertsCashe = JSON.stringify(response.data);
                    });
            },
            sureDelete(id) {
                this.delete_id = id;
                this.$parent.model = 1;
            },
            deleteItem() {
                axios.post(this.$linkGnirator(this.path + '/' + this.items[this.delete_id].id), {
                        _method: 'DELETE'
                    })
                    .then(response => {
                        this.getItems();
                        this.delete_id = null;
                        this.$parent.model = 0;
                        return response;
                    });
            }
        },
        mounted() {
            this.getItems();
            if (localStorage.getItem('storesAlertsCashe') !== null) {
                this.loading = 0;
                var data = JSON.parse(localStorage.getItem('storesAlertsCashe'));
                this.items = data.data;
                this.totalPages = data.last_page;
                this.page = data.current_page;
            }
        },
        components: {
          indexHeader,
          indexTable
        }

    };

</script>
