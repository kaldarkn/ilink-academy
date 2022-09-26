import React from 'react';
import styles from './Textarea.module.scss';

const Textarea = ({ handleValidation, handleOnBlur, value }) => {
  return (
    <div className={styles.comment}>
      <textarea
        onInput={(e) => handleValidation(e)}
        onBlur={(e) => handleOnBlur(e)}
        value={value}
        name="comment"
        placeholder="Напишите пару слов о вашем опыте..."
        spellCheck={false}></textarea>

      <span style={value.length === 200 ? { color: 'red' } : { color: '' }}>
        {value.length}/200
      </span>
    </div>
  );
};

export default React.memo(Textarea);
