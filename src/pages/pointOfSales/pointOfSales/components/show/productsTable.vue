<template>
    <div class="card">
            <div class="table-responsive">
              <table class="
                  table table-sm table-nowrap
                  card-table
                  table-hover
                  pos-table pos-big-table
                ">
                <thead>
                  <tr>
                    <th>
                      {{ $t('components.pointOfSalesShow.productName') }}
                    </th>
                    <th v-if="
                      $parent.options.show_cost == 2 ||
                      ($parent.options.show_cost == 1 && $parent.showCost)
                    ">
                     {{ $t('components.pointOfSalesShow.cost') }} 
                    </th>
                    <th :class="$parent.options.change_price ? 'quantity-input' : ''">
                      {{ $t('components.pointOfSalesShow.price') }}
                    </th>
                    <th class="quantity-input">
                      {{ $t('pointOfSales.show.Lots') }}
                    </th>
                    <th class="quantity-input" v-if="$parent.options.change_product_discount">
                      {{ $t('components.pointOfSalesShow.Discount') }}
                    </th>
                    <th>
                      {{ $t('pointOfSales.show.Total') }}
                    </th>
                    <th v-if="$parent.item.invoiceItems.length > 0"></th>
                  </tr>
                </thead>
                <tbody class="list">
                  <td colspan="10" class="empty-table" v-if="$parent.item.invoiceItems.length == 0">
                    <i class="far fa-scanner d-block"></i>
                    {{ $t('pointOfSales.show.ThereAreNoProducts') }}
                  </td>
                  <tr v-for="(item, index) in $parent.item.invoiceItems" :key="index">
                    <td>
                      {{ item.name }}
                      {{ item.detailName ? "(" + item.detailName + ")" : "" }}
                    </td>
                    <td v-if="
                      $parent.options.show_cost == 2 ||
                      ($parent.options.show_cost == 1 && showCost)
                    ">
                      {{ item.cost }} {{ $option.currency }}
                    </td>
                    <td :class="$parent.options.change_price ? 'quantity-input' : ''">
                      <input v-if="$parent.options.change_price" type="number" @keyup="$parent.calculateTotal()" v-model="item.price"
                        class="form-control" min="1" />
                      {{
                          !$parent.options.change_price
                            ? item.price + " " + $option.currency
                            : ""
                      }}
                    </td>
                    <td class="quantity-input">
                      <input type="number" @keyup="$parent.calculateTotal()" v-model="item.quantity" class="form-control"
                        min="1" />
                    </td>
                    <td v-if="$parent.options.change_product_discount" class="quantity-input">
                      <input type="number" @keyup="$parent.calculateTotal()" v-model="item.discount" class="form-control"
                        min="0" />
                    </td>
                    <td>{{ item.total }} {{ $option.currency }}</td>
                    <td>
                      <button class="btn btn-outline-danger" @click="$parent.deleteItem(index)" v-if="$parent.item.invoiceItems.length > 0">
                        <i class="far fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
</template>