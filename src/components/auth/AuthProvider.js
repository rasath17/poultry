import React from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../../config/firebase';
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Loading from "../Loading";
import axios from "axios";
import { getAuthToken } from "./getAuthToken";
import FetchId from "../FetchId";
import { useNavigate } from "react-router-dom";
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState(null);
    // FetchId();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

     

        // const checkSubscription = async () => {
        //     try {
        //         const token = await getAuthToken();
        //         const farmId =  localStorage.getItem('farmId'); // Assume this fetches the token
        //         if(farmId){
        //         const response = await axios.get(
        //             `${process.env.REACT_APP_API_URL}/api/dashborad/valid/${farmId}`, // Dynamically inserting farmId
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`, // Authorization token
        //                 },
        //             }
        //         );
        //         if (response.status  ) {
        //             setSubscription(true);
        //
        //         }}
        //         else {
        //             setSubscription(false);
        //             signOut(auth).then().catch();
        //              navigate('/subscription');
        //         }
        //     } catch (error) {
        //         // console.log(error.message)
        //         setSubscription(false);
        //         signOut(auth).then().catch();
        //         navigate('/subscription');
        //     }
        // };
        //
        // // Call checkSubscription outside of cleanup function
        // if (user) {
        //     checkSubscription();
        // }
        // Cleanup: unsubscribe from Firebase auth listener
        return () => {
            unsubscribe();
        };
    }, [user]);

    if (loading ) return <Loading />;

    return (user ? (
        <>
            <Sidebar />
            <Outlet />
        </>
    )  : (
        <Navigate to={'/'} />
    ));
};


export default AuthProvider;
