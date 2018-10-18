function first(){

              parseDate = d3.timeParse("%d/%m/%Y")
              formatDate = d3.timeFormat("%B, %Y")     
              d3.csv('https://raw.githubusercontent.com/miguelfeijoo/miguelfeijoo.github.io/master/Delitos2018/data/processed/df_total.csv', function ( d ) {
              return {
           	    'date': parseDate(d["Fecha"]),
                'name': d[ 'name' ],
                'value': +d[ 'CantidadTotal' ]
                
              };
            } ).then(function(data){


            	
				var svg = d3.select( "svg.c" ),
                margin = { top: 50, right: 30, bottom: 30, left: 80 },
                iwidth = +svg.attr( "width" ) - margin.left - margin.right,
                iheight = +svg.attr( "height" ) - margin.top - margin.bottom,
                g = svg.append( "g" ).attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );



				x = d3.scaleTime()
				    .domain(d3.extent(data, d => d.date))
				    .range([margin.left, width - margin.right])
				    .clamp(true)	    
				    

				y = {
				  k = d3.nest()
				      .key(d => d.name)
				      .rollup(data => d3.max(data, d => d.value) / d3.min(data, d => d.value))
				    .entries(data)
				    .reduce((p, d) => Math.max(p, d.value), 0);
				  console.log(k);
				  return d3.scaleLog()
				      .domain([1/k, k])
				      .range([height - margin.bottom, margin.top]);
				}		
				


				z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name))	
				

				xAxis = g => g
				    .attr("transform", `translate(0,${height - margin.bottom})`)
				    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
				    .call(g => g.select(".domain").remove())


				yAxis = g => g
				    .attr("transform", `translate(${margin.left},0)`)
				    .call(d3.axisLeft(y)
				        .ticks(null, 6))
				    .call(g => g.selectAll(".tick line").clone()
				        .attr("stroke-opacity", d => d === 1 ? null : 0.2)
				        .attr("x2", width - margin.left - margin.right))
				    .call(g => g.select(".domain").remove())	
				    
				line = d3.line()
				    .x(d => x(d.date))
				    .y(d => y(d.value))

				bisect = d3.bisector(d => d.date).left				    							    								            

				series = d3.nest().key(d => d.name).entries(data).map(({key, values}) => {
				  const v = values[0].value;
				  return {key, values: values.map(({date, value}) => ({date, value: value / v}))};
				})				

				svg.append("g")
				  .call(xAxis);

				svg.append("g")
				  .call(yAxis);

				const rule = svg.append("g")
				.append("line")
				  .attr("y1", height)
				  .attr("y2", 0)
				  .attr("stroke", "black");

				const serie = svg.append("g")
				  .style("font", "bold 10px sans-serif")
				.selectAll("g")
				.data(series)
				.enter().append("g");

				serie.append("path")
				  .attr("fill", "none")
				  .attr("stroke-width", 1.5)
				  .attr("stroke-linejoin", "round")
				  .attr("stroke-linecap", "round")
				  .attr("stroke", d => z(d.key))
				  .attr("d", d => line(d.values));

				serie.append("text")
				  .datum(d => ({key: d.key, value: d.values[d.values.length - 1].value}))
				  .attr("fill", "none")
				  .attr("stroke", "white")
				  .attr("stroke-width", 3)
				  .attr("x", x.range()[1] + 3)
				  .attr("y", d => y(d.value))
				  .attr("dy", "0.35em")
				  .text(d => d.key)
				.clone(true)
				  .attr("fill", d => z(d.key))
				  .attr("stroke", null);

				d3.transition()
				  .ease(d3.easeCubicOut)
				  .duration(1500)
				  .tween("date", () => {
				    const i = d3.interpolateDate(x.domain()[1], x.domain()[0]);
				    return t => update(i(t));
				  });

				function update(date) {
				date = d3.timeDay.round(date);
				rule.attr("transform", `translate(${x(date) + 0.5},0)`);
				serie.attr("transform", ({values}) => {
				  const i = bisect(values, date, 0, values.length - 1);
				  return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
				});
				svg.property("value", date).dispatch("input");
				}

				function moved() {
				update(x.invert(d3.mouse(this)[0]));
				d3.event.preventDefault();
				}

				update(x.domain()[0]);

				return svg.node();



            
            

            
			}





)}

first();