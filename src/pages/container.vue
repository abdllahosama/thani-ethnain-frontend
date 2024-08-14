<template>

  <div  :class="!showSdebar ? 'remove-sidebar': ''">
    <sidebar/>
    <div class="main-content" >
      <navbar :padding="showSdebar"/>
      <div class="form-stop-edit" v-if="stopEdit"></div>
      <alert :text="aletText" :type="alertType" v-if="aletText != null"></alert>
      <transition name="slide" mode="out-in" v-if="!loading">
        <router-view></router-view>
      </transition>
    </div>
    <div class="modal-backdrop fade show" v-if="model == 1"></div>


    <printAccountsDeposit   v-if="printedAccountsDeposit" :options="$option" />
    <printAccountsWithdrawal v-if="printedAccountsWithdrawal" :options="$option" />
    <printQuotation         v-if="printedQuotation" :options="$option" />
    <printInvoice           v-if="printedInvoice" :options="$option" />
    <printBill              v-if="printedBill" :options="$option" />
    <printSaleReturn        v-if="printedSaleReturn" :options="$option" />
    <printPurchaseReturn    v-if="printedPurchaseReturn" :options="$option" />

    <printOrderItem             v-if="printedOrderItem" :options="$option" />
    <printOrder             v-if="printedOrder" :options="$option" />
    <printDelevary v-if="printedDelevary" :options="$option" />

    <printPurchaseOrder     v-if="printedPurchaseOrder" :options="$option" />
    <printSalesPayment      v-if="printedSalesPayment" :options="$option" />
    <printPurchasePayment   v-if="printedPurchasePayment" :options="$option" />
    <printProjectsTransfer  v-if="printedProjectsTransfer" :options="$option" />
    <printExpense           v-if="printedExpense" :options="$option" />
    <printSafesDeposit      v-if="printedSafesDeposit" :options="$option" />
    <printSafesWithdrawal   v-if="printedSafesWithdrawal" :options="$option" />
    <printSafesTransfer     v-if="printedSafesTransfer" :options="$option" />
    <printSalesCheque       v-if="printedSalesCheque" :options="$option" />
    <printSalesDiscount     v-if="printedSalesDiscount" :options="$option" />
    <printPurchaseCheque    v-if="printedPurchaseCheque" :options="$option" />
    <printPurchaseDiscount  v-if="printedPurchaseDiscount" :options="$option" />
    <printStoresDeposit     v-if="printedStoresDeposit" :options="$option" />
    <printStoresWithdrawal  v-if="printedStoresWithdrawal" :options="$option" />
    <printEmployeesSalarie  v-if="printedEmployeesSalarie" :options="$option" />
    <printEmployeesIncentive  v-if="printedEmployeesIncentive" :options="$option" />
    <printEmployeesDeduction  v-if="printedEmployeesDeduction" :options="$option" />
    <printEmployeesWithdrawal  v-if="printedEmployeesWithdrawal" :options="$option" />
    <printStoresTransfer    v-if="printedStoresTransfer" :options="$option" />
    <printPointOfSale       v-if="printPointOfSale"/>
    <printShippingOperation v-if="printShippingOperation" />
  </div>

</template>
<script>

  import axios from 'axios'

  import navbar from '@/includes/navbar.vue'
  import sidebar from '@/includes/sidebar.vue'
  import alert from '@/includes/alert.vue'

  import printAccountsDeposit from '../print/accountsDeposit.vue'
  import printAccountsWithdrawal from '../print/accountsWithdrawal.vue'
  import printQuotation from '../print/quotation.vue'
  import printInvoice from '../print/invoice.vue'
  import printBill from '../print/bill.vue'
  import printSaleReturn from '../print/saleReturn.vue'
  import printPurchaseReturn from '../print/purchaseReturn.vue'

  import printOrderItem from '../print/orderItem.vue'
  import printOrder from '../print/order.vue'
  import printDelevary from '../print/printDelevary.vue'

  import printPurchaseOrder from '../print/purchaseOrder.vue'
  import printSalesPayment from '../print/salesPayment.vue'
  import printPurchasePayment from '../print/purchasePayment.vue'
  import printPointOfSale from '../print/pointOfSale.vue'
  import printShippingOperation from '../print/shippingOperation.vue'

  import printExpense from '../print/expense.vue'

  import printEmployeesSalarie from '../print/employeesSalarie.vue'
  import printEmployeesIncentive from '../print/employeesIncentive.vue'
  import printEmployeesDeduction from '../print/employeesDeduction.vue'
  import printEmployeesWithdrawal from '../print/employeesWithdrawal.vue'
  import printSafesDeposit from '../print/safesDeposit.vue'
  import printSafesWithdrawal from '../print/safesWithdrawal.vue'
  import printSafesTransfer from '../print/safesTransfer.vue'
  import printSalesCheque from '../print/salesCheque.vue'
  import printSalesDiscount from '../print/salesDiscount.vue'
  import printPurchaseCheque from '../print/purchaseCheque.vue'
  import printPurchaseDiscount from '../print/purchaseDiscount.vue'
  import printProjectsTransfer from '../print/projectsTransfer.vue'
  import printStoresDeposit from '../print/storesDeposit.vue'
  import printStoresWithdrawal from '../print/storesWithdrawal.vue'
  import printStoresTransfer from '../print/storesTransfer.vue'
  export default {
    data() {
      return {
        model: 0,
        loading: true,
        aletText: null,
        alertType: null,
        showSdebar: true,
        showMobileNave: false,
        showMobileMnue: false,
        stopEdit: false,
        conectStat: navigator.onLine ? 1 : 0,

        printedAccountsDeposit: false,
        printedAccountsWithdrawal: false,
        printedQuotation: false,
        printedInvoice: false,
        printedBill: false,
        printedSaleReturn: false,
        printedPurchaseReturn: false,

        printedOrder: false,
        printedDelevary: false,
        printedOrderItem: false,
        printedOrderItemId: false,

        printedPurchaseOrder: false,
        printedSalesPayment: false,
        printedPurchasePayment: false,
        printedExpense: false,
        printedSafesDeposit: false,
        printedSafesWithdrawal: false,
        printedSafesTransfer: false,
        printedSalesCheque: false,
        printedSalesDiscount: false,
        printedEmployeesSalarie: false,
        printedEmployeesIncentive: false,
        printedEmployeesDeduction: false,
        printedEmployeesWithdrawal: false,
        printedPurchaseCheque: false,
        printedPurchaseDiscount: false,
        printedProjectsTransfer: false,
        printedStoresDeposit: false,
        printedStoresWithdrawal: false,
        printedStoresTransfer: false,
        printPointOfSale: false,
        printShippingOperation: false
      }
    },
    methods: {
      printAccountsDeposit(id) {
        axios.get(this.$linkGnirator('/accountsDeposits/' + id)).then(response => {
          this.printedAccountsDeposit = response.data
        })
      },
      printAccountsWithdrawal(id) {
        axios.get(this.$linkGnirator('/accountsWithdrawals/' + id)).then(response => {
          this.printedAccountsWithdrawal = response.data
        })
      },
      printQuotation(id) {
        axios.get(this.$linkGnirator('/quotations/' + id)).then(response => {
          this.printedQuotation = response.data
        })
      },
      printInvoice(id) {
        axios.get(this.$linkGnirator('/invoices/' + id)).then(response => {
          this.printedInvoice = response.data
        })
      },
      printBill(id) {
        axios.get(this.$linkGnirator('/bills/' + id)).then(response => {
          this.printedBill = response.data
        })
      },
      printEmployeesSalarie(id) {
        axios.get(this.$linkGnirator('/employeesSalaries/' + id)).then(response => {
          this.printedEmployeesSalarie = response.data
        })
      },
      printEmployeesIncentive(id) {
        axios.get(this.$linkGnirator('/employeesIncentives/' + id)).then(response => {
          this.printedEmployeesIncentive = response.data 
        })
      },
      printEmployeesDeduction(id) { 
        axios.get(this.$linkGnirator('/employeesDeductions/' + id)).then(response => {
          this.printedEmployeesDeduction = response.data
        })
      },
      printEmployeesWithdrawal(id) { 
        axios.get(this.$linkGnirator('/employeesWithdrawals/' + id)).then(response => {
          this.printedEmployeesWithdrawal = response.data
        })
      },
      printSaleReturn(id) {
        axios.get(this.$linkGnirator('/saleReturns/' + id)).then(response => {
          this.printedSaleReturn = response.data
        })
      },
      printSalesDiscount(id) {
        axios.get(this.$linkGnirator('/salesDiscounts/' + id)).then(response => {
          this.printedSalesDiscount = response.data
        })
      },
      printPurchaseReturn(id) {
        axios.get(this.$linkGnirator('/purchaseReturns/' + id)).then(response => {
          this.printedSalesDiscount = response.data
        })
      },
      printOrder(id) {
        axios.get(this.$linkGnirator('/orders/' + id)).then(response => {
          this.printedOrder = response.data
        })
      },
      printDelevary(id) {
        axios.get(this.$linkGnirator('/orders/' + id)).then(response => {
          this.printedDelevary = response.data
        })
      },
      printPurchaseOrder(id) {
        axios.get(this.$linkGnirator('/purchaseOrders/' + id)).then(response => {
          this.printedPurchaseOrder = response.data
        })
      },
      printSalesPayment(id) {
        axios.get(this.$linkGnirator('/salesPayments/' + id)).then(response => {
          this.printedSalesPayment = response.data
        })
      },
      printPurchasePayment(id) {
        axios.get(this.$linkGnirator('/purchasePayments/' + id)).then(response => {
          this.printedPurchasePayment = response.data
        })
      },
      printExpense(id) {
        axios.get(this.$linkGnirator('/expenses/' + id)).then(response => {
          this.printedExpense = response.data
        })
      },
      printSafesDeposit(id) {
        axios.get(this.$linkGnirator('/safesDeposits/' + id)).then(response => {
          this.printedSafesDeposit = response.data
        })
      },
      printSafesWithdrawal(id) {
        axios.get(this.$linkGnirator('/safesWithdrawals/' + id)).then(response => {
          this.printedSafesWithdrawal = response.data
        })
      },
      printSafesTransfer(id) {
        axios.get(this.$linkGnirator('/safesTransfers/' + id)).then(response => {
          this.printedSafesTransfer = response.data
        })
      },
      printSalesCheque(id) {
        axios.get(this.$linkGnirator('/salesCheques/' + id)).then(response => {
          this.printedSalesCheque = response.data
        })
      },
      printPurchaseCheque(id) {
        axios.get(this.$linkGnirator('/purchaseCheques/' + id)).then(response => {
          this.printedPurchaseCheque = response.data
        })
      },
      printPurchaseDiscount(id) {
        axios.get(this.$linkGnirator('/purchaseDiscounts/' + id)).then(response => {
          this.printedPurchaseDiscount = response.data
        })
      },
      printProjectsTransfer(id) {
        axios.get(this.$linkGnirator('/projectsTransfers/' + id)).then(response => {
          this.printedProjectsTransfer = response.data
        })
      },
      printStoresDeposit(id) {
        axios.get(this.$linkGnirator('/storesDeposits/' + id)).then(response => {
          this.printedStoresDeposit = response.data
        })
      },
      printStoresWithdrawal(id) {
        axios.get(this.$linkGnirator('/storesWithdrawals/' + id)).then(response => {
          this.printedStoresWithdrawal = response.data
        })
      },
      printStoresTransfer(id) {
        axios.get(this.$linkGnirator('/storesTransfers/' + id)).then(response => {
          this.printedStoresTransfer = response.data
        })
      }
    },
    components: {
      navbar,
      sidebar,
      alert,
      printAccountsDeposit,
      printAccountsWithdrawal,
      printQuotation,
      printInvoice,
      printBill,
      printSaleReturn,
      printPurchaseReturn,

      printOrder,
      printOrderItem,
      printDelevary,

      printPurchaseOrder,
      printSalesPayment,
      printPurchasePayment,
      printPointOfSale,
      printShippingOperation,

      printExpense,

      printSafesDeposit,
      printSafesWithdrawal,
      printSafesTransfer,
      printSalesCheque,
      printSalesDiscount,
      printPurchaseCheque,
      printPurchaseDiscount,
      printEmployeesSalarie,
      printEmployeesIncentive,
      printEmployeesDeduction,
      printEmployeesWithdrawal,

      printProjectsTransfer,


      printStoresDeposit,
      printStoresWithdrawal,
      printStoresTransfer
    },
    mounted() {
      var token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
      } else {
        this.loading = false
        this.$intUser()
        this.$initCompany()
        this.$getUser()
        this.$getCompanies()
        this.$localStore()
        this.$updateDatabase()
        if (this.$user.language == 'ar') {
          document.getElementById('stylesheetRtl').disabled = false
          this.$i18n.locale = 'ar'
        } else {
          document.getElementById('stylesheetRtl').disabled = true
          this.$i18n.locale = 'en'
        }
      }

      window.addEventListener('online', () => {
        this.conectStat = 1
      })
      window.addEventListener('offline', () => {
        this.conectStat = 0
      })

      /*window.addEventListener("keyup", function (e) {
        if (e.key == "Backspace") {
           e.preventDefault()
           var inputs = ["input", "select", "button", "textarea"];
            if (inputs.indexOf(document.activeElement.tagName.toLowerCase()) == -1) {
              history.back() 
            }         
        }
      });*/
    },
    watch: {
      aletText: function() {
        setTimeout(() => {
          this.aletText = null
          this.alertType = null
        }, 4000)
      },
      $route: function() {
        this.stopEdit = false
        document.body.classList.remove('menu-open')
        this.showMobileMnue = false
        this.model = 0
        window.scrollTo({ top: 0 })
        document.documentElement.classList.remove('overflow-hidden')
        if (this.$route.name != "pointOfSalesShow") {
          this.showSdebar = true;
        }
      }
    }
  }

</script>
<style>

  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.4s, transform 0.4s;
  }
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: scale(0.97);
  }

</style>
