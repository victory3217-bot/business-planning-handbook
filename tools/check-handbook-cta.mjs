const links=new Set();
for(const l of ["ko","en"]){
  const r=await fetch(`https://magisglobal.co.kr/${l}/handbooks/`);const h=await r.text();
  console.log(l,"page",r.status);
  const t=h.replace(/<[^>]+>/g," ");
  console.log(" cards:",(t.match(/8\s*\/\s*8\s*\/\s*9|15\s*\/\s*15\s*\/\s*13/g)||[]).join(" ; ")||"(수치 패턴 없음)");
  for(const m of h.matchAll(/href="(https:\/\/(?:victory3217-bot\.github\.io|github\.com)[^"]*)"/g))links.add(m[1].replace(/&amp;/g,"&"));
}
console.log("links",links.size);
for(const u of links){const r=await fetch(u,{redirect:"follow"});console.log(r.status,u)}
for(const [n,b] of [["bp","business-planning-handbook"],["pr","pricing-handbook"]]){
  for(const l of ["ko","en"]){
    const h=await (await fetch(`https://victory3217-bot.github.io/${b}/${l}/`)).text();
    const ch=new Set([...h.matchAll(/href="[^"]*\/chapters\/(ch\d+)\/?"/gi)].map(m=>m[1].toLowerCase()));
    console.log(b,l,"chapter links",ch.size);
  }
}
