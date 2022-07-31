import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  -webkit-tap-highlight-color:rgba(0,0,0,0) !important;
}
/* ::-webkit-scrollbar {
                display: none;
            } */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
#search{
  width:100% !important
}
.sc-efBctP{
  display:none !important
}
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}
.gutter-row{
  margin:10px 0 ;
}
.form__control {
    display: block;
    width: 100%;
    padding: 0.4375rem 1rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #3c4d62;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dbdfea;
    appearance: none;
    border-radius: 4px;

    :focus,
    .focus-visible:focus:not(:focus-visible) {
      outline: 0;
      box-shadow: 0 0 0 0.4rem #fff, 0 0 0 0.35rem #069;
    }
  }
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}
:root{
  --yellow:#febb02;
  --blue:#0071c2;
  --light-blue:#ebf3ff;
  --black1:#222;
  --black2:#999;
  --white:#fff;
}
.menu {
  display: flex;
  align-items:center ;
  gap:10px !important;
}
.filterMenu{
  width:300px;
  padding:10px 20px;
}
.ant-menu-inline{
  border-right:none !important
}
.ant-menu{
  width:100% !important;
  color: #ccc;
  background:transparent !important;
}
.ant-modal-close-x{
  display:none ;
}
.ant-menu-submenu{
  margin:10px 0
}
.ant-menu-sub.ant-menu-inline {
  background:rgba(0, 0, 0, .5) !important
}
.ant-menu-sub.ant-menu-inline>.ant-menu-item{
  color:rgba(255,255,255,0.5) !important
}
.ant-menu-sub.ant-menu-inline>.ant-menu-item:hover{
  color: #6e82a5 !important;
}
.ant-menu-submenu-arrow{
  color:var(--light-blue) !important;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent !important;
}
.rdt_TableRow{
  padding:10px 0 !important
}
/* .rdt_TableCell{
  padding-left:0 !important
} */
body {
  
  font-family: 'Nunito', sans-serif;
  font-size:16px;
  overflow-x:hidden ;
  transition: all 0.5s;
    background-color: #f0f3fb;
    font-size: 14px;
  /* transition: all 0.5s ease; */
}
.action__btn {
    cursor: pointer;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
a{
  text-decoration: none;
}
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: Nunito,sans-serif;
    font-weight: 700;
    line-height: 1.1;
    color: #364a63;
}
p{
  color: #8094ae !important;
}
.ant-btn-default{
  display:none!important;
}
.ql-editor{
  height:300px !important;
  white-space:normal !important ;
  font-size:16px !important ;
}
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '1200px')};
  margin-left: auto;
  margin-right: auto;
`;
export const Typography = styled.h1`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : ''};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '')};
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  color: ${(props) => (props.color ? props.color : '')};
`;

export const TableHeader = styled.div`
  width: 100%;

  .header__search {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 20px 0 20px;
    align-items: center;

    .search__wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      padding: 10px;
      gap: 10px;
      color: var(--blue);
      align-items: center;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.05);
      input {
        background: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-size: 0.9rem;
        letter-spacing: 0.1em;
        font-weight: 600;
      }
    }
    .filter__wrapper {
      padding-right: 20px;
      cursor: pointer;
    }
  }
`;
export default GlobalStyle;
