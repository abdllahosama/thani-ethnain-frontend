<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <!-- Avatar -->
                                <a class="avatar avatar-lg">
                                    <div class="avatar-img rounded empty-avatar">
                                        <i class="fas fa-usd-square d-block"></i>
                                    </div>
                                </a>
                            </div>
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{item.name}}</a>
                                </h4>
                                <p class="small text-muted mb-1">
                                    <span>{{$t('customers.show.id')}} :</span> <strong># {{item.id}}</strong>
                                </p>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id+'/edit'" class="btn btn-sm btn-primary d-none d-md-inline-block">
                                    {{$t('customers.show.edit')}}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap card-table table-hover">
                            <thead>
                                <tr>
                                    <tableTh :text="'#'" :sort="'refrance'"></tableTh>
                                    <tableTh :text="$t('incomes.incomeDate')" :sort="'date'"></tableTh>
                                    <tableTh :text="$t('incomes.thatsAbout')" :sort="'description'"></tableTh>
                                    <tableTh :text="$t('incomes.note')" :sort="'notes'"></tableTh>
                                    <tableTh :text="$t('incomes.amount')" :sort="'cost'"></tableTh>
                                    <tableTh :text="$t('incomes.settings')"></tableTh>
                                </tr>
                            </thead>
                            <loader v-if="loading == 1"></loader>
                            <tbody class="list">
                                <emptyTable v-if="items.length == 0 && loading == 0" :text="$t('incomes.thereAreNoIncomes')"></emptyTable>
                                <tr v-for="(item, index) in items" :key="item.id">
                                    <tableTd :text="item.refrance"></tableTd>
                                    <tableTd :text="item.date"></tableTd>
                                    <tableTd :text="item.description"></tableTd>
                                    <tableTd :text="item.notes"></tableTd>
                                    <tableTd :text="item.cost" :after="$option.currency"></tableTd>
                                    <td class="text-right edit-td">
                                        <router-link :to="'/incomes/'+items[index].id" class="btn btn-light">
                                            <i class="fas fa-search"></i>
                                        </router-link>
                                        <router-link :to="'/incomes/'+items[index].id+'/edit'" class="btn btn-light" v-if="$user.admin || $user.role.incomes_edit">
                                            <i class="fas fa-edit"></i>
                                        </router-link>
                                        <a @click="sureDelete(index)" class="btn btn-light" v-if="$user.admin || $user.role.incomes_delete">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination></pagination>
                    </div>
                </div>
            </div>
        </div>
        <sureDelete v-if="delete_id != null"></sureDelete>
    </div>
</template>
<script>
    import axios from 'axios';
    
    import loader from '@/elements/index/loader.vue';
    import pagination from '@/elements/index/pagination.vue';
    import emptyTable from '@/elements/index/emptyTable.vue';
    import sureDelete from '@/elements/index/sureDelete.vue';
    import tableTh from '@/elements/index/table/tableTh.vue';
    import tableTd from '@/elements/index/table/tableTd.vue';
    export default {
        data() {
            return {
                path: '/incomeSections',
                loaded: false,
                item: {},
                items: [],
                search: '',
                awaitingSearch: false,
                orderBy: '',
                orderType: '',

                delete_id: null,

                totalPages: 0,
                currentPage: 1,
                loading: 1,
            }
        },
        mounted() {
            this.getitem();
        },
        methods: {
            getitem() {
                axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id), {
                        params: {
                            orderBy: this.orderBy,
                            orderType: this.orderType,
                            search: this.search,
                            page: this.currentPage
                        }
                    })
                    .then(response => {
                        this.item = response.data;
                        this.items = this.item.incomes.data;
                        this.totalPages = this.item.incomes.last_page;
                        this.page = this.item.incomes.current_page;
                        this.loaded = true;
                        this.loading = 0;
                    });
            },
            getItems () {
              this.getitem();
            },
            sureDelete(id) {
                this.delete_id = id;
                this.$parent.model = 1;
            },
            deleteItem() {
                axios.post(this.$linkGnirator('/incomes/' + this.items[this.delete_id].id), {
                        _method: 'DELETE'
                    })
                    .then(response => {
                        this.getitem();
                        this.delete_id = null;
                        this.$parent.model = 0;
                        return response;
                    });
            },
        },
        components: {
            loader,
            pagination,
            emptyTable,
            sureDelete,
            tableTh,
            tableTd,
        }
    };

</script>
<style>
</style>
