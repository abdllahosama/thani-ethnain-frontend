import manufacturingModelsIndex from '@/pages/manufacturing/manufacturingModels/index.vue'
import manufacturingModelsForm from '@/pages/manufacturing/manufacturingModels/form.vue'
import manufacturingModelsShow from '@/pages/manufacturing/manufacturingModels/show.vue'

import manufacturingOperationsIndex from '@/pages/manufacturing/manufacturingOperations/index.vue'
import manufacturingOperationsForm from '@/pages/manufacturing/manufacturingOperations/form.vue'
import manufacturingOperationsShow from '@/pages/manufacturing/manufacturingOperations/show.vue'

import manufacturingDepositsIndex from '@/pages/manufacturing/manufacturingDeposits/index.vue'
import manufacturingDepositsForm from '@/pages/manufacturing/manufacturingDeposits/form.vue'
import manufacturingDepositsShow from '@/pages/manufacturing/manufacturingDeposits/show.vue'

import manufacturingWithdrawalsIndex from '@/pages/manufacturing/manufacturingWithdrawals/index.vue'
import manufacturingWithdrawalsForm from '@/pages/manufacturing/manufacturingWithdrawals/form.vue'
import manufacturingWithdrawalsShow from '@/pages/manufacturing/manufacturingWithdrawals/show.vue'

import manufacturingTransfersIndex from '@/pages/manufacturing/manufacturingTransfers/index.vue'
import manufacturingTransfersForm from '@/pages/manufacturing/manufacturingTransfers/form.vue'
import manufacturingTransfersShow from '@/pages/manufacturing/manufacturingTransfers/show.vue'

const routes =  [

       //manufacturingModels routes

    { 
      path: "manufacturingModels", 
      name: "manufacturingModels",
      component: manufacturingModelsIndex
    },
    {
      path: "manufacturingModels/create",
      name: "manufacturingmodelsCreate",
      component: manufacturingModelsForm
    },
    {
      path: "manufacturingModels/:id/edit",
      name: "manufacturingmodelsEdit",
      component: manufacturingModelsForm
    },
    {
      path: "manufacturingModels/:id",
      name: "manufacturingmodelsShow",
      component: manufacturingModelsShow
    },

     //manufacturingOperations routes
     {
      path: "manufacturingOperations",
      name: "manufacturingOperations",
      component: manufacturingOperationsIndex
    },
    {
      path: "manufacturingOperations/create",
      name: "manufacturingOperationsCreate",
      component: manufacturingOperationsForm
    },
    {
      path: "manufacturingOperations/:id/edit",
      name: "manufacturingOperationsEdit",
      component: manufacturingOperationsForm
    },
    {
      path: "manufacturingOperations/:id",
      name: "manufacturingOperationsShow",
      component: manufacturingOperationsShow
    },
    //manufacturingDeposits routes
    {
      path: "manufacturingDeposits",
      name: "manufacturingDeposits",
      component: manufacturingDepositsIndex
    },
    {
      path: "manufacturingDeposits/create",
      name: "manufacturingDepositsCreate",
      component: manufacturingDepositsForm
    },
    {
      path: "manufacturingDeposits/:id/edit",
      name: "manufacturingDepositsEdit",
      component: manufacturingDepositsForm
    },
    {
      path: "manufacturingDeposits/:id",
      name: "manufacturingDepositsShow",
      component: manufacturingDepositsShow
    },

    //manufacturingWithdrawals routes
    {
      path: "manufacturingWithdrawals",
      name: "manufacturingWithdrawalsIndex",
      component: manufacturingWithdrawalsIndex
    },
    {
      path: "manufacturingWithdrawals/create",
      name: "manufacturingWithdrawalsCreate",
      component: manufacturingWithdrawalsForm
    },
    {
      path: "manufacturingWithdrawals/:id/edit",
      name: "manufacturingWithdrawalsEdit",
      component: manufacturingWithdrawalsForm
    },
    {
      path: "manufacturingWithdrawals/:id",
      name: "manufacturingWithdrawalsShow",
      component: manufacturingWithdrawalsShow
    },


    //manufacturingTransfers routes
    {
      path: "manufacturingTransfers",
      name: "manufacturingTransfersIndex",
      component: manufacturingTransfersIndex
    },
    {
      path: "manufacturingTransfers/create",
      name: "manufacturingTransfersCreate",
      component: manufacturingTransfersForm
    },
    {
      path: "manufacturingTransfers/:id/edit",
      name: "manufacturingTransfersEdit",
      component: manufacturingTransfersForm
    },
    {
      path: "manufacturingTransfers/:id",
      name: "manufacturingTransferShow",
      component: manufacturingTransfersShow
    },
];

export default routes;
