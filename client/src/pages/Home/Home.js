import React from 'react'
import useAuth from '../../hooks/useAuth'
import '.Home/scss';

function Home() {
    const auth = useAuth();
    console.log(auth);
    return (
        <div>
            <h1>HomePage</h1>
        </div>
    )
}

export default Home
