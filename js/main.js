'use strict';
// jqueryはhtml,css等すべて読み込んだ後に実行するので$()の中にコードを書く

// ヘッダーの絞り込みメニュー ------------------------------------------------
jQuery(function () {

  let $filters = $('.index [data-category]'),
    $main = $('.main [data-filter]');

  $filters.on('click', function (e) {
    e.preventDefault();
    let $this = $(this);

    $filters.removeClass('active');
    $this.addClass('active');

    let $filterColor = $this.attr('data-category');

    if ($filterColor == 'f_all') { // ←全表示ボタンの動作
      $main.removeClass('is-animated').fadeOut().promise().done(function () {
        $main.addClass('is-animated').fadeIn();
      });
    } else {
      $main.removeClass('is-animated').fadeOut().promise().done(function () {
        $main.filter('[data-filter = "' + $filterColor + '"]').addClass('is-animated').fadeIn();
      });
    }
  });
});



// ページトップへ戻るボタン ------------------------------------------------
jQuery(function () {
  $('.top_return').hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) { // 300以上スクロールしたら表示
      $('.top_return').fadeIn();
    } else {
      $('.top_return').fadeOut();
    }
  });

  $('.top_return').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 600); // 戻る速さ（数が少ないほど速い）
    return false;
  });
});
