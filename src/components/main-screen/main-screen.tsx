import { useEffect } from 'react';
import { useAppdispatch, useAppSelector } from '../../store/hooks/redux';
import styles from './Main-Screen.module.sass';
import { fetchRepos } from '../../store/reducers/repoActions';

const MainScreen = () => {
    const dispatch = useAppdispatch();
    const {repos, isLoading, error} = useAppSelector(state =>  state.repoReducer);

    useEffect(() => {
        console.log("EDD")
        dispatch(fetchRepos());
    }, [])

    return (
        <div className={styles.helloScreen}>
            <h1>{!error?`Добро пожаловать` : `При отправке запроса произошла ошибка: ${error}`}</h1>
        </div>
    )
}

export default MainScreen;