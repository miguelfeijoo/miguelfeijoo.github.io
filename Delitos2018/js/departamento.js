function graph1(depto,data,svg,width,height,margin){

				svg.selectAll(["#id_6","#id_7","#id_8","#id_9","#id_10"]).remove();

				x = d3.scaleTime()
				    .domain(d3.extent(data.filter(d=>d.departamento == depto), d => d.date))
				    .range([margin.left, width - margin.right])
				    .clamp(true)	    
				    

				y =  d3.scaleLog()
				      .domain([1/(d3.nest().key(d => d.name).rollup(data => d3.max(data.filter(d=>d.departamento == depto), d => d.value) / d3.min(data.filter(d=>d.departamento == depto), d => d.value)).entries(data.filter(d=>d.departamento == depto)).reduce((p, d) => Math.max(p, d.value), 0)), (d3.nest().key(d => d.name).rollup(data => d3.max(data.filter(d=>d.departamento == depto), d => d.value) / d3.min(data.filter(d=>d.departamento == depto), d => d.value)).entries(data.filter(d=>d.departamento == depto)).reduce((p, d) => Math.max(p, d.value), 0))])
				      .range([height - margin.bottom, margin.top]);	
				


				z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.filter(d=>d.departamento == depto).map(d => d.name))	
				

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

							    							    								            

				series = d3.nest().key(d => d.name).entries(data.filter(d=>d.departamento == depto)).map(({key, values}) => {
				  const v = values[0].value;
				  return {key, values: values.map(({date, value}) => ({date, value: value / v}))};
				})		

				svg.append("g")
				  .call(xAxis).attr('id','id_6');

				svg.append("g")
				  .call(yAxis).attr('id','id_7');

				

				

				

				return svg.node();



}

function third(){

              parseDate = d3.timeParse("%d/%m/%Y")
              formatDate = d3.timeFormat("%B, %Y")     
              d3.csv('https://raw.githubusercontent.com/miguelfeijoo/miguelfeijoo.github.io/master/Delitos2018/data/processed/df_depto.csv', function ( d ) {
              return {
           	    'date': parseDate(d["Fecha"]),
                'name': d[ 'name' ],
                'departamento': d['Departamento'],
                'value': +d[ 'CantidadTotal' ]
                
              };
            } ).then(function(data){

            	d3.select("#depto").on("change", function(){
                depto = this.value;
            	
				svg = d3.select("svg.d")
				.style("-webkit-tap-highlight-color", "transparent")
				.on("mousemove touchmove", moved);

				margin = ({top: 20, right: -30, bottom: 120, left: 40})


                height = 600;
                width = 720;


               

				

               graph1(depto,data,svg,width,height,margin)

                bisect = d3.bisector(d => d.date).left	

                const rule = svg.append("g")
				.append("line").attr('id','id_8')
				  .attr("y1", height)
				  .attr("y2", 0)
				  .attr("stroke", "black");

				const serie = svg.append("g")
				  .style("font", "bold 10px sans-serif")
				.selectAll("g")
				.data(series)
				.enter().append("g");

				serie.append("path").attr('id','id_9')
				  .attr("fill", "none")
				  .attr("stroke-width", 1.5)
				  .attr("stroke-linejoin", "round")
				  .attr("stroke-linecap", "round")
				  .attr("stroke", d => z(d.key))
				  .attr("d", d => line(d.values));

				serie.append("text").attr('id','id_10')
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

            
            

            
			})}





)}

third();