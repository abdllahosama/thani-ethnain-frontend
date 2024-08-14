<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('companies.companies')"
                     :description="$t('companies.fromHereYouCanControlYourOwnCompanies')"/>
         <indexTable :searchText="$t('companies.SearchForACompany')"
                    :emptyTableText="$t('companies.thereAreNoCompanies')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.companies_add"
                    :cloumns="[
                     {column: 'name',    title: $t('companies.companyName') ,type: 'text' , sort: true },
                     {column: 'address1',    title: $t('companies.companyAddress') ,type: 'text' , sort: true },
                     {column: 'city',    title: $t('companies.cityOfTheCompany') ,type: 'text' , sort: true },
                     {column: 'country',    title: $t('companies.countryOfTheCompany') ,type: 'text' , sort: true },
                     {column: 'options', title: $t('companies.settings'), type: 'options', options: [
                         {name: 'edit',   role: $user.admin || $user.role.companies_edit},
                         {name: 'delete', role: $user.admin || $user.role.companies_delete},
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
        path: '/companies'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
