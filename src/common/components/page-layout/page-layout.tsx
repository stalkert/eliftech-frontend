import React, { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import './page-layout.scss';
import Header from '../header/header';

interface PageLayoutProps {}

const PageLayout: React.FC<PropsWithChildren<PageLayoutProps>> = ({ children }) => {
  return (
    <div className="page-layout">
      <Layout>
        <Header />
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageLayout;
