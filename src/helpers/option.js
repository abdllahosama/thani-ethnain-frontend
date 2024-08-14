import Vue from 'vue'
import axios from 'axios'

const option = Vue.observable({ option: {} });
Object.defineProperty(Vue.prototype, '$option', {
    get() { return option.option; },
    set(value) { option.option = value; }
});


const companies = Vue.observable({ companies: {} });
Object.defineProperty(Vue.prototype, '$companies', {
    get() { return companies.companies; },
    set(value) { companies.companies = value; }
});

Vue.prototype.$initCompany = function () {
    if (localStorage.getItem('companies') !== null) {
        Vue.set(Vue.prototype, '$companies',  JSON.parse(localStorage.getItem('companies')))
        Vue.set(Vue.prototype, '$option',  Vue.prototype.$companies.find(el => el.id == localStorage.getItem('company')))
        if (typeof Vue.prototype.$option !== 'undefined' && Vue.prototype.$option !== null) {
        var printAT =
        Vue.prototype.$option.print_type == 1 || Vue.prototype.$option.print_type == 3
            ? '.sup_data {display:none} .table thead th {padding: 0.2rem;}.table thead th {padding: 0.2rem;}.table thead th{font-size: 11px;font-weight: 700;padding: 0.2rem;}.table td, .table th {padding: 0.2rem;vertical-align: top;border-top: 1px solid #000;border-left: 1px solid #000;font-size: 11px;font-weight: 600;}.table-hover {margin: 10px;width: calc(100% - 20px);}'
            : ''

        var invoiceFrame = document.getElementById('inviceIframe')
        invoiceFrame.contentDocument.head.innerHTML =
            '<meta charset="utf-8" /><style>' + Vue.prototype.$print + Vue.prototype.$option.invoice_css + '</style>'
        var reportFrame = document.getElementById('printIframe')
        reportFrame.contentDocument.head.innerHTML =
            '<meta charset="utf-8" /><style>' + Vue.prototype.$print + printAT + Vue.prototype.$option.invoice_css + '</style>'

            reportFrame.contentDocument.body.classList.add("reportStyle");


        document.getElementById('stylesheetClassic').disabled = true
        
        document.getElementById('stylesheetTheme1').disabled = true
        document.getElementById('stylesheetTheme2').disabled = true
        document.getElementById('stylesheetTheme3').disabled = true
        document.getElementById('stylesheetTheme4').disabled = true
        document.getElementById('stylesheetTheme5').disabled = true
        
        if (Vue.prototype.$option.theme_type == 0) {
            document.getElementById('stylesheetClassic').disabled = false
        } else {
            document.getElementById('stylesheetTheme' + Vue.prototype.$option.theme_type).disabled = false
        }
        }
    }
}

Vue.prototype.$getCompanies = function () {
    axios.get(Vue.prototype.$linkGnirator('/getCompanies')).then(response => {
      Vue.set(Vue.prototype, '$companies',  response.data.companies)
      localStorage.setItem('companies', JSON.stringify(Vue.prototype.$companies))
      Vue.set(Vue.prototype, '$option',  Vue.prototype.$companies.find(el => el.id == localStorage.getItem('company')))
      if (Vue.prototype.$option !== null) {
        var printAT =
        Vue.prototype.print_type == 1 || Vue.prototype.print_type == 3
            ? '.sup_data {display:none} .table thead th {padding: 0.2rem;}.table thead th{font-size: 11px;font-weight: 700;padding: 0.2rem;}.table td, .table th {padding: 0.2rem;vertical-align: top;border-top: 1px solid #000;border-left: 1px solid #000;font-size: 11px;font-weight: 600;}.table-hover {margin: 10px;width: calc(100% - 20px);}'
            : ''

        var invoiceFrame = document.getElementById('inviceIframe')
        invoiceFrame.contentDocument.head.innerHTML =
          '<meta charset="utf-8" /><style>' + Vue.prototype.$print + Vue.prototype.$option.invoice_css + '</style>'
        var reportFrame = document.getElementById('printIframe')
        reportFrame.contentDocument.head.innerHTML =
          '<meta charset="utf-8" /><style>' + Vue.prototype.$print + printAT + Vue.prototype.$option.invoice_css + '</style>'
          reportFrame.contentDocument.body.classList.add("reportStyle");

      }
      if (Vue.prototype.$option.image) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          var base_image = new Image();
          base_image.crossOrigin = "anonymous";

          base_image.src = Vue.prototype.$linkGnirator('/companiesUploads/' + localStorage.getItem('subdomain') + '/logos/' + Vue.prototype.$option.image, true);
          base_image.onload = function() {
              canvas.width = base_image.width
              canvas.height = base_image.height
              ctx.drawImage(base_image, 0, 0)
              localStorage.setItem('logo', canvas.toDataURL('image/png'))
              canvas.remove()
          }
      } else {
        invoiceFrame.contentDocument.body.innerHTML = "<p class='barcode'> *123456789* </p><p class='barcode'> *{{item.code}}* </p>"
      }


      document.getElementById('stylesheetClassic').disabled = true
        
      document.getElementById('stylesheetTheme1').disabled = true
      document.getElementById('stylesheetTheme2').disabled = true
      document.getElementById('stylesheetTheme3').disabled = true
      document.getElementById('stylesheetTheme4').disabled = true
      document.getElementById('stylesheetTheme5').disabled = true
      
      if (Vue.prototype.$option.theme_type == 0) {
        document.getElementById('stylesheetClassic').disabled = false
      } else {
        document.getElementById('stylesheetTheme' + Vue.prototype.$option.theme_type).disabled = false
      }
    })
}

Vue.prototype.$changeCompany = function (id) {
    if (id != Vue.prototype.$option.id) {
      localStorage.removeItem('database')
      localStorage.removeItem('company')

      localStorage.setItem('company', id)
      Vue.set(Vue.prototype, '$option',  Vue.prototype.$companies.find(el => el.id == localStorage.getItem('company')))
      
      var printAT =
      Vue.prototype.$option.print_type == 1 || Vue.prototype.$option.print_type == 3
          ? '.sup_data {display:none} .table thead th {padding: 0.2rem;}.table thead th{font-size: 11px;font-weight: 700;padding: 0.2rem;}.table td, .table th {padding: 0.2rem;vertical-align: top;border-top: 1px solid #000;border-left: 1px solid #000;font-size: 11px;font-weight: 600;}.table-hover {margin: 10px;width: calc(100% - 20px);}'
          : ''

      var invoiceFrame = document.getElementById('inviceIframe')
      invoiceFrame.contentDocument.head.innerHTML =
        '<meta charset="utf-8" /><style>' + Vue.prototype.$print + Vue.prototype.$option.invoice_css + '</style>'
      var reportFrame = document.getElementById('printIframe')
      reportFrame.contentDocument.head.innerHTML =
        '<meta charset="utf-8" /><style>' + Vue.prototype.$print + printAT + Vue.prototype.$option.invoice_css + '</style>'
        reportFrame.contentDocument.body.classList.add("reportStyle");


      localStorage.setItem('auth', '?token=' + localStorage.getItem('token') + '&company=' + id)

      if (Vue.prototype.$option.image) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          var base_image = new Image();
          base_image.crossOrigin = "anonymous";
          base_image.src = Vue.prototype.$linkGnirator('/companiesUploads/' + localStorage.getItem('subdomain') + '/logos/' + Vue.prototype.$option.image, true);
          base_image.onload = function() {
              canvas.width = base_image.width
              canvas.height = base_image.height
              ctx.drawImage(base_image, 0, 0)
              localStorage.setItem('logo', canvas.toDataURL('image/png'))
              canvas.remove()
          }
      }
      
      Vue.prototype.$router.push('/')
      Vue.prototype.$localStore()
      Vue.prototype.$updateDatabase()
    }
}

Vue.prototype.$localStore = function () {
    axios.get(Vue.prototype.$linkGnirator('/localData')).then(response => {
      localStorage.quotationsCashe       = JSON.stringify(response.data.quotations)
      localStorage.invoicesCashe         = JSON.stringify(response.data.invoices)
      localStorage.billsCashe            = JSON.stringify(response.data.bills)
      localStorage.saleReturnsCashe      = JSON.stringify(response.data.saleReturns)
      localStorage.purchaseReturnsCashe  = JSON.stringify(response.data.purchaseReturns)
      localStorage.ordersCashe           = JSON.stringify(response.data.orders)
      localStorage.purchaseOrdersCashe   = JSON.stringify(response.data.purchaseOrders)
      localStorage.salesPaymentsCashe    = JSON.stringify(response.data.salespayments)
      localStorage.purchasePaymentsCashe = JSON.stringify(response.data.purchasepayments)
      localStorage.expensesCashe         = JSON.stringify(response.data.expenses)
      localStorage.companiesCashe        = JSON.stringify(response.data.companies)
      localStorage.rolesCashe            = JSON.stringify(response.data.roles)
      localStorage.usersCashe            = JSON.stringify(response.data.users)
    })
}
