import { useEffect } from 'react';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import { fetchRepos } from '../../store/reducers/repoActions';

const MainScreen = () => {
    const dispatch = useAppdispatch();
    const {repos, isLoading, error, welcome} = useAppSelector(state =>  state.repoReducer);

    useEffect(() => {
        dispatch(fetchRepos());
    }, [])

    return (
        <div className={styles.helloScreen}>
            {welcome && <h1>{`Добро пожаловать`}</h1>}
            {error && <h1>{`При отправке запроса произошла ошибка: ${error}`}</h1>}
        </div>
    )
}

export default MainScreen;