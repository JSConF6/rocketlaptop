import type { Metadata } from 'next';
import CartClientPage from './CartClientPage';

export const metadata: Metadata = {
  title: '장바구니',
  description: 'View and manage your shopping cart',
};

const CartPage = (): React.JSX.Element => {
  return <CartClientPage />;
};

export default CartPage;
