import React from 'react';
import styles from './Input.module.scss';

const Input = ({ handleValidation, handleOnBlur, value, children }) => {
  return (
    <div className={styles.author}>
      <input
        onInput={(e) => handleValidation(e)}
        onBlur={(e) => handleOnBlur(e)}
        value={value}
        autoComplete="off"
        type="text"
        name="name"
        placeholder="Имя Фамилия"
        spellCheck={false}
      />
      {children}
    </div>
  );
};

export default React.memo(Input);
