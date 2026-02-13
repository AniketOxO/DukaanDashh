
export interface AlertItem {
  id: number;
  type: 'critical' | 'warning' | 'info';
  text: string;
  time: string;
}

export interface InventoryItem {
  name: string;
  stock: number;
  status: string;
  color: string;
}

export interface DashboardStats {
  revenue: number;
  profit: number;
  cash: number;
  revenueChange: string;
  profitChange: string;
  cashChange: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  img: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
