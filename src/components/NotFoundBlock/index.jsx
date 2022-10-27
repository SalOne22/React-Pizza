import style from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <span>😕</span>
      <h1>Ничего не найдено</h1>
      <p className={style.description}>
        К сожалению данной страницы не существует
      </p>
    </div>
  );
};

export default NotFoundBlock;
