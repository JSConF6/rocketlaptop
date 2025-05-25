'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

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

type AddressFormProps = {
  initialAddress?: Address;
  onSubmit: (address: Address) => void;
  onCancel: () => void;
};

export const AddressForm = ({
  initialAddress,
  onSubmit,
  onCancel,
}: AddressFormProps): React.JSX.Element => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addressName, setAddressName] = useState(
    initialAddress?.addressName || '',
  );
  const [recipientName, setRecipientName] = useState(
    initialAddress?.recipientName || '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialAddress?.phoneNumber || '',
  );
  const [postalCode, setPostalCode] = useState(
    initialAddress?.postalCode || '',
  );
  const [streetAddress, setStreetAddress] = useState(
    initialAddress?.streetAddress || '',
  );
  const [detailedAddress, setDetailedAddress] = useState(
    initialAddress?.detailedAddress || '',
  );
  const [isDefault, setIsDefault] = useState(
    initialAddress?.isDefault || false,
  );

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !addressName ||
      !recipientName ||
      !phoneNumber ||
      !postalCode ||
      !streetAddress
    ) {
      toast({
        title: '배송지 정보를 입력 해주세요',
        description: '배송지 정보를 입력 해주세요',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newAddress: Address = {
      id: initialAddress?.id || 'temp-id',
      addressName,
      recipientName,
      phoneNumber,
      postalCode,
      streetAddress,
      detailedAddress,
      isDefault,
    };

    onSubmit(newAddress);

    toast({
      title: initialAddress ? '배송지 수정' : '배송지 추가',
      description: initialAddress ? '배송지 수정 완료' : '배송지 추가 완료',
    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="addressName">배송지이름</Label>
        <Input
          id="addressName"
          placeholder="집, 회사"
          value={addressName}
          onChange={e => setAddressName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipientName">받는사람</Label>
        <Input
          id="recipientName"
          placeholder="받는사람 이름"
          value={recipientName}
          onChange={e => setRecipientName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">휴대폰 번호</Label>
        <Input
          id="phoneNumber"
          placeholder="휴대폰 번호"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">우편번호</Label>
        <Input
          id="postalCode"
          placeholder="우편번호"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">주소</Label>
        <Input
          id="streetAddress"
          placeholder="주소"
          value={streetAddress}
          onChange={e => setStreetAddress(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detailedAddress">상세 주소</Label>
        <Input
          id="detailedAddress"
          placeholder="상세 주소"
          value={detailedAddress}
          onChange={e => setDetailedAddress(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="isDefault"
          checked={isDefault}
          onCheckedChange={checked => setIsDefault(checked as boolean)}
        />
        <Label htmlFor="isDefault" className="cursor-pointer">
          기본 배송지로 등록
        </Label>
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialAddress ? '수정중...' : '추가중...'}
            </>
          ) : initialAddress ? (
            '배송지 수정'
          ) : (
            '배송지 추가'
          )}
        </Button>
      </div>
    </form>
  );
};
