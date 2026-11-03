// ============================================================
// Reviews for Sai Gold Covering (Customer Feedback)
// ============================================================

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  productName: string;
  comment: string;
  date: string;
  isDemo: boolean;
}

export const reviews: ReviewItem[] = [
  {
    id: 'REV-01',
    name: 'Sangeetha Murugan',
    rating: 5,
    productName: 'Traditional Gold Chain & Bangles',
    comment: 'The micro gold covering luster is indistinguishable from 22k gold! I wear it for daily temple visits without any fading. Coimbatore’s best shop.',
    date: '2025-01-14',
    isDemo: true,
  },
  {
    id: 'REV-02',
    name: 'Deepika Ramanathan',
    rating: 5,
    productName: 'Bridal Necklace Set & Jadai Billai',
    comment: 'Purchased my sister’s complete muhurtham jewellery stack and hair billais. We also ordered matching velvet lipsticks. Outstanding customer service!',
    date: '2025-01-28',
    isDemo: true,
  },
  {
    id: 'REV-03',
    name: 'Karpagam V.',
    rating: 5,
    productName: 'Velvet Matte Lipstick Collection',
    comment: 'So convenient to find long-stay cosmetics, bangles, and bindi booklets in one welcoming local store in Malumichampatti.',
    date: '2025-02-04',
    isDemo: true,
  },
  {
    id: 'REV-04',
    name: 'Aishwarya K.',
    rating: 5,
    productName: 'Colourful Glass Bangles (Dozen)',
    comment: 'The glass bangles sparkle beautifully under wedding lights. Placed the order via WhatsApp and picked it up directly at 4 Corner Signal.',
    date: '2025-02-18',
    isDemo: true,
  },
];

