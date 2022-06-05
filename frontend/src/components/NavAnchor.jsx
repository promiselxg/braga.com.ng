import { Link } from 'react-router-dom';
import styled from 'styled-components';
const StyledLink = styled.a`
  color: ${(props) => (props.color ? props.color : '#000')};
  display: flex;
  font-weight: 500;
  cursor: pointer;
  span {
    margin: 0 8px;
    display: flex;
    align-items: center;
  }
`;
export const NavLink = ({ url, label, icon, ...children }) => {
  return (
    <>
      <StyledLink href={url} {...children}>
        {label && <span>{label}</span>}
        {icon && <span>{icon}</span>}
      </StyledLink>
    </>
  );
};
const Styledlink = styled(Link)`
  color: ${(props) => (props.color ? props.color : '#000')};
  display: flex;
  font-weight: 500;
  cursor: pointer;
  span {
    margin: 0 8px;
    display: flex;
    align-items: center;
  }
`;
export const Links = ({ url, label, icon, ...children }) => {
  return (
    <>
      <Styledlink to={url} {...children}>
        {label && <span>{label}</span>}
        {icon && <span>{icon}</span>}
      </Styledlink>
    </>
  );
};
