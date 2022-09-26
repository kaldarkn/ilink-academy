import { useState } from 'react';
import Uploader from '../Uploader';
import Captcha from '../Captcha';
import Textarea from '../Textarea';
import Input from '../Input';
import File from '../File';
import styles from './Form.module.scss';
import ButtonSubmit from '../ButtonSubmit';
import Label from '../Label';
import FormTitle from '../FormTitle';

//Есть три похожие кнопки - сделать один компонент

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
  const handlerDeleteFile = () => {
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
        <FormTitle text="Отзыв" btnHandler={handlerOpenForm} />
        <Label text="Как вас зовут?" infoValid={infoInputName} />
        <Input handleValidation={handleValidation} handleOnBlur={handleOnBlur} value={inputName}>
          <Uploader handleChangeInputFile={handleChangeInputFile} />
        </Input>
        {fileName && (
          <File
            name={fileName}
            size={fileSize}
            load={fileLoad}
            handlerDeleteFile={handlerDeleteFile}
          />
        )}
        <Label text="Всё ли вам понравилось?" infoValid={infoTextComment} />
        <Textarea
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={textComment}
        />
        <Captcha
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={captcha}
          info={infoCaptcha}
        />
        <ButtonSubmit
          disabled={
            inputName.length === 0 ||
            textComment.length === 0 ||
            captcha.length === 0 ||
            fileLoad === false
          }
        />
      </form>
    </div>
  );
};

export default Form;
