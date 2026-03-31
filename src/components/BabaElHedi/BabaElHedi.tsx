import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Info, Gift, Leaf, History, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/store/LanguageContext';
import { BabaAvatar } from './BabaAvatar';
import type { ChatMessage } from './chatEngine';
import { 
  generateResponse, 
  createMessage, 
  WELCOME_MESSAGES, 
  QUICK_SUGGESTIONS,
} from './chatEngine';

export const BabaElHedi: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        createMessage('baba', WELCOME_MESSAGES[language], { 
          suggestions: QUICK_SUGGESTIONS[language] 
        })
      ]);
    }
  }, [language, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // User message
    const userMsg = createMessage('user', text);
    setMessages((prev: ChatMessage[]) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = generateResponse(text, language);
      const babaMsg = createMessage('baba', response.content, {
        suggestions: response.suggestions,
        products: response.products
      });
      setMessages((prev: ChatMessage[]) => [...prev, babaMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const getIcon = (label: string) => {
    if (label.includes('cadeau') || label.includes('هدية')) return <Gift className="w-3 h-3" />;
    if (label.includes('écolor') || label.includes('بيئي') || label.includes('éco')) return <Leaf className="w-3 h-3" />;
    if (label.includes('circulaire') || label.includes('دورة')) return <Info className="w-3 h-3" />;
    if (label.includes('histoire') || label.includes('احكيلي')) return <History className="w-3 h-3" />;
    if (label.includes('artisan') || label.includes('حرفي')) return <Users className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] sm:w-[420px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden pointer-events-auto mb-6"
          >
            {/* Header */}
            <div className="gradient-terracotta p-4 sm:p-6 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                  <BabaAvatar size={45} className="pulse-slow" />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight">{t('chatbot.babaName')}</h3>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest leading-none">
                    {t('chatbot.babaRole')}
                  </p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label={t('common.back')}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fdfbf7] custom-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-medium leading-relaxed shadow-sm transition-all ${
                    msg.role === 'user' 
                      ? 'bg-terracotta text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {/* Product Cards */}
                  {msg.products && (
                    <div className="grid grid-cols-1 gap-3 mt-3 w-full">
                      {msg.products.map((product, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                          <div className="w-14 h-14 bg-sand/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {product.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                            <div className="flex items-center gap-3">
                              <span className="text-terracotta font-black text-sm">{product.price}</span>
                              <div className="px-2 py-0.5 rounded-full bg-olive/10 text-olive text-[10px] font-bold">
                                {product.ecoScore} ECO
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="rounded-full text-terracotta bg-terracotta/5 hover:bg-terracotta hover:text-white"
                            onClick={() => window.open(product.link, '_blank')}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestions (only for baba's last message) */}
                  {msg === messages[messages.length - 1] && msg.role === 'baba' && msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(s)}
                          className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-gray-700 text-xs font-bold shadow-sm hover:border-terracotta/40 hover:bg-terracotta/5 hover:text-terracotta transition-all flex items-center gap-2"
                        >
                          {getIcon(s)}
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3 animate-fade-in">
                  <BabaAvatar size={30} />
                  <div className="bg-white p-3 rounded-2xl border border-gray-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex gap-3"
              >
                <Input
                  placeholder={t('chatbot.inputPlaceholder')}
                  className="rounded-2xl border-gray-200 h-12 focus-visible:ring-terracotta"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                />
                <Button 
                  size="icon" 
                  className="rounded-2xl gradient-terracotta h-12 w-12 flex-shrink-0 shadow-lg shadow-terracotta/20 hover:scale-105 active:scale-95 transition-transform"
                  disabled={isTyping}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-white shadow-[0_10px_30px_rgba(199,91,57,0.3)] border-2 border-terracotta/40 flex items-center justify-center cursor-pointer pointer-events-auto relative group active:ring-4 active:ring-terracotta/20 overflow-visible transition-all"
        aria-label={t('chatbot.triggerLabel')}
      >
        <BabaAvatar size={60} className="group-hover:scale-110 transition-transform" />
        
        {/* Animated Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-olive rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white"
          >
            1
          </motion.div>
        )}

        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-terracotta/20 animate-ping pointer-events-none" />
      </motion.button>
    </div>
  );
};
