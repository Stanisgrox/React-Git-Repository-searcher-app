import { reposAPI } from '../../services/repos';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import { repoSetPageAmount } from '../../store/reducers/repoActions';
import styles from './Paginator.module.sass';

const Paginator = () => {

    const {searchTerm, pageAmount} = useAppSelector(state =>  state.repoReducer);
    const dispatch = useAppdispatch();
    const {data} = reposAPI.useGetReposQuery({query: `${searchTerm}`, first: pageAmount, after: undefined, before: undefined});

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
                <button>
                    {"<"}
                </button>
                <button>
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default Paginator;