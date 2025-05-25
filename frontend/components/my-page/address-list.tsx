'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Address = {
  id: string;
  addressName: string;
  recipientName: string;
  phoneNumber: string;
  postalCode: string;
  streetAddress: string;
  detailedAddress: string;
  isDefault: boolean;
};

type AddressListProps = {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
};

export const AddressList = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressListProps): React.JSX.Element => {
  const { toast } = useToast();

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">등록한 배송지가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {addresses.map(address => (
        <Card key={address.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{address.addressName}</CardTitle>
              {address.isDefault && <Badge>Default</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{address.recipientName}</p>
              <p className="pt-1">{address.phoneNumber}</p>
              <p>
                ({address.postalCode}) {address.streetAddress},{' '}
                {address.detailedAddress}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(address)}
              >
                <Edit className="h-4 w-4 mr-1" />
                수정
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>배송지 삭제</AlertDialogTitle>
                    <AlertDialogDescription>
                      {address.addressName} 배송지를 삭제 하시겠습니까?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete(address.id);
                        toast({
                          title: 'Address Deleted',
                          description:
                            'The address has been deleted successfully.',
                        });
                      }}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {!address.isDefault && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  onSetDefault(address.id);
                  toast({
                    title: 'Default Address Updated',
                    description: `${address.addressName} is now your default shipping address.`,
                  });
                }}
              >
                기본 배송지 설정
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
