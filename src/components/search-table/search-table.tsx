import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { repoSetSorting } from '../../store/reducers/repoActions';
import styles from './SearchTable.module.sass';

const SearchTable = () => {

    const {searchTerm, after, before, last, first, sorting} = useAppSelector(state =>  state.repoReducer);
    const {data, isFetching} = reposAPI.useGetReposQuery({query: `${searchTerm} sort:${sorting}`, first: first, last: last, after: after, before: before});
    const dispatch = useAppdispatch();
    
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.caption}>
                Результаты поиска
            </h2>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                Название
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'language-asc': dispatch(repoSetSorting('language-desc')); break;
                                        case 'language-desc':dispatch(repoSetSorting('language-asc')); break;
                                        default:dispatch(repoSetSorting('language-asc')); break;
                                    }
                                    console.log(sorting)
                                }}
                            >
                                Язык
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'forks-asc': dispatch(repoSetSorting('forks-desc')); break;
                                        case 'forks-desc':dispatch(repoSetSorting('forks-asc')); break;
                                        default:dispatch(repoSetSorting('forks-desc')); break;
                                    }
                                    console.log(sorting)
                                }}
                            >
                                Число форков
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'stars-asc': dispatch(repoSetSorting('stars-desc')); break;
                                        case 'stars-desc':dispatch(repoSetSorting('stars-asc')); break;
                                        default:dispatch(repoSetSorting('stars-desc')); break;
                                    }
                                    console.log(sorting)
                                }}
                            >
                                Число звезд
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'updated-asc': dispatch(repoSetSorting('updated-desc')); break;
                                        case 'updated-desc':dispatch(repoSetSorting('updated-asc')); break;
                                        default:dispatch(repoSetSorting('updated-desc')); break;
                                    }
                                    console.log(sorting)
                                }}
                            >
                                Дата обновления
                            </td>
                        </tr>
                    </thead>
                    {isFetching? <>
                        Загрузка...
                    </>:
                        <tbody>
                            {data&& data.search.nodes.map((node) => 
                                <tr key = {node.id}>
                                    <td>
                                        {node.name}
                                    </td>
                                    <td>
                                        {node.primaryLanguage? node.primaryLanguage.name : "N/A"}
                                    </td>
                                    <td>
                                        {node.forks.totalCount}
                                    </td>
                                    <td>
                                        {node.stargazers.totalCount}
                                    </td>
                                    <td>
                                        {node.defaultBranchRef? node.defaultBranchRef.target.committedDate.split('T')[0].split('-').reverse().join('.') : "N/A"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default SearchTable;