import type { Account, JournalEntry, Invoice, Bill, Contact, Product, Employee } from './types';

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

export const initialContacts: Contact[] = [
    { id: 'CUST-001', name: 'Andi Budianto', type: 'Customer', email: 'andi.b@example.com', phone: '081234567890', companyName: 'PT. Klien Sejahtera' },
    { id: 'CUST-002', name: 'Citra Lestari', type: 'Customer', email: 'citra.l@example.com', phone: '081223344556', companyName: 'CV. Maju Bersama' },
    { id: 'CUST-003', name: 'Doni Firmansyah', type: 'Customer', email: 'doni.f@example.com', phone: '081567891234', companyName: 'UD. Lancar Jaya' },
    { id: 'VEND-001', name: 'Eka Wijaya', type: 'Vendor', email: 'eka.w@example.com', phone: '085611112222', companyName: 'PT. Supplier Handal' },
    { id: 'VEND-002', name: 'Fina Rahmawati', type: 'Vendor', email: 'fina.r@example.com', phone: '085733334444', companyName: 'CV. Sinar Terang' },
];

export const initialProducts: Product[] = [
    { id: 'PROD-001', name: 'Jasa Konsultasi Strategis', type: 'Service', salePrice: 5000000, cost: 0, quantityOnHand: 0 },
    { id: 'PROD-002', name: 'Lisensi Software Akuntansi Pro', type: 'Service', salePrice: 1500000, cost: 250000, quantityOnHand: 0 },
    { id: 'PROD-003', name: 'Produk A - Widget Premium', type: 'Storable', salePrice: 200000, cost: 120000, quantityOnHand: 150 },
    { id: 'PROD-004', name: 'Bahan Baku X', type: 'Storable', salePrice: 0, cost: 50000, quantityOnHand: 500 },
    { id: 'PROD-005', name: 'Jasa Pengiriman Logistik', type: 'Service', salePrice: 1000000, cost: 0, quantityOnHand: 0 },
];

export const initialEmployees: Employee[] = [
    { id: 'EMP-001', name: 'Jane Doe', position: 'Administrator', department: 'Operasional', email: 'jane.doe@acmetech.com', hireDate: '2022-01-15', avatarUrl: 'https://picsum.photos/id/1005/100' },
    { id: 'EMP-002', name: 'John Smith', position: 'Akuntan Senior', department: 'Keuangan', email: 'john.smith@acmetech.com', hireDate: '2021-08-20', avatarUrl: 'https://picsum.photos/id/100/100' },
    { id: 'EMP-003', name: 'Maria Garcia', position: 'Staf Penjualan', department: 'Penjualan', email: 'maria.g@acmetech.com', hireDate: '2023-03-10', avatarUrl: 'https://picsum.photos/id/1011/100' },
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
    contactId: 'CUST-001',
    issueDate: '2023-10-26',
    dueDate: '2023-11-25',
    items: [{ description: 'Jasa Konsultasi', quantity: 1, price: 5000000, total: 5000000 }],
    total: 5000000,
    status: 'Sent'
  },
  {
    id: 'INV-002',
    contactId: 'CUST-002',
    issueDate: '2023-09-15',
    dueDate: '2023-10-15',
    items: [{ description: 'Lisensi Software', quantity: 2, price: 1500000, total: 3000000 }],
    total: 3000000,
    status: 'Overdue'
  },
   {
    id: 'INV-003',
    contactId: 'CUST-003',
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
        contactId: 'VEND-001',
        issueDate: '2023-10-10',
        dueDate: '2023-11-09',
        items: [{ description: 'Bahan Baku X', quantity: 100, price: 50000, total: 5000000 }],
        total: 5000000,
        status: 'Awaiting Payment'
    },
    {
        id: 'BILL-002',
        contactId: 'VEND-002',
        issueDate: '2023-10-15',
        dueDate: '2023-11-14',
        items: [{ description: 'Jasa Pengiriman', quantity: 1, price: 1000000, total: 1000000 }],
        total: 1000000,
        status: 'Paid'
    }
];