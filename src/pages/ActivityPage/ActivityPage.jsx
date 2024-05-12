import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ActivityPage.module.scss';
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { ActivityEffects } from '../../store/slices/ActivitySlice/ActivitySlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import NothingFound from '../../components/NothingFound/NothingFound';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ActivityPage = () => {
    const dispatch = useDispatch();
    const {activities, count, isLoading} = useSelector(state => state.activity)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [telegramId, setTelegramId] = useState(undefined);

    const fetchActivities = useCallback((currentTake, currentSkip, currentTelegramId) => {
        dispatch(ActivityEffects.getActivity({
            take: currentTake, 
            skip: currentSkip, 
            telegramId: currentTelegramId || null,
        })).unwrap().catch((err) => {
            console.log(err);
            toast.error('Произошла ошибка. Повторите запрос позже');
        });
    }, [dispatch]);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
        setPage(0);
        setRowsPerPage(Number(value));
    };

    const handleCopyId = (value) => {
        navigator.clipboard.writeText(value)
        toast.success(`Скопирован ID: ${value}`);
    }

    useEffect(() => {
        const skip = Number(page * rowsPerPage);
        fetchActivities(rowsPerPage, skip, telegramId);
    }, [page, rowsPerPage, telegramId, fetchActivities]);

    useEffect(() => {
        const skip = Number(page * rowsPerPage);
        fetchActivities(rowsPerPage, skip, telegramId);
    }, []);

    return (
        <div className={styles.sectionWrapper}>
            <div className={styles.sectionContainer}>
                <h2>Активность</h2>

                <div className={styles.sectionHeader}>
                    <input className={styles.searchInput} placeholder='ID телеграмма' type="text" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />

                    <Link to="statistics" className={styles.statisticsNavigator}>
                        <h4>Cтатистика</h4>
                        <ArrowForwardIcon />
                    </Link>
                </div>

                {isLoading && <Loader />}
                {!isLoading && activities.length === 0 && <NothingFound />}
                {!isLoading && activities.length > 0 && (
                    <div className={styles.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow className={styles.headerRow}>
                                    <TableCell>ID Пользователя</TableCell>
                                    <TableCell>Сообщение</TableCell>
                                    <TableCell>Дата</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activities.map((activity) => (
                                    <TableRow className={styles.dataRow} key={activity.createdAt}>
                                        <TableCell onClick={() => handleCopyId(activity.telegramId)}>
                                            {activity.telegramId}
                                        </TableCell>
                                        <TableCell>{activity.action}</TableCell>
                                        <TableCell>{new Date(activity.createdAt).toLocaleString('ru')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 30]}
                                        colSpan={3}
                                        count={count}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        disabled={false}
                                        labelRowsPerPage="Строк на странице:"
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} из ${count}`;
                                        }}
                                        slotProps={{
                                            select: {
                                                native: true,
                                            },
                                        }}
                                        onPageChange={(_, page) => handleChangePage(page)}
                                        onRowsPerPageChange={(e) => handleChangeRowsPerPage(e.target.value)}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityPage;
