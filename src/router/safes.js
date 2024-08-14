import safesIndex from '@/pages/safes/safes/index.vue'
import safesForm from '@/pages/safes/safes/form.vue'
import safesShow from '@/pages/safes/safes/show.vue'
import safesExplaination from '@/pages/safes/safes/explain.vue'

import bankAccountsIndex from '@/pages/safes/bankAccounts/index.vue'
import bankAccountsForm from '@/pages/safes/bankAccounts/form.vue'
import bankAccountsShow from '@/pages/safes/bankAccounts/show.vue'
import bankAccountsExplaination from '@/pages/safes/bankAccounts/explain.vue'

import salesPaymentsIndex from '@/pages/safes/salesPayments/index.vue'
import salesPaymentsForm from '@/pages/safes/salesPayments/form.vue'
import salesPaymentsShow from '@/pages/safes/salesPayments/show.vue'

import purchasePaymentsIndex from '@/pages/safes/purchasePayments/index.vue'
import purchasePaymentsForm from '@/pages/safes/purchasePayments/form.vue'
import purchasePaymentsShow from '@/pages/safes/purchasePayments/show.vue'

import expensesIndex from '@/pages/safes/expenses/index.vue'
import expensesForm from '@/pages/safes/expenses/form.vue'
import expensesShow from '@/pages/safes/expenses/show.vue'

import incomesIndex from '@/pages/safes/incomes/index.vue'
import incomesForm from '@/pages/safes/incomes/form.vue'
import incomesShow from '@/pages/safes/incomes/show.vue'

import safesDepositsIndex from '@/pages/safes/safesDeposits/index.vue'
import safesDepositsForm from '@/pages/safes/safesDeposits/form.vue'
import safesDepositsShow from '@/pages/safes/safesDeposits/show.vue'

import safesWithdrawalsIndex from '@/pages/safes/safesWithdrawals/index.vue'
import safesWithdrawalsForm from '@/pages/safes/safesWithdrawals/form.vue'
import safesWithdrawalsShow from '@/pages/safes/safesWithdrawals/show.vue'

import safesTransfersIndex from '@/pages/safes/safesTransfers/index.vue'
import safesTransfersForm from '@/pages/safes/safesTransfers/form.vue'
import safesTransfersShow from '@/pages/safes/safesTransfers/show.vue'

import salesDiscountsIndex from '@/pages/safes/salesDiscounts/index.vue'
import salesDiscountsForm from '@/pages/safes/salesDiscounts/form.vue'
import salesDiscountsShow from '@/pages/safes/salesDiscounts/show.vue'

import purchaseDiscountsIndex from '@/pages/safes/purchaseDiscounts/index.vue'
import purchaseDiscountsForm from '@/pages/safes/purchaseDiscounts/form.vue'
import purchaseDiscountsShow from '@/pages/safes/purchaseDiscounts/show.vue'

const routes =  [
  //safes routes

    { 
      path: "safes", 
      name: "safes",
      component: safesIndex
    },
    {
      path: "safes/create",
      name: "safesCreate",
      component: safesForm
    },
    {
      path: "safes/:id/edit",
      name: "safesEdit",
      component: safesForm
    },
    {
      path: "safes/explaination",
      name: "safesExplaination",
      component: safesExplaination
    },
    {
      path: "safes/:id",
      name: "safesShow",
      component: safesShow
    },

  //bankAccounts routes

  {
    path: "bankAccounts",
    name: "bankAccounts",
    component: bankAccountsIndex
  },
  {
    path: "bankAccounts/create",
    name: "bankAccountsCreate",
    component: bankAccountsForm
  },
  {
    path: "bankAccounts/:id/edit",
    name: "bankAccountsEdit",
    component: bankAccountsForm
  },
  {
    path: "bankAccounts/explaination",
    name: "bankAccountsexplaination",
    component: bankAccountsExplaination
  },
  {
    path: "bankAccounts/:id",
    name: "bankAccountsShow",
    component: bankAccountsShow
  },

  // salesPayments routes

  {
    path: "salesPayments",
    name: "salesPayments",
    component: salesPaymentsIndex
  },
  {
    path: "salesPayments/create",
    name: "salesPaymentsCreate",
    component: salesPaymentsForm
  },
  {
    path: "salesPayments/:id/edit",
    name: "salesPaymentsEdit",
    component: salesPaymentsForm
  },
  {
    path: "salesPayments/:id",
    name: "salesPaymentsShow",
    component: salesPaymentsShow
  },

    // purchasePayments routes

  {
    path: "purchasePayments",
    name: "purchasePayments",
    component: purchasePaymentsIndex
  },
  {
    path: "purchasePayments/create",
    name: "purchasePaymentsCreate",
    component: purchasePaymentsForm
  },
  {
    path: "purchasePayments/:id/edit",
    name: "purchasePaymentsEdit",
    component: purchasePaymentsForm
  },
  {
    path: "purchasePayments/:id",
    name: "purchasePaymentsShow",
    component: purchasePaymentsShow
  },

  // expenses routes

  { 
    path: "expenses",
    name: "expenses",
    component: expensesIndex
  },
  {
    path: "expenses/create",
    name: "expensesCreate",
    component: expensesForm
  },
  {
    path: "expenses/:id/edit",
    name: "expensesEdit",
    component: expensesForm
  },
  { path: "expenses/:id",
    name: "expensesShow",
    component: expensesShow

  },


  // incomes routes

  { 
    path: "incomes",
    name: "incomes",
    component:incomesIndex
  },
  {
    path: "incomes/create",
    name: "incomesCreate",
    component: incomesForm
  },
  {
    path: "incomes/:id/edit",
    name: "incomesEdit",
    component: incomesForm
  },
  { path: "incomes/:id",
    name: "incomesShow",
    component: incomesShow

  },

  // safesDeposits routes

  {
    path: "safesDeposits",
    name: "safesDeposits",
    component: safesDepositsIndex
  },
  {
    path: "safesDeposits/create",
    name: "safesDepositsCreate",
    component: safesDepositsForm
  },
  {
    path: "safesDeposits/:id/edit",
    name: "safesDepositsEdit",
    component: safesDepositsForm
  },
  {
    path: "safesDeposits/:id",
    name: "safesDepositsShow",
    component: safesDepositsShow
  },

  //safesWithdrawals routes
  {
    path: "safesWithdrawals",
    name: "safesWithdrawals",
    component: safesWithdrawalsIndex
  },
  {
    path: "safesWithdrawals/create",
    name: "safesWithdrawalsCreate",
    component: safesWithdrawalsForm
  },
  {
    path: "safesWithdrawals/:id/edit",
    name: "safesWithdrawalsEdit",
    component: safesWithdrawalsForm
  },
  {
    path: "safesWithdrawals/:id",
    name: "safesWithdrawalsShow",
    component: safesWithdrawalsShow
  },

  // safesTransfers routes
      
  {
    path: "safesTransfers",
    name: "safesTransfers",
    component: safesTransfersIndex
  },
  {
    path: "safesTransfers/create",
    name: "safesTransfersCreate",
    component: safesTransfersForm
  },
  {
    path: "safesTransfers/:id/edit",
    name: "safesTransfersEdit",
    component: safesTransfersForm
  },
  {
    path: "safesTransfers/:id",
    name: "safesTransfersShow",
    component: safesTransfersShow
  },

  { 
    path: "salesDiscounts", 
    name: "salesDiscounts",
    component: salesDiscountsIndex
  },
  {
    path: "salesDiscounts/create",
    name: "salesDiscountsCreate",
    component: salesDiscountsForm
  },
  {
    path: "salesDiscounts/:id/edit",
    name: "salesDiscountsEdit",
    component: salesDiscountsForm
  },
  {
    path: "salesDiscounts/:id",
    name: "salesDiscountsShow",
    component: salesDiscountsShow
  },

   // purchaseDiscounts routes
   {
    path: "purchaseDiscounts",
    name: "purchaseDiscounts",
    component: purchaseDiscountsIndex
  },
  {
    path: "purchaseDiscounts/create",
    name: "purchaseDiscountsCreate",
    component: purchaseDiscountsForm
  },
  {
    path: "purchaseDiscounts/:id/edit",
    name: "purchaseDiscountsEdit",
    component: purchaseDiscountsForm
  },
  {
    path: "purchaseDiscounts/:id",
    name: "purchaseDiscountsShow",
    component: purchaseDiscountsShow
  },


];

export default routes;
