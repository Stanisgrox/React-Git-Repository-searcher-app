import { useState } from 'react';
import { useAppdispatch } from '../../store/hooks/redux';
import { repoSetSearchTerm, searchClicked } from '../../store/reducers/repoActions';
import styles from './Search-Bar.module.sass';

/*
    Строка поиска.
    term - временное хранилище для пользовательского ввода.
    
    При нажатии Enter или кнопки выполняется функция search. Она проверяет, не является ли строка пустой, а затем
    отправляет два сигнала в Redux - то что приветственный экран был покинут и то что был задана строка для поиска.
*/

const SearchBar = () => {
    const dispatch = useAppdispatch();
    const [term, setTerm] = useState('');

    const search = () => {
        if (!term) return;
        dispatch(searchClicked());
        dispatch(repoSetSearchTerm(term));
    }

    return(
        <div className={styles.searchbar}>
            <input 
                placeholder="Введите поисковый запрос"
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) =>{if (e.key === 'Enter') search()}}
            />
            <button
                onClick={() => search()}
            >
                Искать
            </button>
        </div>
    )
}

export default SearchBar;