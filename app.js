const width = 1200;
const height = 500;
const padding = 60;

const colors = [
  "#313695", "#4575b4", "#74add1", "#abd9e9",
  "#e0f3f8", "#ffffbf", "#fee090", "#fdae61",
  "#f46d43", "#d73027", "#a50026"
];

const tooltip = d3.select("#tooltip");

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(data => {
  const baseTemperature = data.baseTemperature;
  const monthlyVariance = data.monthlyVariance;

  const years = [...new Set(monthlyVariance.map(d => d.year))];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const xScale = d3.scaleBand()
                   .domain(years)
                   .range([padding, width - padding])
                   .padding(0.05);
                   
  const yScale = d3.scaleBand()
                   .domain(d3.range(12))
                   .range([padding, height - padding])
                   .padding(0.05);
                   
  const colorScale = d3.scaleQuantize()
                       .domain([d3.min(monthlyVariance, d => baseTemperature + d.variance), d3.max(monthlyVariance, d => baseTemperature + d.variance)])
                       .range(colors);

  const svg = d3.select("#heatmap")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
                
  svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", `translate(0, ${height - padding})`)
     .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(year => year % 10 === 0)));
     
  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", `translate(${padding}, 0)`)
     .call(d3.axisLeft(yScale).tickFormat(month => months[month]));

  svg.selectAll(".cell")
     .data(monthlyVariance)
     .enter()
     .append("rect")
     .attr("class", "cell")
     .attr("data-month", d => d.month - 1)
     .attr("data-year", d => d.year)
     .attr("data-temp", d => baseTemperature + d.variance)
     .attr("x", d => xScale(d.year))
     .attr("y", d => yScale(d.month - 1))
     .attr("width", xScale.bandwidth())
     .attr("height", yScale.bandwidth())
     .attr("fill", d => colorScale(baseTemperature + d.variance))
     .on("mouseover", (event, d) => {
       tooltip.transition().duration(200).style("opacity", 0.9);
       tooltip.html(`Year: ${d.year}<br>Month: ${months[d.month - 1]}<br>Temperature: ${(baseTemperature + d.variance).toFixed(2)}℃<br>Variance: ${d.variance.toFixed(2)}℃`)
              .attr("data-year", d.year)
              .style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY - 28}px`);
     })
     .on("mouseout", () => {
       tooltip.transition().duration(500).style("opacity", 0);
     });

  const legendWidth = 400;
  const legendHeight = 20;
  const legendRectWidth = legendWidth / colors.length;

  const legend = d3.select("#legend")
                   .append("svg")
                   .attr("width", legendWidth)
                   .attr("height", legendHeight + 40);

  const legendScale = d3.scaleLinear()
                        .domain([d3.min(monthlyVariance, d => baseTemperature + d.variance), d3.max(monthlyVariance, d => baseTemperature + d.variance)])
                        .range([0, legendWidth]);

  legend.selectAll("rect")
        .data(colors)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * legendRectWidth)
        .attr("y", 0)
        .attr("width", legendRectWidth)
        .attr("height", legendHeight)
        .attr("fill", d => d);

  legend.append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(d3.axisBottom(legendScale).tickFormat(d3.format(".1f")).ticks(colors.length));
});

