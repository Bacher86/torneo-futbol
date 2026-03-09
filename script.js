const form = document.getElementById('futbolForm');

// Guardar datos
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoJugador = {
            nombre: document.getElementById('nombre').value,
            puntos: parseInt(document.getElementById('puntos').value),
            pj: document.getElementById('pj').value,
            goles: document.getElementById('goles').value
        };

        let jugadores = JSON.parse(localStorage.getItem('tablaFutbol')) || [];
        jugadores.push(nuevoJugador);
        
        // Ordenar por puntos de mayor a menor
        jugadores.sort((a, b) => b.puntos - a.puntos);
        
        localStorage.setItem('tablaFutbol', JSON.stringify(jugadores));
        alert('Jugador guardado!');
        form.reset();
    });
}

// Cargar datos en la tabla
if (document.getElementById('tablaCuerpo')) {
    const tabla = document.getElementById('tablaCuerpo');
    const jugadores = JSON.parse(localStorage.getItem('tablaFutbol')) || [];

    jugadores.forEach(j => {
        const fila = `<tr>
            <td>${j.nombre}</td>
            <td>${j.puntos}</td>
            <td>${j.pj}</td>
            <td>${j.goles}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}