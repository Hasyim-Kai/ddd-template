type Props = {
    parentModel: any,
    row: any,
    headTitle?: string,
    label: string,
    type?: string,
    className?: string
    isWithDefaultValue?: true
    defaultValue?: number
    step?: number
}

export default function InputLabel({ parentModel, row, label = `pcs`, type = "text", className, isWithDefaultValue = true, defaultValue = 0, step = 1 }: Props) {
    return <main className=''>
        {/* <p className={``}><i>{headTitle}{row.name}</i></p> */}
        <span className={``}>{row.label}</span>
        <div className="flex mt-2">
            <input type={type} step={type === "number" ? step : 'any'} defaultValue={isWithDefaultValue ? defaultValue : null}
                className={`h-12 rounded-l-lg px-3 ${parentModel.errors[row.name] ? 'border-red-400 border-2 bg-red-50' : 'border'} ${className}`}
                {...parentModel.register(row.name, { required: true, })}
            />
            <div className="flex text-sm items-center bg-[#667085] rounded-r-md text-white px-3">
                {label}
            </div>
        </div>
    </main>
}