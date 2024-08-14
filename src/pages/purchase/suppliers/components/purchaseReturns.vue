<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.suppliers.purchaseReturns')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/purchaseReturns/create?supplier_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.invoices_allow &&
            ($user.admin ||
              $user.role.invoices_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.suppliers.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('saleReturns.searchForAnInvoice')"
        :withoutCard="true"
        :emptyTableText="$t('saleReturns.thereAreNoBills')"
        :filter="{supplier_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :statusSearch="true"
        :statusValues="[
          { title: $t('quotations.situation'), value: '' },
          { title: $t('quotations.all'), value: '' },
          { title: $t('saleReturns.draft'), value: 0 },
          { title: $t('saleReturns.sent'), value: 1 },
          { title: $t('saleReturns.seen'), value: 2 },
          { title: $t('saleReturns.driven'), value: 3 },
          { title: $t('saleReturns.canceled'), value: 4 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $t('saleReturns.invoice'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $t('saleReturns.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'supplier_id',
            title: $t('saleReturns.customerName'),
            type: 'link',
            to: 'supplier',
            sort: true,
            link: true,
          },
          {
            column: 'total',
            title: $t('saleReturns.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $t('saleReturns.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $t('saleReturns.situation'),
            type: 'status',
            sort: true,
            values: [
              {
                title: $t('saleReturns.draft'),
                value: 0,
                color: 'dark',
              },
              {
                title: $t('saleReturns.sent'),
                value: 1,
                color: 'primary',
              },
              {
                title: $t('saleReturns.seen'),
                value: 2,
                color: 'primary',
              },
              {
                title: $t('saleReturns.driven'),
                value: 3,
                color: 'success',
              },
              {
                title: $t('saleReturns.canceled'),
                value: 4,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $t('saleReturns.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.sale_returns_edit,
              },
              { name: 'outLink', role: true },
              { name: 'printSaleReturn', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.sale_returns_delete,
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

import indexTable from "@/elements/index/indexTable.vue";

export default {
  data() {
    return {
      path: "/purchaseReturns",
    };
  },
  components: {
    indexTable,
  },
};
</script>
