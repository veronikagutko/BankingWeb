import React from 'react';

import styles from './MessagesFilters.module.scss';

const MessagesFilters = ({telegramId, setTelegramId, isReaded, setReaded, messageType, setMessageType}) => {
    const handleChangeMessageType = (value) => {
        setMessageType(Number(value) === 0 ? null : value);
    }

    const toggleCheckReaded = (e) => {
        setReaded(!isReaded);
    };

    return (
        <div className={styles.filtersContainer}>
            <input 
                maxLength={10} 
                className={styles.searchInput} 
                placeholder='ID телеграмма' 
                type="text" 
                value={telegramId} 
                onChange={(e) => setTelegramId(e.target.value)} />

            <select onChange={(e) => handleChangeMessageType(e.target.value)} className={styles.selectInput}>
                <option value={0}>По умолчанию</option>
                <option value={1}>Консультантам</option>
                <option value={2}>Разработчикам</option>
            </select>
            
            <div className={styles.isReadedInput}>
                <label htmlFor="#isReaded">Прочитано</label>
                <input onClick={toggleCheckReaded} id="#isReaded" type="checkbox" />
            </div>
        </div>
    );
};

export default MessagesFilters;
