import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Building2, 
  Sparkles, 
  ArrowLeft,
  Clock,
  PhoneCall
} from 'lucide-react';
import { ListingPackage, User } from '../types';

interface PackagesViewProps {
  packages: ListingPackage[];
  currentUser: User;
  onChoosePackage: (pkg: ListingPackage) => void;
  onOpenAddUnitModal: () => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  packages,
  currentUser,
  onChoosePackage,
  onOpenAddUnitModal
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-right">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <CreditCard className="w-4 h-4 text-amber-700" />
          <span>باقات العرض والعمولات الإعلانية للملاك</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          اعرض شقتك أمام آلاف الطلاب <br />
          <span className="text-amber-600">وادفع رسوم الإعلان بسهولة عبر شبكة فوري</span>
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          منصة طالب هوم تتيح لأصحاب العقارات والشقق بالقرب من الجامعات المصرية عرض وحداتهم وفق مدد محددة (أسبوع، أسبوعين، أو شهر) برسوم موحدة ومضمونة.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between text-right relative shadow-xs hover:shadow-lg ${
              pkg.isPopular ? 'border-2 border-amber-500 shadow-amber-500/10' : 'border-slate-200'
            }`}
          >
            {pkg.badge && (
              <div className={`absolute -top-3.5 right-6 text-[10px] font-black px-3 py-1 rounded-full ${
                pkg.isPopular ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-white'
              }`}>
                {pkg.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-bold">{pkg.durationText}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{pkg.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 py-3 border-y border-slate-100">
                <span className="text-3xl font-black text-slate-900">{pkg.priceEgp.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-500">ج.م فقط</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed min-h-[50px]">
                {pkg.description}
              </p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ظهور معتمد في نتائج البحث بالجامعة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>سداد فوري بكود الخدمة (788)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تأكيد الحجوزات واستلام عربون الطالب</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>إمكانية التجديد بضغطة زر</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onChoosePackage(pkg);
                  onOpenAddUnitModal();
                }}
                className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                  pkg.isPopular
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>اشترك الآن بالشقة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* How Fawry Works in TalebHome */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-amber-400">خطوات الدفع والتأكيد عبر فوري (Fawry)</h2>
          <p className="text-xs sm:text-sm text-slate-300">نظام بسيط وسريع يتيح لك السداد من أي منفذ أو تطبيق في مصر</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-white">إضافة الشقة واختيار الباقة</h4>
            <p className="text-xs text-slate-400">أدخل بيانات السكن واختر مدة العرض (أسبوع، أسبوعين، شهر).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-white">استخراج رقم فوري المرجعي</h4>
            <p className="text-xs text-slate-400">يظهر لك كود دفع فوري مكون من 9 أرقام مع مهلة سداد 48 ساعة.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-white">الدفع في أي كشك أو تطبيق</h4>
            <p className="text-xs text-slate-400">ادفع بكود خدمة طالب هوم (788) في أي كشك أو من خلال تطبيق myFawry.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-sm">
              4
            </div>
            <h4 className="font-bold text-sm text-white">اعتماد الوحدة ونشرها</h4>
            <p className="text-xs text-slate-400">تصل إشعار فوري للإدارة ويتم نشر الشقة فوراً للطلاب الباحثين.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-slate-900 text-center">الأسئلة الشائعة حول باقات العرض وفوري</h3>
        
        <div className="space-y-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">هل يمكنني تجديد الباقة بعد انتهاء أسبوعين؟</h4>
            <p className="text-slate-600 leading-relaxed">
              نعم، يظهر لك زر التجديد في لوحة تحكم المالك بضغطة زر، ويتم توليد كود فوري جديد لاستمرار ظهور الشقة.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">ماذا يحدث إذا تم حجز الشقة قبل انتهاء مدة الباقة؟</h4>
            <p className="text-slate-600 leading-relaxed">
              يمكنك تحويل حالة الشقة إلى «محجوزة بالكامل» أو استبدالها بغرفة أو سرير آخر داخل نفس العقار دون رسوم إضافية.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">كيف يستلم المالك عربون الحجز من الطالب؟</h4>
            <p className="text-slate-600 leading-relaxed">
              يدفع الطالب العربون عبر فوري كوسيط، وتضمن المنصة تحويله للمالك بعد استلام الطالب للغرفة وتوقيع عقد الإيجار.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
