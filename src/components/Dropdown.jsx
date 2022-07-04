export const Dropdown = ({options, id, handleSelection, selectedValues}) => {
    return(
<div className="dropdown">
    {/* X Axis */}
    <label className="selectionLabel" for="xAxisSelect">X Axis: </label>
   <select id="xAxisSelect" type="text" name="xAxis" onChange={handleSelection} value={selectedValues.xAxis}>
        {options.map(option => (
            <option value={option.value} selected={option.value === selectedValues.xAxis}name={option.value}>{option.label}</option>
        ))}
    </select> 
    
    {/* Y AXIS */}
    <label className="selectionLabel" for="yAxisSelect">Y Axis: </label>
   <select id="yAxisSelect" type="text" name="yAxis" onChange={handleSelection} value={selectedValues.yAxis}>
        {options.map(option => (
            <option value={option.value} selected={option.value === selectedValues.yAxis} name={option.value}>{option.label}</option>
        ))}
    </select> 

</div>

)};