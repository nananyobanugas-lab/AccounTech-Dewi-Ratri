
export type Page = 'Dashboard' | 'Buku Besar' | 'Jurnal' | 'Faktur' | 'Tagihan' | 'Laporan';

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
  customerName: string;
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
  vendorName: string;
  issueDate: string;
  dueDate: string;
  items: BillItem[];
  total: number;
  status: 'Draft' | 'Awaiting Payment' | 'Paid';
}
