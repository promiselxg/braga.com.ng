import { Spin } from 'antd';

const Spiner = ({ indicator }) => {
  return (
    <>
      <Spin indicator={indicator} />
    </>
  );
};

export default Spiner;
