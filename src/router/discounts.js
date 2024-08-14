import salesDiscountsIndex from '@/pages/discounts/salesDiscounts/index.vue'
import salesDiscountsForm from '@/pages/discounts/salesDiscounts/form.vue'
import salesDiscountsShow from '@/pages/discounts/salesDiscounts/show.vue'


import purchaseDiscountsIndex from '@/pages/discounts/purchaseDiscounts/index.vue'
import purchaseDiscountsForm from '@/pages/discounts/purchaseDiscounts/form.vue'
import purchaseDiscountsShow from '@/pages/discounts/purchaseDiscounts/show.vue'


const routes =  [

      // customers routes
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
    
      //quotations routs

      { 
        path: "purchaseDiscounts", 
        name: "purchaseDiscounts", 
        component:  purchaseDiscountsIndex
      },
      {
        path: "purchaseDiscounts/create",
        name: "purchaseDiscountsCreate",
        component:  purchaseDiscountsForm
      },
      {
        path: "purchaseDiscounts/:id/edit",
        name: "purchaseDiscountsEdit",
        component:  purchaseDiscountsForm
      },
      {
        path: "purchaseDiscounts/:id",
        name: "purchaseDiscountsShow",
        component:  purchaseDiscountsShow
      },

];

export default routes;
