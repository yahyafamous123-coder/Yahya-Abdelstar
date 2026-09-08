import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  Flame,
  Clock,
  Sparkles,
  PhoneCall,
  Star
} from 'lucide-react';
import { Property, University, ListingPackage, User } from '../types';
import { UnitCard } from './UnitCard';
import { EGYPTIAN_GOVERNORATES, POPULAR_LOCATIONS } from '../data/mockData';

interface HomeViewProps {
  properties: Property[];
  universities: University[];
  packages: ListingPackage[];
  currentUser: User;
  onSelectProperty: (property: Property) => void;
  onNavigate: (view: string) => void;
  onSearchWithFilter: (univId: string, gov: string, gender: string, locationQuery?: string) => void;
  onChoosePackage: (pkg: ListingPackage) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenAddUnitModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  universities,
  packages,
  currentUser,
  onSelectProperty,
  onNavigate,
  onSearchWithFilter,
  onChoosePackage,
  favorites,
  onToggleFavorite,
  onOpenAddUnitModal
}) => {
  const [searchMode, setSearchMode] = useState<'university' | 'location'>('university');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [locationSearchText, setLocationSearchText] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');

  const activeProperties = properties.filter((p) => p.status === 'active');
  const featuredProperties = activeProperties.slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'university') {
      onSearchWithFilter(selectedUniversity, selectedGovernorate, selectedGender, '');
    } else {
      onSearchWithFilter('', selectedGovernorate, selectedGender, locationSearchText);
    }
    onNavigate('explore');
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المنصة الأولى الموثوقة لسكن طلاب الجامعات في مصر</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold">
              <span>0% عمولة على الطالب • خدمة مجانية تماماً</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            سكنك الجامعي الأقرب لكليتك، <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
              بأمان وضمان وسيط كامل عبر فوري
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            نوصل طلاب الجامعات بأصحاب الشقق والوحدات السكنية المعتمدة في القاهرة، الجيزة، الإسكندرية، المنصورة وجميع المحافظات.
          </p>

          {/* Search Engine Box */}
          <div className="mt-8 bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/50 text-slate-800 text-right space-y-4">
            
            {/* Toggle Mode: University vs Location */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-700">حدد طريقة البحث المناسبة لك:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSearchMode('university')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    searchMode === 'university'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>حسب الجامعة المصرية</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('location')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    searchMode === 'location'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>حسب الحي / الموقع السكني</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* If University Mode */}
              {searchMode === 'university' ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">الجامعة أو الكلية:</label>
                  <div className="relative">
                    <select
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                    >
                      <option value="">جميع جامعات مصر ({universities.length})</option>
                      <optgroup label="جامعات حكومية">
                        {universities.filter(u => u.category === 'حكومية').map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.governorate})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="جامعات أهلية وتكنولوجية">
                        {universities.filter(u => u.category === 'أهلية' || u.category === 'تكنولوجية').map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.governorate})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="جامعات خاصة">
                        {universities.filter(u => u.category === 'خاصة').map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.governorate})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              ) : (
                /* Location / Area Mode */
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">الحي أو المنطقة السكنية:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={locationSearchText}
                      onChange={(e) => setLocationSearchText(e.target.value)}
                      placeholder="مثال: المعادي، الشيخ زايد، التجمع..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Select Governorate */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">المحافظة:</label>
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  <option value="">كل المحافظات ({EGYPTIAN_GOVERNORATES.length} محافظة)</option>
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Student Gender Filter */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">نوع السكن والنزلاء:</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  <option value="all">الكل (بنين / بنات / عائلات)</option>
                  <option value="female">سكن طالبات (بنات فقط)</option>
                  <option value="male">سكن طلاب (شباب فقط)</option>
                  <option value="any">شقة كاملة / متاح للجميع</option>
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 h-11 active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث عن سكن متاح</span>
                </button>
              </div>
            </form>

            {/* Note & Popular Location/Univ Chips */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200/60 font-medium">
                <span>💡 مسموح ومتاح تماماً اختيار السكن في أي حي هادئ أو راقٍ حتى لو كان بعيداً عن الجامعة مع خطوط المترو.</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium text-[11px]">مناطق وأحياء سكنية شائعة:</span>
                {POPULAR_LOCATIONS.slice(0, 8).map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => {
                      setLocationSearchText(loc.name);
                      setSelectedGovernorate(loc.governorate);
                      setSearchMode('location');
                      onSearchWithFilter('', loc.governorate, 'all', loc.name);
                      onNavigate('explore');
                    }}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 font-medium text-[11px] transition-colors"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Platform Stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-300">وحدات قريبة من الجامعات</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-white">فوري</p>
              <p className="text-xs text-slate-300">سداد إلكتروني معتمد وموثوق</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">0%</p>
              <p className="text-xs text-slate-300">عمولات وسماسرة عشوائيين</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-white">+1,200</p>
              <p className="text-xs text-slate-300">طالب وطالبة تم تسكينهم</p>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works (Students vs Owners vs TalebHome Intermediary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            آلية العمل ونموذج الوساطة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            كيف تضمن منصة «طالب هوم» حقوق الطرفين؟
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            نحن الوسيط المعتمد الذي ينظم العلاقة القانونية والمالية بين الطالب ومالك العقار بكل شفافية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: For Students */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-right space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. للطالب (المستأجر)</h3>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>تصفح شقق وأسرة قريبة بمشي الأقدام من كليتك.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>حجز السكن بدفع عربون وسيط عبر ماكينات فوري المنتشرة في مصر.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>العربون محمي في المنصة ولا يُسلّم للمالك إلا بعد معاينة الشقة والتأكد من مطابقتها.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: For Owners or Student Transparency */}
          {currentUser.role === 'student' ? (
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs hover:border-emerald-400 transition-all text-right space-y-4 bg-gradient-to-b from-emerald-50/20 to-white">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                0%
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. بدون عمولة سمسرة</h3>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>الخدمة مجانية 100% للطلاب، لا نخصم ولا نطلب أي عمولة من الطالب.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>أسعار معلنة وشفافة وتفاصيل العقد كاملة قبل دفع أي مبالغ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>تقييمات حقيقية لأصحاب العقارات من الطلاب السابقين بعد انتهاء فترة الإيجار.</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs hover:border-amber-400 transition-all text-right space-y-4 bg-gradient-to-b from-amber-50/30 to-white">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. لصاحب العقار (المؤجر)</h3>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>عرض شقتك أو الغرف والأسرة أمام آلاف الطلاب الجامعيين.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>اختيار باقة الإعلان المناسبة وتحديد شروط وقواعد السكن.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>سداد رسوم النشر بسهولة تامة عبر كود فوري في أي سوبرماركت أو منفذ.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Column 3: The TalebHome Platform Mediator */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md text-right space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. دورنا كوسيط وإدارة</h3>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>مراجعة واعتماد جميع الوحدات السكنية قبل ظهورها للطلاب.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>إدارة المعاملات المالية والتحقق التلقائي من مدفوعات فوري.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>صياغة نماذج عقود سكن طلاب تحفظ الاستقرار وتمنع الخلافات.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">وحدات وشقق متميزة بالقرب من الجامعات</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">شقق مفروشة، استوديوهات، وأسرة جاهزة للسكن الفوري</p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>عرض كل الشقق ({activeProperties.length})</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <UnitCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Packages / Student Advantages Section */}
      {currentUser.role === 'student' ? (
        <section className="bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-blue-150">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 border border-emerald-200 px-3.5 py-1 rounded-full">
                خدمة مجانية 100% للطلاب • 0% عمولة
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                لماذا يفضل طلاب الجامعات حجز سكنهم عبر «طالب هوم»؟
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                صممنا المنصة لتوفير أقصى درجات الأمان والراحة لطلاب وطالبات مصر دون أي تكاليف سمسرة إضافية.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs text-right space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  0%
                </div>
                <h3 className="font-bold text-base text-slate-900">بدون أي عمولة</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  لا نأخذ أي عمولة أو رسوم سمسرة من الطالب. كل ما تدفعه هو قيمة الإيجار الفعلي والعربون المسترد فقط.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-xs text-right space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                </div>
                <h3 className="font-bold text-base text-slate-900">تقييمات شفافة للملاك</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تعرف على تقييمات الطلاب السابقين لأي مالك ومدى التزامه بالصيانة والنظافة قبل دفع أي عربون.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs text-right space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">عربون محمي عبر فوري</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  عربونك يظل معلقاً في المنصة بأمان ولا يُسلم للمالك إلا بعد استلامك للشقة ومعاينتها بنفسك.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-xs text-right space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">أقرب مسافة لكليتك</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  فلاتر ذكية تحدد المسافة بالدقائق بمشي الأقدام أو المواصلات من باب كليتك مباشرة.
                </p>
              </div>
            </div>

            {/* Student CTA Banner */}
            <div className="mt-10 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-right">
                <h4 className="text-xl font-black text-amber-300">جاهز لاختيار سكنك الجامعي؟</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  تصفح مئات الشقق المفروشة والغرف المتاحة الآن بالقرب من جامعتك واحجز مكانك بأمان.
                </p>
              </div>
              <button
                onClick={() => onNavigate('explore')}
                className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <span>تصفح شقق وسكن الطلاب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-200/80 px-3 py-1 rounded-full">
                لأصحاب العقارات والملاك
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                باقات نشر وتأجير الشقق عبر وسيط فوري
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                اختر مدة ظهور شقتك للطلاب (أسبوع أو أسبوعين أو شهر)، وادفع رسوم الإعلان عبر كود فوري في ثوانٍ معدودة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between text-right relative shadow-xs hover:shadow-md ${
                    pkg.isPopular ? 'border-2 border-amber-500 shadow-amber-500/10 scale-102' : 'border-slate-200'
                  }`}
                >
                  {pkg.badge && (
                    <div className={`absolute -top-3 right-6 text-[10px] font-black px-3 py-0.5 rounded-full ${
                      pkg.isPopular ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-white'
                    }`}>
                      {pkg.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{pkg.durationText}</p>
                    </div>

                    <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                      <span className="text-3xl font-black text-slate-900">{pkg.priceEgp.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-500">ج.م فقط</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>ظهور فوري بعد مراجعة الإدارة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>سداد مباشر بكود خدمة فوري (788)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>إشعارات واتساب عند حجز طالب</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        if (currentUser.role !== 'owner') {
                          alert('يرجى التبديل لحساب صاحب عقار لإضافة الشقة والاشتراك بالباقة');
                        }
                        onChoosePackage(pkg);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        pkg.isPopular
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>اختر الباقة وسدد بفوري</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fawry Payment Trust Banner */}
            <div className="mt-12 bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shrink-0">
                  فوري
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-base text-slate-900">الدفع عبر فوري متاح في جميع أنحاء مصر</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    يمكنك سداد رسوم العرض أو عربون حجز السكن من أي كشك أو سوبرماركت به ماكينة فوري بكود الخدمة (788) والرقم المرجعي الفوري.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAddUnitModal}
                className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 flex items-center gap-2"
              >
                <span>أضف وحدتك السكنية الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>
      )}

    </div>
  );
};
