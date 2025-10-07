
import React from 'react';
import Card from './ui/Card';
import ReusableChart from './ui/Chart';
import { initialAccounts, initialInvoices } from '../constants';

const Dashboard: React.FC = () => {

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const totalRevenue = initialAccounts.find(a => a.type === 'Revenue')?.balance || 0;
  const totalExpense = initialAccounts.filter(a => a.type === 'Expense').reduce((sum, acc) => sum + acc.balance, 0);
  const netIncome = totalRevenue - totalExpense;
  const cashBalance = initialAccounts.find(a => a.name === 'Kas & Bank')?.balance || 0;

  const incomeVsExpenseData = [
    { name: 'Jan', Pendapatan: 40000000, Beban: 24000000 },
    { name: 'Feb', Pendapatan: 30000000, Beban: 13980000 },
    { name: 'Mar', Pendapatan: 20000000, Beban: 9800000 },
    { name: 'Apr', Pendapatan: 27800000, Beban: 3908000 },
    { name: 'Mei', Pendapatan: 18900000, Beban: 4800000 },
    { name: 'Jun', Pendapatan: 23900000, Beban: 3800000 },
  ];
  
  const accountDistributionData = initialAccounts
    .filter(a => ['Asset', 'Liability', 'Equity'].includes(a.type))
    .map(acc => ({ name: acc.name, value: acc.balance }));
    
  const recentActivities = [
    { id: 1, type: 'Invoice Sent', description: 'Faktur #INV-003 dikirim ke UD. Lancar Jaya', time: '2 jam lalu' },
    { id: 2, type: 'Payment Received', description: 'Pembayaran diterima dari CV. Maju Bersama', time: '1 hari lalu' },
    { id: 3, type: 'Bill Paid', description: 'Tagihan #BILL-002 untuk CV. Sinar Terang dibayar', time: '3 hari lalu' },
  ];
  
  const statusColors: {[key: string]: string} = {
    'Paid': 'bg-green-100 text-green-800',
    'Sent': 'bg-blue-100 text-blue-800',
    'Overdue': 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Pendapatan" value={formatCurrency(totalRevenue)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} change="12.5%" changeType="increase" />
        <Card title="Total Beban" value={formatCurrency(totalExpense)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>} change="5.2%" changeType="increase" />
        <Card title="Laba Bersih" value={formatCurrency(netIncome)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} change="20.1%" changeType="increase" />
        <Card title="Saldo Kas" value={formatCurrency(cashBalance)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.002 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.002 0M18 7l3 9m-3-9l-6-2" /></svg>} change="2.1%" changeType="decrease" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ReusableChart type="bar" data={incomeVsExpenseData} title="Pendapatan vs. Beban (6 Bulan Terakhir)" />
        </div>
        <div>
            <ReusableChart type="pie" data={accountDistributionData} title="Distribusi Akun" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
           <h3 className="text-lg font-semibold mb-4 text-gray-700">Aktivitas Terbaru</h3>
           <ul className="space-y-4">
             {recentActivities.map(activity => (
               <li key={activity.id} className="flex items-start">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.type === 'Invoice Sent' ? 'bg-blue-100' : activity.type === 'Payment Received' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {activity.type === 'Invoice Sent' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    {activity.type === 'Payment Received' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    {activity.type === 'Bill Paid' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                 </div>
                 <div>
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                 </div>
               </li>
             ))}
           </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Status Faktur</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Faktur</th>
                            <th scope="col" className="px-6 py-3">Klien</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialInvoices.map(invoice => (
                            <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                                <td className="px-6 py-4">{invoice.customerName}</td>
                                <td className="px-6 py-4">{formatCurrency(invoice.total)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[invoice.status]}`}>{invoice.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
