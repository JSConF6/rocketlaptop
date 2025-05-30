import type { Metadata } from 'next';
import CartClientPage from './CartClientPage';
import { auth } from '@/lib/auth';
import { fetchCartItems } from '@/lib/api/cart';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '장바구니',
  description: 'View and manage your shopping cart',
};

const CartPage = async (): Promise<React.JSX.Element> => {
  const session = await auth();
  if (!session?.accessToken) redirect('/login');

  const [cartItemsResponse] = await Promise.all([
    fetchCartItems(session.accessToken),
  ]);
  const cartItems = cartItemsResponse.result.cartItems;

  return <CartClientPage cartItems={cartItems} />;
};

export default CartPage;
