// Inisialisasi Ikon
lucide.createIcons();

// Registrasi Plugin GSAP
gsap.registerPlugin(ScrollTrigger);

// --- Animasi Page 1 (Muncul saat pertama kali buka) ---
const heroTl = gsap.timeline();
heroTl.from(".section-hero .big-text", { 
    opacity: 0, 
    x: -50, 
    duration: 1, 
    ease: "power3.out" 
})
.from(".section-hero .gradient-text", { 
    opacity: 0, 
    x: 50, 
    duration: 1, 
    ease: "power3.out" 
}, "-=0.7")
.from(".section-hero .small-impact", { 
    opacity: 0, 
    y: 20, 
    duration: 0.8 
}, "-=0.5")
.from(".scroll-hint", { 
    opacity: 0, 
    duration: 1 
});

// Animasi kartu di Page 2
gsap.registerPlugin(ScrollTrigger);

// Pastikan semua aset dan DOM sudah siap
window.addEventListener("load", () => {
    
    gsap.to(".section-cards .card", {
        scrollTrigger: {
            trigger: ".section-cards",
            start: "top 80%",      // Memicu saat section cards 20% masuk ke layar
            scroller: ".container", // HARUS SAMA dengan class div yang punya overflow-y: scroll
            markers: false,         // Ubah jadi true jika ingin melihat garis bantuan
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        onStart: () => console.log("Animasi kartu dimulai!")
    });

    // Refresh ScrollTrigger agar menghitung ulang posisi setelah halaman termuat sempurna
    ScrollTrigger.refresh();
});



// --- Animasi Page 3 (Chart Animation) ---
gsap.utils.toArray(".bar").forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    
    gsap.to(bar, {
        scrollTrigger: {
            trigger: ".section-stats",
            start: "top 40%",
            scroller: ".container"
        },
        width: targetWidth,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2
    });
});

// Animasi Fade In untuk Teks Judul Page 3
gsap.from(".stats-title, .stats-subtitle", {
    scrollTrigger: {
        trigger: ".section-stats",
        start: "top center",
        scroller: ".container"
    },
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 1
});

// --- Animasi Page 3 (Chart Animation) dengan deteksi lebar ---
gsap.utils.toArray(".bar").forEach((bar) => {
    const targetWidthStr = bar.getAttribute("data-width");
    const targetWidthValue = parseFloat(targetWidthStr); // Ambil angka saja (misal 6 dari "6%")
    
    // Logika: Jika lebar kurang dari 20%, pindahkan label ke luar
    if (targetWidthValue < 20) {
        bar.classList.add("label-outside");
    }

    gsap.to(bar, {
        scrollTrigger: {
            trigger: ".section-stats",
            start: "top 40%",
            scroller: ".container"
        },
        width: targetWidthStr,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2
    });
});