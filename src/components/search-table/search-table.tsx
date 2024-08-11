import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { infoSetID, repoSetSorting } from '../../store/reducers/repoActions';
import styles from './SearchTable.module.sass';

/*
    Таблица поиска - главный герой.
    Здесь берутся те же переменные из Reducer, что и в пагинаторе. Они так же составляют тело запроса.

    Data - данные, полученные из API, подробнее о типе данных в /types/typings.ts RTKQueryAnswer.
    isFetching - состояние RTKQuery, которое возвращает True, если сейчас идет загрузка, чтобы показать плейсхолдер.

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
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'name-asc': dispatch(repoSetSorting('name-desc')); break;
                                        case 'name-desc':dispatch(repoSetSorting('name-asc')); break;
                                        default:dispatch(repoSetSorting('name-desc')); break;
                                    }
                                }}
                            >
                                <img 
                                    src='/assets/arrow.svg' 
                                    className={`${styles.arrowup} ${sorting === 'name-desc'? styles.arrowdown : ''}`}
                                    style={{
                                        display: `${sorting === 'name-asc'  || sorting ==='name-desc' ? 'inline-block' : 'none'}`
                                    }}
                                    alt=''
                                />
                                Название
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'language-asc': dispatch(repoSetSorting('language-desc')); break;
                                        case 'language-desc':dispatch(repoSetSorting('language-asc')); break;
                                        default:dispatch(repoSetSorting('language-asc')); break;
                                    }
                                }}
                            >
                                <img 
                                    src='/assets/arrow.svg' 
                                    className={`${styles.arrowup} ${sorting === 'language-desc'? styles.arrowdown : ''}`}
                                    style={{
                                        display: `${sorting === 'language-asc'  || sorting ==='language-desc' ? 'inline-block' : 'none'}`
                                    }}
                                    alt=''
                                />
                                Язык
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'forks-asc': dispatch(repoSetSorting('forks-desc')); break;
                                        case 'forks-desc':dispatch(repoSetSorting('forks-asc')); break;
                                        default:dispatch(repoSetSorting('forks-desc')); break;
                                    }
                                }}
                            >
                                <img 
                                    src='/assets/arrow.svg' 
                                    className={`${styles.arrowup} ${sorting === 'forks-desc'? styles.arrowdown : ''}`}
                                    style={{
                                        display: `${sorting === 'forks-asc'  || sorting ==='forks-desc' ? 'inline-block' : 'none'}`
                                    }}
                                    alt=''
                                />
                                Число форков
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'stars-asc': dispatch(repoSetSorting('stars-desc')); break;
                                        case 'stars-desc':dispatch(repoSetSorting('stars-asc')); break;
                                        default:dispatch(repoSetSorting('stars-desc')); break;
                                    }
                                }}
                            >
                                <img 
                                    src='/assets/arrow.svg' 
                                    className={`${styles.arrowup} ${sorting === 'stars-desc'? styles.arrowdown : ''}`}
                                    style={{
                                        display: `${sorting === 'stars-asc'  || sorting ==='stars-desc' ? 'inline-block' : 'none'}`
                                    }}
                                    alt=''
                                />
                                Число звезд
                            </td>
                            <td
                                onClick={() => {
                                    switch (sorting) {
                                        case 'updated-asc': dispatch(repoSetSorting('updated-desc')); break;
                                        case 'updated-desc':dispatch(repoSetSorting('updated-asc')); break;
                                        default:dispatch(repoSetSorting('updated-desc')); break;
                                    }
                                }}
                            >
                                <img 
                                    src='/assets/arrow.svg' 
                                    className={`${styles.arrowup} ${sorting === 'updated-desc'? styles.arrowdown : ''}`}
                                    style={{
                                        display: `${sorting === 'updated-asc'  || sorting ==='updated-desc' ? 'inline-block' : 'none'}`
                                    }}
                                    alt=''
                                />
                                Дата обновления
                            </td>
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