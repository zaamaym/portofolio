// 1. Logika Navbar & Hamburger
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// 2. Scroll Reveal Effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// 🌟 UPDATE: Logika Count Up dengan Kecepatan Konstan (Angka kecil selesai duluan)
const statSection = document.getElementById('statistics');
const statNumbers = document.querySelectorAll('.stat-number');
let hasCounted = false;

const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            
            statNumbers.forEach(stat => {
                const originalText = stat.innerText;
                const targetNumber = parseInt(originalText.replace(/\D/g, ''));
                const suffix = originalText.replace(/\d/g, ''); 
                
                let currentNumber = 0;
                
                // --- LOGIKA BARU: Kecepatan Konstan ---
                // Kita tentukan tiap "angka" butuh waktu 30ms.
                // Jadi 10 selesai dlm 300ms, 100 selesai dlm 3000ms.
                const speed = 30; 

                const updateCounter = () => {
                    // Penambahan konstan biar adil
                    currentNumber += Math.max(1, targetNumber / 50); 
                    
                    if (currentNumber < targetNumber) {
                        stat.innerText = Math.ceil(currentNumber) + suffix;
                        setTimeout(updateCounter, speed);
                    } else {
                        stat.innerText = targetNumber + suffix;
                        // Efek Pop Membesar + Bounce
                        stat.classList.add('bounce');
                        setTimeout(() => stat.classList.remove('bounce'), 800);
                    }
                };
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

if (statSection) countUpObserver.observe(statSection);


// 4. Tilt Effect (Efek miring saat disentuh mouse)
document.querySelectorAll('section').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let x = (e.offsetX - card.offsetWidth / 2) / 40; // Diperhalus dikit miringnya
        let y = (card.offsetHeight / 2 - e.offsetY) / 40;
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// 5. Update Tahun Otomatis
document.getElementById('current-year').textContent = new Date().getFullYear();

// 🌟 6. NEW: Interaktivitas File Explorer (Filter Kategori)
const filterItems = document.querySelectorAll('#filter-menu li');
const fileItems = document.querySelectorAll('.file-item');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Hapus warna biru dari semua menu sidebar
        filterItems.forEach(li => li.classList.remove('active'));
        // Kasih warna biru ke menu yang baru aja diklik
        item.classList.add('active');

        // Ambil kategori dari folder yang diklik (contoh: "web", "iot", "all")
        const filterValue = item.getAttribute('data-filter');

        // Cek satu-satu file/project yang ada di sebelah kanan
        fileItems.forEach(file => {
            // Sembunyiin semua file dulu biar bisa dikasih animasi muncul lagi
            file.style.display = 'none';
            file.classList.remove('show-file');

            // Kalau filternya "all" ATAU kategorinya cocok, tampilin!
            if (filterValue === 'all' || file.getAttribute('data-category') === filterValue) {
                // Dikasih delay dikit (50ms) biar efek animasi "Pop" nya jalan mulus
                setTimeout(() => {
                    file.style.display = 'block';
                    file.classList.add('show-file');
                }, 50);
            }
        });
    });
});
// 🌟 7. NEW: Interactive Pop Feedback (Opsi 2: Squish & Pop)
document.querySelectorAll('.glass-badge').forEach(badge => {
    // Saat klik dilepas (mouse up) atau sentuhan berakhir (touchend)
    const triggerPop = function() {
        this.classList.remove('pop-effect');
        void this.offsetWidth; // Reset animasi
        this.classList.add('pop-effect');
    };

    badge.addEventListener('mouseup', triggerPop);
    badge.addEventListener('touchend', triggerPop);
});
