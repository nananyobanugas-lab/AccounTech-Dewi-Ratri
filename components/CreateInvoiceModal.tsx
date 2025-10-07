
import React, { useState, useMemo } from 'react';
import type { Invoice, InvoiceItem } from '../types';
import { initialContacts } from '../constants';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  nextInvoiceId: string;
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose, onSave, nextInvoiceId }) => {
  const [contactId, setContactId] = useState<string>('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<Omit<InvoiceItem, 'total'>[]>([{ description: '', quantity: 1, price: 0 }]);
  
  const handleItemChange = (index: number, field: keyof Omit<InvoiceItem, 'total'>, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0);
  }, [items]);

  const handleSubmit = () => {
    if (!contactId || items.length === 0) {
      alert("Harap pilih klien dan tambahkan setidaknya satu item.");
      return;
    }

    const newInvoice: Invoice = {
      id: nextInvoiceId,
      contactId,
      issueDate,
      dueDate,
      items: items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price),
          total: Number(item.quantity) * Number(item.price)
      })),
      total: totalAmount,
      status: 'Draft',
    };
    onSave(newInvoice);
    // Reset form
    setContactId('');
    setIssueDate(new Date().toISOString().split('T')[0]);
    setDueDate('');
    setItems([{ description: '', quantity: 1, price: 0 }]);
  };

  if (!isOpen) return null;

  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Buat Faktur Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Pelanggan</label>
              <select
                id="customer"
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>Pilih Klien</option>
                {initialContacts.filter(c => c.type === 'Customer').map(contact => (
                  <option key={contact.id} value={contact.id}>{contact.companyName}</option>
                ))}
              </select>
            </div>
             <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Tanggal Terbit</label>
                <input type="date" id="issueDate" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
             </div>
             <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Jatuh Tempo</label>
                <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
             </div>
          </div>

          {/* Items Table */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Item Faktur</h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <input type="text" placeholder="Deskripsi" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-5 border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="col-span-2 border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  <input type="number" placeholder="Harga" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} className="col-span-3 border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  <div className="col-span-1 text-right">
                    <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addItem} className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-800">+ Tambah Item</button>
          </div>
          
          {/* Total */}
          <div className="flex justify-end pt-4 border-t">
              <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
          </div>

        </div>

        <div className="flex justify-end items-center p-4 bg-gray-50 border-t rounded-b-lg space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-primary-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-700">Simpan Faktur</button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;
