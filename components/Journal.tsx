
import React from 'react';
import { initialJournalEntries, initialAccounts } from '../constants';
import type { JournalEntry } from '../types';

const Journal: React.FC = () => {
    const formatCurrency = (value: number) => value === 0 ? '-' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    
    const getAccountName = (accountId: string) => {
        return initialAccounts.find(acc => acc.id === accountId)?.name || 'Unknown Account';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Entri Jurnal</h3>
            <div className="space-y-6">
                {initialJournalEntries.map((entry: JournalEntry) => (
                    <div key={entry.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b">
                            <div>
                                <p className="font-bold text-primary-600">{entry.id}</p>
                                <p className="text-sm text-gray-500">{entry.description}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-600">{new Date(entry.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-gray-500">
                                    <tr>
                                        <th className="text-left py-2 px-3 font-normal">Akun</th>
                                        <th className="text-right py-2 px-3 font-normal">Debit</th>
                                        <th className="text-right py-2 px-3 font-normal">Kredit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entry.items.map((item, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 px-3">
                                                <p className="font-medium text-gray-800">{getAccountName(item.accountId)}</p>
                                                <p className="text-xs text-gray-500">{item.description}</p>
                                            </td>
                                            <td className="text-right py-2 px-3 font-mono">{formatCurrency(item.debit)}</td>
                                            <td className="text-right py-2 px-3 font-mono">{formatCurrency(item.credit)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journal;
