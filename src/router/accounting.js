//accounting reports
import profitsByInvoices from "@/pages/accounting/profitsByInvoices.vue";
import profitsAndLosses from "@/pages/accounting/profitsAndLosses.vue";
import balanceSheet from "@/pages/accounting/balanceSheet.vue";
import dailyRestrictions from "@/pages/accounting/dailyRestrictions.vue";

const routes = [
    { path: "profitsByInvoices", name: "profitsByInvoices",component: profitsByInvoices },
    { path: "profitsAndLosses", name: "profitsAndLosses", component: profitsAndLosses },
    { path: "balanceSheet", name: "balanceSheet", component: balanceSheet },
    { path: "dailyRestrictions", name: "dailyRestrictions", component: dailyRestrictions }
]

export default routes