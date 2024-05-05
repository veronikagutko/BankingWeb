import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ActivityPage.module.scss';
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { ActivityEffects } from '../../store/slices/ActivitySlice/ActivitySlice';
import { toast } from 'react-toastify';

const ActivityPage = () => {
    const dispatch = useDispatch();
    const {activities} = useSelector(state => state.activity)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [telegramId, setTelegramId] = useState(undefined);

    const fetchActivities = useCallback((currentTake, currentSkip, currentTelegramId) => {
        dispatch(ActivityEffects.getActivity({
            take: currentTake, 
            skip: currentSkip, 
            telegramId: currentTelegramId || null,
        }));
    }, [dispatch, page, rowsPerPage, telegramId]);

    const handleChangePage = (value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (value) => {
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

                <input className={styles.searchInput} placeholder='ID телеграмма' type="text" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />
                
                {activities.length > 0 && (
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
                                count={activities.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                disabled={false}
                                labelRowsPerPage="Строк на странице:"
                                labelDisplayedRows={({from, to, count}) => {
                                    return '';
                                }}
                                slotProps={{
                                    select: {
                                        native: true,
                                    },
                                }}
                                onPageChange={(e) => handleChangePage(e.target.value)}
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
