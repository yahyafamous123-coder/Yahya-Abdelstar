import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Bed, 
  Bath, 
  Check, 
  Heart, 
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Property, StudentGender, PropertyType } from '../types';

interface UnitCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  property,
  onSelect,
  isFavorite = false,
  onToggleFavorite
}) => {
  const getGenderBadge = (gender: StudentGender) => {
    switch (gender) {
      case 'female':
        return { text: 'سكن طالبات (بنات)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'male':
        return { text: 'سكن طلاب (بنين)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'any':
        return { text: 'شقة كاملة / متاح للجميع', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const getTypeLabel = (type: PropertyType) => {
    switch (type) {
      case 'bed': return 'سرير في غرفة مشتركة';
      case 'room': return 'غرفة خاصة سنجل';
      case 'studio': return 'استوديو مستقل';
      case 'apartment': return 'شقة كاملة مفروشة';
      case 'chalet': return 'شاليه / دور فيلا';
    }
  };

  const genderInfo = getGenderBadge(property.gender);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-950/30 transition-all duration-300 overflow-hidden flex flex-col text-right">
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-xs ${genderInfo.bg}`}>
              {genderInfo.text}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-600/90 text-white backdrop-blur-md shadow-xs">
              0% عمولة
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(property.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
            title="حفظ في المفضلة"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Distance & Campus Badge */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{property.nearestUniversityName}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-flex items-center gap-1 bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white">
              🗺️ خريطة الموقع
            </span>
            <div className="flex items-center gap-1 bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded-lg font-bold text-[11px]">
              <Clock className="w-3 h-3 text-white" />
              <span>{property.distanceText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900">
        <div>
          {/* Subheader: Type, Rating, and Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                {getTypeLabel(property.type)}
              </span>
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 px-1.5 py-0.5 rounded-md font-black text-[11px]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{property.ownerRating || 4.8}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.city}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {property.title}
          </h3>

          {/* Specs: Beds, Rooms, Available */}
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.beds} سرير ({property.availableBeds} متاح)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} حمام</span>
            </div>
            {property.bedrooms > 0 && (
              <>
                <span>•</span>
                <span>{property.bedrooms} غرف</span>
              </>
            )}
          </div>

          {/* Transport Access highlight for flexible locations */}
          {property.transportAccess && (
            <div className="mt-2 text-[11px] text-blue-800 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/50 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900 font-medium truncate">
              🚇 {property.transportAccess}
            </div>
          )}
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 dark:text-white">{property.priceMonthly.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{property.currency || 'ج.م'} / شهرياً</span>
            </div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">حجز مباشر بدون أي عربون</p>
          </div>

          <button
            onClick={() => onSelect(property)}
            className="py-2 px-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>تفاصيل وحجز</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
