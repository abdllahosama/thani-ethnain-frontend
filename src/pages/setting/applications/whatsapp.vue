<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('whatsapp.AddWhatsApp')"
          :description="$t('whatsapp.FromhereyoucancontroladdingWhatsApp')"
        />
        <div class="row">
          <formInput
            :title="$t('whatsapp.wrench')"
            v-model="item.api_key"
            maxlength="255"
          />
          <formInput
            :title="$t('whatsapp.alertnumber')"
            v-model="item.notification_number"
            maxlength="255"
          />
          <formInput
            :title="$t('whatsapp.StateKey')"
            v-model="item.country_key"
            maxlength="255"
          />
        </div>
        <dvider
          :title="$t('whatsapp.Whatsappmessageinformation')"
          :description="$t('whatsapp.BasicinformationforWhatsAppmessages')"
        />
        <div class="mt-5">
          <formTextarea :title="$t('whatsapp.Quotetext')" v-model="item.quotation_text" />
          <formTextarea
            :title="$t('whatsapp.Salesinvoicetext')"
            v-model="item.invoice_text"
          />
          <formTextarea :title="$t('whatsapp.Textofpurchaseinvoices')" v-model="item.bill_text" />
          <formTextarea
            :title="$t('whatsapp.SaleReturnsText')"
            v-model="item.sales_return_text"
          />
          <formTextarea
            :title="$t('whatsapp.Purchasereturnstext')"
            v-model="item.purchase_return_text"
          />
          <formTextarea
            :title="$t('whatsapp.SalesCheckText')"
            v-model="item.sales_chque_text"
          />
          <formTextarea
            :title="$t('whatsapp.Textofpurchasechecks')"
            v-model="item.purchase_chque_text"
          />
          <formTextarea
            :title="$t('whatsapp.Salediscounttext')"
            v-model="item.sales_discount_text"
          />
          <formTextarea
            :title="$t('whatsapp.Textpurchasediscounts')"
            v-model="item.purchase_discount_text"
          />
        </div>
        <hr class="mt-5 mb-5 col-12" />
        <a class="btn btn-block btn-primary mb-3">
            {{$t('whatsapp.saveedit')}}
        </a>
        <a class="btn btn-block btn-primary mb-3" v-if="false">
          {{$t('whatsapp.saveedit')}}
        </a>
        <loading v-if="$parent.stopEdit"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import dvider from "@/elements/add/dvider.vue";

export default {
  data() {
    return {
      path: "/applications",
      item: {},
      errors: {
        name: false,
        rate: false,
      },
    };
  },
  components: {
    formInput,
    dvider,
    addHeader,
    loading,
    formTextarea,
  },
};
</script>
