 import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import RoutesContainer from "./routes";
import {ConfigProvider, notification} from "antd";
import locale from 'antd/es/locale/pt_BR'
import './App.css';
import {errorSagaClear} from "./store/modules/global/action";
import LayoutContainer from "./components/LayoutContainer";
import LoadingDefault from "./components/LoadingDefault";

function App() {
    const dispatch = useDispatch();
    const { global_errors } = useSelector(store => store.globalReducer );
    const { authLoading } = useSelector(store => store.authReducer );
    const authURL = ['/auth/login', '/auth/change-password'];

    const isLoading = authLoading && !authURL.includes(window.location.pathname);

    useEffect(() => {
        if(global_errors) {
            notification.error({message: global_errors, onClose: () => dispatch(errorSagaClear()) });
        }
    }, [global_errors])

    return (
        <ConfigProvider locale={locale}>
            <LoadingDefault privateRoute={true} loading={isLoading}>
                <LayoutContainer valid={true}>
                    <RoutesContainer />
                </LayoutContainer>
            </LoadingDefault>
        </ConfigProvider>
    );
}

export default App;
