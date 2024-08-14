<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('roles.userRoles')"
                     :description="$t('roles.fromHereYouCanControlTheUsersPermissions')"/>
         <indexTable :searchText="$t('roles.SearchForAGroup')"
                    :emptyTableText="$t('roles.thereAreNoRoles')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.roles_add"
                    :cloumns="[
                     {column: 'name',    title: $t('roles.name') ,type: 'text' , sort: true },
                     {column: 'users_count',    title: $t('roles.usersCount') ,type: 'text' },
                     {column: 'options', title: $t('roles.settings'), type: 'options', options: [
                         {name: 'edit',   role: $user.admin || $user.role.roles_edit},
                         {name: 'delete', role: $user.admin || $user.role.roles_delete},
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
        path: '/roles'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
