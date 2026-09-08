import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Eye, 
  Users, 
  Phone, 
  Calendar, 
  ArrowLeft,
  XCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Property, Booking, ListingPackage, User } from '../types';

interface OwnerDashboardProps {
  currentUser: User;
  properties: Property[];
  bookings: Booking[];
  packages: ListingPackage[];
  onOpenAddUnitModal: () => void;
  onPayListingFee: (property: Property, pkg: ListingPackage) => void;
  onConfirmBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  currentUser,
  properties,
  bookings,
  packages,
  onOpenAddUnitModal,
  onPayListingFee,
  onConfirmBooking,
  onRejectBooking,
  onSelectProperty
}) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'bookings' | 'packages'>('properties');

  // Filter properties owned by this owner
  const myProperties = properties.filter((p) => p.ownerId === currentUser.id);
  const myBookings = bookings.filter((b) => b.ownerId === currentUser.id);

  const totalViews = myProperties.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const activeCount = myProperties.filter((p) => p.status === 'active').length;
  const pendingCount = myProperties.filter((p) => p.status === 'pending_approval').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Top Banner with Owner Info & Add Unit CTA */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-slate-950 text-white text-[11px] font-bold px-3 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>لوحة تحكم صاحب العقار (المؤجر)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            أهلاً بك، {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-900/80 max-w-xl">
            إدارة كاملة لوحداتك السكنية، متابعة الحجوزات الواردة من الطلاب، وتجديد باقات الإعلان عبر شبكة فوري.
          </p>
        </div>

        <button
          onClick={onOpenAddUnitModal}
          className="py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>إضافة شقة / وحدة سكنية جديدة</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">إجمالي شققي المعروضة</p>
          <p className="text-2xl font-black text-slate-900">{myProperties.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">وحدات نشطة ومعتمدة</p>
          <p className="text-2xl font-black text-emerald-600">{activeCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">قيد مراجعة الإدارة</p>
          <p className="text-2xl font-black text-amber-600">{pendingCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">طلبات حجز الطلاب</p>
          <p className="text-2xl font-black text-blue-600">{myBookings.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 space-x-reverse text-sm font-bold">
        <button
          onClick={() => setActiveTab('properties')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'properties'
              ? 'border-amber-500 text-slate-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>وحداتي وشققي ({myProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-amber-500 text-slate-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>طلبات حجز الطلاب ({myBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'packages'
              ? 'border-amber-500 text-slate-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>باقات العرض وسداد فوري</span>
        </button>
      </div>

      {/* Tab 1: Properties List */}
      {activeTab === 'properties' && (
        <div className="space-y-4">
          {myProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">لم تقم بإضافة أي وحدة سكنية بعد</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                اعرض شقتك، استوديو، أو أسرة للطلاب، واختر باقة العرض المناسبة لك وسدد رسومها عبر فوري فوراً.
              </p>
              <button
                onClick={onOpenAddUnitModal}
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
              >
                أضف أول شقة الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80'}
                      alt={property.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 border border-slate-100"
                    />

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {property.status === 'active' && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            معروض ونشط للطلاب
                          </span>
                        )}
                        {property.status === 'pending_approval' && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            قيد مراجعة واعتماد الإدارة
                          </span>
                        )}
                        {property.status === 'rejected' && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            مرفوض: {property.rejectionReason || 'يرجى مراجعة المواصفات'}
                          </span>
                        )}

                        <span className="text-[11px] text-slate-500 font-medium">
                          {property.packageName}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {property.title}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {property.nearestUniversityName} • {property.distanceText} • {property.city}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-700 pt-1">
                        <span className="font-black text-slate-900">{property.priceMonthly.toLocaleString()} ج.م / شهر</span>
                        <span>•</span>
                        <span>{property.beds} سرير ({property.availableBeds} متاح)</span>
                        <span>•</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {property.viewsCount || 0} مشاهدة
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Fawry status */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {property.listingPaymentStatus === 'unpaid' ? (
                      <button
                        onClick={() => {
                          const pkg = packages.find((p) => p.id === property.listingPackageId) || packages[1];
                          onPayListingFee(property, pkg);
                        }}
                        className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>سداد رسوم العرض عبر فوري</span>
                      </button>
                    ) : (
                      <div className="text-right sm:text-left pl-2">
                        <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          رسوم العرض مسددة
                        </p>
                        <p className="text-[10px] text-slate-400">ينتهي العرض: {property.expiresAt}</p>
                      </div>
                    )}

                    <button
                      onClick={() => onSelectProperty(property)}
                      className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors"
                    >
                      معاينة الإعلان
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookings received from Students */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">لا توجد طلبات حجز جديدة حتى الآن</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                عندما يقوم أي طالب بطلب حجز وحدتك وسداد العربون عبر فوري، ستظهر تفاصيله هنا للتأكيد والتواصل.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        b.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {b.status === 'confirmed' ? 'حجز مؤكد' : b.status === 'pending' ? 'بانتظار موافقتك' : 'ملغي'}
                      </span>
                      <span className="text-xs text-slate-400">تاريخ الطلب: {b.createdAt}</span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900">{b.propertyTitle}</h4>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>الطالب: <strong className="text-slate-900">{b.studentName}</strong></span>
                      <span>•</span>
                      <span>الكلية/الجامعة: {b.studentUniversity}</span>
                      <span>•</span>
                      <span>رقم الهاتف: <strong dir="ltr">{b.studentPhone}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">العربون المسدد بفوري: {b.depositEgp.toLocaleString()} ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                    {b.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onConfirmBooking(b.id)}
                          className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                        >
                          تأكيد وقبول الحجز
                        </button>
                        <button
                          onClick={() => onRejectBooking(b.id)}
                          className="py-2.5 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
                        >
                          اعتذار
                        </button>
                      </>
                    )}

                    <a
                      href={`https://wa.me/2${b.studentPhone.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>محادثة واتساب الطالب</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Listing Packages Showcase with direct Fawry Action */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <CreditCard className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">رسوم وعمولات العرض عبر وسيط فوري:</p>
              <p className="mt-0.5 text-amber-800">
                عند إضافة أي شقة، تختار باقة العرض والمدة المطلوبة. يقوم النظام بتوليد رقم دفع فوري مرجعي. بعد السداد، تخضع الشقة للمراجعة والاعتماد وتظهر مباشرة لآلاف الطلاب.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                    {pkg.durationText}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{pkg.name}</h4>
                  <div className="flex items-baseline gap-1 py-1">
                    <span className="text-3xl font-black text-slate-900">{pkg.priceEgp.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">ج.م</span>
                  </div>
                  <p className="text-xs text-slate-600">{pkg.description}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={onOpenAddUnitModal}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                  >
                    استخدم هذه الباقة لشقة جديدة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
