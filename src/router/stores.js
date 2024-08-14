import storesIndex from '@/pages/stores/stores/index.vue'
import storesForm from '@/pages/stores/stores/form.vue'
import storesShow from '@/pages/stores/stores/show.vue'
import storesExplaination from '@/pages/stores/stores/explain.vue'

import productsIndex from '@/pages/stores/products/index.vue'
import productsForm from '@/pages/stores/products/form.vue'
import productsShow from '@/pages/stores/products/show.vue'
import productsExplaination from '@/pages/stores/products/explain.vue'
import productsBarcode from '@/pages/stores/products/barcode.vue'

import materialsIndex from '@/pages/stores/materials/index.vue'
import materialsForm from '@/pages/stores/materials/form.vue'
import materialsShow from '@/pages/stores/materials/show.vue'
import materialsExplaination from '@/pages/stores/materials/explain.vue'

import storesDepositsIndex from '@/pages/stores/storesDeposits/index.vue'
import storesDepositsForm from '@/pages/stores/storesDeposits/form.vue'
import storesDepositsShow from '@/pages/stores/storesDeposits/show.vue'

import storesWithdrawalsIndex from '@/pages/stores/storesWithdrawals/index.vue'
import storesWithdrawalsForm from '@/pages/stores/storesWithdrawals/form.vue'
import storesWithdrawalsShow from '@/pages/stores/storesWithdrawals/show.vue'

import storesTransfersIndex from '@/pages/stores/storesTransfers/index.vue'
import storesTransfersForm from '@/pages/stores/storesTransfers/form.vue'
import storesTransfersShow from '@/pages/stores/storesTransfers/show.vue'

const routes =  [
    { 
      path: "stores", 
      name: "stores",
      component: storesIndex
    },
    {
      path: "stores/create",
      name: "storesCreate",
      component: storesForm
    },
    {
      path: "stores/:id/edit",
      name: "storesEdit",
      component: storesForm
    },
    {
      path: "stores/explaination",
      name: "storesExplaination",
      component: storesExplaination
    },
    {
      path: "stores/:id",
      name: "storesShow",
      component: storesShow
    },

    //products routs
      { 
        path: "products", 
        name: "products", 
        component: productsIndex
      },
      {
        path: "products/create",
        name: "productsCreate",
        component: productsForm
      },
      {
        path: "products/:id/edit",
        name: "productsEdit",
        component: productsForm
      },
      {
        path: "products/explaination",
        name: "productsExplaination",
        component: productsExplaination
      },
      { 
        path: "products/:id", 
        name: "productsShow", 
        component: productsShow
      },
      { 
        path: "productsBarcode", 
        name: "productsBarcode", 
        component: productsBarcode
      },
      {
        path: "productsBarcode/bill/:id",
        name: "productsBarcodeBill",
        component: productsBarcode
      },

      //materials routs
      { 
        path: "materials", 
        name: "materials", 
        component: materialsIndex
      },
      {
        path: "materials/create",
        name: "materialsCreate",
        component: materialsForm
      },
      {
        path: "materials/:id/edit",
        name: "materialsEdit",
        component: materialsForm
      },
      {
        path: "materials/explaination",
        name: "materialsExplaination",
        component: materialsExplaination
      },
      {
        path: "materials/:id",
        name: "materialsShow",
        component: materialsShow
      },
      
      //storesDeposits routes
      {
        path: "storesDeposits",
        name: "storesDeposits",
        component: storesDepositsIndex
      },
      {
        path: "storesDeposits/create",
        name: "storesDepositsCreate",
        component: storesDepositsForm
      },
      {
        path: "storesDeposits/:id/edit",
        name: "storesDepositsEdit",
        component: storesDepositsForm
      },
      {
        path: "storesDeposits/:id",
        name: "storesDepositsShow",
        component: storesDepositsShow
      },
      //storesWithdrawals routes
      {
        path: "storesWithdrawals",
        name: "storesWithdrawalsIndex",
        component: storesWithdrawalsIndex
      },
      {
        path: "storesWithdrawals/create",
        name: "storesWithdrawalsCreate",
        component: storesWithdrawalsForm
      },
      {
        path: "storesWithdrawals/:id/edit",
        name: "storesWithdrawalsEdit",
        component: storesWithdrawalsForm
      },
      {
        path: "storesWithdrawals/:id",
        name: "storesWithdrawalsShow",
        component: storesWithdrawalsShow
      },

      //storesTransfers routes
      {
        path: "storesTransfers",
        name: "storesTransfers",
        component: storesTransfersIndex
      },
      {
        path: "storesTransfers/create",
        name: "storesTransfersCreate",
        component: storesTransfersForm
      },
      {
        path: "storesTransfers/:id/edit",
        name: "storesTransfersEdit",
        component: storesTransfersForm
      },
      {
        path: "storesTransfers/:id",
        name: "storesTransfersShow",
        component: storesTransfersShow
      },
];

export default routes;
