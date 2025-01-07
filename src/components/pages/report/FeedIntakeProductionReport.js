import React, { useState, useEffect } from "react";
import { Form, Breadcrumb } from "react-bootstrap";
import { AgCharts } from "ag-charts-react";
import axios from "axios";
import { getAuthToken } from "../../auth/getAuthToken";
import { Link } from "react-router-dom";
import ReportDate from "../../ReportDate";

function FeedConsumptionReport() {
    const calculateDefaultDates = () => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        return {
            startDate: sevenDaysAgo.toISOString().split("T")[0],
            endDate: today.toISOString().split("T")[0],
        };
    };

    const defaultDates = calculateDefaultDates();

    const [selectedBatch, setSelectedBatch] = useState("");
    const [batchOptions, setBatchOptions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [reportData, setReportData] = useState({
        startDate: defaultDates.startDate,
        endDate: defaultDates.endDate,
        data: null,
    });

    const handleDataFetched = ({ startDate, endDate }) => {
        setReportData({ startDate, endDate });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!reportData.startDate || !reportData.endDate) return;
            try {
                const token = await getAuthToken();
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/feed-consumptions/report/${localStorage.getItem('farmId')}?StartDate=${reportData.startDate}&EndDate=${reportData.endDate}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = response.data;
                console.log(data);

                // Extract batch numbers dynamically
                const batches = data.map((batch) =>
                    Object.keys(batch)[0].replace("batches ", "")
                );
                setBatchOptions(batches);

                // Automatically set the first batch as selected
                if (batches.length > 0 && !selectedBatch) {
                    setSelectedBatch(batches[0]);
                }

                // Process data for the selected batch
                const batchData = data.find(
                    (batch) => Object.keys(batch)[0] === `batches ${selectedBatch}`
                );

                if (batchData) {
                    const formattedData = batchData[`batches ${selectedBatch}`].map((entry) => ({
                        date: entry.Date,
                        feedIntake: entry.FeedIntake,
                    }));
                    setChartData(formattedData);
                } else {
                    setChartData([]); // Reset if no data for the selected batch
                }
            } catch (error) {
                console.error("Error fetching feed consumption data:", error.message);
            }
        };

        fetchData();
    }, [selectedBatch, reportData]);

    const updateBatch = (e) => {
        setSelectedBatch(e.target.value);
    };

    const chartOptions = {
        data: chartData,
        title: {
            text: `Feed Consumption Report - Batch ${selectedBatch}`,
            fontSize: 16,
        },
        series: [
            {
                type: "line",
                xKey: "date",
                yKey: "feedIntake",
                stroke: "#007bff",
                marker: {
                    fill: "#007bff",
                    stroke: "#ffffff",
                },
            },
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                title: { text: "Date" },
            },
            {
                type: "number",
                position: "left",
                title: { text: "Feed Intake (kg)" },
            },
        ],
    };

    return (
        <div className="container mt-5 pt-5">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/dashboard">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/report">Report</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Feed Consumption Report</Breadcrumb.Item>
            </Breadcrumb>
            <div className="row">
                <div className="mb-4 col-5 col-md-3 col-lg-2">
                    <Form.Select
                        aria-label="Select Batch"
                        value={selectedBatch}
                        onChange={updateBatch}
                    >
                        {batchOptions.map((batch, idx) => (
                            <option key={idx} value={batch}>
                                {`Batch ${batch}`}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col-7 col-md-3 col-lg-2">
                    <ReportDate onDataFetched={handleDataFetched} />
                </div>
                <div>
                    {reportData.startDate && reportData.endDate && (
                        <div className={'row'} style={{ marginTop: "20px" }}>
                            <div>
                                <span className={"px-3"}><strong>Start Date:</strong> {reportData.startDate}</span>
                                <span className={"px-3"}><strong>End Date:</strong> {reportData.endDate}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ width: "100%", height: "400px" }}>
                {chartData.length > 0 ? (
                    <AgCharts options={chartOptions} />
                ) : (
                    <div className="text-center mt-5">
                        <h5>No data available for the selected batch and date range.</h5>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeedConsumptionReport;
