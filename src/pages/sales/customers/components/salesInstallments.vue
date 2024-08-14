<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersSalesInstallments.salesInstallments')}}</h4>
        <router-link
          :to="'/salesInstallments/create?customer_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersSalesInstallments.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersSalesInstallments.FindAInstallment')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersSalesInstallments.thereAreNosalesInstallments')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersSalesInstallments.Payment'), type: 'mainLink', sort: true },
          {
            column: 'customer_id',
            title: $t('components.customersSalesInstallments.customerName'),
            type: 'link',
            to: 'customer',
            sort: true,
            link: true,
          },
          {
            column: 'created_date',
            title: $t('components.customersSalesInstallments.RegistrationDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersSalesInstallments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersSalesInstallments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'total',
            title: $parent.$t('components.customersSalesInstallments.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'paid',
            title: $t('components.customersSalesInstallments.paid'),
            type: 'text',
            sort: true,
          },
          {
            column: 'stat',
            title: $t('components.customersSalesInstallments.active'),
            type: 'status',
            sort: true,
            values: [
              { title: $t('components.customersSalesInstallments.Waiting'), value: 1, color: 'info' },
              { title: $t('components.customersSalesInstallments.driven'), value: 0, color: 'success' },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersSalesInstallments.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.sales_cheques_edit,
              },
              {name: 'link',   role: $user.admin || $user.role.sales_cheques_edit, title:$t('salesInstallments.AddPayment'), icon: 'dollar-sign', link:'/salesInstallmentsPayments/create/'},
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
      path: "/salesInstallments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
