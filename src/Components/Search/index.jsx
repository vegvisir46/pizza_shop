import React from "react";

import styles from './Search.module.scss';

const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className={styles.root}>
      <svg className={styles.icon} height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
        <title/>
        <path
          d="M256,64C150.13,64,64,150.13,64,256s86.13,192,192,192,192-86.13,192-192S361.87,64,256,64Zm91.31,283.31a16,16,0,0,1-22.62,0l-42.84-42.83a88.08,88.08,0,1,1,22.63-22.63l42.83,42.84A16,16,0,0,1,347.31,347.31Z"/>
        <circle cx="232" cy="232" r="56"/>
      </svg>
      <input onChange={(e) => setSearchValue(e.target.value)}
             className={styles.input}
             placeholder='Поиск пиццы...'
             value={searchValue}/>

      {searchValue && <svg onClick={() => setSearchValue('')}
                           className={styles.clearIcon} viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
      </svg>}
    </div>
  )
}

export default Search;