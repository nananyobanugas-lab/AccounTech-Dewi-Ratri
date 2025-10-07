import React, { useState } from 'react';
import { initialContacts } from '../constants';
import type { Contact } from '../types';

const Contacts: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Customer' | 'Vendor'>('All');

    const filteredContacts = initialContacts.filter(contact => {
        if (filter === 'All') return true;
        return contact.type === filter;
    });
    
    const typeColors: { [key in Contact['type']]: string } = {
        'Customer': 'bg-blue-100 text-blue-800',
        'Vendor': 'bg-purple-100 text-purple-800',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Daftar Kontak</h3>
                <div className="flex space-x-2">
                    <button onClick={() => setFilter('All')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'All' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Semua</button>
                    <button onClick={() => setFilter('Customer')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'Customer' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Pelanggan</button>
                    <button onClick={() => setFilter('Vendor')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'Vendor' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Vendor</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nama Kontak</th>
                            <th scope="col" className="px-6 py-3">Perusahaan</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Telepon</th>
                            <th scope="col" className="px-6 py-3 text-center">Tipe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.map(contact => (
                            <tr key={contact.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                                <td className="px-6 py-4">{contact.companyName}</td>
                                <td className="px-6 py-4">{contact.email}</td>
                                <td className="px-6 py-4">{contact.phone}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${typeColors[contact.type]}`}>{contact.type}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contacts;