import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';
import { useLanguage } from '@/store/LanguageContext';

export function Register() {
  const { language, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'client',
    endaCode: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEndaVerified, setIsEndaVerified] = useState(false);

  const totalSteps = formData.accountType === 'artisan' ? 3 : 2;
  const currentVisualStep = step === 3 && formData.accountType === 'client' ? 2 : step;

  const handleNext = () => {
    if (step === 1 && formData.accountType === 'client') {
      setStep(3); // skip enda step
    } else if (step === 2 && !isEndaVerified) {
       return;
    } else {
      setStep(s => Math.min(s + 1, 3));
    }
  };

  const handleBack = () => {
    if (step === 3 && formData.accountType === 'client') {
      setStep(1);
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
  };

  const handleVerifyEnda = () => {
    if (!formData.endaCode) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsEndaVerified(true);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordMismatch') || "Mots de passe non identiques", {
        icon: <div className="p-1 bg-red-100 rounded-full mr-2"><svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
      });
      return;
    }
    toast.success(t('auth.registerSuccess') || "Inscription réussie !");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-[2rem] shadow-card px-8 py-10 sm:p-12 relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100">
            <div 
              className="h-full gradient-terracotta transition-all duration-700 ease-in-out"
              style={{ width: `${(currentVisualStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
               <h1 className="text-3xl font-black text-gray-900 font-serif mb-2">
                 {t('auth.registerTitle')}
               </h1>
               <p className="text-gray-500 font-medium">
                 {language === 'ar' ? `الخطوة ${currentVisualStep} من ${totalSteps}` : `Étape ${currentVisualStep} sur ${totalSteps}`}
               </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta to-warm-gold flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-3xl">س</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Account Type */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-serif">
                  {language === 'ar' ? 'كيف ترغب في استخدام سوقنا؟' : 'Comment souhaitez-vous utiliser Soukna ?'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                      formData.accountType === 'client'
                        ? 'border-terracotta bg-terracotta/5 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                    onClick={() => setFormData({ ...formData, accountType: 'client' })}
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-terracotta">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{t('auth.iAmClient')}</h3>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'اكتشف واشترِ منتجات حرفية فريدة بكل أمان.' : 'Découvrez et achetez des pièces uniques de nos artisans en toute sécurité.'}
                    </p>
                  </div>

                  <div
                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                      formData.accountType === 'artisan'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                    onClick={() => setFormData({ ...formData, accountType: 'artisan' })}
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-emerald-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{t('auth.iAmArtisan')}</h3>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'كن بائعاً معتمداً واستفد من دعم إندا تمويل.' : 'Devenez vendeur certifié et profitez de l\'accompagnement Enda Tamweel.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Enda Tamweel Verification (Artisan Only) */}
            {step === 2 && (
               <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                   {language === 'ar' ? 'التحقق مع إندا تمويل' : 'Vérification Enda Tamweel'}
                 </h2>
                 <p className="text-gray-500 mb-8">
                   {language === 'ar' ? 'لكي تكون بائعاً، يجب تأكيد هويتك كعميل مسجل لدى إندا تمويل.' : 'Pour devenir vendeur, vous devez confirmer votre identité en tant que client Enda Tamweel.'}
                 </p>

                 <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <span className="text-green-600 font-black text-[10px] leading-tight text-center">ENDA<br/>TMW</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        {language === 'ar' ? 'الرمز التعريفي للعميل' : 'Code Identifiant Client'}
                      </p>
                    </div>
                  </div>

                  <div className="relative mb-2">
                    <Input
                      type="text"
                      placeholder={language === 'ar' ? 'أدخل الكود متبوعاً بحرف (ex: 8876421A)' : 'Entrez votre code (ex: 8876421A)'}
                      className="bg-white h-14 pl-4 pr-32 font-medium border-green-200 focus:border-green-500 focus:ring-green-500"
                      value={formData.endaCode}
                      onChange={(e) => setFormData({ ...formData, endaCode: e.target.value })}
                      disabled={isEndaVerified}
                    />
                    {!isEndaVerified ? (
                      <button
                        type="button"
                        onClick={handleVerifyEnda}
                        disabled={isVerifying || formData.endaCode.length < 5}
                        className="absolute right-2 top-2 bottom-2 px-5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm"
                      >
                        {isVerifying ? '...' : (language === 'ar' ? 'تحقق' : 'Vérifier')}
                      </button>
                    ) : (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        {language === 'ar' ? 'تمت الموافقة' : 'Approuvé'}
                      </div>
                    )}
                  </div>
                  
                  {!isEndaVerified && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-3">
                      <Lock className="w-3 h-3" />
                      {language === 'ar' ? 'عبر واجهة إندا الرسمية المؤمّنة' : 'Vérification sécurisée automatisée via Enda Tamweel'}
                    </p>
                  )}
                 </div>
               </div>
            )}

            {/* STEP 3: General Information */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                 <h2 className="text-xl font-bold text-gray-900 mb-6 font-serif">
                   {language === 'ar' ? 'تفاصيل الاتصال والأمان' : 'Détails de contact et sécurité'}
                 </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {t('auth.firstNameLabel')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                      <Input
                        type="text"
                        placeholder={t('auth.firstNamePlaceholder')}
                        className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-3 rtl:pr-10 transition-colors"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {t('auth.lastNameLabel')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                      <Input
                        type="text"
                        placeholder={t('auth.lastNamePlaceholder')}
                        className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-3 rtl:pr-10 transition-colors"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {t('auth.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                    <Input
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-3 rtl:pr-10 transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {t('auth.phoneLabel')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                    <Input
                      type="tel"
                      placeholder={t('auth.phonePlaceholder')}
                      className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-3 rtl:pr-10 transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {t('auth.passwordLabel')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-10 rtl:pr-10 transition-colors"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 rtl:left-3 rtl:right-auto"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {t('auth.confirmPasswordLabel')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-terracotta rtl:pl-10 rtl:pr-10 transition-colors"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start mt-4 bg-gray-50 p-4 rounded-xl">
                  <input type="checkbox" className="mt-1 rounded border-gray-300 text-terracotta focus:ring-terracotta w-4 h-4 cursor-pointer" required />
                  <span className="ml-3 rtl:ml-0 rtl:mr-3 text-sm text-gray-600 leading-tight">
                    {t('auth.acceptTerms')}{' '}
                    <Link to="#" className="text-terracotta font-bold hover:underline">
                      {t('auth.termsLink')}
                    </Link>
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  className="rounded-full px-6 h-12 font-bold"
                >
                  <ChevronLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
                  {language === 'ar' ? 'عودة' : 'Retour'}
                </Button>
              ) : (
                <div /> // Empty div to keep 'Suivant' on the right
              )}

              {step < 3 ? (
                <Button 
                  type="button"
                  onClick={handleNext}
                  className="rounded-full px-8 h-12 font-bold bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-lg transition-all"
                  disabled={step === 2 && !isEndaVerified}
                >
                  {language === 'ar' ? 'التالي' : 'Suivant'}
                  <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="rounded-full px-8 h-12 font-black gradient-terracotta text-white shadow-[0_8px_20px_rgb(255,107,53,0.3)] hover:shadow-[0_8px_25px_rgb(255,107,53,0.4)] transition-all transform hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('auth.registerButton')}
                </Button>
              )}
            </div>

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-terracotta hover:underline font-bold">
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
