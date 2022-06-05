import { toast } from 'react-toastify';

const Notification = ({ message, type }) => {
  if (type === 'success') {
    toast.success(`${message}`);
  }
  if (type === 'error') {
    toast.error(`${message}`);
  }
};

export default Notification;
