import React, {FC} from "react";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
}

const categories = [
  'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
];

const Categories: FC<CategoriesProps> = React.memo(({categoryId, onChangeCategory}) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return <li key={i}
                     onClick={() => {
                       onChangeCategory(i);
                     }}
                     className={categoryId === i ? 'active' : ''
                     }>{categoryName}</li>
        })}
      </ul>
    </div>
  )
})

export default Categories;