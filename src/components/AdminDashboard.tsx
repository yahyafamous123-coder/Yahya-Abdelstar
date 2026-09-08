import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CreditCard, 
  Users, 
  DollarSign, 
  Settings, 
  Eye, 
  AlertCircle,
  ExternalLink,
  Edit3,
  Save,
  Building2,
  GraduationCap,
  RefreshCw,
  Search
} from 'lucide-react';
import { Property, PaymentTransaction, ListingPackage, User } from '../types';

interface AdminDashboardProps {
  properties: Property[];
  transactions: PaymentTransaction[];
  packages: ListingPackage[];
  users: User[];
  onApproveProperty: (propertyId: string) => void;
  onRejectProperty: (propertyId: string, reason: string) => void;
  onUpdatePackagePrice: (packageId: string, newPriceEgp: number) => void;
  onConfirmTransactionPayment: (txId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  transactions,
  packages,
  users,
  onApproveProperty,
  onRejectProperty,
  onUpdatePackagePrice,
  onConfirmTransactionPayment,
  onSelectProperty
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'properties' | 'transactions' | 'packages' | 'users'>('pending');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingPropertyId, setRejectingPropertyId] = useState<string | null>(null);

  // Editable prices state
  const [editablePrices, setEditablePrices] = useState<{ [id: string]: number }>({
    pack_1week: packages.find((p) => p.id === 'pack_1week')?.priceEgp || 1000,
    pack_2weeks: packages.find((p) => p.id === 'pack_2weeks')?.priceEgp || 1800,
    pack_1month: packages.find((p) => p.id === 'pack_1month')?.priceEgp || 3000,
    pack_term: packages.find((p) => p.id === 'pack_term')?.priceEgp || 6500
  });

  const [priceSavedNotice, setPriceSavedNotice] = useState(false);

  const pendingProperties = properties.filter((p) => p.status === 'pending_approval');
  const activeProperties = properties.filter((p) => p.status === 'active');

  // Total collected revenue through Fawry for listing fees
  const totalRevenue = transactions
    .filter((t) => t.status === 'paid')
    .reduce((acc, curr) => acc + curr.amountEgp, 0);

  const handlePriceSave = (pkgId: string) => {
    const newPrice = editablePrices[pkgId];
    if (newPrice && newPrice > 0) {
      onUpdatePackagePrice(pkgId, newPrice);
      setPriceSavedNotice(true);
      setTimeout(() => setPriceSavedNotice(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>لوحة تحكم الإدارة والوسيط (منصة طالب هوم)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            إدارة المنصة، الموافقات، وعمولات فوري
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            اعتماد شقق الملاك قبل النشر، متابعة تسوية مدفوعات فوري، وتعديل أسعار باقات الإعلان ومدد العرض.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-right shrink-0">
          <p className="text-xs text-slate-300 font-medium">إجمالي مدفوعات فوري المحصلة</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-black text-amber-400">{totalRevenue.toLocaleString()}</span>
            <span className="text-xs font-bold text-slate-300">جنيه مصري</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">شقق بانتظار الاعتماد</p>
          <p className="text-2xl font-black text-amber-600">{pendingProperties.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">وحدات نشطة ومعروضة</p>
          <p className="text-2xl font-black text-emerald-600">{activeProperties.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">عمليات دفع فوري</p>
          <p className="text-2xl font-black text-blue-600">{transactions.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium mb-1">المستخدمين المسجلين</p>
          <p className="text-2xl font-black text-purple-600">{users.length} مستخدم</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-2 space-x-reverse text-sm font-bold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'pending'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>طلبات اعتماد الشقق ({pendingProperties.length})</span>
          {pendingProperties.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'transactions'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>سجل مدفوعات فوري ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'packages'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>التحكم بأسعار باقات العرض</span>
        </button>

        <button
          onClick={() => setActiveTab('properties')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'properties'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>كل الشقق والوحدات ({properties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>المستخدمين (الطلاب والملاك)</span>
        </button>
      </div>

      {/* Tab 1: Pending Approvals */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">مراجعة الجودة وضمان سكن الطلاب الموثوق:</p>
              <p className="mt-0.5 text-amber-800">
                الشقق المعروضة أدناه قام ملاكها بإدخال تفاصيلها وسداد رسوم باقة العرض بفوري. يرجى مراجعة المسافة للجامعة وجودة الصور والمواصفات قبل الموافقة على نشرها للطلاب.
              </p>
            </div>
          </div>

          {pendingProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">رائع! تم اعتماد جميع الشقق</h3>
              <p className="text-xs text-slate-500">لا توجد أي شقق معلقة بانتظار المراجعة في الوقت الحالي.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80'}
                      alt={property.title}
                      className="w-28 h-28 rounded-2xl object-cover shrink-0 border border-slate-200"
                    />

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          بانتظار موافقتك للنشر
                        </span>
                        <span className="text-xs text-slate-500">
                          المالك: <strong className="text-slate-900">{property.ownerName}</strong> ({property.ownerPhone})
                        </span>
                        <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                          {property.packageName}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base">
                        {property.title}
                      </h3>

                      <p className="text-xs text-slate-600">
                        {property.nearestUniversityName} • {property.distanceText} • {property.address}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-700 pt-1">
                        <span>الإيجار: <strong className="text-slate-900">{property.priceMonthly.toLocaleString()} ج.م / شهر</strong></span>
                        <span>•</span>
                        <span>التأمين: <strong>{property.depositEgp.toLocaleString()} ج.م</strong></span>
                        <span>•</span>
                        <span>{property.beds} سرير</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">رسوم العرض مسددة بفوري: {property.fawryReferenceNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      فحص كامل التفاصيل
                    </button>

                    <button
                      onClick={() => onApproveProperty(property.id)}
                      className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>اعتماد ونشر الشقة للطلاب</span>
                    </button>

                    <button
                      onClick={() => {
                        const reason = prompt('يرجى كتابة سبب الرفض لإشعار المالك:');
                        if (reason) onRejectProperty(property.id, reason);
                      }}
                      className="py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>رفض مع ذكر السبب</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Fawry Transactions Ledger */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">سجل عمليات الدفع الإلكتروني (فوري)</h3>
              <p className="text-xs text-slate-500">متابعة رسوم باقات العرض وعرابين حجز السكن عبر شبكة فوري</p>
            </div>
            <div className="text-xs font-bold text-slate-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              كود خدمة فوري المعتمد: <strong className="text-blue-700 font-mono">788</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">نوع المعاملة</th>
                  <th className="p-4">المبلغ (ج.م)</th>
                  <th className="p-4">رقم فوري المرجعي</th>
                  <th className="p-4">المستخدم</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">حالة السداد</th>
                  <th className="p-4">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{t.typeArabic}</p>
                      {t.propertyTitle && (
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">{t.propertyTitle}</p>
                      )}
                    </td>
                    <td className="p-4 font-black text-slate-900 text-sm">
                      {t.amountEgp.toLocaleString()} ج.م
                    </td>
                    <td className="p-4 font-mono font-bold text-blue-700">
                      {t.fawryReferenceNumber}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{t.userName}</p>
                      <p className="text-[11px] text-slate-400" dir="ltr">{t.userPhone}</p>
                    </td>
                    <td className="p-4 text-slate-500">
                      {t.createdAt}
                    </td>
                    <td className="p-4">
                      {t.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تم السداد
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          بانتظار السداد
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {t.status === 'pending' && (
                        <button
                          onClick={() => onConfirmTransactionPayment(t.id)}
                          className="py-1 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                        >
                          تأكيد السداد الآن
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Package Pricing & Listing Durations Settings (Requirements #2 & #4) */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  لوحة التحكم بأسعار باقات العرض والعمولات (للإدارة)
                </h3>
                <p className="text-xs text-slate-500">
                  تعديل أسعار باقات النشر للمالك (مثل أسبوع بـ 1,000 ج.م أو أسبوعين بـ 1,800 ج.م). يتم تطبيق التعديل فوراً للملاك عند الدفع بفوري.
                </p>
              </div>

              {priceSavedNotice && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  تم حفظ السعر وتحديث باقات المنصة بنجاح!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => {
                const currentPrice = editablePrices[pkg.id] ?? pkg.priceEgp;
                return (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 text-right"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{pkg.name}</h4>
                        <span className="text-xs text-slate-500 font-medium">المدة: {pkg.durationText}</span>
                      </div>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                        دفع فوري
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          سعر الباقة الحالي بالجنيه المصري:
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={100}
                            step={100}
                            value={currentPrice}
                            onChange={(e) =>
                              setEditablePrices((prev) => ({
                                ...prev,
                                [pkg.id]: Number(e.target.value)
                              }))
                            }
                            className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-sm font-black text-slate-900 focus:ring-2 focus:ring-purple-500 outline-hidden"
                          />
                          <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">ج.م</span>
                        </div>
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={() => handlePriceSave(pkg.id)}
                          className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs h-10"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>حفظ السعر</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: All Properties */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">جميع الوحدات السكنية في قاعدة البيانات</h3>
            <p className="text-xs text-slate-500">حالة الوحدات، أصحابها، والجامعات القريبة</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">الوحدة السكنية</th>
                  <th className="p-4">الجامعة الأقرب</th>
                  <th className="p-4">المالك</th>
                  <th className="p-4">الإيجار الشهري</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">المشاهدات</th>
                  <th className="p-4">معاينة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-slate-900 max-w-xs truncate">
                      {p.title}
                    </td>
                    <td className="p-4 text-slate-600">
                      {p.nearestUniversityName} ({p.distanceText})
                    </td>
                    <td className="p-4">
                      {p.ownerName}
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {p.priceMonthly.toLocaleString()} ج.م
                    </td>
                    <td className="p-4">
                      {p.status === 'active' && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          نشط
                        </span>
                      )}
                      {p.status === 'pending_approval' && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                          قيد المراجعة
                        </span>
                      )}
                      {p.status === 'rejected' && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
                          مرفوض
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500">
                      {p.viewsCount || 0}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => onSelectProperty(p)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="معاينة"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">المستخدمين المسجلين (الطلاب وأصحاب العقارات)</h3>
            <p className="text-xs text-slate-500">إدارة الحسابات، التحقق من بطاقات الهوية، والصلاحيات</p>
          </div>

          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div key={u.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    u.role === 'student' ? 'bg-blue-100 text-blue-800' :
                    u.role === 'owner' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {u.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{u.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                        u.role === 'student' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        u.role === 'owner' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-purple-50 text-purple-800'
                      }`}>
                        {u.role === 'student' ? 'طالب' : u.role === 'owner' ? 'صاحب عقار' : 'إدارة'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {u.email} • هاتف: <span dir="ltr">{u.phone}</span>
                      {u.university && ` • ${u.university}`}
                      {u.nationalId && ` • الرقم القومي: ${u.nationalId}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    موثق
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
