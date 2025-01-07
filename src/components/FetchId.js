import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getAuthToken } from './auth/getAuthToken';
import { useNavigate } from "react-router-dom";

function FetchId(props) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAuthToken();
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashborad`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data)
                console.log(response.status)
                console.log(response.data)
                if (response.data) {
                    // console.log('-------------------------', response.data)
                    localStorage.setItem('farmId', response.data.farmId)
                    localStorage.setItem('batchId', JSON.stringify(response.data.flockIds))
                    localStorage.setItem('batchName', JSON.stringify(response.data.flockNames))
                } else if (response.status === 404) {
                    navigate('/farm');
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate('/farm');
                }
            }
        }
        fetchData();

    }, [])
    return (
        { data }
    );
}

export default FetchId;