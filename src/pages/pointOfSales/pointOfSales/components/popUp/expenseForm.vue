<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.addExpense')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group row">
                  <label class="col-sm-12"> {{$t('components.pointOfSalesPopUp.theAmount')}} </label>
                  <div class="add-input col-md-12">
                    <input
                      type="number"
                      class="form-control"
                      v-model="expense.cost"
                      dir="rtl"
                      :class="{ 'is-invalid': errors.cost }"
                      @change="errors.cost = false"
                    />
                    <span>{{ $option.currency }}</span>
                  </div>

                </div>
              </div>
              <div class="col-12">
                <div class="form-group row">
                  <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.section')}}</label>
                  <div class="col-md-12">
                    <select
                      class="form-control"
                      v-model="expense.expense_section_id"
                    >
                      <option value="0">{{$t('components.pointOfSalesPopUp.ChooseARating')}}</option>
                      <option v-for="(expenseSection, index) in this.filterdExpensesSections" :value="expenseSection.id" :key="index">{{expenseSection.name}}</option>
                  </select>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.ThatIsAbout')}} </label>
                  <div class="col-md-12">
                    <textarea class="form-control" v-model="expense.description"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
                <button
                  @click="createExpense()"
                  class="btn btn-dark"
                  v-if="!loading"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
                </button>
                <button class="btn btn-dark" v-if="loading">
                  {{$t('components.pointOfSalesPopUp.Download')}} <span class="loading-s1 sm-j">.</span
                  ><span class="loading-s2 sm-j">.</span
                  ><span class="loading-s3 sm-j">.</span>
                </button>
              </div>
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
    return {
      expense: {},
      errors: {cost: false},
      showError: false,
      loading: false,
      filterdExpensesSections: []
    };
  },
  methods: {
    createExpense() {
      var error = 0;
      if (typeof this.expense.cost === "undefined" || this.expense.cost == 0) {
        error = 1;
        this.errors.cost = true;
      }
      if (error == 0) {
          this.$parent.aletText = this.$t('components.pointOfSalesPopUp.TheExpenseHasBeenRegisteredSuccessfully');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.expense, 'expenses');
          let safe = this.$database.safes.find(el => el.id == this.expense.safe_id)
          if (safe) {
            safe.balance = parseFloat(safe.balance)  - parseFloat(this.expense.cost)
            localStorage.database= JSON.stringify(this.$database)
          }
          this.close();
      }
    },
    close() {
      this.$parent.showAddPopUp = false;
    },
  },
  mounted() {
    this.$updateDatabase(["expenseSections"]);
    let pointOfSale = this.$database.pointOfSales.find(el => el.id == this.$route.params.id)
    this.expense = {
        invoice_group: pointOfSale.expenses_invoice_group_id,
        point_of_sale_id: pointOfSale.id,
        session_number: pointOfSale.session_number,
        safe_id: pointOfSale.safe_id,
        expense_section_id: 0,
        cost: "",
        date: this.$nowDate()
    }
    this.filterdExpensesSections = this.$database.expenseSections.filter(el => JSON.parse(this.$database.pointOfSales.find(el => el.id == this.$route.params.id).expenses_section_id).includes(el.id))
  },
};
</script>
