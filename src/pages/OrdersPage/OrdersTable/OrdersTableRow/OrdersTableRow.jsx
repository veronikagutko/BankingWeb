import { TableCell, TableRow } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OrdersEffects } from '../../../../store/slices/OrdersSlice/OrdersSlice';
import { toast } from 'react-toastify';

const OrdersTableRow = ({order}) => {
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(order.isViewed);

    const toggleReaded = useCallback(() => {
        dispatch(OrdersEffects.setOrderComplete({id: order.id}))
            .unwrap()
            .catch((err) => {
                console.log('err')
                toast.error('Произошла ошибка. Повторите запрос позже');
            });
        setChecked(!isChecked);
    }, [dispatch, order.id, isChecked]);

    return (
        <TableRow>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.topic}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.phoneNumber}</TableCell>
            <TableCell align='center'>
                <input onChange={toggleReaded} type="checkbox" checked={isChecked} />
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleString('ru')}</TableCell>
        </TableRow>
    );
};

export default OrdersTableRow;
