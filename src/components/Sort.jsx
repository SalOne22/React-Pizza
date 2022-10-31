import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortItem, setSortOrder } from '../redux/slices/filterSlice';

const listMenu = [
  { title: 'популярности', tag: 'rating' },
  { title: 'цене', tag: 'price' },
  { title: 'алфавиту', tag: 'title' },
];

function Sort() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.filter.sortItem);
  const order = useSelector((state) => state.filter.sortOrder);

  const [open, setOpen] = useState(false);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          onClick={() => dispatch(setSortOrder(!order))}
          width="12"
          height="15"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
            transform={order ? 'rotate(180, 5, 3.375)' : ''}
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{selectedItem.title}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {listMenu.map((listItem) => (
              <li
                key={listItem.title}
                onClick={() => {
                  dispatch(setSortItem(listItem));
                  setOpen(false);
                }}
                className={
                  selectedItem.title === listItem.title ? 'active' : ''
                }
              >
                {listItem.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
