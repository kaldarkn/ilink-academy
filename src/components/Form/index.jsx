import { useState } from 'react';
import styles from './Form.module.scss';
import spinner from '../../assets/img/spinner.gif';
import iconJpg from '../../assets/img/jpg_icon.png';
import iconDelete from '../../assets/img/delete.png';
import iconDeleteHover from '../../assets/img/delete_hover.png';
import iconInfo from '../../assets/img/info_icon.png';
import captchaImg from '../../assets/img/captcha.png';
import reload from '../../assets/img/reload.png';

// const Form = ({ handlerOpenForm }) => {
//   let [fileName, setFileName] = useState('');
//   let [fileSize, setFileSize] = useState(0);
//   let [fileLoad, setFileLoad] = useState(false);
//   let [inputName, setInputName] = useState('');
//   let [infoInputName, setInfoInputName] = useState('');
//   let [textComment, setTextComment] = useState('');
//   let [infoTextComment, setInfoTextComment] = useState('');
//   let [captcha, setCaptcha] = useState('');
//   let [infoCaptcha, setInfoCaptcha] = useState('');

//   //Обработчик выбора файла
//   const handleChangeInputFile = (e) => {
//     //Если файл выбран
//     if (e.target.files[0]) {
//       let date = new Date(Date.now());
//       //Формируем дату добавления файла для имени
//       let strDate = `${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`}-${
//         date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : `${date.getUTCMonth()}`
//       }-${date.getUTCFullYear()}-${
//         date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
//       }-${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;

//       //Устанавливаем название файла
//       setFileName(`Photo ${strDate}`);
//       //Определяем размер файла
//       setFileSize(e.target.files[0].size / 1024 / 1024);
//       //Имитируем отправку на бэкенд
//       setTimeout(() => {
//         setFileLoad(true);
//         e.target.value = null;
//       }, 4000);
//     }
//     //
//   };

//   //Обработчик удаления файла с сервера
//   const handlerDeleteFIle = () => {
//     setFileName('');
//     setFileSize(0);
//     setFileLoad(false);
//   };

//   const handleOnBlur = (e) => {
//     //Если после отведения фокуса, поле осталось пустым, закрашиваем border красным цветом и выводим информацию для юзера
//     if (e.target.value.length === 0) {
//       e.target.style.borderColor = 'red';
//       switch (e.target.name) {
//         case 'name':
//           setInfoInputName('Введите имя');
//           break;

//         case 'comment':
//           setInfoTextComment('Напишите фидбэк');
//           break;
//         case 'captcha':
//           setInfoCaptcha('Необходимо ввести код с картинки');
//           break;
//         default:
//           break;
//       }
//     } else {
//       e.target.style.borderColor = '';
//       switch (e.target.name) {
//         case 'name':
//           setInfoInputName('');
//           break;

//         case 'comment':
//           setInfoTextComment('');
//           break;
//         case 'captcha':
//           setInfoCaptcha('');
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const handleValidation = (e) => {
//     switch (e.target.name) {
//       case 'name':
//         //Регулярка на ввод только кириллицы
//         if (/^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё ]$/.test(e.target.value)) {
//           setInputName(e.target.value);
//           setInfoInputName('');
//         } else {
//           setInfoInputName('Используйте только кириллицу и пробелы');
//         }
//         break;
//       case 'comment':
//         if (e.target.value.length <= 200) {
//           setTextComment(e.target.value);
//           setInfoTextComment('');
//         } else {
//           setInfoTextComment('Нельзя ввести более 200 символов');
//         }

//         break;
//       case 'captcha':
//         setCaptcha(e.target.value);
//         setInfoCaptcha('');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <form className={styles.form} method="post" encType="multipart/form-data">
//         <div className={styles.header}>
//           <h1>Отзыв</h1>
//           <svg
//             onClick={() => handlerOpenForm()}
//             className={styles.hideForm}
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M12 11.5561L17.7781 5.77807L18.7613 6.76129L12.9832 12.5394L18.7613 18.3174L17.7781 19.3006L12 13.5226L6.22193 19.3006L5.23871 18.3174L11.0168 12.5394L5.23871 6.76129L6.22193 5.77807L12 11.5561Z"
//               fill="#8A8A8A"
//             />
//           </svg>
//         </div>
//         <div className={styles.main}>
//           <label htmlFor="name">
//             Как вас зовут? <sup>{infoInputName}</sup>
//           </label>
//           <div className={styles.author}>
//             <input
//               onInput={(e) => handleValidation(e)}
//               onBlur={(e) => handleOnBlur(e)}
//               value={inputName}
//               autoComplete="off"
//               type="text"
//               name="name"
//               placeholder="Имя Фамилия"
//               spellCheck={false}
//             />
//             <label className={styles.uploader} htmlFor="file">
//               <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M6.12857 6.1286V3.05176e-05H8.17143V6.1286H14.3V8.17146H8.17143V14.3H6.12857V8.17146H0V6.1286H6.12857Z"
//                   fill="white"
//                 />
//               </svg>
//               Загрузить фото
//               <input
//                 onChange={(e) => handleChangeInputFile(e)}
//                 type="file"
//                 name="file"
//                 id="file"
//                 accept=".jpg, .jpeg"
//               />
//             </label>
//           </div>

//           {fileName && (
//             <div className={styles.fileInfo}>
//               <img className={styles.iconJpg} src={iconJpg} alt="jpg-icon" />
//               <div>
//                 <label>{fileName}</label>
//                 <progress id="file" max="2" value={fileSize}></progress>
//               </div>

//               {fileLoad ? (
//                 <img
//                   onClick={handlerDeleteFIle}
//                   className={styles.deleteIcon}
//                   onMouseOver={(e) => {
//                     e.target.src = iconDeleteHover;
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.src = iconDelete;
//                   }}
//                   src={iconDelete}
//                   alt="delete"
//                 />
//               ) : (
//                 <img className={styles.spinner} src={spinner} alt="spinner" />
//               )}
//             </div>
//           )}
//           <label htmlFor="comment">
//             Всё ли вам понравилось?<sup>{infoTextComment}</sup>
//           </label>
//           <div className={styles.comment}>
//             <textarea
//               onInput={(e) => handleValidation(e)}
//               onBlur={(e) => handleOnBlur(e)}
//               value={textComment}
//               name="comment"
//               placeholder="Напишите пару слов о вашем опыте..."
//               spellCheck={false}></textarea>

//             <span style={textComment.length === 200 ? { color: 'red' } : { color: '' }}>
//               {textComment.length}/200
//             </span>
//           </div>

//           <div className={styles.captcha}>
//             <div>
//               <div>
//                 <label htmlFor="captcha">
//                   Введите код с картинки<sup>{infoCaptcha}</sup>
//                 </label>
//                 <input
//                   onInput={(e) => handleValidation(e)}
//                   onBlur={(e) => handleOnBlur(e)}
//                   value={captcha}
//                   type="text"
//                   name="captcha"
//                   placeholder="0000"
//                   spellCheck={false}
//                 />
//               </div>

//               <img className={styles.imgCaptcha} src={captchaImg} alt="captcha" />
//               <img className={styles.iconReload} src={reload} alt="reload" />
//             </div>
//           </div>
//         </div>
//         <div className={styles.submit}>
//           <input
//             type="submit"
//             value="Отправить отзыв"
//             disabled={
//               inputName.length === 0 ||
//               textComment.length === 0 ||
//               captcha.length === 0 ||
//               fileLoad === false
//             }
//           />
//           <div className={styles.info}>
//             <img className={styles.iconInfo} src={iconInfo} alt="icon-info" />
//             <span>Все отзывы проходят модерацию в течение 2 часов</span>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

const Form = ({ handlerOpenForm }) => {
  let [fileName, setFileName] = useState('');
  let [fileSize, setFileSize] = useState(0);
  let [fileLoad, setFileLoad] = useState(false);
  let [inputName, setInputName] = useState('');
  let [infoInputName, setInfoInputName] = useState('');
  let [textComment, setTextComment] = useState('');
  let [infoTextComment, setInfoTextComment] = useState('');
  let [captcha, setCaptcha] = useState('');
  let [infoCaptcha, setInfoCaptcha] = useState('');

  //Обработчик выбора файла
  const handleChangeInputFile = (e) => {
    //Если файл выбран
    if (e.target.files[0]) {
      let date = new Date(Date.now());
      //Формируем дату добавления файла для имени
      let strDate = `${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`}-${
        date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : `${date.getUTCMonth()}`
      }-${date.getUTCFullYear()}-${
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
      }-${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;

      //Устанавливаем название файла
      setFileName(`Photo ${strDate}`);
      //Определяем размер файла
      setFileSize(e.target.files[0].size / 1024 / 1024);
      //Имитируем отправку на бэкенд
      setTimeout(() => {
        setFileLoad(true);
        e.target.value = null;
      }, 4000);
    }
    //
  };

  //Обработчик удаления файла с сервера
  const handlerDeleteFIle = () => {
    setFileName('');
    setFileSize(0);
    setFileLoad(false);
  };

  const handleOnBlur = (e) => {
    //Если после отведения фокуса, поле осталось пустым, закрашиваем border красным цветом и выводим информацию для юзера
    if (e.target.value.length === 0) {
      e.target.style.borderColor = 'red';
      switch (e.target.name) {
        case 'name':
          setInfoInputName('Введите имя');
          break;

        case 'comment':
          setInfoTextComment('Напишите фидбэк');
          break;
        case 'captcha':
          setInfoCaptcha('Необходимо ввести код с картинки');
          break;
        default:
          break;
      }
    } else {
      e.target.style.borderColor = '';
      switch (e.target.name) {
        case 'name':
          setInfoInputName('');
          break;

        case 'comment':
          setInfoTextComment('');
          break;
        case 'captcha':
          setInfoCaptcha('');
          break;
        default:
          break;
      }
    }
  };

  const handleValidation = (e) => {
    switch (e.target.name) {
      case 'name':
        //Регулярка на ввод только кириллицы
        if (/^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё ]$/.test(e.target.value)) {
          setInputName(e.target.value);
          setInfoInputName('');
        } else {
          setInfoInputName('Используйте только кириллицу и пробелы');
        }
        break;
      case 'comment':
        if (e.target.value.length <= 200) {
          setTextComment(e.target.value);
          setInfoTextComment('');
        } else {
          setInfoTextComment('Нельзя ввести более 200 символов');
        }

        break;
      case 'captcha':
        setCaptcha(e.target.value);
        setInfoCaptcha('');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} method="post" encType="multipart/form-data">
        <div className={styles.header}>
          <h1>Отзыв</h1>
          <svg
            onClick={() => handlerOpenForm()}
            className={styles.hideForm}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 11.5561L17.7781 5.77807L18.7613 6.76129L12.9832 12.5394L18.7613 18.3174L17.7781 19.3006L12 13.5226L6.22193 19.3006L5.23871 18.3174L11.0168 12.5394L5.23871 6.76129L6.22193 5.77807L12 11.5561Z"
              fill="#8A8A8A"
            />
          </svg>
        </div>
        <div className={styles.main}>
          <label htmlFor="name">
            Как вас зовут? <sup>{infoInputName}</sup>
          </label>
          <div className={styles.author}>
            <input
              onInput={(e) => handleValidation(e)}
              onBlur={(e) => handleOnBlur(e)}
              value={inputName}
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Имя Фамилия"
              spellCheck={false}
            />
            <label className={styles.uploader} htmlFor="file">
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.12857 6.1286V3.05176e-05H8.17143V6.1286H14.3V8.17146H8.17143V14.3H6.12857V8.17146H0V6.1286H6.12857Z"
                  fill="white"
                />
              </svg>
              Загрузить фото
              <input
                onChange={(e) => handleChangeInputFile(e)}
                type="file"
                name="file"
                id="file"
                accept=".jpg, .jpeg"
              />
            </label>
          </div>

          {fileName && (
            <div className={styles.fileInfo}>
              <img className={styles.iconJpg} src={iconJpg} alt="jpg-icon" />
              <div>
                <label>{fileName}</label>
                <progress id="file" max="2" value={fileSize}></progress>
              </div>

              {fileLoad ? (
                <img
                  onClick={handlerDeleteFIle}
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
          )}
          <label htmlFor="comment">
            Всё ли вам понравилось?<sup>{infoTextComment}</sup>
          </label>
          <div className={styles.comment}>
            <textarea
              onInput={(e) => handleValidation(e)}
              onBlur={(e) => handleOnBlur(e)}
              value={textComment}
              name="comment"
              placeholder="Напишите пару слов о вашем опыте..."
              spellCheck={false}></textarea>

            <span style={textComment.length === 200 ? { color: 'red' } : { color: '' }}>
              {textComment.length}/200
            </span>
          </div>

          <div className={styles.captcha}>
            <div>
              <div>
                <label htmlFor="captcha">
                  Введите код с картинки<sup>{infoCaptcha}</sup>
                </label>
                <input
                  onInput={(e) => handleValidation(e)}
                  onBlur={(e) => handleOnBlur(e)}
                  value={captcha}
                  type="text"
                  name="captcha"
                  placeholder="0000"
                  spellCheck={false}
                />
              </div>

              <img className={styles.imgCaptcha} src={captchaImg} alt="captcha" />
              <img className={styles.iconReload} src={reload} alt="reload" />
            </div>
          </div>
        </div>
        <div className={styles.submit}>
          <input
            type="submit"
            value="Отправить отзыв"
            disabled={
              inputName.length === 0 ||
              textComment.length === 0 ||
              captcha.length === 0 ||
              fileLoad === false
            }
          />
          <div className={styles.info}>
            <img className={styles.iconInfo} src={iconInfo} alt="icon-info" />
            <span>Все отзывы проходят модерацию в течение 2 часов</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
