// Egyptian University GPS Coordinates Mapping
export const UNIVERSITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  cu: { lat: 30.0261, lng: 31.2118 }, // Cairo University (Giza)
  asu: { lat: 30.0768, lng: 31.2858 }, // Ain Shams University (Abbasia)
  alexu: { lat: 31.2069, lng: 29.9142 }, // Alexandria University (Chatby/Azarita)
  mansu: { lat: 31.0425, lng: 31.3547 }, // Mansoura University
  helwan: { lat: 29.8668, lng: 31.3197 }, // Helwan University (Ain Helwan)
  tanta: { lat: 30.7937, lng: 31.0024 }, // Tanta University
  assiut: { lat: 27.1865, lng: 31.1714 }, // Assiut University
  zagazig: { lat: 30.5877, lng: 31.4835 }, // Zagazig University
  benha: { lat: 30.4682, lng: 31.1834 }, // Benha University
  menofia: { lat: 30.5594, lng: 31.0118 }, // Menoufia University
  kfs: { lat: 31.0965, lng: 30.9525 }, // Kafr El Sheikh University
  damanhour: { lat: 31.0375, lng: 30.4725 }, // Damanhour University
  suez_canal: { lat: 30.6225, lng: 32.2741 }, // Suez Canal University (Ismailia)
  portsaid: { lat: 31.2482, lng: 32.2854 }, // Port Said University
  suez: { lat: 29.9725, lng: 32.5342 }, // Suez University
  fayoum: { lat: 29.3198, lng: 30.8354 }, // Fayoum University
  bsu: { lat: 29.0744, lng: 31.1022 }, // Beni Suef University
  minia: { lat: 28.0871, lng: 30.7495 }, // Minia University
  sohag: { lat: 26.5562, lng: 31.6948 }, // Sohag University
  svu: { lat: 26.1554, lng: 32.7214 }, // South Valley University (Qena)
  luxor: { lat: 25.6872, lng: 32.6396 }, // Luxor University
  aswan: { lat: 24.0889, lng: 32.8998 }, // Aswan University
  azhar: { lat: 30.0543, lng: 31.3146 }, // Al-Azhar University (Nasr City)
  october6: { lat: 29.9723, lng: 30.9458 }, // 6th of October University
  must: { lat: 29.9806, lng: 30.9322 }, // MUST University
  auc: { lat: 30.0201, lng: 31.5002 }, // American University in Cairo (New Cairo)
  guc: { lat: 29.9870, lng: 31.4407 }, // German University in Cairo
  bue: { lat: 30.1215, lng: 31.6085 }, // British University in Egypt (El Sherouk)
  buc: { lat: 30.1477, lng: 31.7454 }, // Badr University in Cairo
  fue: { lat: 30.0384, lng: 31.4925 }, // Future University in Egypt
  miu: { lat: 30.1742, lng: 31.4878 }, // Misr International University
  pua: { lat: 31.2095, lng: 29.9482 }, // Pharos University in Alexandria
  nile_univ: { lat: 30.0125, lng: 30.9856 }, // Nile University (Sheikh Zayed)
  ngu: { lat: 30.0450, lng: 31.0250 }, // Newgiza University
  delta_univ: { lat: 31.4385, lng: 31.5240 }, // Delta University (Gamasa)
  galala: { lat: 29.4125, lng: 32.4180 }, // Galala University
  alamein: { lat: 30.8350, lng: 28.9480 }, // Alamein International University
  new_mansoura: { lat: 31.4820, lng: 31.5850 }, // New Mansoura University
  // Saudi Arabia
  ksu: { lat: 24.7162, lng: 46.6192 },
  kau: { lat: 21.4933, lng: 39.2464 },
  kfupm: { lat: 26.3075, lng: 50.1444 },
  pnu: { lat: 24.8465, lng: 46.7262 },
  uqu: { lat: 21.3283, lng: 39.9515 },
  // UAE
  uaeu: { lat: 24.1950, lng: 55.6880 },
  ku_ae: { lat: 24.4447, lng: 54.3980 },
  aus: { lat: 25.3115, lng: 55.4920 },
  diac: { lat: 25.1200, lng: 55.4050 },
  // Jordan
  ju: { lat: 32.0160, lng: 35.8700 },
  just: { lat: 32.4950, lng: 35.9890 },
  hu_jo: { lat: 32.1020, lng: 36.1860 },
  // Turkey
  istanbul_u: { lat: 41.0130, lng: 28.9630 },
  metu: { lat: 39.8910, lng: 32.7830 },
  itu: { lat: 41.1060, lng: 29.0230 },
  // United Kingdom
  ucl: { lat: 51.5246, lng: -0.1340 },
  imperial: { lat: 51.4988, lng: -0.1749 },
  manchester_u: { lat: 53.4668, lng: -2.2339 },
  // Germany
  tum: { lat: 48.1497, lng: 11.5680 },
  humboldt: { lat: 52.5180, lng: 13.3930 },
  // Malaysia
  um_my: { lat: 3.1209, lng: 101.6538 },
  // United States
  harvard: { lat: 42.3770, lng: -71.1167 },
  mit: { lat: 42.3601, lng: -71.0942 }
};

// Default center of Cairo if unknown
export const DEFAULT_EGYPT_CENTER = { lat: 30.0444, lng: 31.2357 };

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Resolves or estimates coordinates for a property based on its university, location, or explicit lat/lng
 */
export function getPropertyCoordinates(
  prop: { lat?: number; lng?: number; nearestUniversityId?: string; distanceMinutes?: number; id?: string },
  defaultUnivCoords?: { lat: number; lng: number }
): { lat: number; lng: number } {
  if (prop.lat && prop.lng) {
    return { lat: prop.lat, lng: prop.lng };
  }

  const univCoords =
    (prop.nearestUniversityId && UNIVERSITY_COORDINATES[prop.nearestUniversityId]) ||
    defaultUnivCoords ||
    DEFAULT_EGYPT_CENTER;

  // Generate a deterministic slight offset based on property id or distance
  const seed = prop.id
    ? prop.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 42;
  const angle = (seed % 360) * (Math.PI / 180);
  
  // Distance in approx degrees (1 min walk ~ 80 meters ~ 0.00072 degrees)
  const minutes = prop.distanceMinutes || 5;
  const distanceDeg = Math.min(0.04, (minutes * 0.08) / 111);

  return {
    lat: Number((univCoords.lat + Math.sin(angle) * distanceDeg).toFixed(5)),
    lng: Number((univCoords.lng + Math.cos(angle) * distanceDeg).toFixed(5))
  };
}
