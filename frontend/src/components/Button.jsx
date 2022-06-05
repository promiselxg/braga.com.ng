import styled from 'styled-components';
const StyledButton = styled.button`
  background: ${(props) => (props.bg ? props.bg : '#000')};
  color: ${(props) => (props.color ? props.color : '#000')};
  border: none;
  padding: ${(props) => (props.padding ? props.padding : '10px 20px;')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '5px'};
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : '')};
  display: ${(props) => (props.display ? props.display : 'flex')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '15px')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : 'capitalize'};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  transition: all 300ms ease-out;
  .icon {
    font-size: 20px;
    padding-right: 5px;
  }

  &:hover {
    transition: all 300ms ease-out;
    background: ${({ hoverBg }) => hoverBg || ''};
    color: ${({ hoverColor }) => hoverColor || ''};
  }
`;
const Button = ({ icon, label, ...children }) => {
  return (
    <>
      <StyledButton {...children}>
        <span>{icon}</span>
        <span>{label}</span>
      </StyledButton>
    </>
  );
};

export default Button;
