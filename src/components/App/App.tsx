import React, {Suspense} from 'react';
import {Layout as LayoutAntd} from 'antd';
import {BrowserRouter as Router} from 'react-router-dom';

import s from './app.module.css';
import {AppProvider} from './App.context';
import {Routes} from '../Routes/Routes';
import {AuthProvider} from '../pages/Main/Login/Auth.context';

function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <Suspense fallback="loading">
                    <Router>
                        <LayoutAntd className={s.layout}>
                            <Routes/>
                        </LayoutAntd>
                    </Router>
                </Suspense>
            </AuthProvider>
        </AppProvider>
    );
}

export default App;
