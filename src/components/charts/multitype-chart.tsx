import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController, } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController,);

interface Props {
    inputDataChart: {
        labels: string[]
        dataAs: number[]
        dataNoise: number[]
        dataG2: number[]
        dataLa: number[]
        dataG1: number[]
        dataAbn: number[]
        dataHt: number[]
        dataTarget: number[]
    }
}

export default function MultitypeChart({ inputDataChart }: Props) {
    const labels = inputDataChart.labels
    const dataAs = inputDataChart.dataAs
    const dataNoise = inputDataChart.dataNoise
    const dataG2 = inputDataChart.dataG2
    const dataLa = inputDataChart.dataLa
    const dataG1 = inputDataChart.dataG1
    const dataAbn = inputDataChart.dataAbn
    const dataHt = inputDataChart.dataHt
    const dataTarget = inputDataChart.dataTarget

    const data = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Target',
                borderColor: 'rgba(182, 223, 219, 1)',
                borderWith: 1,
                fill: false,
                data: dataTarget,
            },
            {
                type: 'bar' as const,
                label: 'AS',
                backgroundColor: 'rgba(243, 105, 96, 1)',
                data: dataAs,
            },
            {
                type: 'bar' as const,
                label: 'NOISE',
                backgroundColor: 'rgba(133, 141, 157, 1)',
                data: dataNoise,
            },
            {
                type: 'bar' as const,
                label: 'G2',
                backgroundColor: 'rgba(77, 116, 178, 1)',
                data: dataG2,
            },
            {
                type: 'bar' as const,
                label: 'LA',
                backgroundColor: 'rgba(73, 202, 221, 1)',
                data: dataLa,
            },
            {
                type: 'bar' as const,
                label: 'G1',
                backgroundColor: 'rgba(65, 196, 135, 1)',
                data: dataG1,
            },
            {
                type: 'bar' as const,
                label: 'ABN',
                backgroundColor: 'rgba(249, 166, 58, 1)',
                data: dataAbn,
            },
            {
                type: 'bar' as const,
                label: 'HT',
                backgroundColor: 'rgba(250, 241, 95, 1)',
                data: dataHt,
            },
        ],
    };
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
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    footer: (tooltipItems: {}[]) => {
                        let sum = 0;
                        tooltipItems.forEach((tooltipItem: any) => {
                            // no need to sum target value
                            if (tooltipItem.dataset.label !== 'Target') {
                                sum += tooltipItem.parsed.y;
                            }
                        });
                        return 'Total: ' + sum;
                    }
                },
            },
        },
    };
    return <Chart type='bar' options={options} data={data} />;
}