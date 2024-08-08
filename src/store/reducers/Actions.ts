import axios from "axios";
import { AppDispatch } from "../store";

export const fetchRepos = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`https://api.github.com/graphql`)
    } catch (err) {

    }
}