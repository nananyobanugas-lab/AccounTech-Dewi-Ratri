export type Page = 'Dashboard' | 'Buku Besar' | 'Jurnal' | 'Faktur' | 'Tagihan' | 'Laporan' | 'Kontak' | 'Produk' | 'Karyawan';

export interface Account {
  id: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export interface JournalEntryItem {
  accountId: string;
  debit: number;
  credit: number;
  description: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  items: JournalEntryItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  contactId: string; // Updated from customerName
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
}

export interface BillItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  contactId: string; // Updated from vendorName
  issueDate: string;
  dueDate: string;
  items: BillItem[];
  total: number;
  status: 'Draft' | 'Awaiting Payment' | 'Paid';
}

// For AI Chat
export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// Odoo-inspired modules
export interface Contact {
  id: string;
  name: string;
  type: 'Customer' | 'Vendor';
  email: string;
  phone: string;
  companyName: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'Storable' | 'Service';
  salePrice: number;
  cost: number;
  quantityOnHand: number;
}

export interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    hireDate: string;
    avatarUrl: string;
}