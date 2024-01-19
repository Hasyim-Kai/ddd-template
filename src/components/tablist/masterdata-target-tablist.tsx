import TablistNavigate from './tablist-navigate';

type Props = {
    selectedTab: string;
}

export default function MasterdataTargetTablistNav({ selectedTab = "Internal" }: Props) {
    const dataTablist: { name: string, link: string, active?: boolean }[] = [
        {
            name: "General",
            link: "/web-admin/master-data/target/general",
        },
        {
            name: "Section",
            link: "/web-admin/master-data/target/section",
        },
        {
            name: "Cost Ratio",
            link: "/web-admin/master-data/target/cost-ratio",
        },
        {
            name: "Noise",
            link: "/web-admin/master-data/target/noise",
        },
    ]

    const selectedNavIndex = dataTablist.findIndex((item) => item.name === selectedTab)
    dataTablist[selectedNavIndex].active = true

    return <TablistNavigate tabs={dataTablist} />
}