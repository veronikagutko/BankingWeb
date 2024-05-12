import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ActivityPage from '../ActivityPage/ActivityPage';
import Header from '../../components/Header/Header';
import MessagesPage from '../MessagesPage/MessagesPage';
import OrdersPage from '../OrdersPage/OrdersPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';

const MainNavigator = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="activity" element={<ActivityPage />} />
                <Route path="activity/statistics" element={<StatisticsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="orders" element={<OrdersPage />} />
            </Routes>
        </div>
    );
};

export default MainNavigator;
