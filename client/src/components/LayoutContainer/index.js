import React, { useState } from "react";
import {Button, Layout, Space} from 'antd';
import MenuSidebar from "./MenuSidebar";
import {TbBuildingChurch} from "react-icons/tb";
import LayoutHeader from "./LayoutHeader";

import "./style.css";

export default function LayoutContainer({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { Content, Footer, Sider } = Layout;
    const authURL = ['/auth/login', '/auth/change-password'];

    const backHome = () => window.location = "/";

    if(authURL.includes(window.location.pathname)){
      return children
    }

    return (
        <Layout style={{ minHeight: '100vh'}} >
            <Sider
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="md"
                collapsedWidth="0"
            >
                <div className={`logo-title ${ collapsed ? 'collapsed': ''}`} onClick={backHome}>
                    <div className={'logo'}>
                        <TbBuildingChurch size={25} />
                    </div>
                    <Space style={{ fontSize: "14px", fontWeight: "400" }}>
                        Churchly
                    </Space>
                </div>
                <MenuSidebar />
            </Sider>
            <Layout className="site-layout">
                <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content style={{ margin: '0 16px' }}>
                    { children }
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    © {new Date().getFullYear()} - Todos os direitos reservados - Churchly
                </Footer>
            </Layout>
        </Layout>
    );
}
