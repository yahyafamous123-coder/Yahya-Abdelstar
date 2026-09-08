import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Building2, 
  Shield, 
  User as UserIcon, 
  Lock, 
  Phone, 
  Mail, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { User, UserRole, University } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  universities: University[];
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  universities,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [selectedUniv, setSelectedUniv] = useState(universities[0]?.name || 'جامعة القاهرة');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: `usr_${selectedRole}_${Date.now().toString().slice(-4)}`,
      name: name || (selectedRole === 'student' ? 'طالب جامعي جديد' : selectedRole === 'owner' ? 'مالك عقار جديد' : 'مشرف المنصة'),
      email: email || `${phone || 'user'}@talebhome.com`,
      phone: phone || '01012345678',
      role: selectedRole,
      university: selectedRole === 'student' ? selectedUniv : undefined,
      nationalId: selectedRole === 'owner' ? nationalId || '29001010123456' : undefined,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemo = (role: UserRole) => {
    if (role === 'student') {
      onLoginSuccess({
        id: 'usr_student_1',
        name: 'يحيى إبراهيم',
        email: 'yahya.student@talebhome.com',
        phone: '01012345678',
        role: 'student',
        university: 'جامعة القاهرة (كلية الطب البشري)',
        isVerified: true,
        createdAt: '2025-08-10'
      });
    } else if (role === 'owner') {
      onLoginSuccess({
        id: 'usr_owner_1',
        name: 'الحاج محمود الدسوقي',
        email: 'eldesouky.re@gmail.com',
        phone: '01198765432',
        role: 'owner',
        nationalId: '27508120104567',
        isVerified: true,
        createdAt: '2025-07-20'
      });
    } else {
      onLoginSuccess({
        id: 'usr_admin',
        name: 'إدارة منصة طالب هوم',
        email: 'admin@talebhome.com',
        phone: '01200008899',
        role: 'admin',
        isVerified: true,
        createdAt: '2025-01-01'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 text-right animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {mode === 'signin' ? 'تسجيل الدخول إلى طالب هوم' : 'إنشاء حساب جديد'}
              </h3>
              <p className="text-xs text-slate-400">بوابة سكن الجامعات والشقق في مصر</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Demo Logins Bar */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2">
            <p className="text-xs font-bold text-slate-700">دخول تجريبي سريع بضغطة واحدة:</p>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors flex items-center justify-center gap-1"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>طالب</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('owner')}
                className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>صاحب عقار</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 transition-colors flex items-center justify-center gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>الإدارة</span>
              </button>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">نوع الحساب:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 ${
                  selectedRole === 'student'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">طالب جامعي</p>
                  <p className="text-[10px] text-slate-500">مستأجر وباحث عن سكن</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('owner')}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 ${
                  selectedRole === 'owner'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-950 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">صاحب عقار</p>
                  <p className="text-[10px] text-slate-500">مؤجر للشقق والغرف</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل *</label>
              <input
                type="text"
                placeholder={selectedRole === 'student' ? 'مثال: يحيى إبراهيم' : 'مثال: الحاج محمود الدسوقي'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف المصري *</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  dir="ltr"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden text-right"
                />
              </div>
            </div>

            {selectedRole === 'student' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الجامعة أو المعهد المقيد به *</label>
                <select
                  value={selectedUniv}
                  onChange={(e) => setSelectedUniv(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white outline-hidden"
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name} ({u.campusArea})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الرقم القومي (14 رقم لتوثيق ملكية العقار) *</label>
                <input
                  type="text"
                  placeholder="27508120104567"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  maxLength={14}
                  dir="ltr"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white outline-hidden text-right"
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                selectedRole === 'student'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              }`}
            >
              <span>{mode === 'signin' ? 'دخول فوري للحساب' : 'إنشاء حساب جديد والبدء'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center text-xs text-slate-500">
            {mode === 'signin' ? (
              <p>
                ليس لديك حساب بعد؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  سجل الآن مجاناً
                </button>
              </p>
            ) : (
              <p>
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  سجل الدخول هنا
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
