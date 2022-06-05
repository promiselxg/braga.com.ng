import styled from 'styled-components';
import { DashboardTableStats } from '../Dashboard/Dashboard.styled';

export const ContentWrapper = styled.div`
  .right {
    display: flex;
    gap: 20px;

    button {
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
    }
  }
  .tableWrapper {
    background: #fff;
    margin: 0 2rem;
  }
  ${DashboardTableStats} {
    margin-top: 0 !important ;
  }
`;

export const Form = styled.form`
  padding: 2rem 1rem;
  .gutter-row {
    padding: 0px 10px !important;
  }
  .label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #344357;
    margin-bottom: 0.5rem;
  }
  .form__row {
    padding: 20px 0;

    :last-child {
      padding-bottom: 0 !important ;
    }
    :first-child {
      padding-top: 0 !important ;
    }
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
  input[type='number'] {
    appearance: textfield;
  }
  .ant-select {
    width: 100% !important;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px !important;
  }
  .ant-picker {
    width: 100%;
  }
`;
