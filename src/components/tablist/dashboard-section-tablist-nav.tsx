import TablistNavigate from './tablist-navigate';

type Props = {
    selectedTab: string;
}

export default function DashobardSectionTablistNav({ selectedTab = "Total" }: Props) {
    const dataTablist: { name: string, link: string, active?: boolean }[] = [
        {
            name: "Total",
            link: "/web-admin/dashboard/section/total",
            active: false,
        },
        {
            name: "LA",
            link: "/web-admin/dashboard/section/la",
        },
        {
            name: "HG",
            link: "/web-admin/dashboard/section/hg",
        },
        {
            name: "G2",
            link: "/web-admin/dashboard/section/g2",
        },
        {
            name: "ASSY",
            link: "/web-admin/dashboard/section/assy",
        },
        {
            name: "NOISE",
            link: "/web-admin/dashboard/section/noise",
        },
        {
            name: "ABN",
            link: "/web-admin/dashboard/section/abn",
        },
        {
            name: "F1",
            link: "/web-admin/dashboard/section/f1",
        },
        {
            name: "F2",
            link: "/web-admin/dashboard/section/f2",
        },
        {
            name: "F3",
            link: "/web-admin/dashboard/section/f3",
        },
    ]

    const selectedNavIndex = dataTablist.findIndex((item) => item.name === selectedTab)
    dataTablist[selectedNavIndex].active = true

    return <TablistNavigate tabs={dataTablist} />
}