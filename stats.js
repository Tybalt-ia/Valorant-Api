import * as modulos from "./funciones/funciones.js";


modulos.tablaAgentes('contenedorAgents',modulos.statsAgentes , 'Number of Agents by category')
modulos.stats('contenedorWR',modulos.weaponsFiltrado, 'Weapons ranking')
modulos.statsCategory('contenedorWC',modulos.weaponsFiltrado,'Weapons statistics by category' )
modulos.statsRegions('contenedorMapas',modulos.statsMapas, 'Number of Regions in Super Regions on Each Map')
