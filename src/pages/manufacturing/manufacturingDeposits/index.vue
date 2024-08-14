<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('manufacturingDeposits.ManufacturingDeposits')"
          :description="$t('manufacturingDeposits.FromHereYouCanControlManufacturingProcessDeposits')"
        />
        <indexTable
          :searchText="$t('manufacturingDeposits.SearchForAnOperation')"
          :emptyTableText="$t('manufacturingDeposits.ThereAreNoWithdrawalsWithManufacturingProcesses')"
          :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
          :statusSearch="true"
          :statusValues="[
            { title: $t('orders.situation'), value: ''},
            { title: $t('orders.all'), value: ''},
            { title: $t('invoices.draft'), value: 0 },
            { title: $t('invoices.approved'), value: 1 },
          ]"
          :buttonmanufacturing="false"
          :cloumns="[
            {
              column: 'code',
              title: $t('manufacturingDeposits.operation'),
              type: 'mainLink',
              sort: true,
            },
            {column: 'manufacturing_operation_id',    title: $t('manufacturingDeposits.TheCodeOfTheOperation') ,type: 'linkInvoice', to:'manufacturingOperation', sort: true, link: true},
            {
              column: 'store_id',
              title: $t('manufacturingDeposits.TheNameOfTheStore'),
              type: 'link',
              to: 'store',
              sort: true,
              link: true,
            },
            {
              column: 'date',
              title: $t('manufacturingDeposits.theDateOfTheOperation'),
              type: 'text',
              sort: true,
            },
            {
              column: 'cost',
              title: $t('manufacturingDeposits.cost'),
              type: 'text',
              sort: true
            },
            {
              column: 'description',
              title: $t('manufacturingDeposits.thatAbout'),
              type: 'text',
              sort: true,
            },
            {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                {title: $t('invoices.draft'), value: 0, color: 'dark'},
                {title: $t('invoices.approved'), value: 1, color: 'success'},
              ]
            },
            {
              column: 'options',
              title: $t('manufacturingDeposits.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role:
                    $user.admin ||
                    $user.role.manufacturing_operations_edit,
                },
                {name: 'file'},
                { name: 'printmanufacturingDeposit', role: true },
                {
                  name: 'delete',
                  role:
                    $user.admin ||
                    $user.role.manufacturing_operations_edit,
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
  </div>
</template>
<script>
import axios from "axios";

import indexHeader from "@/elements/index/indexHeader.vue";
import indexTable from "@/elements/index/indexTable.vue";

export default {
  data() {
    return {
      path: "/manufacturingDeposits",
      items: [],

      awaitingSearch: false,
      delete_id: null,
      totalPages: 0,
      loading: 0,

      params: {},

      printInvoice: false,
    };
  },
  methods: {
    getItems() {
      this.loading = 1;
      this.totalPages = 0;
      this.items = [];
      this.$setParams(this.params);
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.items = response.data.data;
          if (this.$parent.localDatabase.manufacturingDeposits.length != 0) {
            var localItems = JSON.parse(
              JSON.stringify(this.$parent.localDatabase.manufacturingDeposits)
            );
            var items = localItems.concat(this.items);
            this.items = items;
          }
          this.totalPages = response.data.last_page;
          this.params.page = response.data.current_page;
          this.loading = 0;
          this.items.forEach((item) => {
            var store = this.$database.stores.find(
              (el) => el.id == item.store_id
            );
            item.store = store;
            var project = this.$database.projects.find(
              (el) => el.id == item.project_id
            );
            item.project = project;
          });
          localStorage.manufacturingDepositsCashe = JSON.stringify(response.data);
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
          this.$parent.model = 0;
          return response;
        });
    },
  },
  watch: {
    "params.search": function () {
      clearTimeout(this.awaitingSearch);
      this.awaitingSearch = setTimeout(() => {
        this.getItems();
      }, 400);
    },
    "$parent.stopUpload.manufacturingDeposits": function (val) {
      if (!val) {
        this.getItems();
        if (localStorage.getItem("manufacturingDepositsCashe") !== null) {
          this.loading = 0;
          var data = JSON.parse(localStorage.getItem("manufacturingDepositsCashe"));
          this.items = data.data;
          this.totalPages = data.last_page;
          this.page = data.current_page;
        }
      }
    },
    items: function () {
      this.items.forEach(item => {
        item.date = this.$dateFormat(item.date)
        item.cost = this.$moneyFormat(item.cost)
      })
    }
  },
  mounted() {
    this.params = this.$getParams();
    this.params.status = this.params.status ? this.params.status : "";
    this.getItems();
    if (this.$route.params.id) {
      this.$option.item_numberInvoice = this.$route.params.id;
      this.$router.replace(this.path);
    }
    if (localStorage.getItem("manufacturingDepositsCashe") !== null) {
      this.loading = 0;
      var data = JSON.parse(localStorage.getItem("manufacturingDepositsCashe"));
      this.items = data.data;
      this.totalPages = data.last_page;
      this.page = data.current_page;
    }
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
