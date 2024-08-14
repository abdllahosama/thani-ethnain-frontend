<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">
          <i class="far fa-chart-line"></i>
          {{ $t("main.overview") }}
        </h4>
      </div>
      <div class="card-body-overview">
        <div class="row text-center">
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/quotations'"
              ><i class="fas fa-calculator overview-icon"></i
              >{{ $t("main.quotations") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayQuotations) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/salesByInvoice'"
              ><i class="fas fa-file-invoice-dollar overview-icon"></i
              >{{ $t("main.sales") }}
            </router-link>
            <div class="invoice-total">{{ $moneyFormat(items.daySales) }}</div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/purchasesByBill'"
              ><i class="fas fa-file-invoice overview-icon"></i
              >{{ $t("main.purchases") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayPurchases) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/salesReturnsByInvoice'"
              ><i class="fas fa-exchange overview-icon"></i
              >{{ $t("main.saleReturns") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.daySaleReturns) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/purchasesReturnsByBill'"
              ><i class="fas fa-undo overview-icon"></i
              >{{ $t("main.purchaseReturns") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayPurchaseReturns) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/paymentHistory'"
              ><i class="fas fa-credit-card-front overview-icon"></i
              >{{ $t("main.salePayments") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.daySalesPayments) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/purchasePaymentHistory'"
              ><i class="fas fa-credit-card overview-icon"></i
              >{{ $t("main.purchasePayments") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayPurchasePayments) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/chequesHistory'"
              ><i class="fas fa-money-check-alt overview-icon"></i
              >{{ $t("main.saleschecks") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.daySalesCheques) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/purchaseChequesHistory'"
              ><i class="fas fa-credit-card-blank overview-icon"></i
              >{{ $t("main.purchasChecks") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayPurchaseCheques) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/discountsHistory'"
              ><i class="fas fa-badge-percent overview-icon"></i
              >{{ $t("main.saleDiscounts") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.daySalesDiscounts) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/purchaseDiscountsHistory'"
              ><i class="fas fa-percent overview-icon"></i
              >{{ $t("main.purchaseDiscounts") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayPurchaseDiscounts) }}
            </div>
          </div>
          <div class="invoice-item col-2 mb-4">
            <router-link :to="'/expenseHistory'"
              ><i class="fas fa-usd-square overview-icon"></i
              >{{ $t("main.expenses") }}
            </router-link>
            <div class="invoice-total">
              {{ $moneyFormat(items.dayExpenses) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
};
</script>
