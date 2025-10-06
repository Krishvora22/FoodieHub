import axios from 'axios'
import React, { useEffect } from 'react'
import { serverurl } from '../App'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const usegetCurrentUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverurl}/api/user/current`, { withCredentials: true });
                dispatch(setUserData(result.data));

            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();

    }, [])
}

export default usegetCurrentUser
