## Background
This project contains code for the website accompanying the paper ["Imputing Missing Values in the US Census Bureau's County Business Patterns"](http://fpeckert.me/cbp/efsy.pdf) 
written by Eckert et. al.

The county business patterns dataset, containing yearly employment data broken down by industry throughout every county in the United States, has lots of potential to 
offer critical insights on employment patterns throughout the United States, but suffers from the limitation that many of the values are suppressed to preserve anonymity.
Eckert et. al. address this issue by applying a linear programming method to estimate these missing values from the years 1975 to 2016.

## Website overview
This website displays the full employment data (including estimated values) from 1975 to 2016 in an interactive map.
The slider at the top of the page allows users to select the year they're interested in, and view data for the entire country at this level.
Users have a few different options they can select from when choosing how they'd like to view the data, outlined below.

**Sector-specific view**. 
Users can choose to view the data by first selecting a specific sector, at which point the map displays each county's total number of employees working in
the selected sector, along with the proportion of that county's workers who are employed by the selected sector.

**County-level overview**. 
Users can also choose to view the an overview of each county's data, which displays the a list of the county's 10 largest employers, along with the total
number of workers employed in each of these sectors (and the proportion of the county's workers who are employed in the respective sector).
