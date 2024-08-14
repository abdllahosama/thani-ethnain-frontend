import Vue from 'vue'
import axios from 'axios'

var tables = [
  'customers',
  'suppliers',
  'accounts',
  'partners',
  'projects',
  'projectItems',
  'safes',
  'capitals',
  'stores',
  'products',
  'subscriptions',
  'materials',
  'pickupLocations',
  'employees',
  'manufacturingModels',
  'manufacturingModelProducts',
  'manufacturingModelMaterials',
  'pointOfSales',
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
  'productOptionItems',
  'productQuantities',
  'productPrices',
  'productUnits',
  'signatures',
  'invoiceStatus',
  'sectionsAccounts',
  'unitsCoefficients'
]
const database = Vue.observable({ database: {} });

Object.defineProperty(Vue.prototype, '$database', {
  get() { return database.database; },
  set(value) { database.database = value; }
});


try {
  var databas =  localStorage.getItem('database') !== null ? JSON.parse(localStorage.getItem('database')) : {};
  tables.forEach(table => {
    if (databas[table] === 'undefined') {
      databas[table] = []
    }
  })
  Vue.set(Vue.prototype, '$database', databas)
} catch (e) {}


Vue.prototype.$updateDatabase = function (data)  {
    if (navigator.onLine) {
        var database = Vue.prototype.$database;
        axios.get(Vue.prototype.$linkGnirator('/allData'), {params: {requiredData: data}})
          .then(response => {
            var data = response.data
            tables.forEach(table => {
              if (data[table]) {  database[table] = data[table]}
            })
            Vue.set(Vue.prototype, '$database', database)
            localStorage.setItem('database', JSON.stringify(Vue.prototype.$database));
          })
      }
};