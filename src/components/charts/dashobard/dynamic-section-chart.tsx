import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, } from 'chart.js';
ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);
import { Chart } from 'react-chartjs-2';

interface Props {
    inputChartData: {
        targetData: {
            label: string
            data: number[]
        }
        barData: {
            label: string
            data: number[]
        }[]
    }
    className?: string
}

export default function DynamicDashboardSectionChart({ inputChartData, className }: Props) {
    const labels = ['2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan', '11 Jan', '12 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan'];
    const lineColors = 'rgba(250, 241, 95, 1)';
    const barColors = ['rgba(243, 105, 96, 1)', 'rgba(77, 116, 178, 1)', 'rgba(249, 166, 58, 1)', 'rgba(67, 173, 162, 1)', 'rgba(133, 141, 157, 1)', 'rgba(170, 48, 40, 1)', 'rgba(73, 202, 221, 1)'];

    const data: any = {
        labels,
        datasets: [],
    };

    data.datasets.push({
        type: 'line' as const,
        label: inputChartData.targetData.label,
        borderColor: lineColors,
        data: inputChartData.targetData.data,
    })
    inputChartData.barData.forEach((item, index) => {
        data.datasets.push({
            type: 'bar' as const,
            label: item.label,
            backgroundColor: barColors[index],
            barPercentage: 0.7,
            data: item.data,
        })
    })

    const options: any = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
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

    return <section className={`${className}`}>
        <Chart type='bar' options={options} data={data} />
    </section>
}