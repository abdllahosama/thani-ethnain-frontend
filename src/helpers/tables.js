import Vue from 'vue'

const tables = Vue.observable({ tables: {} });

Object.defineProperty(Vue.prototype, '$tables', {
    get() { return tables.tables; },
    set(value) { tables.tables = value; }
});

let tabls = localStorage.getItem('tables') !== null ? JSON.parse(localStorage.getItem('tables')) : {}
Vue.set(Vue.prototype, '$tables', tabls)

Vue.prototype.$intPosTables = function (id) {
    let tabls = localStorage.getItem('tables') !== null ? JSON.parse(localStorage.getItem('tables')) : {}
    if (tabls[id] === 'undefined' || tabls[id] == null) {
        tabls[id] = []
    }
    var pos = Vue.prototype.$database.pointOfSales.find(el => el.id == id)
    if (pos) {
        // add tables to pos
        if (pos.hall_allow && Array.isArray(pos.hall_tables)) {
            var casher = pos.hall_tables.find((el) => el.id == 0);
            if (!casher) {
                pos.hall_tables.unshift({
                    id: 0,
                    name: "",
                    priceList_id: pos.priceList_id,
                });
            }
        }
        pos.hall_tables.forEach((el, index) => {
            if (tabls[id][index] === 'undefined' || tabls[id][index] == null) {
                tabls[id][index] = {
                    name: el.name,
                    item: {
                        customer_id: 0,
                        customer: {
                        id: "",
                        name: "",
                        phone: "",
                        address:""
                        },
                        edit: null,
                        edit_text: "",
                        invoiceItems: [],
                        delivery: null,
                        delivery_id: 0,
                        delivery_name: "",
                        
                        notes: "",

                        subtotal: 0,
                        tax: 0,
                        discount: 0,
                        service: 0,
                        total: 0,
                        cost: 0,
                        earning: 0,
                        paid: null,
                        rest: 0,
                        cash: '',
                        totalWithShipping: 0,

                        priceList_id: tabls[id] == 0 ? pos.priceList_id : el.priceList_id,

                        marketer_id: 0,
                        payment_method: "",
                        totalDiscount: '',
                        shipping: 0,
                        order_type: tabls[id] == 0 ? 0 : 2,
                        printedCheck: false,
                        awaitPay: false
                    },
                    printedCheck: false,
                    book: false,
                    bookComment: '',
                    margeId: null,
                    addedName: []
                }
            }
        })
    }

    localStorage.tables = JSON.stringify(tabls)
    Vue.set(Vue.prototype, '$tables', tabls)
}

Vue.prototype.$saveTable = function (item, id, index) {
    var tabls  = Vue.prototype.$tables
    if (tabls[id] && tabls[id][index]) {
        tabls[id][index].item = item
        localStorage.tables = JSON.stringify(tabls)
        Vue.set(Vue.prototype, '$tables', tabls)
    }
}
Vue.prototype.$bookTable = function (id, index, data) {
    var tabls  = Vue.prototype.$tables
    tabls[id][index].book = true
    tabls[id][index].bookComment = data
    localStorage.tables = JSON.stringify(tabls)
    Vue.set(Vue.prototype, '$tables', tabls)
}
Vue.prototype.$removeBookTable = function (id, index) {
    var tabls  = Vue.prototype.$tables
    tabls[id][index].book = false
    tabls[id][index].bookComment = ''
    localStorage.tables = JSON.stringify(tabls)
    Vue.set(Vue.prototype, '$tables', tabls)
}

Vue.prototype.$getTable = function (id, index) {
    var tabls  = Vue.prototype.$tables
    if (tabls[id]) {
        return tabls[id][index];
    }
}

Vue.prototype.$margeTable = function (id, to, from) {
    var tabls  = Vue.prototype.$tables
    tabls[id][to].margeId = from
    tabls[id][from].addedName.push(tabls[id][to].name)
    localStorage.tables = JSON.stringify(tabls)
    Vue.set(Vue.prototype, '$tables', tabls)


}

Vue.prototype.$removeMargeTable = function (id, index) {
    var tabls  = Vue.prototype.$tables
    tabls[id][index].addedName = []
    tabls[id].forEach(table => {
        if (table.margeId == index) {
            table.margeId = null
        }
    });
    localStorage.tables = JSON.stringify(tabls)
    Vue.set(Vue.prototype, '$tables', tabls)
}