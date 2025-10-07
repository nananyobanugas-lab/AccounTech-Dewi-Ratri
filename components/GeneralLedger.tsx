
import React from 'react';
import { initialAccounts } from '../constants';

const GeneralLedger: React.FC = () => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Bagan Akun (Chart of Accounts)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Akun</th>
                            <th scope="col" className="px-6 py-3">Nama Akun</th>
                            <th scope="col" className="px-6 py-3">Tipe</th>
                            <th scope="col" className="px-6 py-3 text-right">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialAccounts.map(account => (
                            <tr key={account.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{account.id}</td>
                                <td className="px-6 py-4">{account.name}</td>
                                <td className="px-6 py-4">{account.type}</td>
                                <td className={`px-6 py-4 text-right font-semibold ${account.balance >= 0 ? 'text-gray-800' : 'text-red-500'}`}>
                                    {formatCurrency(account.balance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GeneralLedger;
