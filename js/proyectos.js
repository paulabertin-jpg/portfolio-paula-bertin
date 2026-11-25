/* ==========================================================
   PROYECTOS.JS — abre y cierra las filas del índice y maneja
   los carruseles de fotos.
   ========================================================== */

const filas = document.querySelectorAll('.proy-fila');

function abrir(fila, abierta) {
    const panel = document.getElementById(fila.getAttribute('aria-controls'));
    fila.setAttribute('aria-expanded', abierta);
    fila.querySelector('.col-signo').textContent = abierta ? '–' : '+';
    panel.hidden = !abierta;
}

filas.forEach((fila) => {
    fila.addEventListener('click', () => {
        const estabaAbierta = fila.getAttribute('aria-expanded') === 'true';
        // solo un proyecto abierto a la vez
        filas.forEach((otra) => abrir(otra, false));
        if (!estabaAbierta) {
            abrir(fila, true);
            fila.closest('.proy').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// El primer proyecto arranca abierto
if (filas.length) abrir(filas[0], true);

// ---------- Carruseles ----------
document.querySelectorAll('.carrusel').forEach((carrusel) => {
    const pista = carrusel.querySelector('.carrusel-pista');
    const slides = carrusel.querySelectorAll('.carrusel-slide');
    const ant = carrusel.querySelector('.carrusel-ant');
    const sig = carrusel.querySelector('.carrusel-sig');
    const num = carrusel.querySelector('.carrusel-num');
    const epigrafe = carrusel.querySelector('.carrusel-epigrafe');

    function actual() {
        // si el panel está cerrado, el carrusel mide 0: estamos en la primera
        if (!pista.clientWidth) return 0;
        const i = Math.round(pista.scrollLeft / pista.clientWidth);
        return Math.min(Math.max(i, 0), slides.length - 1);
    }

    function actualizar() {
        const i = actual();
        num.textContent = i + 1;
        epigrafe.textContent = slides[i].querySelector('figcaption').textContent;
        ant.disabled = i === 0;
        sig.disabled = i === slides.length - 1;
    }

    function ir(i) {
        i = Math.min(Math.max(i, 0), slides.length - 1);
        pista.scrollTo({ left: i * pista.clientWidth });
    }

    ant.addEventListener('click', () => ir(actual() - 1));
    sig.addEventListener('click', () => ir(actual() + 1));
    pista.addEventListener('scroll', () => requestAnimationFrame(actualizar));

    // flechas del teclado cuando el carrusel tiene el foco
    carrusel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') ir(actual() + 1);
        if (e.key === 'ArrowLeft') ir(actual() - 1);
    });

    actualizar();
});
