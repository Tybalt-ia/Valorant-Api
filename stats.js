import * as modulos from "./modulosH.js";


modulos.tablaAgentes('contenedorAgents',modulos.statsAgentes , 'Agents by category')
modulos.stats('contenedorWR',modulos.weaponsFiltrado, 'Weapons ranking')
modulos.statsCategory('contenedorWC',modulos.weaponsFiltrado,'Weapons statistics by category' )
modulos.statsRegions('contenedorMapas',modulos.statsMapas, 'Number of Regions in Super Regions on Each Map')
