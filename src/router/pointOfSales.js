import pointOfSalesIndex from '@/pages/pointOfSales/pointOfSales/index.vue'
import pointOfSalesForm from '@/pages/pointOfSales/pointOfSales/form.vue'
import pointOfSalesShow from '@/pages/pointOfSales/pointOfSales/show.vue'

import pointOfSalesinvoices from '@/pages/pointOfSales/pointOfSales/invoices.vue'
import pointOfSalesshippingOperations from '@/pages/pointOfSales/pointOfSales/shippingOperations.vue'
import pointOfSalesexpenses from '@/pages/pointOfSales/pointOfSales/expenses.vue'

const routes =  [

      {
        path: "pointOfSales",
        name: "pointOfSales",
        component: pointOfSalesIndex
      },
      {
        path: "pointOfSales/create",
        name: "pointOfSalesCreate",
        component: pointOfSalesForm
      },
      {
        path: "pointOfSales/:id/edit",
        name: "pointOfSalesEdit",
        component: pointOfSalesForm
      },
      {
        path: "pointOfSales/:id",
        name: "pointOfSalesShow",
        component: pointOfSalesShow
      },
      {
        path: "pointOfSales/:id/invoices",
        name: "pointOfSalesInvoicesSingle",
        component: pointOfSalesinvoices
      },
      {
        path: "pointOfSales/:id/shippingOperations",
        name: "pointOfSalesShippingOperations",
        component: pointOfSalesshippingOperations
      },
      {
        path: "pointOfSales/:id/expenses",
        name: "pointOfSalesExpenses",
        component: pointOfSalesexpenses
      }
];

export default routes;