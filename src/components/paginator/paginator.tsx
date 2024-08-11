import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { repoSetNextPageMarker, repoSetPageAmount, repoSetPreviousPageMarker, repoSetScrolled } from '../../store/reducers/repoActions';
import styles from './Paginator.module.sass';

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