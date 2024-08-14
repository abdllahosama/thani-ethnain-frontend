import Vue from 'vue'
import axios from 'axios'

const posInvoices = Vue.observable({ posInvoices: [] });

Object.defineProperty(Vue.prototype, '$posInvoices', {
    get() { return posInvoices.posInvoices; },
    set(value) { posInvoices.posInvoices = value; }
});

let posInvoics = localStorage.getItem('posInvoices') !== null ? JSON.parse(localStorage.getItem('posInvoices')) : []
Vue.set(Vue.prototype, '$posInvoices', posInvoics)

Vue.prototype.$savePosInvoice = function (item) {
    var posInvoics  = Vue.prototype.$posInvoices
    posInvoics.unshift(item)
    localStorage.posInvoices = JSON.stringify(posInvoics)
    Vue.set(Vue.prototype, '$posInvoices', posInvoics)
}

Vue.prototype.$getPosInvoice = function (id) {
    var posInvoics  = Vue.prototype.$posInvoices
    return posInvoics.find(el => el.upload_key == id)
}

Vue.prototype.$updatePosInvoice = function (pos, id)  {
    if (navigator.onLine) {
        var posInvoics  = Vue.prototype.$posInvoices
        axios.get(Vue.prototype.$linkGnirator('/posInvoices/' + pos + '/' + id), {params: {i: posInvoics.map(a => a.upload_key)}})
          .then(response => {
            var data = response.data
            data.forEach(PosInvoice => {
                PosInvoice.invoiceItems.forEach(el => {el.name = el.product_name})
                PosInvoice.subTotal = parseFloat(PosInvoice.subtotal)
                posInvoics.unshift(PosInvoice)}
            )
            posInvoics = posInvoics.filter(el => el.point_of_sale_id == pos &&  el.session_number == id)
            localStorage.posInvoices = JSON.stringify(posInvoics)
            Vue.set(Vue.prototype, '$posInvoices', posInvoics)
          })
      }
};