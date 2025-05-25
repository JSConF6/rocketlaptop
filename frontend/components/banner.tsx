'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Banner = (): React.JSX.Element => {
  return (
    <section className="banner">
      <div className="container banner-container">
        <div className="banner-content">
          <div className="banner-text">
            <div>
              <p className="text-sm font-medium text-primary">
                2025 RocketLaptop
              </p>
              <h1 className="text-3xl font-bold mt-2 tracking-tight sm:text-4xl md:text-5xl">
                신제품 출시
              </h1>
            </div>
            <p className="text-muted-foreground">
              지금 당장 신제품을 살펴보세요
            </p>
            <Button asChild size="lg">
              <Link href="/products/new">자세히 보기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
