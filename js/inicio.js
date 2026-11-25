/* ==========================================================
   INICIO.JS — las imágenes de la portada siguen al mouse
   Cada imagen tiene una "profundidad": las más profundas se
   mueven más, y eso genera el efecto de capas.
   ========================================================== */

const flotantes = document.querySelectorAll('.flotante');
const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let objetivoX = 0, objetivoY = 0;   // hacia dónde va el mouse
let actualX = 0, actualY = 0;       // posición suavizada

if (!quieto && flotantes.length) {
    window.addEventListener('mousemove', (e) => {
        // posición del mouse respecto del centro de la pantalla (-0.5 a 0.5)
        objetivoX = e.clientX / window.innerWidth - 0.5;
        objetivoY = e.clientY / window.innerHeight - 0.5;
    });

    function animar() {
        // se acerca de a poco al objetivo para que el movimiento sea suave
        actualX += (objetivoX - actualX) * 0.06;
        actualY += (objetivoY - actualY) * 0.06;

        flotantes.forEach((el) => {
            const p = parseFloat(el.dataset.profundidad);
            const x = -actualX * p * window.innerWidth;
            const y = -actualY * p * window.innerHeight;
            el.style.setProperty('--mx', x.toFixed(1) + 'px');
            el.style.setProperty('--my', y.toFixed(1) + 'px');
        });

        requestAnimationFrame(animar);
    }

    animar();
}
