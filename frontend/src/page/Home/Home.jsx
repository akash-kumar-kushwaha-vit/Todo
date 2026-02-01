import React, { useEffect } from 'react'
import { getUsers } from '../../api/user';
import { useDispatch } from 'react-redux';
import { addAvtar } from '../../feture/todo/todoSliece';

export default function Home() {

    const dispatch = useDispatch();
    const fetchuserdata = async () => {
        const response = await getUsers();
        console.log(response.data);
        dispatch(addAvtar(response.data.data[0].avtar))
    };
    useEffect(() => {
        fetchuserdata();
    })


    return (
        <div>

            Home page
        </div>
    )
}
