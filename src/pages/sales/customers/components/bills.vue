<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersBills.bills')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/bills/create?customer_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.bills_allow &&
            ($user.admin || $user.role.bills_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersBills.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$parent.$t('components.customersBills.searchForABill')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersBills.thereAreNoBills')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :statusSearch="true"
        :statusValues="[
          { title: $parent.$t('components.customersBills.situation'), value: '' },
          { title: $parent.$t('components.customersBills.all'), value: '' },
          { title: $parent.$t('components.customersBills.open'), value: 0 },
          { title: $parent.$t('components.customersBills.driven'), value: 1 },
          { title: $parent.$t('components.customersBills.canceled'), value: 2 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $parent.$t('components.customersBills.bill'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersBills.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'client_type',
            title: $parent.$t('components.customersBills.supplierName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'total',
            title: $parent.$t('components.customersBills.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $parent.$t('components.customersBills.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $parent.$t('components.customersBills.situation'),
            type: 'status',
            sort: true,
            values: [
              { title: $parent.$t('components.customersBills.open'), value: 0, color: 'dark' },
              {
                title: $parent.$t('components.customersBills.driven'),
                value: 1,
                color: 'success',
              },
              {
                title: $parent.$t('components.customersBills.canceled'),
                value: 2,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersBills.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.bills_edit,
              },
              { name: 'outLink', role: true },
              { name: 'printBill', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.bills_delete,
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
      path: "/bills",
    };
  },
  components: {
    indexTable,
  },
};
</script>
