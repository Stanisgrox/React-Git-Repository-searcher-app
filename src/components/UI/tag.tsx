import styles from './tag.module.sass';

type TagType = JSX.IntrinsicElements['div'];

interface TagProps extends TagType {
    primary: boolean | undefined
}

/*
    Единственный компонент UI который используется в двух разных местах, но имеет один и тот же вид.
    Используется для подробной информации о репозитории. Primary для главного языка, который отображается напротив
    количества звезд, а secondary внизу, где могут отображаться вторичные языки программирования.
    
    Тут есть один props, который переключает эти два состояния. Общие стили объеденены в general
*/

export const Tag = (props:TagProps) => {
    return (
        <div className={`${props.primary? styles.primary : styles.secondary} ${styles.general}`}>
            {props.children}
        </div>
    )
}   