import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';
import { Tag } from '../UI/tag';
import { reposAPI } from '../../services/repos';

/*
    MainScreen - основная обертка, где располагается таблица с результатами - SearchTable и ее Paginator
    Переменные из Redux:
        Welcome - ничего не было загружено, показывается приветственное сообщение
        !Welcome - Был совершен запрос, необходимо отрендерить интерфейс таблицы (в ней же содержится плейсхолдер для загрузки) и sidebar
        previewID - ID репозитория, который был выбран для подробного просмотра. Если он равен пустой строке, то отображается плейсхолдер
    Data - результат запроса подробностей о репозитории и isFetching его прогресс из RTKQuery
    Поробнее о структуре data в /types/typings.ts RTKInfoQueryAnswer;
    PrimaryLanguage и LicenseInfo могут быть NULL, поэтому они проверяются перед выводом. Если они NULL - выводится N/A и License is not available соответственно.
*/

const MainScreen = () => {

    const {welcome, previewID} = useAppSelector(state =>  state.repoReducer);
    const {data, isFetching} = reposAPI.useGetInfoQuery({id: previewID});

    return (
        <div className={welcome? styles.helloScreen : styles.mainSearch}>
            {welcome && <h1>{`Добро пожаловать`}</h1>}
            {!welcome && 
            <>
                <div className={styles.resultsWindow}>
                    <SearchTable />
                    <Paginator />
                </div>
                <div className={styles.sidebar}>
                    {data?.node === undefined? 
                        <div className={styles.placeholder}>
                            {isFetching? 'Загрузка...' : 'Выберите репозиторий'}
                        </div>
                        :
                        <div className={styles.repoInfo}>
                            <h2>
                                {data.node.name}
                            </h2>
                            <div className={styles.repoMainInfo}>
                                <Tag primary = {true}>{data.node.primaryLanguage? data.node.primaryLanguage.name : "N/A"}</Tag>
                                <div className={styles.stargazers}><img src='/assets/star.svg' alt='star sign'/>{data.node.stargazers.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
                            </div>
                            <div className={styles.repoLangs}>
                                {
                                    data.node.languages?
                                    data.node.languages.nodes.map((node) => (<Tag primary={false} key={node.name}>{node.name}</Tag>))
                                    :
                                    ''
                                }
                            </div>
                            <div className={styles.license}>
                                {data.node.licenseInfo? data.node.licenseInfo.name : "License is not available"}
                            </div>
                        </div>
                    }
                </div>    
            </>}
        </div>
    )
}

export default MainScreen;