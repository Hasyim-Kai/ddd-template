import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    inputDataChart: {
        labels: string[]
        dataSmall: number[]
        dataNormal: number[]
    }
}

export default function MultitypeChart({ inputDataChart }: Props) {
    const labels = inputDataChart.labels
    const data = {
        labels,
        datasets: [
            {
                label: 'Small',
                data: inputDataChart.dataSmall,
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            },
            {
                label: 'Normal',
                data: inputDataChart.dataNormal,
                backgroundColor: 'rgba(77, 116, 178)',
                stack: 'Stack 1',
            },
        ],
    };
    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
            }
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    return <Bar options={options} data={data} />;
}