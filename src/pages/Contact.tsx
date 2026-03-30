import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useSEO } from '@/hooks';

import { useLanguage } from '@/store/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const { SEOComponent } = useSEO();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(t('contact.successMessage'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-4">

      {/* Hero */}
      <div className="bg-gradient-to-br from-deep-blue/10 to-terracotta/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('contact.infoTitle')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{t('contact.address')}</h3>
                      <p className="text-gray-600 text-sm">{t('contact.addressValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-olive/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-olive" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{t('contact.phone')}</h3>
                      <p className="text-gray-600 text-sm">{t('contact.phoneValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warm-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-warm-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{t('contact.email')}</h3>
                      <p className="text-gray-600 text-sm">{t('contact.emailValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-deep-blue/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-deep-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{t('contact.hours')}</h3>
                      <p className="text-gray-600 text-sm">{t('contact.hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('contact.formTitle')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.nameLabel')}
                      </label>
                      <Input
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.emailLabel')}
                      </label>
                      <Input
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.subjectLabel')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('contact.subjectPlaceholder')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.messageLabel')}
                    </label>
                    <Textarea
                      placeholder={t('contact.messagePlaceholder')}
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="gradient-terracotta text-white w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                    {t('contact.sendButton')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
