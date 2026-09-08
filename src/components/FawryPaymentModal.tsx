import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Copy, Check, ShieldCheck, Printer, AlertTriangle, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FawryPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountEgp: number;
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  onPaymentSuccess: (refNumber: string) => void;
}

export const FawryPaymentModal: React.FC<FawryPaymentModalProps> = ({
  isOpen,
  onClose,
  title,
  amountEgp,
  referenceNumber,
  customerName,
  customerPhone,
  onPaymentSuccess
}) => {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(47);
  const [countdownSeconds, setCountdownSeconds] = useState(59);

  useEffect(() => {
    if (!isOpen) {
      setIsPaid(false);
      setIsProcessing(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdownSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setCountdownMinutes((prevMin) => (prevMin > 0 ? prevMin - 1 : 47));
        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onPaymentSuccess(referenceNumber);
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        id="fawry-modal-card"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Fawry Official Style Header */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 p-5 text-slate-950 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 text-amber-400 font-extrabold px-3 py-1.5 rounded-xl text-lg tracking-wider shadow-xs">
              فوري <span className="text-white text-xs font-normal">FawryPay</span>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">بوابة الدفع الإلكتروني المعتمدة</h3>
              <p className="text-xs text-slate-900/80">وسيط آمن لحفظ حقوق المالك والطالب</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 transition-colors text-slate-900"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isPaid ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">تم السداد بنجاح عبر فوري!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                تم استلام الدفعة بقيمة <span className="font-bold text-emerald-700">{amountEgp.toLocaleString()} ج.م</span> وتأكيد المعاملة في النظام فوراً.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                رقم الإيصال الإلكتروني: <strong>FAWRY-{referenceNumber}-OK</strong>
              </div>
            </div>
          ) : (
            <>
              {/* Amount and Title Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-5 text-center">
                <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-3xl font-black text-slate-900">{amountEgp.toLocaleString()}</span>
                  <span className="text-sm font-bold text-slate-600">جنيه مصري</span>
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center justify-center gap-2">
                  <span>العميل: {customerName}</span>
                  <span>•</span>
                  <span dir="ltr">{customerPhone}</span>
                </div>
              </div>

              {/* Reference Code Card */}
              <div className="border-2 border-dashed border-amber-400 bg-amber-50/50 rounded-2xl p-5 mb-5 text-center relative">
                <div className="flex items-center justify-center gap-2 text-amber-800 text-xs font-bold mb-1">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>ينتهي الكود خلال: {countdownMinutes}:{countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds} دقيقة</span>
                </div>

                <p className="text-xs text-slate-600 mb-2">رقم دفع فوري المرجعي (Fawry Reference Code):</p>
                <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-slate-900 py-2 select-all">
                  {referenceNumber}
                </div>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'تم نسخ الرقم بنجاح' : 'نسخ رقم الدفع'}</span>
                  </button>
                </div>
              </div>

              {/* How to Pay Instructions */}
              <div className="space-y-2.5 mb-6 text-right">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">طرق السداد المتاحة في مصر:</h5>
                <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                    <p>
                      <strong>من أي ماكينة أو منفذ فوري:</strong> اطلب الدفع بكود الخدمة <strong className="text-blue-700 font-mono">788</strong> (مدفوعات طالب هوم) وأعطه رقم الدفع المرجعي <strong className="font-mono">{referenceNumber}</strong>.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                    <p>
                      <strong>من تطبيق myFawry أو المحافظ الإلكترونية:</strong> اختر دفع الفواتير &gt; خدمات سكن وجامعات &gt; منصة طالب هوم &gt; ادخل الرقم المرجعي.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Interactive Simulation */}
              <div className="space-y-2.5">
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جارٍ التحقق من شبكة فوري...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                      <span>محاكاة دفع الفاتورة الآن (تجربة الدفع الفوري)</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>طباعة / حفظ إيصال فوري</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
                  >
                    إغلاق وسأدفع لاحقاً
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Security Note */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            معاملة مشفرة ومؤمنة بواسطة شبكة فوري مصر
          </span>
          <span className="text-slate-400">TalebHome Pay v2.4</span>
        </div>
      </div>
    </div>
  );
};
