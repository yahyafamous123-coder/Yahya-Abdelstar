import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Bed, 
  Bath, 
  CreditCard, 
  Sparkles, 
  Plus,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { University, ListingPackage, Property, PropertyType, StudentGender, User } from '../types';
import { EGYPTIAN_GOVERNORATES } from '../data/mockData';

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  universities: University[];
  packages: ListingPackage[];
  onSubmitUnit: (propertyData: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'status' | 'listingPaymentStatus'>, selectedPackage: ListingPackage) => void;
}

const SAMPLE_APARTMENT_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80'
];

const AVAILABLE_AMENITIES = [
  'تكييف سبليت',
  'واي فاي فايبر سريع',
  'غسالة ملابس أوتوماتيك',
  'سخان غاز طبيعي',
  'مكتب دراسي وإضاءة خاصة',
  'أمن وحراسة بالعمارة 24 ساعة',
  'مصعد كهربائي حديث',
  'ثلاجة خاصة بالوحدة',
  'شرفة تهوية واسعة',
  'دولاب خاص لكل سرير بمفتاح'
];

export const AddUnitModal: React.FC<AddUnitModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  universities,
  packages,
  onSubmitUnit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [nearestUnivId, setNearestUnivId] = useState(universities[0]?.id || 'cu');
  const [distanceMinutes, setDistanceMinutes] = useState(10);
  const [transportAccess, setTransportAccess] = useState('خط مواصلات ومترو مباشر');
  const [governorate, setGovernorate] = useState(EGYPTIAN_GOVERNORATES[0]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [priceMonthly, setPriceMonthly] = useState<number>(2500);
  const [depositEgp, setDepositEgp] = useState<number>(1500);
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [gender, setGender] = useState<StudentGender>('male');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(3);
  const [availableBeds, setAvailableBeds] = useState<number>(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'واي فاي فايبر سريع',
    'سخان غاز طبيعي',
    'غسالة ملابس أوتوماتيك'
  ]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packages[1]?.id || packages[0]?.id);
  const [selectedImages, setSelectedImages] = useState<string[]>([SAMPLE_APARTMENT_IMAGES[0], SAMPLE_APARTMENT_IMAGES[1]]);

  if (!isOpen) return null;

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const toggleImage = (url: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(url)) {
        if (prev.length === 1) return prev; // keep at least 1 image
        return prev.filter((img) => img !== url);
      } else {
        return [...prev, url];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedUniv = universities.find((u) => u.id === nearestUnivId) || universities[0];
    const chosenPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

    const newUnitData: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'status' | 'listingPaymentStatus'> = {
      title,
      description,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      governorate,
      city: city || 'بجوار الحرم الجامعي',
      address,
      nearestUniversityId: selectedUniv.id,
      nearestUniversityName: selectedUniv.name,
      distanceMinutes,
      distanceText: distanceMinutes <= 15 ? `${distanceMinutes} دقائق مشياً من الجامعة` : `${distanceMinutes} دقيقة بالمواصلات / المترو`,
      transportAccess: transportAccess || 'مواصلات ومترو متاح',
      priceMonthly: Number(priceMonthly),
      depositEgp: Number(depositEgp),
      type: propertyType,
      gender,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      beds: Number(beds),
      availableBeds: Number(availableBeds),
      images: selectedImages,
      amenities: selectedAmenities,
      rules: [
        'إبراز كارنيه الكلية أو إثبات قيد جامعي ساري',
        'الحفاظ على نظافة المكان والهدوء'
      ],
      listingPackageId: chosenPackage.id,
      packageName: `${chosenPackage.name} (${chosenPackage.priceEgp.toLocaleString()} ج.م)`,
      expiresAt: new Date(Date.now() + chosenPackage.durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    onSubmitUnit(newUnitData, chosenPackage);
  };

  const currentChosenPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div 
        id="add-unit-modal-card"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 my-6 animate-in fade-in zoom-in-95 duration-200 text-right"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">إضافة وحدة سكنية جديدة للطلاب</h3>
              <p className="text-xs text-slate-400">تحديد تفاصيل السكن، السعر، وباقة الإعلان المدفوعة عبر فوري</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* 1. Basic Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">1. المعلومات الأساسية والجامعة</h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                عنوان إعلان الوحدة (جذاب وواضح للطلاب) *
              </label>
              <input
                type="text"
                placeholder="مثال: شقة مفروشة راقية 3 غرف أمام بوابة كلية التجارة جامعة القاهرة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">أقرب جامعة أو معهد *</label>
                <select
                  value={nearestUnivId}
                  onChange={(e) => setNearestUnivId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.governorate})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المسافة التقديرية للجامعة ({distanceMinutes} دقيقة)
                  <span className="text-[10px] text-amber-700 block font-normal">مسموح السكن في أحياء بعيدة هادئة مع توفر مواصلات</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={60}
                  step={5}
                  value={distanceMinutes}
                  onChange={(e) => setDistanceMinutes(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Transport access */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                توفر المواصلات والمترو (مهم إذا كانت الشقة بعيدة عن الحرم الجامعي)
              </label>
              <input
                type="text"
                placeholder="مثال: 5 دقائق لمحطة المترو، باص الجامعة المباشر أمام العقار"
                value={transportAccess}
                onChange={(e) => setTransportAccess(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المحافظة *</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                >
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المنطقة / الحي *</label>
                <input
                  type="text"
                  placeholder="مثال: بين السرايات / الدقي"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">العنوان التفصيلي *</label>
                <input
                  type="text"
                  placeholder="الشارع ورقم العمارة والدور"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* 2. Specs & Pricing */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">2. المواصفات والأسعار</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نوع السكن *</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                >
                  <option value="apartment">شقة كاملة مفروشة</option>
                  <option value="bed">سرير في غرفة مشتركة</option>
                  <option value="room">غرفة خاصة مستقلة</option>
                  <option value="studio">استوديو مستقل</option>
                  <option value="chalet">شاليه / دور فيلا</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">فئة النزلاء (بنين / بنات) *</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as StudentGender)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                >
                  <option value="male">سكن طلاب (بنين فقط)</option>
                  <option value="female">سكن طالبات (بنات فقط)</option>
                  <option value="any">شقة كاملة / متاح للجميع</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الإيجار الشهري (ج.م) *</label>
                <input
                  type="number"
                  min={500}
                  step={50}
                  value={priceMonthly}
                  onChange={(e) => setPriceMonthly(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التأمين المسترد (ج.م) *</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={depositEgp}
                  onChange={(e) => setDepositEgp(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الأسرة الكلية *</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الأسرة المتاحة *</label>
                <input
                  type="number"
                  min={1}
                  max={beds}
                  value={availableBeds}
                  onChange={(e) => setAvailableBeds(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">وصف كامل للوحدة ومميزاتها *</label>
              <textarea
                rows={3}
                placeholder="صف الشقة وقربها من وسائل المواصلات، الفرش، والأجهزة الكهربائية..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden"
              />
            </div>
          </div>

          {/* 3. Amenities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">3. المرافق والخدمات المتوفرة</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-right flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{amenity}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Photos Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-sm font-bold text-slate-900">4. صور الوحدة السكنية (اختر للمعاينة)</h4>
              <span className="text-xs text-slate-500">محدد: {selectedImages.length} صور</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SAMPLE_APARTMENT_IMAGES.map((imgUrl, idx) => {
                const isSelected = selectedImages.includes(imgUrl);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleImage(imgUrl)}
                    className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected ? 'border-amber-500 scale-102 shadow-xs' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="عينة صورة" className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Choose Listing Duration Package (The Business Model) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">5. اختيار باقة العرض وسداد الرسوم عبر فوري</h4>
                <p className="text-xs text-slate-500">رسوم الإعلان الإلزامية التي يحددها المالك لنشر الشقة على المنصة</p>
              </div>
              <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                دفع فوري
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packages.slice(0, 3).map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold">{pkg.durationText}</span>
                    </div>

                    <div className="flex items-baseline gap-1 py-1">
                      <span className="text-2xl font-black text-slate-900">{pkg.priceEgp.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-500">ج.م</span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{pkg.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>
                حفظ الشقة واستخراج كود دفع فوري لباقة ({currentChosenPackage.priceEgp.toLocaleString()} ج.م)
              </span>
            </button>
            <p className="text-center text-[11px] text-slate-400">
              بمجرد السداد يتم إرسال الوحدة فوراً لمراجعة واعتماد الإدارة قبل نشرها للطلاب
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
