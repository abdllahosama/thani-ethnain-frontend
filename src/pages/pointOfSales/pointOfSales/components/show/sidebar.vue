<template>
  <div>
    <div class="pos-sidebar-card card" :style="style">
      <div class="card-header">
        <h1 class="pos-sidebar-title">{{$t('pointOfSales.form.currentOrders')}}</h1>
        <button class="pos-sidebar-btn" @click="$parent.resetPointOfSale" :disabled="$parent.item.printedCheck">{{$t('pointOfSales.form.clearAll')}}</button>
        <div class="dropdown" :class="{'show' : showMnue}" v-click-outside="removeMnue">
          <button class="pos-sidebar-options-btn"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="showMnue" @click="toggleMnue()"><i class="fas fa-cog"></i></button>

          <div class="dropdown-menu" :class="{'show' : showMnue}" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="$parent.refreshPos();removeMnue()" ><i class="far fa-redo ml-3"></i>تحديث</a>
            <a class="dropdown-item" @click="resetOrderNumber()" ><i class="far fa-sort-numeric-down ml-3"></i>إعادة بدأ الترقيم</a>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/salesByItem?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"> <i class="far fa-boxes ml-3"></i> تقرير المنتجات</router-link>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/salesByInvoice?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"><i class="far fa-file-invoice-dollar ml-3"></i>تقرير الفواتير</router-link>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/expenseHistory?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"><i class="far fa-usd-square ml-3"></i>تقرير المصروفات</router-link>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/paymentHistory?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"><i class="far fa-credit-card-front ml-3"></i>تقرير الدفعات</router-link>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/shippingOperationsByInvoice?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"><i class="far fa-shipping-fast ml-3"></i>تقرير الشحن</router-link>
            <router-link v-if="$user.admin || $user.role.reports_show" class="dropdown-item" :to="'/pointOfSalesOverview?session_number=' + $parent.options.session_number + '&point_of_sale_id=' + $parent.options.id + '&startDate='"><i class="far fa-file-chart-line ml-3"></i>لمحة عامة</router-link>
          </div>
        </div>
        
      </div>
      <vue-custom-scrollbar class="card-body" :settings="settings">
        <div class="pos-sidebar-products-container" v-if="$parent.options.show_products">
          <template v-for="(item, index) in $parent.item.invoiceItems">
            <div class="pos-sidebar-item" :key="index" v-if="!item.refrance_product_id">
              
              <div class="d-flex">
                <div class="item-sup-items">
                  <div class="item-title">{{ item.name }}</div>
                  {{ item.detailName ? "(" + item.detailName + ")" : "" }}
                  <template v-for="(minItem, index) in $parent.item.invoiceItems">
                    <template
                      v-if="
                        minItem.refrance_product_id &&
                        minItem.refrance_product_id == item.refrance_id
                      "
                      ><br :key="index" />({{ minItem.name }})</template>
                  </template>
                  <div class="item-price">
                    <input
                    v-if="$parent.options.change_price"
                    type="number"
                    @change="$parent.calculateTotal()"
                    v-model="item.price"
                    class="form-control"
                    min="1"
                  />
                  <template
                    v-if="!$parent.options.change_price && !item.refrance_id"
                  >
                    {{ $moneyFormat(item.price) }}
                  </template>
                  <template
                    v-if="!$parent.options.change_price && item.refrance_id"
                  >
                    {{ $moneyFormat(item.countedPrice) }}
                  </template>
                  </div>
                </div>
                <div class="item-quantity sm-quantity-btn">
                    <button class="btn btn-light" @click="addQuantity(index)" :disabled="item.printedCheck" >
                      <i class="fas fa-plus"></i>
                    </button>
                    <div class="item-quantity-inner" >{{item.quantity}}</div>
                    <button class="btn btn-light" @click="removeQuantity(index)" :disabled="item.printedCheck">
                      <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="item-controls">
                  <button
                    class="btn btn-light item-controls-btn  ml-1"
                    @click="$parent.showProductComment(index)"
                    :disabled="item.printedCheck"
                  >
                    <i class="fas fa-comment" style="color: #86A9DD;"></i>
                  </button>
                  <button
                    class="btn btn-light item-controls-btn"
                    @click="$parent.deleteItem(index)"
                    :disabled="item.printedCheck"
                  >
                    <i class="fas fa-trash" style="color: #EA7272;"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <div class="pos-sidebar-empty-table" v-if="$parent.item.invoiceItems.length == 0">
            {{ $t('pointOfSales.show.ThereAreNoProducts') }}
          </div>
        </div>
        <div class="pos-sidebar-data" v-if="$parent.options.hall_allow && $parent.selectedTable">
          <div class="pos-sidebar-data-title">
            {{ $t('components.pointOfSalesShow.tableName') }}
          </div>
          <div class="pos-sidebar-data-body">
            {{$tables[$parent.options.id][$parent.selectedTable].name}}
          </div>
        </div>
        <div class="pos-sidebar-data" v-if="$parent.options.delivery_allow && $parent.selectedTable == 0">
          <div class="pos-sidebar-data-title">
            {{ $t('components.pointOfSalesShow.requestType') }}
          </div>
          <div class="pos-sidebar-data-body">
            <input type="radio" v-model="$parent.item.order_type" value="0" id="shipping0" class="shipping-check"> <label for="shipping0" class="shipping0">{{ $t('components.pointOfSalesShow.Receipt') }}</label>

            <input type="radio" v-model="$parent.item.order_type" value="1" id="shipping1" class="shipping-check" @click="$parent.openShipping()"> <label for="shipping1">{{ $t('components.pointOfSalesShow.Connecting') }}</label></div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.options.marketer_allow">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.marketer')}}
          </div>
          <div class="pos-sidebar-data-body">
            <div
              class="add-input table-add-input"
              v-if="$parent.options.marketer_allow"
              :disabled="$parent.item.printedCheck"
            >
              <select 
                v-model="$parent.item.marketer_id"
                class=""
                :disabled="$parent.item.printedCheck"
              >
                <option value="0">{{$t('components.pointOfSalesShow.marketer')}}</option>
                <optgroup :label="$t('components.pointOfSalesShow.marketers')">
                  <option
                    v-for="(marketer, index) in $database.marketers"
                    :value="marketer.id"
                    :key="index"
                  >
                    {{ marketer.name }}
                  </option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.options.show_balance">
          <div class="pos-sidebar-data-title">
            {{ $t('components.pointOfSalesShow.MachineBalance') }}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($database.safes.find(el => el.id == $parent.options.safe_id).balance) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.item.priceList_id != 0 || $parent.options.change_priceList">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.ListOfPrices')}}
          </div>
          <div class="pos-sidebar-data-body">
              <div
                class="add-input table-add-input"
              >
                <select
                  v-model="$parent.item.priceList_id"
                  :disabled="!$parent.options.change_priceList"
                  class="form-control m-w-50"
                >
                  <option value="0">{{$t('components.pointOfSalesShow.ChoosePriceList')}}</option>
                  <optgroup label="$t('components.pointOfSalesShow.PriceLists')">
                    <option
                      v-for="(priceList, index) in $database.priceLists"
                      :value="priceList.id"
                      :key="index"
                    >
                      {{ priceList.name }}
                    </option>
                  </optgroup>
                </select>
              </div>
          </div>
        </div>


        <div class="pos-sidebar-data" v-if="$parent.options.pay_methods_allow">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.PaymentMethod')}}
          </div>
          <div class="pos-sidebar-data-body">
            <div
              class="add-input table-add-input"
            >
              <select
                v-model="$parent.payment_method"
                :disabled="$parent.item.printedCheck"
              >
                <option value="">{{$t('components.pointOfSalesShow.ChooseAPaymentMethod')}}</option>
                <option v-for="(paymentMethod, index) in $parent.options.payment_methods" :key="index" :value="paymentMethod.safe_id">{{paymentMethod.name}}</option>
              </select>
            </div>
          </div>
        </div>

        <hr/>
        <div class="pos-sidebar-data">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.theTotal')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.subTotal) }}
          </div>
        </div>
        <div class="pos-sidebar-data" v-if="$parent.options.discount || $parent.options.change_discount">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.DiscountRate')}}
          </div>
          <div class="pos-sidebar-data-body">
            <div class="d-flex">
              <input
                type="number"
                :max="$parent.options.max_discount"
                placeholder="0"
                v-model="$parent.item.totalDiscount"
                @keyup="$parent.calculateTotal()"
                :disabled="!$parent.options.change_discount || $parent.item.printedCheck"
              />
              <span>%</span>
            </div>
          </div>
        </div>

        <div class="pos-sidebar-data"  v-if="$parent.options.discount || $parent.options.change_discount || $parent.options.change_product_discount">
          <div class="pos-sidebar-data-title">
            {{ $t('pointOfSales.show.Discount') }}
          </div>
          <div class="pos-sidebar-data-body">
            - {{ $moneyFormat($parent.item.discount) }}
          </div>
        </div>

        <div class="pos-sidebar-data">
          <div class="pos-sidebar-data-title">
            <input
              v-model="$parent.item.edit_text"
              :placeholder="$t('pointOfSales.show.add')"
              :disabled="$parent.item.printedCheck"
            />
          </div>
          <div class="pos-sidebar-data-body">
              <input
                type="number"
                placeholder="0"
                v-model="$parent.item.edit"
                min="0"
                @keyup="$parent.calculateTotal()"
                :disabled="$parent.item.printedCheck"
              />
          </div>
        </div>
        <div class="pos-sidebar-data"   v-if="$parent.options.tax_id && $parent.selectedTable != 0">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.Tax')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.tax) }}
          </div>
        </div>

        <div class="pos-sidebar-data"   v-if="$parent.options.tax_id">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.Tax')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.tax) }}
          </div>
        </div>
        <div class="pos-sidebar-data" v-if="$parent.options.service && $parent.selectedTable != 0">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.theService')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.service) }}
          </div>
        </div>

        <div class="pos-sidebar-data">
          <div class="pos-sidebar-data-total">
            {{ $t('pointOfSales.show.Total') }}
          </div>
          <div class="pos-sidebar-data-body" style="color: #D74848">
            {{ $moneyFormat($parent.item.total) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.shippingOperation.cost > 0 && $parent.item.order_type == 1">
          <div class="pos-sidebar-data-total">
            {{ $t('pointOfSales.show.shippingCost') }}
          </div>
          <div class="pos-sidebar-data-body" style="color: #D74848">
            {{ $moneyFormat($parent.shippingOperation.cost) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.shippingOperation.cost > 0 && $parent.item.order_type == 1">
          <div class="pos-sidebar-data-total">
            {{ $t('pointOfSales.show.totalWithShipping') }}
          </div>
          <div class="pos-sidebar-data-body" style="color: #D74848">
            {{ $moneyFormat($parent.item.totalWithShipping) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.options.rest_allow">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.paidUp')}}
          </div>
          <div class="pos-sidebar-data-body">
            <input
              type="number"
              placeholder="0"
              v-model="$parent.paid"
              @keyup="calculateRest()"
              :disabled="$parent.item.printedCheck"
            />
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.options.rest_allow">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.theRest')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.rest) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if="$parent.options.show_cost == 2 || ($parent.options.show_cost == 1 && showCost)">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.cost')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.cost) }}
          </div>
        </div>

        <div class="pos-sidebar-data" v-if=" $parent.options.show_earn == 2 || ($parent.options.show_earn == 1 && showEarn)">
          <div class="pos-sidebar-data-title">
            {{$t('components.pointOfSalesShow.Profit')}}
          </div>
          <div class="pos-sidebar-data-body">
            {{ $moneyFormat($parent.item.earning) }}
          </div>
        </div>
        <label class="pos-notes-lable">{{$t('components.pointOfSalesShow.notes')}}</label>
        <textarea
          :placeholder="$t('components.pointOfSalesShow.AddNotes')"
          v-model="$parent.item.notes"
          class="form-control pos-notes-input"
          :disabled="$parent.item.printedCheck"
        >
        </textarea>
        <div class="d-flex">
          <button
            v-if="(!$parent.options.show_rest  && !$parent.options.change_customer) || $parent.item.order_type == 1"
            class="btn btn-primary pos-side-checkout w-100"
            :disabled="$parent.item.invoiceItems.length == 0"
            @click="$parent.checkOut()"
          >
            <i class="fas fa-credit-card-front"></i>
            {{ $t('pointOfSales.show.payingOff') }}
          </button>
          <button
            v-if="($parent.options.show_rest || $parent.options.change_customer) && ($parent.item.order_type == 0 || $parent.item.order_type == 2) "
            class="btn btn-primary pos-side-checkout w-100"
            :disabled="$parent.item.invoiceItems.length == 0"
            @click="$parent.showCash()"
          >
            <i class="fas fa-credit-card-front"></i>
            {{ $t('pointOfSales.show.payingOff') }}
          </button>

            <button
              class="btn btn-primary  pos-side-print"
              v-if="$parent.options.multi_print && $parent.options.print_type != 0"
              :disabled="$parent.selectedTable == 0 || $parent.item.invoiceItems.length < 1"
              @click="$parent.printCheck"
            >
            <i class="fas fa-print"></i>
              {{ $t('components.pointOfSalesShow.Printing') }}
            </button>
          </div>
          <div style="height:40px;"></div>
      </vue-custom-scrollbar>
      
    </div>
  </div>
</template>
<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  data() {
    return {
      style: "top: 80px;height: calc(100% - 100px);",
      settings: {
        suppressScrollY: false,
        suppressScrollX: true
      },
      showMnue:false
    };
  },
  mounted() {
    var el = this;
    window.addEventListener("scroll", function (e) {
      if (this.scrollY <= 50) {
        el.style = "top: " + (63 - this.scrollY) + "px;height: calc(100% - " + (68 - this.scrollY) +"px);";
      } else {
        el.style = "top: 10px;height: calc(100% - 30px);";
      }
    });
  },
  methods: {
    addQuantity (id) {
      this.$parent.item.invoiceItems[id].quantity += 1
      this.$parent.calculateTotal()
    },
    removeQuantity (id) {
      if (this.$parent.item.invoiceItems[id].quantity > 1) {
        this.$parent.item.invoiceItems[id].quantity -= 1
        this.$parent.calculateTotal()
      }
    },
    toggleMnue() {
      this.showMnue = !this.showMnue
    },
    removeMnue() {
      this.showMnue = false
    },
    resetOrderNumber () {
      this.removeMnue()
      localStorage.setItem("orderNumber", 0);
      this.$parent.aletText = "تم إعادة الترقيم بنجاح";
      this.$parent.alertType = "success";
    }
  },
  components: {
    vueCustomScrollbar
}
};
</script>
