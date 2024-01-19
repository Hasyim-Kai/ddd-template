import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    inputDataChart: {
        labels: string[]
        data: number[]
    }
}

export default function PieChart({ inputDataChart }: Props) {
    const data = {
        labels: inputDataChart.labels,
        datasets: [
            {
                label: 'Percentage (%)',
                data: inputDataChart.data,
                hoverOffset: 4,
                borderWidth: 0,
                backgroundColor: [
                    'rgba(73, 202, 221, 1)',
                    'rgba(250, 241, 95, 1)',
                    'rgba(65, 196, 135, 1)',
                    'rgba(77, 116, 178, 1)',
                    'rgba(133, 141, 157, 1)',
                    'rgba(249, 166, 58, 1)',
                    'rgba(243, 105, 96, 1)',
                ],
                datalabels: {
                    display: function () {
                        return false;
                    },
                },
            },
        ],
    };
    const options: any = {
        responsive: true,
        layout: {
            autoPadding: true
        },
        plugins: {
            legend: {
                display: true,
                position: "right",
                labels: {
                    usePointStyle: true,
                },
            }
        },
    };
    return <Pie options={options} data={data} />;
}