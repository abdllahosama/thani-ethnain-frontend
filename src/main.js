import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import { i18n } from '@/helpers/i18n'
import VueApexCharts from 'vue-apexcharts';
import Multiselect from 'vue-multiselect';

import './print/print'
import '@/helpers/functions'
import '@/helpers/option'
import '@/helpers/user'
import '@/helpers/database'
import '@/helpers/localDatabase'
import '@/helpers/tables'
import '@/helpers/deliveries'
import '@/helpers/users'
import '@/helpers/posInvoices'
import './registerServiceWorker'


Vue.config.productionTip = false

Vue.use(VueApexCharts);
Vue.use( CKEditor );
Vue.component('apexchart', VueApexCharts);
Vue.prototype.$mainSite = 'rowaderp.com'

Vue.component('multiselect', Multiselect);


new Vue({
  router,
  i18n ,
  render: h => h(App),
}).$mount('#app')