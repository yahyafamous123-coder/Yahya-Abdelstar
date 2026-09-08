import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Compass, 
  Train, 
  HeartHandshake,
  Users,
  BadgePercent
} from 'lucide-react';
import { University, User } from '../types';
import { EGYPTIAN_GOVERNORATES, POPULAR_LOCATIONS } from '../data/mockData';

interface WelcomeViewProps {
  universities: University[];
  currentUser: User;
  onStartStudentSearch: (univId: string, governorate: string, gender: string, locationQuery?: string) => void;
  onSelectOwnerPath: () => void;
  onSkipToHome: () => void;
  onOpenAddUnit: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  universities,
  currentUser,
  onStartStudentSearch,
  onSelectOwnerPath,
  onSkipToHome,
  onOpenAddUnit
}) => {
  // Search state
  const [searchMode, setSearchMode] = useState<'university' | 'location'>('university');
  const [selectedUnivId, setSelectedUnivId] = useState('');
  const [selectedGov, setSelectedGov] = useState('');
  const [locationSearchText, setLocationSearchText] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'university') {
      onStartStudentSearch(selectedUnivId, selectedGov, genderFilter);
    } else {
      // Location based (even if far from university)
      onStartStudentSearch('', selectedGov, genderFilter, locationSearchText);
    }
  };

  const handleQuickLocationClick = (locName: string, gov: string) => {
    setLocationSearchText(locName);
    setSelectedGov(gov);
    setSearchMode('location');
    onStartStudentSearch('', gov, genderFilter, locName);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden" dir="rtl">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 space-y-12">
        
        {/* Top Header / Greeting */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-400 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مرحباً بك في المنصة الموثوقة لسكن طلاب الجامعات في مصر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            اختر سكنك في مصر <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
              قرب جامعتك أو في أي منطقة تفضلها
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            تصفح آلاف الشقق والاستوديوهات والأسرة المفروشة في جميع محافظات وجامعات مصر،
            <span className="text-emerald-400 font-bold mx-1">بدون أي عمولة سمسرة على الطالب (0%)</span>
            مع ضمان وسيط فوري لحماية العربون.
          </p>
        </div>

        {/* Quick Path Cards: Student vs Owner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Card 1: Student Path */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-800/50 rounded-3xl p-6 sm:p-7 border border-slate-700 hover:border-amber-400/60 transition-all shadow-xl group text-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <BadgePercent className="w-3.5 h-3.5" />
                  0% عمولة على الطالب
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                  أنا طالب / طالبة أبحث عن سكن
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  ابحث عن سكنك قرب كليتك، أو اختر السكن في حي هادئ وراقي بالمحافظة حتى لو كان بعيداً عن الجامعة مع خطوط المترو والمواصلات.
                </p>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 pt-1 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تغطية لجميع جامعات ومحافظات مصر (27 محافظة).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>عربونك في أمان تام ولا يُسلم للمالك إلا بعد المعاينة الفعلية.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartStudentSearch('', '', 'all')}
              className="mt-6 w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>تصفح كل الشقق المتاحة للطلاب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Owner Path */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-800/50 rounded-3xl p-6 sm:p-7 border border-slate-700 hover:border-blue-400/60 transition-all shadow-xl group text-right flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full">
                  سداد بفوري • أمان للمالك
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white group-hover:text-blue-300 transition-colors">
                  أنا صاحب عقار أو مؤجر
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  أعلن عن شقتك أو الغرف والأسرة المتاحة أمام آلاف الطلاب والطلبة المغتربين في محيط جامعتك أو حيك السكني.
                </p>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 pt-1 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>سداد باقة الإعلان بسهولة عبر كود فوري في أي منفذ.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>طلاب موثقون بكارنيه الكلية وعقد إيجار منظم.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={onOpenAddUnit}
                className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>أضف شقة جديدة الآن</span>
                <Building2 className="w-4 h-4" />
              </button>
              <button
                onClick={onSelectOwnerPath}
                className="py-3 px-4 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs transition-all"
              >
                <span>لوحة المالك</span>
              </button>
            </div>
          </div>
        </div>

        {/* Simplified Smart Search Box (University vs Location Mode) */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-900 text-right space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-500" />
                <span>البحث السريع عن السكن الجامعي</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                يمكنك البحث باسم الجامعة، أو اختيار المنطقة والحي بحرية تامة حتى لو كانت بعيدة عن كليتك
              </p>
            </div>

            {/* Mode Switch Pills */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setSearchMode('university')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  searchMode === 'university'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>حسب الجامعة ({universities.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('location')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  searchMode === 'location'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>حسب المنطقة والموقع الحر</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* If University Mode */}
              {searchMode === 'university' ? (
                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs font-bold text-slate-700 block">اختر الجامعة أو الكلية:</label>
                  <select
                    value={selectedUnivId}
                    onChange={(e) => setSelectedUnivId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-hidden"
                  >
                    <option value="">جميع جامعات مصر (حكومية، خاصة، أهلية)</option>
                    <optgroup label="الجامعات الحكومية">
                      {universities.filter(u => u.category === 'حكومية').map(u => (
                        <option key={u.id} value={u.id}>{u.name} - {u.governorate}</option>
                      ))}
                    </optgroup>
                    <optgroup label="الجامعات الأهلية والتكنولوجية">
                      {universities.filter(u => u.category === 'أهلية' || u.category === 'تكنولوجية').map(u => (
                        <option key={u.id} value={u.id}>{u.name} - {u.governorate}</option>
                      ))}
                    </optgroup>
                    <optgroup label="الجامعات الخاصة">
                      {universities.filter(u => u.category === 'خاصة').map(u => (
                        <option key={u.id} value={u.id}>{u.name} - {u.governorate}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              ) : (
                /* Location / Area Mode */
                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    المنطقة أو الحي المرغوب بالسكن فيه:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={locationSearchText}
                      onChange={(e) => setLocationSearchText(e.target.value)}
                      placeholder="مثال: المعادي، الدقي، التجمع، 6 أكتوبر، سموحة..."
                      className="w-full p-3 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  </div>
                </div>
              )}

              {/* Governorate Filter */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">المحافظة:</label>
                <select
                  value={selectedGov}
                  onChange={(e) => setSelectedGov(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-hidden"
                >
                  <option value="">كل محافظات مصر ({EGYPTIAN_GOVERNORATES.length} محافظة)</option>
                  {EGYPTIAN_GOVERNORATES.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">نوع السكن:</label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-hidden"
                >
                  <option value="all">الكل (شباب / بنات / عائلات)</option>
                  <option value="male">سكن طلاب (شباب فقط)</option>
                  <option value="female">سكن طالبات (بنات فقط)</option>
                </select>
              </div>

            </div>

            {/* Note regarding freedom of location */}
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              <Train className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>ملاحظة هامة:</strong> إذا كنت تفضل السكن في حي هادئ أو راقٍ بعيداً عن الجامعة (مثل المعادي، الشيخ زايد، التجمع، مدينة نصر)، فالأمر متاح تماماً والمنصة تعرض خطوط المترو والمواصلات المباشرة لكل شقة.
              </span>
            </div>

            {/* Submit Search Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Search className="w-4 h-4" />
              <span>بحث عن الشقق والوحدات المتاحة</span>
            </button>
          </form>

          {/* Quick Popular Locations Chips */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block mb-2">أشهر المناطق والأحياء السكنية المفضلة للطلاب:</span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.slice(0, 10).map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => handleQuickLocationClick(loc.name, loc.governorate)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 transition-colors border border-slate-200/80"
                >
                  {loc.name} ({loc.governorate})
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 4 Pillars of TalebHome Simplified */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-right">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
              0%
            </div>
            <h4 className="text-sm font-bold text-white">بدون أي عمولة</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              خدمة مجانية بالكامل لطلاب الجامعات بدون أي استقطاعات أو سمسرة خفية.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">كل جامعات مصر</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              تغطية شاملة لكافة الجامعات الحكومية، الأهلية، التكنولوجية، والخاصة.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">حرية اختيار الموقع</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              اسكن قرب الكلية مباشرة أو في أي حي هادئ ترغب فيه بالمحافظة.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">وسيط فوري المعتمد</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              عربونك محمي في الحساب الوسيط ولا يُصرف للمالك إلا بعد استلامك للشقة.
            </p>
          </div>
        </div>

        {/* Bottom Skip to Platform */}
        <div className="text-center pt-2">
          <button
            onClick={onSkipToHome}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors font-semibold"
          >
            <span>تخطي والدخول للصفحة الرئيسية مباشرة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
