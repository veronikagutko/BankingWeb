import React, { useCallback, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './StatisticsPage.module.scss';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityEffects } from '../../store/slices/ActivitySlice/ActivitySlice';
import Loader from '../../components/Loader/Loader';
import CHART_COLORS from './chartColors';

const StatisticsPage = () => {
    const dispatch = useDispatch();
    const {items, isLoading} = useSelector(state => state.activity.statistics);
    const [itemsLabels, setItemsLabels] = useState([]);
    const [itemsValues, setItemsValues] = useState([]);

    const getStatistics = useCallback(() => {
        dispatch(ActivityEffects.getStatistics());
    }, [dispatch]);

    useEffect(() => {
        if (items.length > 0) {
            setItemsLabels(items.map(item => item.name));
            setItemsValues(items.map(item => Number(item.percent).toFixed(2)));
        }
    }, [items]);

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <div className={styles.sectionWrapper}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <Link to="/activity">
                        <ArrowBackIcon /> 
                        Назад
                    </Link>
                    <h2>Статистика</h2>
                </div>

                {!isLoading && items.length > 0 ? (
                    <div className={styles.contentContainer}>
                        <Doughnut
                            options={{
                                plugins: {
                                        legend: {
                                            position: 'right',
                                            labels: {
                                                font: {
                                                    size: 18,
                                                }
                                            }
                                        }
                                    }
                                }}
                            data={{
                                labels: itemsLabels.map((label, index) => `${label} - ${itemsValues[index]}%`),
                                datasets: [
                                    {
                                        label: 'Процент сообщений',
                                        backgroundColor: [...CHART_COLORS.inactive],
                                        borderColor: [...CHART_COLORS.inactive],
                                        borderWidth: 1,
                                        hoverBackgroundColor: [...CHART_COLORS.active],
                                        hoverBorderColor: [...CHART_COLORS.active],
                                        data: itemsValues
                                    }
                                ]
                            }} />
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;
