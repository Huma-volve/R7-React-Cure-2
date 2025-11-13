import { DoctorCard } from "./DoctorCard";
import type { Doctor } from "@/services/DoctorService.ts";
import { StarIcon } from "../icons";
import { Clock, Heart } from "lucide-react";

interface DoctorsListViewProps {
  doctors: Doctor[];
}

export const DoctorsListView: React.FC<DoctorsListViewProps> = ({ doctors }) => {
  
  return (
    <div className="w-full h-full pt-56 pb-4 px-4 overflow-y-auto">
      <div className="space-y-3">
        {doctors.length > 0 ? (
          doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
        ) : (
          <>
    <span>static data for no doctors found view</span>
    <div className="min-h-screen  p-4">
      <div className="max-w-2xl mx-auto space-y-3">
          <div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Doctor Image */}
            <div className="w-28 shrink-0 bg-gray-100 self-stretch">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 min-w-0 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Magdy Jacob
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                sergury | 357357
              </p>
              
              {/* Rating and Time */}
              <div className="flex items-center gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">9:30am - 8:00pm</span>
                </div>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              className="shrink-0 p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Heart 
                className={`w-6 h-6 transition-all `}
              />
            </button>
          </div>
      </div>
    </div>
          <div className="text-center py-12">
            <p className="text-gray-500">No doctors found in this area</p>
          </div>
          </>
        )}
      </div>
    </div>
  );
};