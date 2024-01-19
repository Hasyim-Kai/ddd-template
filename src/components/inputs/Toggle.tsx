import { ReactNode, useEffect, useState } from "react";
const _id = `radio_toggle_${Math.ceil(Math.random() * 1000)}`;

export const ToggleIcon = ({ checked = false }) => {
  return (
    <svg width={40} height={36} viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect className='transition-colors' y={6} width={32} height={20} rx={10} fill={checked ? '#0B7D5F' : '#C8CCD2'} />
      <g filter="url(#filter0_dd_4193_3154)">
        <circle className={`transition-all`} cx={checked ? 22 : 12} cy={16} r={8} fill="white" />
      </g>
      <defs>
        <filter id="filter0_dd_4193_3154" x={4} y={0} width={36} height={36} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4193_3154" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={5} />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_4193_3154" result="effect2_dropShadow_4193_3154" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_4193_3154" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

interface Props {
  checked: boolean;
  id: string;
  children?: ReactNode
  activeText: string
  inactiveText: string
  name: string
  cb: Function;
}

export const Toggle = ({
  checked: _checked = false,
  id = '1',
  children,
  activeText = "",
  inactiveText = "",
  name = "",
  cb,
  ...props
}: Props) => {
  const [checked, setChecked] = useState(false);
  id = id || _id;
  useEffect(() => {
    setChecked(_checked);
  }, [_checked]);
  return (
    <>
      <label className="flex gap-1 items-center cursor-pointer" htmlFor={id}>
        <ToggleIcon checked={checked} />
        {checked ? (
          <span className="mb-1">{activeText}</span>
        ) : (
          <span className="mb-1">{inactiveText}</span>
        )}
      </label>
      <input
        className="sr-only"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          cb(e.target.checked);
        }}
        {...props}
      />
    </>
  );
};
