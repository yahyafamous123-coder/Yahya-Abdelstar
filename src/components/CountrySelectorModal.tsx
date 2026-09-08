import React, { useState } from 'react';
import { Globe, Check, Search, X, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { COUNTRIES, CountryInfo } from '../data/countriesData';

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryInfo;
  onSelectCountry: (country: CountryInfo) => void;
  isFirstVisit?: boolean;
}

export const CountrySelectorModal: React.FC<CountrySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
  isFirstVisit = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.enName.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.currency.toLowerCase().includes(q) ||
      c.majorCities.some(city => city.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        id="country-selector-modal"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200 text-right"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 p-6 sm:p-7 text-white relative">
          {!isFirstVisit && (
            <button
              onClick={onClose}
              className="absolute left-4 top-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
                تغطية دولية شاملة لسكن الطلاب
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {isFirstVisit ? 'مرحباً بك! اختر دولتك لبدء التصفح' : 'تغيير دولة السكن والجامعات'}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            سيتم تخصيص الجامعات، العملة، خطط الإيجار، وعناوين الشقق تلقائياً وفقاً للدولة المختارة، مع حفظ اختيارك للزيارات القادمة.
          </p>

          {/* Search bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="ابحث بالدولة أو المدينة أو العملة (مثال: مصر، السعودية، لندن، تركيا...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-10 pl-4 rounded-2xl bg-white/15 dark:bg-black/30 backdrop-blur-md border border-white/25 text-white placeholder-slate-300 text-xs sm:text-sm outline-hidden focus:ring-2 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-slate-300 absolute right-3.5 top-3.5" />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  onClick={() => {
                    onSelectCountry(country);
                    if (!isFirstVisit) onClose();
                  }}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-50/80 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl shadow-xs rounded-lg p-0.5">{country.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {country.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                          ({country.enName})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                          العملة: {country.currency} ({country.currencyCode})
                        </span>
                        <span>•</span>
                        <span>{country.phonePrefix}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 mr-2">
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 group-hover:border-blue-400 flex items-center justify-center" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <p className="font-bold text-sm">لم يتم العثور على دولة تطابق "{searchQuery}"</p>
              <p className="text-xs mt-1">جرب البحث باسم الدولة أو العاصمة</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>يمكنك دائماً تغيير الدولة في أي وقت من شريط التنقل العلوي.</span>
          </div>

          <button
            onClick={() => {
              onSelectCountry(selectedCountry);
              onClose();
            }}
            className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            تأكيد ومتابعة التصفح
          </button>
        </div>
      </div>
    </div>
  );
};
