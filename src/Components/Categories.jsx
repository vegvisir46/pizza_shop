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

        {/*<li className="active">Все</li>*/}
        {/*<li>Мясные</li>*/}
        {/*<li>Вегетарианская</li>*/}
        {/*<li>Гриль</li>*/}
        {/*<li>Острые</li>*/}
        {/*<li>Закрытые</li>*/}
      </ul>
    </div>
  )
}

export default Categories;