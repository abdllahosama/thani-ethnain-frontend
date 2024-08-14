<template>
    <nav aria-label="Page navigation  pt-3" v-if="$parent.totalPages > 1">
        <ul class="pagination">
            <li class="page-item" :class="($parent.params.page == 1) ? 'disabled': ''" @click="previousPage()">
                <a class="page-link">السابق</a>
            </li>
            <li class="page-item" :class="(page == $parent.params.page) ? 'active': ''" v-for="page in pages" :key="page">
                <a class="page-link" @click="getPage(page)">{{page}}</a>
            </li>

            <li class="page-item" :class="($parent.params.page == $parent.totalPages) ? 'disabled': ''" @click="nextPage()">
                <a class="page-link">التالي</a>
            </li>
        </ul>
        <div class="item-counts-label">
            <label>العدد : </label>
            <input type="number" v-model="$parent.params.count">
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                pages: []
            }
        },
        methods: {
            getPage(page) {
                if (page != '...' && page != this.$parent.params.page) {
                    this.$parent.params.page = page;
                    this.$parent.getItems();
                }
            },
            previousPage() {
                if (this.$parent.params.page > 1) {
                    this.$parent.params.page = this.$parent.params.page - 1;
                    this.$parent.getItems();
                }
            },
            nextPage() {
                if (this.$parent.params.page < this.$parent.totalPages) {
                    this.$parent.params.page = this.$parent.params.page + 1;
                    this.$parent.getItems();
                }
            },
            initPages() {
                this.pages = [];
                var current = this.$parent.params.page;
                var total = this.$parent.totalPages;
                if (total > 9) {

                    if (current > 4) {
                        this.pages.push(1, 2, '...');
                    }

                    if (current <= 4) {
                        this.pages.push(1, 2, 3, 4, 5);
                    } else if (current > 4 && current < total - 3) {
                        this.pages.push(current - 2, current - 1, current, current + 1, current + 2);
                    } else if (current >= total - 3) {
                        this.pages.push(total - 4, total - 3, total - 2, total - 1, total);
                    }

                    if (current < total - 3) {
                        this.pages.push('... ', total - 1, total);
                    }
                } else {
                    this.pages = total;
                }
            }
        },
        mounted() {
            this.initPages();
        },
        watch: {
            '$parent.items': function() {
                this.initPages();
            }
        }

    };

</script>
