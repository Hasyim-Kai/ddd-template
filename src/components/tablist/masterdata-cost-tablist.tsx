import TablistNavigate from './tablist-navigate';

type Props = {
    selectedTab: string;
}

export default function MasterdataCostTablistNav({ selectedTab = "Internal" }: Props) {
    const dataTablist: { name: string, link: string, active?: boolean }[] = [
        {
            name: "Internal",
            link: "/web-admin/master-data/cost/internal",
        },
        {
            name: "External",
            link: "/web-admin/master-data/cost/external",
        },
    ]

    const selectedNavIndex = dataTablist.findIndex((item) => item.name === selectedTab)
    dataTablist[selectedNavIndex].active = true

    return <TablistNavigate tabs={dataTablist} />
}