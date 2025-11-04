// components/ReviewsSection.tsx
import React from 'react';
import ReviewPopup from '@/components/ReviewPopup/ReviewPopup';
import { StarIcon, HalfStarIcon } from './icons';

interface Review {
  name: string;
  time: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  isMobile?: boolean;
}

const RatingStars: React.FC = () => (
  <div className="flex">
    {[1, 2, 3, 4].map((i) => (
      <StarIcon key={i} className="w-5 h-5" filled />
    ))}
    <HalfStarIcon className="w-5 h-5" />
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-gray-50 rounded-lg p-3 lg:p-4 mt-6 lg:mt-0">
    <div className="flex items-start gap-3 mb-2 lg:mb-3">
      <img
        src="/api/placeholder/40/40"
        alt={review.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="font-semibold text-sm">{review.name}</div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <span className="text-sm font-semibold text-yellow-600">{review.rating}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">{review.time}</div>
      </div>
    </div>
    <p className="text-sm text-gray-600">{review.text}</p>
  </div>
);

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, isMobile = false }) => {
  return (
    <div className={`mt-6 ${!isMobile ? ' pt-6' : ''}`}>
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="font-semibold">Reviews and Rating</h3>
        {isMobile ? (
          <button className="text-blue-500 text-sm flex items-center gap-1">
            add review
          </button>
        ) : (
          <ReviewPopup />
        )}
      </div>
      
      <div className='flex justify-between items-center mt-6'>
        <div className="flex items-end gap-2 mb-3 lg:mb-6">
          <span className="text-4xl font-medium">4.5</span>
          <span className="text-4xl font-medium">/5</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 mb-4 lg:mb-6">
          <RatingStars />
          <span className="text-sm text-gray-600 lg:text-[#6D7379]">1250+ Reviews</span>
        </div>
      </div>

      <div className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
        {isMobile ? (
          <ReviewCard review={reviews[0]} />
        ) : (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;