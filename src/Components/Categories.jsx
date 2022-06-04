import React, {useState} from "react";

let Categories = () => {

  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
  ]

  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) => {
          return <li key={i}
                     onClick={() => {
                       setActiveIndex(i)
                     }}
                     className={activeIndex === i ? 'active' : ''
                     }>{name}</li>
        })}
      </ul>
    </div>
  )
}

export default Categories;