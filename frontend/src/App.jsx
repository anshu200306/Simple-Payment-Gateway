import React from 'react';
import { RecoilRoot } from 'recoil';
import PaymentGateway from './pages/PaymentGateway';
import './App.css';

function App() {
    return (
        <RecoilRoot>
            <PaymentGateway />
        </RecoilRoot>
    );
}

export default App;
