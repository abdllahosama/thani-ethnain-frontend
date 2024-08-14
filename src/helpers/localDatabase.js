import Vue from 'vue'
import axios from 'axios'

var tables = [
    'customers',
    'suppliers',
    'accounts',
    'partners',
    'projects',
    'safes',
    'capitals',
    'stores',
    'products',
    'subscriptions',
    'materials',
    'pickupLocations',
    'quotations',
    'invoices',
    'bills',
    'saleReturns',
    'purchaseReturns',
    'orders',
    'purchaseOrders',
    'salesPayments',
    'purchasePayments',
    'salesCheques',
    'purchaseCheques',
    'salesInstallments',
    'salesInstallmentsPayments',
    'purchaseInstallments',
    'salesDiscounts',
    'purchaseDiscounts',
    'expenses',
    'incomes',
    'projects',
    'safesDeposits',
    'safesWithdrawals',
    'safesTransfers',
    'storesDeposits',
    'storesWithdrawals',
    'storesTransfers',
    'projectsDeposits',
    'projectsWithdrawals',
    'projectsTransfers',
    'partnersDeposits',
    'partnersWithdrawals',
    'partnersSettlements',
    'partnersProfits',
    'employeesSalaries',
    'employeesIncentives',
    'employeesDeductions',
    'employeesWithdrawals',
    'pointOfSales',
    'endorsements',
    'deposits',
    'accountsDeposits',
    'accountsWithdrawals',
    'paymentMethods',
    'paymentFees',
    'expenseSections',
    'incomeSections',
    'taxes',
    'discounts',
    'invoiceGroups',
    'sections',
    'units',
    'deliveries',
    'cities',
    'shippingAddresses',
    'marketers',
    'priceLists',
    'details',
    'productOptions',
    'employees',
    'manufacturingModels',
    'manufacturingOperations',
    'manufacturingDeposits',
    'manufacturingWithdrawals',
    'pointOfSalesInvoices',
    'shippingOperations',
    'pointOfSalestables',
    'printQueue',
    'multiInvoice',
    'updateDeliveries',
    'resiveMonies',
    'signatures',
    'invoiceStatus',
    'sectionsAccounts',
    'accountsTransfers',
    'unitsCoefficients'
  ]
const localDatabase = Vue.observable({ localDatabase: {} });

Object.defineProperty(Vue.prototype, '$localDatabase', {
    get() { return localDatabase.localDatabase; },
    set(value) { localDatabase.localDatabase = value; }
});
try {
  let localDatabas = localStorage.getItem('localDatabase') !== null ? JSON.parse(localStorage.getItem('localDatabase')) : {}
  tables.forEach(table => {
    if (typeof localDatabas[table] === 'undefined') {
      localDatabas[table] = []
    }
  })
  localStorage.setItem('localDatabase', JSON.stringify(localDatabas));
  Vue.set(Vue.prototype, '$localDatabase', localDatabas)
} catch (e) {}


let stopUpload = false
let stopPrinterUpload = false

Vue.prototype.$uploadLocalDatabase = function() {
    if (stopUpload == false && navigator.onLine) {
      try {
        tables.forEach(table => {
          if (Vue.prototype.$localDatabase[table].length != 0 && table != 'pointOfSalestables' && table != 'multiInvoice') {
            stopUpload = true
            if (table == 'pointOfSalesInvoices') {
              axios
                .post(this.$linkGnirator('/pointofsales/checkout/allinvoices'), { data: Vue.prototype.$localDatabase.pointOfSalesInvoices.slice(-20) })
                .then(response => {
                  var localDatabas    = Vue.prototype.$localDatabase
                  localDatabas.pointOfSalesInvoices = localDatabas.pointOfSalesInvoices.filter(el => !response.data.includes(el.upload_key))
                  localStorage.localDatabase = JSON.stringify(localDatabas)
                  Vue.set(Vue.prototype, '$localDatabase', localDatabas)
                  stopUpload = false
                  Vue.prototype.$uploadLocalDatabase()
                })
                .catch(response => {
                    stopUpload = false
                })
            } else if (table != 'pointOfSalestables' && table != 'pointOfSalesInvoices') {
              axios
              .post(this.$linkGnirator('/' + table), { data: Vue.prototype.$localDatabase[table].slice(-20) })
              .then(response => {
                var localDatabas    = Vue.prototype.$localDatabase
                localDatabas[table] = localDatabas[table].filter(el => !response.data.includes(el.upload_key))
                localStorage.localDatabase = JSON.stringify(localDatabas)
                Vue.set(Vue.prototype, '$localDatabase', localDatabas)
                stopUpload = false
                Vue.prototype.$uploadLocalDatabase()
              })
              .catch(response => {
                stopUpload = false
              })
            }
            throw 'Break'
          }
        })
      } catch (e) {
        if (e !== 'Break') throw e
      }
    }
}
Vue.prototype.$addToLocalDatabase = function (item, table) {
    item.ofline       = true
    item.upload_key   = (new Date()).getTime().toString() + Math.floor(Math.random() * 999)
    var localDatabas  = Vue.prototype.$localDatabase
    if (item.date) {item.date         = Date.parse(Vue.prototype.$fixDate(item.date).replace(/-/g, '/')) / 1000;}
    if (item.expiry_date) {item.expiry_date  = Date.parse(Vue.prototype.$fixDate(item.expiry_date).replace(/-/g, '/')) / 1000;}
    if (item.created_date) {item.created_date = Date.parse(Vue.prototype.$fixDate(item.created_date).replace(/-/g, '/')) / 1000;}
    if (item.start_date) {item.start_date   = Date.parse(Vue.prototype.$fixDate(item.start_date).replace(/-/g, '/')) / 1000;}
    if (item.end_date) {item.end_date     = Date.parse(Vue.prototype.$fixDate(item.end_date).replace(/-/g, '/')) / 1000;}
    localDatabas[table].unshift(item)
    localStorage.localDatabase = JSON.stringify(localDatabas)
    Vue.set(Vue.prototype, '$localDatabase', localDatabas)
    Vue.prototype.$uploadLocalDatabase()
    return item;
}
Vue.prototype.$reomoveFromLocalDatabase = function (item, table) {
    var localDatabas = Vue.prototype.$localDatabase
    localDatabas[table] = localDatabas[table].filter(el => el.upload_key != item.upload_key)
    localStorage.localDatabase = JSON.stringify(localDatabas)
    Vue.set(Vue.prototype, '$localDatabase', localDatabas)
}
Vue.prototype.$saveLocalDatabase = function () {
  var localDatabas = Vue.prototype.$localDatabase
  localStorage.localDatabase = JSON.stringify(localDatabas)
}
setInterval(() => {Vue.prototype.$uploadLocalDatabase()}, 5000)
/*
setInterval(() => {Vue.prototype.$uploadPrints()}, 800)
Vue.prototype.$uploadPrints = function () {
    if (stopPrinterUpload == false) {          
      try {
        if (Vue.prototype.$localDatabase.printQueue.length > 0) {
         stopPrinterUpload = true
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "http://" + this.localDatabase.printQueue[0].server, true);
          var params = this.localDatabase.printQueue[0].data;
          var myel = this
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                myel.localDatabase.printQueue.splice(0, 1)
                localStorage.localDatabase = JSON.stringify(myel.localDatabase)
                myel.uploadLocalDatabase()
              } else {
                myel.localDatabase.printQueue.push(myel.localDatabase.printQueue.shift());
              }
            }
            stopPrinterUpload = false
          }
          xhr.send(JSON.stringify(params));
        }
       
      } catch (e) {
        if (e !== 'Break') throw e
      }
    }
  }
*/

