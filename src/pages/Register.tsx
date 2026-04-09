import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useLanguage } from '@/store/LanguageContext';

export function Register() {
  const { language, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleVerifyEnda = () => {
    if (!formData.endaCode) return;
    setIsVerifying(true);
    // Simulate API call to Enda Tamweel
    setTimeout(() => {
      setIsVerifying(false);
      setIsEndaVerified(true);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(t('auth.passwordMismatch'));
      return;
    }
    if (formData.accountType === 'artisan' && !isEndaVerified) {
      alert(language === 'ar' ? 'يرجى التحقق من كود إندا تمويل للمتابعة' : 'Veuillez vérifier votre code Enda Tamweel pour continuer');
      return;
    }
    // Handle registration
    alert(t('auth.registerSuccess'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-terracotta mb-4">
              <span className="text-white font-bold text-2xl">س</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.registerTitle')}</h1>
            <p className="text-gray-600 mt-2">{t('auth.registerWelcome')}</p>
          </div>

          {/* Account Type */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                formData.accountType === 'client'
                  ? 'bg-terracotta text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setFormData({ ...formData, accountType: 'client' })}
            >
              {t('auth.iAmClient')}
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                formData.accountType === 'artisan'
                  ? 'bg-terracotta text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setFormData({ ...formData, accountType: 'artisan' })}
            >
              {t('auth.iAmArtisan')}
            </button>
          </div>

          {/* Enda Tamweel Verification (Artisan Only) */}
          {formData.accountType === 'artisan' && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <span className="text-green-600 font-bold text-xs leading-none text-center">ENDA<br/>TMW</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    {language === 'ar' ? 'تحقق إندا تمويل' : 'Vérification Enda Tamweel'}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Partenaire Officiel</p>
                </div>
              </div>

              <div className="relative">
                <Input
                  type="text"
                  placeholder={language === 'ar' ? 'أدخل كود العميل (8 أرقام)' : 'Code Client (8 chiffres)'}
                  className="bg-white border-green-200 focus:border-green-500 focus:ring-green-500 pr-24"
                  value={formData.endaCode}
                  onChange={(e) => setFormData({ ...formData, endaCode: e.target.value })}
                  disabled={isEndaVerified}
                />
                {!isEndaVerified ? (
                  <button
                    type="button"
                    onClick={handleVerifyEnda}
                    disabled={isVerifying || !formData.endaCode}
                    className="absolute right-1 top-1 bottom-1 px-4 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {isVerifying ? '...' : (language === 'ar' ? 'تحقق' : 'Vérifier')}
                  </button>
                ) : (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">✓</span>
                    {language === 'ar' ? 'تم التحقق' : 'Vérifié'}
                  </div>
                )}
              </div>
              
              {!isEndaVerified && (
                <p className="text-[11px] text-gray-500 mt-2 italic">
                  {language === 'ar' ? '* إلزامي لجميع الحرفيين' : '* Obligatoire pour tous les artisans Sou9na'}
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.firstNameLabel')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                  <Input
                    type="text"
                    placeholder={t('auth.firstNamePlaceholder')}
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.lastNameLabel')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                  <Input
                    type="text"
                    placeholder={t('auth.lastNamePlaceholder')}
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                <Input
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.phoneLabel')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                <Input
                  type="tel"
                  placeholder={t('auth.phonePlaceholder')}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="pl-10 pr-10 rtl:pl-10 rtl:pr-10"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.confirmPasswordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-terracotta focus:ring-terracotta" required />
              <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm text-gray-600">
                {t('auth.acceptTerms')}{' '}
                <Link to="#" className="text-terracotta hover:underline">
                  {t('auth.termsLink')}
                </Link>
              </span>
            </div>

            <Button type="submit" className="w-full gradient-terracotta text-white">
              {t('auth.registerButton')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-terracotta hover:underline font-medium">
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
