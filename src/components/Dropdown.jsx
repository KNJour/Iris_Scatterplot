export const Dropdown = ({options, id, handleSelection, selectedValues}) => {
    return(
<div className="selection">
    {/* X Axis */}
    <label for="xAxisSelect">X Axis: </label>
   <select id="xAxisSelect" type="text" name="xAxis" onChange={handleSelection} value={selectedValues.xAxis}>
        {options.map(option => (
            <option value={option.value} name={option.value}>{option.label}</option>
        ))}
    </select> 
    <br></br>
    {/* Y AXIS */}
    <label for="xAxisSelect">X Axis: </label>
   <select id={id} type="text" name="yAxis" onChange={handleSelection} value={selectedValues.yAxis}>
        {options.map(option => (
            <option value={option.value} name={option.value}>{option.label}</option>
        ))}
    </select> 
    <h2>{`the current value for X is: ${selectedValues.xAxis}`}</h2>
    <h2>{`the current value for Y is: ${selectedValues.yAxis}`}</h2>

</div>

)};