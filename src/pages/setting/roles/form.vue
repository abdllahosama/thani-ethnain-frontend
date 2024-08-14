<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('roles.form.createRole')"
          :description="$t('roles.form.fromHereYouCanCreateANewUserRole')"
          v-if="$route.name == 'rolesCreate'"
        />
        <addHeader
          :title="$t('roles.form.editRole')"
          :description="$t('roles.form.fromHereYouCanModifyTheUsersRoles')"
          v-if="$route.name == 'rolesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            class="dic-role"
            :title="$t('roles.form.basicInformation')"
            noLine="true"
          />
          <formInput
            :title="$t('roles.form.roleName')"
            v-model="item.name"
            :col="'col-12'"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <formTextarea
            :title="$t('roles.form.descriptionOfRole')"
            v-model="item.discription"
          />
          <small class="form-text text-muted mb-4 mt-5 col-12 form-ditails">{{
            $t('roles.form.options')
          }}</small>

          <roleGroupInput 
            :title="$t('roles.form.Companies')"
            :icon="'city'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'companies_show'},
              {name:  $t('roles.form.add'),    key: 'companies_add'},
              {name:  $t('roles.form.edit'),   key: 'companies_edit'},
              {name:  $t('roles.form.delete'), key: 'companies_delete'},
            ]"
          />

          <roleGroupInput 
            :title="$t('roles.form.users')"
            :icon="'user-chart'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'users_show'},
              {name:  $t('roles.form.add'),    key: 'users_add'},
              {name:  $t('roles.form.edit'),   key: 'users_edit'},
              {name:  $t('roles.form.delete'), key: 'users_delete'},
            ]"
          />

          <roleGroupInput 
            :title="$t('roles.form.roles')"
            :icon="'users-class'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'roles_show'},
              {name:  $t('roles.form.add'),    key: 'roles_add'},
              {name:  $t('roles.form.edit'),   key: 'roles_edit'},
              {name:  $t('roles.form.delete'), key: 'roles_delete'},
            ]"
          />

          <hr class="mt-5 mb-5 col-12" />
          <small class="form-text text-muted mb-4 mt-5 col-12">{{
            $t('roles.form.theInputs')
          }}</small>
          <roleGroupInput 
            :title="$t('roles.form.customers')"
            :icon="'user-alt'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'customers_show'},
              {name:  $t('roles.form.add'),    key: 'customers_add'},
              {name:  $t('roles.form.edit'),   key: 'customers_edit'},
              {name:  $t('roles.form.delete'), key: 'customers_delete'},
            ]"
          />
          <hr class="col-12" />
          <roleGroupInput 
        :title="$t('roles.form.estimates')"
        :icon="'calculator'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'quotations_show'},
          {name:  $t('roles.form.SelectedWidth'),  key: 'quotations_show_allow'},
          {name:  $t('roles.form.add'),    key: 'quotations_add'},
          {name:  $t('roles.form.changeProduct'),   key: 'quotations_edit_product_show'},
          {name:  $t('roles.form.edit'),   key: 'quotations_edit'},
          {name:  $t('roles.form.delete'), key: 'quotations_delete'},
          {name:  $t('roles.form.TransferToInvoice'),   key: 'quotations_turn_into_invoice_show'},
        ]"
      />
        
      <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.quotations_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.quotations_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
          
          <hr class="col-12" />
          <roleGroupInput 
        :title="$t('roles.form.invoices')"
        :icon="'file-invoice-dollar'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'invoices_show'},
          {name:  $t('roles.form.add'),    key: 'invoices_add'},
          {name:  $t('roles.form.SelectedWidth'),   key: 'invoices_show_allow'},
          {name:  $t('roles.form.edit'),   key: 'invoices_edit'},
          {name:  $t('roles.form.changeProduct'),   key: 'invoices_edit_product'},
          {name:  $t('roles.form.delete'), key: 'invoices_delete'},
          {name:  $t('roles.form.shortSale'),   key: 'invoices_short_sale'},
        ]"
      />
      <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.invoices_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.invoices_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
      <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.SaleReturns')"
          :icon="'exchange'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'sale_returns_show'},
            {name:  $t('roles.form.add'),    key: 'sale_returns_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'sale_returns_show_allow'},
            {name:  $t('roles.form.edit'),   key: 'sale_returns_edit'},
            {name:  $t('roles.form.changeProduct'),   key: 'sale_returns_edit_product'},
            {name:  $t('roles.form.delete'), key: 'sale_returns_delete'},
            {name:  $t('roles.form.shortSale'),   key: 'sale_returns_short_sale'},
          ]"
        />
        <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.sale_returns_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.sale_returns_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
               <roleGroupInput 
                     :title="$t('roles.form.saleOrders')"
                     :icon="'briefcase'"
                     :values="[
                       {name:  $t('roles.form.view'),   key: 'orders_show'},
                       {name:  $t('roles.form.add'),    key: 'orders_add'},
                       {name:  $t('roles.form.SelectedWidth'),   key: 'orders_show_allow'},
                       {name:  $t('roles.form.editDate'),   key: 'orders_edit_date'},
                       {name:  $t('roles.form.changeProduct'),   key: 'orders_edit_product'},
                       {name:  $t('roles.form.edit'),   key: 'orders_edit'},
                       {name:  $t('roles.form.delete'), key: 'orders_delete'},
                       {name:  $t('roles.form.TransferToInvoice'),   key: 'orders_delete'},
                     ]"
                   />
                   <hr class="col-12" />
                   <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.orders_allow_status"
                         :options="[
                                   { name: $t('orders.form.draft'), id: 0 },
                                   { name: $t('orders.form.call1'), id: 1 },
                                   { name: $t('orders.form.call2'), id: 2 },
                                   { name: $t('orders.form.call3'), id: 3 },
                                   { name: $t('orders.form.Certain'), id: 4 },
                                   { name: $t('orders.form.readyForShipping'), id: 5 },
                                   { name: $t('orders.form.shipped'), id: 6 },
                                   { name: $t('orders.form.returnd'), id: 7 },
                                   { name: $t('orders.form.returnedToOrigen'), id: 8 },
                                   { name: $t('orders.form.rejected'), id: 9 },
                                   { name: $t('orders.form.canceled'), id: 10 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesAvailableForOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                     <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.orders_allow_status"
                         :options="[
                                   { name: $t('orders.form.draft'), id: 0 },
                                   { name: $t('orders.form.call1'), id: 1 },
                                   { name: $t('orders.form.call2'), id: 2 },
                                   { name: $t('orders.form.call3'), id: 3 },
                                   { name: $t('orders.form.Certain'), id: 4 },
                                   { name: $t('orders.form.readyForShipping'), id: 5 },
                                   { name: $t('orders.form.shipped'), id: 6 },
                                   { name: $t('orders.form.returnd'), id: 7 },
                                   { name: $t('orders.form.returnedToOrigen'), id: 8 },
                                   { name: $t('orders.form.rejected'), id: 9 },
                                   { name: $t('orders.form.canceled'), id: 10 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesPresentedToOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
          <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.suppliers')"
            :icon="'user-tie'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'suppliers_show'},
              {name:  $t('roles.form.add'),    key: 'suppliers_add'},
              {name:  $t('roles.form.edit'),   key: 'suppliers_edit'},
              {name:  $t('roles.form.delete'), key: 'suppliers_delete'},
            ]"
          />
          <hr class="col-12" />
               <roleGroupInput 
                :title="$t('roles.form.PurchaseReturns')"
                :icon="'exchange'"
                :values="[
                  {name:  $t('roles.form.view'),   key: 'purchase_returns_show'},
                  {name:  $t('roles.form.add'),    key: 'purchase_returns_add'},
                  {name:  $t('roles.form.SelectedWidth'),   key: 'purchase_returns_show_allow'},
                  {name:  $t('roles.form.edit'),   key: 'purchase_returns_edit'},
                  {name:  $t('roles.form.changeProduct'),   key: 'purchase_returns_edit_product'},
                  {name:  $t('roles.form.delete'), key: 'purchase_returns_delete'},
                  {name:  $t('roles.form.shortSale'),   key: 'purchase_returns_short_sale'},
                ]"
              />
              <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_returns_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_returns_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
         
               <hr class="col-12" />
               <roleGroupInput 
                     :title="$t('roles.form.purchaseOrders')"
                     :icon="'briefcase'"
                     :values="[
                       {name:  $t('roles.form.view'),   key: 'purchase_orders_show'},
                       {name:  $t('roles.form.add'),    key: 'purchase_orders_add'},
                       {name:  $t('roles.form.SelectedWidth'),   key: 'purchase_orders_show_allow'},
                       {name:  $t('roles.form.changeProduct'),   key: 'purchase_orders_edit_product'},
                       {name:  $t('roles.form.edit'),   key: 'purchase_orders_edit'},
                       {name:  $t('roles.form.delete'), key: 'purchase_orders_delete'},
                     ]"
                   />
                   <hr class="col-12" />
                   <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.purchase_orders_allow_status"
                         :options="[
                                   { name: $t('orders.form.draft'), id: 0 },
                                   { name: $t('orders.form.call1'), id: 1 },
                                   { name: $t('orders.form.call2'), id: 2 },
                                   { name: $t('orders.form.call3'), id: 3 },
                                   { name: $t('orders.form.Certain'), id: 4 },
                                   { name: $t('orders.form.readyForShipping'), id: 5 },
                                   { name: $t('orders.form.shipped'), id: 6 },
                                   { name: $t('orders.form.returnd'), id: 7 },
                                   { name: $t('orders.form.returnedToOrigen'), id: 8 },
                                   { name: $t('orders.form.rejected'), id: 9 },
                                   { name: $t('orders.form.canceled'), id: 10 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesAvailableForOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                     <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.purchase_orders_allow_status"
                         :options="[
                                   { name: $t('orders.form.draft'), id: 0 },
                                   { name: $t('orders.form.call1'), id: 1 },
                                   { name: $t('orders.form.call2'), id: 2 },
                                   { name: $t('orders.form.call3'), id: 3 },
                                   { name: $t('orders.form.Certain'), id: 4 },
                                   { name: $t('orders.form.readyForShipping'), id: 5 },
                                   { name: $t('orders.form.shipped'), id: 6 },
                                   { name: $t('orders.form.returnd'), id: 7 },
                                   { name: $t('orders.form.returnedToOrigen'), id: 8 },
                                   { name: $t('orders.form.rejected'), id: 9 },
                                   { name: $t('orders.form.canceled'), id: 10 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesPresentedToOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                    <hr class="col-12" />
                <roleGroupInput 
                  :title="$t('roles.form.safes')"
                  :icon="'treasure-chest'"
                  :values="[
                    {name:  $t('roles.form.view'),   key: 'safes_show'},
                    {name:  $t('roles.form.add'),    key: 'safes_add'},
                    {name: $t('roles.form.SelectedWidth'),  key: 'safes_show_allow'},
                    {name:  $t('roles.form.edit'),   key: 'safes_edit'},
                    {name:  $t('roles.form.delete'), key: 'safes_delete'},
                  ]"
                />
          <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.bankAccounts')"
            :icon="'university'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'bank_accounts_show'},
              {name:  $t('roles.form.add'),    key: 'bank_accounts_add'},
              {name: $t('roles.form.SelectedWidth'),  key: 'bank_accounts_show_allow'},
              {name:  $t('roles.form.edit'),   key: 'bank_accounts_edit'},
              {name:  $t('roles.form.delete'), key: 'bank_accounts_delete'},
            ]"
          />
          <hr class="col-12" />
          <roleGroupInput 
                :title="$t('roles.form.salePayments')"
                :icon="'credit-card-front'"
                :values="[
                  {name:  $t('roles.form.view'),   key: 'sales_payments_show'},
                  {name:  $t('roles.form.add'),    key: 'sales_payments_add'},
                  {name:  $t('roles.form.SelectedWidth'),   key: 'sales_payments_show_allow'},
                  {name:  $t('roles.form.ChangeOptions'),   key: 'sales_payments_edit_item'},
                  {name:  $t('roles.form.edit'),   key: 'sales_payments_edit'},
                  {name:  $t('roles.form.delete'), key: 'sales_payments_delete'},
                ]"
              />
              <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.sales_payments_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.sales_payments_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
          <roleGroupInput 
                :title="$t('roles.form.purchasePayments')"
                :icon="'credit-card-front'"
                :values="[
                  {name:  $t('roles.form.view'),   key: 'purchase_payments_show'},
                  {name:  $t('roles.form.add'),    key: 'purchase_payments_add'},
                  {name:  $t('roles.form.SelectedWidth'),   key: 'purchase_payments_show_allow'},
                  {name:  $t('roles.form.ChangeOptions'),   key: 'purchase_payments_edit_item'},
                  {name:  $t('roles.form.edit'),   key: 'purchase_payments_edit'},
                  {name:  $t('roles.form.delete'), key: 'purchase_payments_delete'},
                ]"
              />
              <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_payments_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_payments_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.expenses')"
          :icon="'usd-square'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'expenses_show'},
            {name:  $t('roles.form.add'),    key: 'expenses_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'expenses_show_allow'},
            {name:  $t('roles.form.edit'),   key: 'expenses_edit'},
            {name:  $t('roles.form.delete'), key: 'expenses_delete'},
          ]"
        />
        <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.safes')"
            :icon="'treasure-chest'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'safes_show'},
              {name:  $t('roles.form.add'),    key: 'safes_add'},
              {name: $t('roles.form.SelectedWidth'),  key: 'safes_show_allow'},
              {name:  $t('roles.form.edit'),   key: 'safes_edit'},
              {name:  $t('roles.form.delete'), key: 'safes_delete'},
            ]"
          />
          <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.depositLockers')"
          :icon="'envelope-open-dollar'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'safes_deposits_show'},
            {name:  $t('roles.form.add'),    key: 'safes_deposits_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'safes_deposits_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'safes_deposits_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'safes_deposits_edit'},
            {name:  $t('roles.form.delete'), key: 'safes_deposits_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_deposits_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_deposits_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.pullOutLockers')"
          :icon="'envelope-open-dollar'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'safes_withdrawals_show'},
            {name:  $t('roles.form.add'),    key: 'safes_withdrawals_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'safes_withdrawals_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'safes_withdrawals_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'safes_withdrawals_edit'},
            {name:  $t('roles.form.delete'), key: 'safes_withdrawals_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_withdrawals_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_withdrawals_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.MovingLockers')"
          :icon="'envelope-open-dollar'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'safes_transfers_show'},
            {name:  $t('roles.form.add'),    key: 'safes_transfers_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'safes_transfers_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'safes_transfers_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'safes_transfers_edit'},
            {name:  $t('roles.form.delete'), key: 'safes_transfers_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_transfers_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.safes_transfers_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.stores')"
            :icon="'store-alt'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'stores_show'},
              {name:  $t('roles.form.SelectedWidth'),  key: 'stores_show_allow'},
              {name:  $t('roles.form.add'),   key: 'stores_add'},
              {name:  $t('roles.form.edit'),   key: 'stores_edit'},
              {name:  $t('roles.form.ProductsTransportation'), key: 'stores_move_products'},
              {name:  $t('roles.form.addProducts'), key: 'stores_add_products'},
              {name:  $t('roles.form.withdrawProducts'), key: 'stores_remove_products'},
              {name:  $t('roles.form.delete'), key: 'stores_delete'},
            ]"
          />
         <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.products')"
            :icon="'inventory'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'products_show'},
              {name:  $t('roles.form.add'),    key: 'products_add'},
              {name:  $t('roles.form.edit'),   key: 'products_edit'},
              {name:  $t('roles.form.cost'),   key: 'products_cost'},
              {name:  $t('roles.form.delete'), key: 'products_delete'},
            ]"
          />
          
          <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.warehouseDeposit')"
          :icon="'boxes-alt'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'stores_deposits_show'},
            {name:  $t('roles.form.add'),    key: 'stores_deposits_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'stores_deposits_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'stores_deposits_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'stores_deposits_edit'},
            {name:  $t('roles.form.delete'), key: 'stores_deposits_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.stores_deposits_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.stores_deposits_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.storeWithdrawals')"
          :icon="'boxes-alt'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'stores_withdrawals_show'},
            {name:  $t('roles.form.add'),    key: 'stores_withdrawals_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'stores_withdrawals_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'stores_withdrawals_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'stores_withdrawals_edit'},
            {name:  $t('roles.form.delete'), key: 'stores_withdrawals_delete'},
          ]"
        />
        <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.stores_withdrawals_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.stores_withdrawals_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.warehouseTransfer')"
          :icon="'boxes-alt'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'stores_transfers_show'},
            {name:  $t('roles.form.add'),    key: 'stores_transfers_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'stores_transfers_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'stores_transfers_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'stores_transfers_edit'},
            {name:  $t('roles.form.delete'), key: 'stores_transfers_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.stores_transfers_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.stores_transfers_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
        :title="$t('roles.form.employees')"
        :icon="'user-cog'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'employees_show'},
          {name:  $t('roles.form.add'),    key: 'employees_add'},
          {name:  $t('roles.form.edit'),   key: 'employees_edit'},
          {name:  $t('roles.form.delete'), key: 'employees_delete'},
        ]"
      />
      <hr class="col-12" />
               <roleGroupInput 
                 :title="$t('roles.form.employeeSalaries')"
                 :icon="'user-chart'"
                 :values="[
                   {name:  $t('roles.form.view'),   key: 'employees_salaries_show'},
                   {name:  $t('roles.form.add'),    key: 'employees_salaries_add'},
                   {name:  $t('roles.form.SelectedWidth'),   key: 'employees_salaries_show_allow'},
                   {name:  $t('roles.form.ChangeOptions'),   key: 'employees_salaries_edit_item'},
                   {name:  $t('roles.form.edit'),   key: 'employees_salaries_edit'},
                   {name:  $t('roles.form.delete'), key: 'employees_salaries_delete'},
                 ]"
               />
               <hr class="col-12" />
               <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                 <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                 <div class="col-md-7">
                   <multiselect
                     v-model="item.employees_salaries_allow_status"
                     :options="[
                               { name: $t('invoices.draft'), id: 0 },
                               { name: $t('invoices.approved'), id: 1 },
 
                               ]"
                     :multiple="true"
                     :close-on-select="false"
                     :clear-on-select="false"
                     :preserve-search="true"
                     :placeholder="$t('roles.form.CasesAvailableForOrder')"
                     label="name"
                     track-by="id"
                     :hide-selected="true"
                   />
                 </div>
                </div>
                 <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                 <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                 <div class="col-md-7">
                   <multiselect
                     v-model="item.employees_salaries_show_status"
                     :options="[
                               { name: $t('invoices.draft'), id: 0 },
                               { name: $t('invoices.approved'), id: 1 },
                               ]"
                     :multiple="true"
                     :close-on-select="false"
                     :clear-on-select="false"
                     :preserve-search="true"
                     :placeholder="$t('roles.form.CasesPresentedToOrder')"
                     label="name"
                     track-by="id"
                     :hide-selected="true"
                   />
                 </div>
                </div>
                <hr class="col-12" />
               <roleGroupInput 
                 :title="$t('roles.form.employeeIncentives')"
                 :icon="'user-chart'"
                 :values="[
                   {name:  $t('roles.form.view'),   key: 'employees_incentives_show'},
                   {name:  $t('roles.form.add'),    key: 'employees_incentives_add'},
                   {name:  $t('roles.form.SelectedWidth'),   key: 'employees_incentives_show_allow'},
                   {name:  $t('roles.form.ChangeOptions'),   key: 'employees_incentives_edit_item'},
                   {name:  $t('roles.form.edit'),   key: 'employees_incentives_edit'},
                   {name:  $t('roles.form.delete'), key: 'employees_incentives_delete'},
                 ]"
               />
               <hr class="col-12" />
               <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                 <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                 <div class="col-md-7">
                   <multiselect
                     v-model="item.employees_incentives_allow_status"
                     :options="[
                               { name: $t('invoices.draft'), id: 0 },
                               { name: $t('invoices.approved'), id: 1 },
 
                               ]"
                     :multiple="true"
                     :close-on-select="false"
                     :clear-on-select="false"
                     :preserve-search="true"
                     :placeholder="$t('roles.form.CasesAvailableForOrder')"
                     label="name"
                     track-by="id"
                     :hide-selected="true"
                   />
                 </div>
                </div>
                 <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                 <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                 <div class="col-md-7">
                   <multiselect
                     v-model="item.employees_incentives_show_status"
                     :options="[
                               { name: $t('invoices.draft'), id: 0 },
                               { name: $t('invoices.approved'), id: 1 },
                               ]"
                     :multiple="true"
                     :close-on-select="false"
                     :clear-on-select="false"
                     :preserve-search="true"
                     :placeholder="$t('roles.form.CasesPresentedToOrder')"
                     label="name"
                     track-by="id"
                     :hide-selected="true"
                   />
                 </div>
                </div>
                <hr class="col-12" />
                <roleGroupInput 
                  :title="$t('roles.form.employeeDiscounts')"
                  :icon="'user-chart'"
                  :values="[
                    {name:  $t('roles.form.view'),   key: 'employees_deductions_show'},
                    {name:  $t('roles.form.add'),    key: 'employees_deductions_add'},
                    {name:  $t('roles.form.SelectedWidth'),   key: 'employees_deductions_show_allow'},
                    {name:  $t('roles.form.ChangeOptions'),   key: 'employees_deductions_edit_item'},
                    {name:  $t('roles.form.edit'),   key: 'employees_deductions_edit'},
                    {name:  $t('roles.form.delete'), key: 'employees_deductions_delete'},
                  ]"
                />
                <hr class="col-12" />
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                  <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                  <div class="col-md-7">
                    <multiselect
                      v-model="item.employees_deductions_allow_status"
                      :options="[
                                { name: $t('invoices.draft'), id: 0 },
                                { name: $t('invoices.approved'), id: 1 },
  
                                ]"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="$t('roles.form.CasesAvailableForOrder')"
                      label="name"
                      track-by="id"
                      :hide-selected="true"
                    />
                  </div>
                 </div>
                  <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                  <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                  <div class="col-md-7">
                    <multiselect
                      v-model="item.employees_deductions_show_status"
                      :options="[
                                { name: $t('invoices.draft'), id: 0 },
                                { name: $t('invoices.approved'), id: 1 },
                                ]"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="$t('roles.form.CasesPresentedToOrder')"
                      label="name"
                      track-by="id"
                      :hide-selected="true"
                    />
                  </div>
                 </div>
                 <hr class="col-12" />
                <roleGroupInput 
                  :title="$t('roles.form.staffDraws')"
                  :icon="'user-chart'"
                  :values="[
                    {name:  $t('roles.form.view'),   key: 'employees_withdrawals_show'},
                    {name:  $t('roles.form.add'),    key: 'employees_withdrawals_add'},
                    {name:  $t('roles.form.SelectedWidth'),   key: 'employees_withdrawals_show_allow'},
                    {name:  $t('roles.form.ChangeOptions'),   key: 'employees_withdrawals_edit_item'},
                    {name:  $t('roles.form.edit'),   key: 'employees_withdrawals_edit'},
                    {name:  $t('roles.form.delete'), key: 'employees_withdrawals_delete'},
                  ]"
                />
                <hr class="col-12" />
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                  <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                  <div class="col-md-7">
                    <multiselect
                      v-model="item.employees_withdrawals_allow_status"
                      :options="[
                                { name: $t('invoices.draft'), id: 0 },
                                { name: $t('invoices.approved'), id: 1 },
  
                                ]"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="$t('roles.form.CasesAvailableForOrder')"
                      label="name"
                      track-by="id"
                      :hide-selected="true"
                    />
                  </div>
                 </div>
                  <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                  <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                  <div class="col-md-7">
                    <multiselect
                      v-model="item.employees_withdrawals_show_status"
                      :options="[
                                { name: $t('invoices.draft'), id: 0 },
                                { name: $t('invoices.approved'), id: 1 },
                                ]"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :placeholder="$t('roles.form.CasesPresentedToOrder')"
                      label="name"
                      track-by="id"
                      :hide-selected="true"
                    />
                  </div>
                 </div>
                 <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.partners')"
            :icon="'handshake'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'partners_show'},
              {name:  $t('roles.form.add'),    key: 'partners_add'},
              {name:  $t('roles.form.edit'),   key: 'partners_edit'},
              {name:  $t('roles.form.delete'), key: 'partners_delete'},
            ]"
          />
          <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.partnersDeposit')"
          :icon="'handshake'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'partners_deposits_show'},
            {name:  $t('roles.form.add'),    key: 'partners_deposits_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'partners_deposits_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'partners_deposits_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'partners_deposits_edit'},
            {name:  $t('roles.form.delete'), key: 'partners_deposits_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.partners_deposits_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.partners_deposits_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.WithdrawalOfPartners')"
          :icon="'handshake'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'partners_withdrawals_show'},
            {name:  $t('roles.form.add'),    key: 'partners_withdrawals_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'partners_withdrawals_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'partners_withdrawals_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'partners_withdrawals_edit'},
            {name:  $t('roles.form.delete'), key: 'partners_withdrawals_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.partners_withdrawals_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.partners_withdrawals_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
         <roleGroupInput 
         :title="$t('roles.form.partnersProfits')"
         :icon="'handshake'"
         :values="[
           {name:  $t('roles.form.view'),   key: 'partners_profits_show'},
           {name:  $t('roles.form.add'),    key: 'partners_profits_add'},
           {name:  $t('roles.form.SelectedWidth'),   key: 'partners_profits_show_allow'},
           {name:  $t('roles.form.ChangeOptions'),   key: 'partners_profits_edit_item'},
           {name:  $t('roles.form.edit'),   key: 'partners_profits_edit'},
           {name:  $t('roles.form.delete'), key: 'partners_profits_delete'},
         ]"
       />
       <hr class="col-12" />
       <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
         <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
         <div class="col-md-7">
           <multiselect
             v-model="item.partners_profits_allow_status"
             :options="[
                       { name: $t('invoices.draft'), id: 0 },
                       { name: $t('invoices.approved'), id: 1 },

                       ]"
             :multiple="true"
             :close-on-select="false"
             :clear-on-select="false"
             :preserve-search="true"
             :placeholder="$t('roles.form.CasesAvailableForOrder')"
             label="name"
             track-by="id"
             :hide-selected="true"
           />
         </div>
        </div>
         <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
         <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
         <div class="col-md-7">
           <multiselect
             v-model="item.partners_profits_show_status"
             :options="[
                       { name: $t('invoices.draft'), id: 0 },
                       { name: $t('invoices.approved'), id: 1 },
                       ]"
             :multiple="true"
             :close-on-select="false"
             :clear-on-select="false"
             :preserve-search="true"
             :placeholder="$t('roles.form.CasesPresentedToOrder')"
             label="name"
             track-by="id"
             :hide-selected="true"
           />
         </div>
        </div>
        <hr class="col-12" />
        <roleGroupInput 
        :title="$t('roles.form.partnersSettlements')"
        :icon="'handshake'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'partners_settlements_show'},
          {name:  $t('roles.form.add'),    key: 'partners_settlements_add'},
          {name:  $t('roles.form.SelectedWidth'),   key: 'partners_settlements_show_allow'},
          {name:  $t('roles.form.ChangeOptions'),   key: 'partners_settlements_edit_item'},
          {name:  $t('roles.form.edit'),   key: 'partners_settlements_edit'},
          {name:  $t('roles.form.delete'), key: 'partners_settlements_delete'},
        ]"
      />
      <hr class="col-12" />
      <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.partners_settlements_allow_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },

                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesAvailableForOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.partners_settlements_show_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },
                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesPresentedToOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
       <hr class="col-12" />
        <roleGroupInput 
            :title="$t('roles.form.accounts')"
            :icon="'coins'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'accounts_show'},
              {name:  $t('roles.form.add'),    key: 'accounts_add'},
              {name:  $t('roles.form.edit'),   key: 'accounts_edit'},
              {name:  $t('roles.form.delete'), key: 'accounts_delete'},
            ]"
          />
          <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.depositAccounts')"
          :icon="'hand-holding-usd'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'accounts_deposits_show'},
            {name:  $t('roles.form.add'),    key: 'accounts_deposits_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'accounts_deposits_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'accounts_deposits_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'accounts_deposits_edit'},
            {name:  $t('roles.form.delete'), key: 'accounts_deposits_delete'},
          ]"
        />
        <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.accounts_deposits_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.accounts_deposits_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.accountWithdrawals')"
          :icon="'hand-holding-usd'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'accounts_withdrawals_show'},
            {name:  $t('roles.form.add'),    key: 'accounts_withdrawals_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'accounts_withdrawals_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'accounts_withdrawals_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'accounts_withdrawals_edit'},
            {name:  $t('roles.form.delete'), key: 'accounts_withdrawals_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.accounts_withdrawals_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.accounts_withdrawals_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <roleGroupInput 
            :title="$t('roles.form.Projects')"
            :icon="'chart-line'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'projects_show'},
              {name:  $t('roles.form.add'),    key: 'projects_add'},
              {name:  $t('roles.form.edit'),   key: 'projects_edit'},
              {name:  $t('roles.form.delete'), key: 'projects_delete'},
            ]"
          /><hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.projectsDeposit')"
          :icon="'chart-line'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'projects_deposits_show'},
            {name:  $t('roles.form.add'),    key: 'projects_deposits_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'projects_deposits_show_allow'},
            {name:  $t('roles.form.ChangeOptions'),   key: 'projects_deposits_edit_item'},
            {name:  $t('roles.form.edit'),   key: 'projects_deposits_edit'},
            {name:  $t('roles.form.delete'), key: 'projects_deposits_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.projects_deposits_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.projects_deposits_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
         <hr class="col-12" />
         <roleGroupInput 
         :title="$t('roles.form.ProjectWithdrawal')"
         :icon="'chart-line'"
         :values="[
           {name:  $t('roles.form.view'),   key: 'projects_withdrawals_show'},
           {name:  $t('roles.form.add'),    key: 'projects_withdrawals_add'},
           {name:  $t('roles.form.SelectedWidth'),   key: 'projects_withdrawals_show_allow'},
           {name:  $t('roles.form.ChangeOptions'),   key: 'projects_withdrawals_edit_item'},
           {name:  $t('roles.form.edit'),   key: 'projects_withdrawals_edit'},
           {name:  $t('roles.form.delete'), key: 'projects_withdrawals_delete'},
         ]"
       />
       <hr class="col-12" />
       <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
         <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
         <div class="col-md-7">
           <multiselect
             v-model="item.projects_withdrawals_allow_status"
             :options="[
                       { name: $t('invoices.draft'), id: 0 },
                       { name: $t('invoices.approved'), id: 1 },

                       ]"
             :multiple="true"
             :close-on-select="false"
             :clear-on-select="false"
             :preserve-search="true"
             :placeholder="$t('roles.form.CasesAvailableForOrder')"
             label="name"
             track-by="id"
             :hide-selected="true"
           />
         </div>
        </div>
         <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
         <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
         <div class="col-md-7">
           <multiselect
             v-model="item.projects_withdrawals_show_status"
             :options="[
                       { name: $t('invoices.draft'), id: 0 },
                       { name: $t('invoices.approved'), id: 1 },
                       ]"
             :multiple="true"
             :close-on-select="false"
             :clear-on-select="false"
             :preserve-search="true"
             :placeholder="$t('roles.form.CasesPresentedToOrder')"
             label="name"
             track-by="id"
             :hide-selected="true"
           />
         </div>
        </div>
        <hr class="col-12" />
        <roleGroupInput 
        :title="$t('roles.form.TransferProjects')"
        :icon="'chart-line'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'projects_transfers_show'},
          {name:  $t('roles.form.add'),    key: 'projects_transfers_add'},
          {name:  $t('roles.form.SelectedWidth'),   key: 'projects_transfers_show_allow'},
          {name:  $t('roles.form.ChangeOptions'),   key: 'projects_transfers_edit_item'},
          {name:  $t('roles.form.edit'),   key: 'projects_transfers_edit'},
          {name:  $t('roles.form.delete'), key: 'projects_transfers_delete'},
        ]"
      />
      <hr class="col-12" />
      <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.projects_transfers_allow_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },

                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesAvailableForOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.projects_transfers_show_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },
                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesPresentedToOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
       <hr class="col-12" />
       <roleGroupInput 
       :title="$t('roles.form.Subscriptions')"
       :icon="'history'"
       :values="[
         {name:  $t('roles.form.view'),   key: 'subscriptions_show'},
         {name:  $t('roles.form.add'),    key: 'subscriptions_add'},
         {name:  $t('roles.form.edit'),   key: 'subscriptions_edit'},
         {name:  $t('roles.form.delete'), key: 'subscriptions_delete'},
       ]"
     />
     <hr class="col-12" />
      <roleGroupInput 
        :title="$t('roles.form.subscriptionsOperations')"
        :icon="'stopwatch'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'subscriptions_operations_show'},
          {name:  $t('roles.form.add'),    key: 'subscriptions_operations_add'},
          {name:  $t('roles.form.edit'),   key: 'subscriptions_operations_edit'},
          {name:  $t('roles.form.delete'), key: 'subscriptions_operations_delete'},
        ]"
      />
      <hr class="col-12" />
               <roleGroupInput 
                     :title="$t('roles.form.salesCheques')"
                     :icon="'money-check-alt'"
                     :values="[
                       {name:  $t('roles.form.view'),   key: 'sales_cheques_show'},
                       {name:  $t('roles.form.add'),    key: 'sales_cheques_add'},
                       {name:  $t('roles.form.SelectedWidth'),   key: 'sales_cheques_show_allow'},
                       {name:  $t('roles.form.ChangeOptions'),   key: '.sales_cheques_edit_item'},
                       {name:  $t('roles.form.edit'),   key: 'sales_cheques_edit'},
                       {name:  $t('roles.form.delete'), key: 'sales_cheques_delete'},
                     ]"
                   />
                   <hr class="col-12" />
                   <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.sales_cheques_allow_status"
                         :options="[
                                   { name: $t('invoices.draft'), id: 0 },
                                   { name: $t('invoices.approved'), id: 1 },
     
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesAvailableForOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                     <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.sales_cheques_show_status"
                         :options="[
                                   { name: $t('invoices.draft'), id: 0 },
                                   { name: $t('invoices.approved'), id: 1 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesPresentedToOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                    <hr class="col-12" />
          <roleGroupInput 
                :title="$t('roles.form.purchaseCheques')"
                :icon="'money-check-alt'"
                :values="[
                  {name:  $t('roles.form.view'),   key: 'purchase_cheques_show'},
                  {name:  $t('roles.form.add'),    key: 'purchase_cheques_add'},
                  {name:  $t('roles.form.SelectedWidth'),   key: 'purchase_cheques_show_allow'},
                  {name:  $t('roles.form.ChangeOptions'),   key: 'purchase_cheques_edit_item'},
                  {name:  $t('roles.form.edit'),   key: 'purchase_cheques_edit'},
                  {name:  $t('roles.form.delete'), key: 'purchase_cheques_delete'},
                ]"
              />
              <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_cheques_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.purchase_cheques_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
               <hr class="col-12" />
               <roleGroupInput 
               :title="$t('roles.form.salesDiscounts')"
               :icon="'badge-percent'"
               :values="[
                 {name:  $t('roles.form.view'),   key: 'sales_discounts_show'},
                 {name:  $t('roles.form.add'),    key: 'sales_discounts_add'},
                 {name:  $t('roles.form.SelectedWidth'),   key: 'sales_discounts_show_allow'},
                 {name:  $t('roles.form.ChangeOptions'),   key: 'sales_discounts_edit_item'},
                 {name:  $t('roles.form.edit'),   key: 'sales_discounts_edit'},
                 {name:  $t('roles.form.delete'), key: 'sales_discounts_delete'},
               ]"
             />
             <hr class="col-12" />
                   <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.sales_discounts_allow_status"
                         :options="[
                                   { name: $t('invoices.draft'), id: 0 },
                                   { name: $t('invoices.approved'), id: 1 },
     
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesAvailableForOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                     <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                     <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                     <div class="col-md-7">
                       <multiselect
                         v-model="item.sales_discounts_show_status"
                         :options="[
                                   { name: $t('invoices.draft'), id: 0 },
                                   { name: $t('invoices.approved'), id: 1 },
                                   ]"
                         :multiple="true"
                         :close-on-select="false"
                         :clear-on-select="false"
                         :preserve-search="true"
                         :placeholder="$t('roles.form.CasesPresentedToOrder')"
                         label="name"
                         track-by="id"
                         :hide-selected="true"
                       />
                     </div>
                    </div>
                    <hr class="col-12" />
                    <roleGroupInput 
                    :title="$t('roles.form.purchaseDiscounts')"
                    :icon="'badge-percent'"
                    :values="[
                      {name:  $t('roles.form.view'),   key: 'purchase_discounts_show'},
                      {name:  $t('roles.form.add'),    key: 'purchase_discounts_add'},
                      {name:  $t('roles.form.SelectedWidth'),   key: 'purchase_discounts_show_allow'},
                      {name:  $t('roles.form.ChangeOptions'),   key: 'purchase_discounts_edit_item'},
                      {name:  $t('roles.form.edit'),   key: 'purchase_discounts_edit'},
                      {name:  $t('roles.form.delete'), key: 'purchase_discounts_delete'},
                    ]"
                  />
                  <hr class="col-12" />
                  <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                    <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                    <div class="col-md-7">
                      <multiselect
                        v-model="item.purchase_discounts_allow_status"
                        :options="[
                                  { name: $t('invoices.draft'), id: 0 },
                                  { name: $t('invoices.approved'), id: 1 },
     
                                  ]"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :placeholder="$t('roles.form.CasesAvailableForOrder')"
                        label="name"
                        track-by="id"
                        :hide-selected="true"
                      />
                    </div>
                   </div>
                    <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                    <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                    <div class="col-md-7">
                      <multiselect
                        v-model="item.purchase_discounts_show_status"
                        :options="[
                                  { name: $t('invoices.draft'), id: 0 },
                                  { name: $t('invoices.approved'), id: 1 },
                                  ]"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :placeholder="$t('roles.form.CasesPresentedToOrder')"
                        label="name"
                        track-by="id"
                        :hide-selected="true"
                      />
                    </div>
                   </div>
                   <hr class="col-12" />
          <roleGroupInput 
          :title="$t('roles.form.ManufacturingProcesses')"
          :icon="'industry-alt'"
          :values="[
            {name:  $t('roles.form.view'),   key: 'manufacturing_processes_show'},
            {name:  $t('roles.form.add'),    key: 'manufacturing_processes_add'},
            {name:  $t('roles.form.SelectedWidth'),   key: 'manufacturing_processes_show_allow'},
            {name:  $t('roles.form.edit'),   key: 'manufacturing_processes_edit'},
            {name:  $t('roles.form.delete'), key: 'manufacturing_processes_delete'},
          ]"
        />
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.manufacturing_processes_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.manufacturing_processes_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          
          <hr class="col-12" />
          <roleGroupInput 
        :title="$t('roles.form.manufacturingModels')"
        :icon="'hammer'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'manufacturing_models_show'},
          {name:  $t('roles.form.add'),    key: 'manufacturing_models_add'},
          {name:  $t('roles.form.SelectedWidth'),   key: 'manufacturing_models_show_allow'},
          {name:  $t('roles.form.ChangeOptions'),   key: 'manufacturing_models_edit_item'},
          {name:  $t('roles.form.edit'),   key: 'manufacturing_models_edit'},
          {name:  $t('roles.form.delete'), key: 'manufacturing_models_delete'},
        ]"
      />
      <hr class="col-12" />
      <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.manufacturing_models_allow_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },

                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesAvailableForOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
        <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
        <div class="col-md-7">
          <multiselect
            v-model="item.manufacturing_models_show_status"
            :options="[
                      { name: $t('invoices.draft'), id: 0 },
                      { name: $t('invoices.approved'), id: 1 },
                      ]"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="$t('roles.form.CasesPresentedToOrder')"
            label="name"
            track-by="id"
            :hide-selected="true"
          />
        </div>
       </div>
       <hr class="col-12" />
          <roleGroupInput 
        :title="$t('roles.form.transferAccounts')"
        :icon="'random'"
        :values="[
          {name:  $t('roles.form.view'),   key: 'accounts_transfers_show'},
          {name:  $t('roles.form.add'),    key: 'accounts_transfers_add'},
          {name:  $t('roles.form.edit'),   key: 'accounts_transfers_edit'},
          {name:  $t('roles.form.delete'), key: 'accounts_transfers_delete'},
        ]"
      />
       <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.operationList')"
            :icon="'hammer'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'manufacturing_operations_show'},
              {name:  $t('roles.form.add'),    key: 'manufacturing_operations_add'},
              {name:  $t('roles.form.SelectedWidth'),   key: 'manufacturing_operations_show_allow'},
              {name:  $t('roles.form.ChangeOptions'),   key: 'manufacturing_operations_edit_item'},
              {name:  $t('roles.form.edit'),   key: 'manufacturing_operations_edit'},
              {name:  $t('roles.form.delete'), key: 'manufacturing_operations_delete'},
            ]"
          />
          <hr class="col-12" />
              <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.manufacturing_operations_allow_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },

                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesAvailableForOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
                <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
                <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
                <div class="col-md-7">
                  <multiselect
                    v-model="item.manufacturing_operations_show_status"
                    :options="[
                              { name: $t('invoices.draft'), id: 0 },
                              { name: $t('invoices.approved'), id: 1 },
                              ]"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :placeholder="$t('roles.form.CasesPresentedToOrder')"
                    label="name"
                    track-by="id"
                    :hide-selected="true"
                  />
                </div>
               </div>
              
          <hr class="col-12" />
          <roleGroupInput 
            :title="$t('roles.form.capitals')"
            :icon="'archway'"
            :values="[
              {name:  $t('roles.form.view'),   key: 'capitals_show'},
              {name:  $t('roles.form.add'),    key: 'capitals_add'},
              {name:  $t('roles.form.edit'),   key: 'capitals_edit'},
              {name:  $t('roles.form.delete'), key: 'capitals_delete'},
            ]"
          />  
        <hr class="col-12" />
        <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.AvailableCases')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.expenses_allow_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },

                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesAvailableForOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
          <label class="col-md-4">{{$t('roles.form.TheCasesShown')}}</label>
          <div class="col-md-7">
            <multiselect
              v-model="item.expenses_show_status"
              :options="[
                        { name: $t('invoices.draft'), id: 0 },
                        { name: $t('invoices.approved'), id: 1 },
                        ]"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('roles.form.CasesPresentedToOrder')"
              label="name"
              track-by="id"
              :hide-selected="true"
            />
          </div>
         </div>
          
          
          <hr class="col-12" />
          <roleGroupInput 
                  :title="$t('roles.form.pointsOfSale')"
                  :icon="'cash-register'"
                  :values="[
                    {name:  $t('roles.form.view'),   key: 'point_of_sales_show'},
                    {name:  $t('roles.form.add'),    key: 'point_of_sales_add'},
                    {name:  $t('roles.form.SelectedWidth'),   key: 'point_of_sales_show_allow'},
                    {name:  $t('roles.form.BalanceView'),   key: 'point_of_sales_show_balance'},
                    {name:  $t('roles.form.edit'),   key: 'point_of_sales_edit'},
                    {name:  $t('roles.form.delete'), key: 'point_of_sales_delete'},
                  ]"
                />
          <roleGroupInput 
                  :title="$t('roles.form.Staff')"
                  :icon="'user-chart'"
                  :values="[
                    {name:  $t('roles.form.view'),   key: 'staff_show'},
                    {name:  $t('roles.form.add'),    key: 'staff_add'},
                    {name:  $t('roles.form.edit'),   key: 'staff_edit'},
                    {name:  $t('roles.form.delete'), key: 'staff_delete'},
                  ]"
                />
                <roleGroupInput 
                :title="$t('roles.form.endorsements')"
                :icon="'file-signature'"
                :values="[
                  {name:  $t('roles.form.view'),   key: 'endorsements_show'},
                  {name:  $t('roles.form.SelectedWidth'),   key: 'endorsements_show_allow'},
                  {name:  $t('roles.form.add'),    key: 'endorsements_add'},
                  {name:  $t('roles.form.edit'),   key: 'endorsements_edit'},
                  {name:  $t('roles.form.delete'), key: 'endorsements_delete'},
                ]"
              />
              <roleGroupInput 
              :title="$t('roles.form.deposits')"
              :icon="'wallet'"
              :values="[
                {name:  $t('roles.form.view'),   key: 'deposits_show'},
                {name:  $t('roles.form.SelectedWidth'),   key: 'deposits_show_allow'},
                {name:  $t('roles.form.add'),    key: 'deposits_add'},
                {name:  $t('roles.form.edit'),   key: 'deposits_edit'},
                {name:  $t('roles.form.delete'), key: 'edeposits_delete'},
              ]"
            />

          <hr class="mt-5 mb-5 col-12" />
          <small class="form-text text-muted mb-4 col-12">{{
            $t('roles.form.iNFORMATION')
          }}</small>

          <div class="col-12">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="reports_show" class="bg-check-label">
                  <i class="far fa-user-chart"></i>
                  {{ $t('roles.form.reports') }} :
                </label>
                <input
                  type="checkbox"
                  id="reports_show"
                  v-model="item.reports_show"
                  class="custom-control-input"
                  value="1"
                />
                <label for="reports_show" class="custom-control-label"></label>
              </div>
            </label>
          </div>

          <div class="col-12" v-if="item.reports_show">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="reports_show" class="bg-check-label">
                  <i class="far fa-user-chart"></i>
                  {{$t('roles.form.ShowSelectedReports')}} :
                </label>
                <input
                  type="checkbox"
                  id="reports_show_allow"
                  v-model="item.reports_show_allow"
                  class="custom-control-input"
                  value="1"
                />
                <label for="reports_show_allow" class="custom-control-label"></label>
              </div>
            </label>
          </div>

          <div class="col-12" v-if="item.reports_show">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="reports_earning_show" class="bg-check-label">
                  <i class="far fa-user-chart"></i>
                 {{$t('roles.form.ViewEarningsInReports')}} :
                </label>
                <input
                  type="checkbox"
                  id="reports_earning_show"
                  v-model="item.reports_earning_show"
                  class="custom-control-input"
                  value="1"
                />
                <label
                  for="reports_earning_show"
                  class="custom-control-label"
                ></label>
              </div>
            </label>
          </div>


          <div class="col-12">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="accounting_show" class="bg-check-label">
                  <i class="far fa-balance-scale"></i>
                  {{$t('roles.form.Accounting')}} :
                </label>
                <input
                  type="checkbox"
                  id="accounting_show"
                  v-model="item.accounting_show"
                  class="custom-control-input"
                  value="1"
                />
                <label for="accounting_show" class="custom-control-label"></label>
              </div>
            </label>
          </div>



          <div class="col-12">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="options_show" class="bg-check-label">
                  <i class="far fa-cog"></i> {{$t('roles.form.Settings')}}:
                </label>
                <input
                  type="checkbox"
                  id="options_show"
                  v-model="item.options_show"
                  class="custom-control-input"
                  value="1"
                />
                <label for="options_show" class="custom-control-label"></label>
              </div>
            </label>
          </div>

          <div class="col-12">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="profile_edit" class="bg-check-label">
                  <i class="far fa-cog"></i>{{$t('roles.form.UserSettings')}}:
                </label>
                <input
                  type="checkbox"
                  id="profile_edit"
                  v-model="item.profile_edit"
                  class="custom-control-input"
                  value="1"
                />
                <label for="profile_edit" class="custom-control-label"></label>
              </div>
            </label>
          </div>
          <div class="col-12">
            <label class="mb-3">
              <div class="custom-control custom-switch">
                <label for="buckup_allow" class="bg-check-label">
                  <i class="far fa-database"></i>
                 {{$t('roles.form.buckupAllow')}} :
                </label>
                <input
                  type="checkbox"
                  id="buckup_allow"
                  v-model="item.buckup_allow"
                  class="custom-control-input"
                  value="1"
                />
                <label
                  for="buckup_allow"
                  class="custom-control-label"
                ></label>
              </div>
            </label>
          </div>

          <div class="form-group col-md-6 row" v-if="item.reports_show">
            <label class="col-md-4">{{$t('roles.form.FrontReports')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_reports"
                :options="reports"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('roles.form.ChooseTheRequiredReportsInTheInterface')"
                label="name"
                track-by="link"
                :hide-selected="true"
              ></multiselect>
            </div>
          </div>


          <div class="form-group col-md-6 row" v-if="item.reports_show">
            <label class="col-md-4">{{$t('roles.form.AvailableReports')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.available_reports"
                :options="allowReports"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('roles.form.ChooseTheAvailableReports')"
                label="name"
                track-by="id"
                :hide-selected="true"
              />
            </div>
          </div>


          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('roles.form.ExhibitsInTheFacade')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_elements"
                :options="elements"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('roles.form.ChooseDisplaysInTheInterface')"
                label="name"
                track-by="id"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{
              $t("roles.form.mainActions")
            }}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.main_actions"
                :options="actions"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('roles.form.ChooseActionsInTheInterface')"
                label="name"
                track-by="link"
                :hide-selected="true"
              />
            </div>
          </div>

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'rolesCreate' && !$parent.stopEdit"
          >
            {{ $t('roles.form.createRole') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'rolesEdit' && !$parent.stopEdit"
          >
            {{ $t('roles.form.editRole') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import roleGroupInput from "@/elements/add/form/roleGroupInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/roles",
      item: {
        customers_show: "",
        main_actions: [],
      },
      errors: {
        name: false,
      },
      reports: [
        { name: this.$t('roles.form.Overview'), link: "overview" },
        { name: this.$t('roles.form.totalReport'), link: "totalReport" },

        { name: this.$t('roles.form.TotalCustomerAccount'), link: "customersTotalAccounts" },
        { name: this.$t('roles.form.CustomerAccountDetails'), link: "customersDetailsAccounts" },
        { name: this.$t('roles.form.RemainingBalanceForCustomers'), link: "customersBalance" },
        { name: this.$t('roles.form.CustomerGuide'), link: "customersGuide" },

        { name: this.$t('roles.form.TotalSupplierAccount'), link: "suppliersTotalAccounts" },
        { name: this.$t('roles.form.VendorAccountDetails'), link: "suppliersDetailsAccounts" },
        { name: this.$t('roles.form.RemainingBalanceForSuppliers'), link: "suppliersBalance" },
        { name: this.$t('roles.form.SupplierDirectory'), link: "suppliersGuide" },

        { name: this.$t('roles.form.PartnerIsTotalAccount'), link: "partnersTotalAccounts" },
        { name: this.$t('roles.form.PartnerAccountDetails'), link: "partnersDetailsAccounts" },
        { name: this.$t('roles.form.TheRemainingBalanceOfThePartners'), link: "partnersBalance" },
        { name: this.$t('roles.form.AGuideForPartners'), link: "partnersGuide" },

        { name: this.$t('roles.form.totalProjectAccount'), link: "projectsTotalAccounts" },
        { name: this.$t('roles.form.ProjectAccountDetails'), link: "projectsDetailsAccounts" },
        { name: this.$t('roles.form.ProjectAssets'), link: "projectsBalance" },
        { name: this.$t('roles.form.AGeneralGlimpseOfTheProject'), link: "partnersGuide" },

        { name: this.$t('roles.form.TreasuryStatement'), link: "safesAccounts" },
        { name: this.$t('roles.form.SafeBalances'), link: "safersBalance" },

        { name: this.$t('roles.form.InventoryOfStores'), link: "warehouseInventory" },
        { name: this.$t('roles.form.TheValueOfProducts'), link: "ProductsValue" },

        { name: this.$t('roles.form.SalesByInvoice'), link: "salesByInvoice" },
        { name: this.$t('roles.form.SalesByProduct'), link: "salesByItem" },

        { name: this.$t('roles.form.PurchasesByInvoice'), link: "purchasesByBill" },
        { name: this.$t('roles.form.PurchasesByProduct'), link: "purchasesByItem" },

        { name: this.$t('roles.form.ReturnedByInvoice'), link: "salesReturnsByInvoice" },
        { name: this.$t('roles.form.ReturnedByProduct'), link: "salesReturnsByItem" },

        { name: this.$t('roles.form.PurchaseReturnsOnInvoice'), link: "purchasesReturnsByBill" },
        { name: this.$t('roles.form.ReturnsPurchaseByProduct'), link: "purchasesReturnsByItem" },

        { name: this.$t('roles.form.InvoiceRequests'), link: "purchasesReturnsByBill" },
        { name: this.$t('roles.form.OrdersByProduct'), link: "purchasesReturnsByItem" },

        { name: this.$t('roles.form.InvoicePurchaseOrders'), link: "purchasesOrdersByBill" },
        { name: this.$t('roles.form.PurchaseOrdersByProduct'), link: "purchasesOrdersByItem" },

        { name: this.$t('roles.form.RecordSalesPayments'), link: "paymentHistory" },
        { name: this.$t('roles.form.RecordPurchasePayments'), link: "purchasePaymentHistory" },

        { name: this.$t('roles.form.RegisterSalesCheques'), link: "chequesHistory" },
        { name: this.$t('roles.form.CheckInRecord'), link: "purchaseChequesHistory" },

        { name: this.$t('roles.form.RecordSalesDiscounts'), link: "discountsHistory" },
        { name: this.$t('roles.form.RecordPurchaseDiscounts'), link: "purchaseDiscountsHistory" },


        { name: this.$t('roles.form.InvoicingProjects'), link: "projectsDepositsByInvoice" },
        { name: this.$t('roles.form.ProductDepositProcesses'), link: "projectsDepositsByItem" },

        { name: this.$t('roles.form.InvoiceProjectWithdrawals'), link: "projectsWithdrawalsByBill" },
        { name: this.$t('roles.form.ProductRecalls'), link: "projectsWithdrawalsByItem" },

        { name: this.$t('roles.form.InvoiceProjectTransfers'), link: "projectsTransfersByInvoice" },
        { name: this.$t('roles.form.ProjectTransfersByProduct'), link: "projectsTransfersByItem" },

        
        { name: this.$t('roles.form.ExpensesList'), link: "expenseHistory" },
        { name: this.$t('roles.form.ExpensesByClassification'), link: "expenseByCategory" },

        { name: this.$t('roles.form.EmployeeAccountStatement'), link: "employeeAccountStatement" },

      ],
      allowReports: [
        { id: "0", name: this.$t('roles.form.Overview'), link: "overview" },
        { id: "52", name: this.$t('roles.form.totalReport'), link: "totalReport" },
        
        { id: "1", name: this.$t('roles.form.TotalCustomerAccount'), link: "customersTotalAccounts" },
        { id: "2", name: this.$t('roles.form.CustomerAccountDetails'), link: "customersDetailsAccounts" },
        { id: "3", name: this.$t('roles.form.RemainingBalanceForCustomers'), link: "customersBalance" },
        { id: "4", name: this.$t('roles.form.CustomerGuide'), link: "customersGuide" },

        { id: "5", name: this.$t('roles.form.TotalSupplierAccount'), link: "suppliersTotalAccounts" },
        { id: "6", name: this.$t('roles.form.VendorAccountDetails'), link: "suppliersDetailsAccounts" },
        { id: "7", name: this.$t('roles.form.RemainingBalanceForSuppliers'), link: "suppliersBalance" },
        { id: "8", name: this.$t('roles.form.SupplierDirectory'), link: "suppliersGuide" },

        { id: "9", name: this.$t('roles.form.TreasuryStatement'), link: "safesAccounts" },
        { id: "10", name: this.$t('roles.form.SafeBalances'), link: "safersBalance" },

        { id: "11", name: this.$t('roles.form.InventoryOfStores'), link: "warehouseInventory" },
        { id: "12", name: this.$t('roles.form.TheValueOfProducts'), link: "ProductsValue" },

        { id: "13", name: this.$t('roles.form.SalesByInvoice'), link: "salesByInvoice" },
        { id: "14", name: this.$t('roles.form.SalesByProduct'), link: "salesByItem" },

        { id: "15", name: this.$t('roles.form.PurchasesByInvoice'), link: "purchasesByBill" },
        { id: "16", name: this.$t('roles.form.PurchasesByProduct'), link: "purchasesByItem" },

        { id: "17", name: this.$t('roles.form.ReturnedByInvoice'), link: "salesReturnsByInvoice" },
        { id: "18", name: this.$t('roles.form.ReturnedByProduct'), link: "salesReturnsByItem" },

        { id: "19", name: this.$t('roles.form.PurchaseReturnsOnInvoice'), link: "purchasesReturnsByBill" },
        { id: "20", name: this.$t('roles.form.ReturnsPurchaseByProduct'), link: "purchasesReturnsByItem" },

        { id: "21", name: this.$t('roles.form.InvoiceRequests'), link: "purchasesReturnsByBill" },
        { id: "22", name: this.$t('roles.form.OrdersByProduct'), link: "purchasesReturnsByItem" },

        { id: "23", name: this.$t('roles.form.InvoicePurchaseOrders'), link: "purchasesOrdersByBill" },
        { id: "24", name: this.$t('roles.form.PurchaseOrdersByProduct'), link: "purchasesOrdersByItem" },


        { id: "25", name: this.$t('roles.form.RecordSalesPayments'), link: "paymentHistory" },
        { id: "26", name: this.$t('roles.form.RecordPurchasePayments'), link: "purchasePaymentHistory" },

        { id: "27", name: this.$t('roles.form.RegisterSalesCheques'), link: "chequesHistory" },
        { id: "28", name: this.$t('roles.form.CheckInRecord') , link: "purchaseChequesHistory" },

        { id: "29", name: this.$t('roles.form.RecordSalesDiscounts') , link: "discountsHistory" },
        { id: "30", name: this.$t('roles.form.RecordPurchaseDiscounts') , link: "purchaseDiscountsHistory" },

        { id: "31", name: this.$t('roles.form.ExpensesList') , link: "expenseHistory" },
        { id: "32", name:this.$t('roles.form.ExpensesByClassification') , link: "expenseByCategory" },

        { id: "33", name: this.$t('roles.form.EmployeeAccountStatement') , link: "employeeAccountStatement" },

        { id: "34", name: this.$t('roles.form.PartnerIsTotalAccount') , link: "partnersTotalAccounts" },
        { id: "35", name: this.$t('roles.form.PartnerAccountDetails') , link: "partnersDetailsAccounts" },
        { id: "36", name: this.$t('roles.form.TheRemainingBalanceOfThePartners'), link: "partnersBalance" },
        { id: "37", name: this.$t('roles.form.AGuideForPartners'), link: "partnersGuide" },

        { id: "38", name: this.$t('roles.form.totalProjectAccount'), link: "projectsTotalAccounts" },
        { id: "39", name: this.$t('roles.form.ProjectAccountDetails'), link: "projectsDetailsAccounts" },
        { id: "40", name: this.$t('roles.form.ProjectAssets'), link: "projectsBalance" },
        { id: "41", name: this.$t('roles.form.AGeneralGlimpseOfTheProject'), link: "partnersGuide" },
        { id: "42", name: this.$t('roles.form.InvoicingProjects'), link: "projectsDepositsByInvoice" },
        { id: "43", name: this.$t('roles.form.ProductDepositProcesses'), link: "projectsDepositsByItem" },

        { id: "44", name: this.$t('roles.form.InvoiceProjectWithdrawals'), link: "projectsWithdrawalsByBill" },
        { id: "45", name: this.$t('roles.form.ProductRecalls'), link: "projectsWithdrawalsByItem" },

        { id: "46", name: this.$t('roles.form.InvoiceProjectTransfers') , link: "projectsTransfersByInvoice" },
        { id: "47", name: this.$t('roles.form.ProjectTransfersByProduct'), link: "projectsTransfersByItem" },


        
      ],
      elements: [
        { id: "1", name: this.$t('roles.form.BillingVsPayment') },
        { id: "2", name: this.$t('roles.form.ProfitAndLoss') },
        { id: "3", name: this.$t('roles.form.StoreAlerts') },
        { id: "4", name: this.$t('roles.form.AnOverviewOfTheOffers') },
        { id: "5", name: this.$t('roles.form.RecentOffers') },
        { id: "6", name: this.$t('roles.form.UnpaidBills') },
        { id: "7", name: this.$t('roles.form.RecentDemandBonds') },

        { id: "8", name: this.$t('roles.form.UrgentActions') },
        { id: "9", name: this.$t('roles.form.HighestExpensesByCategory') },
        { id: "10", name: this.$t('roles.form.MostActiveCustomers') },
        { id: "11", name: this.$t('roles.form.BillingOverview') },
        { id: "12", name: this.$t('roles.form.RecentBills') },
        { id: "13", name: this.$t('roles.form.AnOverviewOfTheDemandBonds') },
        { id: "14", name: this.$t('roles.form.CustomerBalanceAlert') },
      ],
      actions: [
        {
          name: this.$t("companies.form.addCustomer"),
          link: "/customers/create",
          icon: "user-alt"
        },
        {
          name: this.$t("companies.form.addSupplier"),
          link: "/suppliers/create",
          icon: "user-tie"
        },
        {
          name: this.$t("companies.form.addPartner"),
          link: "/partners/create",
          icon: "handshake"
        },
        {
          name: this.$t("companies.form.addAccount"),
          link: "/accounts/create",
          icon: "coins"
        },
        {
          name: this.$t("companies.form.addProject"),
          link: "/projects/create",
          icon: "chart-line"
        },
        {
          name: this.$t("companies.form.addSafe"),
          link: "/safes/create",
          icon: "treasure-chest"
        },
        {
          name: this.$t("companies.form.addBanckAccount"),
          link: "/bankAccounts/create",
          icon: "university"
        },
        {
          name: this.$t("companies.form.addCapital"),
          link: "/capitals/create",
          icon: "archway"
        },
        {
          name: this.$t("companies.form.addStore"),
          link: "/stores/create",
          icon: "store"
        },
        {
          name: this.$t("companies.form.addProduct"),
          link: "/products/create",
          icon: "store-alt"
        },
        {
          name: this.$t("companies.form.addMatrial"),
          link: "/matrials/create",
          icon: "store-alt"
        },
        {
          name: this.$t("companies.form.addSubscription"),
          link: "/subscriptions/create",
          icon: "history"
        },
        {
          name: this.$t("companies.form.addEmployee"),
          link: "/employees/create",
          icon: "user-cog"
        },
        {
          name: this.$t("companies.form.addQuotation"),
          link: "/quotations/create",
          icon: "user-cog"
        },
        {
          name: this.$t("companies.form.addsubscriptionsOperation"),
          link: "/subscriptionsOperations/create",
          icon: "stopwatch"
        },
        {
          name: this.$t("companies.form.addInvoice"),
          link: "/invoices/create",
          icon: "file-invoice-dollar"
        },
        {
          name: this.$t("companies.form.addBill"),
          link: "/bills/create",
          icon: "file-invoice-dollar"
        },
        {
          name: this.$t("companies.form.addSaleReturn"),
          link: "/saleReturns/create",
          icon: "exchange"
        },
        {
          name: this.$t("companies.form.addpurchaseReturn"),
          link: "/purchaseReturns/create",
          icon: "exchange"
        },{
          name: this.$t("companies.form.addorder"),
          link: "/orders/create",
          icon: "briefcase"
        },
        {
          name: this.$t("companies.form.addpurchaseOrder"),
          link: "/purchaseOrders/create",
          icon: "briefcase"
        },
        {
          name: this.$t("companies.form.addSalesPayment"),
          link: "/salesPayments/create",
          icon: "credit-card-front"
        },
        {
          name: this.$t("companies.form.addPurchasePayment"),
          link: "/purchasePayments/create",
          icon: "credit-card-front"
        },
        {
          name: this.$t("companies.form.addSalesCheque"),
          link: "/salesCheques/create",
          icon: "money-check-alt"
        },
        {
          name: this.$t("companies.form.addPurchaseCheque"),
          link: "/purchaseCheques/create",
          icon: "money-check-alt"
        },
        {
          name: this.$t("companies.form.addSalesDiscount"),
          link: "/salesDiscounts/create",
          icon: "badge-percent"
        },
        {
          name: this.$t("companies.form.addPurchaseDiscount"),
          link: "/purchaseDiscounts/create",
          icon: "badge-percent"
        },
        {
          name: this.$t("companies.form.addSalesInstallment"),
          link: "/salesInstallments/create",
          icon: "wallet"
        },
        {
          name: this.$t("companies.form.addPurchaseInstallment"),
          link: "/purchaseInstallments/create",
          icon: "wallet"
        },
        {
          name: this.$t("companies.form.addExpense"),
          link: "/expenses/create",
          icon: "usd-square"
        },
        {
          name: this.$t("companies.form.addSafesDeposit"),
          link: "/safesDeposits/create",
          icon: "envelope-open-dollar"
        },
        {
          name: this.$t("companies.form.addSafesWithdrawal"),
          link: "/safesWithdrawals/create",
          icon: "envelope-open-dollar"
        },
        {
          name: this.$t("companies.form.addSafesTransfer"),
          link: "/safesTransfers/create",
          icon: "envelope-open-dollar"
        },
        {
          name: this.$t("companies.form.addStoresDeposit"),
          link: "/storesDeposits/create",
          icon: "boxes-alt"
        },
        {
          name: this.$t("companies.form.addStoresWithdrawal"),
          link: "/storesWithdrawals/create",
          icon: "boxes-alt"
        },
        {
          name: this.$t("companies.form.addStoresTransfer"),
          link: "/storesTransfers/create",
          icon: "boxes-alt"
        },
        {
          name: this.$t("companies.form.addPartnersDeposit"),
          link: "/partnersDeposits/create",
          icon: "handshake"
        },
        {
          name: this.$t("companies.form.addPartnersWithdrawal"),
          link: "/partnersWithdrawals/create",
          icon: "handshake"
        },
        {
          name: this.$t("companies.form.addPartnersSettlement"),
          link: "/partnersSettlements/create",
          icon: "handshake"
        },
        {
          name: this.$t("companies.form.addPartnersProfit"),
          link: "/partnersProfits/create",
          icon: "handshake"
        },
        {
          name: this.$t("companies.form.addAccountsDeposit"),
          link: "/accountsDeposits/create",
          icon: "hand-holding-usd"
        },
        {
          name: this.$t("companies.form.addAccountsWithdrawal"),
          link: "/accountsWithdrawals/create",
          icon: "hand-holding-usd"
        },
        {
          name: this.$t("companies.form.addProjectsDeposit"),
          link: "/projectsDeposits/create",
          icon: "chart-line"
        },
        {
          name: this.$t("companies.form.addProjectsWithdrawal"),
          link: "/projectsWithdrawals/create",
          icon: "chart-line"
        },
        {
          name: this.$t("companies.form.addProjectsTransfer"),
          link: "/projectsTransfers/create",
          icon: "chart-line"
        },
        {
          name: this.$t("companies.form.addManufacturingModel"),
          link: "/manufacturingModels/create",
          icon: "hammer"
        },
        {
          name: this.$t("companies.form.addManufacturingOperation"),
          link: "/manufacturingOperations/create",
          icon: "hammer"
        },
        {
          name: this.$t("companies.form.sowPointOfSales"),
          link: "/pointOfSales",
          icon: "cash-register"
        },
        {
          name: this.$t("companies.form.addEmployeesSalarie"),
          link: "/employeesSalaries/create",
          icon: "user-chart"
        },
        {
          name: this.$t("companies.form.addEmployeesIncentive"),
          link: "/employeesIncentives/create",
          icon: "user-chart"
        },
        {
          name: this.$t("companies.form.addEmployeesDeduction"),
          link: "/employeesDeductions/create",
          icon: "user-chart"
        },
        {
          name: this.$t("companies.form.addEmployeesWithdrawal"),
          link: "/employeesWithdrawals/create",
          icon: "user-chart"
        },
        {
          name: this.$t("companies.form.addEndorsement"),
          link: "/endorsements/create",
          icon: "file-signature"
        },
        {
          name: this.$t("companies.form.addDeposit"),
          link: "/deposits/create",
          icon: "wallet"
        },
        {
          name: this.$t("companies.form.addCity"),
          link: "/cities/create",
          icon: "shipping-fast"
        },
        {
          name: this.$t("companies.form.addPickupLocation"),
          link: "/pickupLocations/create",
          icon: "shipping-fast"
        },
        {
          name: this.$t("companies.form.addShippingOperation"),
          link: "/shippingOperations/create",
          icon: "shipping-fast"
        }

      ]
    };
  },
  mounted() {
    if (this.$route.name == "rolesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
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
      if (error == 0) {
        if (this.$route.name == "rolesCreate") {
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.theRoleWasAddedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.push(this.path);
              this.$parent.stopEdit = false;
              return response;
            });
        } else if (this.$route.name == "rolesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.theRoleHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },


  },
  components: {
    formInput,
    dvider,
    addHeader,
    formTextarea,
    roleGroupInput,
    loading,
  },
};
</script>
