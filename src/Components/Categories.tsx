import React, {FC} from "react";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: any;
}

const Categories: FC<CategoriesProps> = ({categoryId, onChangeCategory}) => {
  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
  ];

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
}

export default Categories;