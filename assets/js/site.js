document.documentElement.classList.add('js-ready');

// Repositionne précisément les ancres après les changements de mise en page
// provoqués par le chargement des images, des polices et des autres ressources.
(function () {
    if (!window.location.hash) return;

    let anchorId;
    try { anchorId = decodeURIComponent(window.location.hash.slice(1)); }
    catch { anchorId = window.location.hash.slice(1); }
    if (!anchorId) return;

    let target = document.getElementById(anchorId);
    if (!target) return;

    let stopped = false;
    let scheduled = false;
    let observer = null;

    function stopCorrection() {
        stopped = true;
        if (observer) observer.disconnect();
    }

    function alignAnchor() {
        if (stopped) return;
        target = document.getElementById(anchorId);
        if (!target) return;

        const offset = target.getBoundingClientRect().top;
        if (Math.abs(offset) < 1) return;

        const html = document.documentElement;
        const previousBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, window.scrollY + offset);
        html.style.scrollBehavior = previousBehavior;
    }

    function scheduleAlignment() {
        if (stopped || scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(function () {
            scheduled = false;
            alignAnchor();
        });
    }

    // Première correction, puis nouvelle vérification une fois les ressources chargées.
    scheduleAlignment();
    window.addEventListener('load', scheduleAlignment, { once: true });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleAlignment).catch(function () {});
    }

    // Les images situées avant la cible peuvent encore modifier sa position,
    // notamment lorsqu'elles sont chargées de manière différée.
    if ('ResizeObserver' in window) {
        observer = new ResizeObserver(scheduleAlignment);
        observer.observe(document.body);
        window.setTimeout(stopCorrection, 6000);
    }

    // Ne jamais reprendre la main si le visiteur commence à naviguer lui-même.
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (eventName) {
        window.addEventListener(eventName, stopCorrection, { once: true, passive: true });
    });
})();