import { useState } from 'react';
import { useAppdispatch } from '../../store/hooks/redux';
import { fetchRepos } from '../../store/reducers/repoActions';
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
                onClick={() => dispatch(fetchRepos(term))}
            >
                Искать
            </button>
        </div>
    )
}

export default SearchBar;