import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessagesEffects } from '../../../store/slices/MessagesSlice/MessagesSlice';
import { toast } from 'react-toastify';

const WriteResponseDialog = ({dialogOpen, setDialogOpen, messageId}) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const sendMessage = useCallback((currentMessage) => {
		try {
			dispatch(MessagesEffects.sendMessage({message: currentMessage, messageId}))
				.unwrap()
				.then(() => {
					toast.success('Ответ успешно отправлен');
					setDialogOpen(false);
				});
		} catch {
			toast.error('Произошла ошибка. Повторите попытку позже');
		}
	}, [messageId, dispatch, setDialogOpen]);

  	return (
  	    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  	        <DialogTitle>Ответить на сообщение</DialogTitle>
  	        <DialogContent>
  	          <DialogContentText>
  	            В поле ниже введите сообщение, которое вы бы хотели отправить выбранному пользователю. Для отправки сообщения, после его ввода, нажмите "Отправить", для отмены нажмите "Отмена"
  	          </DialogContentText>
  	          <TextField
  	            autoComplete="new-password"
  	            autoFocus
  	            required
  	            margin="dense"
  	            label="Ваш ответ"
  	            type="text"
  	            fullWidth
  	            variant="standard"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
  	          />
  	        </DialogContent>
  	        <DialogActions>
  	          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
  	          <Button type="submit" onClick={() => sendMessage(message, messageId)}>Отправить</Button>
  	        </DialogActions>
  	    </Dialog>
  	);
};

export default WriteResponseDialog;
