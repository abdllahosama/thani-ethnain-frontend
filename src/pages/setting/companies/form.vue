<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('companies.form.createCompany')"
          :description="$t('companies.form.fromHereYouCanCreateANewCompany')"
          v-if="$route.name == 'companiesCreate'"
        />
        <addHeader
          :title="$t('companies.form.editCompany')"
          :description="$t('companies.form.fromHereYouCanAmendTheCompanyInformation')"
          v-if="$route.name == 'companiesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('companies.form.basicInformation')"
            :description="$t('companies.form.basicCompaninformation')"
            noLine="true"
          />
          <fileInput
            :title="$t('companies.form.Companylogo')"
            v-model="item.image"
            :image="item.image"
            :path="'logos'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
          />
          <formInput
            :title="$t('companies.form.theCompanysName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <formInput
            :title="$t('companies.form.taxIdentificationNumber')"
            v-model="item.tax_number"
          />
          <formInput
            :title="$t('companies.form.CommercialRegister')"
            v-model="item.commercial_register"
          />

          <monyInput
            title="رئس المال"
            v-model="item.opining_balance"
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.FrontReports") }}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_reports"
                :options="reports"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('companies.form.ChooseTheRequiredReportsInTheInterface')"
                label="name"
                track-by="link"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.ExhibitsInTheFacade") }}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_elements"
                :options="elements"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('companies.form.ChooseDisplaysInTheInterface')"
                label="name"
                track-by="id"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.mainActions") }}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_actions"
                :options="actions"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('companies.form.ChooseActionsInTheInterface')"
                label="name"
                track-by="link"
                :hide-selected="true"
              />
            </div>
          </div>

          <dvider
            :title="'العمله و الوقت'"
            :description="'الاعدادات الخاصه بالعمله و الوقت'"
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">المنطقه الزمنيه</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.time_zone }"
                v-model="item.time_zone"
                @change="errors.time_zone = false"
              >
                <option v-for="(timeZone, index) in timeZones" :key="index">
                  {{ timeZone }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ $t("companies.form.ThisFieldIsRequired") }}
              </div>
            </div>
          </div>

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.currency") }}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.currency }"
                v-model="item.currency"
                @change="errors.currency = false"
              >
                <option
                  v-for="(currency, index) in currencyList"
                  :value="currency.code"
                  :key="index"
                >
                  {{ currency.name }}
                </option>
              </select>

              <div class="invalid-feedback">
                {{ $t("companies.form.ThisFieldIsRequired") }}
              </div>
            </div>
          </div>

          <checkInput
            :title="'إظهار الوقت بجانب التاريخ'"
            :value="item.show_time"
            v-model="item.show_time"
          />

          <checkInput
            :title="'عرض العملة بالفواتير'"
            :value="item.show_time"
            v-model="item.show_time"
          />
          <dvider
            :title="$t('companies.form.accountSettings')"
            :description="$t('companies.form.fromHereYouCanControlTheAccountSettings')"
          />
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.balanceType") }}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.balance_type }"
                v-model="item.balance_type"
              >
                <option value="0">{{ $t("companies.form.normal") }}</option>
                <option value="1">{{ $t("companies.form.inverse") }}</option>
              </select>

              <div class="invalid-feedback">
                {{ $t("companies.form.ThisFieldIsRequired") }}
              </div>
            </div>
          </div>

          <dvider
            :title="$t('companies.form.billingAddress')"
            :description="$t('companies.form.theTitleOfBillingAndTheInvoiceIsRecorded')"
          />

          <formInput
            :title="$t('companies.form.title')"
            v-model="item.address1"
            maxlength="255"
          />
          <formInput
            :title="$t('companies.form.supplement')"
            v-model="item.address2"
            maxlength="255"
          />
          <formInput
            :title="$t('companies.form.theEntity')"
            v-model="item.entity"
            maxlength="255"
          />
          <formInput
            :title="$t('companies.form.city')"
            v-model="item.city"
            maxlength="255"
          />
          <formInput
            :title="$t('companies.form.postalCode')"
            v-model="item.zip"
            maxlength="255"
          />
          <formInput
            :title="$t('companies.form.theState')"
            v-model="item.country"
            maxlength="255"
          />

          <dvider
            :title="$t('companies.form.InvoiceSettings')"
            :description="$t('companies.form.AdjustTheInvoiceToSuitYourBusiness')"
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.PrintTheInvoice") }}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.print_type }"
                v-model="item.print_type"
                @change="errors.print_type = false"
              >
                <option value="0">{{ $t("companies.form.A4Paper") }}</option>
                <option value="4">
                  {{ $t("companies.form.A4ElectronicInvoicePaper") }}
                </option>
                <option value="1">{{ $t("companies.form.thermalPaper") }} (8cm)</option>
                <option value="3">{{ $t("companies.form.thermalPaper") }} (5cm)</option>
              </select>
              <div class="invalid-feedback">
                {{ $t("companies.form.ThisFieldIsRequired") }}
              </div>
            </div>
          </div>

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{ $t("companies.form.PaintingDesign") }}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.theme_type }"
                v-model="item.theme_type"
                @change="errors.theme_type = false"
              >
                <option value="0">
                  {{ $t("companies.form.traditional") }}
                </option>
                <option value="1">{{ $t("companies.form.Design1") }}</option>
                <option value="2">{{ $t("companies.form.Design2") }}</option>
                <option value="3">{{ $t("companies.form.Design3") }}</option>
                <option value="4">{{ $t("companies.form.Design4") }}</option>
                <option value="5">{{ $t("companies.form.Design5") }}</option>
              </select>
              <div class="invalid-feedback">
                {{ $t("companies.form.ThisFieldIsRequired") }}
              </div>
            </div>
          </div>

          <checkInput
            :title="$t('companies.form.AllowNegativeAmounts')"
            :value="item.allow_minus_quantity"
            v-model="item.allow_minus_quantity"
          />
          <checkInput
            :title="$t('companies.form.UseTheElectronicInvoice')"
            :value="item.tax_invoice"
            v-model="item.tax_invoice"
          />
          <checkInput
            :title="$t('companies.form.PreviousBalanceView')"
            :value="item.show_old_balance"
            v-model="item.show_old_balance"
          />
          <checkInput
            :title="$t('companies.form.SignOffer')"
            :value="item.show_signature"
            v-model="item.show_signature"
          />
          <checkInput
            :title="$t('companies.form.DiscountOffer')"
            :value="item.show_discount_table"
            v-model="item.show_discount_table"
          />
          <checkInput
            :title="$t('companies.form.TaxOffer')"
            :value="item.show_tax_table"
            v-model="item.show_tax_table"
          />

          <checkInput
            :title="$t('companies.form.CountAllow')"
            :value="item.count_allow"
            v-model="item.count_allow"
          />

          <checkInput
            :title="$t('companies.form.ShowItemNumber')"
            :value="item.item_number"
            v-model="item.item_number"
          />

          <checkInput
            :title="$t('companies.form.PrintAfterOpreation')"
            :value="item.print_after"
            v-model="item.print_after"
          />

          <formTextarea
            :title="$t('companies.form.BillFooter')"
            v-model="item.invoice_footer"
          />
          <formTextarea
            :title="$t('companies.form.CssAdjustmentsToTheBill')"
            v-model="item.invoice_css"
          />
          <template v-if="$site.quotations_allow">
            <dvider
              :title="$t('companies.form.offersSettings')"
              :description="$t('companies.form.fromHereYouCanControlTheDisplaySettings')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.quotation_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.quotations_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.quotations_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.quotations_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.quotations_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.quotations_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.invoices_allow">
            <dvider
              :title="$t('companies.form.salesInvoiceSettings')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfSalesInvoices')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.invoice_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.invoices_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.invoices_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.invoices_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.invoices_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.invoices_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.bills_allow"> 
            <dvider
              :title="$t('companies.form.purchaseInvoiceSettings')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfPurchaseInvoices')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.bill_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.bills_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.bills_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.bills_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.bills_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.bills_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.saleReturns_allow">
            <dvider
              :title="$t('companies.form.salesReturnsSettings')"
              :description="$t('companies.form.fromHereYouCanControlSalesReturns')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.Sale_return_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_returns_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_returns_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_returns_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_returns_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_returns_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchaseReturns_allow">
            <dvider
              :title="$t('companies.form.purchaseReturns')"
              :description="$t('companies.form.fromHereYouCanControlPurchaseReturns')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.Purchase_return_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_returns_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_returns_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_returns_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_returns_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_returns_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.orders_allow">
            <dvider
              :title="$t('companies.form.demandBonds')"
              :description="$t('companies.form.fromHereYouCanControlTheOrdeRBonds')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.order_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.orders_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.orders_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.orders_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.orders_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.orders_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchaseOrders_allow">
            <dvider
              :title="$t('companies.form.purchaseOrders')"
              :description="$t('companies.form.fromHereYouCanControlPurchaseOrders')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.purchase_order_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_orders_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_orders_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_orders_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_orders_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_orders_required_data"
                  :options="requiredData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.enterData')"
                  label="name"
                  track-by="id"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.salesPayments_allow">
            <dvider
              :title="$t('companies.form.salePayments')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfTheSalesPayments')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.sales_payment_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_payments_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_payments_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_payments_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_payments_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchasePayments_allow">
            <dvider
              :title="$t('companies.form.purchasePayments')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfThePurchasePayments')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.purchase_payment_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_payments_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_payments_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_payments_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_payments_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.salesCheques_allow">
            <dvider
              :title="$t('companies.form.salesChecks')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfSalesChecks')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.sales_cheque_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_cheques_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_cheques_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_cheque_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_cheque_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchaseCheques_allow">
            <dvider
              :title="$t('companies.form.purchaseChecks')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsOfPurchaseChecks')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.purchase_cheque_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_cheques_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_cheques_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_cheques_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_cheques_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.salesInstallments_allow">
            <dvider
              :title="$t('companies.form.saleInstallments')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSalesInstallmentsSettings')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.sales_installment_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_installments_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_installments_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_installment_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_installment_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchaseInstallments_allow">
            <dvider
              :title="$t('companies.form.purchaseInstallments')"
              :description="
                $t('companies.form.fromHereYouCanControlThePurchaseInstallmentsSettings')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.purchase_installment_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_installments_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_installments_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_installments_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_installments_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.salesDiscounts_allow">
            <dvider
              :title="$t('companies.form.saleDiscounts')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsForSaleDiscounts')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.sale_discount_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_discounts_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sales_discounts_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_discounts_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.sale_discounts_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.purchaseDiscounts_allow">
            <dvider
              :title="$t('companies.form.purchaseDiscounts')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsForPurchaseDiscounts')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.purchase_discount_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.RequiredCustomerData") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_discounts_customer_data"
                  :options="customersData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.RequiredCustomerData')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{
                $t("companies.form.ItemsShownOnTheHomePage")
              }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_discounts_index_data"
                  :options="indexData"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.MainItemsShown')"
                  label="title"
                  track-by="show"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_discounts_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.purchase_discounts_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.expenses_allow">
            <dvider
              :title="$t('companies.form.expense')"
              :description="$t('companies.form.fromHereYouCanControlTheSettingsOfExpenses')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.expense_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.expenses_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.expenses_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.safesDeposits_allow">
            <dvider
              :title="$t('companies.form.cabinetDeposits')"
              :description="$t('companies.form.fromHereYouCanControlTheDepositProcesses')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.safes_deposit_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.safesWithdrawals_allow">
            <dvider
              :title="$t('companies.form.cabinetWithdrawals')"
              :description="$t('companies.form.fromHereYouCanControlWithdrawals')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.safes_withdrawal_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.safesTransfers_allow">
            <dvider
              :title="$t('companies.form.cabinetTransfers')"
              :description="$t('companies.form.fromHereYouCanControlTransfers')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.safes_transfer_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_transfers_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.safes_transfers_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.storesDeposits_allow">
            <dvider
              :title="$t('companies.form.warehouseDeposits')"
              :description="$t('companies.form.fromHereYouCanControlTheDepositProcesses')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.stores_deposit_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.storesWithdrawals_allow">
            <dvider
              :title="$t('companies.form.warehouseWithdrawals')"
              :description="$t('companies.form.fromHereYouCanControlWithdrawals')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.stores_withdrawal_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.storesTransfers_allow">
            <dvider
              :title="$t('companies.form.warehouseTransfers')"
              :description="$t('companies.form.fromHereYouCanControlTransfers')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.stores_transfer_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_transfers_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.stores_transfers_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.partnersDeposits_allow">
            <dvider
              :title="$t('companies.form.partnerDeposit')"
              :description="$t('companies.form.fromHereYouCanControlThePartnerDeposits')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.partners_deposits_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.partnersWithdrawals_allow">
            <dvider
              :title="$t('companies.form.withdrawalPartners')"
              :description="$t('companies.form.fromHereYouCanControlThePartnerwithdrawal')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.partners_withdrawals_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.partnersSettlements_allow">
            <dvider
              :title="$t('companies.form.partnerSettlement')"
              :description="$t('companies.form.fromHereYouCanControlThepartnerSettlement')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.partners_settlements_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_settlements_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_settlements_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.partnersProfits_allow">
            <dvider
              :title="$t('companies.form.dividends')"
              :description="$t('companies.form.fromHereYouCanControlThedividends')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.partners_profit_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_profits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.partners_profits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.accountsDeposits_allow">
            <dvider
              :title="$t('companies.form.accountDeposits')"
              :description="$t('companies.form.fromHereYouCanControlTheaccountDeposits')"
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.accounts_deposits_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.accountsWithdrawals_allow">
            <dvider
              :title="$t('companies.form.accountWithdrawals')"
              :description="
                $t('companies.form.fromHereYouCanControlTheSettingsForWithdrawingAccounts')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.accounts_withdrawals_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.projectsDeposits_allow">
            <dvider
              :title="$t('companies.form.rawMaterialDeposits')"
              :description="
                $t('companies.form.fromHereYouCanControlTheDepositProcessesOfRawMaterials')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.projects_deposits_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.projectsWithdrawals_allow">
            <dvider
              :title="$t('companies.form.rawMaterialWithdrawals')"
              :description="
                $t(
                  'companies.form.fromHereYouCanControlTheDepositProcessesOfRawMaterialWithdrawals'
                )
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.projects_withdrawals_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.projectsTransfers_allow">
            <dvider
              :title="$t('companies.form.transportationRawMaterials')"
              :description="
                $t(
                  'companies.form.fromHereYouCanControlTheDepositProcessesOfTransportationRawMaterials'
                )
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.projects_transfers_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_transfers_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.projects_transfers_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.manufacturingModels_allow">
            <dvider
              :title="$t('companies.form.manufacturingModelOperations')"
              :description="
                $t(
                  'companies.form.fromHereYouCanControlTheDepositProcessesOfManufacturingModelOperations'
                )
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.manufacturing_model_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_model_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_model_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.manufacturingOperations_allow">
            <dvider
              :title="$t('companies.form.listOperations')"
              :description="
                $t(
                  'companies.form.fromHereYouCanControlTheDepositProcessesOfManufacturingListOperations'
                )
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.manufacturing_operations_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_operations_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_operations_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.manufacturingOperations_allow">
            <dvider
              :title="$t('companies.form.depositRawMaterialsManufacturingProcesses')"
              :description="
                $t('companies.form.fromHereYouCanControlTheDepositProcessesOfRawMaterials')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.manufacturing_deposits_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_deposits_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_deposits_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.manufacturingOperations_allow">
            <dvider
              :title="$t('companies.form.productRecalls')"
              :description="
                $t('companies.form.fromHereYouCanControlProductWithdrawalSettings')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.manufacturing_withdrawals_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.manufacturing_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.accountsTransfers_allow"> 
            <dvider
              :title="$t('companies.form.accountsTransfers')"
              :description="
                $t('companies.form.fromHereYouCanControlAccountsTransfereSettings')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.accounts_transfers_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_transfers_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.accounts_transfers_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template> 
          <template v-if="$site.employeesSalaries_allow">
            <dvider
              :title="$t('companies.form.salariesEmployees')"
              :description="
                $t('companies.form.fromHereYouCanControlProductSalariesEmployees')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.employees_salaries_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_salaries_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_salaries_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.employeesIncentives_allow">
            <dvider
              :title="$t('companies.form.employeeIncentive')"
              :description="
                $t('companies.form.fromHereYouCanControlProductEmployeeIncentive')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.employees_incentives_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_incentives_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_incentives_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.employeesDeductions_allow">
            <dvider
              :title="$t('companies.form.employeeDiscount')"
              :description="
                $t('companies.form.fromHereYouCanControlProductEmployeeDiscount')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.employees_deductions_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_deductions_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_deductions_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.employeesWithdrawals_allow">
            <dvider
              :title="$t('companies.form.staffWithdrawal')"
              :description="
                $t('companies.form.fromHereYouCanControlProductStaffWithdrawal')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.employees_withdrawals_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_withdrawals_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.employees_withdrawals_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.cities_allow">
            <dvider
              :title="$t('companies.form.shippingOperations')"
              :description="
                $t('companies.form.fromHereYouCanControlProductShippingOperations')
              "
            />
            <connectionInput
              :title="$t('companies.form.invoiceNumbering')"
              :group="$t('invoices.form.Groups')"
              v-model="item.shipping_operations_invoice_group_id"
              :values="$database.invoiceGroups"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.shipping_operations_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.availableCases") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.shipping_operations_stats_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.availableCases')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
          <template v-if="$site.reports_allow">
            <dvider
              :title="$t('companies.form.reportOption')"
              :description="$t('companies.form.fromHereYouCanChangeReportOptions')"
            />
            <div class="form-group col-md-6 row">
              <label class="col-md-4">{{ $t("companies.form.requiredSignatures") }}</label>
              <div class="col-md-7">
                <multiselect
                  v-model="item.reports_signatures_data"
                  :options="filterdSignatures"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('companies.form.requiredSignatures')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
            </div>
          </template>
            <dvider
              :title="$t('companies.form.PosterSettings')"
              :description="$t('companies.form.DimensionsAndDetailsOfThePoster')"
            />
            <checkInput
              :title="$t('companies.form.ViewThePriceWithTheSticker')"
              :value="item.barcode_price_show"
              v-model="item.barcode_price_show"
            />
            <checkInput
              :title="$t('companies.form.ViewTheCompanyNameWithThePoster')"
              :value="item.barcode_company_show"
              v-model="item.barcode_company_show"
            />
            <formInput
              :title="$t('companies.form.PosterHeight')"
              v-model="item.barcode_height"
              type="number"
            />
            <formInput
              :title="$t('companies.form.PosterDisplay')"
              v-model="item.barcode_width"
              type="number"
            />
            <formInput
              :title="$t('companies.form.MainMargin')"
              v-model="item.barcode_height_padding"
              type="number"
            />
            <formInput
              :title="$t('companies.form.HorizontalMargin')"
              v-model="item.barcode_width_padding"
              type="number"
            />
            <selectInput
              :title="$t('companies.form.LabelType')"
              v-model="item.barcode_type"
              :values="[
                { name: $t('companies.form.Normal'), value: 1 },
                { name: $t('companies.form.double'), value: 2 },
              ]"
            />
          <dvider
            :title="$t('companies.form.StoreSettings')"
            :description="
              $t('companies.form.FromHereYouCanControlTheSettingsOfTheStores')
            "
          />

          <formInput
            :title="$t('companies.form.MinimumQuantityInStock')"
            v-model="item.min_quantity"
            type="number"
          />

          <dvider
            :title="$t('companies.form.contactInformation')"
            :description="$t('companies.form.customerContactInformation')"
          />
          <iconInput
            :type="'number'"
            :title="$t('companies.form.telephoneNumber')"
            :icon="'phone-office'"
            v-model="item.telephone"
          />
          <iconInput
            :type="'number'"
            :title="$t('companies.form.faxNumber')"
            :icon="'fax'"
            v-model="item.fax"
          />
          <iconInput
            :type="'number'"
            :title="$t('companies.form.mobileNumber')"
            :icon="'phone'"
            v-model="item.mobile"
          />
          <iconInput
            :type="'email'"
            :title="$t('companies.form.email')"
            :icon="'at'"
            v-model="item.email"
          />
          <iconInput
            :type="'link'"
            :title="$t('companies.form.theSiteIsOnTheInternet')"
            :icon="'browser'"
            v-model="item.website"
            :col="'col-md-12'"
          />
          <dvider
            :title="$t('companies.form.socialNetworks')"
            :description="$t('companies.form.companiesSocialMediaAccounts')"
          />
          <iconInput
            :type="'text'"
            :title="$t('companies.form.linkedInAccount')"
            :icon="'linkedin'"
            :iconTtype="'social'"
            v-model="item.linkedin"
          />
          <iconInput
            :type="'text'"
            :title="$t('companies.form.facebookAccount')"
            :icon="'facebook'"
            :iconTtype="'social'"
            v-model="item.facebook"
          />
          <iconInput
            :type="'text'"
            :title="$t('companies.form.twitterAccount')"
            :icon="'twitter'"
            :iconTtype="'social'"
            v-model="item.twitter"
          />
          <iconInput
            :type="'text'"
            :title="$t('companies.form.googlePlusAccount')"
            :icon="'google-plus'"
            :iconTtype="'social'"
            v-model="item.google_plus"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'companiesCreate' && !$parent.stopEdit"
          >
            {{ $t("companies.form.createCompany") }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'companiesEdit' && !$parent.stopEdit"
          >
            {{ $t("companies.form.editCompany") }}
          </a>
          <loading v-if="$parent.stopEdit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import fileInput from "@/elements/add/form/fileInput.vue";
import formInput from "@/elements/add/form/formInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import iconInput from "@/elements/add/form/iconInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
export default {
  data() {
    return {
      path: "/companies",
      filterdSignatures: [],
      item: {
        print_type: 0,
        theme_type: 1,
        barcode_price_show: 1,
        barcode_company_show: 0,
        show_old_balance: 0,
        show_signature: 0,
        show_discount_table: 0,
        show_tax_table: 0,
        show_custom_logo: 0,
        show_currency: 0,
        tax_invoice: 0,
        min_quantity: 0,
        salary_expense_section_id: 0,
        item_number: 0,
        print_after: 1,
        main_reports: [],
        main_elements: [],
        main_actions: [],

        quotations_customer_data: [],
        quotations_index_data: [],
        invoices_customer_data: [],
        invoices_index_data: [],
        bills_customer_data: [],
        bills_index_data: [],
        sale_returns_customer_data: [],
        sale_returns_index_data: [],
        purchase_returns_customer_data: [],
        purchase_returns_index_data: [],
        orders_customer_data: [],
        orders_index_data: [],
        purchase_orders_customer_data: [],
        purchase_orders_index_data: [],
        sales_payments_customer_data: [],
        sales_payments_index_data: [],
        purchase_payments_customer_data: [],
        purchase_payments_index_data: [],
        sales_cheques_customer_data: [],
        sales_cheques_index_data: [],
        purchase_cheques_customer_data: [],
        purchase_cheques_index_data: [],
        sales_installments_customer_data: [],
        sales_installments_index_data: [],
        purchase_installments_customer_data: [],
        purchase_installments_index_data: [],
        sales_discounts_customer_data: [],
        sales_discounts_index_data: [],
        purchase_discounts_customer_data: [],
        purchase_discounts_index_data: [],
        signatures_data: [],
        time_zone: "Africa/Cairo",
        currency: "EGP",
      },
      customersData: [
        { title: this.$t("companies.form.customerName"), show: "name" },
        { title: this.$t("companies.form.TaxNumber"), show: "tax_number" },
        { title: this.$t("companies.form.Balance"), show: "balance", moany: true },
        { title: this.$t("companies.form.theAddress"), show: "address1" },
        { title: this.$t("companies.form.complement"), show: "address2" },
        { title: this.$t("companies.form.theSide"), show: "entity" },
        { title: this.$t("companies.form.city"), show: "city" },
        { title: this.$t("companies.form.postalCode"), show: "zip" },
        { title: this.$t("companies.form.country"), show: "country" },
        { title: this.$t("companies.form.TelephoneNumber"), show: "mobile" },
        { title: this.$t("companies.form.AnotherPhoneNumber"), show: "mobile2" },
        { title: this.$t("companies.form.EMail"), show: "email" },
      ],
      indexData: [
        {
          column: "code",
          title: this.$t("orders.salesOrder"),
          type: "mainLink",
          sort: true,
        },
        { column: "date", title: this.$t("orders.orderDate"), type: "text", sort: true },
        {
          column: "client_type",
          title: this.$t("orders.customerName"),
          type: "clintLink",
          sort: false,
        },
        { column: "total", title: this.$t("orders.cost"), type: "text", sort: true },
      ],
      timeZones: [
        "Europe/Andorra",
        "Asia/Dubai",
        "Asia/Kabul",
        "Europe/Tirane",
        "Asia/Yerevan",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Mawson",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Cordoba",
        "America/Argentina/Salta",
        "America/Argentina/Jujuy",
        "America/Argentina/Tucuman",
        "America/Argentina/Catamarca",
        "America/Argentina/La_Rioja",
        "America/Argentina/San_Juan",
        "America/Argentina/Mendoza",
        "America/Argentina/San_Luis",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Ushuaia",
        "Pacific/Pago_Pago",
        "Europe/Vienna",
        "Australia/Lord_Howe",
        "Antarctica/Macquarie",
        "Australia/Hobart",
        "Australia/Currie",
        "Australia/Melbourne",
        "Australia/Sydney",
        "Australia/Broken_Hill",
        "Australia/Brisbane",
        "Australia/Lindeman",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Perth",
        "Australia/Eucla",
        "Asia/Baku",
        "America/Barbados",
        "Asia/Dhaka",
        "Europe/Brussels",
        "Europe/Sofia",
        "Atlantic/Bermuda",
        "Asia/Brunei",
        "America/La_Paz",
        "America/Noronha",
        "America/Belem",
        "America/Fortaleza",
        "America/Recife",
        "America/Araguaina",
        "America/Maceio",
        "America/Bahia",
        "America/Sao_Paulo",
        "America/Campo_Grande",
        "America/Cuiaba",
        "America/Santarem",
        "America/Porto_Velho",
        "America/Boa_Vista",
        "America/Manaus",
        "America/Eirunepe",
        "America/Rio_Branco",
        "America/Nassau",
        "Asia/Thimphu",
        "Europe/Minsk",
        "America/Belize",
        "America/St_Johns",
        "America/Halifax",
        "America/Glace_Bay",
        "America/Moncton",
        "America/Goose_Bay",
        "America/Blanc-Sablon",
        "America/Toronto",
        "America/Nipigon",
        "America/Thunder_Bay",
        "America/Iqaluit",
        "America/Pangnirtung",
        "America/Atikokan",
        "America/Winnipeg",
        "America/Rainy_River",
        "America/Resolute",
        "America/Rankin_Inlet",
        "America/Regina",
        "America/Swift_Current",
        "America/Edmonton",
        "America/Cambridge_Bay",
        "America/Yellowknife",
        "America/Inuvik",
        "America/Creston",
        "America/Dawson_Creek",
        "America/Fort_Nelson",
        "America/Vancouver",
        "America/Whitehorse",
        "America/Dawson",
        "Indian/Cocos",
        "Europe/Zurich",
        "Africa/Abidjan",
        "Pacific/Rarotonga",
        "America/Santiago",
        "America/Punta_Arenas",
        "Pacific/Easter",
        "Asia/Shanghai",
        "Asia/Urumqi",
        "America/Bogota",
        "America/Costa_Rica",
        "America/Havana",
        "Atlantic/Cape_Verde",
        "America/Curacao",
        "Indian/Christmas",
        "Asia/Nicosia",
        "Asia/Famagusta",
        "Europe/Prague",
        "Europe/Berlin",
        "Europe/Copenhagen",
        "America/Santo_Domingo",
        "Africa/Algiers",
        "America/Guayaquil",
        "Pacific/Galapagos",
        "Europe/Tallinn",
        "Africa/Cairo",
        "Africa/El_Aaiun",
        "Europe/Madrid",
        "Africa/Ceuta",
        "Atlantic/Canary",
        "Europe/Helsinki",
        "Pacific/Fiji",
        "Atlantic/Stanley",
        "Pacific/Chuuk",
        "Pacific/Pohnpei",
        "Pacific/Kosrae",
        "Atlantic/Faroe",
        "Europe/Paris",
        "Europe/London",
        "Asia/Tbilisi",
        "America/Cayenne",
        "Africa/Accra",
        "Europe/Gibraltar",
        "America/Godthab",
        "America/Danmarkshavn",
        "America/Scoresbysund",
        "America/Thule",
        "Europe/Athens",
        "Atlantic/South_Georgia",
        "America/Guatemala",
        "Pacific/Guam",
        "Africa/Bissau",
        "America/Guyana",
        "Asia/Hong_Kong",
        "America/Tegucigalpa",
        "America/Port-au-Prince",
        "Europe/Budapest",
        "Asia/Jakarta",
        "Asia/Pontianak",
        "Asia/Makassar",
        "Asia/Jayapura",
        "Europe/Dublin",
        "Asia/Jerusalem",
        "Asia/Kolkata",
        "Indian/Chagos",
        "Asia/Baghdad",
        "Asia/Tehran",
        "Atlantic/Reykjavik",
        "Europe/Rome",
        "America/Jamaica",
        "Asia/Amman",
        "Asia/Tokyo",
        "Africa/Nairobi",
        "Asia/Bishkek",
        "Pacific/Tarawa",
        "Pacific/Enderbury",
        "Pacific/Kiritimati",
        "Asia/Pyongyang",
        "Asia/Seoul",
        "Asia/Almaty",
        "Asia/Qyzylorda",
        "Asia/Qostanay",
        "Asia/Aqtobe",
        "Asia/Aqtau",
        "Asia/Atyrau",
        "Asia/Oral",
        "Asia/Beirut",
        "Asia/Colombo",
        "Africa/Monrovia",
        "Europe/Vilnius",
        "Europe/Luxembourg",
        "Europe/Riga",
        "Africa/Tripoli",
        "Africa/Casablanca",
        "Europe/Monaco",
        "Europe/Chisinau",
        "Pacific/Majuro",
        "Pacific/Kwajalein",
        "Asia/Yangon",
        "Asia/Ulaanbaatar",
        "Asia/Hovd",
        "Asia/Choibalsan",
        "Asia/Macau",
        "America/Martinique",
        "Europe/Malta",
        "Indian/Mauritius",
        "Indian/Maldives",
        "America/Mexico_City",
        "America/Cancun",
        "America/Merida",
        "America/Monterrey",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Chihuahua",
        "America/Ojinaga",
        "America/Hermosillo",
        "America/Tijuana",
        "America/Bahia_Banderas",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Africa/Maputo",
        "Africa/Windhoek",
        "Pacific/Noumea",
        "Pacific/Norfolk",
        "Africa/Lagos",
        "America/Managua",
        "Europe/Amsterdam",
        "Europe/Oslo",
        "Asia/Kathmandu",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Auckland",
        "Pacific/Chatham",
        "America/Panama",
        "America/Lima",
        "Pacific/Tahiti",
        "Pacific/Marquesas",
        "Pacific/Gambier",
        "Pacific/Port_Moresby",
        "Pacific/Bougainville",
        "Asia/Manila",
        "Asia/Karachi",
        "Europe/Warsaw",
        "America/Miquelon",
        "Pacific/Pitcairn",
        "America/Puerto_Rico",
        "Asia/Gaza",
        "Asia/Hebron",
        "Europe/Lisbon",
        "Atlantic/Madeira",
        "Atlantic/Azores",
        "Pacific/Palau",
        "America/Asuncion",
        "Asia/Qatar",
        "Indian/Reunion",
        "Europe/Bucharest",
        "Europe/Belgrade",
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Simferopol",
        "Europe/Kirov",
        "Europe/Astrakhan",
        "Europe/Volgograd",
        "Europe/Saratov",
        "Europe/Ulyanovsk",
        "Europe/Samara",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Barnaul",
        "Asia/Tomsk",
        "Asia/Novokuznetsk",
        "Asia/Krasnoyarsk",
        "Asia/Irkutsk",
        "Asia/Chita",
        "Asia/Yakutsk",
        "Asia/Khandyga",
        "Asia/Vladivostok",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Sakhalin",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr",
        "Asia/Riyadh",
        "Pacific/Guadalcanal",
        "Indian/Mahe",
        "Africa/Khartoum",
        "Europe/Stockholm",
        "Asia/Singapore",
        "America/Paramaribo",
        "Africa/Juba",
        "Africa/Sao_Tome",
        "America/El_Salvador",
        "Asia/Damascus",
        "America/Grand_Turk",
        "Africa/Ndjamena",
        "Indian/Kerguelen",
        "Asia/Bangkok",
        "Asia/Dushanbe",
        "Pacific/Fakaofo",
        "Asia/Dili",
        "Asia/Ashgabat",
        "Africa/Tunis",
        "Pacific/Tongatapu",
        "Europe/Istanbul",
        "America/Port_of_Spain",
        "Pacific/Funafuti",
        "Asia/Taipei",
        "Europe/Kiev",
        "Europe/Uzhgorod",
        "Europe/Zaporozhye",
        "Pacific/Wake",
        "America/New_York",
        "America/Detroit",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Indiana/Indianapolis",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Vevay",
        "America/Chicago",
        "America/Indiana/Tell_City",
        "America/Indiana/Knox",
        "America/Menominee",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/North_Dakota/Beulah",
        "America/Denver",
        "America/Boise",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "America/Juneau",
        "America/Sitka",
        "America/Metlakatla",
        "America/Yakutat",
        "America/Nome",
        "America/Adak",
        "Pacific/Honolulu",
        "America/Montevideo",
        "Asia/Samarkand",
        "Asia/Tashkent",
        "America/Caracas",
        "Asia/Ho_Chi_Minh",
        "Pacific/Efate",
        "Pacific/Wallis",
        "Pacific/Apia",
        "Africa/Johannesburg",
      ],
      currencyList: [
        { name: "Afghan Afghani", code: "AFA" },
        { name: "Albanian Lek", code: "ALL" },
        { name: "Algerian Dinar", code: "DZD" },
        { name: "Angolan Kwanza", code: "AOA" },
        { name: "Argentine Peso", code: "ARS" },
        { name: "Armenian Dram", code: "AMD" },
        { name: "Aruban Florin", code: "AWG" },
        { name: "Australian Dollar", code: "AUD" },
        { name: "Azerbaijani Manat", code: "AZN" },
        { name: "Bahamian Dollar", code: "BSD" },
        { name: "Bahraini Dinar", code: "BHD" },
        { name: "Bangladeshi Taka", code: "BDT" },
        { name: "Barbadian Dollar", code: "BBD" },
        { name: "Belarusian Ruble", code: "BYR" },
        { name: "Belgian Franc", code: "BEF" },
        { name: "Belize Dollar", code: "BZD" },
        { name: "Bermudan Dollar", code: "BMD" },
        { name: "Bhutanese Ngultrum", code: "BTN" },
        { name: "Bitcoin", code: "BTC" },
        { name: "Bolivian Boliviano", code: "BOB" },
        { name: "Bosnia-Herzegovina Convertible Mark", code: "BAM" },
        { name: "Botswanan Pula", code: "BWP" },
        { name: "Brazilian Real", code: "BRL" },
        { name: "British Pound Sterling", code: "GBP" },
        { name: "Brunei Dollar", code: "BND" },
        { name: "Bulgarian Lev", code: "BGN" },
        { name: "Burundian Franc", code: "BIF" },
        { name: "Cambodian Riel", code: "KHR" },
        { name: "Canadian Dollar", code: "CAD" },
        { name: "Cape Verdean Escudo", code: "CVE" },
        { name: "Cayman Islands Dollar", code: "KYD" },
        { name: "CFA Franc BCEAO", code: "XOF" },
        { name: "CFA Franc BEAC", code: "XAF" },
        { name: "CFP Franc", code: "XPF" },
        { name: "Chilean Peso", code: "CLP" },
        { name: "Chinese Yuan", code: "CNY" },
        { name: "Colombian Peso", code: "COP" },
        { name: "Comorian Franc", code: "KMF" },
        { name: "Congolese Franc", code: "CDF" },
        { name: "Costa Rican ColÃ³n", code: "CRC" },
        { name: "Croatian Kuna", code: "HRK" },
        { name: "Cuban Convertible Peso", code: "CUC" },
        { name: "Czech Republic Koruna", code: "CZK" },
        { name: "Danish Krone", code: "DKK" },
        { name: "Djiboutian Franc", code: "DJF" },
        { name: "Dominican Peso", code: "DOP" },
        { name: "East Caribbean Dollar", code: "XCD" },
        { name: "Egyptian Pound", code: "EGP" },
        { name: "Eritrean Nakfa", code: "ERN" },
        { name: "Estonian Kroon", code: "EEK" },
        { name: "Ethiopian Birr", code: "ETB" },
        { name: "Euro", code: "EUR" },
        { name: "Falkland Islands Pound", code: "FKP" },
        { name: "Fijian Dollar", code: "FJD" },
        { name: "Gambian Dalasi", code: "GMD" },
        { name: "Georgian Lari", code: "GEL" },
        { name: "German Mark", code: "DEM" },
        { name: "Ghanaian Cedi", code: "GHS" },
        { name: "Gibraltar Pound", code: "GIP" },
        { name: "Greek Drachma", code: "GRD" },
        { name: "Guatemalan Quetzal", code: "GTQ" },
        { name: "Guinean Franc", code: "GNF" },
        { name: "Guyanaese Dollar", code: "GYD" },
        { name: "Haitian Gourde", code: "HTG" },
        { name: "Honduran Lempira", code: "HNL" },
        { name: "Hong Kong Dollar", code: "HKD" },
        { name: "Hungarian Forint", code: "HUF" },
        { name: "Icelandic KrÃ³na", code: "ISK" },
        { name: "Indian Rupee", code: "INR" },
        { name: "Indonesian Rupiah", code: "IDR" },
        { name: "Iranian Rial", code: "IRR" },
        { name: "Iraqi Dinar", code: "IQD" },
        { name: "Israeli New Sheqel", code: "ILS" },
        { name: "Italian Lira", code: "ITL" },
        { name: "Jamaican Dollar", code: "JMD" },
        { name: "Japanese Yen", code: "JPY" },
        { name: "Jordanian Dinar", code: "JOD" },
        { name: "Kazakhstani Tenge", code: "KZT" },
        { name: "Kenyan Shilling", code: "KES" },
        { name: "Kuwaiti Dinar", code: "KWD" },
        { name: "Kyrgystani Som", code: "KGS" },
        { name: "Laotian Kip", code: "LAK" },
        { name: "Latvian Lats", code: "LVL" },
        { name: "Lebanese Pound", code: "LBP" },
        { name: "Lesotho Loti", code: "LSL" },
        { name: "Liberian Dollar", code: "LRD" },
        { name: "Libyan Dinar", code: "LYD" },
        { name: "Lithuanian Litas", code: "LTL" },
        { name: "Macanese Pataca", code: "MOP" },
        { name: "Macedonian Denar", code: "MKD" },
        { name: "Malagasy Ariary", code: "MGA" },
        { name: "Malawian Kwacha", code: "MWK" },
        { name: "Malaysian Ringgit", code: "MYR" },
        { name: "Maldivian Rufiyaa", code: "MVR" },
        { name: "Mauritanian Ouguiya", code: "MRO" },
        { name: "Mauritian Rupee", code: "MUR" },
        { name: "Mexican Peso", code: "MXN" },
        { name: "Moldovan Leu", code: "MDL" },
        { name: "Mongolian Tugrik", code: "MNT" },
        { name: "Moroccan Dirham", code: "MAD" },
        { name: "Mozambican Metical", code: "MZM" },
        { name: "Myanmar Kyat", code: "MMK" },
        { name: "Namibian Dollar", code: "NAD" },
        { name: "Nepalese Rupee", code: "NPR" },
        { name: "Netherlands Antillean Guilder", code: "ANG" },
        { name: "New Taiwan Dollar", code: "TWD" },
        { name: "New Zealand Dollar", code: "NZD" },
        { name: "Nicaraguan CÃ³rdoba", code: "NIO" },
        { name: "Nigerian Naira", code: "NGN" },
        { name: "North Korean Won", code: "KPW" },
        { name: "Norwegian Krone", code: "NOK" },
        { name: "Omani Rial", code: "OMR" },
        { name: "Pakistani Rupee", code: "PKR" },
        { name: "Panamanian Balboa", code: "PAB" },
        { name: "Papua New Guinean Kina", code: "PGK" },
        { name: "Paraguayan Guarani", code: "PYG" },
        { name: "Peruvian Nuevo Sol", code: "PEN" },
        { name: "Philippine Peso", code: "PHP" },
        { name: "Polish Zloty", code: "PLN" },
        { name: "Qatari Rial", code: "QAR" },
        { name: "Romanian Leu", code: "RON" },
        { name: "Russian Ruble", code: "RUB" },
        { name: "Rwandan Franc", code: "RWF" },
        { name: "Salvadoran ColÃ³n", code: "SVC" },
        { name: "Samoan Tala", code: "WST" },
        { name: "Saudi Riyal", code: "SAR" },
        { name: "Serbian Dinar", code: "RSD" },
        { name: "Seychellois Rupee", code: "SCR" },
        { name: "Sierra Leonean Leone", code: "SLL" },
        { name: "Singapore Dollar", code: "SGD" },
        { name: "Slovak Koruna", code: "SKK" },
        { name: "Solomon Islands Dollar", code: "SBD" },
        { name: "Somali Shilling", code: "SOS" },
        { name: "South African Rand", code: "ZAR" },
        { name: "South Korean Won", code: "KRW" },
        { name: "Special Drawing Rights", code: "XDR" },
        { name: "Sri Lankan Rupee", code: "LKR" },
        { name: "St. Helena Pound", code: "SHP" },
        { name: "Sudanese Pound", code: "SDG" },
        { name: "Surinamese Dollar", code: "SRD" },
        { name: "Swazi Lilangeni", code: "SZL" },
        { name: "Swedish Krona", code: "SEK" },
        { name: "Swiss Franc", code: "CHF" },
        { name: "Syrian Pound", code: "SYP" },
        { name: "São Tomé and Príncipe Dobra", code: "STD" },
        { name: "Tajikistani Somoni", code: "TJS" },
        { name: "Tanzanian Shilling", code: "TZS" },
        { name: "Thai Baht", code: "THB" },
        { name: "Tongan Pa'anga", code: "TOP" },
        { name: "Trinidad & Tobago Dollar", code: "TTD" },
        { name: "Tunisian Dinar", code: "TND" },
        { name: "Turkish Lira", code: "TRY" },
        { name: "Turkmenistani Manat", code: "TMT" },
        { name: "Ugandan Shilling", code: "UGX" },
        { name: "Ukrainian Hryvnia", code: "UAH" },
        { name: "United Arab Emirates Dirham", code: "AED" },
        { name: "Uruguayan Peso", code: "UYU" },
        { name: "US Dollar", code: "USD" },
        { name: "Uzbekistan Som", code: "UZS" },
        { name: "Vanuatu Vatu", code: "VUV" },
        { name: "Venezuelan BolÃvar", code: "VEF" },
        { name: "Vietnamese Dong", code: "VND" },
        { name: "Yemeni Rial", code: "YER" },
        { name: "Zambian Kwacha", code: "ZMK" },
      ],

      uploading: 0,
      errors: {
        name: false,
        currency: false,
      },
      reports: [
        { name: this.$t("roles.form.Overview"), link: "overview" },
        { name: this.$t("roles.form.totalReport"), link: "totalReport" },

        {
          name: this.$t("roles.form.TotalCustomerAccount"),
          link: "customersTotalAccounts",
        },
        {
          name: this.$t("roles.form.CustomerAccountDetails"),
          link: "customersDetailsAccounts",
        },
        {
          name: this.$t("roles.form.RemainingBalanceForCustomers"),
          link: "customersBalance",
        },
        { name: this.$t("roles.form.CustomerGuide"), link: "customersGuide" },

        {
          name: this.$t("roles.form.TotalSupplierAccount"),
          link: "suppliersTotalAccounts",
        },
        {
          name: this.$t("roles.form.VendorAccountDetails"),
          link: "suppliersDetailsAccounts",
        },
        {
          name: this.$t("roles.form.RemainingBalanceForSuppliers"),
          link: "suppliersBalance",
        },
        { name: this.$t("roles.form.SupplierDirectory"), link: "suppliersGuide" },

        {
          name: this.$t("roles.form.PartnerIsTotalAccount"),
          link: "partnersTotalAccounts",
        },
        {
          name: this.$t("roles.form.PartnerAccountDetails"),
          link: "partnersDetailsAccounts",
        },
        {
          name: this.$t("roles.form.TheRemainingBalanceOfThePartners"),
          link: "partnersBalance",
        },
        { name: this.$t("roles.form.AGuideForPartners"), link: "partnersGuide" },

        {
          name: this.$t("roles.form.totalProjectAccount"),
          link: "projectsTotalAccounts",
        },
        {
          name: this.$t("roles.form.ProjectAccountDetails"),
          link: "projectsDetailsAccounts",
        },
        { name: this.$t("roles.form.ProjectAssets"), link: "projectsBalance" },
        {
          name: this.$t("roles.form.AGeneralGlimpseOfTheProject"),
          link: "partnersGuide",
        },

        { name: this.$t("roles.form.TreasuryStatement"), link: "safesAccounts" },
        { name: this.$t("roles.form.SafeBalances"), link: "safersBalance" },

        { name: this.$t("roles.form.InventoryOfStores"), link: "warehouseInventory" },
        { name: this.$t("roles.form.TheValueOfProducts"), link: "ProductsValue" },

        { name: this.$t("roles.form.SalesByInvoice"), link: "salesByInvoice" },
        { name: this.$t("roles.form.SalesByProduct"), link: "salesByItem" },

        { name: this.$t("roles.form.PurchasesByInvoice"), link: "purchasesByBill" },
        { name: this.$t("roles.form.PurchasesByProduct"), link: "purchasesByItem" },

        { name: this.$t("roles.form.ReturnedByInvoice"), link: "salesReturnsByInvoice" },
        { name: this.$t("roles.form.ReturnedByProduct"), link: "salesReturnsByItem" },

        {
          name: this.$t("roles.form.PurchaseReturnsOnInvoice"),
          link: "purchasesReturnsByBill",
        },
        {
          name: this.$t("roles.form.ReturnsPurchaseByProduct"),
          link: "purchasesReturnsByItem",
        },

        { name: this.$t("roles.form.InvoiceRequests"), link: "purchasesReturnsByBill" },
        { name: this.$t("roles.form.OrdersByProduct"), link: "purchasesReturnsByItem" },

        {
          name: this.$t("roles.form.InvoicePurchaseOrders"),
          link: "purchasesOrdersByBill",
        },
        {
          name: this.$t("roles.form.PurchaseOrdersByProduct"),
          link: "purchasesOrdersByItem",
        },

        { name: this.$t("roles.form.RecordSalesPayments"), link: "paymentHistory" },
        {
          name: this.$t("roles.form.RecordPurchasePayments"),
          link: "purchasePaymentHistory",
        },

        { name: this.$t("roles.form.RegisterSalesCheques"), link: "chequesHistory" },
        { name: this.$t("roles.form.CheckInRecord"), link: "purchaseChequesHistory" },

        { name: this.$t("roles.form.RecordSalesDiscounts"), link: "discountsHistory" },
        {
          name: this.$t("roles.form.RecordPurchaseDiscounts"),
          link: "purchaseDiscountsHistory",
        },

        {
          name: this.$t("roles.form.InvoicingProjects"),
          link: "projectsDepositsByInvoice",
        },
        {
          name: this.$t("roles.form.ProductDepositProcesses"),
          link: "projectsDepositsByItem",
        },

        {
          name: this.$t("roles.form.InvoiceProjectWithdrawals"),
          link: "projectsWithdrawalsByBill",
        },
        { name: this.$t("roles.form.ProductRecalls"), link: "projectsWithdrawalsByItem" },

        {
          name: this.$t("roles.form.InvoiceProjectTransfers"),
          link: "projectsTransfersByInvoice",
        },
        {
          name: this.$t("roles.form.ProjectTransfersByProduct"),
          link: "projectsTransfersByItem",
        },

        { name: this.$t("roles.form.ExpensesList"), link: "expenseHistory" },
        {
          name: this.$t("roles.form.ExpensesByClassification"),
          link: "expenseByCategory",
        },

        {
          name: this.$t("roles.form.EmployeeAccountStatement"),
          link: "employeeAccountStatement",
        },
      ],
      requiredData: [
        { id: "0", name: this.$t("companies.form.reportInvoice") },
        { id: "1", name: this.$t("companies.form.reference") },
        { id: "2", name: this.$t("companies.form.dueData") },
        { id: "3", name: this.$t("companies.form.priceList") },
        { id: "4", name: this.$t("companies.form.taxAndDiscountOnTheProduct") },
        { id: "5", name: this.$t("companies.form.taxAndDiscountTotal") },
        { id: "6", name: this.$t("companies.form.noteToTheClient") },
        { id: "7", name: this.$t("companies.form.offerTerms") },
      ],
      elements: [
        { id: "1", name: this.$t("companies.form.BillingVsPayment") },
        { id: "2", name: this.$t("companies.form.ProfitAndLoss") },
        { id: "3", name: this.$t("companies.form.StoreAlerts") },
        { id: "4", name: this.$t("companies.form.AnOverviewOfTheOffers") },
        { id: "5", name: this.$t("companies.form.RecentOffers") },
        { id: "6", name: this.$t("companies.form.UnpaidBills") },
        { id: "7", name: this.$t("companies.form.UnpaidBills") },

        { id: "8", name: this.$t("companies.form.UrgentActions") },
        { id: "9", name: this.$t("companies.form.HighestExpensesByCategory") },
        { id: "10", name: this.$t("companies.form.MostActiveCustomers") },
        { id: "11", name: this.$t("companies.form.BillingOverview") },
        { id: "12", name: this.$t("companies.form.RecentBills") },
        {
          id: "13",
          name: this.$t("companies.form.AnOverviewOfTheDemandBonds"),
        },
        { id: "14", name: this.$t("companies.form.CustomerBalanceAlert") },
      ],
      actions: [
        {
          name: this.$t("companies.form.addCustomer"),
          link: "/customers/create",
          icon: "user-alt",
        },
        {
          name: this.$t("companies.form.addSupplier"),
          link: "/suppliers/create",
          icon: "user-tie",
        },
        {
          name: this.$t("companies.form.addPartner"),
          link: "/partners/create",
          icon: "handshake",
        },
        {
          name: this.$t("companies.form.addAccount"),
          link: "/accounts/create",
          icon: "coins",
        },
        {
          name: this.$t("companies.form.addProject"),
          link: "/projects/create",
          icon: "chart-line",
        },
        {
          name: this.$t("companies.form.addSafe"),
          link: "/safes/create",
          icon: "treasure-chest",
        },
        {
          name: this.$t("companies.form.addBanckAccount"),
          link: "/bankAccounts/create",
          icon: "university",
        },
        {
          name: this.$t("companies.form.addCapital"),
          link: "/capitals/create",
          icon: "archway",
        },
        {
          name: this.$t("companies.form.addStore"),
          link: "/stores/create",
          icon: "store",
        },
        {
          name: this.$t("companies.form.addProduct"),
          link: "/products/create",
          icon: "store-alt",
        },
        {
          name: this.$t("companies.form.addMatrial"),
          link: "/matrials/create",
          icon: "store-alt",
        },
        {
          name: this.$t("companies.form.addSubscription"),
          link: "/subscriptions/create",
          icon: "history",
        },
        {
          name: this.$t("companies.form.addEmployee"),
          link: "/employees/create",
          icon: "user-cog",
        },
        {
          name: this.$t("companies.form.addQuotation"),
          link: "/quotations/create",
          icon: "user-cog",
        },
        {
          name: this.$t("companies.form.addSubscriptionsOperation"),
          link: "/subscriptionsOperations/create",
          icon: "stopwatch",
        },
        {
          name: this.$t("companies.form.addInvoice"),
          link: "/invoices/create",
          icon: "file-invoice-dollar",
        },
        {
          name: this.$t("companies.form.addBill"),
          link: "/bills/create",
          icon: "file-invoice-dollar",
        },
        {
          name: this.$t("companies.form.addSaleReturn"),
          link: "/saleReturns/create",
          icon: "exchange",
        },
        {
          name: this.$t("companies.form.addpurchaseReturn"),
          link: "/purchaseReturns/create",
          icon: "exchange",
        },
        {
          name: this.$t("companies.form.addorder"),
          link: "/orders/create",
          icon: "briefcase",
        },
        {
          name: this.$t("companies.form.addpurchaseOrder"),
          link: "/purchaseOrders/create",
          icon: "briefcase",
        },
        {
          name: this.$t("companies.form.addSalesPayment"),
          link: "/salesPayments/create",
          icon: "credit-card-front",
        },
        {
          name: this.$t("companies.form.addPurchasePayment"),
          link: "/purchasePayments/create",
          icon: "credit-card-front",
        },
        {
          name: this.$t("companies.form.addSalesCheque"),
          link: "/salesCheques/create",
          icon: "money-check-alt",
        },
        {
          name: this.$t("companies.form.addPurchaseCheque"),
          link: "/purchaseCheques/create",
          icon: "money-check-alt",
        },
        {
          name: this.$t("companies.form.addSalesDiscount"),
          link: "/salesDiscounts/create",
          icon: "badge-percent",
        },
        {
          name: this.$t("companies.form.addPurchaseDiscount"),
          link: "/purchaseDiscounts/create",
          icon: "badge-percent",
        },
        {
          name: this.$t("companies.form.addSalesInstallment"),
          link: "/salesInstallments/create",
          icon: "wallet",
        },
        {
          name: this.$t("companies.form.addPurchaseInstallment"),
          link: "/purchaseInstallments/create",
          icon: "wallet",
        },
        {
          name: this.$t("companies.form.addExpense"),
          link: "/expenses/create",
          icon: "usd-square",
        },
        {
          name: this.$t("companies.form.addSafesDeposit"),
          link: "/safesDeposits/create",
          icon: "envelope-open-dollar",
        },
        {
          name: this.$t("companies.form.addSafesWithdrawal"),
          link: "/safesWithdrawals/create",
          icon: "envelope-open-dollar",
        },
        {
          name: this.$t("companies.form.addSafesTransfer"),
          link: "/safesTransfers/create",
          icon: "envelope-open-dollar",
        },
        {
          name: this.$t("companies.form.addStoresDeposit"),
          link: "/storesDeposits/create",
          icon: "boxes-alt",
        },
        {
          name: this.$t("companies.form.addStoresWithdrawal"),
          link: "/storesWithdrawals/create",
          icon: "boxes-alt",
        },
        {
          name: this.$t("companies.form.addStoresTransfer"),
          link: "/storesTransfers/create",
          icon: "boxes-alt",
        },
        {
          name: this.$t("companies.form.addPartnersDeposit"),
          link: "/partnersDeposits/create",
          icon: "handshake",
        },
        {
          name: this.$t("companies.form.addPartnersWithdrawal"),
          link: "/partnersWithdrawals/create",
          icon: "handshake",
        },
        {
          name: this.$t("companies.form.addPartnersSettlement"),
          link: "/partnersSettlements/create",
          icon: "handshake",
        },
        {
          name: this.$t("companies.form.addPartnersProfit"),
          link: "/partnersProfits/create",
          icon: "handshake",
        },
        {
          name: this.$t("companies.form.addAccountsDeposit"),
          link: "/accountsDeposits/create",
          icon: "hand-holding-usd",
        },
        {
          name: this.$t("companies.form.addAccountsWithdrawal"),
          link: "/accountsWithdrawals/create",
          icon: "hand-holding-usd",
        },
        {
          name: this.$t("companies.form.addProjectsDeposit"),
          link: "/projectsDeposits/create",
          icon: "chart-line",
        },
        {
          name: this.$t("companies.form.addProjectsWithdrawal"),
          link: "/projectsWithdrawals/create",
          icon: "chart-line",
        },
        {
          name: this.$t("companies.form.addProjectsTransfer"),
          link: "/projectsTransfers/create",
          icon: "chart-line",
        },
        {
          name: this.$t("companies.form.addManufacturingModel"),
          link: "/manufacturingModels/create",
          icon: "hammer",
        },
        {
          name: this.$t("companies.form.addManufacturingOperation"),
          link: "/manufacturingOperations/create",
          icon: "hammer",
        },
        {
          name: this.$t("companies.form.sowPointOfSales"),
          link: "/pointOfSales",
          icon: "cash-register",
        },
        {
          name: this.$t("companies.form.addEmployeesSalarie"),
          link: "/employeesSalaries/create",
          icon: "user-chart",
        },
        {
          name: this.$t("companies.form.addEmployeesIncentive"),
          link: "/employeesIncentives/create",
          icon: "user-chart",
        },
        {
          name: this.$t("companies.form.addEmployeesDeduction"),
          link: "/employeesDeductions/create",
          icon: "user-chart",
        },
        {
          name: this.$t("companies.form.addEmployeesWithdrawal"),
          link: "/employeesWithdrawals/create",
          icon: "user-chart",
        },
        {
          name: this.$t("companies.form.addEndorsement"),
          link: "/endorsements/create",
          icon: "file-signature",
        },
        {
          name: this.$t("companies.form.addDeposit"),
          link: "/deposits/create",
          icon: "wallet",
        },
        {
          name: this.$t("companies.form.addCity"),
          link: "/cities/create",
          icon: "shipping-fast",
        },
        {
          name: this.$t("companies.form.addPickupLocation"),
          link: "/pickupLocations/create",
          icon: "shipping-fast",
        },
        {
          name: this.$t("companies.form.addShippingOperation"),
          link: "/shippingOperations/create",
          icon: "shipping-fast",
        },
      ],
    };
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.$parent.stopEdit = false;
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (typeof this.item.currency === "undefined" || this.item.currency == null) {
        error = 1;
        this.errors.currency = true;
      }
      if (error == 0) {
        if (this.uploading == 0) {
          if (this.$route.name == "companiesCreate") {
            this.$parent.stopEdit = true;
            axios.post(this.$linkGnirator(this.path), this.item).then((response) => {
              if (response.data == "limited") {
                this.$parent.aletText = this.$t(
                  "allerts.YouHaveReachedTheLimitForCompaniesPleaseUpdatePackage"
                );
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText = this.$t(
                  "allerts.theCompanyHasBeenAddedSuccessfully"
                );
                this.$parent.alertType = "success";
                this.$router.push(this.path);
                this.$parent.stopEdit = false;
              }
              return response;
            });
          } else if (this.$route.name == "companiesEdit") {
            this.item._method = "PUT";
            this.$parent.stopEdit = true;
            axios
              .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
              .then((response) => {
                this.$parent.aletText = this.$t(
                  "allerts.theCompanyHasBeenSuccessfullyModified"
                );
                this.$parent.alertType = "success";
                this.$router.go(-1);
                this.$parent.stopEdit = false;
                this.$parent.getCompanies();
                return response;
              });
          }
        } else {
          this.$parent.aletText = this.$t("allerts.WaitForTheFilesToUpload");
          this.$parent.alertType = "danger";
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        this.$parent.getCompanies();
      } else {
        this.$parent.aletText = this.$t("allerts.theCompanyHasBeenAddedSuccessfully");
        this.$parent.alertType = "success";
        this.$router.push(this.path);
        this.$parent.stopEdit = false;
      }
    },
  },
  mounted() {
    this.$updateDatabase(["expenseSections"]);
    if (this.$route.name == "companiesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }

    this.filterdSignatures = []

    this.$database.signatures.forEach(element => {
      this.filterdSignatures.push({
        "name": element.name
      })
    });
  },
  components: {
    formInput,
    selectInput,
    formTextarea,
    fileInput,
    dvider,
    addHeader,
    iconInput,
    monyInput,
    loading,
    checkInput,
    connectionInput,
  },
};
</script>
