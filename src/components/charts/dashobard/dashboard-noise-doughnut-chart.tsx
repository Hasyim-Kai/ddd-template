import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    inputChartData: PieInputChartDataType
    className?: string
}

export interface PieInputChartDataType {
    labels: string[]
    pieData: number[]
}

export function DashboardNoiseDoughnutChart({ inputChartData, className = '' }: Props) {
    const data = {
        labels: inputChartData.labels,
        datasets: [
            {
                label: 'Manual Noise',
                data: inputChartData.pieData,
                backgroundColor: [
                    "rgba(243, 105, 96, 1)",
                    "rgba(249, 166, 58, 1)",
                    "rgba(77, 116, 178, 1)",
                    "rgba(67, 173, 162, 1)",
                    "rgba(133, 141, 157, 1)",
                    "rgba(73, 202, 221, 1)",
                    "rgba(16, 165, 96, 1)",
                ],
                borderWidth: 0,
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
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
            },
        },
    };

    return <div className={`w-[35rem] h-[35rem] mx-auto pt-10 pb-24 ${className}`}>
        <Doughnut data={data} options={options} />
    </div>
}