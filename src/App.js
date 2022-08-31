import Header from './components/Header';
import UserCard from './components/UserCard';
import Reviews from './components/Reviews';
import styles from './App.module.scss';
import userPhoto from './assets/img/photo.jpg';
import Footer from './components/Footer';
import Form from './components/Form';
import { useState } from 'react';

const myInfo = {
  name: 'Калдар Кайрат',
  birthday: '27.06.1996',
  city: 'Томск',
  sex: 'мужчина',
  age: '25',
  info: `Привет! Меня зовут Кайрат, мне 25 лет. Уже 3.5 года работаю
  инженером-программистом в сфере Автоматизации технологических процессов. Но сейчас всерьёз
  задумываюсь о смене сферы деятельности: хочу стать Front-end разработчиком. Изучаю HTML,
  CSS, native JS, ReactJS. Скоро залечу в сферу IT и стану классным разработчиком! 💻`,
  ps: 'Кстати, у меня есть брат-близнец :)',
  pet: 'нет',
};

function App() {
  let [formOpened, setFormOpened] = useState(false);

  const handlerOpenForm = () => {
    setFormOpened(!formOpened);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.App}>
      {formOpened && <Form handlerOpenForm={handlerOpenForm} />}
      <Header />
      <div className={styles.content}>
        <h1 className={styles.welcome}>Добро пожаловать в академию!</h1>
        <img className={styles.avatar} src={userPhoto} alt="user-avatar" />
        <div className={styles.card}>
          <UserCard {...myInfo} />
        </div>
        <div className={styles.reviews}>
          <Reviews handlerOpenForm={handlerOpenForm} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
