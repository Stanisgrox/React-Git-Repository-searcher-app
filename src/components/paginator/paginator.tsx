import styles from './Paginator.module.sass';

const Paginator = () => {
    return (
        <div className={styles.paginatorWrapper}>
            <label htmlFor="per-page">Rows per page:</label>
            <select name="per-page">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <div>
                1-4 of 4
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