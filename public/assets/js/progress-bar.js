document.addEventListener("DOMContentLoaded", () => {

    const bars = document.querySelectorAll(".progress-fill");

    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const target = Number(bar.dataset.progress);

            const value = bar
                .closest(".campaign-progress")
                .querySelector(".progress-value");

            // Animate the bar once
            bar.style.width = target + "%";

            // Animate the percentage
            const duration = 2200;
            const startTime = performance.now();

            function update(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.round(eased * target);

                value.textContent = currentValue + "%";

                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    value.textContent = target + "%";

                }

            }

            requestAnimationFrame(update);

            // Prevent replay when scrolling back
            observer.unobserve(bar);

        });

    }, {

        threshold: 0.5

    });

    bars.forEach(bar => observer.observe(bar));

});