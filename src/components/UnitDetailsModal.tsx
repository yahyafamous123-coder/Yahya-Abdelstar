import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Bed, 
  Bath, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  UserCheck, 
  AlertCircle,
  Share2,
  Heart,
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles
} from 'lucide-react';
import { Property, User, University } from '../types';
import { PropertyLocationMap } from './PropertyLocationMap';

interface UnitDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onStartBooking: (property: Property, durationMonths: number, startDate: string, notes?: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
  universities?: University[];
}

export const UnitDetailsModal: React.FC<UnitDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
  currentUser,
  onStartBooking,
  isFavorite = false,
  onToggleFavorite,
  universities = []
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [durationMonths, setDurationMonths] = useState(3);
  const [startDate, setStartDate] = useState('2026-10-01');
  const [notes, setNotes] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const matchedUniversity = property 
    ? universities.find((u) => u.id === property.nearestUniversityId)
    : undefined;

  if (!isOpen || !property) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBooking(property, durationMonths, startDate, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div 
        id="unit-details-modal"
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200 text-right"
      >
        {/* Sticky Header with Close and Share */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite?.(property.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite 
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title="حفظ في المفضلة"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('تم نسخ رابط الوحدة السكنية للمشاركة');
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="مشاركة الرابط"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">معاينة تفاصيل الوحدة السكنية</span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Images Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {property.images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))}
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="صورة مصغرة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and University Proximity Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-100 text-blue-800">
                {property.nearestUniversityName}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                property.gender === 'female' ? 'bg-rose-100 text-rose-800' :
                property.gender === 'male' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {property.gender === 'female' ? 'سكن طالبات' : property.gender === 'male' ? 'سكن طلاب بنين' : 'متاح للجميع'}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                المحافظة: {property.governorate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-3">
              {property.title}
            </h1>

            {/* University Distance Alert Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900">المسافة إلى الحرم الجامعي والبوابات:</p>
                  <p className="text-xs text-blue-700 font-medium">{property.distanceText} • قرب المواصلات والخدمات</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => document.getElementById('property-map-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>معاينة الخريطة الحية</span>
                </button>
                <span className="inline-flex items-center gap-1 bg-white text-blue-800 font-black text-xs px-2.5 py-1.5 rounded-xl border border-blue-200 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {property.distanceMinutes} دقائق
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">الأسرة الكلية</p>
              <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{property.beds} سرير</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">الأسرة الشاغرة</p>
              <p className="font-bold text-emerald-700">{property.availableBeds} متاح الآن</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">الغرف</p>
              <p className="font-bold text-slate-900">{property.bedrooms} غرف نوم</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-500 mb-1">الحمامات</p>
              <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{property.bathrooms} حمام</span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">وصف السكن وموقعه بالتفصيل</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              {property.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>العنوان الدقيق: {property.address}</span>
            </div>
          </div>

          {/* Geographic Location & Interactive Proximity Map */}
          <div id="property-map-section" className="scroll-mt-6">
            <PropertyLocationMap 
              property={property} 
              university={matchedUniversity} 
            />
          </div>

          {/* Amenities & Features */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">المرافق والتجهيزات المتاحة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          {property.rules && property.rules.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">شروط وقواعد السكن</h3>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 text-xs text-amber-950">
                {property.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Owner Info & Platform Guarantee */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-base border border-slate-700 shadow-inner">
                  {property.ownerName.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base">{property.ownerName}</h4>
                    <span className="flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-lg text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{property.ownerRating || 4.8} / 5</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">مالك معتمد وموثق في طالب هوم • تقييمات إيجابية من الطلاب</p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                هوية موثقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="text-slate-300 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>ضمان وسيط منصة طالب هوم:</strong> عربونك محفوظ ولا يُصرف للمالك إلا بعد استلامك للشقة ومعاينتها.
                </span>
              </div>
              <div className="text-emerald-300 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>0% عمولة على الطالب:</strong> السكن بدون أي عمولة سمسرة أو رسوم إضافية على الطالب المستأجر نهائياً.
                </span>
              </div>
            </div>
          </div>

          {/* Booking / Action Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            {showBookingForm ? (
              <form onSubmit={handleBookingSubmit} className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h4 className="font-bold text-base text-blue-950 dark:text-blue-200">طلب حجز مباشر للسكن (مجاناً بدون أي عربون)</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">تاريخ بدء السكن المفضل</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">مدة الإيجار المبدئية</label>
                    <select
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                    >
                      <option value={1}>شهر واحد (تجريبي)</option>
                      <option value={3}>3 أشهر (فصل دراسي / تيرم)</option>
                      <option value={6}>6 أشهر (تيرم كامل)</option>
                      <option value={9}>9 أشهر (عام دراسي كامل)</option>
                      <option value={12}>سنة كاملة (12 شهر)</option>
                    </select>
                  </div>
                </div>

                {/* Notes Textarea (User requested) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    خانة الملاحظات والطلبات الخاصة للمالك
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="اكتب هنا أي ملاحظات خاصة (مثال: موعد الوصول المتوقع، هدوء للمذاكرة، عدد الزملاء، استفسارات خاصة بالأجهزة أو المرافق...)"
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden resize-none placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div className="p-3.5 bg-white dark:bg-slate-900/80 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>الإيجار الشهري المتفق عليه:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {property.priceMonthly.toLocaleString()} {property.currency || 'ج.م'}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>عربون الحجز:</span>
                    <span>مجاناً 0 {property.currency || 'ج.م'} (تم إلغاء العربون - بدون دفع مسبق)</span>
                  </div>
                  <div className="flex justify-between text-blue-700 dark:text-blue-400">
                    <span>عمولة السمسرة والمنصة:</span>
                    <span>0% مجاناً على الطالب نهائياً</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>إرسال طلب الحجز للمالك مباشرة (بدون أي عربون)</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      {property.priceMonthly.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {property.currency || 'ج.م'} / شهرياً
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    حجز مباشر بدون أي عربون أو عمولة سمسرة
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>طلب حجز السكن (مجاناً)</span>
                  </button>
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                    title="اتصال هاتفي"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
