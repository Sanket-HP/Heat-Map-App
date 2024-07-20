# Global Temperature Heat Map

## Overview

This project creates a heat map visualization of global land-surface temperatures from 1753 to 2015. The heat map displays monthly temperature anomalies with a color scale indicating temperature variations. It uses D3.js for data visualization and provides interactive features such as tooltips and a color legend.

## User Stories

The heat map fulfills the following user stories:

1. **Title**: The heat map includes a title with an id of `title`.
2. **Description**: A description with an id of `description` is provided.
3. **X-Axis**: The heat map features an x-axis with an id of `x-axis`.
4. **Y-Axis**: The heat map features a y-axis with an id of `y-axis`.
5. **Cells**: Rectangular cells with the class `cell` represent the data.
6. **Color Variety**: At least four different fill colors are used for the cells.
7. **Cell Data**: Each cell has `data-month`, `data-year`, and `data-temp` attributes.
8. **Data Range**: The `data-month` and `data-year` attributes of each cell are within the range of the data.
9. **Cell Alignment (Y-Axis)**: Cells align with the corresponding month on the y-axis.
10. **Cell Alignment (X-Axis)**: Cells align with the corresponding year on the x-axis.
11. **Y-Axis Labels**: The y-axis has multiple tick labels with full month names.
12. **X-Axis Labels**: The x-axis has multiple tick labels for years between 1754 and 2015.
13. **Legend**: A legend with an id of `legend` is included.
14. **Legend Rectangles**: The legend contains rect elements.
15. **Legend Colors**: The legend uses at least four different fill colors.
16. **Tooltip**: A tooltip with an id of `tooltip` displays additional information on mouseover.
17. **Tooltip Data-Year**: The tooltip has a `data-year` property corresponding to the active cell's year.

## Files

- `index.html`: Contains the HTML structure for the heat map and its components.
- `styles.css`: Includes the CSS styles for the heat map and its elements.
- `app.js`: The JavaScript code using D3.js to fetch data, generate the heat map, and handle interactions.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
