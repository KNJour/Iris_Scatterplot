import { domain } from 'd3';

export const ColorLegend = ({speciesScale, spacing, size, xOffset, setHoveredSpecies}) => 

speciesScale.domain().map((species, i) => (
        <g className="legendItemMapped"
           transform={`translate(20, ${i * spacing})`}
           onMouseEnter={() => { setHoveredSpecies(species); }}
            onMouseLeave={() => { setHoveredSpecies(null)}}>
            <text 
                className={`greyMe ${species}`}
                x={xOffset}
                dy=".32em">
                    {species}
            </text>
            <circle fill={speciesScale(species)} r={size}/>
        </g>
    ));