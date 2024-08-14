<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersInvoices.invoices')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/invoices/create?customer_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.invoices_allow &&
            ($user.admin ||
              $user.role.invoices_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersInvoices.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$parent.$t('components.customersInvoices.searchForAnInvoice')"
        :withoutCard="true"
        :emptyTableText="$parent.$t('components.customersInvoices.thereAreNoBills')"
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
        :statusSearch="true"
        :statusValues="[
          { title: $parent.$t('components.customersInvoices.situation'), value: '' },
          { title: $parent.$t('components.customersImportForm.all'), value: '' },
          { title: $parent.$t('components.customersInvoices.draft'), value: 0 },
          { title: $parent.$t('components.customersInvoices.sent'), value: 1 },
          { title: $parent.$t('components.customersInvoices.seen'), value: 2 },
          { title: $parent.$t('components.customersInvoices.driven'), value: 3 },
          { title: $parent.$t('components.customersInvoices.canceled'), value: 4 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $parent.$t('components.customersInvoices.invoice'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersInvoices.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'client_type',
            title: $parent.$t('components.customersInvoices.customerName'),
            type: 'clintLink',
            sort: false,
          },
          {
            column: 'total',
            title: $parent.$t('components.customersInvoices.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $parent.$t('components.customersInvoices.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $parent.$t('components.customersInvoices.situation'),
            type: 'status',
            sort: true,
            values: [
              {
                title: $parent.$t('components.customersInvoices.draft'),
                value: 0,
                color: 'dark',
              },
              {
                title: $parent.$t('components.customersInvoices.sent'),
                value: 1,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersInvoices.seen'),
                value: 2,
                color: 'primary',
              },
              {
                title: $parent.$t('components.customersInvoices.driven'),
                value: 3,
                color: 'success',
              },
              {
                title: $parent.$t('components.customersInvoices.canceled'),
                value: 4,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $parent.$t('components.customersInvoices.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.invoices_edit,
              },
              { name: 'outLink', role: true },
              { name: 'printInvoice', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.invoices_delete,
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
      path: "/invoices",
      
        customer_id: this.$route.params.id,
        status: this.$route.params.status ? this.$route.params.status : "",
    };
  },
  components: {
    indexTable,
  },
};
</script>
