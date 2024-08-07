import styles from './Search-Bar.module.scss';

const SearchBar = () => {
    return(
        <div className={styles.searchbar}>
            <input 
                placeholder="Введите поисковый запрос"
            />
            <button>
                Искать
            </button>
        </div>
    )
}

export default SearchBar;