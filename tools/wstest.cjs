const fs = require("fs");
const vm = require("vm");
const ROOT = require("path").resolve(__dirname, "..");
const m = { exports: {} };
vm.runInNewContext(fs.readFileSync(ROOT + "/site/public/worksheet-writer.js", "utf8"), { module: m });
const { parse, serialize } = m.exports;
const norm = (s) => s.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+$/gm, "").trim();
let bad = 0;
for (const loc of ["ko", "en"])
  for (let n = 1; n <= 8; n++) {
    const ch = "CH0" + n;
    const md = fs.readFileSync(`${ROOT}/${loc}/manual/${ch}-worksheet.md`, "utf8").replace(/\r\n/g, "\n");
    const tk = parse(md);
    const rt = serialize(tk, {});
    const same = norm(rt) === norm(md);
    if (!same) {
      bad++;
      const a = norm(md).split("\n"), b = norm(rt).split("\n");
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) { console.log("  DIFF", loc, ch, i, JSON.stringify(a[i]), JSON.stringify(b[i])); break; }
    }
    let fields = 0;
    tk.forEach((t) => {
      if (t.id) fields++;
      if (t.segs) fields += t.segs.filter((s) => s.fid).length;
      if (t.rows) t.rows.forEach((r) => r.cells.forEach((c) => (fields += c.segs.filter((s) => s.fid).length)));
      if (t.parts) fields += t.parts.filter((p) => p.fid).length;
    });
    // lines that look like prompts but get no field
    const lines = md.split("\n");
    const orphan = [];
    lines.forEach((l, i) => {
      if (/^\s*-\s+.*[?？]\)?\s*$/.test(l)) {
        let k = i + 1;
        while (k < lines.length && lines[k].trim() === "") k++;
        const nx = lines[k] || "";
        const hasOwn = /^\s*_{3,}\s*$/.test(nx) || /^```/.test(nx) || /^\s*-\s*(작성|Write)\s*:/i.test(nx);
        if (!hasOwn && !tk.some((t) => t.t === "autoq")) orphan.push(l.trim().slice(0, 40));
      }
    });
    console.log(loc, ch, "roundtrip", same, "fields", fields, orphan.length ? "ORPHAN " + orphan.join(" | ") : "");
  }
console.log("roundtrip failures:", bad);
