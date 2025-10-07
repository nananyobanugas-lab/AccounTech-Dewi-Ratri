import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getChatResponse } from '../services/geminiService';
import { initialAccounts, initialContacts, initialProducts, initialEmployees } from '../constants';
import type { ChatMessage } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const renderMarkdown = (text: string) => {
    const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-sm font-mono rounded px-1 py-0.5">$1</code>')
        .replace(/\n/g, '<br />');
    return { __html: html.replace(/<br \/>(<li)/g, '$1') };
};


// Fix: Specify component props type to accept 'isOpen' and 'onClose'
const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya asisten AI AccounTech. Tanyakan apa saja tentang data keuangan, kontak, produk, atau karyawan Anda.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dataContext = React.useMemo(() => {
    const totalRevenue = initialAccounts.filter(a => a.type === 'Revenue').reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpense = initialAccounts.filter(a => a.type === 'Expense').reduce((sum, acc) => sum + acc.balance, 0);
    const totalAssets = initialAccounts.filter(a => a.type === 'Asset').reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilities = initialAccounts.filter(a => a.type === 'Liability').reduce((sum, acc) => sum + acc.balance, 0);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const customerCount = initialContacts.filter(c => c.type === 'Customer').length;
    const vendorCount = initialContacts.filter(c => c.type === 'Vendor').length;
    const productCount = initialProducts.length;
    const employeeCount = initialEmployees.length;

    return `
      Ringkasan Keuangan:
      - Total Pendapatan: ${formatCurrency(totalRevenue)}
      - Total Beban: ${formatCurrency(totalExpense)}
      - Laba Bersih: ${formatCurrency(totalRevenue - totalExpense)}
      - Total Aset: ${formatCurrency(totalAssets)}
      - Total Kewajiban: ${formatCurrency(totalLiabilities)}
      
      Ringkasan Operasional:
      - Jumlah Pelanggan: ${customerCount}
      - Jumlah Vendor: ${vendorCount}
      - Jumlah Produk: ${productCount}
      - Jumlah Karyawan: ${employeeCount}

      Daftar Vendor: ${initialContacts.filter(c => c.type === 'Vendor').map(v => v.companyName).join(', ')}
    `;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(1); // Exclude initial greeting from history
    const aiResponse = await getChatResponse(history, input, dataContext);

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);

  }, [input, isLoading, messages, dataContext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}>
      <div 
        className="fixed bottom-24 right-8 w-full max-w-md h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ease-out"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-800">Asisten AI AccounTech</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                 <div className="prose prose-sm" dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
              </div>
            </div>
          ))}
           {isLoading && (
             <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 disabled:bg-primary-300 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
