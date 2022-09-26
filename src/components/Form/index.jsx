import { useState } from 'react';
import Uploader from '../Uploader';
import Captcha from '../Captcha';
import Textarea from '../Textarea';
import Input from '../Input';
import File from '../File';
import ButtonSubmit from '../ButtonSubmit';
import Label from '../Label';
import FormTitle from '../FormTitle';
import styles from './Form.module.scss';

//Есть три похожие кнопки - сделать один компонент
//Правила валидации и информация в случае неправильной валидации
const VALIDATION_RULES = {
  name: (e) => [
    /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё ]$/.test(e.target.value),
    'Используйте только кириллицу и пробелы',
  ],
  comment: (e) => [e.target.value.length <= 200, 'Нельзя ввести более 200 символов'],
  captcha: () => [true, 'Введите код с картинки'],
};

const Form = ({ handlerOpenForm }) => {
  let [fileData, setFileData] = useState({ name: '', size: 0, loading: false });
  let [inputData, setInputData] = useState({ name: '', comment: '', captcha: '' });
  let [validationInfo, setValidationInfo] = useState({ name: '', comment: '', captcha: '' });

  //Обработчик выбора файла
  const handleChangeInputFile = (e) => {
    let file = e.target.files[0];
    //Если файл выбран
    if (file) {
      let date = new Date(Date.now());
      //Формируем дату добавления файла для имени
      const dd = `${date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`}`;
      const mm = `${date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : `${date.getUTCMonth()}`}`;
      const yyyy = `${date.getUTCFullYear()}`;
      const hour = `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}`;
      const min = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
      let strDate = `${dd}-${mm}-${yyyy}-${hour}-${min}`;

      //Устанавливаем название, размер, и статус загрузки
      setFileData((data) => ({ ...data, name: `Photo ${strDate}`, size: file.size / 1024 / 1024 }));
      //имитация отправки на бэкенд
      setTimeout(() => {
        setFileData((data) => ({ ...data, loading: true }));
        e.target.value = null;
      }, 4000);
    }
  };

  //Обработчик удаления файла с сервера
  const handlerDeleteFile = () => {
    setFileData({ name: '', size: 0, loading: false });
  };

  const handleOnBlur = (e) => {
    //Если после отведения фокуса, поле осталось пустым, закрашиваем border красным цветом и выводим информацию для юзера
    if (e.target.value.length === 0) {
      e.target.style.borderColor = 'red';
      setValidationInfo((data) => ({ ...data, [e.target.name]: 'Поле не может быть пустым' }));
    } else {
      e.target.style.borderColor = '';
      setValidationInfo((data) => ({ ...data, [e.target.name]: '' }));
    }
  };

  const handleValidation = (e) => {
    const [rule, noValidInfo] = VALIDATION_RULES[e.target.name](e);

    if (rule) {
      setInputData((data) => ({ ...data, [e.target.name]: e.target.value }));
      setValidationInfo((data) => ({
        ...data,
        [e.target.name]: '',
      }));
    } else {
      setValidationInfo((data) => ({
        ...data,
        [e.target.name]: noValidInfo,
      }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} method="post" encType="multipart/form-data">
        <FormTitle text="Отзыв" btnHandler={handlerOpenForm} />
        <Label text="Как вас зовут?" infoValid={validationInfo.name} />
        <Input
          name="name"
          placeholder="Имя Фамилия"
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={inputData.name}>
          <Uploader handleChangeInputFile={handleChangeInputFile} />
        </Input>
        {fileData.name && (
          <File
            name={fileData.name}
            size={fileData.size}
            load={fileData.loading}
            handlerDeleteFile={handlerDeleteFile}
          />
        )}
        <Label text="Всё ли вам понравилось?" infoValid={validationInfo.comment} />
        <Textarea
          name="comment"
          placeholder="Напишите пару слов о вашем опыте..."
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={inputData.comment}
        />
        <Captcha
          name="captcha"
          placeholder="0000"
          handleValidation={handleValidation}
          handleOnBlur={handleOnBlur}
          value={inputData.captcha}
          info={validationInfo.captcha}
        />
        <ButtonSubmit
          disabled={
            inputData.name.length === 0 ||
            inputData.comment.length === 0 ||
            inputData.captcha.length === 0 ||
            fileData.loading === false
          }
        />
      </form>
    </div>
  );
};

export default Form;
