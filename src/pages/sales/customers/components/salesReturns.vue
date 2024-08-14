<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersSalesReturns.invoices')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/saleReturns/create?customer_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.invoices_allow &&
            ($user.admin ||
              $user.role.invoices_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersSalesReturns.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$parent.$t('components.customersSalesReturns.searchForAnInvoice')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersSalesReturns.thereAreNoBills')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :statusSearch="true"
        :statusValues="[
          { title: $parent.$t('components.customersSalesReturns.situation'), value: '' },
          { title: $parent.$t('components.customersSalesReturns.all'), value: '' },
          { title: $parent.$t('components.customersSalesReturns.draft'), value: 0 },
          { title: $parent.$t('components.customersSalesReturns.sent'), value: 1 },
          { title: $parent.$t('components.customersSalesReturns.seen'), value: 2 },
          { title: $parent.$t('components.customersSalesReturns.driven'), value: 3 },
          { title: $parent.$t('components.customersSalesReturns.canceled'), value: 4 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $parent.$t('components.customersSalesReturns.invoice'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersSalesReturns.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'customer_id',
            title: $parent.$t('components.customersSalesReturns.customerName'),
            type: 'link',
            to: 'customer',
            sort: true,
            link: true,
          },
          {
            column: 'total',
            title: $parent.$t('components.customersSalesReturns.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $parent.$t('components.customersSalesReturns.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $parent.$t('components.customersSalesReturns.situation'),
            type: 'status',
            sort: true,
            values: [
              {
                title: $parent.$t('components.customersSalesReturns.draft'),
                value: 0,
                color: 'dark',
              },
              {
                title: $parent.$t('components.customersSalesReturns.sent'),
                value: 1,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersSalesReturns.seen'),
                value: 2,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersSalesReturns.driven'),
                value: 3,
                color: 'success',
              },
              {
                title: $parent.$t('components.customersSalesReturns.canceled'),
                value: 4,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersSalesReturns.settings'),
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
      path: "/saleReturns",
    };
  },
  components: {
    indexTable,
  },
};
</script>
