
import React, { useState, useCallback } from 'react';
import { initialAccounts } from '../constants';
import { getFinancialAnalysis } from '../services/geminiService';

const Reports: React.FC = () => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const revenues = initialAccounts.filter(a => a.type === 'Revenue');
    const expenses = initialAccounts.filter(a => a.type === 'Expense');
    const totalRevenue = revenues.reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpense = expenses.reduce((sum, acc) => sum + acc.balance, 0);
    const netIncome = totalRevenue - totalExpense;

    const assets = initialAccounts.filter(a => a.type === 'Asset');
    const liabilities = initialAccounts.filter(a => a.type === 'Liability');
    const equity = initialAccounts.filter(a => a.type === 'Equity');
    const totalAssets = assets.reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilitiesAndEquity = liabilities.reduce((sum, acc) => sum + acc.balance, 0) + equity.reduce((sum, acc) => sum + acc.balance, 0);

    const handleAnalyze = useCallback(async () => {
        setIsLoading(true);
        setAnalysis('');
        const summary = `
            Laporan Laba Rugi:
            - Total Pendapatan: ${formatCurrency(totalRevenue)}
            - Total Beban: ${formatCurrency(totalExpense)}
            - Laba Bersih: ${formatCurrency(netIncome)}
            
            Neraca:
            - Total Aset: ${formatCurrency(totalAssets)}
            - Total Kewajiban dan Ekuitas: ${formatCurrency(totalLiabilitiesAndEquity)}
        `;
        const result = await getFinancialAnalysis(summary);
        setAnalysis(result);
        setIsLoading(false);
    }, [totalRevenue, totalExpense, netIncome, totalAssets, totalLiabilitiesAndEquity]);
    
    // Simple markdown to HTML renderer
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
            .replace(/\n/g, '<br />');

        return { __html: html.replace(/<br \/>(<li)/g, '$1') };
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profit & Loss */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Laporan Laba Rugi</h3>
                    <div className="space-y-2">
                        <div className="font-semibold text-gray-600">Pendapatan</div>
                        {revenues.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center text-sm pl-4">
                                <span>{acc.name}</span>
                                <span>{formatCurrency(acc.balance)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold pt-2 border-t">
                            <span>Total Pendapatan</span>
                            <span>{formatCurrency(totalRevenue)}</span>
                        </div>
                        <div className="font-semibold text-gray-600 pt-4">Beban</div>
                        {expenses.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center text-sm pl-4">
                                <span>{acc.name}</span>
                                <span>{formatCurrency(acc.balance)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold pt-2 border-t">
                            <span>Total Beban</span>
                            <span>{formatCurrency(totalExpense)}</span>
                        </div>
                        <div className={`flex justify-between items-center font-bold text-lg pt-4 border-t-2 ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <span>Laba Bersih</span>
                            <span>{formatCurrency(netIncome)}</span>
                        </div>
                    </div>
                </div>

                {/* Balance Sheet */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Neraca</h3>
                    <div className="space-y-2">
                        <div className="font-semibold text-gray-600">Aset</div>
                        {assets.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center text-sm pl-4">
                                <span>{acc.name}</span>
                                <span>{formatCurrency(acc.balance)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold pt-2 border-t">
                            <span>Total Aset</span>
                            <span>{formatCurrency(totalAssets)}</span>
                        </div>
                        <div className="font-semibold text-gray-600 pt-4">Kewajiban & Ekuitas</div>
                        {liabilities.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center text-sm pl-4">
                                <span>{acc.name}</span>
                                <span>{formatCurrency(acc.balance)}</span>
                            </div>
                        ))}
                         {equity.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center text-sm pl-4">
                                <span>{acc.name}</span>
                                <span>{formatCurrency(acc.balance)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold pt-2 border-t">
                            <span>Total Kewajiban & Ekuitas</span>
                            <span>{formatCurrency(totalLiabilitiesAndEquity)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Analysis Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Analisis Keuangan AI</h3>
                    <button onClick={handleAnalyze} disabled={isLoading} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-300 disabled:bg-primary-300 flex items-center shadow-sm">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menganalisis...
                            </>
                        ) : 'Dapatkan Analisis'}
                    </button>
                 </div>
                 <div className="bg-primary-50 p-4 rounded-lg min-h-[150px] text-gray-700 leading-relaxed">
                     {isLoading && <p className="text-center text-gray-500">AI sedang menganalisis data keuangan Anda...</p>}
                     {analysis && <div dangerouslySetInnerHTML={renderMarkdown(analysis)} />}
                     {!isLoading && !analysis && <p className="text-center text-gray-500">Klik tombol "Dapatkan Analisis" untuk melihat wawasan dari AI.</p>}
                 </div>
            </div>
        </div>
    );
};

export default Reports;
