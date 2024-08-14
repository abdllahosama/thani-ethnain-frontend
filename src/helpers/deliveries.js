import Vue from 'vue'

const deliveries = Vue.observable({ deliveries: {} });

Object.defineProperty(Vue.prototype, '$deliveries', {
    get() { return deliveries.deliveries; },
    set(value) { deliveries.deliveries = value; }
});

let deliveris = localStorage.getItem('deliveries') !== null ? JSON.parse(localStorage.getItem('deliveries')) : {} 
Vue.set(Vue.prototype, '$deliveries', deliveris)

Vue.prototype.$intPosDeliveries = function (id) {
    let deliveris = localStorage.getItem('deliveries') !== null ? JSON.parse(localStorage.getItem('deliveries')) : {}
    if (deliveris[id] === 'undefined' || deliveris[id] == null) {
        deliveris[id] = []
    }
    var pos = Vue.prototype.$database.pointOfSales.find(el => el.id == id)
    if (pos) {
        let deliveries = JSON.parse(pos.delivery_id)
        // add deliveries to pos
        deliveries.forEach((el) => {
            let delivery = Vue.prototype.$database.deliveries.find(del => del.id == el)
            let checkDelivery = deliveris[id].find(del => del.id == el)
            if (!checkDelivery) {
                
                deliveris[id].push({
                    id: delivery.id,
                    name: delivery.name,
                    onWay: false,
                    outDate: "",
                    inDate: ""
                })
            }
        })
    }

    localStorage.deliveries = JSON.stringify(deliveris)
    Vue.set(Vue.prototype, '$deliveries', deliveris)
}
Vue.prototype.$sendToOrder = function (id, index) {
    let deliveris  = Vue.prototype.$deliveries
    let delivery  = deliveris[id].find(el => el.id == index)
    if (delivery) {
        delivery.onWay = true
        delivery.outDate = Math.floor(Date.now() / 1000)
        localStorage.deliveries = JSON.stringify(deliveris)
        Vue.set(Vue.prototype, '$deliveries', deliveris)
    }
}

Vue.prototype.$returnDelivary = function (id, index) {
    var deliveris  = Vue.prototype.$deliveries
    let delivery  = deliveris[id].find(el => el.id == index)
    if (delivery) {
        delivery.onWay = false
        delivery.inDate = Math.floor(Date.now() / 1000)
        localStorage.deliveries = JSON.stringify(deliveris)
        Vue.set(Vue.prototype, '$deliveries', deliveris)
    }
}