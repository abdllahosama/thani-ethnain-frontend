<template>
  <tbody class="list">
    <emptyTable
      v-if="$parent.items.length == 0 && $parent.loading == 0"
      :emptyTableText="emptyTableText"
      :emptyTableSubText="emptyTableSubText"
      class="empty-tbody"
    />
    <template  v-for="(item, index) in $parent.items">
      <tr :key="index" @click="$parent.toggleMobile(index)" :class="{'active': item.showMobile}">
        <td v-if="selectAll"><input type="checkbox" :checked="$parent.selectedItems.find(el => el == item.id)" @click="addToSelectedItems(item.id)"></td>
        <template v-for="column in cloumns">
          <td v-if="column.type == 'mainLink'">
            <router-link :to="$parent.$parent.path + '/' + item.id">{{
              item[column.column]
            }}</router-link>
          </td>
          <tableTd
            v-if="column.type == 'text' && !column.disable"
            :class="column.supData ? 'sup_data' : ''"
            :text="item[column.column]"
            :after="column.after"
            :title="column.title"
            :icon="column.icon"
          />
          <td v-if="column.type == 'unit'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            {{ item[column.column] }} {{item.unit ? item.unit.unit : ''}}
          </td>
          <td v-if="column.type == 'textOrEmpty'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <span v-if="item[column.column] != null"
              >{{ item[column.column] }} {{ column.after }}</span
            >
          </td>
          <td v-if="column.type == 'link' && !column.disable">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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

          <td v-if="column.type == 'fromClintLink'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <router-link
              :to="'/customers/' + item.fromCustomer.id"
              v-if="item.from_client_type == 0 && item.fromCustomer"
              >{{ item.fromCustomer.name }}</router-link
            >
            <router-link
              :to="'/suppliers/' + item.fromSupplier.id"
              v-if="item.from_client_type == 1 && item.fromSupplier"
              >{{ item.fromSupplier.name }}</router-link
            >

            <router-link
              :to="'/partners/' + item.fromPartner.id"
              v-if="item.from_client_type == 2 && item.fromPartner"
              >{{ item.fromPartner.name }}</router-link
            >

            <router-link
              :to="'/accounts/' + item.fromAccount.id"
              v-if="item.from_client_type == 3 && item.fromAccount"
              >{{ item.fromAccount.name }}</router-link
            >

            {{ !item.fromCustomer && !item.fromSupplier && !item.fromPartner && !item.fromAccount ? "--" : "" }}
          </td>

          <td v-if="column.type == 'toClintLink'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <router-link
              :to="'/customers/' + item.toCustomer.id"
              v-if="item.to_client_type == 0 && item.toCustomer"
              >{{ item.toCustomer.name }}</router-link
            >
            <router-link
              :to="'/suppliers/' + item.toSupplier.id"
              v-if="item.to_client_type == 1 && item.toSupplier"
              >{{ item.toSupplier.name }}</router-link
            >

            <router-link
              :to="'/partners/' + item.toPartner.id"
              v-if="item.to_client_type == 2 && item.toPartner"
              >{{ item.toPartner.name }}</router-link
            >

            <router-link
              :to="'/accounts/' + item.toAccount.id"
              v-if="item.to_client_type == 3 && item.toAccount"
              >{{ item.toAccount.name }}</router-link
            >

            {{ !item.toCustomer && !item.toSupplier && !item.toPartner && !item.toAccount ? "--" : "" }}
          </td>


          <td v-if="column.type == 'opreation'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
          <td v-if="column.type == 'safeStat'" :class="hideMobile ? 'd-m-none' : ''">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <span v-if="item[column.column] == 0" class="badge badge-soft-danger"
              >لا</span
            >
            <span v-if="item[column.column] == 1" class="badge badge-soft-success"
              >نعم</span
            >
          </td>
          <td v-if="column.type == 'storeStat'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <span v-if="item[column.column] == 0" class="badge badge-soft-success"
              >إيداع</span
            >
            <span v-if="item[column.column] == 1" class="badge badge-soft-danger"
              >سحب</span
            >
          </td>
          <td v-if="column.type == 'trueOrFalse'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
            :title="column.title"
            :icon="column.icon"
          />
          <statusTd
            v-if="column.type == 'stat'"
            :text="item[column.column]"
            :class="column.hideMobile ? 'd-m-none' : ''"
            :title="column.title"
            :icon="column.icon"
          />
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
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
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
          </td>
          <td v-if="column.type == 'safeHistoryStat'">
            <strong class="mobile-title"><i v-if="column.icon" :class="'far fa-' + column.icon"></i>{{column.title}}</strong>
            <div class="badge badge-soft-success" v-if="item.balance > 0">
              اضافة
            </div>
            <div class="badge badge-soft-warning" v-if="item.balance < 0">
              سحب
            </div>
          </td>

          <td
            class="text-right edit-td"
            v-if="column.type == 'options'"
          >
            <div class="dropdown" :class="{'show' : item.showOptions}">
              <i class="far fa-ellipsis-h"   type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="item.showOptions" @click="$parent.toggleOptions(index, $event)" :ref="index"></i>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="{'show' : item.showOptions}"  :style="'top: ' + item.top + 'px; left: ' + item.left + 'px'" v-click-outside="removeItem">
                <template v-if="!item.ofline">
                  <template v-for="option in column.options">
                    <router-link
                      :to="$parent.$parent.path + '/' + item.id"
                      class="dropdown-item"
                      v-if="option.name == 'pointOfSale'"
                    >
                      <i class="far fa-cash-register"></i>
                      البدء بالبيع
                    </router-link>
                    <router-link
                      :to="$parent.$parent.path + '/' + item.id"
                      class="dropdown-item"
                      v-if="option.name == 'show'"
                    >
                      <i class="far fa-search"></i>
                      عرض
                    </router-link>
                    <router-link
                      :to="$parent.$parent.path + '/' + item.id + '/edit'"
                      class="dropdown-item"
                      v-if="
                        option.name == 'edit' &&
                        option.role &&
                        ($parent.$parent.$parent.conectStat ||
                          $parent.$parent.$parent.$parent.conectStat)
                      "
                    >
                      <i class="far fa-edit"></i>
                      تعديل
                    </router-link>
                    <a
                      :to="$parent.$parent.path + '/' + item.id + '/edit'"
                      class="dropdown-item"
                      v-if="option.name == 'stat' && option.role"
                      @click="$parent.changeStat(index)"
                    >
                      <i class="far fa-analytics"></i>
                      تغيير الحالة
                    </a>
                    <a
                      class="dropdown-item disabled"
                      v-if="
                        option.name == 'edit' &&
                        option.role &&
                        !(
                          $parent.$parent.$parent.conectStat ||
                          $parent.$parent.$parent.$parent.conectStat
                        )
                      "
                    >
                      <i class="far fa-edit"></i>
                      تعديل
                    </a>

                    <router-link
                      class="dropdown-item"
                      v-if="option.name == 'link' && item.stat == 1 && option.role"
                      :to="option.link + item.id"
                    >
                      <i :class="'far fa-' + option.icon"></i>
                      {{option.title}}
                    </router-link>


                    <div
                      class="report-container  report-btn"
                      v-if="
                        option.name == 'pointOfSaleReport' &&
                        item.stat == 1 &&
                        option.role
                      "
                    >
                      <button class="dropdown-item">
                        <i :class="'far fa-' + option.icon"></i>
                        {{option.title}}
                      </button>
                      <div class="report-show">
                        <router-link :to="'/salesByItem?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"> <i class="far fa-boxes ml-3"></i> تقرير المنتجات</router-link>
                        <router-link :to="'/salesByInvoice?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"><i class="far fa-file-invoice-dollar ml-3"></i>تقرير الفواتير</router-link>
                        <router-link :to="'/expenseHistory?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"><i class="far fa-usd-square ml-3"></i>تقرير المصروفات</router-link>
                        <router-link :to="'/paymentHistory?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"><i class="far fa-credit-card-front ml-3"></i>تقرير الدفعات</router-link>
                        <router-link :to="'/shippingOperationsByInvoice?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"><i class="far fa-shipping-fast ml-3"></i>تقرير الشحن</router-link>
                        <router-link :to="'/pointOfSalesOverview?session_number=' + item.session_number + '&point_of_sale_id=' + item.id + '&startDate='"><i class="far fa-file-chart-line ml-3"></i>لمحة عامة</router-link>
                      </div>
                    </div>

                    <a
                      @click="$parent.$parent.showModel(item.id, option.model)"
                      class="dropdown-item"
                      v-if="option.name == 'model' && option.role"
                      :title="option.title"
                    >
                      <i :class="'far fa-' + option.icon"></i>
                      عرض
                    </a>

                    <router-link
                      class="dropdown-item"
                      v-if="option.name == 'invoiceLink' && option.role"
                      :to="option.link + item.id"
                    >
                      <i :class="'far fa-' + option.icon"></i>
                      {{option.title}}
                    </router-link>

                    <a
                      :href="
                        site +
                        $parent.$parent.path +
                        '/' +
                        item.password +
                        '/customer/show'
                      "
                      class="dropdown-item"
                      target="_blank"
                      v-if="option.name == 'outLink'"
                    >
                      <i class="far fa-link"></i>
                      رابط خارجي
                    </a>

                    <a
                      :href="site + '/companiesUploads/' + subdomain + '/files/' + item.file"
                      class="dropdown-item"
                      target="_blank"
                      v-if="option.name == 'file' && item.file"
                    >
                      <i class="far fa-file"></i>
                      مرفق العملية
                    </a>

                    <a
                      @click="$parent.$parent.print(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'print'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                    @click="$parent.$parent.$parent.printAccountsDeposit(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printAccountsDeposit'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>
                  <a
                    @click="$parent.$parent.$parent.printAccountsWithdrawal(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printAccountsWithdrawal'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>
                    <a
                      @click="$parent.$parent.$parent.printQuotation(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printQuotation'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printInvoice(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printInvoice'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printBill(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printBill'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printSaleReturn(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printSaleReturn'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printEmployeesSalarie(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printEmployeesSalarie'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printEmployeesIncentive(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printEmployeesIncentive'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printEmployeesDeduction(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printEmployeesDeduction'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printEmployeesWithdrawal(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printEmployeesWithdrawal'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printPurchaseReturn(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printPurchaseReturn'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printOrder(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printOrder'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printDelevary(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printDelevary'"
                    >
                      <i class="far fa-print"></i>
                      طباعة امر التوصيل
                    </a>
                    
                    <a
                      @click="$parent.$parent.$parent.printPurchaseOrder(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printPurchaseOrder'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printProjectsTransfer(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printProjectsTransfer'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printSalesPayment(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printSalesPayment'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printPurchasePayment(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printPurchasePayment'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printExpense(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printExpense'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printSafesWithdrawal(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printSafesWithdrawal'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printSafesDeposit(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printSafesDeposit'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printSafesTransfer(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printSafesTransfer'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    
                    <a
                    @click="$parent.$parent.$parent.printSalesCheque(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printSalesCheque'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>
                  <a
                    @click="$parent.$parent.$parent.printSalesDiscount(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printSalesDiscount'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>
                  <a
                    @click="$parent.$parent.$parent.printPurchaseDiscount(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printPurchaseDiscount'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>
                  <a
                    @click="$parent.$parent.$parent.printPurchaseCheque(item.id)"
                    class="dropdown-item"
                    v-if="option.name == 'printPurchaseCheque'"
                  >
                    <i class="far fa-print"></i>
                    طباعة
                  </a>

                    <a
                      @click="$parent.$parent.$parent.printStoresDeposit(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printStoresDeposit'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printStoresWithdrawal(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printStoresWithdrawal'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.$parent.printStoresTransfer(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printStoresTransfer'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.showPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'showPointOfSale'"
                    >
                      <i class="far fa-search"></i>
                      عرض
                    </a>
                    <a
                      @click="$parent.$parent.showShipping(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'showShipping'"
                    >
                      <i class="far fa-search"></i>
                      عرض
                    </a>
                    <a
                      @click="$parent.$parent.showPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'shippingshowPointOfSale'"
                    >
                      <i class="far fa-file-invoice-dollar"></i>
                      فاتورة
                    </a>
                    <a
                      @click="$parent.printPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'printPointOfSale'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.printShippingOperation(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'printShippingOperation'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.changeDelivary(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'delivaryPointOfSale'"
                    >
                      <i class="far fa-truck"></i>
                      تعديل مندوب الشحن
                    </a>
                    <a
                      @click="$parent.moveToStore(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'moveStore'"
                    >
                      <i class="far fa-suitcase"></i>
                      نقل كامل البضاعة 
                    </a>
                    <a
                      @click="$parent.$parent.newSession(item.id)"
                      class="dropdown-item"
                      v-if="option.role && option.name == 'newSession'"
                    >
                      <i class="far fa-abacus"></i>
                      جلسة جديدة
                    </a>
                    <router-link
                      class="dropdown-item"
                      v-if="option.name == 'posLink' && option.role"
                      :to="option.link + '?point_of_sale_id=' + item.id + '&safe_id=' + item.safe_id + '&session_number=' + item.session_number"
                    >
                      <i :class="'far fa-' + option.icon"></i>
                      {{option.title}}
                    </router-link>
                    <router-link
                      class="dropdown-item"
                      v-if="option.name == 'posLinkTransefere' && option.role"
                      :to="option.link + '?point_of_sale_id=' + item.id + '&from_safe_id=' + item.safe_id + '&session_number=' + item.session_number"
                    >
                      <i :class="'far fa-' + option.icon"></i>
                      {{option.title}}
                    </router-link>

                    <a
                      :href="'https://wa.me/+2' + (item.customer ? item.customer.mobile : (item.supplier ? item.supplier.mobile : '')) +  '?text=تم انشاء الفاتورة بنجاح يمكنك متابعة فاتورتك عبر ' +  $linkGnirator($parent.$parent.path + '/' + item.id + '/pdf')"
                      target="_blank"
                      class="dropdown-item"
                      v-if="option.name == 'download'"
                    >
                      <i class="fab fa-whatsapp"></i>
                      ارسال عبر واتساب
                    </a>

                    <a
                      @click="$parent.$parent.pay(item.id)"
                      class="dropdown-item"
                      v-if="!item.stat && option.role && option.name == 'pay'"
                    >
                      <i class="far fa-dollar-sign"></i>
                      الدفع
                    </a>

                    <a
                      @click="$parent.$parent.pay(item.id)"
                      class="dropdown-item"
                      v-if="option.name == 'shippingPay'"
                    >
                      <i class="far fa-hand-holding-usd"></i>
                      استلام النقدية
                    </a>

                    <a
                      @click="$parent.sureDelete(index)"
                      class="dropdown-item"
                      v-if="
                        option.name == 'delete' &&
                        option.role &&
                        ($parent.$parent.$parent.conectStat ||
                          $parent.$parent.$parent.$parent.conectStat)
                      "
                    >
                      <i class="far fa-trash"></i>
                      حذف
                    </a>
                    <a
                      class="dropdown-item disabled"
                      v-if="
                        option.name == 'delete' &&
                        option.role &&
                        !(
                          $parent.$parent.$parent.conectStat ||
                          $parent.$parent.$parent.$parent.conectStat
                        )
                      "
                    >
                      <i class="far fa-trash"></i>
                      حذف
                    </a>
                  </template>
                </template>
                <template v-else>
                  <a class="dropdown-item" title="غير مرفوعة">
                    <i class="far fa-wifi-slash"></i>
                  </a>
                  <template v-for="option in column.options">
                    <a
                      @click="$parent.$parent.showPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'showPointOfSale'"
                    >
                      <i class="far fa-search"></i>
                      عرض
                    </a>
                    <a
                      @click="$parent.$parent.showShipping(index, true)"
                      class="dropdown-item"
                      v-if="option.name == 'showShipping'"
                    >
                      <i class="far fa-search"></i>
                      عرض
                    </a>
                    <a
                      @click="$parent.$parent.showPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'shippingshowPointOfSale'"
                    >
                      <i class="far fa-file-invoice-dollar"></i>
                      فاتورة
                    </a>
                    <a
                        @click="$parent.sureDelete(index)"
                        class="dropdown-item"
                        v-if="
                          option.name == 'delete' && option.role 
                        "
                      >
                        <i class="far fa-trash"></i>
                        حذف
                    </a>
                    <a
                      @click="$parent.printPos(item.upload_key)"
                      class="dropdown-item"
                      v-if="option.name == 'printPointOfSale'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.printShippingOperation(index, true)"
                      class="dropdown-item"
                      v-if="option.name == 'printShippingOperation'"
                    >
                      <i class="far fa-print"></i>
                      طباعة
                    </a>
                    <a
                      @click="$parent.$parent.changeDelivary(index, true)"
                      class="dropdown-item"
                      v-if="option.name == 'delivaryPointOfSale'"
                    >
                      <i class="far fa-truck"></i>
                      تعديل مندوب الشحن
                    </a>
                    <a
                      @click="$parent.$parent.pay(index, true)"
                      class="dropdown-item"
                      v-if="option.name == 'shippingPay'"
                    >
                      <i class="far fa-hand-holding-usd"></i>
                      استلام النقدية
                    </a>
                  </template>
                </template>
              </div>
            </div>
          </td>
        </template>
      </tr>
    </template>
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
      subdomain: localStorage.getItem("subdomain"),
      reportToggle: true,
    };
  },
  methods: {
    addToSelectedItems (id) {
      if (!this.$parent.selectedItems.find(el => el == id)) {
        this.$parent.selectedItems.push(id)
      } else {
        var index = this.$parent.selectedItems.indexOf(id);
        this.$parent.selectedItems.splice(index, 1); 
      }
    },
    removeItem (e, el) {

      
      //this.$parent.removeOptions()
    }
  },
  components: { tableTd, statusTd, loader, emptyTable },
  props: ["cloumns", "emptyTableText", "emptyTableSubText", "selectAll", "popUpMargin" ],
};
</script>
