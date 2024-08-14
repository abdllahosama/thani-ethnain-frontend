<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-auto">
            <img src="accounting/img/whatsapp.png" class="application-img" />
          </div>

          <div class="col ml-n2">
            <h4 class="mb-1">
              <a>whatsapp</a>
            </h4>
            <p> {{$t('applications.FromhereyoucansendmessagesandfollowuponyourcustomersonWhatsApp')}} </p>

            <div class="col-auto">
              <router-link :to="'/applications/whatsapp'" class="btn btn-primary">
                {{$t('applications.Show')}} 
              </router-link>
              <router-link :to="'/applications/Messages'" class="btn btn-primary">
                {{$t('applications.SendingaMessage')}} 
              </router-link>
            
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
