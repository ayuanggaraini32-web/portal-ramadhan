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
        // Fallback data Jakarta sample
        const fallbackData = [
          {tanggal: '1 Ramadhan', date: '2025-02-28', imsak: '04:20', subuh: '04:30', dzuhur: '12:00', ashar: '15:15', maghrib: '18:00', isya: '19:15'},
          {tanggal: '2 Ramadhan', date: '2025-03-01', imsak: '04:19', subuh: '04:29', dzuhur: '12:00', ashar: '15:16', maghrib: '18:01', isya: '19:16'},
          {tanggal: '3 Ramadhan', date: '2025-03-02', imsak: '04:18', subuh: '04:28', dzuhur: '12:01', ashar: '15:17', maghrib: '18:02', isya: '19:17'},
          {tanggal: '4 Ramadhan', date: '2025-03-03', imsak: '04:17', subuh: '04:27', dzuhur: '12:01', ashar: '15:18', maghrib: '18:03', isya: '19:18'},
          {tanggal: '5 Ramadhan', date: '2025-03-04', imsak: '04:16', subuh: '04:26', dzuhur: '12:02', ashar: '15:19', maghrib: '18:04', isya: '19:19'}
        ];
        renderTable(fallbackData);
        errorElement.classList.remove('hidden');
        errorElement.innerHTML = '<i class="fas fa-database mr-2"></i>Menggunakan data contoh Jakarta (API offline)';
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

