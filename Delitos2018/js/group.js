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


            	console.log(data)
            
            

            
			}





)}

first();