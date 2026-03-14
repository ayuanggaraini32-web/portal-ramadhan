# 🌙 Ramadhan Portal - Project Page Ramadhan Ayu

[![Ramadhan Portal](https://img.shields.io/badge/Status-Production-Green?style=flat-square&logo=github)](https://github.com/ayuanggaraini32-web/portal-ramadhan)

**Pusat lengkap informasi & tools ibadah Ramadhan** • Mobile Responsive • Live API Jadwal Sholat • 8 Fitur Utama

## 🚀 Live Demo
```
GitHub Pages: https://ayuanggaraini32-web.github.io/portal-ramadhan/
Netlify deploy: Drag folder to netlify.com
```

## ✨ Fitur Lengkap

| Fitur | Deskripsi | Link |
|-------|-----------|------|
| **Jadwal Imsakiyah** | Live API jadwal sholat 20+ kota Indonesia (myquran.com) + offline fallback | [misi5](misi5/index.html) |
| **Doa Harian** | Doa sahur, buka puasa, harian lengkap Arab/Latin/arti | [misi1](misi1/doa-harian.html) |
| **Hitung Zikir** | Digital counter target dzikir interaktif | [misi2](misi2/index.html) |
| **Kalkulator Zakat** | Zakat penghasilan & emas (Tailwind UI) | [misi3](misi3/index.html) |
| **Ramadhan Tracker** | Progress salat/Quran/puasa harian | [misi4](misi4/index.html) |
| **Gallery Momen** | Visual Ramadhan + animasi floating | [gallery](misi1/gallery.html) |
| **Dashboard** | Summary & deployment status | [misi6](misi6/index.html) |

## 📱 Optimasi & Tech Stack
- **Performance**: Preload fonts/icons, DNS prefetch, theme-color PWA, API fallback
- **Design**: Custom CSS Ramsay colors (Green/Gold/Cream), backdrop-blur, CSS Grid/Flexbox
- **Responsive**: Mobile-first, media queries 992/768/480px
- **Cross-browser**: Modern CSS (Safari/Chrome/Firefox/Edge)
- **CDNs**: Google Fonts (Amiri/Outfit), FontAwesome 6.4, Tailwind (misi3)
- **Live Data**: myquran.com API sholat

## 🏃‍♂️ Cara Menjalankan (Local)
1. Download/unzip project
2. `double-click index.html` or `live-server` / `python -m http.server`
3. Open [http://localhost:8000](http://localhost:8000)

**Mobile Test**: Chrome DevTools → Toggle device toolbar

## ☁️ Deployment (Produksi)
### GitHub Pages (Recommended)
```bash
git add .
git commit -m "Final: Ramadhan Portal ready LIVE"
git push origin main
# Settings → Pages → Source: Deploy from branch main → Save
```
Live: `https://ayuanggaraini32-web.github.io/portal-ramadhan`

### Netlify (Drag & Drop)
1. netlify.com → New site from Git or drag project folder
2. Auto-deploy on git push

## 📊 Testing Results
| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | ✅ | ✅ | Pass |
| Firefox | ✅ | ✅ | Pass |
| Safari | ✅ | ✅ | Pass |
| Edge | ✅ | ✅ | Pass |

**Lighthouse Score Expected**: 95+ Performance (preload, small JS/CSS)

## 🎨 Design Inspiration
Ramsay Islamic theme: `--primary: #1B3B18` (Deep Green), `--secondary: #D4AF37` (Gold)

## 📝 Changelog
- Misi1-5: Complete features
- Optimasi: Preloads, fallback, responsive
- Misi6: Integration dashboard
- Deployment-ready: GitHub Pages/Netlify

**Project by Ayu Anggaraini** • 1446 H / 2026 M • [GitHub](https://github.com/ayuanggaraini32-web/portal-ramadhan)

