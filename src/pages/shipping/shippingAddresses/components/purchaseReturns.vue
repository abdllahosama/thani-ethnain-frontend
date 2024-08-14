<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersPurchaseReturns.bills')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/purchaseReturns/create?customer_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.invoices_allow &&
            ($user.admin ||
              $user.role.invoices_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersPurchaseReturns.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$parent.$t('components.customersPurchaseReturns.searchForAnInvoice')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersPurchaseReturns.thereAreNoBills')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :statusSearch="true"
        :statusValues="[
          { title: $parent.$t('components.customersPurchaseReturns.situation'), value: '' },
          { title: $parent.$t('components.customersPurchaseReturns.all'), value: '' },
          { title: $parent.$t('components.customersPurchaseReturns.draft'), value: 0 },
          { title: $parent.$t('components.customersPurchaseReturns.sent'), value: 1 },
          { title: $parent.$t('components.customersPurchaseReturns.seen'), value: 2 },
          { title: $parent.$t('components.customersPurchaseReturns.driven'), value: 3 },
          { title: $parent.$t('components.customersPurchaseReturns.canceled'), value: 4 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $parent.$t('components.customersPurchaseReturns.invoice'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersPurchaseReturns.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'customer_id',
            title: $parent.$t('components.customersPurchaseReturns.customerName'),
            type: 'link',
            to: 'customer',
            sort: true,
            link: true,
          },
          {
            column: 'total',
            title: $parent.$t('components.customersPurchaseReturns.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $parent.$t('components.customersPurchaseReturns.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $parent.$t('components.customersPurchaseReturns.situation'),
            type: 'status',
            sort: true,
            values: [
              {
                title: $parent.$t('components.customersPurchaseReturns.draft'),
                value: 0,
                color: 'dark',
              },
              {
                title: $parent.$t('components.customersPurchaseReturns.sent'),
                value: 1,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersPurchaseReturns.seen'),
                value: 2,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersPurchaseReturns.driven'),
                value: 3,
                color: 'success',
              },
              {
                title: $parent.$t('components.customersPurchaseReturns.canceled'),
                value: 4,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersPurchaseReturns.settings'),
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
          attention: $parent.$t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $parent.$t('allerts.areYouReallySureToDeleteTheItem'),
          close: $parent.$t('allerts.close'),
          confirm: $parent.$t('allerts.confirm'),
          loading: $parent.$t('allerts.loading'),
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
