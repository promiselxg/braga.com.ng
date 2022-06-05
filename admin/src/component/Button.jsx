import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${(props) => (props.bg ? props.bg : 'transparent')};
  color: ${(props) => (props.color ? props.color : '#000')};
  border: ${(props) => (props.border ? props.border : 'none')};
  padding: ${(props) => (props.padding ? props.padding : '10px 15px;')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '5px'};
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : '')};
  display: ${(props) => (props.display ? props.display : 'flex')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.9rem')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '')};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : 'flex-start'};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  margin: ${(props) => (props.margin ? props.margin : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  height: ${(props) => (props.height ? props.height : '')};
  transition: all 300ms ease-out;
  .icon {
    font-size: 1.2rem;
    padding-right: 5px;
    display: flex;
    gap: 5px;
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
