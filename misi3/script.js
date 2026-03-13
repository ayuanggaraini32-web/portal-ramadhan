<script>
        // Navbar
document.getElementById('navbarToggle').addEventListener('click', function() {
            document.getElementById('navbarMenu').classList.toggle('active');
        });
        
        // Calculator Logic
        const els = {
            zakatType: document.getElementById('zakatType'),
            goldPrice: document.getElementById('goldPrice'),
            income: document.getElementById('income'),
            goldWeight: document.getElementById('goldWeight'),
            calcBtn: document.getElementById('calcBtn'),
formPenghasilan: document.getElementById('penghasilanGroup'),
            formEmas: document.getElementById('emasGroup'),
            resultSection: document.getElementById('resultSection'),
            totalHarta: document.getElementById('totalHarta'),
            nisabValue: document.getElementById('nisabValue'),
            statusBadge: document.getElementById('statusBadge'),
            zakatResult: document.getElementById('zakatResult'),
            zakatAmount: document.getElementById('zakatAmount')
        };
        
        els.zakatType.addEventListener('change', toggleForms);
        els.calcBtn.addEventListener('click', calculateZakat);
        
        function toggleForms() {
            const type = els.zakatType.value;
            if (type === 'penghasilan') {
                els.formPenghasilan.classList.remove('hidden');
                els.formEmas.classList.add('hidden');
            } else {
                els.formPenghasilan.classList.add('hidden');
                els.formEmas.classList.remove('hidden');
            }
            els.resultSection.style.display = 'none';
        }
        
        function formatRupiah(num) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
        }
        
        function calculateZakat() {
            const type = els.zakatType.value;
            const goldPrice = parseFloat(els.goldPrice.value.replace(/[^\d]/g, '')) || 0;
            
            if (goldPrice <= 0) {
                alert('Masukkan harga emas yang valid');
                return;
            }
            
            const nisab = goldPrice * 85; // 85 gram
            let totalHarta;
            
            if (type === 'penghasilan') {
                totalHarta = parseFloat(els.income.value.replace(/[^\d]/g, '')) || 0;
            } else {
                totalHarta = (parseFloat(els.goldWeight.value) || 0) * goldPrice;
            }
            
            els.totalHarta.textContent = formatRupiah(totalHarta);
            els.nisabValue.textContent = formatRupiah(nisab);
            
            if (totalHarta >= nisab) {
                const zakat = totalHarta * 0.025;
                els.statusBadge.textContent = 'WAJIB ZAKAT';
                els.statusBadge.className = 'status-wajib px-4 py-2 rounded-full font-bold inline-block';
                els.zakatResult.style.display = 'block';
                els.zakatAmount.textContent = formatRupiah(zakat);
            } else {
                els.statusBadge.textContent = 'BELUM NISAB';
                els.statusBadge.className = 'status-belum px-4 py-2 rounded-full font-bold inline-block';
                els.zakatResult.style.display = 'none';
            }
            
            els.resultSection.style.display = 'block';
            els.resultSection.scrollIntoView({ behavior: 'smooth' });
        }
    </script>