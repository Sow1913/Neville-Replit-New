
export type Order = {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Canceled';
};
