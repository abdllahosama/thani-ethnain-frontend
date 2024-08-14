<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('messages.Whatsappmessages')"
          :description="$t('messages.FromhereyoucansendmessagesonWhatsApp')"
        />
        <div class="mb-4 row">
          
         <numbersTable class="col-12" />

         <fileInput 
            :title="$t('messages.messagefile')"
            v-model="item.image"
            :image="item.image"
            :path="'whatsapp'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
          />
          <formTextarea 
            :title="$t(' messages.Messagecontent ')"
            v-model="item.message"
           />

          <button class="btn btn-lg btn-block btn-primary mb-3" @click="sendMessage()">
           {{$t(' messages.sent ')}} 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import addHeader from "@/elements/add/header.vue";
import fileInput from "@/elements/add/form/fileInput.vue";
import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import numbersTable from "./components/messages/numbersTable.vue";

export default {
  data() {
    return {
      path: "/applications",
      item: {
        messageItems : [],
      },
      errors: {

      }
    };
  },
  mounted(){
    this.addNumberItem()
  },
  methods: {
    sendMessage () {
      this.item.messageItems.forEach(message => {
        let data = {
        phone: '+2' + message.number,
        message: this.item.message,
        enqueue: "never",
      }
      if (this.item.image) {
        data.media = {url: this.$linkGnirator('/companiesUploads/' + localStorage.getItem('subdomain') + '/whatsapp/' + this.item.image, true) , expiration: '60d'}
      }
      axios.post('https://api.wassenger.com/v1/messages', data , {
          headers: {
            'Content-Type': 'application/json',
            'Token': 'bd07d763a30e28a879c0a152a3609e83c6e5e500429d0c570f55838fdf9825f5e9ccc15c13c860d1'
          }
        }).then(function (response) {
          this.$parent.aletText = 'تم ارسال الرسالة بنجاح'
          this.$parent.alertType = 'success'
      }).catch(function (error) {
        this.$parent.aletText = 'خطاء من المضيف'
          this.$parent.alertType = 'danger'
      });
      })
    },
    addNumberItem() {
      this.item.messageItems.push({
        name: "",
        number: "",
      });
    },
    filWithCustomers () {
      this.item.messageItems = []
      this.$database.customers.forEach (customer => {
        this.item.messageItems.push({
        name: customer.name,
        number: customer.mobile,
      });
      })
    },
    filWithSuppliers () {
      this.item.messageItems = []
      this.$database.suppliers.forEach (suppliers => {
        this.item.messageItems.push({
        name: suppliers.name,
        number: suppliers.mobile,
      });
      })
    },
    filWithPartners () {
      this.item.messageItems = []
      this.$database.partners.forEach (partners => {
        this.item.messageItems.push({
        name: partners.name,
        number: partners.mobile,
      });
      })
    },
    filWithAccounts () {
      this.item.messageItems = []
      this.$database.accounts.forEach (accounts => {
        this.item.messageItems.push({
        name: accounts.name,
        number: accounts.mobile,
      });
      })
    }
  },
 
  components: {
    addHeader,
    fileInput,
    formInput,
    formTextarea,
    numbersTable
  },
};
</script>
