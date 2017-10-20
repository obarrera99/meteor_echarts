import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
var echarts = require('echarts/lib/echarts');
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/lines';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/title';

Template.postsList.rendered=function(){
    Tracker.autorun(function() {
        dibuja_grafica_uno();
        dibuja_grafica_dos();
        dibuja_grafica_tres();
    });
};

//Esquemas de las graficas
dibuja_grafica_uno=function(){
    var grafica1 = document.getElementById('grafica1');
    var myChart1 = echarts.init(grafica1, 'dark');
    var datos=DatosGraficaUno();
    option = {
        title : {
            text: 'Juegos del Usuario Alfa',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {type : 'shadow'}
        },
        legend: {data:[]},
        toolbox: {
            show : true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, title: 'Datos',readOnly: true,lang: ['Datos', 'Salir', 'Actualizar']},
                magicType : {show: true, title: { line: 'Lineal',bar: 'Barras',stack:'Apilar', tiled:'Desapilar'},type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true,title:'Recargar'},
                saveAsImage : {show: true,title: 'Descargar'}
            }
        },
        calculable : true,
        xAxis : [{
            type : 'category',
            data : []
        }
                ],
        yAxis : [{ type : 'value'}],
        series : []
    };
    option.legend.data=datos.legend;
    option.xAxis[0].data=datos.xAxis;
    option.series=datos.series;
    myChart1.setOption(option);
    window.onresize = function() {
        myChart1.resize();
    };
}

dibuja_grafica_dos=function(){
    var grafica2 = document.getElementById('grafica2');
    var myChart2 = echarts.init(grafica2, 'macarons');
    var datos=DatosGraficaDos();
    option = {
        title : {
            text: 'Porcentajes por Usuario',
            subtext: 'Porcentaje de juego',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, title: 'Datos',readOnly: true,lang: ['Datos', 'Salir', 'Actualizar']},
                magicType : {
                    show: true, 
                    title: { pie: 'Pastel',funner: 'Embudo'},
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true,title:'Recargar'},
                saveAsImage : {show: true,title: 'Descargar'}
            }
        },
        calculable : true,
        series : []
    };
    option.legend.data=datos.legend;
    option.series=datos.series;
    myChart2.setOption(option);
    window.onresize = function() {
        myChart2.resize();
    };
}

dibuja_grafica_tres=function(){
    var grafica3 = document.getElementById('grafica3');
    var myChart3 = echarts.init(grafica3, 'roma');
    var datos=DatosGraficaTres();
    option = {
        title : {
            text: 'Puntuaciones',
            subtext: 'Puntuaciones por Semana de los Usuarios'
        },
        tooltip : {trigger: 'axis'},
        legend: {data:[]},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, title: 'Datos',readOnly: true,lang: ['Datos', 'Salir', 'Actualizar']},
                magicType : {show: true, title: { line: 'Lineal',bar: 'Barras',stack:'Apilar', tiled:'Desapilar'},type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true,title:'Recargar'},
                saveAsImage : {show: true,title: 'Descargar'}
            }
        },
        calculable : true,
        xAxis : [{
            type : 'category',
            boundaryGap : false,
            data : []
        }
                ],
        yAxis : [{type : 'value'}],
        series : []
    };
    option.legend.data=datos.legend;
    option.xAxis[0].data=datos.xAxis;
    option.series=datos.series;
    myChart3.setOption(option);
    window.onresize = function() {
        myChart3.resize();
    };
}


//PARTE LOGICA SE LLENAN LOS DATOS DE LAS GRAFICAS

function DatosGraficaUno(){
    var ganados=[];
    var perdidos=[];
    var empatados=[];
    var totales=[];

    var data=Juegos.find({jugador:"alfa"}).fetch();
    for (var i=0;i<Object.keys(data).length;i++){
        var ganado=data[i].ganados;
        var perdido=data[i].perdidos;
        var empatado=data[i].empatados;
        var total=data[i].total_juegos;

        ganados.push(ganado);
        perdidos.push(perdido);
        empatados.push(empatado);
        totales.push(total);
    }
    var result={
        legend:['Ganados','Perdidos','Empatados','Totales'],
        xAxis:['Semana 1','Semana 2','Semana 3','Semana 4'],
        series : [
            {
                name:'Ganados',
                type:'bar',
                data:ganados,
                markPoint: { data: [{ type: 'max', name: 'Max' } ] }
            },
            {
                name:'Perdidos',
                type:'bar',
                data:perdidos,
                markPoint: { data: [{ type: 'max', name: 'Max' } ] }
            },
            {
                name:'Empatados',
                type:'bar',
                data:empatados
            },
            {
                name:'Totales',
                type:'line',
                data:totales
            } 
        ]
    };
    return result;
}
function DatosGraficaDos(){
    var alfa_ganados=0;
    var alfa_perdidos=0;
    var alfa_empatados=0;

    var beta_ganados=0;
    var beta_perdidos=0;
    var beta_empatados=0;

    var data=Juegos.find({jugador:"alfa"}).fetch();
    for (var i=0;i<Object.keys(data).length;i++){
        alfa_ganados+=data[i].ganados;
        alfa_perdidos+=data[i].perdidos;
        alfa_empatados+=data[i].empatados;
    }    
    var data2=Juegos.find({jugador:"beta"}).fetch();
    for (var i=0;i<Object.keys(data2).length;i++){
        beta_ganados+=data2[i].ganados;
        beta_perdidos+=data2[i].perdidos;
        beta_empatados+=data2[i].empatados;
    }

    var result={
        legend:['Ganados','Perdidos','Empatados'],
        series : [
            {
                name:'alfa',
                type:'pie',
                radius : '45%',
                center: ['30%', '60%'],
                data:[
                    {value:alfa_ganados, name:'Ganados', itemStyle: {normal:{ color:'#52a860'}}},
                    {value:alfa_perdidos, name:'Perdidos',itemStyle: { normal: { color:'#f21a1a' }}},
                    {value:alfa_empatados, name:'Empatados',itemStyle: { normal: { color:'#c2f226' }}}
                ]
            },
            {
                name:'beta',
                type:'pie',
                radius : '45%',
                center: ['70%', '60%'],
                data:[
                    {value:beta_ganados, name:'Ganados', itemStyle: {normal:{ color:'#52a860'}}},
                    {value:beta_perdidos, name:'Perdidos',itemStyle: { normal: { color:'#f21a1a' }}},
                    {value:beta_empatados, name:'Empatados',itemStyle: { normal: { color:'#c2f226' }}}
                ]
            }           
        ]
    };
    return result;
}
function DatosGraficaTres(){
    var alfa=[];
    var beta=[];

    var data=Juegos.find({jugador:"alfa"}).fetch();
    for (var i=0;i<Object.keys(data).length;i++){
        alfa.push(data[i].puntuacion);
    }    
    var data2=Juegos.find({jugador:"beta"}).fetch();
    for (var i=0;i<Object.keys(data2).length;i++){
        beta.push(data2[i].puntuacion);
    }

    var result={
        legend:['Alfa','Beta'],
        xAxis:['Semana 1','Semana 2','Semana 3','Semana 4'],
        series : [
            {
                name:'Alfa',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:alfa
            },
            {
                name:'Beta',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:beta
            }          
        ]
    };
    return result;
}