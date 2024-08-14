
//capitals pages
import capitalsIndex from "@/pages/setting/capitals/index.vue";
import capitalsForm from "@/pages/setting/capitals/form.vue";
import capitalsShow from "@/pages/setting/capitals/show.vue";



//units pages
import unitsIndex from "@/pages/setting/units/index.vue";
import unitsForm from "@/pages/setting/units/form.vue";

//unitsCoefficients pages
import unitsCoefficientsIndex from "@/pages/setting/unitsCoefficients/index.vue";
import unitsCoefficientsForm from "@/pages/setting/unitsCoefficients/form.vue";

//sections pages
import sectionsIndex from "@/pages/setting/sections/index.vue";
import sectionsForm from "@/pages/setting/sections/form.vue";

//sectionsAccounts pages
import sectionsAccountsIndex from "@/pages/setting/sectionsAccounts/index.vue";
import sectionsAccountsForm from "@/pages/setting/sectionsAccounts/form.vue";

//Signatures pages
import signaturesIndex from "@/pages/setting/signatures/index.vue";
import signaturesForm from "@/pages/setting/signatures/form.vue";


//priceLists pages
import priceListsIndex from "@/pages/setting/priceLists/index.vue";
import priceListsForm from "@/pages/setting/priceLists/form.vue";

//details pages
import detailsIndex from "@/pages/setting/details/index.vue";
import detailsForm from "@/pages/setting/details/form.vue";

//productOptions pages
import productOptionsIndex from "@/pages/setting/productOptions/index.vue";
import productOptionsFrom from "@/pages/setting/productOptions/form.vue";

//taxes pages
import taxesIndex from "@/pages/setting/taxes/index.vue";
import taxesForm from "@/pages/setting/taxes/form.vue";

//discounts pages
import discountsIndex from "@/pages/setting/discounts/index.vue";
import discountsForm from "@/pages/setting/discounts/form.vue";

//users pages
import usersIndex from "@/pages/setting/users/index.vue";
import usersForm from "@/pages/setting/users/form.vue";

//roles pages
import rolesIndex from "@/pages/setting/roles/index.vue";
import rolesForm from "@/pages/setting/roles/form.vue";

//companies pages
import companiesIndex from "@/pages/setting/companies/index.vue";
import companiesForm from "@/pages/setting/companies/form.vue";

//invoiceGroups pages
import invoiceGroupsIndex from "@/pages/setting/invoiceGroups/index.vue";
import invoiceGroupsForm from "@/pages/setting/invoiceGroups/form.vue";

//invoiceStatus pages
import invoiceStatusIndex from "@/pages/setting/invoiceStatus/index.vue";
import invoiceStatusForm from "@/pages/setting/invoiceStatus/form.vue";



//paymentMethods pages
import paymentMethodsIndex from "@/pages/setting/paymentMethods/index.vue";
import paymentMethodsForm from "@/pages/setting/paymentMethods/form.vue";

//paymentFees pages
import paymentFeesIndex from "@/pages/setting/paymentFees/index.vue";
import paymentFeesForm from "@/pages/setting/paymentFees/form.vue";

//expenseSections pages
import expenseSectionsIndex from "@/pages/setting/expenseSections/index.vue";
import expenseSectionsForm from "@/pages/setting/expenseSections/form.vue";

//incomeSections pages
import incomeSectionsIndex from "@/pages/setting/incomeSections/index.vue";
import incomeSectionsForm from "@/pages/setting/incomeSections/form.vue";

//PaymentsSections pages
import PaymentsSectionsIndex from "@/pages/setting/PaymentsSections/index.vue";
import PaymentsSectionsForm from "@/pages/setting/PaymentsSections/form.vue";


import marketersIndex from "@/pages/setting/marketers/index.vue";
import marketersForm from "@/pages/setting/marketers/form.vue";


import applicationsIndex from "@/pages/setting/applications/index.vue";
import applicationsWhatsapp from "@/pages/setting/applications/whatsapp.vue";
import applicationsmessages from "@/pages/setting/applications/messages.vue";

//backup page
import backup from "@/pages/setting/backup.vue";
//settings
import options from "@/pages/setting/options.vue";

const routes =  [
    { path: "/profile", name: "profile", component: usersForm },
    { path: "/backup", name: "backup", component: backup},

    { path: "capitals", name: "capitals", component: capitalsIndex },
    {
      path: "capitals/create",
      name: "capitalsCreate",
      component: capitalsForm,
    },
    {
      path: "capitals/:id/edit",
      name: "capitalsEdit",
      component: capitalsForm,
    },
    { path: "capitals/:id", name: "capitalsShow", component: capitalsShow },

    { path: "units", name: "units", component: unitsIndex },
    { path: "units/create", name: "unitsCreate", component: unitsForm },
    { path: "units/:id/edit", name: "unitsEdit", component: unitsForm },

    { path: "unitsCoefficients", name: "unitsCoefficients", component: unitsCoefficientsIndex },
    { path: "unitsCoefficients/create", name: "unitsCoefficientsCreate", component: unitsCoefficientsForm },
    { path: "unitsCoefficients/:id/edit", name: "unitsCoefficientsEdit", component: unitsCoefficientsForm },

    { path: "sections", name: "sections", component: sectionsIndex },
    {
      path: "sections/create",
      name: "sectionsCreate",
      component: sectionsForm,
    },
    {
      path: "sections/:id/edit",
      name: "sectionsEdit",
      component: sectionsForm,
    },
    { path: "sectionsAccounts", name: "sectionsAccounts", component: sectionsAccountsIndex },
    { path: "sectionsAccounts/create", name: "sectionsAccountsCreate",component: sectionsAccountsForm },
    { path: "sectionsAccounts/:id/edit", name: "sectionsAccountsEdit", component: sectionsAccountsForm },
    { path: "signatures", name: "signatures", component: signaturesIndex },
    {
      path: "signatures/create",
      name: "signaturesCreate",
      component: signaturesForm,
    },
    {
      path: "signatures/:id/edit",
      name: "signaturesEdit",
      component: signaturesForm,
    },
    { path: "priceLists", name: "priceLists", component: priceListsIndex },
    {
      path: "priceLists/create",
      name: "priceListsCreate",
      component: priceListsForm,
    },
    {
      path: "priceLists/:id/edit",
      name: "priceListsEdit",
      component: priceListsForm,
    },

    { path: "details", name: "details", component: detailsIndex },
    { path: "details/create", name: "detailsCreate", component: detailsForm },
    { path: "details/:id/edit", name: "detailsEdit", component: detailsForm },

    {
      path: "productOptions",
      name: "productOptions",
      component: productOptionsIndex,
    },
    {
      path: "productOptions/create",
      name: "productOptionsCreate",
      component: productOptionsFrom,
    },
    {
      path: "productOptions/:id/edit",
      name: "productOptionsEdit",
      component: productOptionsFrom,
    },

    { path: "taxes", name: "taxes", component: taxesIndex },
    { path: "taxes/create", name: "taxesCreate", component: taxesForm },
    { path: "taxes/:id/edit", name: "taxesEdit", component: taxesForm },

    { path: "discounts", name: "discounts", component: discountsIndex },
    {
      path: "discounts/create",
      name: "discountsCreate",
      component: discountsForm,
    },
    {
      path: "discounts/:id/edit",
      name: "discountsEdit",
      component: discountsForm,
    },

    { path: "users", name: "users", component: usersIndex },
    { path: "users/create", name: "usersCreate", component: usersForm },
    { path: "users/:id/edit", name: "usersEdit", component: usersForm },

    { path: "roles", name: "roles", component: rolesIndex },
    { path: "roles/create", name: "rolesCreate", component: rolesForm },
    { path: "roles/:id/edit", name: "rolesEdit", component: rolesForm },

    { path: "companies", name: "companies", component: companiesIndex },
    {
      path: "companies/create",
      name: "companiesCreate",
      component: companiesForm,
    },
    {
      path: "companies/:id/edit",
      name: "companiesEdit",
      component: companiesForm,
    },

    {
      path: "invoiceGroups",
      name: "invoiceGroups",
      component: invoiceGroupsIndex,
    },
    {
      path: "invoiceGroups/create",
      name: "invoiceGroupsCreate",
      component: invoiceGroupsForm,
    },
    {
      path: "invoiceGroups/:id/edit",
      name: "invoiceGroupsEdit",
      component: invoiceGroupsForm,
    },
    {
      path: "invoiceStatus",
      name: "invoiceStatus",
      component: invoiceStatusIndex,
    },
    {
      path: "invoiceStatus/create",
      name: "invoiceStatusCreate",
      component: invoiceStatusForm,
    },
    {
      path: "invoiceStatus/:id/edit",
      name: "invoiceStatusEdit",
      component: invoiceStatusForm,
    },

    
    { path: "paymentFees", name: "paymentFees", component: paymentFeesIndex },
    {
      path: "paymentFees/create",
      name: "paymentFeesCreate",
      component: paymentFeesForm,
    },
    {
      path: "paymentFees/:id/edit",
      name: "paymentFeesEdit",
      component: paymentFeesForm,
    },

    {
      path: "expenseSections",
      name: "expenseSections",
      component: expenseSectionsIndex,
    },
    {
      path: "expenseSections/create",
      name: "expenseSectionsCreate",
      component: expenseSectionsForm,
    },
    {
      path: "expenseSections/:id/edit",
      name: "expenseSectionsEdit",
      component: expenseSectionsForm,
    },

    {
      path: "incomeSections",
      name: "incomeSections",
      component: incomeSectionsIndex,
    },
    {
      path: "incomeSections/create",
      name: "incomeSectionsCreate",
      component: incomeSectionsForm,
    },
    {
      path: "incomeSections/:id/edit",
      name: "incomeSectionsEdit",
      component: incomeSectionsForm,
    },


    {
      path: "PaymentsSections",
      name: "PaymentsSections",
      component: PaymentsSectionsIndex,
    },
    {
      path: "PaymentsSections/create",
      name: "PaymentsSectionsCreate",
      component: PaymentsSectionsForm,
    },
    {
      path: "PaymentsSections/:id/edit",
      name: "PaymentsSectionsEdit",
      component: PaymentsSectionsForm,
    },

    { path: "marketers", name: "marketers", component: marketersIndex },
    {
      path: "marketers/create",
      name: "marketersCreate",
      component: marketersForm,
    },
    {
      path: "marketers/:id/edit",
      name: "marketersEdit",
      component: marketersForm,
    },
    

    {
        path: "applications",
        name: "applications",
        component: applicationsIndex,
      },
      {
        path: "applications/whatsapp",
        name: "whatsappApplications",
        component: applicationsWhatsapp,
      },
      {
        path: "applications/messages",
        name: "applicationsmessages",
        component: applicationsmessages,
      },

      //settings
      {
        path: "options",
        name: "options",
        component: options,
      }
]

export default routes