import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';

const MainScreen = () => {

    const {welcome, reposLoaded} = useAppSelector(state =>  state.repoReducer);

    return (
        <div className={welcome? styles.helloScreen : styles.mainSearch}>
            {welcome && <h1>{`Добро пожаловать`}</h1>}
            {reposLoaded && 
            <>
                <div className={styles.resultsWindow}>
                    <SearchTable />
                    <Paginator />
                </div>
                <div className={styles.sidebar}>
                    <div className={styles.placeholder}>
                        Выберите репозиторий
                    </div>
                </div>    
            </>}
        </div>
    )
}

export default MainScreen;