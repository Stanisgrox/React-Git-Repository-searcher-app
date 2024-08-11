import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { repoSetNextPageMarker, repoSetPageAmount, repoSetPreviousPageMarker, repoSetScrolled } from '../../store/reducers/repoActions';
import styles from './Paginator.module.sass';

/*
    Пагинатор к таблице.
    Здесь находятся переменные из Redux (строка 14):
        searchTerm - Пользовательский ввод в поисковую строку.
        after - маркер из API Github для пагинации, чтобы перейти на следующую страницу
        before - как after, только на предыдущую
        first - N (выбирается в select) первых элементов, используется, чтобы выбирать первоначальный запрос и _следующие_ страницы.
        last - N элементов, чтобы отправить запрос на предыдущую страницу.
        sorting - вид сортировки. Я выполняю сортировку посредством отправления запроса на API.
        scrolled - маркер, сколько страниц было пролистано, чтобы посчитать в пагинаторе
    Помимо Redux тут так же выполняется один из двух запросов RTKQuery (запросы одинаковые, поэтому фактически он один).
    Его строка полностью соответствует аналогичному в search-table.tsx.
    data - данные, полученные из API, подробнее о типе данных в /types/typings.ts RTKQueryAnswer
    isFetching здесь нужен для блокировки кнопок во время прогрузки. Если не будет проверки, кнопки можно будет нажимать во время
    запроса. Это не сломает таблицу, но сломает счетчик пагинатора.

    При изменении инпута отправляется запрос в хранилище на изменение размера запроса. Подробнее в /store/reducers/repoSlice.ts
    Кнопка влево и вправо меняют соответствующие указатели и меняет местами first и last. Один становится равен количеству
    предметов в запросе, а второй undefined. Так осуществляется пагинация силами GraphQL
*/

const Paginator = () => {
    
    const {searchTerm, after, before, first, last, sorting, scrolled} = useAppSelector(state =>  state.repoReducer);
    const dispatch = useAppdispatch();
    const {data, isFetching} = reposAPI.useGetReposQuery({query: `${searchTerm} sort:${sorting}`, first: first, last: last,after: after, before: before});

    return (
        <div className={styles.paginatorWrapper}>
            <label htmlFor="per-page">Rows per page:</label>
            <select 
                name="per-page"
                onChange={(e) => {
                    dispatch(repoSetPageAmount(Number(e.target.value)));
                }}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <div className={styles.paginatorCounter}>
                {scrolled + 1}-{scrolled + (data?.search.nodes.length? data?.search.nodes.length : 0)} of {data?.search.repositoryCount}
            </div>
            <div>
                <button
                    disabled = {!data?.search.pageInfo.hasPreviousPage || isFetching}
                    onClick={() => {
                        dispatch(repoSetScrolled(scrolled - (first? first : last? last : 0)));
                        dispatch(repoSetPreviousPageMarker(data?.search.pageInfo.startCursor));
                    }}
                >
                </button>
                <button
                    disabled = {!data?.search.pageInfo.hasNextPage || isFetching}
                    onClick={() => {
                        dispatch(repoSetScrolled(scrolled + (first? first : last? last : 0)));
                        dispatch(repoSetNextPageMarker(data?.search.pageInfo.endCursor));
                    }}
                >
                </button>
            </div>
        </div>
    )
}

export default Paginator;