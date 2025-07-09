// src/types/TransactionInterface.ts
export interface TransactionInterface {
  id: string;
  date: string;
  value: number;
  type: string;
  category: string;
  subcategory: string;
  name: string;
  account: string;
  notes: string;
}
