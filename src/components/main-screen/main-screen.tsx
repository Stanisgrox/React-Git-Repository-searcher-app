import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';

const MainScreen = () => {

    const {isLoading, error, welcome, reposLoaded} = useAppSelector(state =>  state.repoReducer);

    return (
        <div className={welcome || error? styles.helloScreen : styles.mainSearch}>
            {welcome && <h1>{`Добро пожаловать`}</h1>}
            {error && <h1>{`При отправке запроса произошла ошибка: ${error}`}</h1>}
            {isLoading && <h1>Загрузка...</h1>}
            {reposLoaded && 
            <>
                <div className={styles.resultsWindow}>
                    <SearchTable />
                    <Paginator />
                </div>
                <div className={styles.sidebar}>
                    Выберите репозиторий
                </div>    
            </>}
        </div>
    )
}

export default MainScreen;