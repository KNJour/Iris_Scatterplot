import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ scaleLinear, format, extent }from 'd3';
import { GetData } from '../components/GetData';
import { AxisX, AxisY } from '../components/AxisXY';
import { Marks } from '../components/Marks';
import { Dropdown } from '../components/Dropdown';

const irisUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';


const width = 960;
const height = 500;
const margin = {
    top: 20,
    right: 20,
    left: 120,
    bottom: 60
};

// const centerX=width / 2;
// const centerY=height / 2;

const IrisScatterplot = () => {

    const [selectedValues, setSelectedValues] = useState({
        xAxis: null,
        yAxis: null
    });

    const handleSelection = e => {
        setSelectedValues({...selectedValues, [e.target.name]: e.target.value});
    }
    const data = GetData(irisUrl);
    if(!data) {
        return <pre>Loading</pre>
    } else {

        const innerHeight = height - margin.top - margin.bottom;

        const innerWidth = width - margin.left - margin.right;

        // LABELS AND DATA
    const petal_length = d => +d.petal_length;
    const petal_width = d => +d.petal_width;
    const sepal_length = d => +d.sepal_length;
    const sepal_width = d => sepal_width;
    
    const dataOptions = [
        { value: sepal_length, label: "Sepal Length"  },
        { value: sepal_width, label: "Sepal Width"  },
        { value: petal_length, label: "Petal Length"  },
        { value: petal_width, label: "Petal Width"  }
    ];
    
    const yValue = petal_length;
    const yLabel = "Petal Length"
    const xValue = d => d.sepal_length;
    const xLabel = "Sepal Length";

    const circleRadius = 8;
    const tooltipValue = d => d.species;
    const yAxisLabelOffset = -50;
    const xAxisLabelOffset = 45;
    const siFormat = format('.2s');

    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
    
    const xScale = scaleLinear()
    .domain(extent(data, sepal_length)) 
    .range([0, innerWidth])
    .nice();

    // scatterplots are linear scales 
    const yScale = scaleLinear()
    .domain(extent(data, petal_length))
    .range([innerHeight, 0])
    .nice();

    return (
        <>
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                
                <AxisX xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                <AxisY yScale={yScale} innerWidth={innerWidth}/>
                <Marks 
                data={data} 
                yScale={yScale} 
                xScale={xScale}
                xValue={xValue}
                yValue={yValue}
                tooltipValue={tooltipValue}
                circleRadius={circleRadius}
                />
                {/* X axis label  */}
                    <text 
                        className="axisLabel"
                        x={innerWidth / 2} 
                        textAnchor="middle"  
                        y={innerHeight + xAxisLabelOffset}>
                            {xLabel}
                    </text>
                                    {/* Y axis label  */}
                    <text 
                        className="axisLabel"
                        textAnchor="middle"
                        transform={`translate(${yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
                            {yLabel}
                    </text>
            </g>
        </svg>
        
         <Dropdown id="plant" options={dataOptions} handleSelection={handleSelection} selectedValues={selectedValues}/>
         {console.log("is it working? " + selectedValues.xAxis)}
        </>
    
        )};

}
export default IrisScatterplot;