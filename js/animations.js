document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer를 이용한 스크롤 등장 애니메이션
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // 2. 히어로 배경 패럴랙스(Parallax) 효과
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    }

    // 3. 스크롤 시 헤더 블러 효과
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(247, 249, 251, 0.9)';
                header.style.backdropFilter = 'blur(8px)';
            } else {
                header.style.backgroundColor = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // 4. 통계 카드 숫자 카운트 애니메이션
    const statValues = document.querySelectorAll('.stat-value');
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuad 곡선
            const easeProgress = progress * (2 - progress);
            
            const currentVal = Math.floor(easeProgress * (end - start) + start);
            
            // 기존 span 태그 (단위 등) 유지
            const span = obj.querySelector('span');
            const suffix = span ? span.outerHTML : '';
            obj.innerHTML = currentVal + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.innerText;
                const endValue = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(endValue)) {
                    animateValue(el, 0, endValue, 2000);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
        statObserver.observe(stat);
    });
});
