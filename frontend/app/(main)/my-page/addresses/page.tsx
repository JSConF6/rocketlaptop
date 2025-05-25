'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddressForm } from '@/components/my-page/address-form';
import { AddressList } from '@/components/my-page/address-list';
import { PlusCircle } from 'lucide-react';

// Mock addresses
const mockAddresses = [
  {
    id: '1',
    addressName: '집',
    recipientName: '존안마',
    phoneNumber: '010-1111-2222',
    postalCode: '10001',
    streetAddress: '서울 관악구 신대방동 723',
    detailedAddress: '301호',
    isDefault: true,
  },
  {
    id: '2',
    addressName: '회사',
    recipientName: '존안',
    phoneNumber: '010-1111-2223',
    postalCode: '10001',
    streetAddress: '서울 관악구 신대방동 421',
    detailedAddress: '301호',
    isDefault: false,
  },
];

const AddressesPage = (): React.JSX.Element => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<
    (typeof mockAddresses)[0] | null
  >(null);

  const handleAddAddress = (address: (typeof mockAddresses)[0]): void => {
    if (address.isDefault) {
      // If the new address is default, update all other addresses to non-default
      setAddresses(prev =>
        prev
          .map(addr => ({ ...addr, isDefault: false }))
          .concat({ ...address, id: String(Date.now()) }),
      );
    } else {
      setAddresses(prev => [...prev, { ...address, id: String(Date.now()) }]);
    }
    setIsAddingAddress(false);
  };

  const handleUpdateAddress = (
    updatedAddress: (typeof mockAddresses)[0],
  ): void => {
    setAddresses(prev => {
      const newAddresses = prev.map(addr =>
        addr.id === updatedAddress.id ? updatedAddress : addr,
      );

      // If the updated address is set as default, update all other addresses
      if (updatedAddress.isDefault) {
        return newAddresses.map(addr =>
          addr.id === updatedAddress.id ? addr : { ...addr, isDefault: false },
        );
      }

      return newAddresses;
    });
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string): void => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string): void => {
    setAddresses(prev =>
      prev.map(addr => ({ ...addr, isDefault: addr.id === id })),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">배송지 관리</h2>
      </div>

      {isAddingAddress || editingAddress ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAddress ? '배송지 수정' : '배송지 추가'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm
              initialAddress={editingAddress || undefined}
              onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
              onCancel={() => {
                setIsAddingAddress(false);
                setEditingAddress(null);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Button onClick={() => setIsAddingAddress(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            배송지 추가
          </Button>

          <AddressList
            addresses={addresses}
            onEdit={setEditingAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        </>
      )}
    </div>
  );
};

export default AddressesPage;
