async function loadLayout(){

  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  if(headerEl){
    const h = await fetch("header.html");
    headerEl.innerHTML = await h.text();
  }

  if(footerEl){
    const f = await fetch("footer.html");
    footerEl.innerHTML = await f.text();
  }
}

// スムーズスクロールの処理
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'scrollTopBtn') {
    e.preventDefault(); // 通常のリンク動作をキャンセル
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 滑らかにスクロール
    });
  }
});

loadLayout();

