'use strict';

// カルーセル（拡大画像）の表示 ---------------------------------------------
{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  const dots = [];
  let currentIndex = 0; // 何番目の画像なのかをカウントする


  // prev, nextボタンの表示状態
  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    // 最初の画像が表示された状態でprevボタンを非表示
    if (currentIndex === 0) {
      prev.classList.add('hidden');
    }

    // 最後の画像が表示された状態でnextボタンを非表示
    // slides.lengthは、slides全体の数なので、順番を取得するために-1にする
    if (currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }


  // スライド画像の動き
  // translateXで-1（画像1枚分だけ左へ）ずらす
  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }


  // 画像下の丸ボタンをjavascriptで生成
  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button'); // ここで新規にbuttonという関数を作成

      button.addEventListener('click', () => { // クリックした丸ボタンの画像を表示
        currentIndex = i;

        updateDots(); // 丸ボタンの表示状態

        updateButtons(); // prev, nextボタンの表示状態
        
        moveSlides(); // スライド画像の動き
      });

      dots.push(button); // buttonの内容をdotsに追加する
      document.querySelector('nav').appendChild(button); // navの中にbuttonを作る
    }

    dots[0].classList.add('current');
  }

  
  // 丸ボタンの表示状態
  function updateDots() {
    dots.forEach(dot => { // dotsからcurrnetクラスを外す
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current'); // クリックした丸ボタンに新しくcurrentクラスをつける
  }

  
  updateButtons(); // prev, nextボタンの表示状態
  setupDots(); // 画像下の丸ボタンをjavascriptで生成


  // nextボタンをクリックした場合
  next.addEventListener('click', () => {
    currentIndex++; // nextボタンクリックのカウント
    updateDots(); // 丸ボタンの表示状態
    updateButtons(); // prev, nextボタンの表示状態（ボタン非表示のコードはカウントの後に記述する）
    moveSlides(); // スライド画像の動き
  });

  // prevボタンをクリックした場合
  prev.addEventListener('click', () => {
    currentIndex--; // prevボタンクリックのカウント
    updateDots(); // 丸ボタンの表示状態
    updateButtons(); // prev, nextボタンの表示状態（ボタン非表示のコードはカウントの後に記述する）
    moveSlides(); // スライド画像の動き
  });

  window.addEventListener('resize', () => {
    moveSlides(); // スライド画像の動き（ブラウザ幅に合わせて調整される）
  });
}
