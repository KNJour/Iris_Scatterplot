
export const Marks = ({data, yScale, xScale, xValue, yValue, tooltipValue, circleRadius, speciesScale}) => data.map(d => (
    <circle 
    className="mark" 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))} 
    r={circleRadius}
    fill={speciesScale(tooltipValue(d))}
    >
        <title>species: {tooltipValue(d)}</title>
    </circle>))
    