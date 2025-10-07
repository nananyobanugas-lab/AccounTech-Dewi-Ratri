
import React from 'react';
import { initialInvoices } from '../constants';
import type { Invoice } from '../types';

const Invoices: React.FC = () => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    
    const statusColors: { [key in Invoice['status']]: string } = {
        'Draft': 'bg-gray-100 text-gray-800',
        'Sent': 'bg-blue-100 text-blue-800',
        'Paid': 'bg-green-100 text-green-800',
        'Overdue': 'bg-red-100 text-red-800',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Daftar Faktur</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Faktur</th>
                            <th scope="col" className="px-6 py-3">Klien</th>
                            <th scope="col" className="px-6 py-3">Tanggal Terbit</th>
                            <th scope="col" className="px-6 py-3">Jatuh Tempo</th>
                            <th scope="col" className="px-6 py-3 text-right">Total</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialInvoices.map(invoice => (
                            <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                                <td className="px-6 py-4">{invoice.customerName}</td>
                                <td className="px-6 py-4">{new Date(invoice.issueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(invoice.total)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}>{invoice.status}</span>
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

export default Invoices;
