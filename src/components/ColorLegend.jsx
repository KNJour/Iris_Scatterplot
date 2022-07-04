import { domain } from 'd3';

export const ColorLegend = ({speciesScale, spacing, size, xOffset}) => {

    return speciesScale.domain().map((species, i) => (
        <g anchor="middle" transform={`translate(20, ${i * spacing})`}>
            <text 
                className={`greyMe ${species}`}
                x={xOffset}
                dy=".32em">
                    {species}
            </text>
            <circle fill={speciesScale(species)} r={size}/>
            </g>
    ))
}