'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export const PointRechargeForm = (): React.JSX.Element => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!amount || Number.parseInt(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to recharge',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Points Recharged',
      description: `Successfully added ${amount} points to your account`,
    });

    setAmount('');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Payment Method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="cursor-pointer">
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="cursor-pointer">
              PayPal
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bankTransfer" id="bankTransfer" />
            <Label htmlFor="bankTransfer" className="cursor-pointer">
              Bank Transfer
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Recharge Points'
        )}
      </Button>
    </form>
  );
};
