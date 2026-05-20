document.addEventListener("DOMContentLoaded", () => {
    // 1. 모달(Modal) 기능 구현
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const openModal = (title, bodyText) => {
        if (!modal) return;
        modalTitle.innerText = title;
        modalBody.innerText = bodyText;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 2. 버튼 클릭 이벤트 연동
    const applyButtons = document.querySelectorAll('.btn-apply, .mobile-nav .btn-primary');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('입학 안내', '현재 2025학년도 신입생 및 편입생 모집 전형 안내를 준비 중입니다. 자세한 사항은 학과 사무실(02-123-4567)로 문의해 주시기 바랍니다.');
        });
    });

    // 히어로 섹션 버튼
    const heroApplyBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroApplyBtn) {
        heroApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('admissions');
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const heroProgramsBtn = document.querySelector('.hero-buttons .btn-outline');
    if (heroProgramsBtn) {
        heroProgramsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('programs');
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. 트랙 카드 클릭 이벤트 연동 (특정 모달 표시)
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
        card.addEventListener('click', () => {
            const badge = card.querySelector('.track-badge').innerText.trim();
            let targetModalId = '';
            
            if (badge.includes('AI') || badge.includes('ML')) {
                targetModalId = 'modal-ai';
            } else if (badge.includes('DATA')) {
                targetModalId = 'modal-data';
            } else if (badge.includes('SECURITY')) {
                targetModalId = 'modal-security';
            } else if (badge.includes('CLOUD')) {
                targetModalId = 'modal-cloud';
            }
            
            if (targetModalId) {
                const targetModal = document.getElementById(targetModalId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // 트랙 모달 닫기 버튼 이벤트 연동
    const trackModalCloseBtns = document.querySelectorAll('[data-modal-close]');
    trackModalCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal-close');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 트랙 모달 바깥 영역(오버레이) 클릭 시 닫기
    const trackModalOverlays = document.querySelectorAll('.track-modal-overlay');
    trackModalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 4. 강점(Bento) 카드 클릭 이벤트 연동
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').innerText;
            const desc = card.querySelector('.card-desc').innerText;
            openModal(title, desc);
        });
    });
});
