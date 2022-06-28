
export const Marks = ({data, yScale, xScale, xValue, yValue, tooltipValue}) => data.map(d => (
    <circle 
    className="mark" 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))} 
    r={7}
    >
        <title>species: {tooltipValue(d)}</title>
    </circle>))
    