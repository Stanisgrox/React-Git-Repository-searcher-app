import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';
import { Tag } from '../UI/tag';

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
                    {false? 
                        <div className={styles.placeholder}>
                            Выберите репозиторий
                        </div>
                        :
                        <div className={styles.repoInfo}>
                            <h2>
                                Название репозитория
                            </h2>
                            <div className={styles.repoMainInfo}>
                                <Tag primary = {true}>Python</Tag>
                                <div>100</div>
                            </div>
                            <div className={styles.repoMainInfo}>
                                <Tag primary={false}>Python</Tag>
                                <Tag primary={false}>CLI</Tag>
                                <Tag primary={false}>ARV</Tag>
                                <Tag primary={false}>Rust</Tag>
                            </div>
                            <div className={styles.license}>
                                Лицензия моя
                            </div>
                        </div>
                    }
                </div>    
            </>}
        </div>
    )
}

export default MainScreen;