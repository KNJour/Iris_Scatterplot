
export const Marks = ({data, yScale, xScale, xValue, yValue, tooltipFormat}) => data.map(d => (
    <circle 
    className="mark" 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))} 
    r={7}
    >
        <title>{tooltipFormat(xValue(d))}</title>
    </circle>))