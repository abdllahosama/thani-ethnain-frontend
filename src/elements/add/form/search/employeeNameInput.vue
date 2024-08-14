<template>
  <div class="form-group col-md-6 row">
    <label class="col-md-4"> اسم الموظف </label>
    <div class="col-md-7">
      <div class="search-container" v-click-outside="removeEmployeeList">
        <div
          :class="
            this.$parent.item.employee_id != 0 && !disabled ? 'add-input' : ''
          "
        >
          <input
            type="search"
            autocomplete="off"
            v-model="$parent.item.employee.name"
            class="form-control"
            maxlength="255"
            @keydown="selectEmployee"
            @keyup="searchEmployee"
            @focus="searchEmployee"
            :class="{ 'is-invalid': $parent.errors.name }"
            :disabled="this.$parent.item.employee_id != 0"
          />
          <span
            class="btn btn-danger"
            v-if="this.$parent.item.employee_id != 0 && !disabled"
            @click="removeEmployee"
            ><i class="fas fa-times"></i
          ></span>
        </div>
        <div class="invalid-feedback">هذا الحقل مطلوب</div>
        <ul
          class="list-unstyled search-selects"
          v-if="
            searchEmployees.length > 0 &&
            $parent.item.employee_id == 0 &&
            showEmployeesList
          "
        >
          <li
            v-for="employee in searchEmployees"
            :key="employee.id"
            @click="addEmployeeFromSearch(employee.id)"
            :class="{ focusd: employee.focused }"
          >
            {{ employee.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchEmployees: [],
      showEmployeesList: false,
      addedEmployee: false,
    };
  },
  methods: {
    searchEmployee() {
      var search = this.$parent.item.employee.name;
      if (this.addedEmployee) {
        this.addedEmployee = false;
      } else {
        this.$parent.item.employee_id = 0;
        this.showEmployeesList = true;
        var editsearch = new RegExp(search, "i");
        var employees = this.$database.employees
          .sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" }))
          .filter((el) => editsearch.test(el.name))
          .slice(0, 20);
        if (typeof employees != "undefined") {
          this.searchEmployees = employees;
        } else {
          this.searchEmployees = [];
        }
      }
    },
    selectEmployee(e) {
      if (
        (e.key == "ArrowDown" && this.searchEmployees.length != 0) ||
        (e.key == "ArrowUp" && this.searchEmployees.length != 0)
      ) {
        var employee = this.searchEmployees.find((el) => el.focused == true);
        var selected = this.searchEmployees.indexOf(employee);
        var length = this.searchEmployees.length;
        if (selected > -1) {
          this.$set(this.searchEmployees[selected], "focused", false);
        }
        if (e.key == "ArrowDown") {
          if (selected < length - 1) {
            this.$set(this.searchEmployees[selected + 1], "focused", true);
          } else {
            this.$set(this.searchEmployees[0], "focused", true);
          }
        } else if (e.key == "ArrowUp") {
          if (selected > 0) {
            this.$set(this.searchEmployees[selected - 1], "focused", true);
          } else {
            this.$set(this.searchEmployees[length - 1], "focused", true);
          }
        }
      } else if (e.key == "Enter") {
        var eemployee = this.searchEmployees.find((el) => el.focused == true);
        var eselected = this.searchEmployees.indexOf(eemployee);
        if (eselected != -1) {
          this.addEmployeeFromSearch(eemployee.id, eemployee.name);
          this.showEmployeesList = false;
        }
      }
    },
    addEmployeeFromSearch(id) {
      var employee = this.$database.employees.find(
        (el) => el.id == id
      );
      this.$parent.item.employee_id = id;
      this.$parent.item.employee = employee;
      this.addedEmployee = true;
    },
    removeEmployeeList() {
      var chek = this;
      setTimeout(function () {
        chek.showEmployeesList = false;
      }, 100);
    },
    removeEmployee() {
      this.$parent.item.employee_id = 0;
      this.$parent.item.employee = {};
      this.searchEmployees = [];
    },
  },
  props: ["disabled"],
};
</script>
