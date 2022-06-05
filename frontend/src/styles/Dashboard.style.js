import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  width: 100%;
  position: relative;
`;
export const Navigation = styled.aside`
  position: fixed;
  width: 250px;
  height: 100%;
  background: green;
  overflow: hidden;
`;
export const DashboardContent = styled.div`
  position: relative;
  width: calc(100% - 250px);
  left: 250px;
`;

export const DashboardHeader = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    .right {
      display: flex;
      flex: 0.2;
      width: 100%;
      align-items: center;
      .top__nav {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        .notification {
          display: flex;
          gap: 20px;
          align-items: center;

          .badge {
            font-size: 20px;
            top: 2px;
          }
        }
        .menu {
          display: flex;
          .ant-menu-horizontal {
            border: none;
          }
          .ant-menu {
            background: transparent;
            margin-top: -4px;
          }
          .ant-menu-submenu-selected::after {
            border-bottom: none !important;
          }
        }
      }
    }
    .left {
      flex: 0.2;
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 800;
    }
    .center {
      flex: 0.5;
      .ant-input-group-addon {
        display: none;
      }
      .ant-input {
        border: none;
        padding: 8px;
        border-radius: 5px;
      }
    }
  }
`;

export const DashboardContentMenu = styled.div`
  width: 100%;
  padding: 0 20px;

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
export const ContentHeader = styled.div`
  flex: 0.25;
  width: 100%;
  background: #fff;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 80px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .content {
    .count {
      font-size: 2rem;
      line-height: 1.8rem;
      font-weight: 600;
    }
    .title {
      font-size: small;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .icon {
    font-size: 2rem;
  }
`;

export const DashboardDesc = styled.div`
  width: 100%;

  padding: 0 20px;

  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .room__count {
      flex: 0.24;

      .container {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        padding: 20px 0;
        background: #fff;
        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
        .card {
          padding: 10px 0;
        }
        .desc {
          font-size: 0.9rem;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .graph {
      width: 100%;
      flex: 0.75;
      background: green;
    }
    .booked {
      background: #fff;
      margin-top: 10px;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
      h3 {
        font-size: 0.9rem;
        color: rgba(0, 0, 0, 0.5);
      }
      .progress__info {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .info {
          display: flex;
          align-items: center;
          gap: 5px;
          .color {
            display: flex;
            align-items: center;
            margin-left: 10px;

            .icon {
              color: red;
              font-weight: 800 !important;
            }
          }
          .desc {
            font-size: 0.9rem;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
`;
