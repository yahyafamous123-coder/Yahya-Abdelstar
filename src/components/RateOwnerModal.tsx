import React, { useState } from 'react';
import { 
  Star, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { Booking, OwnerReview } from '../types';

interface RateOwnerModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (reviewData: Omit<OwnerReview, 'id' | 'createdAt'>) => void;
}

export const RateOwnerModal: React.FC<RateOwnerModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [cleanlinessRating, setCleanlinessRating] = useState<number>(5);
  const [communicationRating, setCommunicationRating] = useState<number>(5);
  const [maintenanceRating, setMaintenanceRating] = useState<number>(5);

  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen || !booking) return null;

  const ratingDescriptions: { [key: number]: string } = {
    1: 'تجربة سيئة وغير مرضية',
    2: 'مقبول مع وجود ملاحظات',
    3: 'جيد وملائم',
    4: 'جيد جداً ومريح',
    5: 'ممتاز ومثالي، أوصي به بشدة ⭐'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('يرجى كتابة كلمة أو رأي موجز عن تجربتك مع المالك');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitReview({
        bookingId: booking.id,
        ownerId: booking.ownerId,
        ownerName: booking.ownerName,
        studentId: booking.studentId,
        studentName: booking.studentName,
        studentUniversity: booking.studentUniversity,
        propertyId: booking.propertyId,
        propertyTitle: booking.propertyTitle,
        rating: overallRating,
        cleanlinessRating,
        communicationRating,
        maintenanceRating,
        comment: comment.trim()
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تقييم المالك بعد انتهاء فترة السكن</span>
          </div>

          <h3 className="text-xl font-black">
            تقييم المالك: {booking.ownerName}
          </h3>
          <p className="text-xs text-blue-100 mt-1 line-clamp-1">
            {booking.propertyTitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Main Overall Rating */}
          <div className="text-center space-y-2 py-2 bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4">
            <label className="text-xs font-bold text-slate-700 block">
              التقييم العام لتجربتك مع المالك
            </label>

            <div className="flex items-center justify-center gap-1.5 direction-ltr">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || overallRating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-hidden"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${
                        active 
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs' 
                          : 'text-slate-300 fill-slate-100'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-black text-amber-900">
              {ratingDescriptions[hoverRating || overallRating]}
            </p>
          </div>

          {/* Sub-Criteria Breakdown */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2">معايير التقييم التفصيلية:</h4>

            {/* Criteria 1: Cleanliness */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-700 font-medium">نظافة العقار ومطابقته للصور:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCleanlinessRating(val)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                      cleanlinessRating === val
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 2: Communication & Honesty */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-700 font-medium">الأمانة وحسن التعامل والالتزام:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCommunicationRating(val)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                      communicationRating === val
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 3: Maintenance */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-700 font-medium">الاستجابة لطلبات الصيانة والهدوء:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMaintenanceRating(val)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                      maintenanceRating === val
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Student Comment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>رأيك وتعليقك لمساعدة زملائك الطلاب:</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تجربتك مع المالك بكل صراحة (التعامل، الهدوء، الأمان، استرداد العربون والتأمين)..."
              rows={3}
              required
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Guarantee / Privacy note */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              تقييمك يظهر فوراً في ملف المالك لتعزيز الشفافية، ويساعد إدارة المنصة في تكريم الملاك الملتزمين.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'جاري حفظ التقييم...' : 'اعتماد ونشر تقييم المالك'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-3.5 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
            >
              إلغاء
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
