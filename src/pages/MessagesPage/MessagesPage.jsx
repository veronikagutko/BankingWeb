import React, { useState } from 'react';
import styles from './MessagesPage.module.scss';
import WriteResponseDialog from './MessageDialog/WriteResponseDialog';
import MessagesTable from './MessagesTable/MessagesTable';
import MessagesFilters from './MessagesFilters/MessagesFilters';
import ShowResponseDialog from './MessageDialog/ShowResponseDialog';

const MessagesPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [telegramId, setTelegramId] = useState('');
    const [isReaded, setReaded] = useState(false);
    const [messageType, setMessageType] = useState(null);
    const [dialogType, setDialogType] = useState(0);
    const [chosenMessageId, setChosenMessageId] = useState(0);

    const handleOpenDialog = (type, messageId) => {
        setChosenMessageId(messageId);
        setDialogType(type);
        setDialogOpen(true);
    };

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
                <h2>Сообщения</h2>
                <MessagesFilters
                    telegramId={telegramId} 
                    setTelegramId={setTelegramId}
                    isReaded={isReaded}
                    setReaded={setReaded}
                    messageType={messageType}
                    setMessageType={setMessageType} />

                <MessagesTable messageType={messageType} isReaded={isReaded} telegramId={telegramId} handleOpenDialog={handleOpenDialog} />
                
                {dialogOpen && dialogType === 0 ? (
                    <ShowResponseDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} messageId={chosenMessageId} />
                ) : (
                    <WriteResponseDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} messageId={chosenMessageId} />
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
