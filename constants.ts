
import type { Account, JournalEntry, Invoice, Bill } from './types';

export const initialAccounts: Account[] = [
  { id: '101', name: 'Kas & Bank', type: 'Asset', balance: 50000000 },
  { id: '102', name: 'Piutang Usaha', type: 'Asset', balance: 15000000 },
  { id: '103', name: 'Persediaan', type: 'Asset', balance: 25000000 },
  { id: '201', name: 'Utang Usaha', type: 'Liability', balance: 10000000 },
  { id: '301', name: 'Modal Disetor', type: 'Equity', balance: 70000000 },
  { id: '401', name: 'Pendapatan Penjualan', type: 'Revenue', balance: 50000000 },
  { id: '501', name: 'Beban Gaji', type: 'Expense', balance: 15000000 },
  { id: '502', name: 'Beban Sewa', type: 'Expense', balance: 5000000 },
];

export const initialJournalEntries: JournalEntry[] = [
    {
        id: 'JE-001',
        date: '2023-10-01',
        description: 'Pembayaran gaji karyawan September',
        items: [
            { accountId: '501', debit: 15000000, credit: 0, description: 'Gaji September' },
            { accountId: '101', debit: 0, credit: 15000000, description: 'Pembayaran via bank' }
        ]
    },
    {
        id: 'JE-002',
        date: '2023-10-05',
        description: 'Penjualan barang secara kredit',
        items: [
            { accountId: '102', debit: 10000000, credit: 0, description: 'Invoice #INV-001' },
            { accountId: '401', debit: 0, credit: 10000000, description: 'Penjualan kredit' }
        ]
    }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-001',
    customerName: 'PT. Klien Sejahtera',
    issueDate: '2023-10-26',
    dueDate: '2023-11-25',
    items: [{ description: 'Jasa Konsultasi', quantity: 1, price: 5000000, total: 5000000 }],
    total: 5000000,
    status: 'Sent'
  },
  {
    id: 'INV-002',
    customerName: 'CV. Maju Bersama',
    issueDate: '2023-09-15',
    dueDate: '2023-10-15',
    items: [{ description: 'Lisensi Software', quantity: 2, price: 1500000, total: 3000000 }],
    total: 3000000,
    status: 'Overdue'
  },
   {
    id: 'INV-003',
    customerName: 'UD. Lancar Jaya',
    issueDate: '2023-10-20',
    dueDate: '2023-11-19',
    items: [{ description: 'Produk A', quantity: 10, price: 200000, total: 2000000 }],
    total: 2000000,
    status: 'Paid'
  }
];

export const initialBills: Bill[] = [
    {
        id: 'BILL-001',
        vendorName: 'PT. Supplier Handal',
        issueDate: '2023-10-10',
        dueDate: '2023-11-09',
        items: [{ description: 'Bahan Baku X', quantity: 100, price: 50000, total: 5000000 }],
        total: 5000000,
        status: 'Awaiting Payment'
    },
    {
        id: 'BILL-002',
        vendorName: 'CV. Sinar Terang',
        issueDate: '2023-10-15',
        dueDate: '2023-11-14',
        items: [{ description: 'Jasa Pengiriman', quantity: 1, price: 1000000, total: 1000000 }],
        total: 1000000,
        status: 'Paid'
    }
];
