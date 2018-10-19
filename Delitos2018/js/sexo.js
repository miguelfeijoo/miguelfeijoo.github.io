function graph(genero,data,svg,width,height,margin){

				svg.selectAll(["#id_1","#id_2","#id_3","#id_4","#id_5"]).remove();

				var x = d3.scaleTime()
				    .domain(d3.extent(data.filter(d=>d.sexo == genero), d => d.date))
				    .range([margin.left, width - margin.right])
				    .clamp(true)	    
				    

				var y =  d3.scaleLog()
				      .domain([1/(d3.nest().key(d => d.name).rollup(data => d3.max(data.filter(d=>d.sexo == genero), d => d.value) / d3.min(data.filter(d=>d.sexo == genero), d => d.value)).entries(data.filter(d=>d.sexo == genero)).reduce((p, d) => Math.max(p, d.value), 0)), (d3.nest().key(d => d.name).rollup(data => d3.max(data.filter(d=>d.sexo == genero), d => d.value) / d3.min(data.filter(d=>d.sexo == genero), d => d.value)).entries(data.filter(d=>d.sexo == genero)).reduce((p, d) => Math.max(p, d.value), 0))])
				      .range([height - margin.bottom, margin.top]);	
				


				var z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.filter(d=>d.sexo == genero).map(d => d.name)).attr("id","id_5")
				

				var xAxis = g => g
				    .attr("transform", `translate(0,${height - margin.bottom})`)
				    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0)).attr("id","id_1")
				    .call(g => g.select(".domain").remove())


				var yAxis = g => g
				    .attr("transform", `translate(${margin.left},0)`)
				    .call(d3.axisLeft(y).attr("id","id_2")
				        .ticks(null, 6))
				    .call(g => g.selectAll(".tick line").clone()
				        .attr("stroke-opacity", d => d === 1 ? null : 0.2)
				        .attr("x2", width - margin.left - margin.right)).attr("id","id_3")
				    .call(g => g.select(".domain").remove())	
				    
				var line = d3.line()
				    .x(d => x(d.date))
				    .y(d => y(d.value))

							    							    								            

				series = d3.nest().key(d => d.name).entries(data.filter(d=>d.sexo == genero)).map(({key, values}) => {
				  const v = values[0].value;
				  return {key, values: values.map(({date, value}) => ({date, value: value / v}))};
				}).attr("id","id_4")		

				svg.append("g")
				  .call(xAxis);

				svg.append("g")
				  .call(yAxis);

				

				

				

				return svg.node();



}

function second(){

              parseDate = d3.timeParse("%d/%m/%Y")
              formatDate = d3.timeFormat("%B, %Y")     
              d3.csv('https://raw.githubusercontent.com/miguelfeijoo/miguelfeijoo.github.io/master/Delitos2018/data/processed/df_sexo.csv', function ( d ) {
              return {
           	    'date': parseDate(d["Fecha"]),
                'name': d[ 'name' ],
                'sexo': d['Sexo'],
                'value': +d[ 'CantidadTotal' ]
                
              };
            } ).then(function(data){

            	d3.select("#genero").on("change", function(){
                genero = this.value;
            	
				svg = d3.select("svg.d")
				.style("-webkit-tap-highlight-color", "transparent")
				.on("mousemove touchmove", moved);

				margin = ({top: 20, right: -30, bottom: 120, left: 40})


                height = 600;
                width = 720;


                bisect = d3.bisector(d => d.date).left	

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

				

               graph(genero,data,svg,width,height,margin)

            
            

            
			})}





)}

second();