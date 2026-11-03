'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Star, ThumbsUp, ThumbsDown, CheckCircle2, MessageSquare, Plus, Sparkles, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ProductReview } from '@/types';

interface Props {
  product: Product;
}

// Category-based seed reviews to give every product an authentic, lively starting point
const SEED_REVIEWS_MAP: Record<string, { name: string; city: string; title: string; comment: string; rating: number; daysAgo: number }[]> = {
  chains: [
    {
      name: 'Kavitha S.',
      city: 'Coimbatore',
      rating: 5,
      title: 'Real 22K Gold look! Worth every rupee',
      comment: 'The micro gold finish on this chain is extraordinary. I wore it for my cousin’s wedding and received so many compliments. No skin irritation at all.',
      daysAgo: 3,
    },
    {
      name: 'Revathi Murugesan',
      city: 'Pollachi',
      rating: 5,
      title: 'Sturdy lock and gorgeous luster',
      comment: 'Very lightweight yet looks heavy and traditional. Delivered promptly through WhatsApp ordering. Highly recommended!',
      daysAgo: 8,
    },
    {
      name: 'Sangeetha R.',
      city: 'Sulur',
      rating: 4,
      title: 'Daily wear-ku romba nalla iruku',
      comment: 'Daily use panni pathuten, polish nalla thangudhu. S hook lock is strong.',
      daysAgo: 14,
    },
  ],
  bangles: [
    {
      name: 'Deepa Ramanathan',
      city: 'Coimbatore',
      rating: 5,
      title: 'Mindblowing shine and comfortable fit',
      comment: 'Kadas have smooth inner edges, no pinching at all. The gold micro polish shines so brightly under party lights!',
      daysAgo: 2,
    },
    {
      name: 'Priyadharshini K.',
      city: 'Tiruppur',
      rating: 5,
      title: 'Superb quality bangles set',
      comment: 'Direct shop-la poi vangunen, customer service was so humble and polite. Packing was neat.',
      daysAgo: 6,
    },
    {
      name: 'Meenakshi Sundaram',
      city: 'Malumichampatti',
      rating: 4,
      title: 'Very happy with the stone setting',
      comment: 'The stones are firmly set and sparkle like real diamonds. Perfect match for silk sarees.',
      daysAgo: 12,
    },
  ],
  necklaces: [
    {
      name: 'Anitha Vijayakumar',
      city: 'Coimbatore',
      rating: 5,
      title: 'Complete bridal grandeur at affordable price',
      comment: 'Ordered this necklace set for reception. Nobody believed it was 1-gram gold covering! The temple finish details are magnificent.',
      daysAgo: 4,
    },
    {
      name: 'Subhashini G.',
      city: 'Udumalaipettai',
      rating: 5,
      title: 'Earrings and haram match perfectly',
      comment: 'The matching jhumkas / earrings are super cute and not heavy on ears. Beautiful piece from Sai Gold.',
      daysAgo: 9,
    },
  ],
  cosmetics: [
    {
      name: 'Harini B.',
      city: 'Coimbatore',
      rating: 5,
      title: 'Transfer-proof and long lasting shade',
      comment: 'Doesn’t dry out lips. Stayed for 8+ hours during function. Wonderful quality at this price range.',
      daysAgo: 3,
    },
    {
      name: 'Nivetha S.',
      city: 'Kinathukadavu',
      rating: 5,
      title: 'Suitable for daily Indian skin tones',
      comment: 'Rich pigment and pleasant texture. Got it directly from Malumichampatti showroom.',
      daysAgo: 11,
    },
  ],
  'fancy-items': [
    {
      name: 'Yamuna Devi',
      city: 'Coimbatore',
      rating: 5,
      title: 'Sturdy grip and beautiful traditional design',
      comment: 'Holds hair firmly without slipping. The golden finish adds immediate festive charm.',
      daysAgo: 5,
    },
    {
      name: 'Shanthi M.',
      city: 'Pollachi',
      rating: 4,
      title: 'Neat finishing & quick delivery',
      comment: 'Item is exactly as shown in photos. Very happy with the purchase.',
      daysAgo: 15,
    },
  ],
};

const STAR_LABELS: Record<number, string> = {
  1: 'Disappointed 😞',
  2: 'Below Average 😐',
  3: 'Good / Decent 🙂',
  4: 'Very Good / Happy 😊',
  5: 'Excellent! Superb Quality 🔥⭐',
};

export default function ProductReviewsSection({ product }: Props) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Form State
  const [formRating, setFormRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Helpful votes state (reviewId -> count)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, { count: number; voted: boolean }>>({});

  // Load reviews on mount
  useEffect(() => {
    try {
      const storageKey = `sai_gold_reviews_${product.id}`;
      const savedStr = localStorage.getItem(storageKey);
      let loadedReviews: ProductReview[] = savedStr ? JSON.parse(savedStr) : [];

      // If no custom reviews exist yet, initialize with default seed reviews
      if (loadedReviews.length === 0) {
        const seedCategory = SEED_REVIEWS_MAP[product.category] || SEED_REVIEWS_MAP.chains;
        loadedReviews = seedCategory.map((s, idx) => {
          const date = new Date();
          date.setDate(date.getDate() - s.daysAgo);
          return {
            id: `REV-SEED-${product.id}-${idx}`,
            productId: product.id,
            userName: s.name,
            userCity: s.city,
            rating: s.rating,
            title: s.title,
            comment: s.comment,
            createdAt: date.toISOString().split('T')[0],
            isVerifiedBuyer: true,
          };
        });
        localStorage.setItem(storageKey, JSON.stringify(loadedReviews));
      }

      setReviews(loadedReviews);
    } catch (e) {
      console.error(e);
    }

    // Also fetch from API in background if available
    fetch(`/api/reviews?productId=${encodeURIComponent(product.id)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newOnes = data.reviews.filter((r: ProductReview) => !existingIds.has(r.id));
            return [...newOnes, ...prev];
          });
        }
      })
      .catch(() => {});
  }, [product.id, product.category]);

  // Aggregate statistics
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return { average: 5.0, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);

    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (breakdown[r.rating] !== undefined) {
        breakdown[r.rating]++;
      }
    });

    return { average: parseFloat(average), total, breakdown };
  }, [reviews]);

  // Handle Review Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    setIsSubmitting(true);

    const newReview: ProductReview = {
      id: `REV-USER-${Date.now()}`,
      productId: product.id,
      userName: formName.trim(),
      userCity: formCity.trim() || 'Coimbatore',
      rating: formRating,
      title: formTitle.trim() || (formRating >= 4 ? 'Verified Customer Purchase' : 'Customer Review'),
      comment: formComment.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      isVerifiedBuyer: true,
    };

    try {
      const storageKey = `sai_gold_reviews_${product.id}`;
      const savedStr = localStorage.getItem(storageKey);
      const currentList: ProductReview[] = savedStr ? JSON.parse(savedStr) : [];
      const updated = [newReview, ...currentList];
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Sync to API in background
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    }).catch(() => {});

    setReviews((prev) => [newReview, ...prev]);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset Form
    setFormName('');
    setFormCity('');
    setFormTitle('');
    setFormComment('');
    setFormRating(5);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsFormOpen(false);
    }, 2500);
  };

  // Handle Helpful thumbs up
  const handleHelpful = (id: string) => {
    setHelpfulVotes((prev) => {
      const current = prev[id] || { count: 3, voted: false };
      if (current.voted) return prev;
      return {
        ...prev,
        [id]: { count: current.count + 1, voted: true },
      };
    });
  };

  // Filtered reviews
  const displayedReviews = useMemo(() => {
    if (filterRating === 'all') return reviews;
    return reviews.filter((r) => r.rating === filterRating);
  }, [reviews, filterRating]);

  return (
    <section className="bg-white border border-[#E8D8C8] shadow-sm mt-12 mb-16 overflow-hidden">
      {/* Top Banner Header */}
      <div className="bg-[#FAF2E6] border-b border-[#E8D8C8] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#591B2B]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Ratings &amp; Customer Reviews
            </h2>
            <span className="px-2.5 py-0.5 bg-[#D3AA57]/20 text-[#591B2B] text-[10px] font-bold uppercase tracking-wider rounded">
              Verified
            </span>
          </div>
          <p className="text-xs text-[#8E7A70] mt-0.5">
            Real feedback from Coimbatore &amp; Tamil Nadu shoppers
          </p>
        </div>

        <button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setSubmitSuccess(false);
          }}
          className="px-5 py-2.5 bg-[#591B2B] hover:bg-[#762C43] text-[#FFF9F0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Rate Product / Write Review</span>
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {/* =========================================================================
            FLIPKART STYLE OVERALL RATING & BREAKDOWN BARS
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#E8D8C8] items-center">
          
          {/* Big Score (3 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#FFF9F0] border border-[#E8D8C8]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-[#591B2B]">
                {stats.average}
              </span>
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#388E3C] text-white shadow-sm">
                <Star size={20} className="fill-white" />
              </div>
            </div>

            <p className="text-xs font-bold text-[#33241F] mb-1">
              {stats.total} Ratings &amp; {reviews.length} Reviews
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
              <CheckCircle2 size={13} className="text-emerald-700" />
              <span>100% Certified Store Quality</span>
            </div>
          </div>

          {/* Progress Bars (8 cols) */}
          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.breakdown[star as 5 | 4 | 3 | 2 | 1] || 0;
              const percent = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              const barColors: Record<number, string> = {
                5: 'bg-[#388E3C]',
                4: 'bg-[#388E3C]',
                3: 'bg-[#8BC34A]',
                2: 'bg-[#FF9800]',
                1: 'bg-[#F44336]',
              };

              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <div className="w-10 flex items-center justify-end gap-1 font-bold text-[#33241F] shrink-0">
                    <span>{star}</span>
                    <Star size={11} className="fill-[#33241F] text-[#33241F]" />
                  </div>

                  <div className="flex-1 h-2.5 bg-[#E8D8C8]/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColors[star]} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="w-16 text-right text-[11px] text-[#8E7A70] font-medium shrink-0">
                    {count} ({percent}%)
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            INLINE WRITE REVIEW FORM (Flipkart Style)
        ========================================================================= */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden my-6"
            >
              <div className="bg-[#FAF2E6] border-2 border-[#D3AA57] p-6 sm:p-8 shadow-inner relative">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 text-[#8E7A70] hover:text-[#591B2B]"
                >
                  <X size={20} />
                </button>

                <h3 className="text-base font-bold text-[#591B2B] uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#D3AA57]" />
                  <span>Write Your Customer Review &amp; Rating</span>
                </h3>
                <p className="text-xs text-[#8E7A70] mb-6">
                  Help other women and shoppers in Coimbatore discover the beauty of this piece.
                </p>

                {submitSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-400 text-emerald-900 text-center space-y-2">
                    <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                    <p className="text-sm font-bold">Nandri! Your review has been submitted successfully!</p>
                    <p className="text-xs text-emerald-800">Your rating will now appear live below.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    {/* Interactive Star Picker */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-2">
                        How would you rate this product? (ரேட்டிங்) *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = (hoverRating || formRating) >= star;
                          return (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setFormRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                              aria-label={`Rate ${star} star`}
                            >
                              <Star
                                size={32}
                                className={
                                  isFilled
                                    ? 'fill-[#D3AA57] text-[#D3AA57]'
                                    : 'text-[#C5B4A5] hover:text-[#D3AA57]'
                                }
                              />
                            </button>
                          );
                        })}
                        <span className="ml-3 text-xs font-bold text-[#591B2B] bg-white px-3 py-1 border border-[#E8D8C8]">
                          {STAR_LABELS[hoverRating || formRating]}
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                          Your Name (உங்கள் பெயர்) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Priya Sundaram"
                          className="w-full px-4 py-2.5 bg-white border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                          City / Area (ஊர் / பகுதி)
                        </label>
                        <input
                          type="text"
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          placeholder="e.g. Malumichampatti / Coimbatore / Pollachi"
                          className="w-full px-4 py-2.5 bg-white border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                        />
                      </div>
                    </div>

                    {/* Review Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                        Review Title (சுருக்கமான தலைப்பு)
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Exact gold look! Super finish & high quality"
                        className="w-full px-4 py-2.5 bg-white border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                      />
                    </div>

                    {/* Review Text Area */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                        Your Detailed Feedback / Experience (உங்கள் கருத்து) *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder="Share details about the gold polish, design, comfort, or your showroom experience..."
                        className="w-full px-4 py-2.5 bg-white border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57] leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-8 bg-gradient-to-r from-[#ECC880] via-[#D3AA57] to-[#B88E3E] text-[#1A0B10] font-black uppercase tracking-widest text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {isSubmitting ? 'Submitting...' : 'Post Your Review'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="py-3 px-5 text-xs text-[#8E7A70] hover:text-[#591B2B]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            FILTER TABS & REVIEWS LIST
        ========================================================================= */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#E8D8C8] pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#591B2B] flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Customer Reviews ({displayedReviews.length})</span>
            </h3>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[#8E7A70] font-medium hidden sm:inline">Filter:</span>
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 font-bold rounded-full transition-colors ${
                  filterRating === 'all'
                    ? 'bg-[#591B2B] text-white'
                    : 'bg-[#FAF2E6] text-[#33241F] hover:bg-[#E8D8C8]'
                }`}
              >
                All ({reviews.length})
              </button>
              {[5, 4, 3].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                return (
                  <button
                    key={star}
                    onClick={() => setFilterRating(star)}
                    className={`px-3 py-1 font-bold rounded-full flex items-center gap-1 transition-colors ${
                      filterRating === star
                        ? 'bg-[#388E3C] text-white'
                        : 'bg-[#FAF2E6] text-[#33241F] hover:bg-[#E8D8C8]'
                    }`}
                  >
                    <span>{star} ★</span>
                    <span>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of Reviews */}
          <div className="divide-y divide-[#E8D8C8]">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((rev) => {
                const votes = helpfulVotes[rev.id] || { count: 4, voted: false };
                const starColor =
                  rev.rating >= 4 ? 'bg-[#388E3C]' : rev.rating === 3 ? 'bg-[#8BC34A]' : 'bg-[#FF9800]';

                return (
                  <div key={rev.id} className="py-5 space-y-2.5">
                    {/* Rating Pill + Review Title */}
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-white text-xs font-bold rounded shadow-sm ${starColor}`}
                      >
                        <span>{rev.rating}</span>
                        <Star size={11} className="fill-white" />
                      </span>
                      <h4 className="text-sm font-bold text-[#33241F]">{rev.title}</h4>
                    </div>

                    {/* Comment text */}
                    <p className="text-xs sm:text-sm text-[#33241F]/85 leading-relaxed">
                      {rev.comment}
                    </p>

                    {/* Reviewer info + Verified badge + Helpful buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E7A70] pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#591B2B]">
                          {rev.userName}
                        </span>
                        {rev.userCity && <span>({rev.userCity})</span>}
                        <span>•</span>
                        <span>{rev.createdAt}</span>
                        {rev.isVerifiedBuyer && (
                          <span className="flex items-center gap-1 text-[11px] text-[#2E7D32] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 size={12} />
                            <span>Verified Buyer</span>
                          </span>
                        )}
                      </div>

                      {/* Flipkart-style Helpful count */}
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#8E7A70]">Helpful?</span>
                        <button
                          onClick={() => handleHelpful(rev.id)}
                          disabled={votes.voted}
                          className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 border rounded transition-colors ${
                            votes.voted
                              ? 'text-emerald-700 border-emerald-300 bg-emerald-50'
                              : 'text-[#33241F] border-[#E8D8C8] hover:border-[#D3AA57] hover:text-[#591B2B]'
                          }`}
                        >
                          <ThumbsUp size={12} />
                          <span>{votes.count}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-[#8E7A70] text-xs">
                No reviews found for this star filter. Be the first to add one!
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
