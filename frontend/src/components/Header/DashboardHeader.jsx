import { Input, Menu, Badge } from 'antd';
import { FiBattery, FiBell, FiMail } from 'react-icons/fi';
const { Search } = Input;
const onSearch = (value) => console.log(value);

const DashboardHeader = () => {
  return (
    <>
      <div className="container">
        <div className="left">
          <span>Dashboard</span>
        </div>
        <div className="center">
          <div className="search__box">
            <Search placeholder="input search text" onSearch={onSearch} />
          </div>
        </div>
        <div className="right">
          <div className="top__nav">
            <div className="notification">
              <Badge count={2} className="badge">
                <FiBell />
              </Badge>
              <Badge count={1}>
                <FiMail />
              </Badge>
            </div>
            <div className="menu">
              <Menu mode="horizontal">
                <Menu.SubMenu key="SubMenu" title="John Doe">
                  <Menu.Item key="two" icon={<FiBattery />}>
                    Navigation Two
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
