<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.employees')"
          :description="$t('mainReport.Fromhereyoucancontrolyouremployeesreports')"/>
        </div>
          <!-- تقارير الموظفين -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.employees')"
            :icon="'fa-user-alt'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 42 || el.id == 43 || el.id == 44 || el.id == 45
              ) || $user.admin
            )
            &&$site.employees_allow
            "
            :reports="[
              {
                name: $t('mainReport.TotalEmployeeAccount'),
                link: './employeesTotalAccounts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 42
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.EmployeesAssets'),
                link: '/employeesBalance',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 44
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.StaffGuide'),
                link: '/employeesGuide',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 45
                  ) || $user.admin,
              },
            ]"
          />

           <!-- تقارير عمليات الموظفين -->
           <reportsCard
           class="col-md-6"
           :cardTitle="$t('mainReport.employeesOperations')"
           :icon="'fal fa-users'"
           v-if="
             (
              $user.role.available_reports.find(
                (el) => el.id == 42 || el.id == 43 || el.id == 44 || el.id == 45
              ) || $user.admin
             ) &&
             ($site.employeesSalaries_allow ||
                $site.employeesIncentives_allow ||
                $site.employeesDeductions_allow ||
                $site.employeesWithdrawals_allow)
           "
           :reports="[
             {
               name: $t('mainReport.employeesSalaries'),
               link: './employeesOperationsSalaries',
               role:
                 $user.role.available_reports.find(
                   (el) => el.id == 42
                 ) || $user.admin,
             },
             {
               name: $t('mainReport.employeesIncentives'),
               link: '/employeesOperationsIncentives',
               role:
                 $user.role.available_reports.find(
                   (el) => el.id == 43
                 ) || $user.admin,
             },
             {
               name: $t('mainReport.employeesDeductions'),
               link: '/employeesOperationsDeductions',
               role:
                 $user.role.available_reports.find(
                   (el) => el.id == 44
                 ) || $user.admin,
             },
             {
               name: $t('mainReport.employeesWithdrawals'),
               link: '/employeesOperationsWithdrawals',
               role:
                 $user.role.available_reports.find(
                   (el) => el.id == 45
                 ) || $user.admin,
             },
           ]"
         />
        </div>
</template>
<script>
import reportsCard from "@/elements/reports/reportsCard.vue";
import indexHeader from'@/elements/index/indexHeader.vue';
export default {
    components: {
    reportsCard,
    indexHeader,
  },
}
</script>