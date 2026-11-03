// ============================================================
// SAI GOLD COVERING – Configuration & Navigation Architecture
// ============================================================

export const SITE_CONFIG = {
  name: 'Sai Gold Covering',
  tagline: 'Everything Beautiful, All in One Place',
  description:
    'Coimbatore’s complete women’s shopping destination for imitation jewellery, gold covering chains, bangles, bridal malas, cosmetics, and fancy accessories.',

  whatsappNumber: '919865132486', // Primary WhatsApp order number
  phoneRaw: '919865132486',
  phone: '+91 98651 32486',
  primaryPhone: '+91 98651 32486',
  secondaryPhone: '+91 80121 07626',
  secondaryPhoneRaw: '918012107626',

  address: {
    line1: '1/433A11 Sri Kumaran Complex',
    line2: '4 Corner Signal, Pollachi Main Road',
    line3: 'Guruvayur Nagar, Malumichampatti',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641050',
    country: 'India',
    full: '1/433A11 Sri Kumaran Complex, 4 Corner Signal, Pollachi Main Road, Guruvayur Nagar, Malumichampatti, Tamil Nadu 641050, India.',
  },

  instagram: 'https://www.instagram.com/saigoldcovering/',
  instagramUrl: 'https://www.instagram.com/saigoldcovering/',
  googleMapsUrl:
    'https://maps.google.com/?q=Malumichampatti,Coimbatore,Tamil+Nadu+641050',

  url: 'https://saigoldcovering.com',
  ogImage: '/images/products/necklaces/bridal-necklace-set.jpg',
} as const;

export const WHATSAPP_ORDER_URL = (
  productName: string,
  productId: string,
  price: string,
  quantity: number,
  productUrl: string
) => {
  const message = `Vanakkam Sai Gold Covering! ✨

I would like to order:
🛍️ Product: ${productName}
🆔 Item ID: ${productId}
💰 Price: ${price}
📦 Quantity: ${quantity}
🔗 Link: ${productUrl}

Please confirm availability and share pickup / delivery details. Nandri!`;

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_CART_URL = (cartSummary: string) => {
  const message = `Vanakkam Sai Gold Covering! ✨

I want to place an order from your website:

${cartSummary}

Please verify availability and dispatch / store pickup details. Nandri!`;

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/shop' },
  {
    label: 'Jewellery',
    href: '/shop?category=jewellery',
    hasMega: true,
    megaItems: [
      { label: 'Traditional Gold Chains', href: '/shop?category=chains' },
      { label: 'Long Chains & Malas', href: '/shop?category=chains' },
      { label: 'Necklace Sets & Chokers', href: '/shop?category=necklaces' },
      { label: 'Temple Jewellery & Kasu', href: '/shop?category=necklaces' },
    ],
  },
  {
    label: 'Bangles',
    href: '/shop?category=bangles',
    hasMega: true,
    megaItems: [
      { label: 'Daily Wear Bangles', href: '/shop?category=bangles' },
      { label: 'Antique Kadas & Screw Bangles', href: '/shop?category=bangles' },
      { label: 'Red & Green Stone Bangles', href: '/shop?category=bangles' },
      { label: 'Colourful Glass Bangles', href: '/shop?category=bangles' },
    ],
  },
  {
    label: 'Cosmetics',
    href: '/shop?category=cosmetics',
    hasMega: true,
    megaItems: [
      { label: 'Velvet Matte Lipsticks', href: '/shop?category=cosmetics' },
      { label: 'Compact Powders & Foundation', href: '/shop?category=cosmetics' },
      { label: 'Herbal Kajal & Eyeliners', href: '/shop?category=cosmetics' },
      { label: 'Kumkumadi Creams & Mists', href: '/shop?category=cosmetics' },
    ],
  },
  {
    label: 'Fancy Accessories',
    href: '/shop?category=fancy-items',
    hasMega: true,
    megaItems: [
      { label: 'Bridal Jadai Billais', href: '/shop?category=fancy-items' },
      { label: 'Pearl Claw Clips & Pins', href: '/shop?category=fancy-items' },
      { label: 'Velvet & Stone Bindis', href: '/shop?category=fancy-items' },
      { label: 'Musical Ghungroo Kolusu Anklets', href: '/shop?category=fancy-items' },
    ],
  },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
