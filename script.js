gsap.registerPlugin(ScrollTrigger);

// Gunakan window.load untuk memastikan seluruh halaman dan layout siap sebelum ScrollTrigger dihitung
window.addEventListener("load", () => {
    // Inisialisasi Ikon Lucide
    lucide.createIcons();

    // --- Animasi Page 1 (Hero) ---
    const heroTl = gsap.timeline();
    heroTl.from(".section-hero .big-text", { opacity: 0, x: -50, duration: 1, ease: "power3.out" })
          .from(".section-hero .gradient-text", { opacity: 0, x: 50, duration: 1, ease: "power3.out" }, "-=0.7")
          .from(".section-hero .small-impact", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
          .from(".scroll-hint", { opacity: 0, duration: 1 });

    // --- Animasi Page 2 (Cards) ---
    gsap.from(".section-cards .title, .section-cards .subtitle", {
        scrollTrigger: { trigger: ".section-cards", start: "top 70%", scroller: ".container", toggleActions: "play none none reverse" },
        opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: "power2.out"
    });

    // Menggunakan gsap.to karena di CSS initial state sudah opacity: 0
    gsap.to(".section-cards .card", {
        scrollTrigger: { trigger: ".section-cards", start: "top 75%", scroller: ".container", toggleActions: "play none none reverse" },
        opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "back.out(1.5)"
    });

    // --- Animasi Page 3 (Global Stats Chart) ---
    gsap.from(".stats-title, .stats-subtitle, .footer-note", {
        scrollTrigger: { trigger: ".section-stats", start: "top 60%", scroller: ".container" },
        opacity: 0, y: 30, stagger: 0.2, duration: 0.8
    });

    // Animasi Bar Chart Page 3 (General .bar class)
    gsap.utils.toArray(".section-stats .bar").forEach((bar) => {
        const targetWidthStr = bar.getAttribute("data-width");
        const targetWidthValue = parseFloat(targetWidthStr);
        // Jika lebar < 15%, pindahkan label ke luar
        if (targetWidthValue < 15) { bar.classList.add("label-outside"); }

        gsap.to(bar, {
            scrollTrigger: { trigger: ".section-stats", start: "top 60%", scroller: ".container" },
            width: targetWidthStr, duration: 1.5, ease: "power2.out", delay: 0.1
        });
    });

    // --- Animasi Page 4 (Transition "Better yet...") ---
    gsap.to(".transition-text", {
        scrollTrigger: {
            trigger: ".section-transition",
            start: "top 60%",
            scroller: ".container",
            toggleActions: "play none none reverse"
        },
        opacity: 1, duration: 1.2, ease: "power2.inOut"
    });

    // --- Animasi Page 5 (UK Areas Chart) ---
    gsap.from(".uk-title", {
        scrollTrigger: { trigger: ".section-uk-areas", start: "top 60%", scroller: ".container" },
        opacity: 0, y: 30, duration: 0.8
    });

    // Animasi Muncul Card Box
    gsap.to(".card-box", {
        scrollTrigger: { trigger: ".section-uk-areas", start: "top 70%", scroller: ".container" },
        opacity: 1, duration: 1, ease: "power2.out"
    });

    // Animasi Bar Chart Page 5 (Specific .chart-uk .bar)
    gsap.utils.toArray(".chart-uk .bar").forEach((bar) => {
        const targetWidthStr = bar.getAttribute("data-width");
        const targetWidthValue = parseFloat(targetWidthStr);
        
        // Logika label luar juga diterapkan di sini
        if (targetWidthValue < 15) { bar.classList.add("label-outside"); }

        gsap.to(bar, {
            scrollTrigger: { 
                trigger: ".section-uk-areas", 
                start: "top 60%", 
                scroller: ".container"
            },
            width: targetWidthStr, 
            duration: 1.5, 
            ease: "power2.out", 
            delay: 0.3 // Delay sedikit setelah card muncul
        });
    });

    // --- Animasi Page 6 (Imagine Cards) ---
    gsap.to(".imagine-card", {
        scrollTrigger: {
            trigger: ".section-imagine",
            start: "top 60%",
            scroller: ".container",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });

    // --- Animasi Page 7 (Final Text) ---
    gsap.from(".final-text", {
        scrollTrigger: {
            trigger: ".section-final",
            start: "top 70%",
            scroller: ".container"
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out"
    });

    // Penyesuaian Bar Page 5 (Barnet ke bawah hampir sama lebarnya)
    // Dihitung berdasarkan persentase relatif terhadap Ceredigion (£70.98M)
    // Barnet (£45.08M) = ~63%, Mole Valley (£40.24M) = ~56%
    // Kita set data-width agar visualnya akurat
    const barsPage5 = document.querySelectorAll('.chart-uk .bar');
    const values = [90, 63, 62, 61.8, 61.5, 59, 56]; // Persentase visual proporsional

    barsPage5.forEach((bar, index) => {
        bar.setAttribute('data-width', values[index] + '%');
    });

    // Refresh ScrollTrigger setelah semua setup selesai
    ScrollTrigger.refresh();
});