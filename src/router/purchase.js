import suppliersIndex from '@/pages/purchase/suppliers/index.vue'
import suppliersForm from '@/pages/purchase/suppliers/form.vue'
import suppliersShow from '@/pages/purchase/suppliers/show.vue'
import suppliersExplaination from '@/pages/purchase/suppliers/explain.vue'

import billsIndex from '@/pages/purchase/bills/index.vue'
import billsForm from '@/pages/purchase/bills/form.vue'
import billsShow from '@/pages/purchase/bills/show.vue'

import purchaseReturnsIndex from '@/pages/purchase/purchaseReturns/index.vue'
import purchaseReturnsForm from '@/pages/purchase/purchaseReturns/form.vue'
import purchaseReturnsShow from '@/pages/purchase/purchaseReturns/show.vue'


const routes =  [

  //suppliers routes
    { 
      path: "suppliers", 
      name: "suppliers",
      component: suppliersIndex
    },
    {
      path: "suppliers/create",
      name: "suppliersCreate",
      component: suppliersForm
    },
    {
      path: "suppliers/:id/edit",
      name: "suppliersEdit",
      component: suppliersForm
    },
    {
      path: "suppliers/explaination",
      name: "suppliersExplaination",
      component: suppliersExplaination
    },
    {
      path: "suppliers/:id",
      name: "suppliersShow",
      component: suppliersShow
    },

    //bills routes

    { 
      path: "bills",
      name: "bills",
      component: billsIndex
    },
    { 
      path: "bills/create", 
      name: "billsCreate",
      component: billsForm
    },
    { 
      path: "bills/:id/edit",
      name: "billsEdit",
      component: billsForm
    },
    { path: "bills/:id",
      name: "billsShow",
      component: billsShow
    },

    //purchaseReturns routes

    {
      path: "purchaseReturns",
      name: "purchaseReturns",
      component: purchaseReturnsIndex
    },
    {
      path: "purchaseReturns/create",
      name: "purchaseReturnsCreate",
      component: purchaseReturnsForm
    },
    {
      path: "purchaseReturns/:id/edit",
      name: "purchaseReturnsEdit",
      component: purchaseReturnsForm
    },
    {
      path: "purchaseReturns/:id",
      name: "purchaseReturnsShow",
      component: purchaseReturnsShow
    },
];

export default routes;
