import React from "react";
import {auth} from '../../config/firebase';

export const getAuthToken = async () => {
    if (auth.currentUser) {
        await localStorage.setItem('email', auth.currentUser.email);

        return await auth.currentUser.getIdToken();
    } else {
        console.log('User not logged in');
        return null;
    }
};