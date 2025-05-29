'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CategoryItem } from '@/types/category';

type CategoryProps = {
  categories: CategoryItem[];
};

const ProductFilters = ({ categories }: CategoryProps): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const currentCategory = searchParams.get('category') || '';

  // Update URL with filter parameters
  const updateFilters = (name: string, value: string): void => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle category filter change
  const handleCategoryChange = (
    categorySeq: number,
    checked: boolean,
  ): void => {
    updateFilters('category', checked ? categorySeq.toString() : '');
  };

  // Update URL when price range changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return (): void => clearTimeout(timer);
  }, [router, pathname, searchParams]);

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['category']}>
        <AccordionItem value="category">
          <AccordionTrigger>카테고리</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.seq} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.seq}`}
                    checked={Number(currentCategory) === category.seq}
                    onCheckedChange={checked =>
                      handleCategoryChange(category.seq, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category.seq}`}>
                    {category.categoryName}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
