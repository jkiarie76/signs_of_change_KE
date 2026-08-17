document.addEventListener("DOMContentLoaded", () => {

    const bars = document.querySelectorAll(".progress-fill");

    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const target = Number(bar.dataset.progress);

            if (Number.isNaN(target)) return;

            /*
             * Support both:
             * - Advocacy preview
             * - Advocacy detail page
             */

            const container =
                bar.closest(".campaign-progress") ||
                bar.closest(".advocacy-detail-progress");

            if (!container) return;

            const value =
                container.querySelector(".progress-value") ||
                container.querySelector("[data-progress-value]");

            if (!value) return;

            // Start at 0
            bar.style.width = "0%";

            const duration = 2200;
            const startTime = performance.now();

            function update(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased =
                    1 - Math.pow(1 - progress, 3);

                const currentValue =
                    Math.round(eased * target);

                bar.style.width =
                    currentValue + "%";

                value.textContent =
                    currentValue + "%";

                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    bar.style.width =
                        target + "%";

                    value.textContent =
                        target + "%";

                }

            }

            requestAnimationFrame(update);

            // Prevent replay
            observer.unobserve(bar);

        });

    }, {
        threshold: 0.3
    });


    bars.forEach((bar) => {

        observer.observe(bar);

    });

});