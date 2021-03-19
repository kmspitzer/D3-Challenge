var svgWidth = 1000;
var svgHeight = 600;

var margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
	.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
	// create scales
	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
		d3.max(censusData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

	return xLinearScale;
}

// Initial Params
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function yScale(censusData, chosenYAxis) {
	// create scales
	var yLinearScale = d3.scaleLinear()
		.domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
		d3.max(censusData, d => d[chosenYAxis]) * 1.2
	])
    .range([0, width]);

	return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
	var bottomAxis = d3.axisBottom(newXScale);
  
	xAxis.transition()
		.duration(1000)
		.call(bottomAxis);
  
	return xAxis;
}
  

d3.csv("./assets/data/data.csv").then(function(censusData) {

	console.log(censusData);
	// parse data
	censusData.forEach(function(data) {
		data.poverty        = +data.poverty;
		data.povertyMoe     = +data.povertyMoe;
		data.age            = +data.age;
		data.ageMoe         = +data.ageMoe;
		data.income         = +data.incomeMoe;
		data.incomeMoe      = +data.incomeMoe;
		data.healthcare     = +data.healthcare;
		data.healthcareLow  = +data.healthcareLow;
		data.healthcareHigh = +data.healthcareHigh;
		data.obesity        = +data.obesity;
		data.obesityLow     = +data.obesityLow;
		data.obesityHigh    = +data.obesityHigh;
		data.smokes         = +data.smokes;
		data.smokesLow      = +data.smokesLow;
		data.smokesHigh     = +data.smokesHigh;
	  });

	// xLinearScale function above csv import
//	var xLinearScale = xScale(censusData, chosenXAxis);

	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(censusData, d => d["poverty"] * 0.8),
		d3.max(censusData, d => d["poverty"] * 1.2)
	])
	.range([0, width]);

	// Create y scale function
	var yLinearScale = d3.scaleLinear()
		.domain([0, d3.max(censusData, d => d.healthcare * 1.2)])
		.range([height, 0]);

	// Create initial axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	// append x axis
	var xAxis = chartGroup.append("g")
		.classed("x-axis", true)
		.attr("transform", `translate(0, ${height})`)
		.call(bottomAxis);

	// append y axis
	chartGroup.append("g")
		.call(leftAxis);
	
	// append initial circles
	var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d["poverty"]))
    .attr("cy", d => yLinearScale(d["healthcare"]))
    .attr("r", 10)
    .attr("fill", "lightblue")
    .attr("opacity", "1.0");

	var label = circlesGroup.append("g")
      .attr("font-family", "Yanone Kaffeesatz")
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(censusData)
    .join("text")
      .attr("opacity", 0)
      .attr("dy", "0.35em")
	  .attr("color", "white")
      .attr("font-size", "8px")
      .text(d => d.abbr);
});