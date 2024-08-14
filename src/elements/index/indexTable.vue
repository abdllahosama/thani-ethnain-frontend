<template>
    <div :class="withoutCard ? 'index-iner-table' : 'index-table'" :id="refrunseId">
    <div class="d-flex">
        <searchForm :searchText="searchText" :taxNumberSearch="taxNumberSearch" :taxNumberText="taxNumberText" :statusSearch="statusSearch" :statusValues="statusValues" v-if="searchText" class="w-100" />
        <div class=" filter-input"  v-if="statusSearch">
            <select class="form-control" v-model="params[statusModel ? statusModel : 'status']" @change="updateStat()">
                <template v-for="(value, index) in statusValues">
                <option :key="index" :value="value.value"  v-if="typeof statusRole === 'undefined' || statusRole.length == 0 || statusRole.find(el => el.id == value.value)">{{value.title}}</option>
                </template>
            </select>
        </div>
        <router-link :to="$parent.path + '/create'" class="btn add-btn" v-if="!withoutAdd && !addPopUp && !withoutCard && ($user.admin || buttonRole)">
            <i class="fas fa-plus"></i>
        </router-link>
        <button class="btn add-btn" v-if="!withoutAdd && addPopUp && !withoutCard && ($user.admin || buttonRole)" @click="showAddPopUp()">
            <i class="fas fa-plus"></i>
        </button>
    </div>
    <div  :class="withoutCard ? '' : 'card'">
        
        <div class="table-responsive">
            <table class="table table-sm table-nowrap card-table table-hover">
                <tableHeader :cloumns="cloumns" :selectAll="selectAll" />
                <loader v-if="loading == 1" />
                <tableBody :cloumns="cloumns" :emptyTableText="emptyTableText" :emptyTableSubText="emptyTableSubText" :selectAll="selectAll" :popUpMargin="popUpMargin" />
            </table>
            <div class="table-actions" v-if="selectAll">
                <i class="table-main-icon fal fa-level-up"></i>
                <span v-if="selectedItems.length">تم اختيار <strong>({{selectedItems.length}})</strong></span>
                <label class="table-options-label" for="selectAll">اختر الكل</label>
                <input class="table-checkbox" v-model="selectInput" id="selectAll" type="checkbox">
                <button class="table-select-delet btn btn-light" @click="sureDeleteAll()" :disabled="selectedItems.length == 0" v-if="$user.admin || deleteAllRole"><i class="table-delete-icon fas fa-trash"></i> حذف</button>
                <button class="table-select-delet btn btn-light" @click="sureChangeStatAll()" :disabled="selectedItems.length == 0" v-if="$user.admin || deleteAllRole"><i class="table-delete-icon fas fa-analytics"></i> الحالة</button>
            </div>
            <pagination />
        </div>
        <sureDelete v-if="delete_id != null" :deleteText="deleteText"/>
        <moveToStore v-if="move_store_id"/>
        <editStat v-if="edit_id != null"/>
        <sureDeleteAll v-if="deleteAll" :deleteText="deleteText" />
        <changeStatAll v-if="changeStatAll" />
    </div>
</div>
</template>
<script>
    import axios from 'axios'
    import Vue from 'vue'

    import tableHeader from './table/tableHeader.vue'
    import searchForm from './table/searchForm.vue'
    import tableBody from './table/tableBody.vue'
    import loader from './table/loader.vue'
    import pagination from './table/pagination.vue'
    import sureDelete from './table/sureDelete.vue'
    import moveToStore from './table/moveToStore.vue'
    import editStat from './table/editStat.vue'
    import sureDeleteAll from './table/sureDeleteAll.vue'
    import changeStatAll from './table/changeStatAll.vue'



    export default {
        data () {
            return {
                selectInput: false,
                items: [],

                awaitingSearch: false,
                delete_id: null,
                move_store_id: null,
                totalPages: 0,
                loading: 0,
                edit_id: null,
                deleteAll: false,
                changeStatAll: false,
                status: '',
                awaitingSetParam: true,
                oneIsShowne: false,

                selectedItems: [],
                mount: 0,

                params: {
                    order_type: '',
                    status: '',
                    count: ''
                },
                refrunseId: (Math.random() + 1).toString(36).substring(7)
            };
        },
        methods: {
            getItems() {
                if (this.localData) {
                    var params = this.params
                    this.params.page = this.params.page && this.params.page != null ? this.params.page : 1
                    this.$setParams(params)
                    var table = this.table ?  this.table : this.$parent.path.substring(1)
                    var items = JSON.parse(JSON.stringify(this.$database[table]))
                    var localItems = JSON.parse(JSON.stringify(this.$localDatabase[table]))
                    items = localItems.concat(items)
                    if (params.orderBy) {
                        items = items.sort(this.$dynamicSort(params))
                    }
                    var editsearch = new RegExp(this.params.search, 'i')
                    items = items.filter(el => editsearch.test(el.name) || editsearch.test(el.mobile) || editsearch.test(el.balance) || editsearch.test(el.price) || editsearch.test(el.barcode) || editsearch.test(el.code) || editsearch.test(el.cost))
                    var editsearch = new RegExp(this.params.taxNumber, 'i')
                    items = items.filter(el => editsearch.test(el.tax_number))
                    if (this.filter &&  typeof this.filter === 'object') {
                        Object.entries( this.filter).forEach(([key, value]) => {
                            items = items.filter(el => el[key] == value)
                        });
                    }
                    let count = this.params.count ? this.params.count : 15
                    let page  = this.params.page && this.params.page != null ? this.params.page : 1
                    this.totalPages = Math.ceil(items.length / count)
                    this.items = items.slice(page * count - count, page * count)
                    const accounts = ["customers", "suppliers", "accounts", "partners"];
                    if (this.$option.balance_type == 1 && accounts.includes(table) ) {
                        this.items.forEach(el => { el.balance = el.balance * -1})
                    }
                    this.initItems()
                } else {
                    this.loading = 1
                    this.totalPages = 0
                    this.items = []
                    var path = this.path ? this.path : this.$parent.path
                    this.$setParams(this.params)
                    if (localStorage.getItem(path.substring(1) + 'Cashe') !== null && !this.withoutCard) {
                        this.loading = 0
                        var data = JSON.parse(localStorage.getItem(path.substring(1) + 'Cashe'))
                        this.items = data.data
                        if (this.params.order_type  !== null && this.params.order_type !== '') {
                            this.items = this.items.filter(el => el.order_type == this.params.order_type)
                        }
                        if (this.params.status  !== null && this.params.status !== '') {
                            this.items = this.items.filter(el => el.status == this.params.status)
                        }
                        this.joinLocalData()
                        this.totalPages = data.last_page
                        this.page = data.current_page
                        this.initItems()
                    }
                    axios.get(this.$linkGnirator(path), { params: this.params }).then(response => {
                        this.items = response.data.data
                        if (!this.withoutCard) {this.joinLocalData()}
                        this.totalPages = response.data.last_page
                        this.params.page = response.data.current_page
                        this.loading = 0
                        localStorage[path.substring(1) + 'Cashe'] = JSON.stringify(response.data)
                        this.initItems()
                    })
                }
            },
            sureDelete(id) {
                this.delete_id = id
            },
            moveToStore(id) {
                this.move_store_id = id
            },
            closeMoveToStore() {
                this.move_store_id = null
            },
            sureDeleteAll() {
                this.deleteAll = true
            },
            changeStat(id) {
                this.edit_id = id
                this.status = this.items[id].status
            },
            sureChangeStatAll() {
                this.changeStatAll = true
            },
            deleteItem() {
                if (!this.items[this.delete_id].ofline) {
                    var path = this.table ?  '/' + this.table : this.$parent.path
                    if (this.deleteRoute) {path = this.deleteRoute}
                    axios
                    .post(this.$linkGnirator(path + '/' + this.items[this.delete_id].id), {
                        _method: 'DELETE'
                    })
                    .then(response => {
                        if (this.localData) {
                            var table = this.table ?  this.table : this.$parent.path.substring(1)
                            this.$updateDatabase([table])
                        } else {
                            this.getItems()
                        }
                        this.delete_id = null
                        this.$parent.$parent.model = 0
                        return response
                    })
                } else {
                    var table = this.table ?  this.table : this.$parent.path.substring(1)
                    this.$reomoveFromLocalDatabase(this.items[this.delete_id], table)
                    this.delete_id = null
                    this.$parent.$parent.model = 0
                }
            },
            doMoveStore(id) {
                axios
                .post(this.$linkGnirator('/stores/moveToStoreDirect'),{
                    from_id: this.move_store_id,
                    to_id: id
                })
                .then(response => {
                    this.move_store_id = null
                    return response
                })
            },
            joinLocalData () {
                let database = this.localDatabaseTable ? this.localDatabaseTable : this.$parent.path.substring(1)
                if (this.$localDatabase[database].length != 0) {
                    let localData = this.$localDatabase[database]
                    if (this.filter &&  typeof this.filter === 'object') {
                        Object.entries( this.filter).forEach(([key, value]) => {
                            if (key != 'count') {
                                localData = localData.filter(el => el[key] == value)
                            }
                        });
                    }
                    if (this.params.order_type !== null && this.params.order_type !== '') {
                        localData = localData.filter(el => el.order_type == this.params.order_type)
                    }
                    if (this.params.status !== null && this.params.status !== '') {
                        localData = localData.filter(el => el.status == this.params.status)
                    }
                    var localItems = JSON.parse(JSON.stringify(localData))
                    var items = localItems.concat(this.items);
                    this.items = items;
                }
            },
            deleteAllFun() {
                var path = this.table ?  '/' + this.table : this.$parent.path
                axios
                .post(this.$linkGnirator(path + '/delete/all'), {
                    _method: 'DELETE',
                    data: this.selectedItems
                })
                .then(response => {
                    this.getItems()
                    this.selectedItems = []
                    this.deleteAll = false
                    return response
                })
            },
            changeStatus() {
                var path = this.table ?  '/' + this.table : this.$parent.path
                axios
                .post(this.$linkGnirator(path + '/status/' + this.items[this.edit_id].id + '/' + this.status  ), {
                    _method: 'POST'
                })
                .then(response => {
                    this.getItems()
                    this.edit_id = null
                    return response
                })
            },
            changeStatusAll() {
                var path = this.table ?  '/' + this.table : this.$parent.path
                axios
                .post(this.$linkGnirator(path + '/status/all/' + this.status  ), {
                    _method: 'POST',
                    data: this.selectedItems
                })
                .then(response => {
                    this.getItems()
                    this.edit_id = null
                    return response
                })
            },
            toggleMobile (id) {
                var item = this.items[id] 
                item.showMobile = !item.showMobile
                Vue.set(this.items, id, item)
            },
            toggleOptions (id, event) {
                var element = document.getElementById(this.refrunseId);
                var item = this.items[id] 
                item.showOptions = !item.showOptions
                item.top = event.target.getBoundingClientRect().top - element.getBoundingClientRect().top + 20
                item.left = event.target.left
                Vue.set(this.items, id, item)
            },
            removeOptions () {
                this.items.forEach( (item, id) => {
                    item.showOptions = false
                    Vue.set(this.items, id, item)
                })
            },
            initItems () {
                this.items.forEach(item => {
                    if (item.date ) {item.date = this.$dateFormat(item.date, this.timeTable ? 'time' : '')} else {item.date = '--'}
                    if (item.created_date ) {item.created_date = this.$dateFormat(item.created_date, this.timeTable ? 'time' : '')} else {item.created_date = '--'}
                    if (item.start_date ) {item.start_date = this.$dateFormat(item.start_date, this.timeTable ? 'time' : '')} else {item.start_date = '--'}
                    if (item.end_date ) {item.end_date = this.$dateFormat(item.end_date, this.timeTable ? 'time' : '')} else {item.end_date = '--'}
                    if (item.out_date ) {item.out_date = this.$dateFormat(item.out_date, this.timeTable ? 'time' : '')} else {item.out_date = '--'}
                    if (item.total || item.total == 0) {item.total = this.$moneyFormat(item.total)}
                    if (item.price|| item.price == 0) {item.price = this.$moneyFormat(item.price)}
                    if (item.cost|| item.cost == 0) {item.cost = this.$moneyFormat(item.cost)}
                    if (item.paid || item.paid == 0) {item.paid = this.$moneyFormat(item.paid)}
                    if (item.rest || item.rest == 0) {item.rest = this.$moneyFormat(item.rest)}
                    if (item.balance || item.balance == 0) {item.balance = this.$moneyFormat(item.balance)}
                    if (item.salary || item.salary == 0) {item.salary = this.$moneyFormat(item.salary)}
                    if (item.cod || item.cod == 0) {item.cod = this.$moneyFormat(item.cod)}
                    if (item.customer_id) {
                        var customer = this.$database.customers.find(el => el.id == item.customer_id)
                        item.customer = customer;
                    }
                    if (item.supplier_id) {
                        var supplier = this.$database.suppliers.find(el => el.id == item.supplier_id)
                        item.supplier = supplier;
                    }
                    if (item.partner_id) {
                        var partner = this.$database.partners.find(el => el.id == item.partner_id)
                        item.partner = partner;
                    }
                    if (item.account_id) {
                        var account = this.$database.accounts.find(el => el.id == item.account_id)
                        item.account = account;
                    }
                    if (item.eployee_id) {
                        var partner = this.$database.partners.find(el => el.id == item.partner_id)
                        item.partner = partner;
                    }
                    if (item.employee_id) {
                        var employee = this.$database.employees.find(el => el.id == item.employee_id)
                        item.employee = employee;
                    }
                    if (item.project_id) {
                        var project = this.$database.projects.find(el => el.id == item.project_id)
                        item.project = project;
                    }
                    if (item.store_id) {
                        var store = this.$database.stores.find(el => el.id == item.store_id)
                        item.store = store;
                    }
                    if (item.safe_id) {
                        var safe = this.$database.safes.find(el => el.id == item.safe_id)
                        item.safe = safe;
                    }

                    if (item.from_store_id) {
                        var fromStore = this.$database.stores.find(el => el.id == item.from_store_id)
                        item.fromStore = fromStore;
                    }
                    if (item.to_store_id) {
                        var toStore = this.$database.stores.find(el => el.id == item.to_store_id)
                        item.toStore = toStore;
                    }

                    if (item.from_safe_id) {
                        var fromSafe = this.$database.safes.find(el => el.id == item.from_safe_id)
                        item.fromSafe = fromSafe;
                    }
                    if (item.to_safe_id) {
                        var toSafe = this.$database.safes.find(el => el.id == item.to_safe_id)
                        item.toSafe = toSafe;
                    }
                    if (item.section_id) {
                        var section = this.$database.sections.find(el => el.id == item.section_id)
                        item.section = section;
                    }
                    if (item.expense_section_id) {
                        var expenseSection = this.$database.expenseSections.find(el => el.id == item.expense_section_id)
                        item.expenseSection = expenseSection;
                    }
                    if (item.income_section_id) {
                        var incomeSection = this.$database.incomeSections.find(el => el.id == item.income_section_id)
                        item.incomeSection = incomeSection;
                    }
                    

                    if (item.from_project_id) {
                        var fromProject = this.$database.projects.find(el => el.id == item.from_project_id)
                        item.fromProject = fromProject;
                    }
                    if (item.to_project_id) {
                        var toProject = this.$database.projects.find(el => el.id == item.to_project_id)
                        item.toProject = toProject;
                    }
                    if (item.delivery_id) {
                        var delivery = this.$database.deliveries.find(el => el.id == item.delivery_id)
                        item.delivery = delivery;
                    }
                    if (item.city_id) {
                        var city = this.$database.cities.find(el => el.id == item.city_id)
                        item.city = city;
                    }

                    if (item.from_customer_id) {
                        var fromCustomer = this.$database.customers.find(el => el.id == item.from_customer_id)
                        item.fromCustomer = fromCustomer;
                    }

                    if (item.from_supplier_id) {
                        var fromSupplier = this.$database.suppliers.find(el => el.id == item.from_supplier_id)
                        item.fromSupplier = fromSupplier;
                    }

                    if (item.from_partner_id) {
                        var fromPartner = this.$database.partners.find(el => el.id == item.from_partner_id)
                        item.fromPartner = fromPartner;
                    }

                    if (item.from_account_id) {
                        var fromAccount = this.$database.accounts.find(el => el.id == item.from_account_id)
                        item.fromAccount = fromAccount;
                    }


                    if (item.to_customer_id) {
                        var toCustomer = this.$database.customers.find(el => el.id == item.to_customer_id)
                        item.toCustomer = toCustomer;
                    }

                    if (item.to_supplier_id) {
                        var toSupplier = this.$database.suppliers.find(el => el.id == item.to_supplier_id)
                        item.toSupplier = toSupplier;
                    }

                    if (item.to_partner_id) {
                        var toPartner = this.$database.partners.find(el => el.id == item.to_partner_id)
                        item.toPartner = toPartner;
                    }

                    if (item.to_account_id) {
                        var toAccount = this.$database.accounts.find(el => el.id == item.to_account_id)
                        item.toAccount = toAccount;
                    }
                    if (item.parent_id) {
                        var section = this.$database.sections.find(el => el.id == item.parent_id)
                        item.section = section;
                    }


                })
            },
            showAddPopUp() {
                this.$parent.showAddPopUp = true;
            },
            printPos (id) {
                let invoice = this.$getPosInvoice(id)
                invoice.quotationItems =  invoice.invoiceItems
                invoice.quotationItems.forEach(el => {el.product_name = el.name})
                invoice.subtotal = parseFloat(invoice.subTotal)
                this.$parent.$parent.printPointOfSale = invoice
            },
            printShippingOperation (id, ofline) {
                var fakeId = 0
                if (ofline) {
                    let shippingOperation              = this.$localDatabase.shippingOperations[id]
                    let invoice = this.$localDatabase.pointOfSalesInvoices.find(el => el.upload_key == shippingOperation.refrance_invoice)
                    fakeId = invoice.upload_key
                    this.$parent.$parent.printPointOfSale = invoice
                } else {
                    let data = JSON.parse(localStorage.getItem('pointOfSales/shippingOperations/showCashe'))
                    let items = data.data
                    let item = items.find(el => el.id == id)
                    fakeId = item.invoice.upload_key
                }
                var invoice = this.$getPosInvoice(fakeId)
                invoice.quotationItems =  invoice.invoiceItems
                invoice.quotationItems.forEach(el => {el.product_name = el.name})
                invoice.subtotal = parseFloat(invoice.subTotal)
                this.$parent.$parent.printPointOfSale = invoice
            },
            updateStat () {
                if (!this.awaitingSetParam) {
                    this.params.page = 1
                    this.getItems()
                }
            }
        },
        components: {
            loader,
            tableHeader,
            searchForm,
            tableBody,
            pagination,
            sureDelete,
            moveToStore,
            editStat,
            sureDeleteAll,
            changeStatAll
        },
        watch: {
            selectInput : function (val) {
                if (val == true) {
                    this.selectedItems = this.items.map(el => el.id);
                } else {
                    this.selectedItems = []
                }
            },
            '$database': {
                handler: function () {
                    this.getItems()
                },
                deep: true
            },
            '$localDatabase': {
                handler: function () {
                    if (this.localData) {
                        this.$updateDatabase([this.$parent.path.substring(1)])
                        this.getItems()
                    } else {
                        this.getItems()
                    }
                },
                deep: true
            },
            'params.search': function() {
                if (!this.awaitingSetParam) {
                    clearTimeout(this.awaitingSearch)
                    this.awaitingSearch = setTimeout(() => {this.params.page = 1;this.getItems()}, 400)
                }
            },
            "params.count": function () {
                if (!this.awaitingSetParam) {
                    this.params.page = 1
                    this.getItems();
                }
            },
            'params.taxNumber': function() {
                if (!this.awaitingSetParam) {
                    this.params.page = 1
                    this.getItems()
                }
            },
            'params.page': function() {
                if (!this.awaitingSetParam) {
                    this.getItems()
                }
            }
        },
         mounted() {
            if (this.localData) {
                var table = this.table ?  this.table : this.$parent.path.substring(1)
                this.$updateDatabase([table])
            }
            this.awaitingSetParam = true
            this.params = this.$getParams()
            this.params.status = this.params.status ? this.params.status : ''
            this.params.order_type = this.params.order_type ? this.params.order_type : ''
            this.params.count  = this.params.count ? this.params.count : 15
            setTimeout(() => {this.awaitingSetParam = false}, 200)
            if (!this.localData) {
                if (this.filter &&  typeof this.filter === 'object') {
                    Object.entries( this.filter).forEach(([key, value]) => {
                        this.params[key] = value
                    });
                }
            }
            this.getItems()
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
            'statusRole',
            'selectAll',
            'deleteAllRole',
            'localData',
            'filter',
            'path',
            'table',
            'buttonRole',
            'withoutAdd',
            'addPopUp',
            'localDatabaseTable',
            'timeTable',
            'deleteRoute',
            'statusModel',
            'popUpMargin'
        ]
    }

</script>
