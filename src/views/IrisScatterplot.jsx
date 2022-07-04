import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ scaleLinear, format, extent, scaleOrdinal }from 'd3';
import { GetData } from '../components/GetData';
import { AxisX, AxisY } from '../components/AxisXY';
import { Marks } from '../components/Marks';
import { Dropdown } from '../components/Dropdown';
import {ColorLegend } from '../components/ColorLegend';

const irisUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';


const width = 960;
const height = 550;
const margin = {
    top: 50,
    right: 150,
    left: 150,
    bottom: 60
};

// const centerX=width / 2;
// const centerY=height / 2;

const IrisScatterplot = () => {

    const dataOptions = [
        { value: 'sepal_length', label: "Sepal Length"  },
        { value: 'sepal_width', label: "Sepal Width"  },
        { value: 'petal_length', label: "Petal Length"  },
        { value: 'petal_width', label: "Petal Width"  }
    ];
    
    const hoverEffect = (value) => {
        console.log(value);
    }
    const findLabel = (axisSelection) => {
        for (let i=0;i< dataOptions.length;i++) {
            if(dataOptions[i].value === axisSelection) {
                return dataOptions[i].label;
            }
        }
    }

    const handleSelection = e => {
        
        setSelectedValues({...selectedValues, [e.target.name]: e.target.value});

    }


    const data = GetData(irisUrl);

    const initialX = 'petal_length';
    const initialY = 'sepal_length';

    // States
    const [selectedValues, setSelectedValues] = useState({
        xAxis: initialX,
        yAxis: initialY
    });

    const [hoveredSpecies, setHoveredSpecies] = useState(null)

    console.log("hovered value" + hoveredSpecies )

    if(!data) {
        return <pre>Loading</pre>
    } else {

    const innerHeight = height - margin.top - margin.bottom;

    const innerWidth = width - margin.left - margin.right;

        // LABELS AND DATA
    
    const xLabel = findLabel(selectedValues.xAxis);
    const yLabel = findLabel(selectedValues.yAxis);
    const legendLabel = "Species";

    const yValue = d => d[selectedValues.yAxis];
    const xValue = d => d[selectedValues.xAxis];

    const circleRadius = 8;
    const tooltipValue = d => d.species;
    const yAxisLabelOffset = -50;
    const xAxisLabelOffset = 45;
    const siFormat = format('.2s');

    const filteredData = data.filter( d => hoveredSpecies === tooltipValue(d));


    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
    
    // SCALES

    //color scales are ordinal, domain can take in map of values in array, it accepts duplicates. the range is an array of colors
    const speciesScale = scaleOrdinal()
    .domain(data.map(tooltipValue))
    .range(['#ff8916', '#7e3ff2', '#1bb403'])

    const xScale = scaleLinear()
    .domain(extent(data, xValue)) 
    .range([0, innerWidth])
    .nice();

    // scatterplots are linear scales 
    const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

    return (
        <>
        <div className="container-fluid d-flex bg-dark text-light">
         <Dropdown id="plant" options={dataOptions} handleSelection={handleSelection} selectedValues={selectedValues}/>

        </div>
         <div className="container mt-4">
             <div className="row">
             <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                
                <AxisX xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                <AxisY yScale={yScale} innerWidth={innerWidth}/>
                <g opacity={hoveredSpecies ? .3 : 1}>
                    <Marks 
                    data={data} 
                    yScale={yScale} 
                    speciesScale={speciesScale}
                    xScale={xScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipValue={tooltipValue}
                    circleRadius={circleRadius}
                    />
                </g>
                    MARKS FOR FILTERED DATA
                    <Marks 
                    data={filteredData} 
                    yScale={yScale} 
                    speciesScale={speciesScale}
                    xScale={xScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipValue={tooltipValue}
                    circleRadius={circleRadius}
                    />
                {/* X axis label  */}
                    <text 
                        className="axisLabel greyMe"
                        x={innerWidth / 2} 
                        textAnchor="middle"  
                        y={innerHeight + xAxisLabelOffset}>
                            {xLabel}
                    </text>
                                    {/* Y axis label  */}
                    <text 
                        className="axisLabel greyMe"
                        textAnchor="middle"
                        transform={`translate(${yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                            {yLabel}
                    </text>
                    <g transform={`translate(${innerWidth + 35}, 50)`}>
                    <text 
                        className="axisLabel greyMe"
                        textAnchor="middle" 
                        x={50}
                        y={-20}
                        >
                            {legendLabel}
                    </text>
                        <ColorLegend 
                            speciesScale={speciesScale}
                            spacing={20}
                            size={circleRadius}
                            xOffset={20}
                            setHoveredSpecies={setHoveredSpecies}/>
                    </g>
                    
            </g>
            
        </svg>
             </div>
             {/* <div className="row text-center justify-content-center">
                    <h3>Legend</h3>
             </div>
             <div className="row text-center justify-content-center">
                    <h3 className="legendItem setosa">Setosa</h3> 
                    <h3 className="legendItem versicolor">Versicolor</h3> 
                    <h3 className="legendItem virginica">Virginica</h3> 
             </div> */}
         </div>
        
         
        </>
    
        )};

}
export default IrisScatterplot;