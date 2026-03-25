-- =============================================
-- 旅の記憶 - Supabase 資料庫結構（修正版）
-- 在 Supabase SQL Editor 中執行此檔案
-- =============================================

-- 先清除舊表（如果存在）
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS trips;

-- 1. 行程表（避開保留字 date/time，改用 trip_date / trip_time）
CREATE TABLE trips (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  trip_date   DATE NOT NULL,
  trip_time   TEXT,
  location    TEXT,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 支出表（避開保留字 date，改用 expense_date）
CREATE TABLE expenses (
  id           BIGSERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  amount       NUMERIC(10, 2) NOT NULL,
  category     TEXT DEFAULT 'other',
  expense_date DATE,
  travelers    JSONB DEFAULT '[]',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 開啟 Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- 4. 設定公開讀寫政策
CREATE POLICY "Allow all for trips" ON trips
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for expenses" ON expenses
  FOR ALL USING (true) WITH CHECK (true);

-- 5. 建立索引
CREATE INDEX idx_trips_date      ON trips(trip_date);
CREATE INDEX idx_expenses_date   ON expenses(expense_date);
CREATE INDEX idx_expenses_created ON expenses(created_at);

-- 驗證：應看到 trips 和 expenses 兩張表
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
