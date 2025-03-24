import { useState, useEffect } from "react";
import { fetchReport } from "../utils/api";
import ReportChart from "../components/ReportChart.jsx";

function Popup() {
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchReport().then(setReport).catch(console.error);
    }, []);

    return (
        <div>
            <h2>Weekly Productivity Report</h2>
            <ReportChart report={report} />
        </div>
    );
}

export default Popup;
