import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportChart = ({ report }) => {
    const data = {
        labels: report.map(r => r._id),
        datasets: [{
            label: "Time Spent (Hours)",
            data: report.map(r => parseFloat((r.totalTime / 3600).toFixed(2))),
            backgroundColor: ["#4CAF50", "#F44336"],
        }]
    };

    return <Bar data={data} />;
};

export default ReportChart;
