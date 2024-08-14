<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('settings.settings')"
          :description="$t('settings.Fromhereyoucancontrolallsettings')"
        />
        <div class="row">
          <div class="col-md-6">
            <reportsCard
              :cardTitle="$t('settings.Usersettings')"
              :icon="'fal fa-user-cog'"
              :reports="[
                {
                  name: $t('settings.profile'),
                  link: './profile',
                  role: $user.admin || $user.role.profile_edit,
                },
                {
                  name: $t('settings.Companies'),
                  link: './companies',
                  role: $user.admin || $user.role.companies_show,
                },
                {
                  name: $t('settings.userPermissions'),
                  link: './roles',
                  role: $user.admin || $user.role.roles_show,
                },
                {
                  name: $t('settings.userAccounts'),
                  link: './users',
                  role: $user.admin || $user.role.users_show,
                },
              ]"
            />
            <reportsCard
              :cardTitle="$t('settings.Operationssettings')"
              :icon="'fal fa-cogs'"
              :reports="[
                {
                  name: $t('settings.numberingGroups'),
                  link: './invoiceGroups',
                  role:
                    $user.admin ||
                    $user.role.quotations_show ||
                    $user.role.invoices_show ||
                    $user.role.bills_show ||
                    $user.role.orders_show ||
                    $user.role.purchase_orders_show,
                },
                {
                  name: $t('settings.invoiceStatus'),
                  link: './invoiceStatus',
                  role:
                    $user.admin ||
                    $user.role.quotations_show ||
                    $user.role.invoices_show ||
                    $user.role.bills_show ||
                    $user.role.orders_show ||
                    $user.role.purchase_orders_show,
                },
                {
                  name: $t('settings.Signatures'),
                  link: './Signatures',
                  role: $user.admin || $user.signatures_show,
                },
              ]"
            />
            <reportsCard
              :cardTitle="$t('settings.productsettings')"
              :icon="'fal fa-boxes-alt'"
              :reports="[
                {
                  name: $t('settings.unitsProduct'),
                  link: './units',
                  role: $user.admin || $user.role.products_show,
                },
                {
                  name: $t('settings.ProductDetails'),
                  link: './details',
                  role: $user.admin || $user.role.products_show,
                },
                {
                  name: $t('settings.ProductsOptions'),
                  link: './productOptions',
                  role: $user.admin || $user.role.products_show,
                },
                {
                  name: $t('settings.productCategories'),
                  link: './sections',
                  role: $user.admin || $user.role.products_show,
                },
                {
                  name: $t('settings.unitsCoefficient'),
                  link: '/unitsCoefficients',
                  role: $user.admin || $user.role.products_show,
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <reportsCard
              :cardTitle="$t('settings.Paymentsettings')"
              :icon="'fal fa-file-invoice-dollar'"
              :reports="[
                {
                  name: $t('settings.paymentMethods'),
                  link: './paymentMethods',
                  role:
                    $user.admin ||
                    $user.role.sales_payments_show ||
                    $user.role.purchase_payments_show ||
                    $user.role.expenses_show,
                },
                {
                  name: $t('settings.paymentFees'),
                  link: './paymentFees',
                  role:
                    $user.admin ||
                    $user.role.sales_payments_show ||
                    $user.role.purchase_payments_show ||
                    $user.role.expenses_show,
                },
                {
                  name: $t('settings.taxRates'),
                  link: './taxes',
                  role:
                    $user.admin ||
                    $user.role.quotations_show ||
                    $user.role.invoices_show ||
                    $user.role.bills_show ||
                    $user.role.orders_show ||
                    $user.role.purchase_orders_show ||
                    $user.role.products_show,
                },
                {
                  name: $t('settings.discountRates'),
                  link: './deliveries',
                  role:
                    $user.admin ||
                    $user.role.quotations_show ||
                    $user.role.invoices_show ||
                    $user.role.bills_show ||
                    $user.role.orders_show ||
                    $user.role.purchase_orders_show ||
                    $user.role.products_show,
                },
                {
                  name: $t('settings.freightForwarders'),
                  link: './discounts',
                  role: true,
                },
                {
                  name: $t('settings.marketers'),
                  link: './marketers',
                  role: true,
                },
                {
                  name: $t('settings.PriceLists'),
                  link: './PriceLists',
                  role: $user.admin || $user.role.products_show,
                },
                {
                  name: $t('settings.sectionsBond'),
                  link: './PaymentsSections',
                  role: true,
                },
                {
                  name: $t('settings.expenditureCategories'),
                  link: './expenseSections',
                  role: $user.admin || $user.role.expenses_show,
                },
                {
                  name: 'تصنيفات الإيرادات',
                  link: './incomeSections',
                  role: $user.admin || $user.role.expenses_show,
                },
                {
                  name: $t('settings.sectionAccounts'),
                  link: './sectionsAccounts',
                  role: $user.admin || $user.role.products_show,
                },
              ]"
            />
            <reportsCard
              :cardTitle="$t('settings.Databases')"
              :icon="'fal fa-server'"
              :reports="[
                {
                  name: $t('settings.Applications'),
                  link: './applications',
                  role: true,
                },
              ]"
            />
            <reportsCard
              :cardTitle="$t('settings.Backup')"
              :icon="'fal fa-copy'"
              :reports="[
                {
                  name: $t('settings.Backup'),
                  link: './Backup',
                  role: $user.admin || $user.role.buckup_allow,
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import reportsCard from "@/elements/reports/reportsCard.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/options",
    };
  },
  components: {
    reportsCard,
    addHeader,
    loading,
    dvider,
  },
};
</script>
