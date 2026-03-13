document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navbar
    const toggleBtn = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    toggleBtn.addEventListener('click', () => menu.classList.toggle('active'));

    // Elements
    const zakatType = document.getElementById('zakatType');
    const incomeGroup = document.getElementById('penghasilanGroup');
    const emasGroup = document.getElementById('emasGroup');
    const goldPrice = document.getElementById('goldPrice');
    const income = document.getElementById('income');
    const goldWeight = document.getElementById('goldWeight');
    const calcBtn = document.getElementById('calcBtn');
    const resultSection = document.getElementById('resultSection');

    // Format currency
    const formatRupiah = (num) => 'Rp ' + Math.round(num).toLocaleString('id-ID');

    // Reset forms
    const resetForms = () => {
        income.value = '';
        goldWeight.value = '';
    };

    // Form switch
    zakatType.addEventListener('change', function() {
        resetForms();
        resultSection.style.display = 'none';
        if (this.value === 'emas') {
            incomeGroup.classList.add('hidden');
            emasGroup.classList.remove('hidden');
        } else {
            incomeGroup.classList.remove('hidden');
            emasGroup.classList.add('hidden');
        }
    });

    // Calculation
    calcBtn.addEventListener('click', function() {
        const price = parseFloat(goldPrice.value) || 0;
        const inc = parseFloat(income.value) || 0;
        const weight = parseFloat(goldWeight.value) || 0;
        const type = zakatType.value;

        // Validation
        if (!price) return alert('Masukkan harga emas!');
        if (type === 'penghasilan' && !inc) return alert('Masukkan penghasilan!');
        if (type === 'emas' && !weight) return alert('Masukkan berat emas!');

        const nisab = price * 85; // 85 gram
        const harta = type === 'penghasilan' ? inc : (weight * price);

        // Update UI
        document.getElementById('totalHarta').textContent = formatRupiah(harta);
        document.getElementById('nisabValue').textContent = formatRupiah(nisab);
        resultSection.style.display = 'block';

        const badge = document.getElementById('statusBadge');
        const zakatBox = document.getElementById('zakatResultBox');
        const amount = document.getElementById('zakatAmount');

        if (harta >= nisab) {
            const zakat = harta * 0.025;
            badge.textContent = '✅ WAJIB ZAKAT';
            badge.className = 'status-badge status-wajib';
            zakatBox.style.display = 'block';
            amount.textContent = formatRupiah(zakat);
        } else {
            badge.textContent = '⏳ BELUM NISAB';
            badge.className = 'status-badge status-belum';
            zakatBox.style.display = 'none';
        }

        resultSection.scrollIntoView({ behavior: 'smooth' });
    });
});
