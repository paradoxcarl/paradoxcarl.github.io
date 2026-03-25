// ===== SUPABASE CONFIG =====
// TODO: 替換成你的 Supabase URL 和 anon key
const SUPABASE_URL = https://eyggmroicartukfsnbbq.supabase.co;
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Z2dtcm9pY2FydHVrZnNuYmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MzIxMjgsImV4cCI6MjA5MDAwODEyOH0.IpMcIHdggP9Voh71fz5bRKOPW-iPcwK5sIAxVZVrrB4;


let supabase;
try {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch(e) {
  console.warn('Supabase not configured yet, using localStorage fallback');
  supabase = null;
}

// ===== DATA (景點) =====
const SPOTS = [
  {
    id: 1, category: 'tokyo', name: '淺草寺', nameJp: '浅草寺',
    emoji: '⛩️', bg: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    desc: '東京最古老的寺廟，充滿江戶風情，雷門大燈籠是必拍景點。',
    mapUrl: 'https://maps.google.com/?q=浅草寺+東京',
    tips: '推薦早晨前往，人少且氛圍絕佳'
  },
  {
    id: 2, category: 'tokyo', name: '新宿御苑', nameJp: '新宿御苑',
    emoji: '🌸', bg: 'linear-gradient(135deg, #ffc3a0, #ffafbd)',
    desc: '東京最大的公園，春季賞櫻聖地，花期約3月下旬至4月上旬。',
    mapUrl: 'https://maps.google.com/?q=新宿御苑+東京',
    tips: '4月初是賞染井吉野的最佳時機'
  },
  {
    id: 3, category: 'tokyo', name: '秋葉原', nameJp: '秋葉原',
    emoji: '🎮', bg: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    desc: '電器與動漫文化聖地，二次元愛好者的天堂，購物選擇豐富。',
    mapUrl: 'https://maps.google.com/?q=秋葉原+東京',
    tips: '週末熱鬧非凡，注意扒手'
  },
  {
    id: 4, category: 'kyoto', name: '伏見稻荷大社', nameJp: '伏見稲荷大社',
    emoji: '🦊', bg: 'linear-gradient(135deg, #f093fb, #f5576c)',
    desc: '千本鳥居震撼壯觀，是京都最具代表性的神社之一。',
    mapUrl: 'https://maps.google.com/?q=伏見稲荷大社+京都',
    tips: '凌晨或深夜前往可避開人潮'
  },
  {
    id: 5, category: 'kyoto', name: '嵐山竹林', nameJp: '嵐山竹林',
    emoji: '🎋', bg: 'linear-gradient(135deg, #d4fc79, #96e6a1)',
    desc: '翠綠竹林隨風搖曳，宛如仙境。附近有渡月橋與天龍寺。',
    mapUrl: 'https://maps.google.com/?q=嵐山竹林+京都',
    tips: '清晨前往光線最美，人也最少'
  },
  {
    id: 6, category: 'osaka', name: '道頓堀', nameJp: '道頓堀',
    emoji: '🦞', bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
    desc: '大阪最熱鬧的美食街，章魚燒、大阪燒、拉麵應有盡有。',
    mapUrl: 'https://maps.google.com/?q=道頓堀+大阪',
    tips: '必試自由軒咖哩飯和螃蟹本家'
  },
  {
    id: 7, category: 'osaka', name: '大阪城', nameJp: '大阪城',
    emoji: '🏯', bg: 'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    desc: '日本三名城之一，天守閣可俯瞰整個大阪市景。',
    mapUrl: 'https://maps.google.com/?q=大阪城',
    tips: '春季護城河旁的櫻花極美'
  },
  {
    id: 8, category: 'taipei', name: '九份老街', nameJp: '九份老街',
    emoji: '🏮', bg: 'linear-gradient(135deg, #fddb92, #d1fdff)',
    desc: '宮崎駿動畫靈感之地，夜晚紅燈籠點亮山城，如夢似幻。',
    mapUrl: 'https://maps.google.com/?q=九份老街+台灣',
    tips: '傍晚入夜燈籠亮起最美，週末人多建議平日前往'
  },
  {
    id: 9, category: 'taipei', name: '台北101', nameJp: '台北101',
    emoji: '🏙️', bg: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    desc: '台灣最高建築，夜景絕美。觀景台可360度俯瞰台北盆地。',
    mapUrl: 'https://maps.google.com/?q=台北101',
    tips: '傍晚時分上去可同時欣賞日落和夜景'
  }
];

// ===== WEATHER DATA =====
const WEATHER_DATA = [
  { city: '東京', cityJp: 'Tokyo', emoji: '⛅', temp: '18°C', desc: '多雲偶晴', humidity: '62%', wind: '北風 3m/s', season: '春暖花開' },
  { city: '京都', cityJp: 'Kyoto', emoji: '🌸', temp: '16°C', desc: '晴天賞花', humidity: '58%', wind: '東風 2m/s', season: '賞花最佳' },
  { city: '大阪', cityJp: 'Osaka', emoji: '🌤️', temp: '19°C', desc: '晴時多雲', humidity: '60%', wind: '南風 4m/s', season: '舒適宜人' },
  { city: '台北', cityJp: 'Taipei', emoji: '🌧️', temp: '24°C', desc: '午後雷陣雨', humidity: '78%', wind: '東北風 5m/s', season: '梅雨季節' }
];

// ===== JAPANESE PHRASES =====
const JAPANESE = [
  {
    category: '🙏 基本禮貌', phrases: [
      { jp: 'ありがとうございます', reading: 'Arigatou gozaimasu', zh: '非常感謝' },
      { jp: 'すみません', reading: 'Sumimasen', zh: '不好意思/抱歉' },
      { jp: 'よろしくお願いします', reading: 'Yoroshiku onegaishimasu', zh: '請多指教' },
      { jp: 'おはようございます', reading: 'Ohayou gozaimasu', zh: '早安' },
      { jp: 'こんにちは', reading: 'Konnichiwa', zh: '你好/午安' },
      { jp: 'こんばんは', reading: 'Konbanwa', zh: '晚安' },
    ]
  },
  {
    category: '🍜 餐廳點餐', phrases: [
      { jp: 'これをください', reading: 'Kore wo kudasai', zh: '請給我這個' },
      { jp: 'おすすめは何ですか？', reading: 'Osusume wa nan desu ka?', zh: '你們有什麼推薦？' },
      { jp: 'おいしい！', reading: 'Oishii!', zh: '好吃！' },
      { jp: 'お会計をお願いします', reading: 'Okaikei wo onegaishimasu', zh: '請結帳' },
      { jp: 'メニューを見せてください', reading: 'Menyuu wo misete kudasai', zh: '請給我看菜單' },
      { jp: 'アレルギーがあります', reading: 'Arerugii ga arimasu', zh: '我有過敏' },
    ]
  },
  {
    category: '🚄 交通問路', phrases: [
      { jp: '〜はどこですか？', reading: '〜wa doko desu ka?', zh: '〜在哪裡？' },
      { jp: '〜まで行きたいです', reading: '〜made ikitai desu', zh: '我想去〜' },
      { jp: 'この電車は〜に止まりますか？', reading: 'Kono densha wa 〜ni tomarimasu ka?', zh: '這班電車停〜嗎？' },
      { jp: '切符はどこで買えますか？', reading: 'Kippu wa doko de kaemasu ka?', zh: '在哪裡買票？' },
      { jp: 'タクシーを呼んでください', reading: 'Takushii wo yonde kudasai', zh: '請幫我叫計程車' },
    ]
  },
  {
    category: '🛍️ 購物殺價', phrases: [
      { jp: 'いくらですか？', reading: 'Ikura desu ka?', zh: '多少錢？' },
      { jp: '試着してもいいですか？', reading: 'Shichaku shite mo ii desu ka?', zh: '可以試穿嗎？' },
      { jp: '別のサイズはありますか？', reading: 'Betsu no saizu wa arimasu ka?', zh: '有其他尺寸嗎？' },
      { jp: 'クレジットカードは使えますか？', reading: 'Credit card wa tsukaemasu ka?', zh: '可以刷卡嗎？' },
      { jp: '免税できますか？', reading: 'Menzei dekimasu ka?', zh: '可以退稅嗎？' },
      { jp: '袋に入れてください', reading: 'Fukuro ni irete kudasai', zh: '請幫我裝袋' },
    ]
  },
  {
    category: '🏥 緊急狀況', phrases: [
      { jp: '助けてください！', reading: 'Tasukete kudasai!', zh: '請幫幫我！' },
      { jp: '救急車を呼んでください', reading: 'Kyuukyuusha wo yonde kudasai', zh: '請叫救護車' },
      { jp: '警察を呼んでください', reading: 'Keisatsu wo yonde kudasai', zh: '請叫警察' },
      { jp: '病院はどこですか？', reading: 'Byouin wa doko desu ka?', zh: '醫院在哪裡？' },
      { jp: '財布を盗まれました', reading: 'Saifu wo nusumaremashita', zh: '我的錢包被偷了' },
    ]
  }
];

// ===== STATE =====
let state = {
  trips: [],
  expenses: [],
  activeFilter: 'all',
  travelers: []
};

// ===== STORAGE HELPERS (with Supabase fallback to localStorage) =====
async function loadData() {
  if (supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    try {
      const { data: trips } = await supabase.from('trips').select('*').order('trip_date');
      const { data: expenses } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
      // remap DB column names back to frontend field names
      state.trips = (trips || []).map(t => ({ ...t, date: t.trip_date, time: t.trip_time }));
      state.expenses = (expenses || []).map(e => ({ ...e, date: e.expense_date }));
    } catch (e) {
      console.warn('Supabase load failed, using localStorage', e);
      loadFromLocalStorage();
    }
  } else {
    loadFromLocalStorage();
  }
}

function loadFromLocalStorage() {
  state.trips = JSON.parse(localStorage.getItem('travel_trips') || '[]');
  state.expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
}

async function saveTrip(trip) {
  if (supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    try {
      const payload = {
        title:     trip.title,
        trip_date: trip.date,
        trip_time: trip.time || null,
        location:  trip.location || null,
        note:      trip.note || null
      };
      const { data } = await supabase.from('trips').insert([payload]).select().single();
      if (data) return { ...data, date: data.trip_date, time: data.trip_time };
    } catch (e) { console.warn('Supabase saveTrip failed', e); }
  }
  trip.id = Date.now();
  state.trips.push(trip);
  localStorage.setItem('travel_trips', JSON.stringify(state.trips));
  return trip;
}

async function saveExpense(expense) {
  if (supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    try {
      const payload = {
        title:        expense.title,
        amount:       expense.amount,
        category:     expense.category || 'other',
        expense_date: expense.date || null,
        travelers:    expense.travelers || []
      };
      const { data } = await supabase.from('expenses').insert([payload]).select().single();
      if (data) return { ...data, date: data.expense_date };
    } catch (e) { console.warn('Supabase saveExpense failed', e); }
  }
  expense.id = Date.now();
  state.expenses.push(expense);
  localStorage.setItem('travel_expenses', JSON.stringify(state.expenses));
  return expense;
}

async function deleteExpense(id) {
  if (supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    try { await supabase.from('expenses').delete().eq('id', id); } catch (e) {}
  }
  state.expenses = state.expenses.filter(e => e.id !== id);
  localStorage.setItem('travel_expenses', JSON.stringify(state.expenses));
}

// ===== RENDER FUNCTIONS =====

function renderSpots(filter = 'all') {
  const grid = document.getElementById('spotsGrid');
  const filtered = filter === 'all' ? SPOTS : SPOTS.filter(s => s.category === filter);
  grid.innerHTML = filtered.map(spot => `
    <div class="spot-card" data-category="${spot.category}">
      <div class="spot-img" style="background: ${spot.bg}">${spot.emoji}</div>
      <div class="spot-body">
        <span class="spot-tag">${getCategoryName(spot.category)}</span>
        <div class="spot-name">${spot.name} <small style="font-size:12px;color:var(--text-light)">${spot.nameJp}</small></div>
        <div class="spot-desc">${spot.desc}</div>
        <div style="font-size:12px;color:var(--pink-500);margin-bottom:10px">💡 ${spot.tips}</div>
        <div class="spot-actions">
          <a class="spot-map-btn" href="${spot.mapUrl}" target="_blank" rel="noopener">
            📍 Google Maps
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryName(cat) {
  return { tokyo: '東京', kyoto: '京都', osaka: '大阪', taipei: '台北' }[cat] || cat;
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!state.trips.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✈️</div>尚未新增行程，開始規劃你的旅程吧！</div>`;
    return;
  }
  const sorted = [...state.trips].sort((a, b) => (a.date + a.time) > (b.date + b.time) ? 1 : -1);
  container.innerHTML = sorted.map(trip => `
    <div class="timeline-item">
      <div class="timeline-card">
        <div class="timeline-time">${trip.date} ${trip.time || ''}</div>
        <div class="timeline-title">${trip.title}</div>
        ${trip.note ? `<div class="timeline-note">${trip.note}</div>` : ''}
        ${trip.location ? `<span class="timeline-loc">📍 ${getCategoryName(trip.location)}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function renderWeather() {
  const grid = document.getElementById('weatherGrid');
  grid.innerHTML = WEATHER_DATA.map(w => `
    <div class="weather-card">
      <div class="weather-city">${w.city} <small style="font-size:12px;color:var(--text-light)">${w.cityJp}</small></div>
      <div class="weather-icon">${w.emoji}</div>
      <div class="weather-temp">${w.temp}</div>
      <div class="weather-desc">${w.desc}</div>
      <div class="weather-details">
        <span>💧 ${w.humidity}</span>
        <span>🌬️ ${w.wind}</span>
      </div>
      <span class="weather-season">${w.season}</span>
    </div>
  `).join('');
}

function renderJapanese() {
  const container = document.getElementById('japaneseCategories');
  container.innerHTML = JAPANESE.map((cat, ci) => `
    <div class="jp-category">
      <div class="jp-category-header">
        <h3>${cat.category}</h3>
      </div>
      <div class="jp-category-body">
        ${cat.phrases.map(p => `
          <div class="jp-phrase">
            <div>
              <div class="jp-jp">${p.jp}</div>
              <div class="jp-reading">${p.reading}</div>
            </div>
            <div class="jp-zh">${p.zh}</div>
            <button class="jp-play" onclick="speak('${p.jp}')" title="播放發音">🔊</button>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    showToast('🔊 正在播放發音...');
  } else {
    showToast('❌ 此裝置不支援語音播放');
  }
}

function renderExpenses() {
  const list = document.getElementById('expenseList');
  const icons = { food: '🍜', transport: '🚄', accommodation: '🏨', shopping: '🛍️', attraction: '🎡', other: '📦' };
  
  if (!state.expenses.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">💴</div>尚未記錄任何支出</div>`;
    return;
  }
  
  list.innerHTML = state.expenses.map(e => `
    <div class="expense-item">
      <div class="expense-icon">${icons[e.category] || '📦'}</div>
      <div class="expense-info">
        <div class="expense-title">${e.title}</div>
        <div class="expense-meta">${e.date || ''} · ${getCategoryLabel(e.category)}</div>
      </div>
      <div class="expense-amount">¥${Number(e.amount).toLocaleString()}</div>
      <button class="expense-delete" onclick="deleteExpenseItem(${e.id})">✕</button>
    </div>
  `).join('');

  // Update summary
  const total = state.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const travelerNames = getAllTravelers();
  const count = travelerNames.length || 1;
  
  document.getElementById('totalAmount').textContent = `¥${total.toLocaleString()}`;
  document.getElementById('perPersonAmount').textContent = `¥${Math.ceil(total / count).toLocaleString()}`;
  document.getElementById('travelerCount').textContent = `${count} 人`;

  renderSplitSummary(total, travelerNames);
}

function getAllTravelers() {
  const allNames = new Set();
  state.expenses.forEach(e => {
    if (e.travelers) {
      e.travelers.forEach(name => allNames.add(name.trim()));
    }
  });
  return [...allNames];
}

function renderSplitSummary(total, travelers) {
  const container = document.getElementById('splitSummary');
  if (!travelers.length) {
    container.innerHTML = '';
    return;
  }
  const perPerson = Math.ceil(total / travelers.length);
  container.innerHTML = `
    <h3>💰 分帳明細</h3>
    ${travelers.map(name => `
      <div class="split-row">
        <span class="split-name">👤 ${name}</span>
        <span class="split-amount">¥${perPerson.toLocaleString()}</span>
      </div>
    `).join('')}
    <div class="split-row" style="font-weight:600;color:var(--purple-600)">
      <span class="split-name">合計</span>
      <span class="split-amount">¥${total.toLocaleString()}</span>
    </div>
  `;
}

function getCategoryLabel(cat) {
  const labels = { food: '餐飲', transport: '交通', accommodation: '住宿', shopping: '購物', attraction: '景點', other: '其他' };
  return labels[cat] || cat;
}

// ===== CLOCKS =====
function updateClocks() {
  const now = new Date();
  // Taipei = UTC+8, Tokyo = UTC+9
  const taipeiOffset = 8 * 60;
  const tokyoOffset = 9 * 60;
  
  const taipeiTime = new Date(now.getTime() + (taipeiOffset - now.getTimezoneOffset()) * 60000);
  const tokyoTime = new Date(now.getTime() + (tokyoOffset - now.getTimezoneOffset()) * 60000);

  const fmt = (d) => d.toTimeString().slice(0, 8);
  const fmtDate = (d) => d.toISOString().slice(0, 10);

  document.getElementById('taipeiTime').textContent = fmt(taipeiTime);
  document.getElementById('tokyoTime').textContent = fmt(tokyoTime);
  document.getElementById('taipeiDate').textContent = fmtDate(taipeiTime);
  document.getElementById('tokyoDate').textContent = fmtDate(tokyoTime);

  setAnalogClock('taipei', taipeiTime);
  setAnalogClock('tokyo', tokyoTime);
}

function setAnalogClock(prefix, date) {
  const h = date.getHours() % 12;
  const m = date.getMinutes();
  const s = date.getSeconds();
  const hDeg = h * 30 + m * 0.5;
  const mDeg = m * 6;
  const sDeg = s * 6;
  document.getElementById(prefix + 'Hour').style.transform = `rotate(${hDeg}deg)`;
  document.getElementById(prefix + 'Min').style.transform = `rotate(${mDeg}deg)`;
  document.getElementById(prefix + 'Sec').style.transform = `rotate(${sDeg}deg)`;
}

// ===== SAKURA PETALS =====
function createSakura() {
  const container = document.getElementById('sakuraContainer');
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (8 + Math.random() * 10) + 's';
      petal.style.animationDelay = Math.random() * 8 + 's';
      petal.style.width = petal.style.height = (8 + Math.random() * 8) + 'px';
      const hue = Math.random() > 0.5 ? 'rgba(255,182,214,0.8)' : 'rgba(216,180,254,0.7)';
      petal.style.background = hue;
      container.appendChild(petal);
      setTimeout(() => { if (petal.parentNode) container.removeChild(petal); }, 20000);
    }, i * 600);
  }
}

// ===== TAB NAVIGATION =====
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      if (!target) return;

      // Update active tab
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`.nav-tab[data-tab="${target}"]`).forEach(t => t.classList.add('active'));
      
      // Show content
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById('tab-' + target)?.classList.add('active');

      // Close mobile menu
      document.getElementById('mobileMenu').classList.remove('open');
    });
  });
}

// ===== FILTER =====
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSpots(btn.dataset.filter);
    });
  });
}

// ===== TRIP FORM =====
function initTripForm() {
  document.getElementById('addTripBtn').addEventListener('click', () => {
    document.getElementById('addTripForm').classList.toggle('hidden');
    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('tripDate').value = today;
  });
  document.getElementById('cancelTripBtn').addEventListener('click', () => {
    document.getElementById('addTripForm').classList.add('hidden');
  });
  document.getElementById('saveTripBtn').addEventListener('click', async () => {
    const title = document.getElementById('tripTitle').value.trim();
    const date = document.getElementById('tripDate').value;
    if (!title || !date) { showToast('❌ 請填寫日期和行程名稱'); return; }
    
    const trip = {
      title,
      date,
      time: document.getElementById('tripTime').value,
      location: document.getElementById('tripLocation').value,
      note: document.getElementById('tripNote').value
    };
    
    const saved = await saveTrip(trip);
    if (saved && !state.trips.find(t => t.id === saved.id)) state.trips.push(saved);
    renderTimeline();
    document.getElementById('addTripForm').classList.add('hidden');
    document.getElementById('tripTitle').value = '';
    document.getElementById('tripNote').value = '';
    showToast('✅ 行程已新增！');
  });
}

// ===== EXPENSE FORM =====
function initExpenseForm() {
  document.getElementById('addExpenseBtn').addEventListener('click', () => {
    document.getElementById('addExpenseForm').classList.toggle('hidden');
    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('expenseDate').value = today;
  });
  document.getElementById('cancelExpenseBtn').addEventListener('click', () => {
    document.getElementById('addExpenseForm').classList.add('hidden');
  });
  document.getElementById('saveExpenseBtn').addEventListener('click', async () => {
    const title = document.getElementById('expenseTitle').value.trim();
    const amount = document.getElementById('expenseAmount').value;
    if (!title || !amount) { showToast('❌ 請填寫支出項目和金額'); return; }
    
    const travelersRaw = document.getElementById('travelersInput').value;
    const travelers = travelersRaw.split('\n').map(t => t.trim()).filter(Boolean);

    const expense = {
      title,
      amount: Number(amount),
      category: document.getElementById('expenseCategory').value,
      date: document.getElementById('expenseDate').value,
      travelers: travelers.length ? travelers : []
    };
    
    const saved = await saveExpense(expense);
    if (saved && !state.expenses.find(e => e.id === saved.id)) state.expenses.unshift(saved);
    renderExpenses();
    document.getElementById('addExpenseForm').classList.add('hidden');
    document.getElementById('expenseTitle').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('travelersInput').value = '';
    showToast('✅ 支出已記錄！');
  });
}

async function deleteExpenseItem(id) {
  await deleteExpense(id);
  renderExpenses();
  showToast('🗑️ 已刪除支出');
}

// ===== HAMBURGER =====
function initHamburger() {
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== INIT =====
async function init() {
  await loadData();
  renderSpots();
  renderTimeline();
  renderWeather();
  renderJapanese();
  renderExpenses();
  initTabs();
  initFilter();
  initTripForm();
  initExpenseForm();
  initHamburger();
  updateClocks();
  setInterval(updateClocks, 1000);
  setInterval(createSakura, 3000);
  createSakura();
}

document.addEventListener('DOMContentLoaded', init);
