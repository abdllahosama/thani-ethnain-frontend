<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('safes.safes')"
          :description="$t('safes.safesDescription')"
          :explanationPath="path + '/explaination'"
        />
        <indexTable
          :searchText="$t('safes.SearchForASafe')"
          :emptyTableText="$t('safes.thereAreNosafes')"
          :buttonRole="$user.admin || $user.role.safes_add"
          :localData="true"
          :filter="{bank_account: 0}"
          :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
          :cloumns="[
            {column: 'id',    title: 'كود' ,type: 'mainLink' , sort: true },
            {
              column: 'name',
              title: $t('safes.customerName'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'balance',
              title: $t('safes.balance'),
              type: 'text',
              sort: true,
              icon: 'usd-square'
            },
            {
              column: 'stat',
              title: $t('safes.active'),
              type: 'stat',
              sort: true,
              hideMobile: true
            },
            {
              column: 'options',
              title: $t('safes.actions'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role: $user.admin || $user.role.safes_edit,
                },
                {
                  name: 'link',
                  role:
                    $site.safesTransfers_allow &&
                    ($user.admin ||
                      $user.role.safes_transfers_add),
                  title: $t('safes.TransferFromTheTreasury'),
                  icon: 'suitcase',
                  link: '/safesTransfers/create?from_safe_id=',
                },
                {
                  name: 'link',
                  role:
                    $site.safesDeposits_allow &&
                    ($user.admin ||
                      $user.role.safes_deposits_add),
                  title: $t('safes.DepositToTheSafe'),
                  icon: 'donate',
                  link: '/safesDeposits/create?safe_id=',
                },
                {
                  name: 'link',
                  role:
                    $site.safesWithdrawals_allow &&
                    ($user.admin ||
                      $user.role.safes_withdrawals_add),
                  title: $t('safes.WithdrawalFromTheTreasury'),
                  icon: 'money-bill-alt',
                  link: '/safesWithdrawals/create?safe_id=',
                },
                {
                  name: 'delete',
                  role: $user.admin || $user.role.safes_delete,
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
      path: "/safes",
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
