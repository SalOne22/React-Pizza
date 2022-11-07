import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

function Categories() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((selectedCategory, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={selectedId === index ? 'active' : ''}
          >
            {selectedCategory}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
