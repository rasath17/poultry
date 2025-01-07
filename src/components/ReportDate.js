import React from "react";
import { Form } from "react-bootstrap";

function ReportDate({ onDataFetched }) {
    const today = new Date();

    const formatDate = (date) => date.toISOString().split("T")[0];

    const calculateDateRange = (range) => {
        const endDate = new Date(today);
        const startDate = new Date(today);

        switch (range) {
            case "last7Days":
                startDate.setDate(today.getDate() - 7);
                break;
            case "currentMonth":
                startDate.setDate(1);
                break;
            case "previousMonth":
                startDate.setMonth(today.getMonth() - 1);
                startDate.setDate(1);
                endDate.setMonth(today.getMonth() - 1);
                endDate.setDate(new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate());
                break;
            case "last3Months":
                startDate.setMonth(today.getMonth() - 3);
                break;
            case "last6Months":
                startDate.setMonth(today.getMonth() - 6);
                break;
            case "last12Months":
                startDate.setMonth(today.getMonth() - 12);
                break;
            case "currentYear":
                startDate.setMonth(0);
                startDate.setDate(1);
                break;
            default:
                return { startDate: "", endDate: "" };

        }

        return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
    };

    const handleSelectChange = (event) => {
        const range = event.target.value;
        const { startDate, endDate } = calculateDateRange(range);
        if (onDataFetched) {
            onDataFetched({ startDate, endDate });
        }
    };

    return (
        <Form.Select onChange={handleSelectChange} aria-label="Select a date range">

            <option value="last7Days">Last 7 Days</option>
            <option value="currentMonth">Current Month</option>
            <option value="previousMonth">Previous Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="last12Months">Last 12 Months</option>
            <option value="currentYear">Current Year</option>
        </Form.Select>
    );
}

export default ReportDate;
