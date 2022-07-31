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
        font-family: 'Nunito', sans-serif;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      position: relative;
      margin-bottom: 30px;
      border: 1px solid #deebfd;
      box-shadow: -8px 12px 18px 0 #dadee8;
      .card__info {
        display: flex;
        flex-direction: column;
        text-align: right;
        margin-right: 20px;
        span:nth-child(2) {
          font-size: 1.2rem;
          font-weight: 800;
        }
        span:nth-child(1) {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.7);
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
        }
      }
      .card__icon {
        color: rgba(0, 0, 0, 0.35);
        width: 50px;
        height: 50px;
        line-height: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
        margin: 25px;
        box-shadow: 5px 3px 10px 0 rgb(21 15 15 / 30%);
        border-radius: 10px;

        .card__icons {
          font-size: 25px !important;
          font-weight: 800 !important;
        }
        &.bg-orange {
          background-color: #fd7e14 !important;
          color: #fff;
        }
        &.bg-green {
          background-color: #198754 !important;
          color: #fff;
        }
        &.bg-cyan {
          background-color: #0dcaf0 !important;
          color: #fff;
        }
        &.bg-purple {
          background-color: #6f42c1 !important;
          color: #fff;
        }
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
    min-height: 200px;
    padding: 0 2rem;

    .left {
      flex: 1;
      background: rgba(255, 255, 255, 0.8);
    }
    .right {
      flex: 0.3;
      background: purple;
      height: 250px;
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
    .file {
      display: none;
    }
    .upload__group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .image__preview {
        display: flex;
        flex-wrap: wrap;
        margin-right: 10px;

        .image__box {
          margin-right: 8px;
          border: 1px solid #ccc;
          padding: 2px;
          width: 80px;
          height: 80px;
          border-radius: 5px;
          margin-bottom: 10px;

          .ant-image {
            height: 74px !important;
            width: 100% !important;
            overflow: hidden !important ;
            img {
              width: 100% !important;
              height: 100% !important;
              border-radius: 5px;
              object-fit: cover !important;
            }
          }
        }
      }
    }
    .label-holder {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .upload {
      border: 1px dashed #ccc;
      border-radius: 10px;
      transition: all 0.3s;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      :hover {
        border-color: var(--blue);
      }
    }
  }
`;

export const TableWrapper = styled.div`
  width: 100%;

  padding: 2rem;
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
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
