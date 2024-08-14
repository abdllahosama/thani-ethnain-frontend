<template>
  <vue-custom-scrollbar
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
    :class="isActive ? 'active': ''"
    :settings="settings"
    v-click-outside="removeMobileMnue"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarCollapse"
        aria-controls="sidebarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMobile"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarCollapse"
        aria-controls="sidebarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="
          $parent.showMobileNave = !$parent.showMobileNave;
          $parent.showMobileMnue = false;
        "
      >
        <router-link
          :to="'/profile'"
          class="navbar-user-link nav-icon dropdown-toggle w-100"
          v-if="$user.admin || $user.role.profile_edit"
        >
          <span class="icon"> <i class="far fa-user"></i> {{ $user.name }} </span>
        </router-link>
        <div
          class="navbar-user-link nav-icon dropdown-toggle w-100"
          v-if="!$user.admin && !$user.role.profile_edit"
        >
          <span class="icon"> <i class="far fa-user"></i> {{ $user.name }} </span>
        </div>
      </button>
      
        <!-- ............text input with search............... -->
        <div class="form-group has-search search-sidebar-style ">
            <i class="fa fa-search form-control-feedback"></i>
            <input
              type="text"
              v-model="searchValue"
              class="form-control form-control-sm"
              placeholder="بحث"
              @keyup="searchLink()"
              @focus="searchLink()"
              v-click-outside="removeSearch"
            />
            
        </div>
      <vue-custom-scrollbar
      :settings="settings2"
      class="collapse navbar-collapse"
      :class="{ show: $parent.showMobileMnue }"
      id="sidebarCollapse"
      >

      <ul v-if="showSearchStat && selectedLinks.length != 0 " class="navbar-nav">
        <singleItem
            v-for="(link, index) in selectedLinks"
            :to="link.link.substring(1)"
            :icon="'far fa-file'"
            :headname="link.name"
            :key="index"
        />
        </ul>
        <ul class="navbar-nav" v-if="!showSearchStat || selectedLinks.length == 0">
          <singleItem
            :to="''"
            :icon="'far fa-tachometer-alt-fastest'"
            :headname="$t('sidebar.dashboard')"
          ></singleItem>
        </ul>
        <hr class="navbar-divider my-3"  v-if="!showSearchStat || selectedLinks.length == 0" />

        <ul class="navbar-nav" v-if="!showSearchStat || selectedLinks.length == 0">
          <!--الشكل الجديييد-->

          <multiItem
            :icon="'far fa-chart-line'"
            :headname="$t('sidebar.sales')"
            v-if="
              ($site.customers_allow ||
                $site.quotations_allow ||
                $site.invoices_allow ||
                $site.saleReturns_allow ||
                $site.orders_allow ) &&
              ($user.admin ||
                $user.role.customers_show ||
                $user.role.quotations_show ||
                $user.role.invoices_show ||
                $user.role.sale_returns_show ||
                $user.role.orders_show)
            "
            :items="[
              {
                name: $t('sidebar.customers'),
                link: '/customers',
                role:
                  $site.customers_allow &&
                  ($user.admin || $user.role.customers_show),
              },
              {
                name: $t('sidebar.estimates'),
                link: '/quotations',
                role:
                  $site.quotations_allow &&
                  ($user.admin || $user.role.quotations_show),
              },
              {
                name: $t('sidebar.salesInvoices'),
                link: '/invoices',
                role:
                  $site.invoices_allow &&
                  ($user.admin || $user.role.invoices_show),
              },
              {
                name: $t('sidebar.salesReturns'),
                link: '/saleReturns',
                role:
                  $site.saleReturns_allow &&
                  ($user.admin || $user.role.sale_returns_show),
              },
              {
                name: $t('sidebar.saleOrders'),
                link: '/orders',
                role:
                  $site.orders_allow &&
                  ($user.admin || $user.role.orders_show),
              },
            ]"
          />

          <multiItem
            :icon="'far fa-shopping-cart'"
            :headname="$t('sidebar.purchases')"
            v-if="
              ($site.suppliers_allow ||
                $site.bills_allow ||
                $site.purchaseReturns_allow ) &&
              ($user.admin ||
                $user.role.suppliers_show ||
                $user.role.bills_show ||
                $user.role.purchase_returns_show )
            "
            :items="[
              {
                name: $t('sidebar.suppliers'),
                link: '/suppliers',
                role:
                  $site.suppliers_allow &&
                  ($user.admin || $user.role.suppliers_show),
              },
              {
                name: $t('sidebar.bills'),
                link: '/bills',
                role:
                  $site.bills_allow &&
                  ($user.admin || $user.role.bills_show),
              },
              {
                name: $t('sidebar.purchaseReturns'),
                link: '/purchaseReturns',
                role:
                  $site.purchaseReturns_allow &&
                  ($user.admin || $user.role.purchase_returns_show),
              }
            ]"
          />

          <multiItem
            :icon="'far fa-treasure-chest'"
            :headname="$t('sidebar.Safes')"
            v-if="
              ($site.safes_allow ||
                $site.safesDeposits_allow ||
                $site.safesWithdrawals_allow ||
                $site.safesTransfers_allow ||
                $site.bankAccounts_allow ||
                $site.salesPayments_allow ||
                $site.purchasePayments_allow ||
                $site.expenses_allow ||
                $site.salesDiscounts_allow ||
                $site.purchaseDiscounts_allow) &&
              ($user.admin ||
                $user.role.safes_show ||
                $user.role.safes_deposits_show ||
                $user.role.safes_withdrawals_show ||
                $user.role.safes_transfers_show ||
                $user.role.bank_accounts_show ||
                $user.role.sales_payments_show ||
                $user.role.purchase_payments_show ||
                $user.role.expenses_show ||
                $user.role.sales_discounts_show ||
                $user.role.purchase_discounts_show)
            "
            :items="[
              {
                name: $t('sidebar.lockersList'),
                link: '/safes',
                role:
                  $site.safes_allow &&
                  ($user.admin || $user.role.safes_show),
              },
              {
                name: $t('sidebar.bankAccounts'),
                link: '/bankAccounts',
                role:
                  $site.bankAccounts_allow &&
                  ($user.admin || $user.role.bank_accounts__show),
              },
              {
                name: $t('sidebar.salePayments'),
                link: '/salesPayments',
                role:
                  $site.salesPayments_allow &&
                  ($user.admin || $user.role.sales_payments_show),
              },
              {
                name: $t('sidebar.purchasePayments'),
                link: '/purchasePayments',
                role:
                  $site.purchasePayments_allow &&
                  ($user.admin || $user.role.purchase_payments_show),
              },
              {
                name: $t('sidebar.Expenses'),
                link: '/expenses',
                role:
                  $site.expenses_allow &&
                  ($user.admin || $user.role.expenses_show),
              },
              {
                name: 'ايرادات',
                link: '/incomes',
                role:
                  $site.expenses_allow &&
                  ($user.admin || $user.role.expenses_show),
              },
              
              {
                name: $t('sidebar.Deposits'),
                link: '/safesDeposits',
                role:
                  $site.safesDeposits_allow &&
                  ($user.admin || $user.role.safes_deposits_show),
              },
              {
                name: $t('sidebar.Withdrawals'),
                link: '/safesWithdrawals',
                role:
                  $site.safesWithdrawals_allow &&
                  ($user.admin || $user.role.safes_withdrawals_show),
              },
              {
                name: $t('sidebar.Transfers'),
                link: '/safesTransfers',
                role:
                  $site.safesTransfers_allow &&
                  ($user.admin || $user.role.safes_transfers_show),
              }
            ]"
          />

          <multiItem
            :icon="'far fa-store-alt'"
            :headname="$t('sidebar.stores')"
            v-if="
              ($site.stores_allow ||
                $site.storesDeposits_allow ||
                $site.storesWithdrawals_allow ||
                $site.storesTransfers_allow) &&
              ($user.admin ||
                $user.role.stores_show ||
                $user.role.products_show ||
                $user.role.stores_deposits_show ||
                $user.role.stores_withdrawals_show ||
                $user.role.stores_transfers_show)
            "
            :items="[
              {
                name: $t('sidebar.storesList'),
                link: '/stores',
                role:
                  $site.stores_allow &&
                  ($user.admin || $user.role.stores_show),
              },
              {
                name: $t('sidebar.productsAndServices'),
                link: '/products',
                role: $user.admin || $user.role.products_show,
              },
              {
                name: $t('sidebar.Deposits'),
                link: '/storesDeposits',
                role:
                  $site.storesDeposits_allow &&
                  ($user.admin || $user.role.stores_deposits_show),
              },
              {
                name: $t('sidebar.Withdrawals'),
                link: '/storesWithdrawals',
                role:
                  $site.storesWithdrawals_allow &&
                  ($user.admin || $user.role.stores_withdrawals_show),
              },
              {
                name: $t('sidebar.Transfers'),
                link: '/storesTransfers',
                role:
                  $site.storesTransfers_allow &&
                  ($user.admin || $user.role.stores_transfers_show),
              },
            ]"
          />

          <multiItem
            :icon="'far fa-badge-percent'"
            :headname="$t('sidebar.Discounts')"
            v-if="
              ($site.salesDiscounts_allow ||
                $site.purchaseDiscounts_allow) &&
              ($user.admin ||
                $user.role.sales_discounts_show ||
                $user.role.purchase_discounts_show)
            "
            :items="[
              {
                name: $t('sidebar.salesDiscounts'),
                link: '/salesDiscounts',
                role:
                  $site.salesDiscounts_allow &&
                  ($user.admin || $user.role.sales_discounts_show),
              },
              {
                name: $t('sidebar.purchaseDiscounts'),
                link: '/purchaseDiscounts',
                role:
                  $site.purchaseDiscounts_allow &&
                  ($user.admin || $user.role.purchase_discounts_show),
              },
            ]"
          />


          <singleItem
            :to="'capitals'"
            :icon="'far fa-building'"
            headname="الأصول الثابتة"
            v-if="$site.capitals_allow && ($user.admin || $user.role.capitals_show )"
          />

          <multiItem
            :icon="'far fa-hammer'"
            :headname="$t('sidebar.ManufacturingProcesses')"
            v-if="
              ($site.manufacturingModels_allow ||
                $site.manufacturingOperations_allow) &&
              ($user.admin ||
                $user.role.manufacturing_models_show ||
                $user.role.manufacturing_operations_show)
            "
            :items="[
              {
                name: $t('sidebar.ManufacturingModels'),
                link: '/manufacturingModels',
                role:
                  $site.manufacturingModels_allow &&
                  ($user.admin || $user.role.manufacturing_models_show),
              },
              {
                name: $t('sidebar.OperationsList'),
                link: '/manufacturingOperations',
                role:
                  $site.manufacturingOperations_allow &&
                  ($user.admin || $user.role.manufacturing_operations_show),
              },
              {
                name: $t('sidebar.materialDeposit'),
                link: '/manufacturingDeposits',
                role:
                  $site.manufacturingOperations_allow &&
                  ($user.admin || $user.role.manufacturing_operations_show),
              },
              {
                name: $t('sidebar.productsWithdrawal'),
                link: '/manufacturingWithdrawals',
                role:
                  $site.manufacturingOperations_allow &&
                  ($user.admin || $user.role.manufacturing_operations_show),
              },
            ]"
          />

          <multiItem
            :icon="'far fa-shipping-fast'"
            :headname="$t('sidebar.Shipping')"
            v-if="
              $site.cities_allow &&
              ($user.admin || $user.role.cities_show)
            "
            :items="[
              { name: $t('sidebar.freightForwarders'), link: '/deliveries', role: true },
              {
                name: 'قائمة الدخل',
                link: '/cities',
                role:
                  $site.cities_allow &&
                  ($user.admin || $user.role.cities_show),
              },
              {
                name: $t('sidebar.pickupLocations'),
                link: '/pickupLocations',
                role:
                  $site.cities_allow &&
                  ($user.admin || $user.role.cities_show),
              },
              {
                name: $t('sidebar.shippingOperations'),
                link: '/shippingOperations',
                role:
                  $site.cities_allow &&
                  ($user.admin || $user.role.cities_show),
              },
              {
                name: $t('sidebar.shippingAddresses'),
                link: '/shippingAddresses',
                role:
                  $site.cities_allow &&
                  ($user.admin || $user.role.cities_show),
              },
            ]"
          />


          <singleItem
            :to="'pointOfSales'"
            :icon="'far fa-cash-register'"
            :headname="$t('sidebar.pointsOfSale')"
            v-if="
              $site.pointOfSales_allow &&
              ($user.admin || $user.role.point_of_sales_show)
            "
          />
        </ul>
        <ul
          class="navbar-nav"
          v-if="
            $site.reports_allow &&
            ($user.admin || $user.role.reports_show) &&
            (!showSearchStat || selectedLinks.length == 0)
          "
        >
          <singleItem
            :to="'mainReport'"
            :icon="'far fa-chart-bar'"
            :headname="$t('sidebar.Reports')"
            v-if="$user.admin || $user.role.reports_show"
          />
          <multiItem
            :icon="'far fa-balance-scale'"
            :headname="$t('sidebar.Accounting')"
            v-if="$user.admin || $user.role.accounting_show"
            :items="[
              {
                name: $t('sidebar.ProfitsAndLosses'),
                link: '/profitsAndLosses',
                role: true,
              },
              { 
                name: $t('sidebar.BalanceSheet'), 
                link: '/totalReport', 
                role: true 
              },
              {
                name: $t('sidebar.ProfitsByInvoices'),
                link: '/profitsByInvoices',
                role: true,
              },
              {
                name: $t('sidebar.dailyRestrictions'),
                link: '/dailyRestrictions',
                role: true,
              },
            ]"
          />
        </ul>
        <div class="mt-auto" v-if="!showSearchStat || selectedLinks.length == 0"></div>
        <ul class="navbar-nav" v-if="!showSearchStat || selectedLinks.length == 0">
          <singleItem
            :to="'options'"
            :icon="'far fa-cog'"
            :headname="$t('sidebar.settings')"
            v-if="$user.admin || $user.role.options_show"
          />

          <li class="nav-item">
            <a class="nav-link c-pointer" @click="$logout">
              <i class="far fa-sign-out"></i> {{ $t("sidebar.logout") }}
            </a>
          </li>
        </ul>
      </vue-custom-scrollbar>
    </div>
    <div class="sidebar-user">
      <router-link :to="'/profile'">
        <div class="sidebar-user-flex">
          <div class="sidebar-user-img" :style="shownImage ? 'background-image: ' + shownImage + ';' : ''"></div>
          <div class="sidebar-user-info">
            <h3>{{$user.name}}</h3>
            <p>{{$user.email}}</p>
          </div>
        </div>
       </router-link>
    </div>
  </vue-custom-scrollbar>
</template>
<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import singleItem from "@/elements/sidebar/singleItem.vue";
import multiItem from "@/elements/sidebar/multiItem.vue";
export default {
  data() {
    return {
      shownImage: '',
      isActive: false,
      showMobileMnue: false,
      logo: localStorage.getItem("logo"),
      optionsbar: false,
      sidebarBasics: false,
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false,
      },
      settings2: {
        suppressScrollY: false,
        suppressScrollX: true,
      },
      searchValue: "",
      showSearchStat: false,
      selectedLinks: [],
      searchLinks: [
        {
          name: "العملاء",
          link: "/customers",
          keys: "العملاء عميل customers customer",
          mainRole: "customers_allow",
          role: "customers_show",
        },
        {
          name: "اضافة عميل",
          link: "/customers/create",
          keys: " انشاء العملاء اضافة عميل customers add customer",
          mainRole: "customers_allow",
          role: "customers_add",
        },
        {
          name: "العروض",
          link: "/quotations",
          keys: "العروض العرض Offer Offers  quotations quotation",
          mainRole: "quotations_allow",
          role: "quotations_show",
        },
        {
          name: "اضافة عرض سعر",
          link: "/quotations/create",
          keys: "  سعر العروض العرض اضافة Offer Offers  quotations quotation Quote add",
          mainRole: "quotations_allow",
          role: "quotations_add",
        },
        {
          name: "فواتير البيع",
          link: "/invoices",
          keys: " فاتوره فواتير البيع  Sales Invoices Invoice ",
          mainRole: "invoices_allow",
          role: "invoices_show",
        },
        {
          name: "اضافة فاتورة بيع",
          link: "/invoices/create",
          keys: " اضافة فواتير فاتورة بيع Sales Invoices add Invoice",
          mainRole: "invoices_allow",
          role: "invoices_add",
        },
        {
          name: "مرتجعات البيع",
          link: "/saleReturns",
          keys: "مرتجعات مرتجع البيع saleReturns Return ",
          mainRole: "saleReturns_allow",
          role: "sale_returns_show",
        },
        {
          name: "اضافة مرتجع بيع",
          link: "/saleReturns/create",
          keys: " اضافة مرتجعات مرتجع البيع saleReturns Return add",
          mainRole: "saleReturns_allow",
          role: "sale_returns_add",
        },
        {
          name: "سندات الطلب",
          link: "/orders",
          keys: " سندات الطلب Demand Bonds ",
          mainRole: "orders_allow",
          role: "orders_show",
        },
        {
          name: "اضافة سندات الطلب",
          link: "/orders/create",
          keys: " اضافة طلب Add Request  ",
          mainRole: "orders_allow",
          role: "orders_add",
        },
        {
          name: "الموردين",
          link: "/suppliers",
          keys: "الموردين مورد Suppliers Supplier Name ",
          mainRole: "suppliers_allow",
          role: "suppliers_show",
        },
        {
          name: "إنشاء مورد ",
          link: "/suppliers/create",
          keys: "إنشاء الموردين مورد Suppliers Supplier Name add Create Resource ",
          mainRole: "suppliers_allow",
          role: "suppliers_add",
        },
        {
          name: " فواتير الشراء ",
          link: "/bills",
          keys: " فاتوره فواتير الشراء Purchase Invoices Invoice",
          mainRole: "bills_allow",
          role: "bills_show",
        },
        {
          name: "اضافة فاتورة شراء",
          link: "/bills/create",
          keys: " اضافة فواتير فاتورة شراء Purchase Invoices add Invoice",
          mainRole: "bills_allow",
          role: "bills_add",
        },
        {
          name: "مرتجعات الشراء",
          link: "/purchaseReturns",
          keys: "مرتجعات مرتجع الشراء Purchase Returns Return ",
          mainRole: "purchaseReturns_allow",
          role: "purchase_returns_show",
        },
        {
          name: "اضافة مرتجع شراء",
          link: "/purchaseReturns/create",
          keys: " اضافة مرتجعات مرتجع الشراء Purchase Returns Return add",
          mainRole: "purchaseReturns_allow",
          role: "purchase_returns_add",
        },
        {
          name: " اوامر الشراء ",
          link: "/purchaseOrders",
          keys: " امر اوامر الشراء Purchase Orders Order",
          mainRole: "purchaseOrders_allow",
          role: "purchase_orders_show",
        },
        {
          name: "اضافة امر شراء",
          link: "/purchaseOrders/create",
          keys: " اضافة امر اوامر الشراء Purchase Orders Order add ",
          mainRole: "purchaseOrders_allow",
          role: "purchase_orders_add",
        },
        {
          name: " الخزائن",
          link: "/safes",
          keys: " اسم خزينه الخزائن  Safes Safe Treasury Name ",
          mainRole: "safes_allow",
          role: "safes_show",
        },
        {
          name: "إنشاء خزينة",
          link: "/safes/create",
          keys: "انشاء خزينة Safes Safe Treasury Name Create Treasury add",
          mainRole: "safes_allow",
          role: "safes_add",
        },
        {
          name: " الحسابات البنكية ",
          link: "/bankAccounts",
          keys: "اسم البنك الحسابات البنكية Bank Accounts Name ",
          mainRole: "bankAccounts_allow",
          role: "bank_accounts__show",
        },
        {
          name: "إنشاء حساب بنكي",
          link: "/bankAccounts/create",
          keys: "انشاء حساب بنكي البنك الحسابات البنكية Bank Accounts Create add",
          mainRole: "bankAccounts_allow",
          role: "bank_accounts__add",
        },
        {
          name: " سندات القبض ",
          link: "/salesPayments",
          keys: " سند القبض سندات Sales Payments Batch Payment ",
          mainRole: "salesPayments_allow",
          role: "sales_payments_show",
        },
        {
          name: "إنشاء سند قبض",
          link: "/salesPayments/create",
          keys: "انشاء سند قبض Sales Payments Batch Payment Create add",
          mainRole: "salesPayments_allow",
          role: "sales_payments_add",
        },
        {
          name: " سندات الصرف ",
          link: "/purchasePayments",
          keys: " سند الصرف سندات Purchase Payments Paid Payment ",
          mainRole: "purchasePayments_allow",
          role: "purchase_payments_show",
        },
        {
          name: "إنشاء سند صرف",
          link: "/purchasePayments/create",
          keys: "انشاء سند صرف Purchase Payments Paid Payment Create add Batch",
          mainRole: "purchasePayments_allow",
          role: "purchase_payments_add",
        },
        {
          name: " المصروفات  ",
          link: "/expenses",
          keys: "  المصروف المصروفات expenses Expense ",
          mainRole: "expenses_allow",
          role: "expenses_show",
        },
        {
          name: "إنشاء مصروف",
          link: "/expenses/create",
          keys: "مصروفات إضافة انشاء مصروف expenses Expense Create add ",
          mainRole: "expenses_allow",
          role: "expenses_add",
        },
        {
          name: " عمليات إيداع الخزائن",
          link: "/safesDeposits",
          keys:
            "  عملية خزينه عمليات إيداع الخزائن Safe Deposit  Treasury Operations Process Operation",
          mainRole: "safesDeposits_allow",
          role: "safes_deposits_show",
        },
        {
          name: "إنشاء عملية إيداع ",
          link: "/safesDeposits/create",
          keys:
            "انشاء إضافة  عملية خزينه عمليات إيداع الخزائن Safe Deposit Treasury Operations Process Operation Create add ",
          mainRole: "safesDeposits_allow",
          role: "safes_deposits_add",
        },
        {
          name: " عمليات سحب الخزائن",
          link: "/safesWithdrawals",
          keys:
            "  عملية خزينه عمليات سحب الخزائن Locker Withdrawals Withdrawal Treasury Operations  Process Operation",
          mainRole: "safesWithdrawals_allow",
          role: "safes_withdrawals_show",
        },
        {
          name: "إنشاء عملية سحب ",
          link: "/safesWithdrawals/create",
          keys:
            "انشاء إضافة  عملية خزينه عمليات سحب الخزائن Locker Withdrawals Withdrawal Treasury Operations Process Operation Create add ",
          mainRole: "safesWithdrawals_allow",
          role: "safes_withdrawals_add",
        },
        {
          name: " عمليات نقل الخزائن",
          link: "/safesTransfers",
          keys:
            "  عملية خزينه عمليات نقل الخزائن Locker Transfers Transfer Treasury Operations Process Operation",
          mainRole: "safesTransfers_allow",
          role: "safes_transfers_show",
        },
        {
          name: "إنشاء عملية نقل ",
          link: "/safesTransfers/create",
          keys:
            "انشاء إضافة عملية خزينه عمليات نقل الخزائن Locker Transfers Transfer Treasury Operations Process Operation Create add ",
          mainRole: "safesTransfers_allow",
          role: "safes_transfers_add",
        },
        {
          name: "المخازن",
          link: "/stores",
          keys: "المخازن مخزن المنتجات اسم Store Name Stores Product ",
          mainRole: "stores_allow",
          role: "stores_show",
        },
        {
          name: "إنشاء مخزن منتجات ",
          link: "/stores/create",
          keys: "  إنشاء مخزن منتجات اضافة  Store Name Stores Product add create ",
          mainRole: "stores_allow",
          role: "stores_add",
        },
        {
          name: "المنتجات والخدمات",
          link: "/products",
          keys: " اسم منتج المنتجات الخدمات Products  Name  Product ",
          mainRole: "stores_allow",
          role: "products_show",
        },
        {
          name: "إنشاء منتج ",
          link: "/products/create",
          keys: "  إنشاء منتج منتجات اضافة  Products  Name  Product add create ",
          mainRole: "stores_allow",
          role: "products_add",
        },
        {
          name: "الخامات",
          link: "/materials",
          keys: " اسم الخامة الخامات Materials Name  Material ",
          mainRole: "stores_allow",
          role: "products_show",
        },
        {
          name: "إنشاء خامة",
          link: "/materials/create",
          keys: "  إنشاء خامة اضافة  Materials Name  Material add create ",
          mainRole: "stores_allow",
          role: "products_add",
        },
        {
          name: " عمليات إيداع المخازن",
          link: "/storesDeposits",
          keys:
            "  عملية مخزن عمليات إيداع المخازن Warehouse Deposit  Store  Operations Process Operation",
          mainRole: "storesDeposits_allow",
          role: "stores_deposits_show",
        },
        {
          name: "إضافة عملية إيداع بالمخزن",
          link: "/storesDeposits/create",
          keys:
            "انشاء إضافة  عملية مخزن عمليات إيداع المخازن Deposit Process Store Operations Process Operation Create add ",
          mainRole: "storesDeposits_allow",
          role: "stores_deposits_add",
        },
        {
          name: " عمليات سحب المخازن",
          link: "/storesWithdrawals",
          keys:
            "  عملية مخزن عمليات سحب المخازن Warehouse Withdrawals Withdrawal  Operations Store Process Operation",
          mainRole: "storesWithdrawals_allow",
          role: "stores_withdrawals_show",
        },
        {
          name: "إضافة عملية سحب بالمخزن",
          link: "/storesWithdrawals/create",
          keys:
            "انشاء إضافة  عملية مخزن عمليات سحب المخازن Withdrawals  Withdrawal Store Operations Process Operation Create add ",
          mainRole: "storesWithdrawals_allow",
          role: "stores_withdrawals_add",
        },
        {
          name: " عمليات نقل المخازن",
          link: "/storesTransfers",
          keys:
            "  عملية مخزن عمليات نقل المخازن Warehouse  Transfers Transfer Store Operations Process Operation",
          mainRole: "storesTransfers_allow",
          role: "stores_transfers_show",
        },
        {
          name: "إضافة عملية نقل بالمخزن ",
          link: "/storesTransfers/create",
          keys:
            "انشاء إضافة عملية مخزن عمليات نقل المخازن  Transfers Transfer Store Operations Process Operation Create add ",
          mainRole: "storesTransfers_allow",
          role: "stores_transfers_add",
        },
        {
          name: "الموظفين",
          link: "/employees",
          keys: " الموظفين الاسم موظف  Employees Employee Name ",
          mainRole: "employees_allow",
          role: "employees_show",
        },
        {
          name: "إنشاء موظف ",
          link: "/employees/create",
          keys: "  إضافة الموظفين الاسم موظف انشاء Employees Employee Name Create add",
          mainRole: "employees_allow",
          role: "employees_add",
        },
        {
          name: "رواتب الموظفين",
          link: "/employeesSalaries",
          keys: " الموظفين راتب رواتب موظف إضافة Add Salary Employees Employee  ",
          mainRole: "employeesSalaries_allow",
          role: "employees_Salaries_show",
        },
        {
          name: "إنشاء راتب",
          link: "/employeesSalaries/create",
          keys:
            " الموظفين راتب رواتب موظف إضافة انشاء Employees Employee Salary Create add",
          mainRole: "employeesSalaries_allow",
          role: "employees_Salaries_add",
        },
        {
          name: "حوافز الموظفين",
          link: "/employeesIncentives",
          keys:
            " الموظفين حافز حوافز موظف إضافة Add Employees Employee Incentives Incentive",
          mainRole: "employeesIncentives_allow",
          role: "employees_incentives_show",
        },
        {
          name: "إنشاء حافز",
          link: "/employeesIncentives/create",
          keys:
            " الموظفين حافز حوافز موظف إضافة انشاء Employees Employee Incentives Incentive Create add",
          mainRole: "employeesIncentives_allow",
          role: "employees_incentives_add",
        },
        {
          name: "خصومات الموظفين",
          link: "/employeesDeductions",
          keys: " الموظفين خصم خصومات  موظف Employees Employee Discounts Discount",
          mainRole: "employeesDeductions_allow",
          role: "employees_deductions_show",
        },
        {
          name: "إنشاء خصم",
          link: "/employeesDeductions/create",
          keys:
            " الموظفين خصم خصومات  موظف إضافة انشاء Employees Employee Discounts Discount Create add",
          mainRole: "employeesDeductions_allow",
          role: "employees_deductions_add",
        },
        {
          name: "سحوبات الموظفين",
          link: "/employeesWithdrawals",
          keys:
            " الموظفين سحب سحوبات موظف إنشاء Employees Employee Withdrawal Withdrawals Create",
          mainRole: "employeesWithdrawals_allow",
          role: "employees_withdrawals_show",
        },
        {
          name: "إنشاء عملية سحب ",
          link: "/employeesWithdrawals/create",
          keys:
            " الموظفين سحب  سحوبات  موظف إضافة انشاء Employees Employee Withdrawal Withdrawals create add",
          mainRole: "employeesWithdrawals_allow",
          role: "employees_withdrawals_add",
        },
        {
          name: "الشركاء",
          link: "/partners",
          keys: "الشركاء شريك Partners Partner Name",
          mainRole: "partners_allow",
          role: "partners_show",
        },
        {
          name: "اضافة شريك",
          link: "/partners/create",
          keys: " انشاء الشركاء اضافة شريك Partners Partner Name create add",
          mainRole: "partners_allow",
          role: "partners_add",
        },
        {
          name: "إيداع الشركاء",
          link: "/partnersDeposits",
          keys:
            "الشركاء شريك إيداع عملية عمليات Partners Partner Deposit Operations Process Operation ",
          mainRole: "partnersDeposits_allow",
          role: "partners_deposits_show",
        },
        {
          name: "إنشاء عملية إيداع ",
          link: "/partnersDeposits/create",
          keys:
            " إنشاء عملية إيداع الشركاء اضافة شريك Partners Partner Deposit Operations Process Operation create add",
          mainRole: "partnersDeposits_allow",
          role: "partners_deposits_add",
        },
        {
          name: "سحب  الشركاء",
          link: "/partnersWithdrawals",
          keys:
            "الشركاء شريك سحب  عملية عمليات Partners Partner Withdrawal Withdrawals  Operations Process Operation ",
          mainRole: "partnersWithdrawals_allow",
          role: "partners_withdrawals_show",
        },
        {
          name: "إنشاء عملية سحب  ",
          link: "/partnersWithdrawals/create",
          keys:
            " إنشاء عملية سحب الشركاء اضافة شريك Partners Partner Withdrawal Withdrawals Operations Process Operation create add",
          mainRole: "partnersWithdrawals_allow",
          role: "partners_withdrawals_add",
        },
        {
          name: "عمليات تسوية الشركاء",
          link: "/partnersSettlements",
          keys:
            "الشركاء شريك تسوية عملية عمليات Partners Partner Settlements Settlement Operations Process Operation ",
          mainRole: "partnersSettlements_allow",
          role: "partners_settlements_show",
        },
        {
          name: "إنشاء عملية تسوية  ",
          link: "/partnersSettlements/create",
          keys:
            " إنشاء عملية تسوية الشركاء اضافة شريك Partners Partner Settlements Settlement Operations Process Operation create add",
          mainRole: "partnersSettlements_allow",
          role: "partners_settlements_add",
        },
        {
          name: "عمليات تقسيم أرباح الشركاء",
          link: "/partnersProfits",
          keys:
            " ربح الشركاء شريك  عملية عمليات  تقاسم أرباح المشروعات Partners Partner Dividing  Profits Profit Operations Process Operation ",
          mainRole: "partnersProfits_allow",
          role: "partners_profits_show",
        },
        {
          name: "إنشاء عملية",
          link: "/partnersProfits/create",
          keys:
            "  ربح تقاسم أرباح إنشاء عملية الشركاء اضافة شريك Partners Partner Profits Profit Operations Process Operation create add",
          mainRole: "partnersProfits_allow",
          role: "partners_profits_add",
        },
        {
          name: "الحسابات الجارية",
          link: "/accounts",
          keys: "الحسابات الجارية اسم حساب Current Accounts Operations Account Name ",
          mainRole: "accounts_allow",
          role: "accounts_show",
        },
        {
          name: "إنشاء حساب",
          link: "/accounts/create",
          keys:
            "  اضافة إنشاء الحسابات الجارية اسم حساب Current Accounts Operations Account Name  create add",
          mainRole: "accounts_allow",
          role: "accounts_add",
        },
        {
          name: "إيداع الحسابات",
          link: "/accountsDeposits",
          keys:
            " عمليات إيداع عملية الحسابات الجارية اسم حساب Current Accounts Operations Account Deposits Deposit Operations Process Operation",
          mainRole: "accountsDeposits_allow",
          role: "accounts_deposits_show",
        },
        {
          name: "إنشاء عملية إيداع ",
          link: "/accountsDeposits/create",
          keys:
            "  إنشاء اضافة عمليات إيداع عملية الحسابات الجارية اسم حساب Current Accounts Operations Account Deposits Deposit Operations Process Operation create add",
          mainRole: "accountsDeposits_allow",
          role: "accounts_deposits_add",
        },
        {
          name: "عمليات سحب الحسابات",
          link: "/accountsWithdrawals",
          keys:
            " عمليات سحب عملية الحسابات الجارية اسم حساب Current Accounts Operations Account Withdrawals Withdrawal Operations Process Operation",
          mainRole: "accountsWithdrawals_allow",
          role: "accounts_withdrawals_show",
        },
        {
          name: "إنشاء عملية سحب ",
          link: "/accountsWithdrawals/create",
          keys:
            "  إنشاء اضافة عمليات سحب عملية الحسابات الجارية اسم حساب Current Accounts Operations Account Withdrawals Withdrawal Operations Process Operation create add",
          mainRole: "accountsWithdrawals_allow",
          role: "accounts_withdrawals_add",
        },
        {
          name: " المشروعات",
          link: "/projects",
          keys: "  مشروع المشروعات projects project ",
          mainRole: "projects_allow",
          role: "projects_show",
        },
        {
          name: "إضافة مشروع ",
          link: "/projects/create",
          keys: "المشروعات إضافة مشروع انشاء  projects project Create add ",
          mainRole: "projects_allow",
          role: "projects_add",
        },
        {
          name: " عمليات إيداع المشروعات",
          link: "/projectsDeposits",
          keys:
            "  عملية عمليات إيداع مشروع المشروعات project projects Deposits Operations Process Operation",
          mainRole: "projectsDeposits_allow",
          role: "projects_deposits_show",
        },
        {
          name: "إنشاء عملية إيداع ",
          link: "/projectsDeposits/create",
          keys:
            "انشاء إضافة  عملية  عمليات إيداع مشروع المشروعات project Deposit Operations Process Operation Create add ",
          mainRole: "projectsDeposits_allow",
          role: "projects_deposits_add",
        },
        {
          name: " عمليات سحب المشروعات",
          link: "/projectsWithdrawals",
          keys:
            "  عملية عمليات سحب مشروع المشروعات Recalls Withdrawals project Withdrawal  Operations  Process Operation",
          mainRole: "projectsWithdrawals_allow",
          role: "projects_withdrawals_show",
        },
        {
          name: "إضافة عملية سحب المشروعات",
          link: "/projectsWithdrawals/create",
          keys:
            "انشاء إضافة  عملية  عمليات سحب مشروع المشروعات Recalls project Checkout Withdrawals Withdrawal  Operations Process Operation Create add ",
          mainRole: "projectsWithdrawals_allow",
          role: "projects_withdrawals_add",
        },
        {
          name: " عمليات نقل المشروعات",
          link: "/projectsTransfers",
          keys:
            "  عملية عمليات نقل مشروع المشروعات project Transfers Transfer Operations Process Operation",
          mainRole: "projectsTransfers_allow",
          role: "projects_transfers_show",
        },
        {
          name: "إضافة عملية نقل بالمشروعات",
          link: "/projectsTransfers/create",
          keys:
            "انشاء إضافة عملية عمليات نقل مشروع المشروعات project Transfers Transfer  Operations Process Operation Create add ",
          mainRole: "projectsTransfers_allow",
          role: "projects_transfers_add",
        },
        {
          name: "الاشتراكات",
          link: "/subscriptions",
          keys: "الاشتراكات اشتراك subscriptions subscription",
          mainRole: "subscriptions_allow",
          role: "subscriptions_show",
        },
        {
          name: "اضافة اشتراك",
          link: "/subscriptions/create",
          keys:
            " انشاء اضافة الاشتراكات اشتراك subscriptions Form subscription add Create ",
          mainRole: "subscriptions_allow",
          role: "subscriptions_add",
        },
        {
          name: "عمليات الاشتراك",
          link: "/subscriptionsOperations",
          keys:
            " عمليات الاشتراكات عمليةاشتراك subscriptions Operations subscription Operation",
          mainRole: "subscriptionsOperations_allow",
          role: "subscriptions_operations_show",
        },
        {
          name: "إنشاء عملية اشتراك",
          link: "/subscriptionsOperations/create",
          keys:
            " انشاء اضافة عمليات الاشتراكات عمليةاشتراك  subscriptions Operations Form subscription Operation add Create",
          mainRole: "subscriptionsOperations_allow",
          role: "subscriptions_operations_add",
        },
        {
          name: "شيكات البيع",
          link: "/salesCheques",
          keys: "شيكات البيع سند شيك Sales Cheques cheque Batch ",
          mainRole: "salesCheques_allow",
          role: "sales_cheques_show",
        },
        {
          name: "إنشاء شيك بيع ",
          link: "/salesCheques/create",
          keys: " انشاء اضافة شيكات البيع سند شيك Sales Cheques cheque Batch add Create ",
          mainRole: "salesCheques_allow",
          role: "sales_cheques_add",
        },
        {
          name: "شيكات الشراء",
          link: "/purchaseCheques",
          keys: "شيكات الشراء سند شيك Purchase  Cheques cheque Batch ",
          mainRole: "purchaseCheques_allow",
          role: "purchase_cheques_show",
        },
        {
          name: "إنشاء شيك شراء ",
          link: "/purchaseCheques/create",
          keys:
            " انشاء اضافة شيكات الشراء سند شيك Purchase  Cheques cheque Batch add Create ",
          mainRole: "purchaseCheques_allow",
          role: "purchase_cheques_add",
        },
        {
          name: "خصومات مسموح بها",
          link: "/salesDiscounts",
          keys: "خصومات مسموح بها خصم  Sales Discounts Discount ",
          mainRole: "salesDiscounts_allow",
          role: "sales_discounts_show",
        },
        {
          name: "إنشاء خصم مسموح به",
          link: "/salesDiscounts/create",
          keys:
            " انشاء اضافة خصومات مسموح بها خصم  Sales Discounts Discount  add Create ",
          mainRole: "salesDiscounts_allow",
          role: "sales_discounts_add",
        },
        {
          name: "خصومات مكتسبه ",
          link: "/purchaseDiscounts",
          keys: " خصومات مكتسبه خصم Purchase Discounts Discount ",
          mainRole: "purchaseDiscounts_allow",
          role: "purchase_discounts_show",
        },
        {
          name: "إنشاء خصم مكتسب ",
          link: "/purchaseDiscounts/create",
          keys: " انشاء اضافة خصومات مكتسبه خصم Purchase Discounts Discount  add Create ",
          mainRole: "purchaseDiscounts_allow",
          role: "purchase_discounts_add",
        },
        {
          name: " أقساط البيع",
          link: "/salesInstallments",
          keys: " قسط سند أقساط البيع  Sale Sales Installments Batch premium",
          mainRole: "salesInstallments_allow",
          role: "sales_installments_show",
        },
        {
          name: "إنشاء قسط البيع",
          link: "/salesInstallments/create",
          keys:
            " قسط سند أقساط البيع إضافة انشاء  Sale Sales Installments Batch premium Create add ",
          mainRole: "salesInstallments_allow",
          role: "sales_installments_add",
        },
        {
          name: "دفعات أقساط البيع",
          link: "/salesInstallmentsPayments",
          keys:
            " دفعات قسط سند أقساط البيع Payments Sale Sales Installments Batch premium",
        },
        {
          name: "إنشاء سند قسط بيع",
          link: "/salesInstallmentsPayments/create",
          keys:
            " دفعات قسط سند أقساط البيع إضافة انشاء Payments Sale Sales Installments Batch premium Create add ",
          mainRole: "salesInstallments_allow",
          role: "sales_installments_add",
        },
        {
          name: " أقساط الشراء",
          link: "/purchaseInstallments",
          keys: " قسط سند أقساط الشراء  Purchase  Purchases  Installments Batch Premium ",
          mainRole: "purchaseInstallments_allow",
          role: "purchase_installments_show",
        },
        {
          name: "إنشاء قسط الشراء",
          link: "/purchaseInstallments/create",
          keys:
            " قسط سند أقساط الشراء إضافة انشاء  Purchase  Purchases Installments Batch premium Create add ",
          mainRole: "purchaseInstallments_allow",
          role: "purchase_installments_add",
        },
        {
          name: " نماذج التصنيع ",
          link: "/manufacturingModels",
          keys: "  نموذج نماذج التصنيع Manufacturing Models Model",
          mainRole: "manufacturingModels_allow",
          role: "manufacturing_models_show",
        },
        {
          name: "إضافة نموذج",
          link: "/manufacturingModels/create",
          keys: "إضافة انشاء نموذج نماذج التصنيع Manufacturing Models Model Create add ",
          mainRole: "manufacturingModels_allow",
          role: "manufacturing_models_add",
        },
        {
          name: "قائمة العمليات",
          link: "/manufacturingOperations",
          keys:
            "  قائمة العمليات عمليه كود  Manufacturing List Operations Operation Process code",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_show",
        },
        {
          name: "إضافة عمليه تصنيع",
          link: "/manufacturingOperations/create",
          keys:
            "إضافة انشاء قائمة العمليات عمليه كود تصنيع Manufacturing List  Operations Operation Process code Create add ",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_add",
        },
        {
          name: " عمليات إيداع عمليات التصنيع",
          link: "/manufacturingDeposits",
          keys:
            "عملية عمليات إيداع تصنيع Manufacturing Deposits Operations Process Operation",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_show",
        },
        {
          name: "اضافة عملية إيداع بعمليات التصنيع",
          link: "/manufacturingDeposits/create",
          keys:
            "انشاء إضافة  عملية  عمليات إيداع التصنيع Manufacturing Deposits Operations Process Operation Create add ",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_add",
        },
        {
          name: " عمليات سحب عمليات التصنيع",
          link: "/manufacturingWithdrawals",
          keys:
            "عملية عمليات سحب  تصنيع Manufacturing Recalls Withdrawals Withdrawal Operations Process Operation",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_show",
        },
        {
          name: "اضافة عملية سحب  بعمليات التصنيع",
          link: "/manufacturingWithdrawals/create",
          keys:
            "انشاء إضافة  عملية  عمليات سحب التصنيع Manufacturing Recalls Withdrawals Withdrawal Operations Process Operation Create add ",
          mainRole: "manufacturingOperations_allow",
          role: "manufacturing_operations_add",
        },
        {
          name: " نقاط البيع",
          link: "/pointOfSales",
          keys: "نقطة أرصدة نقاط البيع  Point Sale Sales Balances",
          mainRole: "pointOfSales_allow",
          role: "point_of_sales_show",
        },
        {
          name: "إنشاء نقطة بيع",
          link: "/pointOfSales/create",
          keys:
            "نقطة نقاط أرصدة البيع إضافة انشاء  Point Sale Sales Balances Create add ",
          mainRole: "pointOfSales_allow",
          role: "point_of_sales_add",
        },
        {
          name: "الإقرارات",
          link: "/endorsements",
          keys:
            "الإقرارات اقرار اسم المستلم Acknowledgments Declarations Acknowledgment Declaration Recipient ",
          mainRole: "endorsements_allow",
          role: "endorsements_show",
        },
        {
          name: "إنشاء إقرار",
          link: "/endorsements/create",
          keys:
            "انشاء الإقرارات اضافة إقرار Acknowledgments Declarations Acknowledgment Declaration Recipient add create",
          mainRole: "endorsements_allow",
          role: "endorsements_add",
        },
        {
          name: "الأمانات",
          link: "/deposits",
          keys:
            " أمانة الأمانات اسم صاحب الشيك Depositories Deposits Depositorie Deposit Trust Name Check Holder amana ",
          mainRole: "deposits_allow",
          role: "deposits_show",
        },
        {
          name: "إنشاء أمانة",
          link: "/deposits/create",
          keys:
            "انشاء الأمانات اضافة أمانة Depositories Deposits Depositorie Deposit Trust Name Check Holder amana add create",
          mainRole: "deposits_allow",
          role: "deposits_add",
        },
        {
          name: "مناديب الشحن",
          link: "/deliveries",
          keys:
            " مندوب مناديب الشحن deliveries deliverie Freight Forwarders  Shipping Agents representative",
          mainRole: "cities_allow",
          role: "cities_show",
        },
        {
          name: "إضافة مندوب الشحن",
          link: "/deliveries/create",
          keys:
            "انشاء مناديب الشحن اضافة مندوب deliveries deliverie Freight Forwarders  Shipping Agents representative add create",
          mainRole: "cities_allow",
          role: "cities_add",
        },
        {
          name: "قائمة المدن",
          link: "/cities",
          keys: " مدينة قائمة المدن cities List City",
          mainRole: "cities_allow",
          role: "cities_show",
        },
        {
          name: "إنشاء مدينة",
          link: "/cities/create",
          keys: "انشاء اضافة مدينة قائمة المدن cities List City add create",
          mainRole: "cities_allow",
          role: "cities_add",
        },
        {
          name: "نقاط الاستلام",
          link: "/pickupLocations",
          keys: " نقاط اماكن الاستلام نقطة Receiving Points Point",
          mainRole: "cities_allow",
          role: "cities_show",
        },
        {
          name: "إنشاء نقطة استلام",
          link: "/pickupLocations/create",
          keys: "انشاء اماكن اضافة  نقاط الاستلام نقطة Receiving Points Point add create",
          mainRole: "cities_allow",
          role: "cities_add",
        },
        {
          name: "عمليات الشحن",
          link: "/shippingOperations",
          keys:
            " عمليات كود عملية الشحن Shipments Shipment Shipping Operations Process Operation ",
          mainRole: "cities_allow",
          role: "cities_show",  
        },
        {
          name: "إنشاء عملية شحن",
          link: "/shippingOperations/create",
          keys:
            "انشاء اضافة  عمليات كود عملية الشحن Shipments Shipment Shipping Operations Process Operation add create",
          mainRole: "cities_allow",
          role: "cities_add",
        },
        {
          name: "عناوين الشحن",
          link: "/shippingAddresses",
          keys:
            " عناوين عنوان اسم العميل الشحن Customer Name Shipments Shipment Shipping Addresses addresse  ",
          mainRole: "cities_allow",
          role: "cities_show", 
        },
        {
          name: "إنشاء عنوان شحن",
          link: "/shippingAddresses/create",
          keys:
            "انشاء اضافة  عناوين عنوان اسم العميل الشحن Customer Name Shipments Shipment Shipping Addresses addresse  add create",
          mainRole: "cities_allow",
          role: "cities_add",
        },
        {
          name: "طباعة فاتورة الذهب",
          link: "/goldInvoice",
          keys: " طباعة فاتورة الذهب Gold Bill Printing Invoice ",
          mainRole: "freePrinting_allow",
          role: true , 
        },
        {
          name: "طباعة فاتورة الألماس",
          link: "/diamondInvoice",
          keys: " طباعة فاتورة الألماس Diamond  Bill Printing Invoice ",
          mainRole: "freePrinting_allow",
          role: true , 
        },

        /* اعدادات التقارير */
        {
          name: "التقارير",
          link: "/mainReport",
          keys: "  لمحة التقارير Reports  Overview ",
          mainRole: "reports_allow",
          role: "reports_show" , 
        },

        {
          name: "لمحة عامة",
          link: "/overview",
          mainRole: "reports_allow",
          reportId: 0
        },
        {
          name: "إجمالي حساب العميل",
          link: "/customersTotalAccounts",
          mainRole: "reports_allow",
          reportId: 1
        },
        {
          name: "تفاصيل حساب العميل",
          link: "/customersDetailsAccounts",
          mainRole: "reports_allow",
          reportId: 2
        },
        {
          name: "أرصدة العملاء",
          link: "/customersBalance",
          mainRole: "reports_allow",
          reportId: 3
        },
        {
          name: "العملاء الغير نشطين",
          link: "/customersInactive",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "العملاء النشطين",
          link: "/customersActive",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "حركة العملاء",
          link: "/customerTraffic",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "المبيعات الي سندات القبض",
          link: "/salesCollection",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "المبيعات حسب الفاتوره",
          link: "/salesByInvoice",
          mainRole: "reports_allow",
          reportId: 13
        },
        {
          name: "المبيعات حسب المنتج",
          link: "/salesByItem",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "اسعار مبيعات العميل",
          link: "/customerSalesPrices",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "طلبات حسب الفاتورة",
          link: "/salesOrdersByInvoice",
          mainRole: "reports_allow",
          reportId: 21
        },
        {
          name: "طلبات حسب المنتج",
          link: "/salesOrdersByItem",
          mainRole: "reports_allow",
          reportId: 22
        },
        {
          name: "مرتجعات حسب الفاتوره",
          link: "/salesReturnsByInvoice",
          mainRole: "reports_allow",
          reportId: 17
        },
        {
          name: "مرتجعات حسب المنتج",
          link: "/salesReturnsByItem",
          mainRole: "reports_allow",
          reportId: 18
        },
        {
          name: "إجمالي حساب المورد",
          link: "/suppliersTotalAccounts",
          mainRole: "reports_allow",
          reportId: 5
        },
        {
          name: "تفاصيل حساب المورد",
          link: "/suppliersDetailsAccounts",
          mainRole: "reports_allow",
          reportId: 6
        },
        {
          name: "أرصدة الموردين",
          link: "/suppliersBalance",
          mainRole: "reports_allow",
          reportId: 7
        },
        {
          name: "دليل الموردين",
          link: "/suppliersGuide",
          mainRole: "reports_allow",
          reportId: 8
        },
        {
          name: "الموردين الغير نشطين",
          link: "/suppliersInactive",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "حركة الموردين",
          link: "/supplierMovement",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "المشتريات الي سندات الصرف",
          link: "/purchasingCollecting",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "المشتريات حسب الفاتوره",
          link: "/purchasesByBill",
          mainRole: "reports_allow",
          reportId: 15
        },
        {
          name: "المشتريات حسب المنتج",
          link: "/purchasesByItem",
          mainRole: "reports_allow",
          reportId: 16
        },
        {
          name: "طلبات حسب الفاتورة",
          link: "/purchasesOrdersByBill",
          mainRole: "reports_allow",
          reportId: 23
        },
        {
          name: "طلبات حسب المنتج",
          link: "/purchasesOrdersByItem",
          mainRole: "reports_allow",
          reportId: 24
        },
        {
          name: "مرتجعات حسب الفاتوره",
          link: "/purchasesReturnsByBill",
          mainRole: "reports_allow",
          reportId: 19
        },
        {
          name: "مرتجعات حسب المنتج",
          link: "/purchasesReturnsByItem",
          mainRole: "reports_allow",
          reportId: 20
        },
        {
          name: "كشف حساب الخزينة",
          link: "/safesAccounts",
          mainRole: "reports_allow",
          reportId: 9     
        },
        {
          name: "أرصدة الخزائن",
          link: "/safersBalance",
          mainRole: "reports_allow",
          reportId: 10
          
        },
        {
          name: "سجل سندات القبض",
          link: "/paymentHistory",
          mainRole: "reports_allow",
          reportId: 25
        },
        {
          name: "سجل سندات الصرف",
          link: "/purchasePaymentHistory",
          mainRole: "reports_allow",
          reportId: 26
        },
        {
          name: "لائحة المصروفات",
          link: "/expenseHistory",
          mainRole: "reports_allow",
          reportId: 31
        },
        {
          name: "المصروفات حسب التصنيف",
          link: "/expenseByCategory",
          mainRole: "reports_allow",
          reportId: 32
        },
        {
          name: "إيداع الخزائن",
          link: "/safeDepositHistory",
          mainRole: "reports_allow",
          reportId: 13
        },
        {
          name: "سحب الخزائن",
          link: "/safeWithdrawalHistory",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "نقل الخزائن",
          link: "/safeTransferHistory",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "جرد المخازن",
          link: "/warehouseInventory",
          mainRole: "reports_allow",
          reportId: 11
        },
        {
          name: "قيمة المنتجات",
          link: "/ProductsValue",
          mainRole: "reports_allow",
          reportId: 12
        },
        {
          name: "تنبيهات المخازن",
          link: "/productAlerts",
          mainRole: "reports_allow",
          reportId: 12
        },
        {
          name: "كشف حساب منتج",
          link: "/productDetailsAccounts",
          mainRole: "reports_allow",
          reportId: 25
        },
        {
          name: "المنتجات الغير نشطة",
          link: "/inactiveProducts",
          mainRole: "reports_allow",
          reportId: 4
        },
        {
          name: "الإيداع حسب الفاتوره",
          link: "/storesDepositsByInvoice",
          mainRole: "reports_allow",
          reportId: 13
        },
        {
          name: "الإيداع حسب المنتج",
          link: "/storesDepositsByItem",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "سحب حسب الفاتوره",
          link: "/storesWithdrawalsByBill",
          mainRole: "reports_allow",
          reportId: 13
        },
        {
          name: "سحب حسب المنتج",
          link: "/storesWithdrawalsByItem",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "نقل حسب الفاتوره",
          link: "/storesTransfersByInvoice",
          mainRole: "reports_allow",
          reportId: 13

        },
        {
          name: "نقل حسب المنتج",
          link: "/storesTransfersByItem",
          mainRole: "reports_allow",
          reportId: 14
        },
        {
          name: "إجمالي حساب الموظف",
          link: "/employeesTotalAccounts",
          mainRole: "reports_allow",
          reportId: 42
        },
        {
          name: "أرصدة الموظفين",
          link: "/employeesBalance",
          mainRole: "reports_allow",
          reportId: 44
        },
        {
          name: "دليل الموظفين",
          link: "/employeesGuide",
          mainRole: "reports_allow",
          reportId: 45
        },
        {
          name: "رواتب الموظفين",
          link: "/employeesOperationsSalaries",
          mainRole: "reports_allow",
          reportId: 42
        },
        {
          name: "حوافز الموظفين",
          link: "/employeesOperationsIncentives",
          mainRole: "reports_allow",
          reportId: 43
        },
        {
          name: "خصومات الموظفين",
          link: "/employeesOperationsDeductions",
          mainRole: "reports_allow",
          reportId: 44
        },
        {
          name: "سحوبات الموظفين",
          link: "/employeesOperationsWithdrawals",
          mainRole: "reports_allow",
          reportId: 45
        },
        {
          name: "إجمالي حساب الشريك",
          link: "/partnersTotalAccounts",
          mainRole: "reports_allow",
          reportId: 34
        },
        {
          name: "تفاصيل حساب الشريك",
          link: "/partnersDetailsAccounts",
          mainRole: "reports_allow",
          reportId: 35
        },
        {
          name: "أرصدة الشركاء",
          link: "/partnersBalance",
          mainRole: "reports_allow",
          reportId: 36

        },
        {
          name: "دليل الشركاء",
          link: "/partnersGuide",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "حركة الشركاء",
          link: "/partnerMovement",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "سجل دفعات الشركاء",
          link: "/partnerDepositsHistory",
          mainRole: "reports_allow",
          reportId: 31
        },
        {
          name: "سجل سحوبات الشركاء",
          link: "/partnerWithdrawalsHistory",
          mainRole: "reports_allow",
          reportId: 32
        },
        {
          name: "إجمالي الحسابات",
          link: "/totalAccounts",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "تفاصيل الحسابات",
          link: "/accountDetails",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "أرصدة الحسابات",
          link: "/accountBalances",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "دليل الحسابات",
          link: "/accountsGuide",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "حركة الحسابات الجارية",
          link: "/movementAccounts",
          mainRole: "reports_allow",
          reportId: 37
        },
        {
          name: "سجل دفعات عمليات الحسابات",
          link: "/accountTransactionPaymentsRecord",
          mainRole: "reports_allow",
          reportId: 31
        },
        {
          name: "سجل سحوبات عمليات الحسابات",
          link: "/recordWithdrawalsAccountsOperations",
          mainRole: "reports_allow",
          reportId: 32
        },
        {
          name: "إجمالي حساب المشروع",
          link: "/projectsTotalAccounts",
          mainRole: "reports_allow",
          reportId: 38
        },
        {
          name: "تفاصيل حساب المشروع",
          link: "/projectsDetailsAccounts",
          mainRole: "reports_allow",
          reportId: 39
        },
        {
          name: "أرصدة المشروعات",
          link: "/projectsBalance",
          mainRole: "reports_allow",
          reportId: 40
        },
        {
          name: "لمحة عامة عن المشروع",
          link: "/projectsOverview",
          mainRole: "reports_allow",
          reportId: 41
        },
        {
          name: "حركة المشروعات",
          link: "/projectMovement",
          mainRole: "reports_allow",
          reportId: 41
        },
        {
          name: "عمليات إيداع بالفاتورة",
          link: "/projectsDepositsByInvoice",
          mainRole: "reports_allow",
          reportId: 46
        },
        {
          name: "عمليات إيداع بالمنتج",
          link: "/projectsDepositsByItem",
          mainRole: "reports_allow",
          reportId: 47
        },
        {
          name: "عمليات سحب بالفاتورة",
          link: "/projectsWithdrawalsByBill",
          mainRole: "reports_allow",
          reportId: 48
        },
        {
          name: "عمليات سحب بالمنتج",
          link: "/projectsWithdrawalsByItem",
          mainRole: "reports_allow",
          reportId: 49
        },
        {
          name: "عمليات نقل بالفاتورة",
          link: "/projectsTransfersByInvoice",
          mainRole: "reports_allow",
          reportId: 50
        },
        {
          name: "عمليات نقل بالمنتج",
          link: "/projectsTransfersByItem",
          mainRole: "reports_allow",
          reportId: 51
        },
        {
          name: "سجل شيكات البيع",
          link: "/chequesHistory",
          mainRole: "reports_allow",
          reportId: 27
        },
        {
          name: "سجل شيكات الشراء",
          link: "/purchaseChequesHistory",
          mainRole: "reports_allow",
          reportId:28
        },
        {
          name: "سجل خصومات البيع",
          link: "/discountsHistory",
          mainRole: "reports_allow",
          reportId: 29
        },
        {
          name: "سجل خصومات الشراء",
          link: "/purchaseDiscountsHistory",
          mainRole: "reports_allow",
          reportId: 30
        },
        {
          name: "سجل أقساط البيع",
          link: "/installmentsHistory",
          mainRole: "reports_allow",
          reportId: 29
        },
        {
          name: "استحقاق أقساط البيع",
          link: "/installmentsDue",
          mainRole: "reports_allow",
          reportId: 29
        },
        {
          name: "دفعات أقساط البيع",
          link: "/installmentsPaymentsHistory",
          mainRole: "reports_allow",
          reportId: 29
        },
        {
          name: "نقطة البيع",
          link: "/pointOfSalesOverview",
          mainRole: "reports_allow",
          reportId: 0
        },
        {
          name: "عمليات الشحن",
          link: "/shippingOperationsByInvoice",
          mainRole: "reports_allow",
          reportId: 14
        },
      ],
    };
  },
  components: {
    singleItem,
    multiItem,
    vueCustomScrollbar,
  },
  methods: {
    toggleMobile() {
      if (this.$parent.showMobileMnue) {
        this.$parent.showMobileMnue = false;
        this.$parent.model = 0;
        document.documentElement.classList.remove("overflow-hidden");
      } else {
        this.$parent.showMobileMnue = true;
        this.$parent.model = 1;
        document.documentElement.classList.add("overflow-hidden");
      }
      this.$parent.showMobileNave = false;
    },
    removeMobileMnue() {
      this.$parent.showMobileMnue = false;
      this.$parent.model = 0;
      this.$parent.showMobileNave = false;
      document.documentElement.classList.remove("overflow-hidden");
    },
    searchLink() {
      this.showSearchStat = true;
      if (this.searchValue != "") {
        var editsearch = new RegExp(this.searchValue, "i");
        var items = this.searchLinks
          .sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" }))
          .filter((el) => editsearch.test(el.name) && this.$site[el.mainRole] && (this.$user.admin || (this.$user.role[el.role] || this.$user.role.available_reports.find((report) => report.id == el.reportId))))
          .slice(0, 10);
        this.selectedLinks = items;
      } else {
        this.selectedLinks = [];
      }
    },
    removeSearch() {
      this.showSearchStat = false;
    },
    toggleSidebar (){
      this.isActive = !this.isActive;
    }
  },
  watch: {
    $user: function() {
        if (this.$user.image ) {
            this.shownImage = 'url("' + this.$linkGnirator('/companiesUploads/' + localStorage.getItem('subdomain') + '/users/' + this.$user.image, true) + '")';
        }
    },
  },
  mounted() {
    if (this.$user.image) {
      this.shownImage = 'url("' + this.$linkGnirator('/companiesUploads/' + localStorage.getItem('subdomain') + '/users/' + this.$user.image, true) + '")';
    }
  },
};
</script>

