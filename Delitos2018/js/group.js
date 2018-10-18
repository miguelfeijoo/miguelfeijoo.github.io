function first(){

                    
              d3.merge(await Promise.all(["df_homicidios_total",'df_amenazas_total','df_delSexuales_total'].map(name => d3.csv(`https://raw.githubusercontent.com/miguelfeijoo/miguelfeijoo.github.io/master/Delitos2018/data/processed/${name}.csv`, d => {
  const date = parseDate(d["Fecha"]);
  
  return {name: name.split("_")[1], date, value: +d["CantidadTotal"]};
})))).then(function(data){



            console.log(data)
            

            
			}





)}

first();