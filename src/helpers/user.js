import Vue from 'vue'
import axios from 'axios'
import VueRouter from "vue-router";

const user = Vue.observable({ user: {role: {}} });
Object.defineProperty(Vue.prototype, '$user', {
    get() { return user.user; },
    set(value) { user.user = value; }
  });


const site = Vue.observable({ site: [] });
Object.defineProperty(Vue.prototype, '$site', {
    get() { return site.site; },
    set(value) { site.site = value; }
  });

Vue.prototype.$intUser = function () {
  if (localStorage.getItem('user') !== null) {
    Vue.set(Vue.prototype, '$user',  JSON.parse(localStorage.getItem('user')))
  }
  if (localStorage.getItem('Esite') !== null) {
    Vue.set(Vue.prototype, '$site',  JSON.parse(localStorage.getItem('Esite')))
  }
}

Vue.prototype.$getUser = function () {
    axios
      .get(Vue.prototype.$linkGnirator('/getUser'))
      .then(response => {
        Vue.set(Vue.prototype, '$user', response.data.user)
        Vue.set(Vue.prototype, '$site', response.data.site)
        localStorage.setItem('user', JSON.stringify(Vue.prototype.$user))
        localStorage.setItem('Esite', JSON.stringify(Vue.prototype.$site))

      })
      .catch(error => {
        if (typeof error.response !== 'undefined' && error.response.data == 'toLogin') {
            Vue.prototype.$logout()
        }
      })
}

Vue.prototype.$logout = function () {
    if (localStorage.getItem('softLogout') == 1) {
        Vue.prototype.$saveUser({
          id: Vue.prototype.$user.id,
          name: Vue.prototype.$user.name,
          image: Vue.prototype.$user.img,
          token: localStorage.getItem('token'),
          companies: localStorage.getItem('companies'),
          company: localStorage.getItem('company'),
          database: localStorage.getItem('database'),
          subdomain: localStorage.getItem('subdomain'),
          auth: localStorage.getItem('auth'),
          site: localStorage.getItem('site'),
          user: localStorage.getItem('user')

      })
    }

    localStorage.removeItem('token')
    localStorage.removeItem('companies')
    localStorage.removeItem('database')
    localStorage.removeItem('company')
    localStorage.removeItem('subdomain')
    localStorage.removeItem('auth')
    localStorage.removeItem('site')
    window.location.hash = '#/login';
}
