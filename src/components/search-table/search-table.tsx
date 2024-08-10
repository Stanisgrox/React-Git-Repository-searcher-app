import { reposAPI } from '../../services/repos';
import styles from './SearchTable.module.sass';

const SearchTable = () => {
    const {data} = reposAPI.useGetReposQuery({query: "Rust", first: 10, after: undefined, before: undefined});
    return (
        <div className={''}>
            <h2 className={styles.caption}>
                Результаты поиска
            </h2>
            <table>
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
            </table>
            {JSON.stringify(data?.data.search.nodes)}
        </div>
    )
}

export default SearchTable;