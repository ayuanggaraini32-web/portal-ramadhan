const elements = {
    zakatType: document.getElementById('zakatType'),
    formPenghasilan: document.getElementById('formPenghasilan'),
    formEmas: document.getElementById('formEmas'),
    goldPrice: document.getElementById('goldPrice'),
    income: document.getElementById('income'),
    otherIncome: document.getElementById('otherIncome'),
    goldWeight: document.getElementById('goldWeight'),
    btnCalculate: document.getElementById('btnCalculate'),
    resultBox: document.getElementById('resultBox'),
    resTotal: document.getElementById('resTotal'),
    resNisab: document.getElementById('resNisab'),
    resZakat: document.getElementById('resZakat'),
    resStatus: document.getElementById('resStatus'),
    notObligatedNote: document.getElementById('notObligatedNote')
};

// Event Listeners
elements.zakatType.addEventListener('change', handleTypeChange);
elements.btnCalculate.addEventListener('click', performCalculation);

// Change Form View
function handleTypeChange() {
    const type = elements.zakatType.value;
    elements.resultBox.style.display = 'none';

    if (type === 'penghasilan') {
        elements.formPenghasilan.classList.remove('hidden');
        elements.formEmas.classList.add('hidden');
    } else {
        elements.formPenghasilan.classList.add('hidden');
        elements.formEmas.classList.remove('hidden');
    }
}

// Currency Formatter
function formatIDR(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Validation
function validateGoldPrice() {
    const goldPrice = parseFloat(elements.goldPrice.value);
    if (!goldPrice || goldPrice <= 0) {
        alert('Silakan masukkan harga emas hari ini.');
        return null;
    }
    return goldPrice;
}

function getPenghasilanTotal() {
    const income = parseFloat(elements.income.value) || 0;
    const other = parseFloat(elements.otherIncome.value) || 0;

    if (income === 0 && other === 0) {
        alert('Silakan isi nominal penghasilan.');
        return null;
    }

    return income + other;
}

function getEmasTotal(goldPrice) {
    const weight = parseFloat(elements.goldWeight.value) || 0;

    if (weight <= 0) {
        alert('Silakan isi berat emas.');
        return null;
    }

    return weight * goldPrice;
}

// Main Calculation Logic
function performCalculation() {
    const type = elements.zakatType.value;
    const goldPrice = validateGoldPrice();

    if (!goldPrice) return;

    const nisab = goldPrice * 85; // 85 gram emas
    let totalHarta;

    if (type === 'penghasilan') {
        totalHarta = getPenghasilanTotal();
    } else {
        totalHarta = getEmasTotal(goldPrice);
    }

    if (totalHarta === null) return;

    const isObligated = totalHarta >= nisab;
    const zakat = isObligated ? totalHarta * 0.025 : 0; // 2.5%

    renderResults(totalHarta, nisab, zakat, isObligated);
}

// Update UI
function renderResults(total, nisab, zakat, isObligated) {
    elements.resTotal.innerText = formatIDR(total);
    elements.resNisab.innerText = formatIDR(nisab);
    elements.resZakat.innerText = formatIDR(zakat);

    if (isObligated) {
        elements.resStatus.innerText = "WAJIB ZAKAT";
        elements.resStatus.className = "px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black";
        elements.notObligatedNote.classList.add('hidden');
    } else {
        elements.resStatus.innerText = "BELUM NISAB";
        elements.resStatus.className = "px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black";
        elements.notObligatedNote.classList.remove('hidden');
    }

    elements.resultBox.style.display = 'block';

    if (window.innerWidth < 1024) {
        elements.resultBox.scrollIntoView({ behavior: 'smooth' });
    }
}

