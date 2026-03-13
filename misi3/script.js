document.addEventListener('DOMContentLoaded', function() {
    // 1. Elemen Navbar Mobile
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    // 2. Elemen Form & Input
    const zakatType = document.getElementById('zakatType');
    const incomeGroup = document.getElementById('penghasilanGroup');
    const emasGroup = document.getElementById('emasGroup');
    const goldPriceInput = document.getElementById('goldPrice');
    const incomeInput = document.getElementById('income');
    const goldWeightInput = document.getElementById('goldWeight');
    const calcBtn = document.getElementById('calcBtn');
    
    // 3. Elemen Hasil
    const resultSection = document.getElementById('resultSection');
    const totalHartaText = document.getElementById('totalHarta');
    const nisabValueText = document.getElementById('nisabValue');
    const statusBadge = document.getElementById('statusBadge');
    const zakatResultBox = document.getElementById('zakatResultBox');
    const zakatAmountText = document.getElementById('zakatAmount');

    // Set Default Harga Emas
    if (goldPriceInput) goldPriceInput.value = 1250000;

    // Fungsi Format Rupiah
    const formatIDR = (num) => "Rp " + Math.round(num).toLocaleString('id-ID');

    // 4. Logika Ganti Tipe Zakat
    if (zakatType) {
        zakatType.addEventListener('change', function() {
            if (this.value === 'emas') {
                incomeGroup.classList.add('hidden');
                emasGroup.classList.remove('hidden');
            } else {
                incomeGroup.classList.remove('hidden');
                emasGroup.classList.add('hidden');
            }
            // Sembunyikan hasil saat ganti kategori
            zakatResultBox.style.display = 'none';
            statusBadge.textContent = '';
        });
    }

    // 5. Logika Perhitungan
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            const goldPrice = parseFloat(goldPriceInput.value) || 0;
            const income = parseFloat(incomeInput.value) || 0;
            const goldWeight = parseFloat(goldWeightInput.value) || 0;
            const type = zakatType.value;

            // Validasi Dasar
            if (goldPrice <= 0) {
                alert("Mohon masukkan harga emas yang valid.");
                return;
            }

            // Hitung Nisab (85 gram emas)
            const nisabEmas = 85;
            const nisabRupiah = goldPrice * nisabEmas;
            
            // Hitung Total Harta
            let totalHarta = (type === 'penghasilan') ? income : (goldWeight * goldPrice);

            if (totalHarta <= 0) {
                alert("Mohon masukkan jumlah penghasilan atau berat emas.");
                return;
            }

            // Update Teks Hasil
            totalHartaText.textContent = formatIDR(totalHarta);
            nisabValueText.textContent = formatIDR(nisabRupiah);

            // Cek Kewajiban Zakat
            if (totalHarta >= nisabRupiah) {
                const wajibBayar = totalHarta * 0.025; // 2.5%
                
                statusBadge.textContent = "✅ WAJIB ZAKAT";
                statusBadge.className = "status-badge status-wajib";
                statusBadge.style.padding = "10px 20px";
                statusBadge.style.borderRadius = "12px";
                statusBadge.style.display = "inline-block";
                
                zakatResultBox.style.display = 'block';
                zakatAmountText.textContent = formatIDR(wajibBayar);
            } else {
                statusBadge.textContent = "⏳ BELUM WAJIB ZAKAT";
                statusBadge.className = "status-badge status-belum";
                statusBadge.style.padding = "10px 20px";
                statusBadge.style.borderRadius = "12px";
                statusBadge.style.display = "inline-block";
                
                zakatResultBox.style.display = 'none';
            }

            // Scroll otomatis ke hasil (untuk Mobile)
            resultSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});