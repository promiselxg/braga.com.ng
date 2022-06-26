import { Link } from 'react-router-dom';
import { Menu } from '../../index';
import { SidebarWrapper } from './Sidebar.styled';

const Sidebar = () => {
  return (
    <>
      <SidebarWrapper>
        <ul className="list">
          <li>
            <Link to="/">
              <span className="icon"></span>
              <span className="title">Braga Hotels.</span>
            </Link>
          </li>
        </ul>
        <Menu />
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
