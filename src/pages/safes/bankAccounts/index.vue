<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('bankAccounts.bankAccounts')"
          :description="$t('bankAccounts.bankAccountsDescription')"
          :explanationPath="path + '/explaination'"
        />
        <indexTable
          :searchText="$t('bankAccounts.searchForAccounts')"
          :emptyTableText="$t('bankAccounts.thereAreNoAccounts')"
          :buttonRole="
            $user.admin || $user.role.bank_accounts_add
          "
          :localData="true"
          :filter="{bank_account: 1}"
          :table="'safes'"
          :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
          :cloumns="[
            {
              column: 'name',
              title: $t('bankAccounts.bankName'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'account_number',
              title: $t('bankAccounts.accountNumber'),
              type: 'text',
              sort: true,
              icon: 'credit-card-front'
            },
            {
              column: 'bank_name',
              title: $t('bankAccounts.accountName'),
              type: 'text',
              sort: true,
              icon: ' fa-user'
            },
            {
              column: 'balance',
              title: $t('bankAccounts.balance'),
              type: 'text',
              sort: true,
              icon: 'usd-square'
            },
            {
              column: 'stat',
              title: $t('bankAccounts.active'),
              type: 'stat',
              sort: true,
              hideMobile: true
            },
            {
              column: 'options',
              title: $t('bankAccounts.actions'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role:
                    $user.admin || $user.role.bank_accounts_edit,
                },
                {
                  name: 'link',
                  role:
                    $site.safesTransfers_allow &&
                    ($user.admin ||
                      $user.role.safes_transfers_add),
                  title: $t('bankAccounts.TransferFromTheTreasury'),
                  icon: 'suitcase',
                  link: '/safesTransfers/create?from_safe_id=',
                },
                {
                  name: 'link',
                  role:
                    $site.safesDeposits_allow &&
                    ($user.admin ||
                      $user.role.safes_deposits_add),
                  title: $t('bankAccounts.DepositToTheSafe'),
                  icon: 'donate',
                  link: '/safesDeposits/create?safe_id=',
                },
                {
                  name: 'link',
                  role:
                    $site.safesWithdrawals_allow &&
                    ($user.admin ||
                      $user.role.safes_withdrawals_add),
                  title: $t('bankAccounts.WithdrawalFromTheTreasury'),
                  icon: 'money-bill-alt',
                  link: '/safesWithdrawals/create?safe_id=',
                },
                {
                  name: 'delete',
                  role:
                    $user.admin ||
                    $user.role.bank_accounts_delete,
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
import indexHeader from "@/elements/index/indexHeader.vue";
import indexTable from "@/elements/index/indexTable.vue";

export default {
  data() {
    return {
      path: "/bankAccounts"
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
