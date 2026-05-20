document.addEventListener("DOMContentLoaded", () => {
    // 1. 모바일 메뉴 토글
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const isExpanded = mobileNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 영역 밖 클릭 시 모바일 메뉴 닫기
    document.addEventListener('click', (event) => {
        if (mobileNav && mobileNav.classList.contains('active') && !event.target.closest('.header')) {
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });

    // 2. 앵커 링크 부드러운 스크롤 (Smooth Scrolling)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                // 모바일 메뉴 닫기
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                }

                // 고정 헤더 높이만큼 오프셋 적용
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. 스크롤 위치에 따른 활성 메뉴 표시
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a:not(.btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
