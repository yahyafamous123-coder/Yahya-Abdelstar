import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  GraduationCap, 
  Navigation, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Footprints,
  Train,
  Maximize2
} from 'lucide-react';
import { Property, University } from '../types';
import { UNIVERSITY_COORDINATES, getPropertyCoordinates, calculateDistanceKm } from '../utils/geoUtils';

interface PropertyLocationMapProps {
  property: Property;
  university?: University;
}

export const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  property,
  university
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number>(0.5);

  // Compute coordinates
  const univId = property.nearestUniversityId;
  const univCoords = (univId && UNIVERSITY_COORDINATES[univId]) || { lat: 30.0261, lng: 31.2118 };
  const propertyCoords = getPropertyCoordinates(property, univCoords);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy prior map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const calculatedKm = calculateDistanceKm(
      propertyCoords.lat,
      propertyCoords.lng,
      univCoords.lat,
      univCoords.lng
    );
    setDistanceKm(calculatedKm);

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [propertyCoords.lat, propertyCoords.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap Tiles (Fast, high-contrast, free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Zoom control on top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Custom HTML Icons for modern look & feel
    const apartmentHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-9 h-9 bg-blue-500/20 rounded-full animate-ping"></div>
        <div class="relative z-10 w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center border-2 border-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <div class="absolute -bottom-1 w-2.5 h-2.5 bg-indigo-700 rotate-45 border-r border-b border-white"></div>
      </div>
    `;

    const universityHtml = `
      <div class="relative flex items-center justify-center">
        <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center border-2 border-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
        <div class="absolute -bottom-1 w-2.5 h-2.5 bg-purple-800 rotate-45 border-r border-b border-white"></div>
      </div>
    `;

    const aptIcon = L.divIcon({
      html: apartmentHtml,
      className: 'custom-map-icon',
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -42]
    });

    const univIcon = L.divIcon({
      html: universityHtml,
      className: 'custom-map-icon',
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -42]
    });

    // Apartment Marker
    const aptMarker = L.marker([propertyCoords.lat, propertyCoords.lng], { icon: aptIcon }).addTo(map);
    aptMarker.bindPopup(`
      <div dir="rtl" class="font-['Cairo'] text-right p-1 max-w-[220px]">
        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 mb-1">موقع الشقة المعروضة</span>
        <h4 class="font-bold text-xs text-slate-900 leading-snug">${property.title}</h4>
        <p class="text-[11px] text-slate-600 mt-1">${property.address}</p>
        <p class="text-[11px] font-bold text-blue-700 mt-1">${property.priceMonthly.toLocaleString()} ج.م / شهرياً</p>
      </div>
    `);

    // University Marker
    const univMarker = L.marker([univCoords.lat, univCoords.lng], { icon: univIcon }).addTo(map);
    univMarker.bindPopup(`
      <div dir="rtl" class="font-['Cairo'] text-right p-1 max-w-[220px]">
        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 mb-1">الحرم الجامعي</span>
        <h4 class="font-bold text-xs text-slate-900 leading-snug">${property.nearestUniversityName}</h4>
        <p class="text-[11px] text-slate-600 mt-1">${university?.campusArea || property.governorate}</p>
      </div>
    `);

    // Draw dashed connecting path
    const routeLine = L.polyline(
      [
        [propertyCoords.lat, propertyCoords.lng],
        [univCoords.lat, univCoords.lng]
      ],
      {
        color: '#4f46e5',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }
    ).addTo(map);

    // Fit map bounds to show both markers with margin
    const bounds = L.latLngBounds([
      [propertyCoords.lat, propertyCoords.lng],
      [univCoords.lat, univCoords.lng]
    ]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });

    // Open apartment popup by default
    aptMarker.openPopup();

    // Trigger invalidateSize after initial render
    const timer = setTimeout(() => {
      map.invalidateSize();
      setMapReady(true);
    }, 250);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [property, propertyCoords.lat, propertyCoords.lng, univCoords.lat, univCoords.lng, university]);

  // Recenter controls
  const handleRecenterUnit = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([propertyCoords.lat, propertyCoords.lng], 16, { duration: 0.8 });
  };

  const handleRecenterUniv = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([univCoords.lat, univCoords.lng], 16, { duration: 0.8 });
  };

  const handleFitBounds = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds([
      [propertyCoords.lat, propertyCoords.lng],
      [univCoords.lat, univCoords.lng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  // Google Maps Direction URL for student reference
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${propertyCoords.lat},${propertyCoords.lng}&destination=${univCoords.lat},${univCoords.lng}&travelmode=walking`;

  return (
    <div className="space-y-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* Map Header with Real Proximity Specs */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-indigo-50/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Navigation className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              الموقع الجغرافي الدقيق ومسار الوصول للجامعة
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            خريطة تفاعلية حية تبين موقع السكن ونقطة وصوله إلى {property.nearestUniversityName}
          </p>
        </div>

        {/* Verified Geography Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>موقع موثق جغرافياً</span>
          </span>
        </div>
      </div>

      {/* Proximity Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 px-4 sm:px-5">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
            <Footprints className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-bold text-slate-600">وقت الوصول</span>
          </div>
          <p className="text-xs font-black text-slate-900">{property.distanceText}</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
            <Navigation className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] font-bold text-slate-600">المسافة الفعلية</span>
          </div>
          <p className="text-xs font-black text-indigo-700">
            {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} متر تقريباً` : `${distanceKm} كم`}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] font-bold text-slate-600">الجامعة المجاورة</span>
          </div>
          <p className="text-xs font-bold text-slate-900 truncate" title={property.nearestUniversityName}>
            {property.nearestUniversityName}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
            <Train className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] font-bold text-slate-600">خطوط المواصلات</span>
          </div>
          <p className="text-xs font-bold text-amber-900 truncate" title={property.transportAccess || 'مواصلات ومترو متاح'}>
            {property.transportAccess || 'مواصلات مباشرة'}
          </p>
        </div>
      </div>

      {/* Interactive Map Box */}
      <div className="relative mx-4 sm:mx-5 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
        
        {/* Leaflet container */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-72 sm:h-80 z-0"
          style={{ minHeight: '280px' }}
        />

        {/* Floating Map Controls & Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={handleRecenterUnit}
            className="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-102"
            title="تركيز الكاميرا على موقع الشقة"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>موقع الشقة</span>
          </button>

          <button
            type="button"
            onClick={handleRecenterUniv}
            className="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-102"
            title="تركيز الكاميرا على الحرم الجامعي"
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span>بوابة الجامعة</span>
          </button>

          <button
            type="button"
            onClick={handleFitBounds}
            className="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-102"
            title="عرض المسار بالكامل بين الشقة والجامعة"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
            <span>عرض المسار كاملاً</span>
          </button>
        </div>

        {/* Floating Legend on Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] p-2 sm:px-3 sm:py-2 rounded-xl shadow-lg border border-white/10 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>موقع السكن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>الجامعة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-indigo-400"></span>
            <span>مسار الوصول</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar with Google Maps Direct Link */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-800">العنوان المسجل:</span>
          <span>{property.address}</span>
        </div>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-bold border border-slate-200 shadow-2xs hover:border-blue-300 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>فتح الاتجاهات والمسار في Google Maps</span>
        </a>
      </div>
    </div>
  );
};
