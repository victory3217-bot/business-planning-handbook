(function () {
  var root = document.getElementById("ws-app");
  if (!root) return;
  var locale = root.dataset.locale;
  var base = root.dataset.base;
  var CHAPTERS = ["CH01", "CH02", "CH03", "CH04", "CH05", "CH06", "CH07", "CH08"];

  var T = {
    ko: {
      pick: "챕터 선택",
      download: "Markdown(.md) 다운로드",
      copy: "복사",
      copied: "복사되었습니다",
      reset: "이 챕터 답변 지우기",
      confirmReset: "이 챕터에 작성한 답변을 모두 지울까요?",
      saved: "작성 내용은 이 브라우저에만 자동 저장됩니다. 서버로 전송되지 않습니다.",
      loading: "워크시트를 불러오는 중...",
      error: "워크시트를 불러오지 못했습니다.",
      answer: "답변을 입력하세요",
    },
    en: {
      pick: "Choose a chapter",
      download: "Download Markdown (.md)",
      copy: "Copy",
      copied: "Copied",
      reset: "Clear answers for this chapter",
      confirmReset: "Clear all answers you wrote for this chapter?",
      saved: "Your answers are saved automatically in this browser only. Nothing is sent to a server.",
      loading: "Loading worksheet...",
      error: "Could not load the worksheet.",
      answer: "Type your answer",
    },
  }[locale];

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  }
  function storageKey(ch) {
    return "bph-ws-v1:" + locale + ":" + ch;
  }
  function load(ch) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(ch))) || {};
    } catch (e) {
      return {};
    }
  }
  function save(ch, values) {
    try {
      localStorage.setItem(storageKey(ch), JSON.stringify(values));
    } catch (e) {}
  }

  function parse(md) {
    var lines = md.replace(/\r\n/g, "\n").split("\n");
    var tokens = [];
    var n = 0;
    var i = 0;
    function id() {
      return "f" + n++;
    }
    while (i < lines.length) {
      var line = lines[i];
      if (/^```/.test(line)) {
        var j = i + 1;
        var body = [];
        while (j < lines.length && !/^```/.test(lines[j])) body.push(lines[j++]);
        var blank = body.every(function (l) { return l.trim() === ""; });
        if (blank) tokens.push({ t: "answer", id: id(), blank: body });
        else tokens.push({ t: "code", lines: body });
        i = j + 1;
        continue;
      }
      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          var raw = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "");
          var cells = raw.split("|").map(function (c) { return c.trim(); });
          var isSep = cells.every(function (c) { return /^:?-{3,}:?$/.test(c); });
          rows.push({
            sep: isSep,
            cells: cells.map(function (c) {
              return { text: c, fid: !isSep && c === "" && rows.length > 0 ? id() : null };
            }),
          });
          i++;
        }
        tokens.push({ t: "table", rows: rows });
        continue;
      }
      if (/\[ \]/.test(line)) {
        var parts = line.split(/(\[ \]|______)/).map(function (p) {
          if (p === "[ ]") return { k: "check", fid: id() };
          if (p === "______") return { k: "blank", fid: id() };
          return { k: "text", text: p };
        });
        tokens.push({ t: "check", parts: parts });
        i++;
        continue;
      }
      tokens.push({ t: "line", text: line });
      i++;
    }
    return tokens;
  }

  function serialize(tokens, v) {
    var out = [];
    tokens.forEach(function (tk) {
      if (tk.t === "answer") {
        var val = v[tk.id];
        out.push("```");
        if (val && val.trim()) out.push(val.replace(/\s+$/, ""));
        else tk.blank.forEach(function (l) { out.push(l); });
        out.push("```");
      } else if (tk.t === "code") {
        out.push("```");
        tk.lines.forEach(function (l) { out.push(l); });
        out.push("```");
      } else if (tk.t === "table") {
        tk.rows.forEach(function (r) {
          var cells = r.cells.map(function (c) {
            if (r.sep) return c.text;
            if (c.fid) {
              var val = (v[c.fid] || "").replace(/\|/g, "\\|").replace(/\n/g, "<br>");
              return val;
            }
            return c.text;
          });
          out.push("| " + cells.join(" | ") + " |");
        });
      } else if (tk.t === "check") {
        out.push(
          tk.parts
            .map(function (p) {
              if (p.k === "check") return v[p.fid] ? "[x]" : "[ ]";
              if (p.k === "blank") return v[p.fid] ? v[p.fid] : "______";
              return p.text;
            })
            .join("")
        );
      } else {
        out.push(tk.text);
      }
    });
    return out.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
  }

  function render(tokens, v, onChange, host) {
    host.innerHTML = "";
    var list = null;
    function flushList() {
      list = null;
    }
    function el(tag, cls) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      return e;
    }
    function textInput(fid, cls) {
      var inp = el("input", cls);
      inp.type = "text";
      inp.value = v[fid] || "";
      inp.addEventListener("input", function () {
        v[fid] = inp.value;
        onChange();
      });
      return inp;
    }
    tokens.forEach(function (tk) {
      if (tk.t === "answer") {
        flushList();
        var ta = el("textarea", "ws-answer");
        ta.rows = 4;
        ta.placeholder = T.answer;
        ta.value = v[tk.id] || "";
        function grow() {
          ta.style.height = "auto";
          ta.style.height = Math.max(ta.scrollHeight + 2, 96) + "px";
        }
        ta.addEventListener("input", function () {
          v[tk.id] = ta.value;
          grow();
          onChange();
        });
        host.appendChild(ta);
        setTimeout(grow, 0);
      } else if (tk.t === "code") {
        flushList();
        var pre = el("pre");
        pre.textContent = tk.lines.join("\n");
        host.appendChild(pre);
      } else if (tk.t === "table") {
        flushList();
        var wrap = el("div", "ws-table-wrap");
        var table = el("table");
        tk.rows.forEach(function (r, ri) {
          if (r.sep) return;
          var tr = el("tr");
          r.cells.forEach(function (c) {
            var cell = el(ri === 0 ? "th" : "td");
            if (c.fid) cell.appendChild(textInput(c.fid, "ws-cell"));
            else cell.innerHTML = inline(c.text);
            tr.appendChild(cell);
          });
          table.appendChild(tr);
        });
        wrap.appendChild(table);
        host.appendChild(wrap);
      } else if (tk.t === "check") {
        flushList();
        var row = el("div", "ws-check-row");
        tk.parts.forEach(function (p) {
          if (p.k === "check") {
            var lab = el("label", "ws-check");
            var cb = el("input");
            cb.type = "checkbox";
            cb.checked = !!v[p.fid];
            cb.addEventListener("change", function () {
              v[p.fid] = cb.checked;
              onChange();
            });
            lab.appendChild(cb);
            row.appendChild(lab);
            row._last = lab;
          } else if (p.k === "blank") {
            row.appendChild(textInput(p.fid, "ws-blank"));
          } else if (p.text.trim()) {
            var target = row._last;
            var span = el("span");
            span.innerHTML = inline(p.text);
            if (target) target.appendChild(span);
            else row.appendChild(span);
          }
        });
        host.appendChild(row);
      } else {
        var s = tk.text;
        if (s.trim() === "" || /^---+\s*$/.test(s)) {
          flushList();
          if (/^---/.test(s)) host.appendChild(el("hr"));
          return;
        }
        var m;
        if ((m = s.match(/^(#{1,3})\s+(.*)$/))) {
          flushList();
          var h = el("h" + (m[1].length + 1));
          h.innerHTML = inline(m[2]);
          host.appendChild(h);
        } else if ((m = s.match(/^>\s?(.*)$/))) {
          flushList();
          var bq = el("blockquote");
          bq.innerHTML = inline(m[1]);
          host.appendChild(bq);
        } else if ((m = s.match(/^\s*-\s+(.*)$/))) {
          var p2 = el("p", "ws-q");
          p2.innerHTML = inline(m[1]);
          host.appendChild(p2);
        } else {
          var p3 = el("p");
          p3.innerHTML = inline(s);
          host.appendChild(p3);
        }
      }
    });
  }

  var nav = document.getElementById("ws-nav");
  var form = document.getElementById("ws-form");
  var toolbar = document.getElementById("ws-toolbar");
  var current = null;

  function open(ch) {
    current = ch;
    CHAPTERS.forEach(function (c) {
      var b = nav.querySelector('[data-ch="' + c + '"]');
      b.setAttribute("aria-current", c === ch ? "true" : "false");
    });
    try { history.replaceState(null, "", "#" + ch); } catch (e) {}
    form.textContent = T.loading;
    fetch(base + "worksheets/" + locale + "/" + ch + "-worksheet.md")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (md) {
        var tokens = parse(md);
        var values = load(ch);
        var onChange = function () { save(ch, values); };
        render(tokens, values, onChange, form);
        toolbar.hidden = false;
        toolbar.dataset.ch = ch;
        toolbar._get = function () { return serialize(tokens, values); };
        toolbar._reset = function () {
          if (!confirm(T.confirmReset)) return;
          values = {};
          save(ch, values);
          render(tokens, values, function () { save(ch, values); }, form);
        };
      })
      .catch(function () {
        form.textContent = T.error;
      });
  }

  CHAPTERS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.ch = c;
    b.textContent = c;
    b.addEventListener("click", function () { open(c); });
    nav.appendChild(b);
  });

  document.getElementById("ws-download").addEventListener("click", function () {
    var blob = new Blob([toolbar._get()], { type: "text/markdown;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = toolbar.dataset.ch + "-worksheet-answers.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("ws-copy").addEventListener("click", function () {
    var btn = this;
    var label = btn.textContent;
    var done = function () {
      btn.textContent = T.copied;
      setTimeout(function () { btn.textContent = label; }, 1500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(toolbar._get()).then(done);
  });
  document.getElementById("ws-reset").addEventListener("click", function () {
    toolbar._reset();
  });

  var start = (location.hash || "").replace("#", "");
  open(CHAPTERS.indexOf(start) >= 0 ? start : "CH01");
})();
