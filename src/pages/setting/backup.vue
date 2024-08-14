<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader 
            :title="$t('backup.backup')"
            :description="$t('backup.fromHereYouCanDoBackupToDatabase')"
          />
          <hr/>
          <p>يمكن عمل النسخ الأحتياطي لقاعدة البيانات كالمة تحتوي علي كل الموديلات الخاصة بالنظام يتم اخراج البيانات علي شكل ملف <strong>SQL</strong> قابل لاعادة التحميل علي اي قاعدة بيانات اخري بكل سهولة </p>
          <p>تشمل قاعدة البيانات الأتي :</p>
          <ul>
            <li>بيانات المبيعات كاملة</li>
            <li>بيانات المشتريات كالمة</li>
            <li>بيانات المخزون والعمليات الخاصة بة</li>
            <li>بيانات الخزائن وعملياتها</li>
            <li>بيانات الموارد البشرية والموظفين</li>
            <li>بيانات الشركاء والعمليات الخاصة بهم</li>
            <li>البيانات الخاصة بالمشروعات</li>
            <li>الحسابات الجارية وعملياتها</li>
            <li>الشيكات والسندات</li>
            <li>الأقساط ودفعاتها</li>
            <li>عمليات التصنيع وسجل العمليات</li>
            <li>التقارير والأعدادات الخاصة بها</li>
            <li>الأعدادات الخاصة بالنظام كاملة</li>
            <li class="text-danger">لايشمل النسخ الأحتياطي حسابات المستخدمين</li>
            <li class="text-danger">لا يشمل النسخ الأحتياطي صلاحيات المستخدمين نظرا لسرية البيانات</li>
          </ul>

          <button class="btn btn-primary mb-6" :disabled="loading" @click="pickUp">
            {{ !loading ? 'النسخ الأحتياطي': ''}}
            <template v-if="loading">
                جاري التحميل <span class="loading-s1 sm-j">.</span><span class="loading-s2 sm-j">.</span><span class="loading-s3 sm-j">.</span>
            </template>
          </button>
        </div>
      </div>
    </div>
  
  </template>
  <script>
    import axios from "axios";
    import indexHeader from '@/elements/index/indexHeader.vue'
    export default {
      data() {
        return {
          loading: false,
          link: ""
        }
      },
      methods: {
        pickUp() {
            if (!this.loading) {
                this.loading = true
                axios
                .get(this.$linkGnirator("/backupdb"))
                .then((response) => {
                    this.loading = false
                    var a = document.createElement('A');
                    a.href = "data:text/txt," + response.data;
                    a.download = "backup.sql";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
            }
        }
      },
      components: {
        indexHeader
      }
    }
  
  </script>
  