import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  width: 100%;
  margin-left: 290px;

  .dashboard__overview {
    .dashboard__overview__info {
      display: flex;
      justify-content: space-between;
      padding: 10px 2rem;
      align-items: center;

      h2 {
        font-family: Nunito, sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }
`;
export const Content = styled.div`
  padding-top: 20px;
  position: relative;
  width: calc(100% - 290px);
  padding-bottom: 20px;
`;
export const DashboardCards = styled.div`
  width: 100%;
  margin: 20px 0;
  .dashboard__card__container {
    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    padding: 0 2rem;
    .cards {
      position: relative;
      background: var(--white);
      padding: 2rem 1.2rem;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.125);

      display: flex;
      align-items: center;
      justify-content: space-between;
      .card__info {
        display: flex;
        flex-direction: column;
        text-align: right;

        span:nth-child(1) {
          font-size: 1.4rem;
          font-weight: 800;
          font-family: Nunito, sans-serif;
        }
        span:nth-child(2) {
          font-size: 0.7rem;
          color: rgba(0, 0, 0, 0.7);
        }
      }
      .card__icons {
        font-size: 2.4rem !important;
        color: rgba(0, 0, 0, 0.35);
      }
    }
  }
`;

export const DashboardStats = styled.div`
  width: 100%;
  .dashboard__stats__container {
    display: flex;
    width: 100%;
    gap: 10px;
    min-height: 300px;
    padding: 0 2rem;

    .left {
      flex: 0.7;
      background: green;
    }
    .right {
      flex: 0.3;
      background: purple;
    }
  }
`;

export const DashboardTableStats = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 0 2rem;
  .dashboard__tablestats__container {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    .ant-table-thead {
      th {
        background: #fff !important;
        border-top: 1px solid #f0f0f0;
      }
    }
  }
`;

export const TableWrapper = styled.div`
  width: 100%;

  padding: 2rem;

  h1 {
    margin-bottom: 20px;
  }
  .table__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .right {
      display: flex;
      align-items: center;
    }

    .search {
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid rgba(0, 0, 0, 0.06);
    }
    .sort__icons {
      margin: 0 10px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 1.2rem !important;
      cursor: pointer;
    }
  }
`;
