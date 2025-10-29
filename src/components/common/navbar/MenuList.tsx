// components/HamburgerMenu.jsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils'; // افترض أن لديك utility function مثل هذه لدمج الفئات

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // حالة لتتبع ما إذا كانت القائمة مفتوحة

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative"> {/* نستخدم relative هنا لتموضع القائمة المنسدلة */}
      {/* زر الهامبرغر / X */}
      <button
        onClick={toggleMenu}
        className="relative flex h-8 w-8 flex-col items-center justify-center space-y-1.5 z-50 focus:outline-none"
        aria-label="Toggle menu"
      >
        {/* الخط العلوي - تصميم أقرب للصورة */}
        <span
          className={cn(
            'block h-1 w-6 bg-gray-900 rounded-sm transition-all duration-300 ease-out', // h-1 و rounded-sm و bg-gray-900
            isOpen ? 'translate-y-2 rotate-45' : ''
          )}
        ></span>
        {/* الخط الأوسط - تصميم أقرب للصورة */}
        <span
          className={cn(
            'block h-1 w-6 bg-gray-900 rounded-sm transition-all duration-300 ease-out', // h-1 و rounded-sm و bg-gray-900
            isOpen ? 'opacity-0' : ''
          )}
        ></span>
        {/* الخط السفلي - تصميم أقرب للصورة */}
        <span
          className={cn(
            'block h-1 w-6 bg-gray-900 rounded-sm transition-all duration-300 ease-out', // h-1 و rounded-sm و bg-gray-900
            isOpen ? '-translate-y-2 -rotate-45' : ''
          )}
        ></span>
      </button>

      {/* القائمة المنسدلة (Dropdown Menu) */}
      <div
        className={cn(
          'absolute right-0 !mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-opacity duration-200 ease-out',
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">الرئيسية</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">حول</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-2">الخدمات</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700" role="menuitem" tabIndex={-1} id="menu-item-3">اتصل بنا</a>
        </div>
      </div>

      {/* Overlay لإغلاق القائمة عند النقر خارجها */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-40" // Z-index أقل من الزر والقائمة
        ></div>
      )}
    </div>
  );
};

export default HamburgerMenu;
