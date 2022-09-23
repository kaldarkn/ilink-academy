import React from 'react';
import styles from './ReviewCard.module.scss';

const ReviewCard = ({ photo, name, date, comment }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.author}>
          <img src={photo} alt="userPhoto" />
          <h1>{name}</h1>
        </div>
        <h3>{date}</h3>
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default React.memo(ReviewCard);
