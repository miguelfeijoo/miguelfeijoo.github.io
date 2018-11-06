Proyecto desarrollado por: MIGUEL ALFONSO FEIJOO GARCÍA
NOMBRE: "El CACAO ha sido desde el 2010 una materia prima de importación a Colombia por varios países a nivel global. Ciertos departamentos del Territorio Nacional han hecho parte de la actividad económica del CACAO. ¿En qué repercute esto?"
FECHA DE ACTUALIZACIÓN:   30/10/2018

Slides: https://docs.google.com/presentation/d/1RFTqgSmSNMpZ08bcLncRhyuAGWvKExLi14U5Bab6mwY/edit?usp=sharing

El principal objetivo de este ejercicio es lograr en el usuario la localización de relaciones o caminos por importaciones de Cacao o Chocolate en Colombia desde el año 2010 hasta el pasado Abril del 2018. De esta forma, a partir de los datos obtenidos de Datos Abiertos Colombianos - Agricultura y Desarrollo Rural, respecto a las importaciones de Cacao, se plantea una red en la que los nodos sean representaciones de los departamentos y países (discriminados por color), y los enlaces representacioens de la actividad de importación de esta materia prima. De esta forma, la tarea global indentificada, de acuerdo al framework de Tamara Munzner es la de EXPLORE TOPOLOGY y LOCATE PATHS para la identificación de patrones de comportamiento de la actividad de importación entre países y departamentos del territorio nacional.


Para correrlo, ingresar a la URL:   https://miguelfeijoo.github.io/Importaciones2018/

Una vez ingresado al link, se encuentra la red planteada como visualziación, en la que se puede interactuar respecto a las fuerzas planteadas (movimiento versus relación), obtención de información específica por Departamento o País y hciendo SCROLL-DOWN se puede encontrar el contexto, abstrcción y hallazgos preliminares, descritos en la documentación planteada. La visualización se presenta en la parte superior de la página. 


Por otro lado, para el pre-procesamiento de la información, se llevó a cabo utilizando PANDAS con PYTHON. De allí se obtuvo la información respectiva que se utilizó como datasets en las visualizaciones. Particularmente, se llevó a cabo un preprocesamiento del archivo excel extraído de Datos Abiertos Colombianos (datos.gov.co) para así convertirlo en un JSON que relacione NODOS y LINKS.



SCREENSHOT: https://raw.githubusercontent.com/miguelfeijoo/miguelfeijoo.github.io/master/Importaciones2018/ImportacionesCacao2018.jpg

Video:
https://www.youtube.com/watch?v=twZG_4TUhck
