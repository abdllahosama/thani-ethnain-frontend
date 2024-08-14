import deliveriesIndex from '@/pages/shipping/deliveries/index.vue'
import deliveriesForm from '@/pages/shipping/deliveries/form.vue'

import citiesIndex from '@/pages/shipping/cities/index.vue'
import citiesForm from '@/pages/shipping/cities/form.vue'

import pickupLocationsIndex from '@/pages/shipping/pickupLocations/index.vue'
import pickupLocationsForm from '@/pages/shipping/pickupLocations/form.vue'
import pickupLocationsShow from '@/pages/shipping/pickupLocations/show.vue'

import shippingOperationsIndex from '@/pages/shipping/shippingOperations/index.vue'
import shippingOperationsForm from '@/pages/shipping/shippingOperations/form.vue'

import shippingAddressesIndex from '@/pages/shipping/shippingAddresses/index.vue'
import shippingAddressesForm from '@/pages/shipping/shippingAddresses/form.vue'
import shippingAddressesShow from '@/pages/shipping/shippingAddresses/show.vue'

const routes =  [

  //deliveries routes
    { 
      path: "deliveries", 
      name: "deliveries",
      component: deliveriesIndex
    },
    {
      path: "deliveries/create",
      name: "deliveriesCreate",
      component: deliveriesForm
    },
    {
      path: "deliveries/:id/edit",
      name: "deliveriesEdit",
      component: deliveriesForm
    },

      //cities routes
    {
      path: "cities",
      name: "cities",
      component: citiesIndex
    },
    {
      path: "cities/create",
      name: "citiesCreate",
      component: citiesForm
    },
    {
      path: "cities/:id/edit",
      name: "citiesEdit",
      component: citiesForm
    },

   //pickupLocations routes
    {
      path: "pickupLocations",
      name: "pickupLocations",
      component: pickupLocationsIndex
    },
    {
      path: "pickupLocations/create",
      name: "pickupLocationsCreate",
      component: pickupLocationsForm
    },
    {
      path: "pickupLocations/:id/edit",
      name: "pickupLocationsEdit",
      component: pickupLocationsForm
    },
    {
      path: "pickupLocations/:id",
      name: "pickupLocationsShow",
      component: pickupLocationsShow
    },

    //shippingOperations routes 
    {
      path: "shippingOperations",
      name: "shippingOperations",
      component: shippingOperationsIndex
    },
    {
      path: "shippingOperations/create",
      name: "shippingOperationsCreate",
      component: shippingOperationsForm
    },
    {
      path: "shippingOperations/:id/edit",
      name: "shippingOperationsEdit",
      component: shippingOperationsForm
    },

    //shippingAddresses
    {
      path: "shippingAddresses",
      name: "shippingAddresses",
      component: shippingAddressesIndex
    },
    {
      path: "shippingAddresses/create",
      name: "shippingAddressesCreate",
      component: shippingAddressesForm
    },
    {
      path: "shippingAddresses/:id/edit",
      name: "shippingAddressesEdit",
      component: shippingAddressesForm
    },
    {
      path: "shippingAddresses/:id",
      name: "shippingAddressesShow",
      component: shippingAddressesShow
    },
];

export default routes;
