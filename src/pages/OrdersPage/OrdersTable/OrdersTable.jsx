import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OrdersTable.module.scss';
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import OrdersTableRow from './OrdersTableRow/OrdersTableRow';
import { OrdersEffects } from '../../../store/slices/OrdersSlice/OrdersSlice';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';

const OrdersTable = () => {
    const dispatch = useDispatch()
    const {orders, count, isLoading} = useSelector(state => state.orders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getOrders = useCallback((currentPage, currentRowsPerPage) => {
        try {
            dispatch(OrdersEffects.getOrders({take: currentRowsPerPage, skip: currentPage * currentRowsPerPage})).unwrap();
        } catch {
            toast.error('Произошла ошибка. Повторите запрос позже');
        }
    }, [dispatch]);

    useEffect(() => {
        getOrders(page, rowsPerPage);
    }, []);

    return (
        <>
            {isLoading ? <Loader /> : (
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Продукт</TableCell>
                            <TableCell>ФИО</TableCell>
                            <TableCell>Номер телефона</TableCell>
                            <TableCell align='center'>Прочитано</TableCell>
                            <TableCell>Отправлено</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrdersTableRow key={order.id} order={order} />
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

export default OrdersTable;
