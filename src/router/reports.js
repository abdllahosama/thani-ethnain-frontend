

// -- REPORTS -- //

import mainReport from "@/pages/reports/main.vue";
import totalReport from "@/pages/reports/totalReport.vue";

import overview from "@/pages/reports/overview.vue";
import sales from "@/pages/reports/sales.vue";
import purchases from "@/pages/reports/purchases.vue";
import lockers from "@/pages/reports/lockers.vue";
import stocks from "@/pages/reports/stocks.vue";
import employee from "@/pages/reports/employee.vue";
import accountOperation from "@/pages/reports/accountOperation.vue";
import discount from "@/pages/reports/discount.vue";
import pointOfSale from "@/pages/reports/pointOfSale.vue";
import shipping from "@/pages/reports/shipping.vue";
import pointOfSalesOverview from "@/pages/reports/pointOfSalesOverview.vue";

//customers reports
import customersTotalAccounts from "@/pages/reports/customers/totalAccounts.vue";
import customersDetailsAccounts from "@/pages/reports/customers/detailsAccounts.vue";
import customersBalance from "@/pages/reports/customers/balance.vue";
import customersGuide from "@/pages/reports/customers/guide.vue";
import customersInactive from "@/pages/reports/customers/inactive.vue";
import customersActive from "@/pages/reports/customers/active.vue";
import customerTraffic from "@/pages/reports/customers/customerTraffic.vue";
import salesCollection from "@/pages/reports/customers/salesCollection.vue";

//suppliers reports
import suppliersTotalAccounts from "@/pages/reports/suppliers/totalAccounts.vue";
import suppliersDetailsAccounts from "@/pages/reports/suppliers/detailsAccounts.vue";
import suppliersBalance from "@/pages/reports/suppliers/balance.vue";
import suppliersGuide from "@/pages/reports/suppliers/guide.vue";
import suppliersInactive from "@/pages/reports/suppliers/inactive.vue";
import supplierMovement from "@/pages/reports/suppliers/supplierMovement.vue";
import purchasingCollecting from "@/pages/reports/suppliers/purchasingCollecting.vue";




//accounts reports
import totalAccounts from "@/pages/reports/accounts/totalAccounts.vue";
import accountDetails from "@/pages/reports/accounts/detailsAccounts.vue";
import accountBalances from "@/pages/reports/accounts/balance.vue";
import accountsGuide from "@/pages/reports/accounts/guide.vue";
import movementAccounts from "@/pages/reports/accounts/movementAccounts.vue";

//employees reports
import employeesTotalAccounts from "@/pages/reports/employees/totalAccounts.vue";
import employeesBalance from "@/pages/reports/employees/balance.vue";
import employeesGuide from "@/pages/reports/employees/guide.vue";

//employeesOperations reports
import employeesOperationsDeductions from "@/pages/reports/employeesOperations/employeesDeductions.vue";
import employeesOperationsIncentives from "@/pages/reports/employeesOperations/employeesIncentives.vue";
import employeesOperationsSalaries from "@/pages/reports/employeesOperations/employeesSalaries.vue";
import employeesOperationsWithdrawals from "@/pages/reports/employeesOperations/employeesWithdrawals.vue";

//safes reports
import safesAccounts from "@/pages/reports/safes/accounts.vue";
import safersBalance from "@/pages/reports/safes/balance.vue";
import safesMove from "@/pages/reports/safes/safesMove.vue";

//stores reports
import warehouseInventory from "@/pages/reports/stores/warehouseInventory.vue";
import ProductsValue from "@/pages/reports/stores/ProductsValue.vue";
import productAlerts from "@/pages/reports/stores/productAlerts.vue";

//sales reports
import salesByInvoice from "@/pages/reports/sales/invoice.vue";
import salesByItem from "@/pages/reports/sales/item.vue";
import salesByCustomer from "@/pages/reports/sales/customer.vue";
import customerSalesPrices from "@/pages/reports/sales/customerSalesPrices";

//subscriptionsOperations reports
import shippingOperationsByInvoice from "@/pages/reports/shippingOperations/shippingOperationsByInvoice.vue";

//purchases reports
import purchasesByBill from "@/pages/reports/purchases/bill.vue";
import purchasesByItem from "@/pages/reports/purchases/item.vue";

//storesdeposits reports
import storesDepositsByInvoice from "@/pages/reports/storesDeposits/invoice.vue";
import storesDepositsByItem from "@/pages/reports/storesDeposits/item.vue";


//storeswithdrawals reports
import storesWithdrawalsByBill from "@/pages/reports/storesWithdrawals/bill.vue";
import storesWithdrawalsByItem from "@/pages/reports/storesWithdrawals/item.vue";

//storestransfers reports
import storesTransfersByInvoice from "@/pages/reports/storesTransfers/invoice.vue";
import storesTransfersByItem from "@/pages/reports/storesTransfers/item.vue";

//salesReturns reports
import salesReturnsByInvoice from "@/pages/reports/salesReturns/invoice.vue";
import salesReturnsByItem from "@/pages/reports/salesReturns/item.vue";



//purchasesReturns reports
import purchasesReturnsByBill from "@/pages/reports/purchasesReturns/bill.vue";
import purchasesReturnsByItem from "@/pages/reports/purchasesReturns/item.vue";

//salesOrders reports
import salesOrdersByInvoice from "@/pages/reports/salesOrders/invoice.vue";
import salesOrdersByItem from "@/pages/reports/salesOrders/item.vue";

//purchasesOrders reports
import purchasesOrdersByBill from "@/pages/reports/purchasesOrders/bill.vue";
import purchasesOrdersByItem from "@/pages/reports/purchasesOrders/item.vue";

//payments reports
import paymentHistory from "@/pages/reports/payments/paymentHistory.vue";

import purchasePaymentHistory from "@/pages/reports/payments/purchasePaymentHistory.vue";

import safeDepositHistory from "@/pages/reports/safesDeposits/safeDepositHistory.vue";
import safeWithdrawalHistory from "@/pages/reports/safesWithdrawals/safeWithdrawalHistory.vue";
import safeTransferHistory from "@/pages/reports/safesTransfers/safeTransferHistory.vue";


//discounts reports
import discountsHistory from "@/pages/reports/discounts/discountsHistory.vue";
import purchaseDiscountsHistory from "@/pages/reports/discounts/purchaseDiscountsHistory.vue";

//expenses reports
import expenseHistory from "@/pages/reports/expenses/history.vue";
import expenseByCategory from "@/pages/reports/expenses/category.vue";

//incomes reports
import incomeHistory from "@/pages/reports/incomes/history.vue";
import incomeByCategory from "@/pages/reports/incomes/category.vue";


// productDetails reports
import productDetailsAccounts from "@/pages/reports/products/detailsAccounts.vue";

//inactiveProducts
import inactiveProducts from "@/pages/reports/products/inactiveProducts.vue";


import accountTransactionPaymentsRecord from "@/pages/reports/accountsOperations/accountTransactionPaymentsRecord.vue"
import recordWithdrawalsAccountsOperations from "@/pages/reports/accountsOperations/recordWithdrawalsAccountsOperations.vue"


const routes =  [

     
    { path: "overview", name: "overview", component: overview },
    { path: "sales", name: "sales", component: sales },
    { path: "purchases", name: "purchases", component: purchases },
    { path: "lockers", name: "lockers", component: lockers },
    { path: "stocks", name: "stocks", component: stocks },
    { path: "employee", name: "employee", component: employee },

    { path: "accountOperation", name: "accountOperation", component: accountOperation },
    { path: "discount", name: "discount", component: discount },
    { path: "pointOfSale", name: "pointOfSale", component: pointOfSale },
    { path: "shipping", name: "shipping", component: shipping },
    { path: "totalReport", name: "totalReport", component: totalReport },

    // reports router
    { path: "mainReport", name: "mainReport", component: mainReport },
    { path: "pointOfSalesOverview", name: "pointOfSalesOverview", component: pointOfSalesOverview },

    {
      path: "customersTotalAccounts",
      name: "customersTotalAccounts",
      component: customersTotalAccounts,
    },
    {
      path: "customersDetailsAccounts",
      name: "customersDetailsAccounts",
      component: customersDetailsAccounts,
    },
    {
      path: "customersBalance",
      name: "customersBalance",
      component: customersBalance,
    },
    {
      path: "customersGuide",
      name: "customersGuide",
      component: customersGuide,
    },
    {
      path: "customersInactive",
      name: "customersInactive",
      component: customersInactive,
    },
    {
      path: "customersActive",
      name: "customersActive",
      component: customersActive,
    },
    {
      path: "customerTraffic",
      name: "customerTraffic",
      component: customerTraffic,
    },
    {
      path: "salesCollection",
      name: "salesCollection",
      component: salesCollection,
    },
    
    {
      path: "suppliersTotalAccounts",
      name: "suppliersTotalAccounts",
      component: suppliersTotalAccounts,
    },
    {
      path: "suppliersDetailsAccounts",
      name: "suppliersDetailsAccounts",
      component: suppliersDetailsAccounts,
    },
    {
      path: "suppliersBalance",
      name: "suppliersBalance",
      component: suppliersBalance,
    },
    {
      path: "suppliersGuide",
      name: "suppliersGuide",
      component: suppliersGuide,
    },
    {
      path: "suppliersInactive",
      name: "suppliersInactive",
      component: suppliersInactive,
    },
    {
      path: "supplierMovement",
      name: "supplierMovement",
      component: supplierMovement,
    },
    {
      path: "purchasingCollecting",
      name: "purchasingCollecting",
      component: purchasingCollecting,
    },
    {
      path: "totalAccounts",
      name: "totalAccounts",
      component: totalAccounts,
    },
    {
      path: "accountDetails",
      name: "accountDetails",
      component: accountDetails,
    },
    {
      path: "accountBalances",
      name: "accountBalances",
      component: accountBalances,
    },
    {
      path: "accountsGuide",
      name: "accountsGuide",
      component: accountsGuide,
    },
    {
      path: "movementAccounts",
      name: "movementAccounts",
      component: movementAccounts,
    },


    {
      path: "employeesTotalAccounts",
      name: "employeesTotalAccounts",
      component: employeesTotalAccounts,
    },
    {
      path: "employeesBalance",
      name: "employeesBalance",
      component: employeesBalance,
    },
    {
      path: "employeesGuide",
      name: "employeesGuide",
      component: employeesGuide,
    },
    {
      path: "employeesOperationsDeductions",
      name: "employeesOperationsDeductions",
      component: employeesOperationsDeductions,
    },
    {
      path: "employeesOperationsIncentives",
      name: "employeesOperationsIncentives",
      component: employeesOperationsIncentives,
    },
    {
      path: "employeesOperationsSalaries",
      name: "employeesOperationsSalaries",
      component: employeesOperationsSalaries,
    },
    {
      path: "employeesOperationsWithdrawals",
      name: "employeesOperationsWithdrawals",
      component: employeesOperationsWithdrawals,
    },
    {
      path: "safesAccounts",
      name: "safesAccounts",
      component: safesAccounts,
    },
    {
      path: "safersBalance",
      name: "safersBalance",
      component: safersBalance,
    },
    {
      path: "safesMove",
      name: "safesMove",
      component: safesMove,
    },

    {
      path: "warehouseInventory",
      name: "warehouseInventory",
      component: warehouseInventory,
    },
    {
      path: "ProductsValue",
      name: "ProductsValue",
      component: ProductsValue,
    },
    {
      path: "productAlerts",
      name: "productAlerts",
      component: productAlerts,
    },

    {
      path: "salesByInvoice",
      name: "salesByInvoice",
      component: salesByInvoice,
    },
    { path: "salesByItem", name: "salesByItem", component: salesByItem },
    { path: "salesByCustomer", name: "salesByCustomer", component: salesByCustomer },
    { path: "customerSalesPrices", name: "customerSalesPrices", component: customerSalesPrices },
    {
      path: "shippingOperationsByInvoice",
      name: "shippingOperationsByInvoice",
      component: shippingOperationsByInvoice,
    },
    {
      path: "purchasesByBill",
      name: "purchasesByBill",
      component: purchasesByBill,
    },
    {
      path: "purchasesByItem",
      name: "purchasesByItem",
      component: purchasesByItem,
    },

    // salesReturns routes
    {
      path: "salesReturnsByInvoice",
      name: "salesReturnsByInvoice",
      component: salesReturnsByInvoice,
    },
    {
      path: "salesReturnsByItem",
      name: "salesReturnsByItem",
      component: salesReturnsByItem,
    },

    // purchasesReturns routes
    {
      path: "purchasesReturnsByBill",
      name: "purchasesReturnsByBill",
      component: purchasesReturnsByBill,
    },
    {
      path: "purchasesReturnsByItem",
      name: "purchasesReturnsByItem",
      component: purchasesReturnsByItem,
    },

    // salesOrders routes
    {
      path: "salesOrdersByInvoice",
      name: "salesOrdersByInvoice",
      component: salesOrdersByInvoice,
    },
    {
      path: "salesOrdersByItem",
      name: "salesOrdersByItem",
      component: salesOrdersByItem,
    },



    {
      path: "storesDepositsByInvoice",
      name: "storesDepositsByInvoice",
      component: storesDepositsByInvoice,
    },
    {
      path: "storesDepositsByItem",
      name: "storesDepositsByItem",
      component: storesDepositsByItem,
    },




    {
      path: "storesWithdrawalsByBill",
      name: "storesWithdrawalsByBill",
      component: storesWithdrawalsByBill,
    },
    {
      path: "storesWithdrawalsByItem",
      name: "storesWithdrawalsByItem",
      component: storesWithdrawalsByItem,
    },



    {
      path: "storesTransfersByInvoice",
      name: "storesTransfersByInvoice",
      component: storesTransfersByInvoice,
    },
    {
      path: "storesTransfersByItem",
      name: "storesTransfersByItem",
      component: storesTransfersByItem,
    },

    // purchasesOrders routes
    {
      path: "purchasesOrdersByBill",
      name: "purchasesOrdersByBill",
      component: purchasesOrdersByBill,
    },
    {
      path: "purchasesOrdersByItem",
      name: "purchasesOrdersByItem",
      component: purchasesOrdersByItem,
    },

    {
      path: "paymentHistory",
      name: "paymentHistory",
      component: paymentHistory,
    },
    {
      path: "purchasePaymentHistory",
      name: "purchasePaymentHistory",
      component: purchasePaymentHistory,
    },


    {
      path: "safeDepositHistory",
      name: "safeDepositHistory",
      component: safeDepositHistory,
    },
    {
      path: "safeWithdrawalHistory",
      name: "safeWithdrawalHistory",
      component: safeWithdrawalHistory,
    },
    {
      path: "safeTransferHistory",
      name: "safeTransferHistory",
      component: safeTransferHistory,
    },

    // discounts routes
    {
      path: "discountsHistory",
      name: "discountsHistory",
      component: discountsHistory,
    },
    {
      path: "purchaseDiscountsHistory",
      name: "purchaseDiscountsHistory",
      component: purchaseDiscountsHistory,
    },
    {
      path: "expenseHistory",
      name: "expenseHistory",
      component: expenseHistory,
    },
    {
      path: "expenseByCategory",
      name: "expenseByCategory",
      component: expenseByCategory,
    },

    {
      path: "incomeHistory",
      name: "incomeHistory",
      component: incomeHistory,
    },
    {
      path: "incomeByCategory",
      name: "incomeByCategory",
      component: incomeByCategory,
    },

    {
      path: "accountTransactionPaymentsRecord",
      name: "accountTransactionPaymentsRecord",
      component: accountTransactionPaymentsRecord,
    },
    
    {
      path: "recordWithdrawalsAccountsOperations",
      name: "recordWithdrawalsAccountsOperations",
      component: recordWithdrawalsAccountsOperations,
    },

    //  {path: "employeeAccountStatement",name: "employeeAccountStatement",component: accountStatement},
    {
        path: "productDetailsAccounts",
        name: "productDetailsAccounts",
        component: productDetailsAccounts,
      },
      {
        path: "inactiveProducts",
        name: "inactiveProducts",
        component: inactiveProducts,
      },
]

export default routes