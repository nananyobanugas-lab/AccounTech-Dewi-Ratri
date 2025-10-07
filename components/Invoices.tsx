import React, { useState } from 'react';
import { initialInvoices, initialContacts } from '../constants';
import type { Invoice } from '../types';
import CreateInvoiceModal from './CreateInvoiceModal';

const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    
    const statusColors: { [key in Invoice['status']]: string } = {
        'Draft': 'bg-gray-100 text-gray-800',
        'Sent': 'bg-blue-100 text-blue-800',
        'Paid': 'bg-green-100 text-green-800',
        'Overdue': 'bg-red-100 text-red-800',
    };

    const getContactName = (contactId: string) => {
        const contact = initialContacts.find(c => c.id === contactId);
        return contact ? contact.companyName : 'Unknown Contact';
    };
    
    const handleSaveInvoice = (newInvoice: Invoice) => {
        setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
        setIsModalOpen(false);
    };

    return (
        <>
            <CreateInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveInvoice}
                nextInvoiceId={`INV-${String(invoices.length + 1).padStart(3, '0')}`}
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Daftar Faktur</h3>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-300 flex items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        Buat Faktur Baru
                    </button>
                </div>
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
                            {invoices.map(invoice => (
                                <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                                    <td className="px-6 py-4">{getContactName(invoice.contactId)}</td>
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
        </>
    );
};

export default Invoices;