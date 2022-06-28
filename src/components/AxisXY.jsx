
export const AxisX = ({xScale, innerHeight, tickFormat}) => 
    xScale.ticks().map(tickValue => (
        <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}> 
        <line 
            y2={innerHeight} 
            />
        <text y={innerHeight + 5} dy=".71em" style={{textAnchor: 'middle'}}>{tickFormat(tickValue)}</text>
        </g>
    ))

//USES yScale.ticks NOT domain because it is a linear scale
export const AxisY = ({yScale, innerWidth}) => 
    yScale.ticks().map(tickValue => (
        <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}> 
            <line x2={innerWidth}/>
            <text
            key={tickValue} 
            style={{textAnchor: 'end'}} 
            dy=".32em" 
            x={-10}>
                {tickValue}
            </text>
        </g>
))