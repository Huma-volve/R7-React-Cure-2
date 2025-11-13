import { useState, useEffect } from 'react';
import { StarIcon } from '../Doctor/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addReview, resetReviewState } from '@/store/reviewSlice';
import { useParams } from 'react-router';

export default function ReviewPopup() {
  const dispatch = useAppDispatch();
  const { id } = useParams(); 
  
  const { addReviewLoading, addReviewError, addReviewSuccess } = useAppSelector(
    (state) => state.review
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  // عند نجاح إضافة Review
  useEffect(() => {
    if (addReviewSuccess) {
      setShowThanks(true);
    }
  }, [addReviewSuccess]);

const handleSubmit = () => {
  if (rating === 0) {
    alert('Please select a rating');
    return;
  }

  if (!review.trim()) {
    alert('Please write your review');
    return;
  }

  // إرسال Review
  dispatch(addReview({
    doctorId: Number(id),
    rating: rating,
    comment: review.trim(),
    createAt: new Date().toISOString(), // 👈 أضف التاريخ هنا
  }));
};

  const handleClose = () => {
    setIsOpen(false);
    setShowThanks(false);
    setRating(0);
    setHoveredRating(0);
    setReview('');
    dispatch(resetReviewState());
  };

  const handleDone = () => {
    handleClose();
  };

  return (
    <>
      {/* Button to open popup */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[#145DB8] text-sm flex items-center gap-1 transition-colors duration-200 group hover:text-[#0f2138] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 19 19"
          fill="none"
          className="transition-colors duration-200 group-hover:stroke-[#1c4a83]"
        >
          <path
            d="M11.0501 2.48221L11.8225 1.70981C13.1022 0.430062 15.1771 0.430062 16.4568 1.70981C17.7366 2.98957 17.7366 5.06446 16.4568 6.34421L15.6844 7.11661M11.0501 2.48221C11.0501 2.48221 11.1466 4.12356 12.5949 5.57181C14.0431 7.02006 15.6844 7.11661 15.6844 7.11661M11.0501 2.48221L3.94902 9.58325C3.46805 10.0642 3.22757 10.3047 3.02075 10.5699C2.77678 10.8827 2.56761 11.2211 2.39695 11.5792C2.25228 11.8828 2.14473 12.2054 1.92963 12.8507L1.01817 15.5851M15.6844 7.11661L8.58342 14.2176C8.10245 14.6986 7.86196 14.9391 7.5968 15.1459C7.28401 15.3899 6.94558 15.5991 6.58748 15.7697C6.28391 15.9144 5.96127 16.0219 5.31598 16.237L2.5816 17.1485M2.5816 17.1485L1.9132 17.3713C1.59565 17.4771 1.24555 17.3945 1.00886 17.1578C0.772171 16.9211 0.689523 16.571 0.795374 16.2535L1.01817 15.5851M2.5816 17.1485L1.01817 15.5851"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        add review
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 bg-[#0000007e] bg-opacity-10 flex items-center justify-center z-1000 md:p-4"
        >
          {!showThanks ? (
            // Review Form
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white md:rounded-lg shadow-xl w-full h-full md:h-auto md:max-w-md p-6 md:p-6 relative overflow-y-auto flex flex-col"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 flex flex-col justify-around">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Rate</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <StarIcon
                            filled={(hoveredRating || rating) >= star}
                            className="w-12 h-12 transition-colors duration-200"
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-2xl font-semibold text-gray-700 ml-2">
                      {rating}/5
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Your review</h3>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review"
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  />
                  {addReviewError && (
                    <p className="text-red-500 text-sm mt-2">{addReviewError}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={rating === 0 || !review.trim() || addReviewLoading}
                  className="w-full bg-[#145DB8] text-white py-3 rounded-lg font-medium hover:bg-[#0f4a94] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {addReviewLoading ? 'Sending...' : 'Send your review'}
                </button>
              </div>
            </div>
          ) : (
            // Thank You Message
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white md:rounded-3xl shadow-xl w-full h-full md:h-auto md:max-w-md p-8 text-center flex flex-col items-center justify-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-44 h-44 flex items-end justify-center">
                  <img
                    src="/images/funnygif.gif"
                    alt="funny gif"
                    className="w-40 h-40"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-8">
                Thanks for your review
              </h2>

              <button
                onClick={handleDone}
                className="w-full cursor-pointer bg-[#05162C] text-white py-4 rounded-full font-medium hover:bg-[#1a3a5c] transition-colors mb-4"
              >
                Done
              </button>

              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}