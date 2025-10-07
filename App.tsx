
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GeneralLedger from './components/GeneralLedger';
import Journal from './components/Journal';
import Invoices from './components/Invoices';
import Bills from './components/Bills';
import Reports from './components/Reports';
import Header from './components/Header';
import type { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Buku Besar':
        return <GeneralLedger />;
      case 'Jurnal':
        return <Journal />;
      case 'Faktur':
        return <Invoices />;
      case 'Tagihan':
        return <Bills />;
      case 'Laporan':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
