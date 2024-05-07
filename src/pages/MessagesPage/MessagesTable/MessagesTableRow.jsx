import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import styles from './MessagesTable.module.scss';
import { toast } from 'react-toastify';

const MessagesTableRow = ({message, handleOpenDialog}) => {
    const handleCopyId = (value) => {
        navigator.clipboard.writeText(value)
        toast.success(`Скопирован ID: ${value}`);
    };

    return (
        <TableRow className={styles.dataRow}>
            <TableCell>{message.id}</TableCell>
            <TableCell onClick={() => handleCopyId(message.telegram_Id)}>{message.telegram_Id}</TableCell>
            <TableCell>{message.topic}</TableCell>
            <TableCell>
                {message.messageType === 1 ? 'Консультанты' : 'Разработчики'}
            </TableCell>
            <TableCell align='center'>
                <input type='checkbox' checked={message.isReaded} readOnly />
                {message.isReaded ? (
                    <button onClick={() => handleOpenDialog(0, message.id)}>Просмотр</button>
                ) : (
                    <button onClick={() => handleOpenDialog(1, message.id)}>Ответить</button>
                )}
            </TableCell>
            <TableCell>{new Date(message.createdAt).toLocaleString('ru')}</TableCell>
        </TableRow>
    );
};

export default MessagesTableRow;
