import { ProductSummary } from '@/types/product';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { PRODUCT_STATUS_LABEL } from '@/constants/product';
import { TableCell, TableRow } from './ui/table';

type Props = {
  product: ProductSummary;
  isDeleting: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ProductTableRow = ({
  product,
  isDeleting,
  onEdit,
  onDelete,
}: Props): React.JSX.Element => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ON_SALE':
        return 'bg-green-100 text-green-800';
      case 'SOLD_OUT':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <TableRow key={product.seq}>
      <TableCell className="font-medium">{product.seq}</TableCell>
      <TableCell className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-md bg-gray-100 relative overflow-hidden">
          <Image
            src={
              product.productImagePath.startsWith('/uploads')
                ? `${process.env.NEXT_PUBLIC_API_URL}${product.productImagePath}`
                : `/placeholder.svg?height=40&width=40&text=${product.seq}`
            }
            alt={product.productName}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <span>{product.productName}</span>
      </TableCell>
      <TableCell>{product.categoryName}</TableCell>
      <TableCell>{product.price.toLocaleString()}원</TableCell>
      <TableCell>{product.quantity}개</TableCell>
      <TableCell>
        <Badge
          className={`pointer-events-none ${getStatusColor(product.status)}`}
        >
          {PRODUCT_STATUS_LABEL[product.status]}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => onEdit(product.seq)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">수정</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">삭제</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>상품 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수
                  없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(product.seq)}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 cursor-pointer"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
