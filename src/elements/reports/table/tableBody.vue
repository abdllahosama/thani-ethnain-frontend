<template>
  <tbody class="list">
    <emptyTable
      v-if="$parent.$parent.items.length == 0 && $parent.$parent.loading == 0"
      :emptyTableText="emptyTableText"
      :emptyTableSubText="emptyTableSubText"
    />
    <tr v-for="(item, index) in $parent.$parent.items" :key="index">
      <template v-for="column in cloumns">
        <td v-if="column.type == 'mainLink'" :class="column.supData ? 'sup_data' : ''">
          <router-link :to="$parent.$parent.$parent.path + '/' + item.id">{{
            item[column.column]
          }}</router-link>
        </td>
        <td v-if="column.type == 'reportMainLink'" :class="column.supData ? 'sup_data' : ''">
          <router-link :to="column.link + '/' + item.id">{{
            item[column.column]
          }}</router-link>
        </td>
        <tableTd
          v-if="column.type == 'text' && !column.disable"
          :class="column.supData ? 'sup_data' : ''"
          :text="item[column.column]"
          :after="column.after"
        />
        <td v-if="column.type == 'unit'">
            {{ item[column.column] }} {{item.unit ? item.unit.unit : ''}}
        </td>
        <td v-if="column.type == 'textOrEmpty'">
          <span v-if="item[column.column] != null"
            >{{ item[column.column] }} {{ column.after }}</span
          >
        </td>
        <td v-if="column.type == 'link' && !column.disable">
          <router-link
            :to="
              '/' +
              column.to +
              's/' +
              (item[column.to] ? item[column.to].id : item[column.element].id)
            "
            v-if="(item[column.to] || item[column.element]) && column.link"
            >{{
              item[column.to] ? item[column.to].name : item[column.element].name
            }}</router-link
          >
          <span
            v-if="(item[column.to] || item[column.element]) && !column.link"
            >{{
              item[column.to] ? item[column.to].name : item[column.element].name
            }}</span
          >
          {{ !item[column.to] && !item[column.element] ? "--" : "" }}
        </td>
        <td v-if="column.type == 'clintLink'">
          <router-link
            :to="'/customers/' + item.customer.id"
            v-if="item.client_type == 0 && item.customer"
            >{{ item.customer.name }}</router-link
          >
          <router-link
            :to="'/suppliers/' + item.supplier.id"
            v-if="item.client_type == 1 && item.supplier"
            >{{ item.supplier.name }}</router-link
          >
          {{ !item.customer && !item.supplier ? "--" : "" }}
        </td>
        <td v-if="column.type == 'accountLink'">
          <router-link
            :to="'/customers/' + item.customer.id"
            v-if="item.client_type == 0 && item.customer"
          >{{ item.customer.name }}</router-link>
          <router-link
            :to="'/suppliers/' + item.supplier.id"
            v-if="item.client_type == 1 && item.supplier"
          >{{ item.supplier.name }}</router-link>
          <router-link
            :to="'/Partner/' + item.Partner.id"
            v-if="(item.client_type == 2 && item.partner)"
          >{{ item.partner.name }}</router-link>
          <router-link
            :to="'/account/' + item.account.id"
            v-if="(item.client_type == 3 && item.account)"
          >{{ item.account.name }}</router-link>
          <router-link
            :to="'/safe/' + item.safe.id"
            v-if="(item.client_type == 5 && item.safe)"
          >{{ item.safe.name }}</router-link>
          <router-link
            :to="'/employee/' + item.employee.id"
            v-if="(item.client_type == 6 && item.employee)"
          >{{ item.employee.name }}</router-link>
        </td>
        <td v-if="column.type == 'opreation'">
          <router-link
            :to="'/invoices/' + item.invoice.id"
            v-if="item.invoice"
            >{{ item.invoice.code }}</router-link
          >
          <router-link :to="'/bills/' + item.bill.id" v-if="item.bill">{{
            item.bill.code
          }}</router-link>
          <router-link
            :to="'/saleReturns/' + item.saleReturn.id"
            v-if="item.saleReturn"
            >{{ item.saleReturn.code }}</router-link
          >
          <router-link
            :to="'/purchaseReturns/' + item.purchaseReturn.id"
            v-if="item.purchaseReturn"
            >{{ item.purchaseReturn.code }}</router-link
          >
          <router-link
            :to="'/storesDeposits/' + item.storesDeposit.id"
            v-if="item.storesDeposit"
            >{{ item.storesDeposit.code }}</router-link
          >
          <router-link
            :to="'/storesWithdrawals/' + item.storesWithdrawal.id"
            v-if="item.storesWithdrawal"
            >{{ item.storesWithdrawal.code }}</router-link
          >
          <router-link
            :to="'/storesTransfers/' + item.storesTransfer.id"
            v-if="item.storesTransfer"
            >{{ item.storesTransfer.code }}</router-link
          >
        </td>
        <td v-if="column.type == 'linkInvoice'">
          <router-link
            :to="'/' + column.to + 's/' + item[column.to].id"
            v-if="item[column.to] && column.link"
            >{{ item[column.to].code }}</router-link
          >
          <span v-if="item[column.to] && !column.link">{{
            item[column.to].code
          }}</span>
          {{ !item[column.to] ? "--" : "" }}
        </td>
        <td v-if="column.type == 'linksalesInstallment'">
          <router-link
            :to="'/' + column.to + 's/' + item[column.to].id"
            v-if="item[column.to] && column.link"
            >{{ item[column.to].code }}</router-link
          >
          <span v-if="item[column.to] && !column.link">{{
            item[column.to].code
          }}</span>
          {{ !item[column.to] ? "--" : "" }}
        </td>
        <td v-if="column.type == 'safeStat'">
          <span v-if="item[column.column] == 0" class="badge badge-soft-danger"
            >لا</span
          >
          <span v-if="item[column.column] == 1" class="badge badge-soft-success"
            >نعم</span
          >
        </td>
        <td v-if="column.type == 'storeStat'">
          <span v-if="item[column.column] == 0" class="badge badge-soft-success"
            >إيداع</span
          >
          <span v-if="item[column.column] == 1" class="badge badge-soft-danger"
            >سحب</span
          >
        </td>
        <td v-if="column.type == 'trueOrFalse'">
          <span v-if="item[column.column] == 0" class="badge badge-soft-danger"
            >لا</span
          >
          <span v-if="item[column.column] == 1" class="badge badge-soft-success"
            >نعم</span
          >
        </td>
        <tableTd
          v-if="column.type == 'outText'"
          :text="column.value"
          :after="column.after"
        ></tableTd>
        <statusTd
          v-if="column.type == 'stat'"
          :text="item[column.column]"
        ></statusTd>
        <td class="orders-order" v-if="column.type == 'status'">
          <div
            :class="'badge badge-' + value.color"
            v-for="value in column.values"
            v-if="value.value == item[column.column]"
          >
            {{ value.title }}
          </div>
        </td>
        <td v-if="column.type == 'safeOpration'">
          <router-link
            :to="'/salesPayments/' + item.salesPayment.id"
            v-if="item.salesPayment"
            >{{ item.salesPayment.id }}</router-link
          >
          <router-link
            :to="'/purchasePayments/' + item.purchasePayment.id"
            v-if="item.purchasePayment"
            >{{ item.purchasePayment.id }}</router-link
          >
          <router-link
            :to="'/expenses/' + item.expense.id"
            v-if="item.expense"
            >{{ item.expense.id }}</router-link
          >
          {{
            !item.salesPayment && !item.purchasePayment && !item.expense
              ? "--"
              : ""
          }}
        <router-link
            :to="'/incomes/' + item.income.id"
            v-if="item.income"
            >{{ item.income.id }}</router-link
          >
          {{
            !item.salesPayment && !item.purchasePayment && !item.expense &&  !item.income
              ? "--"
              : ""
          }}
        </td>
        <td v-if="column.type == 'safeHistoryStat'">
          <div class="badge badge-soft-success" v-if="item.balance > 0">
            اضافة
          </div>
          <div class="badge badge-soft-warning" v-if="item.balance < 0">
            سحب
          </div>
        </td>
        <td v-if="column.type == 'reportCode'">
          <router-link v-if="item.type == 'invoice'" :to="'/invoices/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'bill'" :to="'/bills/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'saleReturn'" :to="'/saleReturns/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'purchaseReturn'" :to="'/purchaseReturns/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'salesPayment'" :to="'/salesPayments/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'purchsePayment'" :to="'/purchasePayments/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'salesCheque'" :to="'/salesCheques/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'purchaseCheque'" :to="'/purchaseCheques/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'salesInstallment'" :to="'/salesInstallments/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'purchaseInstallment'" :to="'/purchaseInstallments/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'salesDiscount'" :to="'/salesDiscounts/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'purchaseDiscount'" :to="'/purchaseDiscounts/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'expense'" :to="'/expenses/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'income'" :to="'/incomes/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'safeDeposit'" :to="'/safesDeposits/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'safeWithdrawal'" :to="'/safesWithdrawals/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'fromSafeTransfere'" :to="'/safesTransfers/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'toSafeTransfere'" :to="'/safesTransfers/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'storesDeposit'" :to="'/storesDeposits/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'storesWithdrawal'" :to="'/storesWithdrawals/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'storesTransferFrom'" :to="'/storesTransfers/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'storesTransferTo'" :to="'/storesTransfers/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'projectsDeposit'" :to="'/projectsDeposits/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'projectsWithdrawal'" :to="'/projectsWithdrawals/' + item.id">{{ item[column.column]}}</router-link>
          
          <router-link v-if="item.type == 'partnersSettlement'" :to="'/partnersSettlements/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'partnersProfit'" :to="'/partnersProfits/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'partnersDeposit'" :to="'/partnersDeposits/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'partnerWithdrawal'" :to="'/partnersWithdrawals/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'employeesSalary'" :to="'/employeesSalaries/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'employeesIncentive'" :to="'/employeesIncentives/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'employeesDeduction'" :to="'/employeesDeductions/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'employeesWithdrawal'" :to="'/employeesWithdrawals/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'accountsDeposit'" :to="'/accountsDeposits/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'accountsWithdrawal'" :to="'/accountsWithdrawals/' + item.id">{{ item[column.column]}}</router-link>

          <router-link v-if="item.type == 'fromAccountsTransfer'" :to="'/accountsTransfers/' + item.id">{{ item[column.column]}}</router-link>
          <router-link v-if="item.type == 'toAccountsTransfer'" :to="'/accountsTransfers/' + item.id">{{ item[column.column]}}</router-link>
        </td>
        <td v-if="column.type == 'account'">
          <router-link v-if="item.customer" :to="'/customers/' + item.customer_id">{{ item.customer.name}}</router-link>
          <router-link v-if="item.supplier" :to="'/suppliers/' + item.supplier_id">{{ item.supplier.name}}</router-link>
          <router-link v-if="item.safe"     :to="'/safes/' + item.safe_id">{{ item.safe.name}}</router-link>
          <router-link v-if="item.account" :to="'/accounts/' + item.account_id">{{ item.account.name}}</router-link>
          <router-link v-if="item.partner" :to="'/partners/' + item.partner_id">{{ item.partner.name}}</router-link>
        </td>
        <td v-if="(column.type == 'statement' && !item.product_id)" v-html="item.statement"></td>
        <td v-if="(column.type == 'statement' && item.product_id)">
          <router-link :to="'/products/' + item.product_id" v-if="item.product_id > 0">{{ item.statement}}</router-link>
        </td>
        <!--
          <router-link :to="'/partners/' + item.partner_id" v-if="item.partner_id > 0">{{ item.partner_name}}</router-link>
          <router-link :to="'/customer/' + item.customer_id" v-if="item.customer_id > 0">{{ item.customer_name}}</router-link>
          <router-link :to="'/supplier/' + item.supplier_id" v-if="item.supplier_id > 0">{{ item.supplier_name}}</router-link>
          <router-link :to="'/employees/' + item.employee_id" v-if="item.employee_id > 0">{{ item.employee_name}}</router-link>
        -->
        <td v-if="column.type == 'quantity'">
          {{ item.quantity }} {{ item.unit}}
        </td>
        <td v-if="column.type == 'reportType'">
          <span v-if="item[column.column] == 'invoice'">فاتورة بيع</span>
          <span v-if="item[column.column] == 'bill'">فاتورة شراء</span>
          <span v-if="item[column.column] == 'saleReturn'">مرتجع بيع</span>
          <span v-if="item[column.column] == 'purchaseReturn'">مرتجع شراء</span>
          <span v-if="item[column.column] == 'salesPayment'">سند قبض</span>
          <span v-if="item[column.column] == 'purchsePayment'">سند صرف</span>
          <span v-if="item[column.column] == 'salesCheque'">شيك بيع</span>
          <span v-if="item[column.column] == 'purchaseCheque'">شيك شراء</span>

          <span v-if="item[column.column] == 'salesInstallment'">قسط بيع</span>
          <span v-if="item[column.column] == 'purchaseInstallment'">قسط شراء</span>

          <span v-if="item[column.column] == 'salesDiscount'">خصم مسموح</span>
          <span v-if="item[column.column] == 'purchaseDiscount'">خصم مكتسب</span>
          <span v-if="item[column.column] == 'expence'">مصروف</span>
          <span v-if="item[column.column] == 'expense'">مصروف</span>
          <span v-if="item[column.column] == 'income'">ايراد</span>

          <span v-if="item[column.column] == 'safeDeposit'">إيداع الي الخزينة</span>
          <span v-if="item[column.column] == 'safeWithdrawal'">سحب من الخزينة</span>
          <span v-if="item[column.column] == 'fromSafeTransfere'">نقل من الخزينة</span>
          <span v-if="item[column.column] == 'toSafeTransfere'">نقل الي الخزينة</span>

          <span v-if="item[column.column] == 'storesDeposit'">إيداع الي المخزن</span>
          <span v-if="item[column.column] == 'storesWithdrawal'">سحب من المخزن</span>
          <span v-if="item[column.column] == 'storesTransferFrom'">نقل من المخزن</span>
          <span v-if="item[column.column] == 'storesTransferTo'">نقل الي المخزن</span>

          <span v-if="item[column.column] == 'projectsDeposit'">إيداع خامات</span>
          <span v-if="item[column.column] == 'projectsWithdrawal'">سحب خامات</span>
          <span v-if="item[column.column] == 'partnersSettlement'">عملية تسوية</span>
          <span v-if="item[column.column] == 'partnersProfit'">عملية تقاسم ارباح</span>

          <span v-if="item[column.column] == 'partnersDeposit'">عملية ايداع شريك</span>
          <span v-if="item[column.column] == 'partnerWithdrawal'">عملية سحب شريك</span>
          <span v-if="item[column.column] == 'employeesSalary'">عملية راتب موظف</span>
          <span v-if="item[column.column] == 'employeesIncentive'">عملية حافز موظف</span>
          <span v-if="item[column.column] == 'employeesDeduction'">عملية خصم موظف</span>
          <span v-if="item[column.column] == 'employeesWithdrawal'">عملية سحب موظف</span>

          <span v-if="item[column.column] == 'accountsDeposit'">عملية ايداع حساب</span>
          <span v-if="item[column.column] == 'accountsWithdrawal'">عملية سحب حساب</span>

          <span v-if="item[column.column] == 'fromAccountsTransfer'">عملية تحويل الي حساب</span>
          <span v-if="item[column.column] == 'toAccountsTransfer'">عملية تحويل من حساب</span>
        </td>

      </template>
    </tr>
  </tbody>
</template>
<script>
import tableTd from "./tableTd.vue";
import statusTd from "./statusTd.vue";
import loader from "./loader.vue";
import emptyTable from "./emptyTable.vue";

export default {
  data() {
    return {
      site: localStorage.getItem("site"),
      reportToggle: true,
    };
  },
  components: { tableTd, statusTd, loader, emptyTable },
  props: ["cloumns", "emptyTableText", "emptyTableSubText", "selectAll" ],
};
</script>
