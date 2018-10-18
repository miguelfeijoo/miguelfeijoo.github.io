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


            	
				const svg = d3.select(DOM.svg(width, height))
				  .style("-webkit-tap-highlight-color", "transparent")
				  .on("mousemove touchmove", moved);

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