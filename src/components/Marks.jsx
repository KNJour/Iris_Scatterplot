
export const Marks = ({data, yScale, xScale, xValue, yValue, tooltipValue, circleRadius}) => data.map(d => (
    <circle 
    className="mark" 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))} 
    r={circleRadius}
    >
        <title>species: {tooltipValue(d)}</title>
    </circle>))
    