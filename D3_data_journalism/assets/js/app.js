var svgWidth = 960;
var svgHeight = 500;

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
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);




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



});