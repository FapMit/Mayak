$(function () {
    // Плавное появление блоков по скролу
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }
    let options = { threshold: [0] };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.header__body-inner, .about__left, .about__right, .possibility, .projects__slider-top, .projects__slider, .team__left, .team__right, .header__body');
    for (let elm of elements) {
        observer.observe(elm);
    }

    // Переход по якорным ссылкам
    $(".header__nav").on("click","a", function (e) {
        e.preventDefault()
        var id  = $(this).attr('href'),
        top = $(id).offset().top - 50
        $('body,html').animate({scrollTop: top}, 1000)
        })

    // Слайдер блока ПРОЕКТЫ-КЛИЕНТЫ
    $('.projects__slider').slick({
        arrows: false,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    appendDots: $('.projects__dots')
                }
            }
        ]
    })
    $('.projects__slider-prev').on('click', function (e) {
        e.preventDefault()
        $('.projects__slider').slick('slickPrev')
    })
    $('.projects__slider-next').on('click', function (e) {
        e.preventDefault()
        $('.projects__slider').slick('slickNext')
    })

    // Слайдер блока КОМАНДЫ
    $('.team__slider').slick({
        arrows: false,
        dots: true,
        appendDots: $('.team__dots'),
        infinite: false
    })
    $('.team__slider-prev').on('click', function (e) {
        e.preventDefault();
        $('.team__slider').slick('slickPrev')
    })
    $('.team__slider-next').on('click', function (e) {
        e.preventDefault();
        $('.team__slider').slick('slickNext')
    })

    // Смена языка
    $('.header__language-btn').on('click', function (e) {
        e.preventDefault();
        if (!($(this).hasClass('header__language-btn--active'))) {
            $('.header__language-btn').removeClass('header__language-btn--active')
            $(this).addClass('header__language-btn--active')
        }       
    })
    langRu = document.querySelector('.header__language-btn--rus');
    langEng = document.querySelector('.header__language-btn--eng');
    const allLang = ['eng', 'rus'];

    langRu.addEventListener('click', function () {
        let lang = langRu.text;
        location.href = window.location.pathname + '#' + lang;
        location.reload();
    });
    langEng.addEventListener('click', function () {
        let lang = langEng.text;
        location.href = window.location.pathname + '#' + lang;
        location.reload();
    });

    function changeLanguage() {
        let hash = window.location.hash;
        hash = hash.substring(1);
        if (hash === 'rus') {
            $('.header__language-btn--eng').removeClass('header__language-btn--active')
            $('.header__language-btn--rus').addClass('header__language-btn--active')
        } else if (hash === 'eng') {
            $('.header__language-btn--rus').removeClass('header__language-btn--active')
            $('.header__language-btn--eng').addClass('header__language-btn--active')
        }
        if (!allLang.includes(hash)) {
            location.href = window.location.pathname + '#rus';
            location.reload();
        }
        
        for (let key in langArr) {
            let elem = document.querySelector('.lng-'+key); 
            if (elem) {
                elem.innerHTML = langArr[key][hash];
            }
        }
    };
    changeLanguage();

    // Анимация header при скролле на mobile-версии
    setInterval(() => {
        if ($(window).scrollTop() > 50 && $('.header__top').hasClass('header__top--open') === false) {
            $('.header__lng').addClass('header__lng--follow')
        } else {
            $('.header__lng--follow').removeClass('header__lng--follow')
        }
    }, 0)

    $('.header__nav-link, .header__top-btn').on('click', function () {
        if ($('.header__top').hasClass('header__top--open')) {
            $('.header__top').removeClass('header__top--open')
            $('.overlay').removeClass('overlay--show')
            $('.burger').removeClass('burger--close')
        }
    })

    $('.burger, .overlay').on('click', function (e) {
        e.preventDefault()
        $('.header__top').toggleClass('header__top--open')
        $('.overlay').toggleClass('overlay--show')
        $('.burger').toggleClass('burger--close')
    })
})