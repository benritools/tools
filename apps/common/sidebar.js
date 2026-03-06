async function loadSidebar(){
  // --- 追加：HTML構造を動的に生成 ---
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-block">
          <h3 class="sidebar-title">👑&nbsp;人気ツール</h3>
          <div id="popular-tools"></div>
        </div>
        <div class="sidebar-block">
          <h3 class="sidebar-title">📌&nbsp;すべてのツール</h3>
          <div id="sidebar-tools"></div>
        </div>
      </aside>
    `;
  }
  // ------------------------------

  const res = await fetch('/tools.json');
  const tools = await res.json();

  renderOtherTools(tools);
  renderPopularTools(tools);
}

/* ======================
   クリック数保存
====================== */

function addClickCount(url){

  const key = 'tool_click_counts';
  const data = JSON.parse(localStorage.getItem(key) || '{}');

  data[url] = (data[url] || 0) + 1;

  localStorage.setItem(key, JSON.stringify(data));
}

/* ======================
   他ツール表示
====================== */

function renderOtherTools(tools){

  const container = document.getElementById('sidebar-tools');
  if(!container) return;

  const current = location.pathname;

  tools.forEach(tool => {

    if(current.startsWith(tool.url)) return;

    const card = document.createElement('a');
    card.href = tool.url;
    /*card.className = 'side-tool-card';
    
    card.innerHTML = `
      <div class="side-tool-title">${tool.name}</div>
			`;*/
	card.className = 'popular-card';
    card.innerHTML = `
      <div>
        <div class="popular-title">${tool.name}</div>
      </div>
	`;
			
    card.addEventListener('click', ()=>{
      addClickCount(tool.url);
    });

    container.appendChild(card);
  });
}

/* ======================
   人気ランキング
====================== */

function renderPopularTools(tools){

  const key = 'tool_click_counts';
  const counts = JSON.parse(localStorage.getItem(key) || '{}');

  const ranked = [...tools]
    .map(t => ({...t, count: counts[t.url] || 0}))
    .sort((a,b)=> b.count - a.count)
    .slice(0,5);

  const el = document.getElementById('popular-tools');
  if(!el) return;

  ranked.forEach((tool,i)=>{

    const card = document.createElement('a');
    card.href = tool.url;
    card.className = 'popular-card';

    card.innerHTML = `
      <div class="popular-rank">${i+1}</div>
      <div>
        <div class="popular-title">${tool.name}</div>
      </div>
    `;

    el.appendChild(card);
  });
}

/* ======================
   実行
====================== */

loadSidebar();