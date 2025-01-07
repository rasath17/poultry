import React, {useEffect, useState} from "react";
import {Container, Spinner, Alert, Table} from "react-bootstrap";

const DailyEggRate = () => {
    const [latestData, setLatestData] = useState(null); // Store the latest date and egg rates
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch data from Google Sheets
    const fetchData = async () => {
        const sheetId = "1rCJUjPqoC8wJSAnIeYigfILDLNF56KcARcx7FPKV7-k"; // Your Google Sheets ID
        const range = "0"; // Your GID, default to 0
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&id=${sheetId}&gid=${range}`;

        try {
            const response = await fetch(csvUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const csvData = await response.text();
            const rows = csvData.split("\n").filter(row => row.trim() !== ""); // Filter out empty rows
            const dataByDate = {};

            // Parse rows and group by date
            rows.slice(1).forEach(row => {
                const [eggRate, date] = row.split(",").map(item => item.trim());
                if (date) {
                    if (!dataByDate[date]) {
                        dataByDate[date] = [];
                    }
                    dataByDate[date].push(eggRate);
                }
            });

            // Get the latest date
            const latestDate = Object.keys(dataByDate).sort().pop(); // Get the most recent date
            setLatestData({date: latestDate, eggRates: dataByDate[latestDate] || []});
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please check the Sheet or try again later.");
            setLoading(false);
        }
    };

    // Use effect to fetch data on mount and set up polling every minute
    useEffect(() => {
        // Initial fetch when component mounts
        fetchData();

        // Polling interval every 60 seconds (60000 ms)
        const intervalId = setInterval(fetchData, 60000); // Poll every minute

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={'mt-5 pt-5'}>
            <h1 className="text-center mt-4"> Egg Rate</h1>

            <Container className="py-5">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary"/>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                ) : latestData ? (
                    <Table striped bordered hover responsive className="text-center">
                        <thead className="bg-primary text-white">
                        <tr>
                            <th>Date</th>
                            <th>Egg Rates (₹)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{latestData.date || "N/A"}</td>
                            <td>
                                {latestData.eggRates.length > 0
                                    ? latestData.eggRates.join(", ")
                                    : "No data available"}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                ) : (
                    <Alert variant="warning" className="text-center">
                        No data available.
                    </Alert>
                )}
            </Container>
        </div>
    );
};

export default DailyEggRate;
