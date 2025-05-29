'use client';

import type React from 'react';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CategoryItem } from '@/types/category';
import Image from 'next/image';

type CategorySliderProps = {
  categories: CategoryItem[];
};

export const CategorySlider = ({
  categories,
}: CategorySliderProps): React.JSX.Element => {
  const categoryIcons: Record<string, string> = {
    Samsung: '/logos/samsung.svg',
    LG: '/logos/lg.svg',
    Apple: '/logos/apple.svg',
    Lenovo: '/logos/lenovo.svg',
    MSI: '/logos/msi.svg',
    ASUS: '/logos/asus.svg',
    Dell: '/logos/dell.svg',
    HP: '/logos/hp.svg',
    Razer: '/logos/razer.svg',
    Acer: '/logos/acer.svg',
    HanSung: '/logos/hansung.png',
  };

  return (
    <div>
      <Swiper
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 7,
          },
          1280: {
            slidesPerView: 10,
          },
        }}
      >
        {categories.map(category => (
          <SwiperSlide key={category.seq}>
            <Link
              href={`/search?category=${category.seq}`}
              className="flex flex-col items-center justify-center min-w-[120px] px-4 gap-3 transition-transform hover:scale-105"
            >
              <div className="relative w-16 h-16 text-primary">
                <Image
                  src={categoryIcons[category.categoryName]}
                  alt={category.categoryName}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-center">
                {category.categoryName}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
