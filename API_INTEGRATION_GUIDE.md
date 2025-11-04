# 🔹 دليل ربط API - API Integration Guide

## 📋 ملخص البنية الحالية

تم إعداد البنية الأساسية للربط بـ API. الملفات التالية جاهزة للتحديث:

### ✅ الملفات الجاهزة (تم إنشاؤها):

1. **`src/api/config/axiosConfig.ts`**
   - إعدادات axios المشتركة
   - Interceptors للـ authentication و error handling
   - ✅ جاهز للاستخدام

2. **`src/api/services/doctorsService.ts`**
   - دوال API للأطباء
   - ⚠️ يحتاج تحديث الروابط (موجود TODO comments)

3. **`src/api/services/specialtiesService.ts`**
   - دوال API للتخصصات
   - ⚠️ يحتاج تحديث الروابط (موجود TODO comments)

### 📝 الملفات التي تحتاج تحديث:

#### 1️⃣ `src/context/DoctorsFilterContext.tsx`
**التغييرات المطلوبة:**
- استيراد `getDoctors` و `getSpecialties` من الخدمات
- إضافة `useState` للـ loading و error
- استخدام `useEffect` لتحميل البيانات من API
- تحديث منطق التصفية ليعمل مع API

**المواضع الحالية:**
- السطر 3: `import { DoctorsList, type DoctorsType } from '@/api/doctors/Doctors';`
- السطر 4: `import { specialtiesMock, type SpecialtyType } from '@/api/doctors/specialties';`
- السطر 31: `const [filteredDoctors, setFilteredDoctors] = useState<DoctorsType[]>(DoctorsList);`
- السطر 34: `const [specialties] = useState<SpecialtyType[]>(specialtiesMock);`
- السطر 60: `let filtered = DoctorsList;` (في useEffect)

#### 2️⃣ `src/components/common/SearchBar.tsx`
**التغييرات المطلوبة:**
- استيراد `searchDoctors` من الخدمات
- استبدال البحث المحلي بـ API call

**المواضع الحالية:**
- السطر 1: `import { DoctorsList, type DoctorsType } from '@/api/doctors/Doctors';`
- السطر 34-38: البحث المحلي باستخدام `DoctorsList.filter`

#### 3️⃣ `src/components/sections/homeSections/topRatedDoctors/TopRatedDoctors.tsx`
**التغييرات المطلوبة:**
- استيراد `getTopRatedDoctors` من الخدمات
- استخدام `useEffect` لتحميل البيانات

**المواضع الحالية:**
- السطر 1: `import { DoctorsList } from '@/api/doctors/Doctors';`
- السطر 40: `{DoctorsList.map((doctor) => (`

## 🔄 الخطوات العملية عند إرسال روابط API:

### الخطوة 1: تحديث `doctorsService.ts`
```typescript
// في src/api/services/doctorsService.ts
export const getDoctors = async (params?: DoctorsSearchParams): Promise<DoctorsApiResponse> => {
    // استبدل '/doctors' برابط API الفعلي
    const response = await apiClient.get('YOUR_API_URL_HERE', { params });
    return response.data;
};
```

### الخطوة 2: تحديث `specialtiesService.ts`
```typescript
// في src/api/services/specialtiesService.ts
export const getSpecialties = async (): Promise<SpecialtiesApiResponse> => {
    // استبدل '/specialties' برابط API الفعلي
    const response = await apiClient.get('YOUR_API_URL_HERE');
    return response.data;
};
```

### الخطوة 3: تحديث `DoctorsFilterContext.tsx`
- إضافة loading state
- استخدام `getDoctors` و `getSpecialties` في `useEffect`
- إرسال معاملات البحث والتصفية للـ API

### الخطوة 4: تحديث `SearchBar.tsx`
- استخدام `searchDoctors` بدلاً من البحث المحلي

### الخطوة 5: تحديث `TopRatedDoctors.tsx`
- استخدام `getTopRatedDoctors` لتحميل البيانات

## 📌 ملاحظات مهمة:

1. **بنية الـ API Response:**
   - قد تحتاج لتعديل Interfaces في `doctorsService.ts` و `specialtiesService.ts` حسب بنية الـ API الفعلية
   - تحقق من كيفية إرجاع البيانات (مثل `response.data.data` أو `response.data`)

2. **Error Handling:**
   - تم إعداد error handling في `axiosConfig.ts`
   - يمكن إضافة error states في Components

3. **Loading States:**
   - أضف loading indicators في UI أثناء تحميل البيانات

4. **Environment Variables:**
   - يمكن إضافة `VITE_API_BASE_URL` في ملف `.env` لتغيير الـ base URL

## 🎯 عند إرسال روابط API:

1. أرسل روابط API لكل endpoint
2. أرسل أمثلة على بنية الـ Response (إذا كان ممكن)
3. حدد إذا كانت هناك authentication مطلوبة
4. حدد أي query parameters مطلوبة

سأقوم بتحديث جميع الملفات تلقائياً! 🚀
