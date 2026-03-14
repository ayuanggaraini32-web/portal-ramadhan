// ============================================================
// STATE
// ============================================================
const TODAY = new Date();
const dateKey = () => TODAY.toISOString().slice(0, 10);
const dk = dateKey();

function load(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// Ramadhan 2025 starts March 1, 2025 (1446 H)
const RAMADHAN_START = new Date('2025-03-01');
function getRamadhanDay() {
  const diff = Math.floor((TODAY - RAMADHAN_START) / 86400000) + 1;
  return Math.max(1, Math.min(30, diff));
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

// ============================================================
// SHALAT
// ============================================================
let salatData = load('shalat_' + dk, {subuh:false, dzuhur:false, ashar:false, maghrib:false, isya:false});

function initShalat() {
  document.querySelectorAll('#prayerList .prayer-item').forEach(el => {
    const key = el.dataset.key;
    if (salatData[key]) el.classList.add('checked');
  });
  updateShalatUI();
}

function togglePrayer(el) {
  const key = el.dataset.key;
  salatData[key] = !salatData[key];
  el.classList.toggle('checked', salatData[key]);
  updateShalatUI();
}

function updateShalatUI() {
  const keys = Object.keys(salatData);
  const done = keys.filter(k => salatData[k]).length;
  const pct = Math.round((done / keys.length) * 100);
  document.getElementById('shalatPct').textContent = pct + '%';
  document.getElementById('shalatBar').style.width = pct + '%';
  const st = document.getElementById('shalatStatus');
  if (pct === 0) { st.className='status-badge low'; st.textContent='Belum ada salat yang dicatat'; }
  else if (pct <= 40) { st.className='status-badge low'; st.textContent='Belum optimal, jangan ditunda ya'; }
  else if (pct < 100) { st.className='status-badge mid'; st.textContent='Cukup baik! Lengkapi lagi...'; }
  else { st.className='status-badge high'; st.textContent='Masyallah, salat lengkap!'; }
  updateSummary();
}

function saveShalat(btn) {
  save('shalat_' + dk, salatData);
  flashSave(btn);
  showToast('✅ Salat tersimpan!');
}

// ============================================================
// QURAN
// ============================================================
let quranData = load('quran_' + dk, {target:0, read:0, done:false});

function initQuran() {
  if (quranData.target) document.getElementById('quranTarget').value = quranData.target;
  if (quranData.read) document.getElementById('quranRead').value = quranData.read;
  if (quranData.done) document.getElementById('quranDoneToggle').classList.add('done');
  calcQuran();
}

function calcQuran() {
  const t = parseInt(document.getElementById('quranTarget').value) || 0;
  const r = parseInt(document.getElementById('quranRead').value) || 0;
  quranData.target = t; quranData.read = r;
  document.getElementById('quranDisplay').textContent = (r||'—') + ' / ' + (t||'—');
  const pct = t > 0 ? Math.min(100, Math.round((r / t) * 100)) : 0;
  document.getElementById('quranPct').textContent = pct + '%';
  document.getElementById('quranBar').style.width = pct + '%';
  const st = document.getElementById('quranStatus');
  if (t === 0) { st.className='status-badge low'; st.textContent='Masukkan target dan halaman dibaca'; }
  else if (pct < 50) { st.className='status-badge low'; st.textContent='Masih bisa ditambah, semangat!'; }
  else if (pct < 100) { st.className='status-badge mid'; st.textContent='Hampir selesai, sedikit lagi!'; }
  else { st.className='status-badge high'; st.textContent='Masyallah! Target tercapai!'; }
  updateSummary();
}

function toggleQuranDone() {
  quranData.done = !quranData.done;
  document.getElementById('quranDoneToggle').classList.toggle('done', quranData.done);
  updateSummary();
}

function saveQuran(btn) {
  save('quran_' + dk, quranData);
  flashSave(btn); showToast('✅ Bacaan Quran tersimpan!');
}

// ============================================================
 // PUASA CHECKLIST (1-30 Hari)
 // ============================================================
let puasaData = load('puasa_all', Array(30).fill(false));
const ramDay = getRamadhanDay() - 1;

function initPuasa() {
  document.getElementById('ramadhanDay').textContent = ramDay + 1;
  buildPuasaList();
  updatePuasaUI();
}

function buildPuasaList() {
  const list = document.getElementById('puasaList');
  list.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const li = document.createElement('li');
    li.className = 'puasa-item';
    li.dataset.day = i + 1;
    li.onclick = () => togglePuasa(li);
    li.innerHTML = `
      <div class="puasa-checkbox"><i class="fas fa-check"></i></div>
      <div class="puasa-details">
        <div class="puasa-name">Hari ke-${i+1}</div>
        <div class="puasa-arabic">يَوْم ${i+1}</div>
      </div>
      ${i+1 === ramDay ? '<div class="today-badge"><i class="fas fa-star"></i> Hari Ini</div>' : ''}
    `;
    if (puasaData[i]) li.classList.add('checked');
    list.appendChild(li);
  }
}

function togglePuasa(el) {
  const day = parseInt(el.dataset.day) - 1;
  puasaData[day] = !puasaData[day];
  el.classList.toggle('checked', puasaData[day]);
  updatePuasaUI();
}

function updatePuasaUI() {
  const done = puasaData.filter(Boolean).length;
  const pct = Math.round((done / 30) * 100);
  document.getElementById('puasaPct').textContent = done + ' / 30 (' + pct + '%)';
  document.getElementById('puasaBar').style.width = pct + '%';
  const st = document.getElementById('puasaStatus');
  if (done === 0) {
    st.className = 'status-badge low';
    st.textContent = 'Semangat berpuasa hari 1!';
  } else if (pct < 50) {
    st.className = 'status-badge low';
    st.textContent = 'Terus jaga puasa, ' + done + '/30 hari! 💪';
  } else if (pct < 100) {
    st.className = 'status-badge mid';
    st.textContent = 'Luar biasa! ' + done + '/30 hari tercapai! ✨';
  } else {
    st.className = 'status-badge high';
    st.textContent = 'Masyallah! 30 hari puasa sempurna! 🌙';
  }
  updateSummary();
}

function savePuasa(btn) {
  save('puasa_all', puasaData);
  flashSave(btn);
  showToast('✅ Checklist puasa tersimpan!');
}

// ============================================================
// DZIKIR
// ============================================================
const dzikirKeys = ['subhanallah','alhamdulillah','allahua','istighfar','shalawat','taawudz'];
let dzikirData = load('dzikir_' + dk, Object.fromEntries(dzikirKeys.map(k => [k, false])));

function initDzikir() {
  document.querySelectorAll('#dzikirList .dzikir-item').forEach(el => {
    if (dzikirData[el.dataset.key]) el.classList.add('checked');
  });
  updateDzikirUI();
}

function toggleDzikir(el) {
  const key = el.dataset.key;
  dzikirData[key] = !dzikirData[key];
  el.classList.toggle('checked', dzikirData[key]);
  updateDzikirUI();
}

function updateDzikirUI() {
  const total = dzikirKeys.length;
  const done = dzikirKeys.filter(k => dzikirData[k]).length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('dzikirPct').textContent = pct + '%';
  document.getElementById('dzikirBar').style.width = pct + '%';
  const st = document.getElementById('dzikirStatus');
  if (pct === 0) { st.className='status-badge low'; st.textContent='Mulai dzikirmu pagi ini'; }
  else if (pct < 50) { st.className='status-badge low'; st.textContent='Mulai tumbuh, lanjutkan!'; }
  else if (pct < 100) { st.className='status-badge mid'; st.textContent='Hampir lengkap, sedikit lagi!'; }
  else { st.className='status-badge high'; st.textContent='Masyallah! Dzikir hari ini lengkap!'; }
  updateSummary();
}

function saveDzikir(btn) {
  save('dzikir_' + dk, dzikirData);
  flashSave(btn); showToast('✅ Dzikir tersimpan!');
}

// ============================================================
// GLOBAL SUMMARY
// ============================================================
function updateSummary() {
  const salatKeys = ['subuh','dzuhur','ashar','maghrib','isya'];
  const salatDone = salatKeys.filter(k => salatData[k]).length / salatKeys.length;
  const quranT = quranData.target || 0;
  const quranR = quranData.read || 0;
  const quranProg = quranT > 0 ? Math.min(1, quranR / quranT) : 0;
  const puasaDone = todayFasted ? 1 : 0;
  const dzikirDone = dzikirKeys.filter(k => dzikirData[k]).length / dzikirKeys.length;
  const overall = Math.round(((salatDone + quranProg + puasaDone + dzikirDone) / 4) * 100);

  document.getElementById('summaryPct').textContent = overall + '%';
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (overall / 100) * circumference;
  document.getElementById('circleProgress').style.strokeDashoffset = offset;

  const st = document.getElementById('summaryStatus');
  if (overall === 0) st.textContent = 'Bismillah, mulai ibadahmu 🌙';
  else if (overall < 30) st.textContent = 'Awali dengan niat yang kuat 💪';
  else if (overall < 60) st.textContent = 'Terus semangat, ' + overall + '% tercapai! ✨';
  else if (overall < 100) st.textContent = 'Masyallah, hampir sempurna! 🌟';
  else st.textContent = 'Alhamdulillah, hari yang sempurna! 🎉';
}

function initSummaryDate() {
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const dateStr = TODAY.toLocaleDateString('id-ID', opts);
  document.getElementById('summaryDate').textContent = '📅 ' + dateStr + ' · Hari ke-' + getRamadhanDay();
}

// ============================================================
// UTILS
// ============================================================
function flashSave(btn) {
  btn.classList.add('saved');
  btn.textContent = '✓ Tersimpan!';
  setTimeout(() => { btn.classList.remove('saved'); btn.textContent = btn.dataset.orig || btn.textContent.replace('✓ Tersimpan!', btn.dataset.orig); }, 2000);
}

let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2500);
}

// Store original btn text
document.querySelectorAll('.btn-save').forEach(btn => btn.dataset.orig = btn.textContent);

// ============================================================
// INIT
// ============================================================
initShalat();
initQuran();
initPuasa();
initDzikir();
initSummaryDate();
updateSummary();

// Fix circle progress circumference
document.getElementById('circleProgress').style.strokeDasharray = (2 * Math.PI * 26).toFixed(2);
