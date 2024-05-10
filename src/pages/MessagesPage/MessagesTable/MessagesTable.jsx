import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './MessagesTable.module.scss';
import MessagesTableRow from './MessagesTableRow';
import { useDispatch, useSelector } from 'react-redux';
import { MessagesEffects } from '../../../store/slices/MessagesSlice/MessagesSlice';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-toastify';

const MessagesTable = ({messageType, isReaded, telegramId, handleOpenDialog}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const {messages, count, isLoading} = useSelector(state => state.messages);

    const fetchMessages = useCallback(({telegramId, messageType, isReaded, take, skip}) => {
        try {
            dispatch(MessagesEffects.getMessages({telegramId, messageType, isReaded, take, skip}));
        } catch {
            toast.error('Произошла ошибка. Повторите запрос позже');
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMessages({take: rowsPerPage, skip: page * rowsPerPage, messageType, isReaded, telegramId});
    }, [fetchMessages, isReaded, messageType, page, rowsPerPage, telegramId]);

    useEffect(() => {
        fetchMessages({take: rowsPerPage, skip: page * rowsPerPage, messageType, isReaded, telegramId});
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && messages && messages.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow className={styles.headerRow}>
                            <TableCell>ID</TableCell>
                            <TableCell>ID Пользователя</TableCell>
                            <TableCell>Сообщение</TableCell>
                            <TableCell>Получатель</TableCell>
                            <TableCell align='center'>Прочитано</TableCell>
                            <TableCell>Отправлено</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map((message) => (
                            <MessagesTableRow key={message.id} message={message} handleOpenDialog={handleOpenDialog} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                colSpan={6}
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
                                onPageChange={(e) => setPage(e.target.value)}
                                onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </>
    );
};

export default MessagesTable;
