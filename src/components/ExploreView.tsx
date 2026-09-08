import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  GraduationCap, 
  MapPin, 
  SlidersHorizontal,
  Bed,
  Check,
  Compass,
  Train
} from 'lucide-react';
import { Property, University, StudentGender, PropertyType } from '../types';
import { UnitCard } from './UnitCard';
import { EGYPTIAN_GOVERNORATES, POPULAR_LOCATIONS } from '../data/mockData';

interface ExploreViewProps {
  properties: Property[];
  universities: University[];
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialUniversityId?: string;
  initialGovernorate?: string;
  initialGender?: string;
  initialLocationQuery?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  properties,
  universities,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  initialUniversityId = '',
  initialGovernorate = '',
  initialGender = 'all',
  initialLocationQuery = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialLocationQuery);
  const [selectedUniversity, setSelectedUniversity] = useState(initialUniversityId);
  const [selectedGovernorate, setSelectedGovernorate] = useState(initialGovernorate);
  const [selectedDistrict, setSelectedDistrict] = useState(initialLocationQuery);
  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [allowFarDistances, setAllowFarDistances] = useState<boolean>(true);
  const [maxDistanceMinutes, setMaxDistanceMinutes] = useState<number>(45);
  const [sortBy, setSortBy] = useState<'distance' | 'price_asc' | 'price_desc' | 'newest'>('newest');

  // Only show active approved listings
  const activeProperties = useMemo(() => {
    return properties.filter((p) => p.status === 'active');
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return activeProperties
      .filter((p) => {
        // Search term & District
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(term);
          const matchCity = p.city.toLowerCase().includes(term);
          const matchAddress = p.address.toLowerCase().includes(term);
          const matchUniv = p.nearestUniversityName.toLowerCase().includes(term);
          const matchDistrict = p.areaDistrict?.toLowerCase().includes(term);
          const matchTransport = p.transportAccess?.toLowerCase().includes(term);
          if (!matchTitle && !matchCity && !matchAddress && !matchUniv && !matchDistrict && !matchTransport) {
            return false;
          }
        }

        // Selected District specifically
        if (selectedDistrict) {
          const distTerm = selectedDistrict.toLowerCase();
          const inCity = p.city.toLowerCase().includes(distTerm);
          const inAddress = p.address.toLowerCase().includes(distTerm);
          const inArea = p.areaDistrict?.toLowerCase().includes(distTerm);
          if (!inCity && !inAddress && !inArea) {
            return false;
          }
        }

        // University
        if (selectedUniversity && p.nearestUniversityId !== selectedUniversity) {
          return false;
        }

        // Governorate
        if (selectedGovernorate && !p.governorate.includes(selectedGovernorate)) {
          return false;
        }

        // Gender
        if (selectedGender !== 'all' && p.gender !== selectedGender) {
          return false;
        }

        // Unit Type
        if (selectedType !== 'all' && p.type !== selectedType) {
          return false;
        }

        // Max price
        if (p.priceMonthly > maxPrice) {
          return false;
        }

        // Max walking distance (only applied if not allowing far distances)
        if (!allowFarDistances && p.distanceMinutes > maxDistanceMinutes) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distanceMinutes - b.distanceMinutes;
        if (sortBy === 'price_asc') return a.priceMonthly - b.priceMonthly;
        if (sortBy === 'price_desc') return b.priceMonthly - a.priceMonthly;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [
    activeProperties,
    searchTerm,
    selectedDistrict,
    selectedUniversity,
    selectedGovernorate,
    selectedGender,
    selectedType,
    maxPrice,
    allowFarDistances,
    maxDistanceMinutes,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('');
    setSelectedUniversity('');
    setSelectedGovernorate('');
    setSelectedGender('all');
    setSelectedType('all');
    setMaxPrice(10000);
    setAllowFarDistances(true);
    setMaxDistanceMinutes(45);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-right">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تصفح شقق ووحدات سكن الطلاب
            </h1>
            <span className="hidden sm:inline-flex text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
              0% عمولة على الطالب
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            جميع الوحدات مفروشة وجاهزة للمعاينة والحجز الفوري بضمان وسيط فوري • بدون أي عمولة سمسرة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">الترتيب حسب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
          >
            <option value="distance">الأقرب للجامعة بالدقائق</option>
            <option value="price_asc">الأقل سعراً أولاً</option>
            <option value="price_desc">الأعلى سعراً أولاً</option>
            <option value="newest">الأحدث إضافة</option>
          </select>
        </div>
      </div>

      {/* Main Layout: Filters + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>تصفية النتائج</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة ضبط</span>
            </button>
          </div>

          {/* Search Term */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">بحث سريع أو اسم الحي:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: المعادي، التجمع، الشيخ زايد، الدقي..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Governorate Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">المحافظة:</label>
            <select
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white outline-hidden"
            >
              <option value="">جميع محافظات مصر ({EGYPTIAN_GOVERNORATES.length} محافظة)</option>
              {EGYPTIAN_GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          {/* Popular Locations & Districts */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>المنطقة أو الحي السكني:</span>
              <span className="text-[10px] text-blue-600 font-normal">اختياري</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white outline-hidden"
            >
              <option value="">كل الأحياء والمناطق</option>
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name} ({loc.governorate})
                </option>
              ))}
            </select>
          </div>

          {/* University Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">الجامعة أو الأكاديمية القريبة:</label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white outline-hidden"
            >
              <option value="">جميع جامعات مصر (بدون حصر)</option>
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

          {/* Far Distances / Flexible Location Policy */}
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/70 space-y-2">
            <label className="flex items-start gap-2 text-xs font-bold text-amber-950 cursor-pointer">
              <input
                type="checkbox"
                checked={allowFarDistances}
                onChange={(e) => setAllowFarDistances(e.target.checked)}
                className="mt-0.5 rounded-md text-amber-600 focus:ring-amber-500"
              />
              <span>السماح بمناطق بعيدة عن الجامعة (أحياء هادئة أو راقية)</span>
            </label>
            <p className="text-[10px] text-amber-800 leading-relaxed pr-5">
              مسموح ومناسب للطلاب الراغبين في السكن بأحياء سكنية هادئة (مثل المعادي، زايد، التجمع) مع سهولة الوصول عبر المترو والمواصلات.
            </p>
          </div>

          {/* Gender Policy */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">فئة ونوع السكن:</label>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'female', label: 'سكن طالبات (بنات فقط)' },
                { id: 'male', label: 'سكن طلاب (شباب فقط)' },
                { id: 'any', label: 'شقة كاملة / متاح للجميع' }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === item.id}
                    onChange={() => setSelectedGender(item.id)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Housing Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">نوع الوحدة السكنية:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white outline-hidden"
            >
              <option value="all">كل أنواع السكن</option>
              <option value="bed">سرير في غرفة مشتركة</option>
              <option value="room">غرفة خاصة سنجل</option>
              <option value="studio">استوديو مستقل</option>
              <option value="apartment">شقة كاملة مفروشة</option>
              <option value="chalet">شاليه / دور فيلا</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>أقصى إيجار شهري:</span>
              <span className="text-blue-600">{maxPrice.toLocaleString()} ج.م</span>
            </div>
            <input
              type="range"
              min={1000}
              max={10000}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>أقصى مسافة للجامعة:</span>
              <span className="text-blue-600">{maxDistanceMinutes} دقائق</span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={maxDistanceMinutes}
              onChange={(e) => setMaxDistanceMinutes(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>تم العثور على {filteredProperties.length} وحدة سكنية مناسبة</span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">لا توجد وحدات تطابق هذه التصفية حالياً</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                جرب تخفيف شروط البحث أو توسيع نطاق المسافة والمحافظة للوصول إلى خيارات أكثر.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2.5 px-5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                عرض كل الشقق المتاحة
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <UnitCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
