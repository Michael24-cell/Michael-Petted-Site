// Michael Petted Acting Studio — shared behavior (menu, footer year, mobile CTA)
(function () {
    // --- Mobile menu toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (menuBtn && menu) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.addEventListener('click', function () {
            const isOpen = !menu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Footer copyright year ---
    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // --- Sticky mobile CTA bar ---
    const path = window.location.pathname;
    if (!/(privacy|terms)(\.html)?\/?$/.test(path)) {
        const onSchedule = /schedule(\.html)?\/?$/.test(path);
        const bar = document.createElement('div');
        bar.className = 'mobile-cta-bar';
        bar.innerHTML =
            '<p class="cta-label"><strong>First visit is free</strong>Wednesdays 7–11 PM, Hudson Theatre</p>' +
            (onSchedule
                ? '<a class="cta-btn" href="mailto:mpettedstudio@gmail.com?subject=Free%20Visit%20Request">Schedule a Free Visit</a>'
                : '<a class="cta-btn" href="schedule.html">Schedule a Free Visit</a>');
        document.body.appendChild(bar);
        document.body.classList.add('has-mobile-cta');

        let ticking = false;
        function updateBar() {
            ticking = false;
            bar.classList.toggle('is-visible', window.scrollY > 480);
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateBar);
            }
        }, { passive: true });
        updateBar();
    }
})();
