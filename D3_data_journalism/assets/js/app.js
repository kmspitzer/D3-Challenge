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
		.domain([0, d3.max(censusData, d => d[chosenYAxis]) * 1.2])
    	.range([height, 0]);
	// Create y scale function

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
	var xLinearScale = xScale(censusData, chosenXAxis);
	var yLinearScale = yScale(censusData, chosenYAxis);

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
    	.attr("cx", d => xLinearScale(d[chosenXaxis]))
    	.attr("cy", d => yLinearScale(d[chosenYaxis]))
    	.attr("r", 10)
    	.attr("fill", "lightblue")
    	.attr("opacity", "1.0");


	// create groups for x axes labels
  	var labelsGroup = chartGroup.append("g")
		.attr("transform", `translate(${width / 2}, ${height + 20})`);

	var povertyLabel = labelsGroup.append("text")
		.attr("x", 0)
		.attr("y", 20)
		.attr("value", "poverty") // value to grab for event listener
		.classed("active", true)
		.classed("aText", true)
		.text("In Poverty (%)");

	var ageLabel = labelsGroup.append("text")
		.attr("x", 0)
		.attr("y", 40)
		.attr("value", "age") // value to grab for event listener
		.classed("inactive", true)
		.classed("aText", true)
		.text("Age (Median)");

	var incomeLabel = labelsGroup.append("text")
		.attr("x", 0)
		.attr("y", 60)
		.attr("value", "income") // value to grab for event listener
		.classed("inactive", true)
		.classed("aText", true)
		.text("Household Income (Median)");

	// create groups for y axes labels
	var healthcareLabel = labelsGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x", 0 - (height / 2))
		.attr("dy", "1em")
		.classed("active", true)
		.classed("aText", true)
		.text("Lacks Healthcare (%)");

	var smokesLabel = labelsGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - (2 * margin.left))
		.attr("x", 0 - (height / 2))
		.attr("dy", "1em")
		.classed("inactive", true)
		.classed("aText", true)
		.text("Smokes (%)");
	
	var obesityLabel = labelsGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - (3 * margin.left))
		.attr("x", 0 - (height / 2))
		.attr("dy", "1em")
		.classed("inactive", true)
		.classed("aText", true)
		.text("Obese (%)");
		
// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// x axis labels event listener
labelsGroup.selectAll("text")
  .on("click", function() {
	// get value of selection
	var value = d3.select(this).attr("value");
	if (value !== chosenXAxis) {

	  // replaces chosenXAxis with value
	  chosenXAxis = value;

	  // console.log(chosenXAxis)

	  // functions here found above csv import
	  // updates x scale for new data
	  xLinearScale = xScale(hairData, chosenXAxis);

	  // updates x axis with transition
	  xAxis = renderAxes(xLinearScale, xAxis);

	  // updates circles with new x values
	  circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

	  // updates tooltips with new info
	  circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

	  // changes classes to change bold text
	  if (chosenXAxis === "num_albums") {
		albumsLabel
		  .classed("active", true)
		  .classed("inactive", false);
		hairLengthLabel
		  .classed("active", false)
		  .classed("inactive", true);
	  }
	  else {
		albumsLabel
		  .classed("active", false)
		  .classed("inactive", true);
		hairLengthLabel
		  .classed("active", true)
		  .classed("inactive", false);
	  }
	}
  });
}).catch(function(error) {
console.log(error);
});