import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Heart, 
  ExternalLink, 
  Printer, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Receipt
} from 'lucide-react';
import { Booking, Property, User } from '../types';
import { UnitCard } from './UnitCard';

interface StudentDashboardProps {
  currentUser: User;
  bookings: Booking[];
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onNavigate: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  bookings,
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites'>('bookings');

  const myBookings = bookings.filter((b) => b.studentId === currentUser.id);
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Student Welcome Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>لوحة تحكم الطالب (المستأجر)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black">
            مرحباً يا {currentUser.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {currentUser.university || 'جامعة القاهرة'} • حجوزاتك موثقة وعربونك محفوظ لدى وسيط منصة طالب هوم.
          </p>
        </div>

        <button
          onClick={() => onNavigate('explore')}
          className="py-3 px-6 rounded-2xl bg-white text-blue-950 font-bold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition-colors shrink-0"
        >
          البحث عن سكن إضافي
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 space-x-reverse text-sm font-bold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>حجوزاتي وإيصالات فوري ({myBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'favorites'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>الشقق المفضلة المحفوظة ({favoriteProperties.length})</span>
        </button>
      </div>

      {/* Tab 1: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">لا توجد لديك أي حجوزات حالياً</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                تصفح آلاف الوحدات السكنية القريبة من جامعتك، واحجز سكنك بعربون رمزي مسترد عبر فوري.
              </p>
              <button
                onClick={() => onNavigate('explore')}
                className="py-2.5 px-6 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
              >
                تصفح الشقق الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all text-right"
                >
                  <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <img
                        src={b.propertyImage}
                        alt={b.propertyTitle}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border border-slate-100"
                      />

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            b.status === 'confirmed' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                            b.status === 'pending' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {b.status === 'confirmed' ? 'حجز معتمد من المالك' : 'طلب حجز مرسل للمالك'}
                          </span>

                          <span className="text-xs font-bold text-slate-400">
                            رقم الحجز: #{b.id}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {b.propertyTitle}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{b.propertyAddress} ({b.nearestUniversity})</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-1">
                          <span>الإيجار الشهري: <strong>{b.monthlyRent.toLocaleString()} {b.currency || 'ج.م'}</strong></span>
                          <span>•</span>
                          <span>المدة: <strong>{b.durationMonths} أشهر</strong></span>
                          <span>•</span>
                          <span>تاريخ البدء: <strong>{b.startDate}</strong></span>
                        </div>

                        {/* Notes field display */}
                        {b.notes && (
                          <div className="mt-2 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
                            <span className="font-bold">📝 ملاحظاتك للمالك: </span>
                            <span>{b.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Booking terms & zero deposit */}
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-right space-y-1 w-full md:w-auto shrink-0">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">عربون الحجز:</p>
                      <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {b.depositEgp && b.depositEgp > 0 ? `${b.depositEgp.toLocaleString()} ${b.currency || 'ج.م'}` : 'مجاناً بدون عربون'}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">حجز مباشر وتوثيق على المنصة</p>
                    </div>
                  </div>

                  {/* Owner Contact and Guarantee Footer */}
                  <div className="bg-slate-50/70 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {b.ownerName.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">المالك: {b.ownerName}</p>
                        <p className="text-[11px] text-slate-500" dir="ltr">{b.ownerPhone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={`tel:${b.ownerPhone}`}
                        className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>اتصال بالمالك</span>
                      </a>

                      <a
                        href={`https://wa.me/2${b.ownerPhone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>واتساب المالك</span>
                      </a>

                      <button
                        onClick={() => window.print()}
                        className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs"
                        title="طباعة إيصال الحجز"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">لا توجد وحدات محفوظة في المفضلة بعد</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                اضغط على أيقونة القلب في أي شقة أثناء التصفح لحفظها والرجوع إليها ومقارنتها في أي وقت.
              </p>
              <button
                onClick={() => onNavigate('explore')}
                className="py-2.5 px-6 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
              >
                استكشف الشقق المتاحة
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((property) => (
                <UnitCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
