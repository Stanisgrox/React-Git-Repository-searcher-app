import { reposAPI } from '../../services/repos';
import { useAppSelector } from '../../store/hooks/redux';
import styles from './SearchTable.module.sass';

const SearchTable = () => {

    const {searchTerm, pageAmount} = useAppSelector(state =>  state.repoReducer);
    const {data, isFetching} = reposAPI.useGetReposQuery({query: `${searchTerm}`, first: pageAmount, after: undefined, before: undefined});
    
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
                            <td>
                                Язык
                            </td>
                            <td>
                                Число форков
                            </td>
                            <td>
                                Число звезд
                            </td>
                            <td>
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
                                        {node.defaultBranchRef.target.committedDate.split('T')[0].split('-').reverse().join('.')}
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