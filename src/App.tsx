/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Property, 
  User, 
  UserRole, 
  Booking, 
  PaymentTransaction, 
  ListingPackage,
  University
} from './types';
import { 
  INITIAL_PROPERTIES, 
  DEMO_USERS, 
  DEFAULT_LISTING_PACKAGES, 
  UNIVERSITIES, 
  INITIAL_BOOKINGS, 
  INITIAL_TRANSACTIONS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { WelcomeView } from './components/WelcomeView';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { PackagesView } from './components/PackagesView';
import { OwnerDashboard } from './components/OwnerDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { UnitDetailsModal } from './components/UnitDetailsModal';
import { AddUnitModal } from './components/AddUnitModal';
import { FawryPaymentModal } from './components/FawryPaymentModal';
import { AuthModal } from './components/AuthModal';
import { Heart, GraduationCap, ShieldCheck, Phone, Mail } from 'lucide-react';

export default function App() {
  // Global State with LocalStorage Persistence
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('talebhome_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Student by default
  });

  const [currentView, setCurrentView] = useState<string>('welcome');

  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('talebhome_properties');
    if (!saved) return INITIAL_PROPERTIES;
    try {
      const parsed: Property[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((p) => p.id));
      const missing = INITIAL_PROPERTIES.filter((p) => !existingIds.has(p.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('talebhome_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('talebhome_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [packages, setPackages] = useState<ListingPackage[]>(() => {
    const saved = localStorage.getItem('talebhome_packages');
    return saved ? JSON.parse(saved) : DEFAULT_LISTING_PACKAGES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('talebhome_favorites');
    return saved ? JSON.parse(saved) : ['prop_1', 'prop_2'];
  });

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fawry Payment Modal State
  const [fawryModal, setFawryModal] = useState<{
    isOpen: boolean;
    title: string;
    amountEgp: number;
    referenceNumber: string;
    customerName: string;
    customerPhone: string;
    onSuccess: (refNumber: string) => void;
  }>({
    isOpen: false,
    title: '',
    amountEgp: 0,
    referenceNumber: '',
    customerName: '',
    customerPhone: '',
    onSuccess: () => {}
  });

  // Search filter query state passed from Welcome / Home to Explore
  const [searchFilter, setSearchFilter] = useState({
    univId: '',
    gov: '',
    gender: 'all',
    locationQuery: ''
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('talebhome_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('talebhome_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('talebhome_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('talebhome_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('talebhome_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('talebhome_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle Switch User Role
  const handleSwitchRole = (newRole: UserRole) => {
    const foundDemo = DEMO_USERS.find((u) => u.role === newRole) || {
      ...currentUser,
      role: newRole
    };
    setCurrentUser(foundDemo);

    // Auto navigate to the respective dashboard or keep context
    if (currentView.includes('dashboard')) {
      if (newRole === 'student') setCurrentView('student_dashboard');
      else if (newRole === 'owner') setCurrentView('owner_dashboard');
      else setCurrentView('admin_dashboard');
    }
  };

  // Toggle Property Favorite
  const handleToggleFavorite = (propId: string) => {
    setFavorites((prev) =>
      prev.includes(propId) ? prev.filter((id) => id !== propId) : [...prev, propId]
    );
  };

  // Open property details
  const handleSelectProperty = (prop: Property) => {
    // increment views
    setProperties((prev) =>
      prev.map((p) => (p.id === prop.id ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p))
    );
    setSelectedProperty(prop);
    setIsDetailsModalOpen(true);
  };

  // Student starts booking flow
  const handleStartBooking = (property: Property, durationMonths: number, startDate: string) => {
    setIsDetailsModalOpen(false);

    // Generate random 9-digit Fawry reference code
    const fawryCode = Math.floor(100000000 + Math.random() * 900000000).toString();

    const newBooking: Booking = {
      id: `book_${Date.now().toString().slice(-4)}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      propertyAddress: property.address,
      nearestUniversity: property.nearestUniversityName,
      monthlyRent: property.priceMonthly,
      depositEgp: property.depositEgp,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentPhone: currentUser.phone,
      studentUniversity: currentUser.university || 'جامعة القاهرة',
      ownerId: property.ownerId,
      ownerName: property.ownerName,
      ownerPhone: property.ownerPhone,
      startDate,
      durationMonths,
      status: 'pending',
      depositPaid: false,
      fawryRefCode: fawryCode,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newTx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      type: 'booking_deposit',
      typeArabic: 'عربون حجز سكن طالب وسيط عبر فوري',
      amountEgp: property.depositEgp,
      fawryReferenceNumber: fawryCode,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      userPhone: currentUser.phone,
      propertyId: property.id,
      propertyTitle: property.title,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 16)
    };

    setBookings((prev) => [newBooking, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);

    // Open Fawry payment modal
    setFawryModal({
      isOpen: true,
      title: `عربون حجز: ${property.title}`,
      amountEgp: property.depositEgp,
      referenceNumber: fawryCode,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      onSuccess: (refNumber: string) => {
        // Mark booking as confirmed & paid
        setBookings((prev) =>
          prev.map((b) =>
            b.fawryRefCode === refNumber
              ? { ...b, depositPaid: true, status: 'confirmed' }
              : b
          )
        );
        // Mark transaction as paid
        setTransactions((prev) =>
          prev.map((t) =>
            t.fawryReferenceNumber === refNumber
              ? { ...t, status: 'paid', paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
              : t
          )
        );
        // Reduce available beds
        setProperties((prev) =>
          prev.map((p) =>
            p.id === property.id
              ? { ...p, availableBeds: Math.max(0, p.availableBeds - 1) }
              : p
          )
        );

        setTimeout(() => {
          setFawryModal((prev) => ({ ...prev, isOpen: false }));
          setCurrentView('student_dashboard');
        }, 800);
      }
    });
  };

  // Owner submits new unit
  const handleUnitSubmit = (
    newUnitData: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'status' | 'listingPaymentStatus'>,
    chosenPackage: ListingPackage
  ) => {
    setIsAddUnitModalOpen(false);

    const fawryCode = Math.floor(100000000 + Math.random() * 900000000).toString();
    const propId = `prop_${Date.now().toString().slice(-4)}`;

    const newProperty: Property = {
      ...newUnitData,
      id: propId,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      status: 'pending_approval',
      listingPaymentStatus: 'paid', // will be marked paid upon fawry success
      fawryReferenceNumber: fawryCode,
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newTx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      type: 'listing_fee',
      typeArabic: `رسوم باقة عرض وإعلان شقة (${chosenPackage.name})`,
      amountEgp: chosenPackage.priceEgp,
      fawryReferenceNumber: fawryCode,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      userPhone: currentUser.phone,
      propertyId: propId,
      propertyTitle: newProperty.title,
      packageName: chosenPackage.name,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 16)
    };

    setProperties((prev) => [newProperty, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);

    // Open Fawry payment modal for listing fee
    setFawryModal({
      isOpen: true,
      title: `سداد رسوم باقة العرض: ${chosenPackage.name}`,
      amountEgp: chosenPackage.priceEgp,
      referenceNumber: fawryCode,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      onSuccess: (refNumber: string) => {
        setProperties((prev) =>
          prev.map((p) =>
            p.fawryReferenceNumber === refNumber
              ? { ...p, listingPaymentStatus: 'paid', status: 'pending_approval' }
              : p
          )
        );
        setTransactions((prev) =>
          prev.map((t) =>
            t.fawryReferenceNumber === refNumber
              ? { ...t, status: 'paid', paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
              : t
          )
        );

        setTimeout(() => {
          setFawryModal((prev) => ({ ...prev, isOpen: false }));
          setCurrentView('owner_dashboard');
        }, 800);
      }
    });
  };

  // Owner pays listing fee for an existing property
  const handlePayListingFee = (property: Property, pkg: ListingPackage) => {
    const fawryCode = Math.floor(100000000 + Math.random() * 900000000).toString();

    const newTx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      type: 'listing_fee',
      typeArabic: `تجديد باقة عرض: ${pkg.name}`,
      amountEgp: pkg.priceEgp,
      fawryReferenceNumber: fawryCode,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: 'owner',
      userPhone: currentUser.phone,
      propertyId: property.id,
      propertyTitle: property.title,
      packageName: pkg.name,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 16)
    };

    setTransactions((prev) => [newTx, ...prev]);

    setFawryModal({
      isOpen: true,
      title: `سداد باقة ${pkg.name} للشقة`,
      amountEgp: pkg.priceEgp,
      referenceNumber: fawryCode,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      onSuccess: (refNumber: string) => {
        setProperties((prev) =>
          prev.map((p) =>
            p.id === property.id
              ? {
                  ...p,
                  listingPaymentStatus: 'paid',
                  status: 'active',
                  expiresAt: new Date(Date.now() + pkg.durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }
              : p
          )
        );
        setTransactions((prev) =>
          prev.map((t) =>
            t.fawryReferenceNumber === refNumber
              ? { ...t, status: 'paid', paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
              : t
          )
        );
        setTimeout(() => {
          setFawryModal((prev) => ({ ...prev, isOpen: false }));
        }, 800);
      }
    });
  };

  // Admin approves property
  const handleApproveProperty = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status: 'active' } : p))
    );
  };

  // Admin rejects property
  const handleRejectProperty = (propertyId: string, reason: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status: 'rejected', rejectionReason: reason } : p))
    );
  };

  // Admin updates package price
  const handleUpdatePackagePrice = (packageId: string, newPriceEgp: number) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === packageId ? { ...pkg, priceEgp: newPriceEgp } : pkg))
    );
  };

  // Confirm transaction payment manually in Admin panel
  const handleConfirmTransactionPayment = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? { ...t, status: 'paid', paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16) }
          : t
      )
    );
  };

  // Owner confirms booking
  const handleConfirmBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'confirmed' } : b))
    );
  };

  // Owner rejects booking
  const handleRejectBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'rejected' } : b))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Cairo',sans-serif] text-slate-900 flex flex-col justify-between" dir="rtl">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAddUnitModal={() => setIsAddUnitModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'welcome' && (
          <WelcomeView
            universities={UNIVERSITIES}
            currentUser={currentUser}
            onStartStudentSearch={(univId, gov, gender, locationQuery = '') => {
              setSearchFilter({ univId, gov, gender, locationQuery });
              setCurrentView('explore');
            }}
            onSelectOwnerPath={() => {
              handleSwitchRole('owner');
              setCurrentView('owner_dashboard');
            }}
            onSkipToHome={() => setCurrentView('home')}
            onOpenAddUnit={() => setIsAddUnitModalOpen(true)}
          />
        )}

        {currentView === 'home' && (
          <HomeView
            properties={properties}
            universities={UNIVERSITIES}
            packages={packages}
            currentUser={currentUser}
            onSelectProperty={handleSelectProperty}
            onNavigate={setCurrentView}
            onSearchWithFilter={(univId, gov, gender, locationQuery = '') => {
              setSearchFilter({ univId, gov, gender, locationQuery });
            }}
            onChoosePackage={(pkg) => {
              setIsAddUnitModalOpen(true);
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenAddUnitModal={() => setIsAddUnitModalOpen(true)}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            properties={properties}
            universities={UNIVERSITIES}
            onSelectProperty={handleSelectProperty}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            initialUniversityId={searchFilter.univId}
            initialGovernorate={searchFilter.gov}
            initialGender={searchFilter.gender}
            initialLocationQuery={searchFilter.locationQuery}
          />
        )}

        {currentView === 'packages' && (
          <PackagesView
            packages={packages}
            currentUser={currentUser}
            onChoosePackage={(pkg) => {
              setIsAddUnitModalOpen(true);
            }}
            onOpenAddUnitModal={() => setIsAddUnitModalOpen(true)}
          />
        )}

        {currentView === 'owner_dashboard' && (
          <OwnerDashboard
            currentUser={currentUser}
            properties={properties}
            bookings={bookings}
            packages={packages}
            onOpenAddUnitModal={() => setIsAddUnitModalOpen(true)}
            onPayListingFee={handlePayListingFee}
            onConfirmBooking={handleConfirmBooking}
            onRejectBooking={handleRejectBooking}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'student_dashboard' && (
          <StudentDashboard
            currentUser={currentUser}
            bookings={bookings}
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'admin_dashboard' && (
          <AdminDashboard
            properties={properties}
            transactions={transactions}
            packages={packages}
            users={DEMO_USERS}
            onApproveProperty={handleApproveProperty}
            onRejectProperty={handleRejectProperty}
            onUpdatePackagePrice={handleUpdatePackagePrice}
            onConfirmTransactionPayment={handleConfirmTransactionPayment}
            onSelectProperty={handleSelectProperty}
          />
        )}
      </main>

      {/* Global Modals */}
      
      {/* 1. Unit Details Modal */}
      <UnitDetailsModal
        property={selectedProperty}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        currentUser={currentUser}
        onStartBooking={handleStartBooking}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        universities={UNIVERSITIES}
      />

      {/* 2. Add Unit Modal */}
      <AddUnitModal
        isOpen={isAddUnitModalOpen}
        onClose={() => setIsAddUnitModalOpen(false)}
        currentUser={currentUser}
        universities={UNIVERSITIES}
        packages={packages}
        onSubmitUnit={handleUnitSubmit}
      />

      {/* 3. Fawry Pay Modal */}
      <FawryPaymentModal
        isOpen={fawryModal.isOpen}
        onClose={() => setFawryModal((prev) => ({ ...prev, isOpen: false }))}
        title={fawryModal.title}
        amountEgp={fawryModal.amountEgp}
        referenceNumber={fawryModal.referenceNumber}
        customerName={fawryModal.customerName}
        customerPhone={fawryModal.customerPhone}
        onPaymentSuccess={fawryModal.onSuccess}
      />

      {/* 4. Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        universities={UNIVERSITIES}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-right">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-black text-base">طالب هوم</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">مصر</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              منصة الوساطة الذكية والرائدة في مصر بين طلاب الجامعات وأصحاب الشقق والوحدات السكنية القريبة من الحرم الجامعي.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200">الجامعات المغطاة</h5>
            <ul className="text-slate-400 text-[11px] space-y-1">
              <li>جامعة القاهرة (بين السرايات / الدقي)</li>
              <li>جامعة عين شمس (العباسية / الوايلي)</li>
              <li>جامعة الإسكندرية (الأزاريطة / الشاطبي)</li>
              <li>جامعة المنصورة (شارع جيهان / توشكى)</li>
              <li>جامعة أسيوط ومجمع 6 أكتوبر و MUST</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200">الأمان والدفع الإلكتروني</h5>
            <ul className="text-slate-400 text-[11px] space-y-1">
              <li>سداد فوري بكود الخدمة (788)</li>
              <li>عربون حجز مسترد ومحمي كوسيط</li>
              <li>مراجعة واعتماد عقود السكن قانونياً</li>
              <li>فحص هوية الملاك والطلاب</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200">خدمة العملاء والوساطة</h5>
            <div className="text-slate-400 text-[11px] space-y-1">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span dir="ltr">01012345678 / 01198765432</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>support@talebhome.com</span>
              </p>
              <p className="text-slate-500 pt-1">القاهرة - الجيزة - الإسكندرية</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} منصة طالب هوم (Taleb Home) - جميع الحقوق محفوظة لجمهورية مصر العربية.</p>
          <div className="flex items-center gap-4">
            <span>شروط الاستخدام</span>
            <span>سياسة الخصوصية</span>
            <span>ضمان وسيط فوري</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
