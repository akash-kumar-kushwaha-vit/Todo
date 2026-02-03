import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addAvtar } from '../../feture/todo/todoSliece';
import { fetchUser } from '../../feture/globalapi/getuser';

export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetchUser().then((res) => {
            dispatch(addAvtar(res.data.data[0].avtar))
        }).catch((error) => {
            console.log("error", error);

        })
    })


    return (
        <div>

            Home page
        </div>
    )
}
