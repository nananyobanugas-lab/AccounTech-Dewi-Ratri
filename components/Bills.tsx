import React from 'react';
import { initialBills, initialContacts } from '../constants';
import type { Bill } from '../types';

const Bills: React.FC = () => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    
    const statusColors: { [key in Bill['status']]: string } = {
        'Draft': 'bg-gray-100 text-gray-800',
        'Awaiting Payment': 'bg-yellow-100 text-yellow-800',
        'Paid': 'bg-green-100 text-green-800',
    };

    const getContactName = (contactId: string) => {
        const contact = initialContacts.find(c => c.id === contactId);
        return contact ? contact.companyName : 'Unknown Contact';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Daftar Tagihan</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Tagihan</th>
                            <th scope="col" className="px-6 py-3">Vendor</th>
                            <th scope="col" className="px-6 py-3">Tanggal Terbit</th>
                            <th scope="col" className="px-6 py-3">Jatuh Tempo</th>
                            <th scope="col" className="px-6 py-3 text-right">Total</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialBills.map(bill => (
                            <tr key={bill.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{bill.id}</td>
                                <td className="px-6 py-4">{getContactName(bill.contactId)}</td>
                                <td className="px-6 py-4">{new Date(bill.issueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-6 py-4">{new Date(bill.dueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(bill.total)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[bill.status]}`}>{bill.status}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <a href="#" className="font-medium text-primary-600 hover:underline">Detail</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bills;