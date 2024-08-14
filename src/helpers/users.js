import Vue from 'vue'

const users = Vue.observable({ users: {} });

Object.defineProperty(Vue.prototype, '$users', {
    get() { return users.users; },
    set(value) { users.users = value; }
});

let uses = localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : []
Vue.set(Vue.prototype, '$users', uses)


Vue.prototype.$getOflineUser = function (id) {
  var uses  = Vue.prototype.$users
  let user = uses.find(el => el.id == id)
  return user;
}
Vue.prototype.$saveUser = function (item) {
    let uses  = Vue.prototype.$users
    let user = uses.find(el => el.id == item.id)
    if (user) {
      user = item
    } else {
      uses.push(item)
    }
    localStorage.users = JSON.stringify(uses)
    Vue.set(Vue.prototype, '$users', uses)
}
Vue.prototype.$removeUser = function (id) {
    var uses  = Vue.prototype.$users
    uses = uses.filter(el => el.id != id)
    localStorage.users = JSON.stringify(uses)
    Vue.set(Vue.prototype, '$users', uses)
}
