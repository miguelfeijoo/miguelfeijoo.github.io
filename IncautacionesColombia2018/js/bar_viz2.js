
function grafica(depto,incautaciones_depto_sitio_mes,svg){

  svg.selectAll(["id_1","id_2","id_3","id_4"]).remove();

  
  let tooltip = g.append("text")
        .style("font-size", "10pt")
        .style("font-family", "sans-serif")  
        .style("color", "steelblue")
        .attr("x", 0);
  let tooltip2 = g.append("text")
        .style("font-size", "10pt")
        .style("font-family", "sans-serif")  
        .style("color", "steelblue")
        .attr("x", 0);
  
  var x0 = d3.scaleBand()
    .rangeRound( [ 0, iwidth ] )
    .paddingInner( 0.3 );
  
  var x1 = d3.scaleBand()
    .padding( 0.05 );

  var y = d3.scaleLinear()
    .rangeRound( [ iheight, 0 ] );

  var rectangle = svg.append("rect").attr("id","rectangle")
                            .attr("x", iwidth-380)
                            .attr("y", iheight+80)
                            .attr("width", 430)
                            .attr("height", 30)
                            .style("fill","none")
                            .style('stroke','black')
     
  var keys = incautaciones_depto_sitio_mes.columns.slice( 2 );
  
  var colors=["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"]

var n = 6;
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
shuffle(colors)
  
  var z = d3.scaleOrdinal( colors.slice(0,n));
    
  x0.domain( incautaciones_depto_sitio_mes.filter(d=>d.DEPARTAMENTO == depto).map( d => d[ 'MES' ] ) );
  x1.domain( keys ).rangeRound( [ 0, x0.bandwidth() ] );
  y.domain( [ 0, d3.max( incautaciones_depto_sitio_mes.filter(d=>d.DEPARTAMENTO == depto), function(d) { return d3.max( keys, function( key ) { return d[ key ]; } ); } ) ] );
  
  g.append( "g" )
    .selectAll( "g" )
    .data( incautaciones_depto_sitio_mes.filter(d=>d.DEPARTAMENTO == depto) )
    .enter().append( "g" )
      .attr( "transform", d => "translate(" + x0( d[ 'MES' ] ) + ",0)" )
    .selectAll( "rect" )
    .data( function( d ) { return keys.map( function( key ) {  return { key: key, value: d[ key ] }; } ); } )
    .enter().append( "rect" ).attr("id","id_1")
      .attr( "class", "bar" ).style("stroke-weigth",10).style("stroke","black")
      .attr( "x", d => x1( d.key ) )
      .attr( "y", d => y( d.value ) )
      .attr( "width", x1.bandwidth())
      .attr( "height", d => iheight - y( d.value ) )
      .attr( "fill", d => z( d.key ) )
      .on("mouseover", function( d ) {  
    
      
        d3.select(this).attr('class', 'highlight');
                                
                                
        d3.select(this)
          .transition()   
          .duration(400)
          .attr("fill","black")
          .attr("stroke",d => z( d.key ) )
          .attr("stroke-weigth",10)
       
        tooltip.attr("x", iwidth-360)
        .attr("y", iheight-400)
        .html(`Se registraron ${parseInt(d.value).toLocaleString()} incautaciones ese mes`)
        .style('font-weight',"bold").style("fill", "firebrick").style("font-size",'12px');
    
        tooltip2.attr("x", iwidth-360)
        .attr("y", iheight-385)
        .html(`Estupefaciente Incautado: ${d.key}`)
        .style('font-weight',"bold").style("fill", "firebrick").style("font-size",'12px');
    
            
  
        
         
       
        } )         
      .on( "mouseout", function( d ) {    
        
        
        d3.select(this).attr('class', 'highlight');
                                
                                     
        d3.select(this)
          .transition()   
          .duration(400)
          .attr("fill",d => z( d.key ) )
          .attr("stroke",d => z( d.key ) )
         
        tooltip.text("") .transition()
        .duration(300)
        tooltip2.text("") .transition()
        .duration(300)

      } );
  
  g.append( "g" )
      .attr( "class", "axis" )
      .attr( "transform", "translate(0," + iheight + ")" )
      .call( d3.axisBottom( x0 ) ).attr("id","id_2");
  
  g.append( "g" )
      .attr( "class", "axis" )
      .call( d3.axisLeft( y ).ticks( null, ".0f" ) ).attr("id","id_3")
    .append( "text" ).attr("id","id_4")
      .attr( "x", 2 )
      .attr( "y", y( y.ticks().pop() ) + 0.5 )
      .attr( "dy", "0.45em" )
      .attr( "fill", "#000" )
      .attr( "font-weight", "bold" )
      .attr( "text-anchor", "start" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 6 )
      .text( `Incautaciones por Mes en ${depto}` )
      .attr("transform", "rotate(-90) translate(-270,0)")
      .style("font-size",11)
      .attr("y", 15);
  
  var legend = svg.append( "g" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 12 )
      .attr( "text-anchor", "end" )
    .selectAll( "g" )
    .data( keys.slice().reverse() )
    .enter().append( "g" )
      .attr( "transform", ( d, i ) => "translate(" + i*70 + ",450)" );
  
  legend.append( "circle" )
    .attr( "class", "legend" )
    .attr("cx",( d, i ) => iwidth - ( i * 150 - 25 )).attr("cy",25).attr("r",10)
    .attr( "fill", z )
  
  legend.append( "text" )
    .attr( "x", ( d, i ) => iwidth - ( i * 150 -10) )
    .attr( "y", 25 )
    .attr( "dy", "0.5em" )
    .text( d => d ).style("font-size","8px").style('font-weight',"bold");
  
  return svg.node();



}




function second(){

var svg = d3.select( "svg.d" ),
    margin = { top: 50, right: 30, bottom: 70, left: 80 },
    iwidth = +svg.attr( "width" ) - margin.left - margin.right,
    iheight = +svg.attr( "height" ) - margin.top - margin.bottom,
    g = svg.append( "g" ).attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

d3.csv('https://raw.githubusercontent.com/miguelfeijoo/IncautacionesColombia2018/master/DATOS/INCAUTACIONES_DEPARTAMENTO.csv', function ( d ) {
  return {
    'DEPARTAMENTO': d[ 'DEPARTAMENTO' ],
    'BASE DE COCA': +d[ 'BASE DE COCA' ],
    'BASUCO': +d[ 'BASUCO' ],
    'COCAINA': d[ 'COCAINA' ],
    'HEROINA': +d[ 'HEROINA' ],
    'MARIHUANA': +d[ 'MARIHUANA' ]
    
  };
} ).then(function(incautaciones_depto_sitio_mes){


  d3.select("#depto").on("change", function(){
                depto = this.value;

 grafica(depto,incautaciones_depto_sitio_mes,svg)



})})
  
  
}


second();