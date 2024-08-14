<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.purchaseChecks')}}</h4>
        <router-link
          :to="'/purchaseCheques/create?safe_id=' + $route.params.id"
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
        :searchText="$t('components.safes.searchForACheck')"
        :withoutCard="true"
        :emptyTableText="$t('salesCheques.thereAreNosalesCheques')"
        :filter="{safe_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.safes.Paid'), type: 'mainLink', sort: true },
           {column: 'client_type',    title: $t('purchaseCheques.supplierName') ,type: 'clintLink', sort: true},
          {
            column: 'created_date',
            title: $t('components.safes.dateRegistration'),
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

import indexTable from "@/elements/index/indexTable.vue";
export default {
  data() {
    return {
      path: "/purchaseCheques",
    };
  },
  components: {
    indexTable,
  },
};
</script>
