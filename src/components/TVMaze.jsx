// TVMaze.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'https://api.tvmaze.com/search/shows?q=walking';

export default function TVMaze() {
    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

     const fetchUsersData = () => {
        axios.get(`${baseURL}`, {})
        .then(response => {
            const data = response.data;
            console.log(data);
            const shows = data.map(show =>
                    <div 
                        style={{
                            background: 'purple',
                            border: '1px solid teal',
                            paddingLeft: '50px',
                            color: '#FFFFFF',
                            textAlign: 'left', 
                        }} >
                        <h3>RESTful-Axios API request from: {baseURL}</h3>                     
                        <p>Response: {show.show.url}</p>
                        <p>ID: {show.show.id}</p>
                        <p>Name: {show.show.name}</p>
                        <p>Status: {show.show.status}</p>
                        <p>Official Site: {show.show.officialSite}</p>
                        <p>Language: {show.show.language}</p>
                        <p>Score: {show.score}</p>
                    </div>
                )
                setState({shows})
                setIsLoading(!isLoading)
            })
            .catch(setError(()=> console.log(error)));    
        } 

    useEffect(() => {
        fetchUsersData();
    });

    return (
        <div>{state.shows}</div>
    );
}

// eof