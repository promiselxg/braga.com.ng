import { Avatar } from 'antd';
import React from 'react';
import { FiBell, FiMail, FiMenu, FiSearch, FiUser } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from './index';

const LayoutWrapper = styled.section`
  width: 100%;
  min-height: 100vh;

  .container {
    width: 100%;
    position: relative;
  }
  .sidebar {
    position: fixed;
    width: 290px;
    height: 100%;
    background: #101924;
    border-right-color: #203247;
    transition: 0.5s;
    overflow: hidden;

    ul {
      li:nth-child(1) {
        padding: 0.4rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
      li {
        padding: 5px 0;
        width: 100%;
        display: flex;
        align-items: center;
      }
      a {
        padding: 0.625rem 40px 0.625rem 24px;
        color: #6e82a5;
        font-family: Nunito, sans-serif;
        font-weight: 700;
        font-size: 15px;
        letter-spacing: 0.01em;
        text-transform: none;
        line-height: 1.25rem;
        cursor: pointer;
        width: max-content;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 20px;

        .icon {
          display: flex;
          align-items: center;
          font-size: 1.6rem;
        }
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        &:hover {
          color: #7f8dff;
        }
      }
    }
    .main {
      position: absolute;
      width: calc(100% - 290px);
      left: 290px;
      min-height: 100vh;
      transition: 0.5s;
    }
  }
  .dashboard__topbar {
    width: calc(100% - 290px);
    display: flex;
    position: sticky;
    margin-left: 290px;
    top: 0;
    z-index: 888;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    background: #fff;
    height: 60px;
    padding: 0 2rem;
    .topbar__rightnav {
      display: flex;
      gap: 20px;
      align-items: center;

      .topbar__rightnav__item {
        display: flex;
      }
    }
    .menu__icon {
      font-size: 1.5em;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
const Layout = () => {
  return (
    <>
      <LayoutWrapper>
        <div className="container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main">
            <div className="dashboard__topbar">
              <div className="toggle">
                <FiMenu className="menu__icon" />
              </div>

              <div className="topbar__rightnav">
                <div className="topbar__rightnav__item">
                  <FiSearch className="menu__icon" />
                </div>
                <div className="topbar__rightnav__item">
                  <FiMail className="menu__icon" />
                </div>
                <div className="topbar__rightnav__item">
                  <FiBell className="menu__icon" />
                </div>
                <div className="topbar__rightnav__item">
                  <Avatar icon={<FiUser />} className="menu__icon" />
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
