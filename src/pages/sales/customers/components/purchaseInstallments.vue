<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersPurchaseInstallments.purchaseInstallments')}}</h4>
        <router-link
          :to="'/purchaseInstallments/create?customer_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersPurchaseInstallments.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersPurchaseInstallments.FindACheck')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersPurchaseInstallments.thereAreNosalesInstallments')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersPurchaseInstallments.batch'), type: 'mainLink', sort: true },
          {
            column: 'customer_id',
            title: $t('components.customersPurchaseInstallments.customerName'),
            type: 'link',
            to: 'customer',
            sort: true,
            link: true,
          },
          {
            column: 'created_date',
            title: $t('components.customersPurchaseInstallments.RegistrationDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersPurchaseInstallments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersPurchaseInstallments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $parent.$t('components.customersPurchaseInstallments.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'payment_method_id',
            title: $t('components.customersPurchaseInstallments.PaymentMethod'),
            type: 'link',
            to: 'paymentMethod',
            sort: true,
            link: false,
          },
          {
            column: 'stat',
            title: $t('components.customersPurchaseInstallments.active'),
            type: 'status',
            sort: true,
            values: [
              { title: $t('components.customersPurchaseInstallments.Waiting'), value: 0, color: 'info' },
              { title: $t('components.customersPurchaseInstallments.driven'), value: 1, color: 'success' },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersPurchaseInstallments.settings'),
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
      path: "/purchaseInstallments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
