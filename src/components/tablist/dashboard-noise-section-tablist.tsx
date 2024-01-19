import TablistNavigate from './tablist-navigate';

type Props = {
    selectedTab: string;
}

export default function DashobardNoiseSectionTablistNav({ selectedTab = "Cost Noise Ratio" }: Props) {
    const dataTablist: { name: string, link: string, active?: boolean }[] = [
        {
            name: "Cost Noise Ratio",
            link: "/web-admin/dashboard/noise/cost-noise-ratio",
        },
        {
            name: "Ratio Composition",
            link: "/web-admin/dashboard/noise/ratio-composition",
        },
    ]

    const selectedNavIndex = dataTablist.findIndex((item) => item.name === selectedTab)
    dataTablist[selectedNavIndex].active = true

    return <TablistNavigate tabs={dataTablist} />
}