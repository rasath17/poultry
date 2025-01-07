import React, {useEffect, useState} from "react";
import './App.css';
import Login from "./components/auth/Login";
import {BrowserRouter, Router, Route, Routes, Outlet, Navigate} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Report from "./components/pages/Report";
import AuthProvider from "./components/auth/AuthProvider";
import ForgotPassword from "./components/auth/ForgotPassword";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from './config/firebase';
import Farm from "./components/pages/Farm";
import FlockForm from "./components/pages/register/FlockForm";
import EmployeeForm from "./components/pages/register/EmployeeForm";
import DailyCollectionMenu from "./components/pages/DailyCollectionMenu/DailyCollectionMenu";
import DailyEggRate from "./components/pages/DailyEggRate";
import NotFound from "./components/NotFound";
import EggProductionReport from "./components/pages/report/EggProductionReport";
import MortalityProductionReport from "./components/pages/report/MortalityProductionReport";
import DamageEggProductionReport from "./components/pages/report/DamageEggProductionReport";
import FeedIntakeProductionReport from "./components/pages/report/FeedIntakeProductionReport";
import Loading from "./components/Loading";
import Register from "./components/pages/Register";
import BuyerForm from "./components/pages/register/BuyerForm";
import SignUp from "./components/auth/SignUp";
import UpdateDailyCollection from "./components/pages/Update/UpdateDailyCollection";
import UpdateMortalityPage from "./components/pages/Update/UpdateMortalityPage";
import UserAgreement from "./components/UserAgreement";
//Test
import Test from "./components/Test";
import ReportDate from "./components/ReportDate";
import GoogleSignIn from "./components/auth/GoogleSignIn";
import Subscription from "./components/Subscription";


function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState(false);
    const farmId = localStorage.getItem('farmId') ? true : false;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();


    }, []);
    if (loading) return <Loading/>;

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/policy" element={<UserAgreement/>}/>


                    <Route path="/subscription" element={<Subscription/>}/>
                    <Route path="/" element={user ? <Navigate to="/dashboard"/> : <GoogleSignIn/>}/>

                    <Route path="/login" element={user ? <Navigate to="/dashboard"/> : < Login/>}/>
                    <Route path="/signup" element={user ? <Navigate to="/dashboard"/> : <SignUp/>}/>
                    <Route path="/date" element={<ReportDate/>}/>
                    <Route path="/resetpassword" element={<ForgotPassword/>}/>

                    <Route element={<AuthProvider/>}>

                        <Route path="/farm" element={farmId ? <Navigate to="/dashboard"/> : <Farm/>}/>
                        {/*<Route path="/farm" element={ <Farm/>}/>*/}

                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/report" element={<Report/>}/>
                        <Route path="/dailycollectionmenu" element={<DailyCollectionMenu showDate={false}/>}/>
                        <Route path="/dailycollection-missing" element={<DailyCollectionMenu showDate={true}/>}/>
                        <Route path="/register" element={<Register/>}/>

                        <Route path="/report">
                            <Route path="eggproduction" element={<EggProductionReport/>}/>
                            <Route path="mortality" element={<MortalityProductionReport/>}/>
                            <Route path="damagedegg" element={<DamageEggProductionReport/>}/>
                            <Route path="feedintake" element={<FeedIntakeProductionReport/>}/>
                        </Route>

                        <Route path="/register">
                            <Route path="flock" element={<FlockForm/>}/>
                            <Route path="employee" element={<EmployeeForm/>}/>
                            <Route path="buyer" element={<BuyerForm/>}/>
                        </Route>

                        <Route path="/update">
                            <Route path="dailycollection" element={<UpdateDailyCollection/>}/>
                            <Route path="mortality" element={<UpdateMortalityPage/>}/>
                        </Route>

                        <Route path="/dailyeggrate" element={<DailyEggRate/>}/>

                    </Route>

                    <Route path="*" element={<NotFound/>}/>

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;