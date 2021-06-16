# Multi-axis-Census-Plot


This project reads in a CSV file containing 2016 US Census Bureau data and builds an interactive scatter plot written with javascript and D3.
The plot has 3 choices for x-axis data, % subjects In Poverty, Median Age, and Median Household Income, and 3 choices for y-axis data, % Lacking Health Insurance, %
Smokers, and % Obese.  When clicking on one of the axis options, the plotted circles will trasition to reflect the new datapoint.  Each plotted circle on the graph
will display the 2 character abbreviation of the state the data represents.  On mouseover, a black border is visible around the plotted circle, and a tooltip box is
displayed, indicating the state name, and the current axis names and data values.

Inputs:
assets/data/data.csv

![image](/D3_data_journalism/assets/img/censusplot.png)

NOTE:  State abbreviation text labelling code was located on the Stack Overflow community forum and modified to render the labels, and shared by
Annette Broeren and Kevin Mickey.


To run this code, visit https://kmspitzer.github.io/Multi-axis-Census-Plot/D3_data_journalism/

