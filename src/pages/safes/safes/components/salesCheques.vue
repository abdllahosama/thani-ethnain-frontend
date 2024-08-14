<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.salesChecks')}}</h4>
        <router-link
          :to="'/salesCheques/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.safes.searchCheck')"
        :withoutCard="true"
        :emptyTableText="$t('salesCheques.thereAreNosalesCheques')"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.safes.Paid'), type: 'mainLink', sort: true },
           {column: 'client_type',    title: $t('purchaseCheques.supplierName') ,type: 'clintLink', sort: true},
          {
            column: 'created_date',
            title: $t('components.safes.Paid'),
            type: 'text',
            sort: true,
          },
          {
            column: 'date',
            title: $t('salesCheques.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('salesCheques.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('salesCheques.amount'),
            type: 'text',
            sort: true
          },
          {
            column: 'payment_method_id',
            title: $t('components.safes.paymentMethod'),
            type: 'link',
            to: 'paymentMethod',
            sort: true,
            link: false,
          },
          {
            column: 'stat',
            title: $t('components.safes.theCondition'),
            type: 'status',
            sort: true,
            values: [
              { title: $t('components.safes.pending'), value: 0, color: 'info' },
              { title: $t('components.safes.driven'), value: 1, color: 'success' },
            ],
          },
          {
            column: 'options',
            title: $t('salesCheques.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.sales_cheques_edit,
              },
              {
                name: 'pay',
                role:
                  $user.admin ||
                  $user.role.sales_cheques_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.sales_cheques_delete,
              },
            ],
          },
        ]"
        :deleteText="{
          attention: $t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $t('allerts.areYouReallySureToDeleteTheItem'),
          close: $t('allerts.close'),
          confirm: $t('allerts.confirm'),
          loading: $t('allerts.loading'),
        }"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import indexTable from "@/elements/index/indexTable.vue";
export default {
  data() {
    return {
      path: "/salesCheques",
      items: [],

      awaitingSearch: false,
      delete_id: null,
      totalPages: 0,
      loading: 0,

      params: {
        safe_id: this.$route.params.id,
      },

      printInvoice: false,
    };
  },
  methods: {
    getItems() {
      this.loading = 1;
      this.totalPages = 0;
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.items = response.data.data;
          this.totalPages = response.data.last_page;
          this.page = response.data.current_page;
          this.loading = 0;
          localStorage.salesPaymentsCashe = JSON.stringify(response.data);
        });
    },
    deleteItem() {
      axios
        .post(
          this.$linkGnirator(this.path + "/" + this.items[this.delete_id].id),
          {
            _method: "DELETE",
          }
        )
        .then((response) => {
          this.getItems();
          this.delete_id = null;
          this.$parent.$parent.model = 0;
          return response;
        });
    },
  },
  watch: {
    search: function () {
      clearTimeout(this.awaitingSearch);
      this.awaitingSearch = setTimeout(() => {
        this.getItems();
      }, 400);
    },
    items: function () {
      this.items.forEach((item) => {
        item.created_date = this.$dateFormat(item.created_date);
        item.date = this.$dateFormat(item.date);
        item.cost = this.$moneyFormat(item.cost);
        var customer = this.$database.customers.find(
          (el) => el.id == item.customer_id
        );
        item.customer = customer;
        var supplier = this.$database.suppliers.find(
          (el) => el.id == item.supplier_id
        );
        item.supplier = supplier;
        var safe = this.$database.safes.find(
          (el) => el.id == item.safe_id
        );
        item.safe = safe;
      });
    },
  },
  mounted() {
    this.getItems();
  },
  components: {
    indexTable,
  },
};
</script>
