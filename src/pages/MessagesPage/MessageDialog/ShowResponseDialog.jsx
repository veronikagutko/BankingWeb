import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessagesEffects } from '../../../store/slices/MessagesSlice/MessagesSlice';
import styles from './MessageDialog.module.scss';

const ShowResponseDialog = ({dialogOpen, setDialogOpen, messageId}) => {
    const dispatch = useDispatch();
    const {responseMessage} = useSelector(state => state.messages);

    const fetchMessageResponse = useCallback(() => {
        dispatch(MessagesEffects.getMessageResponse(messageId));
    }, [dispatch, messageId]);

    useEffect(() => {
        fetchMessageResponse();
    }, []);

    return (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Просмотр ответа</DialogTitle>
            {responseMessage && (
              <DialogContent>
                <DialogContentText>
                  Ниже приведён ответ от {new Date(responseMessage.createdAt).toLocaleString('ru')}:
                </DialogContentText>
                <div className={styles.messageContainer}>
                  <div className={styles.messageField}>
                      <p>&gt; "{responseMessage.message}"</p>
                  </div>
                </div>
              </DialogContent>
            )}
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowResponseDialog;
