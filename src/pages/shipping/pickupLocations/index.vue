<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
            <indexHeader :title="$t('pickupLocations.ReceivingPoints')"
                         :description="$t('pickupLocations.fromHereYouCanControlYourReceiptPoints')"
                         :explanationPath="path + '/explaination'"/>
           <indexTable :searchText="$t('pickupLocations.SearchForAReceivingPoint')"
                       :emptyTableText="$t('pickupLocations.ThereAreNoReceivingPoints')"
                       :buttonRole="$user.role.pickupLocations_add"
                       :localData="true"
                       :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                       :cloumns="[
                       {column: 'name',    title:$t('pickupLocations.theNameOfThePickupLocations') ,type: 'mainLink' , sort: true },
                       {column: 'mobile',    title:$t('pickupLocations.mobile')     ,type: 'text'     , sort: true },
                       {column: 'city',    title:$t('pickupLocations.City')     ,type: 'text'     , sort: true },
                       {column: 'country', title:$t('pickupLocations.Country')       ,type: 'text'     , sort: true },
                       {column: 'options', title:$t('pickupLocations.settings'), type: 'options', options: [
                           {name: 'show'},
                           {name: 'edit',   role: $user.admin || $user.role.pickupLocations_edit},
                           {name: 'link',   role: $site.pickupLocationsTransfers_allow && ($user.admin|| $user.role.pickupLocations_transfers_add), title: $t('pickupLocations.MoveFromTheStore'), icon: 'suitcase', link:'/pickupLocationsTransfers/create/'},
                           {name: 'link',   role: $site.pickupLocationsDeposits_allow && ($user.admin|| $user.role.pickupLocations_deposits_add), title: $t('pickupLocations.DepositToTheStore'), icon: 'donate', link:'/pickupLocationsDeposits/create/'},
                           {name: 'link',   role: $site.pickupLocationsWithdrawals_allow && ($user.admin|| $user.role.pickupLocations_withdrawals_add), title: $t('pickupLocations.EnglishPullOutOfTheStore'), icon: 'money-bill-alt', link:'/pickupLocationsWithdrawals/create/'},
                           {name: 'delete', role: $user.admin || $user.role.pickupLocations_delete},
                       ]}

                     ]"
                     :deleteText="{
                      attention: $t('allerts.Attention'),
                      areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                      close: $t('allerts.close'),
                      confirm: $t('allerts.confirm'),
                      loading: $t('allerts.loading'),
                     }" />
            </div>
        </div>
    </div>
</template>
<script>

    import indexHeader from '@/elements/index/indexHeader.vue';
    import indexTable from '@/elements/index/indexTable.vue';


    export default {
        data() {
            return {
                path: '/pickupLocations'
            }
        },
        components: {
            indexHeader,
            indexTable
        }

    };

</script>
