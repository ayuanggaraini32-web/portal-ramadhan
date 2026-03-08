/**
 * Jadwal Imsakiyah Ramadhan
 * Menggunakan API dari https://api.myquran.com/v2/sholat
 */

// DOM Elements
const citySelect = document.getElementById('city');
const tableBody = document.querySelector('#imsakiyahTable tbody');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

// Get current year and month
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

/**
 * Fetch jadwal imsakiyah from API
 * @param {string} cityId - ID kota untuk mengambil jadwal
 */
async function fetchJadwal(cityId) {
    // Show loading, hide error
    loadingElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
    tableBody.innerHTML = '';

    try {
        const response = await fetch(
            `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${currentYear}/${currentMonth}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === true) {
            renderTable(data.data.jadwal);
        } else {
            throw new Error('API returned error status');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        errorElement.classList.remove('hidden');
        errorElement.textContent = 'Gagal memuat data. Silakan coba lagi atau pilih kota lain.';
    } finally {
        loadingElement.classList.add('hidden');
    }
}

/**
 * Render jadwal to table
 * @param {Array} jadwal - Array of jadwal objects
 */
function renderTable(jadwal) {
    tableBody.innerHTML = '';

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    jadwal.forEach((item) => {
        const row = document.createElement('tr');
        
        // Check if this row is today
        if (item.date === today) {
            row.classList.add('today');
        }

        row.innerHTML = `
            <td>${item.tanggal}</td>
            <td>${item.imsak}</td>
            <td>${item.subuh}</td>
            <td>${item.dzuhur}</td>
            <td>${item.ashar}</td>
            <td>${item.maghrib}</td>
            <td>${item.isya}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Event Listener: Dropdown city change
citySelect.addEventListener('change', (e) => {
    const cityId = e.target.value;
    fetchJadwal(cityId);
});

// Initial load - fetch data for default city (Jakarta)
document.addEventListener('DOMContentLoaded', () => {
    fetchJadwal(citySelect.value);
});

