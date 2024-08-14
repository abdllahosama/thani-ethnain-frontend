<template>
    <tr>
        <td>
            <div class="search-input">
                <input type="text" class="form-control m-w-200" :placeholder="$t('components.products.materialName')" v-model="material.name"  @keydown="selectProduct" @focus="showItemsList = true" @blur="removeItemList">
                <ul class="list-unstyled search-selects" v-if="searchProducts.length > 0 && material.product_name != '' && showItemsList">
                    <li v-for="product in searchProducts" :key="product.id" @click="changeProduct(product)" :class="{'focusd': product.focused}">{{product.name}}</li>
                </ul>
            </div>
        </td>
        <td>
        <input type="number" class="form-control m-w-200" :placeholder="$t('components.products.quantity')"  v-model="material.quantity" >
        </td>
        <td class="with-padding">
            <button class="btn btn-danger" @click="deleteItem()">
                <i class="far fa-trash"></i>
            </button>
        </td>
    </tr>
</template>
<script>

    export default {
        data() {
            return {
                searchProducts: {},
                noSearch: false,
                showItemsList: false,
            }
        },
        methods: {
            changeProduct(Product) {
                this.material.material_id = Product.id;
                this.material.name = Product.name;
                this.material.quantity = 1;
                this.noSearch = true;
                this.removeItemList();
            },
            blurSearch() {
                setTimeout(() => {
                    this.searchProducts = {};
                }, 200);
            },
            deleteItem() {
                this.$parent.item.materials.splice(this.$parent.item.materials.indexOf(this.item), 1);
            },
            selectProduct(e) {
                if (e.key == 'ArrowDown' && this.searchProducts.length != 0 || e.key == 'ArrowUp' && this.searchProducts.length != 0) {
                    var product = this.searchProducts.find(el => el.focused == true);
                    var selected = this.searchProducts.indexOf(product);
                    var length = this.searchProducts.length;
                    if (selected > -1) {
                        this.$set(this.searchProducts[selected], 'focused', false);
                    }
                    if (e.key == 'ArrowDown') {
                        if (selected < length - 1) {
                            this.$set(this.searchProducts[selected + 1], 'focused', true);
                        } else {
                            this.$set(this.searchProducts[0], 'focused', true);
                        }
                    } else if (e.key == 'ArrowUp') {
                        if (selected > 0) {
                            this.$set(this.searchProducts[selected - 1], 'focused', true);
                        } else {
                            this.$set(this.searchProducts[length - 1], 'focused', true);
                        }
                    }

                } else if (e.key == 'Enter') {
                    var eproduct = this.searchProducts.find(el => el.focused == true);
                    var eselected = this.searchProducts.indexOf(eproduct);
                    if (eselected != -1) {
                        this.changeProduct(eproduct);
                    }
                }
            },
            removeItemList() {
                var chek = this;
                setTimeout(function() {
                    chek.showItemsList = false
                }, 100);
            }
        },
        watch: {
            'material.name': function(search) {
                var editsearch = new RegExp(search, 'i');
                var materials = this.$database.materials.filter(el => editsearch.test(el.name)).slice(0, 20);
                if (typeof materials != 'undefined') {
                    this.searchProducts = materials;
                    this.showItemsList = true;
                } else {
                    this.searchProducts = [];
                }
            },
            item: function() {
                this.noSearch = true;
            }
        },
        props: ['material', 'index']
    };

</script>
