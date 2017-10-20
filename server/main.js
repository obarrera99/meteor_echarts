import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    if (Juegos.find().count() === 0) {
        //jugador alfa
        Juegos.insert({
            semana:"semana 1",
            jugador:'alfa',
            ganados:1,
            perdidos:5,
            empatados:1,
            total_juegos:7,
            puntuacion:123
        });
        Juegos.insert({
            semana:"semana 2",
            jugador:'alfa',
            ganados:8,
            perdidos:2,
            empatados:0,
            total_juegos:10,
            puntuacion:230
        });
        Juegos.insert({
            semana:"semana 3",
            jugador:'alfa',
            ganados:5,
            perdidos:0,
            empatados:1,
            total_juegos:6,
            puntuacion:300
        });
        Juegos.insert({
            semana:"semana 4",
            jugador:'alfa',
            ganados:2,
            perdidos:0,
            empatados:1,
            total_juegos:3,
            puntuacion:100
        });

        //jugador Beta
        Juegos.insert({
            semana:"semana 1",
            jugador:'beta',
            ganados:3,
            perdidos:2,
            empatados:0,
            total_juegos:5,
            puntuacion:133
        });
        Juegos.insert({
            semana:"semana 2",
            jugador:'beta',
            ganados:3,
            perdidos:2,
            empatados:1,
            total_juegos:6,
            puntuacion:170
        });
        Juegos.insert({
            semana:"semana 3",
            jugador:'beta',
            ganados:1,
            perdidos:0,
            empatados:2,
            total_juegos:3,
            puntuacion:50
        });
        Juegos.insert({
            semana:"semana 4",
            jugador:'beta',
            ganados:3,
            perdidos:2,
            empatados:0,
            total_juegos:5,
            puntuacion:210
        });
    };
});
