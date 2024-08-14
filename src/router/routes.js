import sales from "./sales";
import purchase from "./purchase";
import safes from "./safes";
import stores from "./stores";
import capitals from "./capitals";
import discounts from "./discounts";
import manufacturing from './manufacturing';
import shippings from './shipping';
import pointOfSales from "./pointOfSales";
import setting from "./setting";
import reports from "./reports";
import accounting from "./accounting";

// Admin pages
import container from "@/pages/container.vue";
import main from "@/pages/main.vue";

// GeneralViews
import NotFound from "@/pages/404.vue";
import login from "@/pages/login.vue";

const routes = [
  {
    path: "/",
    component: container,
    redirect: "/accounting",
    children: [
      { path: "/", name: "main", component: main },
      ...sales,
      ...purchase,
      ...safes,
      ...stores,
      ...capitals,
      ...discounts,
      ...manufacturing,
      ...shippings,
      ...pointOfSales,
      ...setting,
      ...reports,
      ...accounting,
    ],
  },
  { path: "/login", component: login },
  { path: "*", component: NotFound },
];

export default routes;
