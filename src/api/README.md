# 🔹 API Integration Guide

## 📁 البنية الحالية

```
src/api/
├── config/
│   └── axiosConfig.ts          # إعدادات axios المشتركة
├── services/
│   ├── doctorsService.ts       # خدمات API للأطباء
│   └── specialtiesService.ts   # خدمات API للتخصصات
├── doctors/
│   ├── Doctors.ts              # Interface و Mock Data للأطباء
│   └── specialties.ts          # Interface و Mock Data للتخصصات
└── README.md                   # هذا الملف
```

## 🔄 الخطوات المطلوبة للربط بـ API

### 1️⃣ تحديث روابط API في الخدمات

#### في `src/api/services/doctorsService.ts`:
- استبدل `/doctors` برابط API الفعلي للأطباء
- استبدل `/doctors/${id}` برابط API الفعلي لطبيب محدد
- استبدل `/doctors/search` برابط API الفعلي للبحث
- استبدل `/doctors/top-rated` برابط API الفعلي لأفضل الأطباء

#### في `src/api/services/specialtiesService.ts`:
- استبدل `/specialties` برابط API الفعلي للتخصصات
- استبدل `/specialties/${id}` برابط API الفعلي لتخصص محدد

### 2️⃣ تحديث `DoctorsFilterContext.tsx`

استبدل البيانات الوهمية بـ API calls:
- استيراد `getDoctors` و `getSpecialties` من الخدمات
- استخدام `useEffect` لتحميل البيانات عند الـ mount
- إضافة loading و error states

### 3️⃣ تحديث `SearchBar.tsx`

استبدل البحث المحلي بـ API call:
- استخدام `searchDoctors` بدلاً من `DoctorsList.filter`

### 4️⃣ تحديث `TopRatedDoctors.tsx`

استخدام `getTopRatedDoctors` بدلاً من `DoctorsList`

### 5️⃣ إعدادات البيئة (اختياري)

أضف ملف `.env`:
```
VITE_API_BASE_URL=https://your-api-url.com/api
```

## 📝 ملاحظات مهمة

- ✅ تم إعداد axios instance مع interceptors
- ✅ تم إعداد error handling
- ✅ تم إعداد token authentication (جاهز للاستخدام)
- ⚠️ يجب التأكد من بنية الـ API Response وتعديل Interfaces إذا لزم الأمر
- ⚠️ يجب إضافة loading states في UI
- ⚠️ يجب إضافة error handling في UI
