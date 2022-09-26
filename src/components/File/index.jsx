import React from 'react';
import spinner from '../../assets/img/spinner.gif';
import iconJpg from '../../assets/img/jpg_icon.png';
import iconDelete from '../../assets/img/delete.png';
import iconDeleteHover from '../../assets/img/delete_hover.png';
import styles from './File.module.scss';

const File = ({ name, size, load, handlerDeleteFile }) => {
  return (
    <div className={styles.fileInfo}>
      <img className={styles.iconJpg} src={iconJpg} alt="jpg-icon" />
      <div>
        <label>{name}</label>
        <progress id="file" max="2" value={size}></progress>
      </div>

      {load ? (
        <img
          onClick={handlerDeleteFile}
          className={styles.deleteIcon}
          onMouseOver={(e) => {
            e.target.src = iconDeleteHover;
          }}
          onMouseOut={(e) => {
            e.target.src = iconDelete;
          }}
          src={iconDelete}
          alt="delete"
        />
      ) : (
        <img className={styles.spinner} src={spinner} alt="spinner" />
      )}
    </div>
  );
};

export default React.memo(File);
