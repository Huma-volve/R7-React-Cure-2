import React from "react";
import { Clock, Heart } from "lucide-react";
import type { Doctor } from "@/services/DoctorService.ts";
import { StarIcon } from "../icons";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <>


    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto space-y-3">
          <div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Doctor Image */}
            <div className="w-28 shrink-0 bg-gray-100 self-stretch">
              <img
                src={doctor.img ||"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 min-w-0 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
               {doctor.name || "Magdy jacob"}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {doctor.specialization} | {doctor.hospital || "Hospital"}
              </p>
              
              {/* Rating and Time */}
              <div className="flex items-center gap-4 flex-col md:flex-row">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{doctor.rating || "4.8"}</span>
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
</>
  );
};