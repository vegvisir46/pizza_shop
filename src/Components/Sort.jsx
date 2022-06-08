import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../redux/slices/filterSlice";

const Sort = () => {
  const [open, setOpen] = useState(false);
  const sort = useSelector(state => state.filter.currentSort);
  const sorts = useSelector(state => state.filter.sorts);
  const dispatch = useDispatch();
  const sortRef = useRef();

  // const sorts = [
  //   {name: 'популярности (убыв.)', sortProperty: 'rating'},
  //   {name: 'популярности (возр.)', sortProperty: '-rating'},
  //   {name: 'цене (убыв.)', sortProperty: 'price'},
  //   {name: 'цене (возр.)', sortProperty: '-price'},
  //   {name: 'алфавиту (убыв.)', sortProperty: 'title'},
  //   {name: 'алфавиту (возр.)', sortProperty: '-title'}
  // ];

  const onSortClick = (i) => {
    dispatch(setSort(i));
    setOpen(false);
  };

  const onOrderClick = (i) => {
    console.log('перевернуть иконку')
  };

  useEffect(() => {
    const handleClickOutside = event => !event.path.includes(sortRef.current) && setOpen(false);
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg onClick={() => {
          onOrderClick()
        }} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"/>
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && <div className="sort__popup">
        <ul>
          {sorts.map((obj, i) => {
            return <li key={i} onClick={() => onSortClick(obj)}
                       className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>{obj.name}</li>
          })}
        </ul>
      </div>}
    </div>
  )
}

export default Sort;