<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('users.users')"
                     :description="$t('users.fromHereYouCanControlUsers')"/>
         <indexTable :searchText="$t('users.searchForAUser')"
                    :emptyTableText="$t('users.thereAreNoUsers')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.users_add"
                    :cloumns="[
                     {column: 'name',    title: $t('users.name') ,type: 'text' , sort: true },
                     {column: 'role_name',    title: $t('users.userType') ,type: 'text' },
                     {column: 'email',    title: $t('users.email') ,type: 'text' , sort: true },
                     {column: 'options', title: $t('users.settings'), type: 'options', options: [
                         {name: 'edit',   role: $user.admin || $user.role.users_edit},
                         {name: 'delete', role: $user.admin || $user.role.users_delete},
                     ]}
                   ]"
                   :deleteText="{
                    attention: $t('allerts.Attention'),
                    areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
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
  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/users'
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>
