// components/AboutSection.tsx
import React from 'react';

interface AboutSectionProps {
  text: string;
  showMore: boolean;
  setShowMore: (value: boolean) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ text, showMore, setShowMore }) => {
  const shortText = text.slice(0, 120) + "...";

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">About me</h3>
      <p className="text-gray-600 text-sm">
        {showMore ? text : shortText}{" "}
        <span
          className="text-blue-500 cursor-pointer font-medium"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </span>
      </p>
    </div>
  );
};

export default AboutSection;