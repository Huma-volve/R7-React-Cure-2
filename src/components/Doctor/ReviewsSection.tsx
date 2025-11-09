import React from 'react';
import ReviewPopup from '@/components/ReviewPopup/ReviewPopup';
import { StarIcon, HalfStarIcon } from './icons';


export interface Review {
  patientName?: string;
  createdAt?: string;
  rating?: number;
  comment?: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  isMobile?: boolean;
  rating?: number;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 !== 0;

  return (
<div className="flex">
  {[...Array(fullStars)].map((_, i) => (
    <StarIcon key={`full-${i}`} className="w-7 h-7 text-yellow-400" filled />
  ))}

  {hasHalfStar && <HalfStarIcon key="half" className="w-7 h-7 text-yellow-400" />}

  {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
    <HalfStarIcon key={`empty-${i}`} className=" text-gray-300" /> // النجوم الفاضية
  ))}
</div>

  );
};




const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const divisions = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Infinity, name: 'years' },
  ];

  let duration = diffInSeconds;
  for (let i = 0; i < divisions.length; i++) {
    if (Math.abs(duration) < divisions[i].amount) {
      return rtf.format(Math.round(duration), divisions[i].name as Intl.RelativeTimeFormatUnit);
    }
    duration /= divisions[i].amount;
  }
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="border border-[#BBC1C7] rounded-2xl p-3 lg:p-4 mt-6 lg:mt-0">
    <div className="flex items-start gap-3 mb-2 lg:mb-3">
      <div className='w-[62px] h-[62px] bg-[#d7d7e4] rounded-full flex items-end justify-center overflow-hidden '>
      <img
        src="/public/images/reviewImg.png"
        alt={review.patientName || "User Avatar"}
        className=" w-20 h-[] rounded-full"
      />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="font-semibold text-sm">{review.patientName || "Anonymous"}</div>
          <div className="flex items-center gap-1 bg-[#F9E0001A] px-2 py-1 rounded">
            <span className="text-sm font-semibold text-[#F9E000] flex items-center gap-2">
              <StarIcon filled className="w-4 h-4 inline-block mr-1" />
              {review.rating || 0}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {formatTimeAgo(review.createdAt ?? new Date().toISOString())}

        </div>      
      </div>
    </div>
    <p className="text-md text-[#555B6C] ">{review.comment || "No comment"}</p>
  </div>
);

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews = [],  // ✅ Default value
  rating = 0,    // ✅ Default value
  isMobile = false 
}) => {
  
  // حساب متوسط التقييمات
  // const averageRating = reviews && reviews.length > 0
  //   ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length).toFixed(1)
  //   : "0.0";

  const totalReviews = reviews?.length || 0;

  return (
    <div className={`mt-6 ${!isMobile ? ' pt-6' : ''}`}>
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="font-semibold">Reviews and Rating</h3>

          <ReviewPopup />
      </div>
      
      <div className='flex justify-between items-center mt-6'>
        <div className="flex items-end gap-2 mb-3 lg:mb-6">
          <span className="text-4xl font-medium">{Number(rating)}</span>
          <span className="text-4xl font-medium">/5</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 mb-4 lg:mb-6">
          <RatingStars rating={Number(rating)} />
          <span className="text-sm text-gray-600 lg:text-[#6D7379]">
            {totalReviews}+ Reviews
          </span>
        </div>
      </div>

      {reviews && reviews.length > 0 ? (
        <div className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
          {isMobile ? (
            <ReviewCard review={reviews[0]} />
          ) : (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;