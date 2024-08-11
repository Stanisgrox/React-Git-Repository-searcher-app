import styles from './tag.module.sass';

type TagType = JSX.IntrinsicElements['div'];

interface TagProps extends TagType {
    primary: boolean | undefined
}

export const Tag = (props:TagProps) => {
    return (
        <div className={`${props.primary? styles.primary : styles.secondary} ${styles.general}`}>
            {props.children}
        </div>
    )
}   