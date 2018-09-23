function first(){
//d3 = require("d3", "d3-svg-legend");
var cantidad_incautaciones_mes=d3.csv('data/CANTIDAD_INCAUTADA.csv', function ( d ) {
  return {
    'MES': d[ 'MES' ],
    'BASE DE COCA': +d[ 'BASE DE COCA' ],
    'BASUCO': +d[ 'BASUCO' ],
    'COCAINA': +d[ 'COCAINA' ],
    'HEROINA': +d[ 'HEROINA' ],
    'MARIHUANA': +d[ 'MARIHUANA' ]
    
  };
} );

console.log("pepeeeeee    " +cantidad_incautaciones_mes.then(function(data) {
    console.log('all is complted', data);
}))


var svg = d3.select( 'body' ),
    margin = { top: 50, right: 30, bottom: 30, left: 80 },
    iwidth = +svg.attr( "width" ) - margin.left - margin.right,
    iheight = +svg.attr( "height" ) - margin.top - margin.bottom,
    g = svg.append( "g" ).attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );
  
  let tooltip = g.append("text")
        .style("font-size", "10pt")
        .style("font-family", "sans-serif")  
        .style("color", "steelblue")
        .attr("x", -100);
  let tooltip2 = g.append("text")
        .style("font-size", "10pt")
        .style("font-family", "sans-serif")  
        .style("color", "steelblue")
        .attr("x", -100);
  
  var x0 = d3.scaleBand()
    .rangeRound( [ 0, iwidth ] )
    .paddingInner( 0.3 );
  
  var x1 = d3.scaleBand()
    .padding( 0.05 );

  var y = d3.scaleLinear()
    .rangeRound( [ iheight, 0 ] );

  var rectangle = svg.append("rect").attr("id","rectangle")
                            .attr("x", iwidth-380)
                            .attr("y", iheight-400)
                            .attr("width", 430)
                            .attr("height", 30)
                            .style("fill","none")
                            .style('stroke','black');
     
  var keys = cantidad_incautaciones_mes.then(function(data) {data.columns.slice( 1 )});
  
  var colors=["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];

var n = 6;
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
shuffle(colors);
  
  var z = d3.scaleOrdinal( colors.slice(0,n));
    
  x0.domain( cantidad_incautaciones_mes.then(function(data) {data.map( d => d[ 'MES' ] )} ));
  x1.domain( keys ).rangeRound( [ 0, x0.bandwidth() ] );
  y.domain( [ 0, d3.max( cantidad_incautaciones_mes.then(function(data) {data}), function(d) { return d3.max( keys, function( key ) { return d[ key ]; } ); } ) ] ).nice();
  
  g.append( "g" )
    .selectAll( "g" )
    .data( cantidad_incautaciones_mes.then(function(data) {data}) )
    .enter().append( "g" )
      .attr( "transform", d => "translate(" + x0( d[ 'MES' ] ) + ",0)" )
    .selectAll( "rect" )
    .data( function( d ) { return keys.map( function( key ) {  return { key: key, value: d[ key ] }; } ); } )
    .enter().append( "rect" )
      .attr( "class", "bar" ).style("stroke-weigth",10).style("stroke","black")
      .attr( "x", d => x1( d.key ) )
      .attr( "y", d => y( d.value ) )
      .attr( "width", x1.bandwidth())
      .attr( "height", d => iheight - y( d.value ) )
      .attr( "fill", d => z( d.key ) )
      .on("mouseover", function( d ) {  
    
      
       
        tooltip.attr("x", iwidth-360)
        .attr("y", iheight-400)
        .html(`Se registraron ${parseInt(d.value).toLocaleString()} GRAMOS incautados ese mes`)
        .style('font-weight',"bold").style("fill", "firebrick").style("font-size",'12px');
    
        tooltip2.attr("x", iwidth-360)
        .attr("y", iheight-385)
        .html(`Estupefaciente Incautado: ${d.key}`)
        .style('font-weight',"bold").style("fill", "firebrick").style("font-size",'12px');
    
            
        d3.select( "svg" ).selectAll( "rect.bar" )
          .select( function( di ) { return di.key !== d.key ? this : null ; } )
          .transition()
             .style( "opacity", "0.2" );
        
        var line = d3.line()
          .x( dj => x0( dj[ 'MES' ] ) + x1( d.key ) + ( x1.bandwidth() / 2 ) )
          .y( dj => y( dj[ d.key ] ) );
    
        g.append( "path" )
          .datum( cantidad_incautaciones_mes.then(function(data) {data}) )
          .attr( "class", "line" )
          .attr( "fill", "none" )
          .attr( "stroke", 'black' )
          .attr( "stroke-width", 3 )
          .attr( "d", line );
         
        g.selectAll( "circle" )
          .data( cantidad_incautaciones_mes.then(function(data) {data}) ).enter()   
          .append( "circle" )
            .attr( "cx", dj => x0( dj[ 'MES' ] ) + x1( d.key ) + ( x1.bandwidth() / 2 ) )
            .attr( "cy",  dj => y( dj[ d.key ] ) )
            .attr( "r", 4 )
            .attr( "class", "circle" )
            .attr( "fill", 'black' )
            .attr( "stroke", "black" );
        } )         
      .on( "mouseout", function( d ) {    
        
        
        d3.select( "svg" ).selectAll( "rect" )
          .select( function( di ) { console.log(di.key);return di.key !== d.key ? this : null ; } )
          .transition()
          .style( "opacity", "1" );
         
        tooltip.text("") .transition()
        .duration(300)
        tooltip2.text("") .transition()
        .duration(300)
        svg.selectAll( ".line" ).remove()
        svg.selectAll( "circle.circle" ).remove()
      } );
  
  g.append( "g" )
      .attr( "class", "axis" )
      .attr( "transform", "translate(0," + iheight + ")" )
      .call( d3.axisBottom( x0 ) );
  
  g.append( "g" )
      .attr( "class", "axis" )
      .call( d3.axisLeft( y ).ticks( null, ".0f" ) )
    .append( "text" )
      .attr( "x", 2 )
      .attr( "y", y( y.ticks().pop() ) + 0.5 )
      .attr( "dy", "0.32em" )
      .attr( "fill", "#000" )
      .attr( "font-weight", "bold" )
      .attr( "text-anchor", "start" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 8 )
      .text( "Estupefacientes Incautados por Mes" )
      .attr("transform", "rotate(-90) translate(-200,0)")
      .style("font-size",11)
      .attr("y", 10);
  

  keys.then(function(data){

     console.log("AAAAAA    "+ data)
  })

  var legend = svg.append( "g" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 12 )
      .attr( "text-anchor", "end" )
      .selectAll( "g" )
      .data( keys.slice().reverse() ).enter().append( "g" )
      .attr( "transform", ( d, i ) => "translate(" + i*70 + ",10)" );
  
  legend.append( "circle" )
    .attr( "class", "legend" )
    .attr("cx",( d, i ) => iwidth - ( i * 150 - 25 )).attr("cy",25).attr("r",10)
    .attr( "fill", z );
  
  legend.append( "text" )
    .attr( "x", ( d, i ) => iwidth - ( i * 150 -10) )
    .attr( "y", 25 )
    .attr( "dy", "0.5em" )
    .text( d => d ).style("font-size","8px").style('font-weight',"bold");
  
  return svg.node();
}

first();