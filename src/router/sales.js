import customersIndex from '@/pages/sales/customers/index.vue'
import customersForm from '@/pages/sales/customers/form.vue'
import customersShow from '@/pages/sales/customers/show.vue'
import customersExplaination from '@/pages/sales/customers/explain.vue'


import quotationsIndex from '@/pages/sales/quotations/index.vue'
import quotationsForm from '@/pages/sales/quotations/form.vue'
import quotationsShow from '@/pages/sales/quotations/show.vue'

import invoicesIndex from '@/pages/sales/invoices/index.vue'
import invoicesForm from '@/pages/sales/invoices/form.vue'
import invoicesShow from '@/pages/sales/invoices/show.vue'

import saleReturnsIndex from '@/pages/sales/saleReturns/index.vue'
import saleReturnsForm from '@/pages/sales/saleReturns/form.vue'
import saleReturnsShow from '@/pages/sales/saleReturns/show.vue'

import ordersIndex from '@/pages/sales/orders/index.vue'
import ordersForm from '@/pages/sales/orders/form.vue'
import ordersShow from '@/pages/sales/orders/show.vue'

const routes =  [

      // customers routes
      { 
        path: "customers", 
        name: "customers",
        component: customersIndex
      },
      {
        path: "customers/create",
        name: "customersCreate",
        component: customersForm
      },
      {
        path: "customers/:id/edit",
        name: "customersEdit",
        component: customersForm
      },
      {
        path: "customers/explaination",
        name: "customersExplaination",
        component: customersExplaination
      },
      {
        path: "customers/:id",
        name: "customersShow",
        component: customersShow
      },
    
      //quotations routs

      { 
        path: "quotations", 
        name: "quotations", 
        component:  quotationsIndex
      },
      {
        path: "quotations/create",
        name: "quotationsCreate",
        component:  quotationsForm
      },
      {
        path: "quotations/:id/edit",
        name: "quotationsEdit",
        component:  quotationsForm
      },
      {
        path: "quotations/:id",
        name: "quotationsShow",
        component:  quotationsShow
      },

      //invoice routs
      { 
        path: "invoices", 
        name: "invoices", 
        component:  invoicesIndex
      },
      {
        path: "invoices/create",
        name: "invoicesCreate",
        component:  invoicesForm
      },
      {
        path: "invoices/:id/edit",
        name: "invoicesEdit",
        component:  invoicesForm
      },
      { 
        path: "invoices/:id", 
        name: "invoicesShow", 
        component:  invoicesShow
    },

    //saleReturns routs
      { 
        path: "saleReturns", 
        name: "saleReturns", 
        component: saleReturnsIndex
      },
      {
        path: "saleReturns/create",
        name: "saleReturnsCreate",
        component:  saleReturnsForm
      },
      {
        path: "saleReturns/:id/edit",
        name: "saleReturnsEdit",
        component: saleReturnsForm
      },
      {
        path: "saleReturns/:id",
        name: "saleReturnsShow",
        component: saleReturnsShow
      },

      //orders routs

      { 
        path: "orders", 
        name: "orders", 
        component:  ordersIndex
      },
      { 
        path: "orders/create", 
        name: "ordersCreate", 
        component:  ordersForm
      },
      { 
        path: "orders/:id/edit", 
        name: "ordersEdit", 
        component:  ordersForm
      },
      { 
        path: "orders/:id", 
        name: "ordersShow", 
        component:  ordersShow
      }
];

export default routes;
