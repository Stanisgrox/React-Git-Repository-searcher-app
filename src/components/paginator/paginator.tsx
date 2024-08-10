import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { repoSetNextPageMarker, repoSetPageAmount, repoSetPreviousPageMarker } from '../../store/reducers/repoActions';
import styles from './Paginator.module.sass';

const Paginator = () => {
    
    const {searchTerm, after, before, first, last} = useAppSelector(state =>  state.repoReducer);
    const dispatch = useAppdispatch();
    const {data} = reposAPI.useGetReposQuery({query: `${searchTerm} sort:stars-desc`, first: first, last: last,after: after, before: before});
    

    return (
        <div className={styles.paginatorWrapper}>
            <label htmlFor="per-page">Rows per page:</label>
            <select 
                name="per-page"
                onChange={(e) => {
                    dispatch(repoSetPageAmount(Number(e.target.value)))
                }}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <div>
                1-4 of {data?.search.repositoryCount}
            </div>
            <div>
                <button
                    disabled = {!data?.search.pageInfo.hasPreviousPage}
                    onClick={() => {
                        console.log(data?.search.pageInfo.startCursor)
                        dispatch(repoSetPreviousPageMarker(data?.search.pageInfo.startCursor))
                    }}
                >
                    {"<"}
                </button>
                <button
                    disabled = {!data?.search.pageInfo.hasNextPage}
                    onClick={() => {
                        console.log(data?.search.pageInfo.endCursor)
                        dispatch(repoSetNextPageMarker(data?.search.pageInfo.endCursor))
                    }}
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default Paginator;