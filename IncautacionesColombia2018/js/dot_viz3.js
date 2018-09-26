function graph_line(g,array,x1,y1,eje_y,eje_x,color){




 g.selectAll( "circle" )
    .data( array ).enter()   
    .append( "circle" ).attr("id","id_6")
    .attr( "cx",  d => x1(d[eje_x]) )
    .attr( "cy",  d=> y1(d[eje_y]) )
    .attr( "r", 4 )
    .attr( "class", "circle" )
    .attr( "fill", color )
    .attr( "stroke", "black" ).on('mouseover',function(d){
  var line = d3.line()
  .x( d=> x1(d[eje_x]))
  .y( d=> y1(d[eje_y]));


  g.append( "path" ).attr("id","id_5")
    .datum( array )
    .attr( "class", "line" )
    .attr( "fill", "none" )
    .attr( "stroke", "black" )
    .attr( "stroke-width", 2 )
    .attr( "d", line ).transition().duration(500);
   
   d3.select(this)
        .transition()
        .duration(300)
        .attr("r", 8)
        .style("fill", "black");
   
 }).on('mouseout',function(d){
  
 g.selectAll( "#id_5" ).transition().duration(350).remove()
 d3.select(this)
        .transition()
        .duration(300)
        .attr("r", 4)
        .style("fill", color);
 
 });


}



function grafica(clase_sitio,incautaciones_depto,svg,iwidth,iheight,g){

  svg.selectAll(["#id_6"]).remove();

  
  const x1 = d3.scaleBand()
  .domain(incautaciones_depto.map(d=>d['DEPARTAMENTO']))
  .rangeRound([0, iwidth]);

  const y1 = d3.scaleLinear()
  .domain([0, d3.max(incautaciones_depto,d=>d[clase_sitio])])
  .rangeRound([iheight, 0]);
  
  g.append( "g" )
    .attr( "class", "axis" )
    .attr( "transform", "translate(0," + iheight + ")" )
    .call( d3.axisBottom( x1 ) ).selectAll("text")
    .attr("transform", "rotate(90)").attr("y", 0)
    .attr("x", 10)
    .attr("dy", ".50em").style("text-anchor", "start");

  g.append( "g" )
    .attr( "class", "axis" )
    .call( d3.axisLeft( y1 ).ticks( null, ".0f" ) )
    .append( "text" )
    .attr( "x", 2 )
    .attr( "y", y1( y1.ticks().pop() ) + 0.5 )
    .attr( "dy", "-3.7em" )
    .attr( "fill", "#000" )
    .attr( "font-weight", "bold" )
    .attr( "text-anchor", "start" )
    .attr( "font-family", "sans-serif" )
    .attr( "font-size", 8 )
    .text( "# INCAUTACIONES POR DEPTO" )
    .attr("transform", "rotate(-90) translate(-200,0)")
    .style("font-size",11)
    .attr("y", 10);

  

 graph_line(g, incautaciones_depto, x1, y1, clase_sitio, 'DEPARTAMENTO', 'firebrick')
 



  return svg.node();



}




function third(){



d3.csv('https://raw.githubusercontent.com/miguelfeijoo/IncautacionesColombia2018/master/DATOS/INCAUTACIONES_DEPARTAMENTO.csv', function ( d ) {
  return {
    'DEPARTAMENTO': d[ 'DEPARTAMENTO' ],
    'BASE DE COCA': +d[ 'BASE DE COCA' ],
    'BASUCO': +d[ 'BASUCO' ],
    'COCAINA': d[ 'COCAINA' ],
    'HEROINA': +d[ 'HEROINA' ],
    'MARIHUANA': +d[ 'MARIHUANA' ]
    
  };
} ).then(function(incautaciones_depto){



  d3.select("#clase_sitio").on("change", function(){
                depto = this.value;

  var svg = d3.select( "svg.e" ),
      margin = { top: 50, right: 30, bottom: 150, left: 80 },
      iwidth = +svg.attr( "width" ) - margin.left - margin.right,
      iheight = +svg.attr( "height" ) - margin.top - margin.bottom,
      g = svg.append( "g" ).attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

 grafica(depto,incautaciones_depto,svg,iwidth,iheight,g)



})})
  
  
}


third();