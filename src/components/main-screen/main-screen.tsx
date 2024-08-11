import { useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import Paginator from '../paginator/paginator';
import SearchTable from '../search-table/search-table';
import { Tag } from '../UI/tag';
import { reposAPI } from '../../services/repos';

const MainScreen = () => {

    const {welcome, reposLoaded} = useAppSelector(state =>  state.repoReducer);
    const {data} = reposAPI.useGetInfoQuery({id: "MDEwOlJlcG9zaXRvcnk2NDU3OTcwNQ=="});
    console.log(data)

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
                                <div>{data.node.stargazers.totalCount}</div>
                            </div>
                            <div className={styles.repoMainInfo}>
                                {
                                    data.node.languages?
                                    data.node.languages.nodes.map((node) => (<Tag primary={false}>{node.name}</Tag>))
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