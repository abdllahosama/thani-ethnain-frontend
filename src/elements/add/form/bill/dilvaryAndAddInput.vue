<template>

      <div class="col-xl-4 col-sm-12">
        <div class="form-group row">
          <label class="col-2">
                  <i class="fas fa-shipping-fast qutation-icon"></i>
              </label>
          <div class="col-10">
            <div class="add-input">
              <input type="number"
                     class="form-control "
                     placeholder="0"
                     v-model="$parent.item.delivery"
                     @change="$parent.changePrice"
                     :disabled="$user.admin || $user.role.invoices_edit_product ? false : true">
              <span>{{$option.currency}}</span>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-2">
                  <i class="fas fa-sliders-h qutation-icon"></i>
              </label>
          <div class="col-4">
            <input type="text"
                   class="form-control"
                   :placeholder="$t('bills.form.Modification')"
                   v-model="$parent.item.edit_text"
                   :disabled="$user.admin || $user.role.invoices_edit_product ? false : true">
          </div>
          <div class="col-6">
            <div class="add-input">
              <input type="number"
                     class="form-control"
                     placeholder="0"
                     v-model="$parent.item.edit"
                     @change="$parent.changePrice"
                     :disabled="$user.admin || $user.role.invoices_edit_product ? false : true">
              <span>{{$option.currency}}</span>
            </div>
          </div>
        </div>
      </div>

</template>
