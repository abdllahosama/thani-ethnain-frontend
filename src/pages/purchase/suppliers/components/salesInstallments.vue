<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.suppliers.saleInstallments')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.purchasePayments_allow &&
            ($user.admin ||
              $user.role.purchase_payments_add)
          "
          title="$t('components.suppliers.addPremium')"
          :to="'/salesInstallments/create?supplier_id=' + $route.params.id"
        >
          <i class="fas fa-plus"></i> {{$t('components.suppliers.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.suppliers.searchForPremium')"
        :withoutCard="true"
        :emptyTableText="
          $t('purchaseCheques.thereAreNopurchaseCheques')
        "
        :filter="{supplier_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.suppliers.Paid'), type: 'mainLink', sort: true },
          {
            column: 'supplier_id',
            title: $t('components.suppliers.supplierName'),
            type: 'link',
            to: 'supplier',
            sort: true,
            link: true,
          },
          {
            column: 'created_date',
            title: $t('components.suppliers.dateRegistration'),
            type: 'text',
            sort: true,
          },
          {
            column: 'date',
            title: $t('purchaseCheques.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('purchaseCheques.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('purchaseCheques.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'payment_method_id',
            title: $t('components.suppliers.paymentMethod'),
            type: 'link',
            to: 'paymentMethod',
            sort: true,
            link: false,
          },
          {
            column: 'stat',
            title: $t('components.suppliers.theCondition'),
            type: 'status',
            sort: true,
            values: [
              { title: $t('components.suppliers.pending'), value: 0, color: 'info' },
              { title: $t('components.suppliers.driven'), value: 1, color: 'success' },
            ],
          },
          {
            column: 'options',
            title: $t('purchaseCheques.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.purchase_cheques_edit,
              },
              {
                name: 'pay',
                role:
                  $user.admin ||
                  $user.role.purchase_cheques_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.purchase_cheques_delete,
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
      path: "/salesInstallments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
