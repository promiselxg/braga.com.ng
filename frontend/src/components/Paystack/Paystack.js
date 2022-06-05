import { usePaystackPayment } from 'react-paystack';
import Button from '../Button';

const config = {
  reference: new Date().getTime().toString(),
  email: 'user@example.com',
  amount: 20000,
  publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <Button
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
      label="Pay with Paystack"
      bg="var(--yellow)"
      hoverBg="var(--blue)"
      hoverColor="#fff !important"
    />
  );
};

function PayWithPaystack() {
  return <PaystackHookExample />;
}

export default PayWithPaystack;
