'use client';

import type React from 'react';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type CategoryItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type CategorySliderProps = {
  categories: CategoryItem[];
};

export const CategorySlider = ({
  categories,
}: CategorySliderProps): React.JSX.Element => {
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
          <SwiperSlide key={category.id}>
            <Link
              href={`/categories/${category.id}`}
              className="flex flex-col items-center justify-center min-w-[120px] px-4 gap-3 transition-transform hover:scale-105"
            >
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
