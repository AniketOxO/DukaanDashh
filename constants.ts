
import { AlertItem, InventoryItem, Testimonial, FAQ } from './types';

export const ALERTS: AlertItem[] = [
  { id: 1, type: 'critical', text: 'Maggi Stock Low (12 units left)', time: '12m ago' },
  { id: 2, type: 'warning', text: 'Gupta Traders payment overdue (₹8,500)', time: '1h ago' },
  { id: 3, type: 'info', text: 'Atta sales up 25% this week in Area A', time: '3h ago' }
];

export const INVENTORY: InventoryItem[] = [
  { name: 'Parle-G Gold', stock: 142, status: 'In Stock', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { name: 'Amul Taza Milk', stock: 8, status: 'Critical', color: 'text-rose-600 bg-rose-50 border-rose-100' },
  { name: 'Tata Salt Lite', stock: 45, status: 'Restock Soon', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { name: 'Coca Cola 2L', stock: 0, status: 'Out of Stock', color: 'text-slate-500 bg-slate-100 border-slate-200' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "DukaanDash transformed how I look at my business. I finally know exactly which products make me money.",
    author: "Anil Sharma",
    role: "Owner, Sharma Provision Store",
    img: "https://picsum.photos/seed/anil/100/100"
  },
  {
    text: "The AI inventory predictions are scarily accurate. It told me to stock up on cold drinks 3 days before the heatwave.",
    author: "Priya Varma",
    role: "Proprietor, Varma Mart",
    img: "https://picsum.photos/seed/priya/100/100"
  },
  {
    text: "Setting up was a breeze. Integrating my Tally data took less than 10 minutes. A must-have for modern retailers.",
    author: "Karthik Raja",
    role: "Founder, Raja Electronics",
    img: "https://picsum.photos/seed/karthik/100/100"
  }
];

export const FAQS: FAQ[] = [
  { question: "Can I use it with my existing billing machine?", answer: "Yes! We integrate with all major POS systems like Vyapar, Tally, and more. No hardware change needed." },
  { question: "How safe is my customer data?", answer: "We use AES-256 encryption and follow strict GDPR compliance. Your data belongs only to you." },
  { question: "What if I have multiple shops?", answer: "DukaanDash is built for multi-store management. Control all branches from a single login." },
  { question: "Is there a mobile app?", answer: "Yes, our native iOS and Android apps allow you to monitor your business from anywhere in the world." }
];
