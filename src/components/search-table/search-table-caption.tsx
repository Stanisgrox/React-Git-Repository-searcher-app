import { useAppdispatch, useAppSelector } from "../../store/hooks/redux";
import { repoSetSorting } from "../../store/reducers/repoActions";
import styles from './SearchTable.module.sass';

type TdType = JSX.IntrinsicElements['td'];
interface TdProps extends TdType {
    field: string
}

export const TableCaption = (props: TdProps) => {

    const {sorting} = useAppSelector(state =>  state.repoReducer);
    const dispatch = useAppdispatch();
    
    return (
        <td
            onClick={() => {
                switch (sorting) {
                    case `${props.field}-asc`: dispatch(repoSetSorting(`${props.field}-desc`)); break;
                    case `${props.field}-desc`:dispatch(repoSetSorting(`${props.field}-asc`)); break;
                    default:dispatch(repoSetSorting(`${props.field}-desc`)); break;
                }
            }}
        >
            <img 
                src='/assets/arrow.svg' 
                className={`${styles.arrowup} ${sorting === `${props.field}-desc`? styles.arrowdown : ''}`}
                style={{
                    display: `${sorting === `${props.field}-asc`  || sorting === `${props.field}-desc` ? `inline-block` : 'none'}`
                }}
                alt=''
            />
                {props.children}
        </td>
    )
}