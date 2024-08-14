<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-5">
            {{$t('messages.name')}}
        </div>
        <div class="col-xl-6">
          {{$t('messages.phonenumber')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <numberItem v-for="(rowItem, index) in $parent.item.messageItems" :key="index" :index="index" :item="rowItem"></numberItem>
    
    <div class="mb-3 d-flex">
      <button class="btn btn-primary w-100  " @click="$parent.filWithCustomers()"> <i class="fal fa-user"></i> {{$t('messages.Fillwithcustomers')}} </button>
      <button class="btn btn-primary w-100 ml-3" @click="$parent.filWithSuppliers()"> <i class="fal fa-user"></i> {{$t('messages.Fillwithsuppliers')}} </button>
      <button class="btn btn-primary w-100 ml-3" @click="$parent.filWithPartners()"> <i class="fal fa-user"></i> {{$t('messages.Fillwithpartners')}} </button>
      <button class="btn btn-primary w-100 ml-3" @click="$parent.filWithAccounts()"> <i class="fal fa-user"></i> {{$t('messages.Fillwithaccounts')}} </button>
    
    </div>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addNumberItem()">
      <i class="fas fa-plus"></i> {{$t('messages.addition')}}
    </button>
    <hr class="  mb-4"/>
  </div>

</template>
<script>

  import numberItem from './numberItem.vue'
  export default {
    
    components: {
      numberItem,
    }
  }

</script>
