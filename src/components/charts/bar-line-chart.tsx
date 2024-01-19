import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ChartDataLabels);

export interface BarLineChartProps {
    inputChartData: BarLineInputChartDataType
    isStacked?: boolean
    isWithTotalTooltip?: boolean
    yAxisTitle?: string
}

export interface BarLineInputChartDataType {
    chartXLabels: string[] | number[]
    lineData?: {
        label: string
        data: number[]
        color: string
    }[]
    barData: {
        label: string
        data: number[]
        color: string
        groupName?: string
        costRatio?: number[]
    }[]
    totalCost?: number[]
    totalCostRatio?: number[]
}

export default function BarLineChart({ inputChartData, isStacked = false, isWithTotalTooltip,yAxisTitle }: BarLineChartProps) {
    const data: any = {
        labels: inputChartData.chartXLabels,
        datasets: [],
    };
    if (inputChartData.lineData != undefined) {
        inputChartData.lineData.forEach((item: { label: string, data: number[], color: string }) => {
            data.datasets.push({
                type: 'line' as const,
                label: item.label,
                data: item.data,
                borderColor: item.color,
                backgroundColor: item.color,
                pointStyle: 'circle',
                pointRadius: 1,
                pointHoverRadius: 5,
                datalabels: {
                    display: function () {
                        return false;
                    },
                },
            })
        })
    }
    inputChartData.barData.forEach((item: { label: string, data: number[], color: string, groupName?: string, costRatio?: number[] }, barIndex: number) => {
        data.datasets.push({
            type: 'bar' as const,
            label: item.label,
            data: item.data,
            backgroundColor: item.color,
            stack: isStacked
                ? item.groupName === undefined ? `default` : item.groupName
                : `Stack ${barIndex}`,
            datalabels: {
                labels: {
                    totalCostRatio: {
                        align: 'end',
                        anchor: 'end',
                        display: function () {
                            return barIndex === inputChartData.barData.length - 1;
                        },
                        formatter: function (_value: any, ctx: any) {
                            // if inputChartData.totalCostRatio exist & inputChartData.totalCostRatio[ctx.dataIndex] is more than 0
                            return (inputChartData.totalCostRatio && inputChartData.totalCostRatio[ctx.dataIndex] > 0) ? inputChartData.totalCostRatio[ctx.dataIndex].toFixed(2) : null;
                        },
                        font: {
                            weight: 'bold',
                        },
                        offset: 0,
                        padding: 0
                    },
                    barCostRatio: {
                        display: function (ctx: any) {
                            return ctx.dataset.data[ctx.dataIndex] > 0;
                        },
                        formatter: function (_value: any, ctx: any) {
                            return item?.costRatio ? item?.costRatio[ctx.dataIndex].toFixed(2) : null;
                            // return value.toFixed(2);
                        },
                        font: {
                            weight: 'semibold',
                        },
                        // color: 'white',
                        offset: 0,
                        padding: 0
                    }
                },
            },
        })
    })

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
            tooltip: isWithTotalTooltip ? {
                callbacks: {
                    footer: (tooltipItems: any) => {
                        // let sum = 0;
                        // tooltipItems.forEach((tooltipItem: any) => {
                        //     // no need to sum target value
                        //     console.log(tooltipItem.dataIndex)
                        //     if (tooltipItem.dataset.label !== 'Target') {
                        //         sum += tooltipItem.parsed.y;
                        //     }
                        // });
                        return inputChartData.totalCost ? 'Total: ' + inputChartData.totalCost[tooltipItems[0].dataIndex].toFixed(3) : null;
                        // return `ahhh`;
                    }
                },
            } : {},
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
                title: {
                    display: yAxisTitle ? true : false,
                    text: yAxisTitle
                  },
            },
        },
    };
    return <Bar options={options} data={data} />;
}