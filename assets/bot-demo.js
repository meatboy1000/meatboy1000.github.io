/* Живое демо Telegram-бота записи. Без зависимостей.
   BotDemo.mount(element, config) — см. примеры в demo-страницах. */
(function () {
  const CSS = `
  .bd{--tg-bg:#e7ebf0;--tg-head:#ffffff;--tg-in:#ffffff;--tg-out:#e1fec6;--tg-ink:#0f1419;--tg-mut:#6b7785;--tg-acc:#3390ec;--tg-btn:#ffffffd9;
      font:15px/1.4 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--tg-ink);display:grid;gap:12px;width:100%;max-width:420px;margin:0 auto}
  .bd *{box-sizing:border-box}
  .bd-phone{border-radius:28px;background:#11161c;padding:10px;box-shadow:0 18px 50px -20px rgba(0,0,0,.45)}
  .bd-screen{border-radius:20px;overflow:hidden;background:var(--tg-bg);display:flex;flex-direction:column;height:560px}
  .bd-head{background:var(--tg-head);display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #d8dde3}
  .bd-ava{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;flex:none}
  .bd-title{font-weight:700;line-height:1.2}.bd-sub{font-size:12px;color:var(--tg-mut)}
  .bd-log{flex:1;overflow-y:auto;padding:14px 10px;display:flex;flex-direction:column;gap:6px;scroll-behavior:smooth;
      background-image:radial-gradient(rgba(255,255,255,.35) 1px,transparent 1px);background-size:18px 18px}
  .bd-msg{max-width:86%;padding:7px 11px 6px;border-radius:14px;white-space:pre-line;word-wrap:break-word;animation:bdin .18s ease-out;box-shadow:0 1px 1px rgba(0,0,0,.08)}
  .bd-msg.in{background:var(--tg-in);align-self:flex-start;border-bottom-left-radius:4px}
  .bd-msg.out{background:var(--tg-out);align-self:flex-end;border-bottom-right-radius:4px}
  .bd-msg b{font-weight:700}
  .bd-time{font-size:11px;color:var(--tg-mut);float:right;margin:6px 0 0 10px}
  .bd-kb{display:grid;gap:4px;align-self:flex-start;width:86%}
  .bd-row{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:4px}
  .bd-kb button{border:0;border-radius:9px;background:var(--tg-btn);color:var(--tg-acc);font-family:inherit;font-weight:600;font-size:14px;line-height:1.2;padding:9px 6px;cursor:pointer;box-shadow:0 1px 1px rgba(0,0,0,.08)}
  .bd-kb button:hover{background:#fff}
  .bd-kb button:focus-visible,.bd-send:focus-visible{outline:2px solid var(--tg-acc);outline-offset:1px}
  .bd-kb.used button{opacity:.45;pointer-events:none}
  .bd-typing{align-self:flex-start;background:var(--tg-in);border-radius:14px;padding:9px 12px;display:flex;gap:4px}
  .bd-typing i{width:6px;height:6px;border-radius:50%;background:#9aa6b2;animation:bddot 1s infinite}
  .bd-typing i:nth-child(2){animation-delay:.15s}.bd-typing i:nth-child(3){animation-delay:.3s}
  .bd-input{display:flex;gap:8px;padding:8px;background:var(--tg-head);border-top:1px solid #d8dde3}
  .bd-input input{flex:1;min-width:0;border:0;background:#f1f3f5;border-radius:18px;padding:9px 14px;font:inherit;color:var(--tg-ink)}
  .bd-send{border:0;border-radius:50%;width:38px;height:38px;background:var(--tg-acc);color:#fff;font-size:17px;cursor:pointer;flex:none}
  .bd-input input:disabled,.bd-send:disabled{opacity:.5}
  .bd-owner{border-radius:16px;background:#1b2430;color:#e8edf3;padding:12px 14px;font-size:14px;display:grid;gap:6px}
  .bd-owner .lbl{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#93a4b8}
  .bd-owner .note{white-space:pre-line;background:#263243;border-radius:10px;padding:9px 11px;animation:bdin .25s ease-out}
  .bd-owner .empty{color:#93a4b8}
  .bd-reset{justify-self:center;border:1px solid currentColor;background:transparent;color:inherit;border-radius:999px;padding:7px 16px;font-family:inherit;font-weight:600;font-size:13px;line-height:1;cursor:pointer;opacity:.75}
  .bd.paper{--tg-bg:var(--bd-bg,#efefe8);--tg-head:var(--bd-paper,#f7f7f2);--tg-in:#ffffff;--tg-out:var(--bd-acc,#e1392c);--tg-ink:var(--bd-ink,#0b0b0b);--tg-mut:#55554f;--tg-acc:var(--bd-ink,#0b0b0b);--tg-btn:var(--bd-paper,#f7f7f2)}
  .bd.paper .bd-phone{background:var(--bd-ink,#0b0b0b);border-radius:calc(var(--bd-r,0px) + 6px);padding:8px;box-shadow:var(--bd-shadow,none)}
  .bd.paper .bd-screen{border-radius:var(--bd-r,2px)}
  .bd.paper .bd-head{border-bottom:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-msg{border-radius:var(--bd-r,0px);box-shadow:none;border:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-msg.out{color:var(--bd-out-ink,#fff8f2);border-color:var(--bd-acc,#e1392c)}
  .bd.paper .bd-msg.out .bd-time{color:var(--bd-out-ink,#ffd9d4);opacity:.75}
  .bd.paper .bd-kb button{border-radius:var(--bd-r,0px);box-shadow:none;border:1px solid var(--bd-ink,#0b0b0b);font-weight:400}
  .bd.paper .bd-kb button:hover{background:var(--bd-ink,#0b0b0b);color:var(--bd-paper,#f7f7f2)}
  .bd.paper .bd-input{border-top:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-input input{border-radius:var(--bd-r,0px);background:#fff;border:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-send{border-radius:var(--bd-r,0px);background:var(--bd-acc,#e1392c);color:var(--bd-out-ink,#fff)}
  .bd.paper .bd-typing{border-radius:var(--bd-r,0px);border:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-log{background-image:none}
  .bd.paper .bd-owner{border-radius:var(--bd-r,0px);background:var(--bd-paper,#f7f7f2);color:var(--bd-ink,#0b0b0b);border:1px solid var(--bd-ink,#0b0b0b)}
  .bd.paper .bd-owner .lbl,.bd.paper .bd-owner .empty{color:var(--bd-ink,#0b0b0b);opacity:.7}
  .bd.paper .bd-owner .note{background:#fff;border:1px solid var(--bd-ink,#0b0b0b);border-radius:var(--bd-r,0px)}
  .bd.paper .bd-reset{border-radius:var(--bd-r,0px)}
  @keyframes bdin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @keyframes bddot{0%,60%,100%{opacity:.3}30%{opacity:1}}
  @media (prefers-reduced-motion:reduce){.bd-msg,.bd-owner .note{animation:none}.bd-typing i{animation:none}}
  @media (max-width:420px){.bd-screen{height:520px}.bd-phone{padding:7px;border-radius:24px}}
  `;
  const WD = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const rub = (n) => n.toLocaleString("ru-RU") + " ₽";
  const pad = (n) => String(n).padStart(2, "0");
  const now = () => { const d = new Date(); return pad(d.getHours()) + ":" + pad(d.getMinutes()); };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  function injectCss() {
    if (document.getElementById("bd-css")) return;
    const s = document.createElement("style"); s.id = "bd-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  function mount(root, cfg) {
    injectCss();
    root.innerHTML = `
      <div class="bd${cfg.theme ? " " + cfg.theme : ""}" style="${cfg.vars ? Object.entries(cfg.vars).map(([k, v]) => "--bd-" + k + ":" + v).join(";") : ""}">
        <div class="bd-phone"><div class="bd-screen">
          <div class="bd-head"><div class="bd-ava" style="background:${cfg.color || "#3390ec"}">${esc(cfg.avatar || cfg.name[0])}</div>
            <div><div class="bd-title">${esc(cfg.name)}</div><div class="bd-sub">бот</div></div></div>
          <div class="bd-log" aria-live="polite"></div>
          <form class="bd-input"><input aria-label="Сообщение боту" placeholder="Сообщение" disabled><button class="bd-send" aria-label="Отправить" disabled>➤</button></form>
        </div></div>
        <div class="bd-owner"><div class="lbl">Что получает владелец</div><div class="bd-notes"><div class="empty">Запишитесь в боте — здесь появится уведомление, которое придёт владельцу в Telegram.</div></div></div>
        <button class="bd-reset" type="button">↺ Начать заново</button>
      </div>`;
    const log = root.querySelector(".bd-log");
    const form = root.querySelector(".bd-input");
    const input = form.querySelector("input");
    const sendBtn = form.querySelector("button");
    const notes = root.querySelector(".bd-notes");
    let draft = {}, waitText = null, timers = [];

    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const scroll = () => { log.scrollTop = log.scrollHeight; };
    function msg(html, out) {
      const m = document.createElement("div"); m.className = "bd-msg " + (out ? "out" : "in");
      m.innerHTML = html + `<span class="bd-time">${now()}${out ? " ✓✓" : ""}</span>`; log.appendChild(m); scroll(); return m;
    }
    function bot(html, kb, delay = 550) {
      const t = document.createElement("div"); t.className = "bd-typing"; t.innerHTML = "<i></i><i></i><i></i>";
      log.appendChild(t); scroll();
      later(() => { t.remove(); msg(html); if (kb) keyboard(kb); }, delay);
    }
    function keyboard(rows) {
      const k = document.createElement("div"); k.className = "bd-kb";
      rows.forEach((row) => {
        const r = document.createElement("div"); r.className = "bd-row";
        row.forEach(([label, fn]) => {
          const b = document.createElement("button"); b.type = "button"; b.textContent = label;
          b.onclick = () => { k.classList.add("used"); msg(esc(label), true); fn(); };
          r.appendChild(b);
        });
        k.appendChild(r);
      });
      log.appendChild(k); scroll();
    }
    function ask(placeholder, suggestion, fn) {
      waitText = fn; input.disabled = sendBtn.disabled = false; input.placeholder = placeholder; input.value = suggestion || ""; input.focus({ preventScroll: true });
    }
    form.onsubmit = (e) => {
      e.preventDefault(); const v = input.value.trim(); if (!v || !waitText) return;
      const fn = waitText; waitText = null; input.value = ""; input.disabled = sendBtn.disabled = true; input.placeholder = "Сообщение";
      msg(esc(v), true); fn(v);
    };

    function menu() {
      bot(cfg.welcome, [[["✍️ Записаться", pickService]], [["💰 Цены", prices], ["📍 Контакты", contacts]]]);
    }
    function prices() {
      bot("<b>Цены</b>\n" + cfg.services.map((s) => `• ${esc(s.name)} — <b>${rub(s.price)}</b>${s.min ? ` · ${s.min} мин` : ""}`).join("\n"),
        [[["✍️ Записаться", pickService]]]);
    }
    function contacts() { bot(cfg.contacts, [[["✍️ Записаться", pickService]]]); }
    function pickService() {
      draft = {};
      bot("Шаг 1. <b>Выберите услугу</b>", cfg.services.map((s) => [[`${s.name} · ${rub(s.price)}`, () => { draft.service = s; afterService(); }]]));
    }
    function afterService() {
      if (cfg.extra) {
        const x = cfg.extra;
        bot(`Шаг 2. <b>${esc(x.question)}</b>`, chunk(x.options, 2).map((row) => row.map((o) => [o, () => { draft.extra = o; pickStaff(); }])));
      } else pickStaff();
    }
    function pickStaff() {
      if (!cfg.staff) return pickDay();
      bot(`<b>${esc(cfg.staffQuestion || "Выберите мастера")}</b>`,
        [[["Любой свободный", () => { draft.staff = "любой свободный"; pickDay(); }]]].concat(cfg.staff.map((m) => [[m, () => { draft.staff = m; pickDay(); }]])));
    }
    function pickDay() {
      const days = []; const d0 = new Date(); d0.setHours(0, 0, 0, 0);
      for (let i = 0; i < 6; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); days.push(d); }
      const label = (d, i) => i === 0 ? "Сегодня" : i === 1 ? "Завтра" : `${WD[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
      bot("<b>Выберите день</b>", chunk(days.map((d, i) => [label(d, i), () => { draft.day = d; pickTime(); }]), 3));
    }
    function pickTime() {
      const slots = cfg.times || ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
      const d = draft.day, today = new Date();
      const seed = d.getDate() * 7 + (draft.service.name.length || 1);
      const free = slots.filter((t, i) => {
        const [h, m] = t.split(":").map(Number);
        const past = d.toDateString() === today.toDateString() && h * 60 + m <= today.getHours() * 60 + today.getMinutes() + 30;
        return !past && (seed + i * 3) % 4 !== 0;
      });
      if (!free.length) { bot("На этот день всё занято 😔 Выберите другой.", null); return later(pickDay, 700); }
      bot(`Свободно на <b>${pad(d.getDate())}.${pad(d.getMonth() + 1)}</b>:`, chunk(free.map((t) => [t, () => { draft.time = t; askName(); }]), 4));
    }
    function askName() { bot("Как к вам обращаться?"); later(() => ask("Ваше имя", cfg.sampleName || "Алексей", (v) => { draft.name = v; askPhone(); }), 600); }
    function askPhone() {
      bot("Оставьте телефон для связи 👇", [[["📱 Отправить мой номер", () => { draft.phone = "+7 900 123-45-67"; confirm(); }]]]);
    }
    function summary() {
      const d = draft.day;
      return `${esc(draft.service.name)} — ${rub(draft.service.price)}` + (draft.extra ? `\n${esc(cfg.extra.label)}: ${esc(draft.extra)}` : "") +
        (draft.staff ? `\n${esc(cfg.staffLabel || "Мастер")}: ${esc(draft.staff)}` : "") +
        `\nКогда: ${WD[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)} в ${draft.time}\nИмя: ${esc(draft.name)}\nТелефон: ${draft.phone}`;
    }
    function confirm() {
      bot("<b>Проверьте запись</b>\n\n" + summary(), [[["✅ Подтвердить", done], ["✖️ Отмена", menu]]]);
    }
    function done() {
      bot("✅ <b>Вы записаны!</b>\n\n" + summary() + `\n\nНапомним за ${cfg.remind || "2 часа"} до визита.`, [[["📋 Мои записи", mine], ["✍️ Ещё запись", pickService]]], 700);
      later(() => {
        notes.innerHTML = "";
        const n = document.createElement("div"); n.className = "note"; n.textContent = "🆕 Новая запись\n" + summary().replace(/<[^>]+>/g, "");
        notes.appendChild(n);
      }, 1100);
      later(() => bot(`⏰ <i>Так выглядит напоминание, которое клиент получит за ${cfg.remind || "2 часа"}:</i>\n\nНапоминаем о записи: ${esc(draft.service.name)}, ${draft.time}. Ждём вас!`, null, 500), 3200);
    }
    function mine() { bot("<b>Ваши записи</b>\n1. " + summary().split("\nИмя")[0], [[["Отменить запись", () => { bot("Запись отменена. Владелец получил уведомление."); const n = document.createElement("div"); n.className = "note"; n.textContent = "❌ Отмена записи\n" + draft.service.name + ", " + draft.time; notes.prepend(n); later(menu, 900); }]]]); }
    function chunk(a, n) { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; }

    function start() {
      timers.forEach(clearTimeout); timers = []; log.innerHTML = ""; waitText = null; input.disabled = sendBtn.disabled = true;
      notes.innerHTML = '<div class="empty">Запишитесь в боте — здесь появится уведомление, которое придёт владельцу в Telegram.</div>';
      msg("/start", true); menu();
    }
    root.querySelector(".bd-reset").onclick = start;
    start();
  }
  window.BotDemo = { mount };
})();
