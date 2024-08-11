import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';
import { Tag } from '../UI/tag';
import { reposAPI } from '../../services/repos';

const MainScreen = () => {

    const {welcome, reposLoaded, previewID} = useAppSelector(state =>  state.repoReducer);
    const {data} = reposAPI.useGetInfoQuery({id: previewID});

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
                    {data?.node === undefined? 
                        <div className={styles.placeholder}>
                            Выберите репозиторий
                        </div>
                        :
                        <div className={styles.repoInfo}>
                            <h2>
                                {data.node.name}
                            </h2>
                            <div className={styles.repoMainInfo}>
                                <Tag primary = {true}>{data.node.primaryLanguage? data.node.primaryLanguage.name : "N/A"}</Tag>
                                <div><img src='/assets/star.svg'/>{data.node.stargazers.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
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