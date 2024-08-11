import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { infoSetID } from '../../store/reducers/repoActions';
import { TableCaption } from './search-table-caption';
import styles from './SearchTable.module.sass';

/*
    Таблица поиска - главный герой.
    Здесь берутся те же переменные из Reducer, что и в пагинаторе. Они так же составляют тело запроса.

    Data - данные, полученные из API, подробнее о типе данных в /types/typings.ts RTKQueryAnswer.
    isFetching - состояние RTKQuery, которое возвращает True, если сейчас идет загрузка, чтобы показать плейсхолдер.

    search-table-caption.tsx
        При нажатии на ячейки заголовка в Redux меняется sorting. Всего возможно 10 значений: 5 параметров и 2 их варианта.
        Одновременная сортировка не предусмотрена техническим заданием.
    
        Так же при нажатии и сортировке появляется картинка. В зависимости от DESC/ASC она может применить на себя второй стиль
        "arrowdown", который отражает ее по оси Y.
*/

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
                            <TableCaption field='name'>Название</TableCaption>
                            <TableCaption field='language'>Язык</TableCaption>
                            <TableCaption field='forks'>Число форков</TableCaption>
                            <TableCaption field='stars'>Число звезд</TableCaption>
                            <TableCaption field='updated'>Дата обновления</TableCaption>
                        </tr>
                    </thead>
                    {isFetching? <>
                        Загрузка...
                    </>:
                        <tbody>
                            {data&& data.search.nodes.map((node) => 
                                <tr key = {node.id} onClick={() => {dispatch(infoSetID(node.id))}}>
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