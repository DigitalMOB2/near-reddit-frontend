import React, {Suspense} from 'react';
import {Layout as LayoutAntd} from 'antd';
import {BrowserRouter as Router} from 'react-router-dom';

import s from './app.module.css';
import {AppProvider} from './App.context';
import {Routes} from '../Routes/Routes';
import {AuthProvider} from '../pages/Main/Login/Auth.context';
import {AddModeratorProvider} from '../pages/Main/AddModerator/AddModerator.context';
import {RemoveModeratorProvider} from '../pages/Main/RemoveModerator/RemoveModerator.context';
import {TransferProvider} from '../pages/Main/Transfer/Transfer.context';

function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <AddModeratorProvider>
                    <RemoveModeratorProvider>
                        <TransferProvider>
                            <Suspense fallback="loading">
                                <Router>
                                    <LayoutAntd className={s.layout}>
                                        <Routes/>
                                    </LayoutAntd>
                                </Router>
                            </Suspense>
                        </TransferProvider>
                    </RemoveModeratorProvider>
                </AddModeratorProvider>
            </AuthProvider>
        </AppProvider>
    );
}

export default App;
