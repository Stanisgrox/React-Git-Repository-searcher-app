import { useState } from 'react';
import { useAppdispatch } from '../../store/hooks/redux';
import { repoSetSearchTerm, searchClicked } from '../../store/reducers/repoActions';
import styles from './Search-Bar.module.sass';

const SearchBar = () => {
    const dispatch = useAppdispatch();
    const [term, setTerm] = useState('');

    return(
        <div className={styles.searchbar}>
            <input 
                placeholder="Введите поисковый запрос"
                onChange={(e) => setTerm(e.target.value)}
            />
            <button
                onClick={() => {
                    if (!term) return;
                    dispatch(searchClicked());
                    dispatch(repoSetSearchTerm(term));
                }}
            >
                Искать
            </button>
        </div>
    )
}

export default SearchBar;