import React from 'react';
import { 
  Home, 
  GraduationCap, 
  Building2, 
  Shield, 
  PlusCircle, 
  User as UserIcon, 
  Search, 
  Menu, 
  X,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: User;
  onSwitchRole: (role: UserRole) => void;
  onOpenAuthModal: () => void;
  onOpenAddUnitModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onSwitchRole,
  onOpenAuthModal,
  onOpenAddUnitModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return { label: 'طالب (مستأجر)', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: GraduationCap };
      case 'owner':
        return { label: 'صاحب عقار (مؤجر)', color: 'bg-amber-100 text-amber-900 border-amber-200', icon: Building2 };
      case 'admin':
        return { label: 'الإدارة (الوسيط)', color: 'bg-purple-100 text-purple-900 border-purple-200', icon: Shield };
    }
  };

  const currentRoleInfo = getRoleBadge(currentUser.role);
  const CurrentRoleIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Quick Role Switcher for the test environment */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">التبديل الفوري بين صلاحيات المنصة لتجربة كاملة:</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSwitchRole('student')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentUser.role === 'student'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>الطالب (مستأجر)</span>
            </button>

            <button
              onClick={() => onSwitchRole('owner')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentUser.role === 'owner'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>صاحب العقار (مؤجر)</span>
            </button>

            <button
              onClick={() => onSwitchRole('admin')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>لوحة الإدارة والوسيط</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-right"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900">طالب هوم</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md border border-amber-200">
                    مصر
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">وسيط سكن الجامعات والشقق المعتمد</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
              <button
                onClick={() => onNavigate('welcome')}
                className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                  currentView === 'welcome'
                    ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300/80 shadow-2xs'
                    : 'hover:bg-slate-50 hover:text-slate-900 text-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>ترحيب ودليل البدء</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className={`px-3.5 py-2 rounded-xl transition-colors ${
                  currentView === 'home'
                    ? 'bg-slate-100 text-blue-700 font-bold'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                الرئيسية
              </button>

              <button
                onClick={() => onNavigate('explore')}
                className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                  currentView === 'explore'
                    ? 'bg-slate-100 text-blue-700 font-bold'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>شقق وسكن الطلاب</span>
              </button>

              {/* Only show packages link for owners and admins; hide from student mode */}
              {currentUser.role !== 'student' && (
                <button
                  onClick={() => onNavigate('packages')}
                  className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                    currentView === 'packages'
                      ? 'bg-slate-100 text-blue-700 font-bold'
                      : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>باقات الإعلان وفوري</span>
                </button>
              )}

              {/* Dynamic Dashboard Tab according to user */}
              <button
                onClick={() => {
                  if (currentUser.role === 'student') onNavigate('student_dashboard');
                  else if (currentUser.role === 'owner') onNavigate('owner_dashboard');
                  else onNavigate('admin_dashboard');
                }}
                className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                  currentView.includes('dashboard')
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CurrentRoleIcon className="w-4 h-4 text-blue-600" />
                <span>
                  {currentUser.role === 'student' && 'حجوزاتي وإيصالاتي'}
                  {currentUser.role === 'owner' && 'لوحة المالك والشقق'}
                  {currentUser.role === 'admin' && 'لوحة الإدارة والوسيط'}
                </span>
              </button>
            </nav>
          </div>

          {/* Left Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Owner CTA to add unit vs Student Zero Commission Badge */}
            {currentUser.role === 'student' ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% عمولة على الطالب (مجاناً)</span>
                </div>
                <button
                  onClick={() => onNavigate('explore')}
                  className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>تصفح السكن</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAddUnitModal}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-xs hover:shadow-sm flex items-center gap-1.5 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>أضف شقة أو سكن للإيجار</span>
              </button>
            )}

            {/* Current User Pill / Auth button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1.5 pr-3 pl-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-right"
            >
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${currentRoleInfo.color}`}>
                  {currentRoleInfo.label}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                {currentUser.name.slice(0, 1)}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenAddUnitModal}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              title="إضافة عقار"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
              <p className="text-[11px] text-slate-500">{currentRoleInfo.label}</p>
            </div>
            <button
              onClick={onOpenAuthModal}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              تغيير الحساب
            </button>
          </div>

          <nav className="flex flex-col space-y-1 text-sm font-medium">
            <button
              onClick={() => {
                onNavigate('welcome');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-right flex items-center gap-2 ${currentView === 'welcome' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-700'}`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>الصفحة الترحيبية</span>
            </button>
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-right ${currentView === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                onNavigate('explore');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-right ${currentView === 'explore' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}
            >
              تصفح كل الشقق والوحدات
            </button>
            {currentUser.role !== 'student' && (
              <button
                onClick={() => {
                  onNavigate('packages');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-right ${currentView === 'packages' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}
              >
                باقات الإعلان وسداد فوري
              </button>
            )}
            <button
              onClick={() => {
                if (currentUser.role === 'student') onNavigate('student_dashboard');
                else if (currentUser.role === 'owner') onNavigate('owner_dashboard');
                else onNavigate('admin_dashboard');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg text-right bg-slate-100 text-slate-900 font-bold"
            >
              لوحة التحكم الخاصة بك ({currentRoleInfo.label})
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
