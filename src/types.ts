export type UserRole = 'student' | 'owner' | 'admin';

export type PropertyType = 'apartment' | 'studio' | 'room' | 'chalet' | 'bed';

export type StudentGender = 'male' | 'female' | 'any';

export type ListingStatus = 'pending_approval' | 'active' | 'rejected' | 'expired';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  nationalId?: string;
  university?: string;
  isVerified: boolean;
  ratingAverage?: number; // e.g. 4.8
  ratingsCount?: number; // e.g. 15
  createdAt: string;
}

export type ThemeMode = 'light' | 'dark';

export interface CountryInfo {
  code: string; // e.g. 'EG', 'SA', 'AE', 'JO', 'TR', 'GB', 'DE', 'MY', 'US'
  name: string; // Arabic name
  enName: string; // English name
  flag: string; // Emoji
  currency: string; // Currency symbol
  currencyCode: string; // ISO e.g. EGP, SAR
  phonePrefix: string; // e.g. +20, +966
  defaultLang: 'ar' | 'en' | 'tr' | 'de';
  direction: 'rtl' | 'ltr';
  tagline: string;
  majorCities: string[];
  popularDistricts: string[];
}

export interface University {
  id: string;
  name: string;
  countryCode?: string;
  governorate: string;
  campusArea: string;
  popularFaculties: string[];
  category?: 'حكومية' | 'خاصة' | 'أهلية' | 'تكنولوجية';
  lat?: number;
  lng?: number;
}

export interface ListingPackage {
  id: string;
  name: string;
  durationDays: number;
  durationText: string;
  priceEgp: number;
  description: string;
  isPopular?: boolean;
  badge?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  countryCode?: string;
  currency?: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  governorate: string;
  city: string;
  address: string;
  nearestUniversityId: string;
  nearestUniversityName: string;
  distanceMinutes: number; // minutes walking or via microbus
  distanceText: string;
  transportAccess?: string; // e.g. مترو الأنفاق خط 1 / ميكروباص مباشر
  areaDistrict?: string; // neighborhood / district
  lat?: number;
  lng?: number;
  priceMonthly: number;
  depositEgp: number;
  type: PropertyType;
  gender: StudentGender;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  availableBeds: number;
  images: string[];
  amenities: string[];
  rules: string[];
  listingPackageId: string;
  packageName: string;
  status: ListingStatus;
  rejectionReason?: string;
  fawryReferenceNumber?: string;
  listingPaymentStatus: 'paid' | 'unpaid';
  expiresAt: string;
  viewsCount: number;
  ownerRating?: number; // e.g. 4.8
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyAddress: string;
  nearestUniversity: string;
  countryCode?: string;
  currency?: string;
  monthlyRent: number;
  depositEgp: number;
  studentId: string;
  studentName: string;
  studentPhone: string;
  studentUniversity: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  startDate: string;
  durationMonths: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  depositPaid: boolean;
  fawryRefCode: string;
  rentalPeriodEnded?: boolean;
  hasBeenRated?: boolean;
  ratingScore?: number;
  ratingComment?: string;
  createdAt: string;
}

export interface OwnerReview {
  id: string;
  bookingId: string;
  ownerId: string;
  ownerName: string;
  studentId: string;
  studentName: string;
  studentUniversity?: string;
  propertyId: string;
  propertyTitle: string;
  rating: number; // 1 to 5 overall
  cleanlinessRating: number; // 1 to 5
  communicationRating: number; // 1 to 5
  maintenanceRating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  type: 'listing_fee' | 'booking_deposit' | 'commission';
  typeArabic: string;
  amountEgp: number;
  fawryReferenceNumber: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userPhone: string;
  propertyId?: string;
  propertyTitle?: string;
  packageName?: string;
  status: 'pending' | 'paid' | 'expired';
  createdAt: string;
  paidAt?: string;
  expiresAt: string;
}

export interface PlatformStats {
  totalRevenueEgp: number;
  activeListingsCount: number;
  pendingListingsCount: number;
  totalStudents: number;
  totalOwners: number;
  totalBookings: number;
}
