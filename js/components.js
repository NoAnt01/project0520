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

    // 3. 트랙 카드 클릭 이벤트 연동 (모달 표시)
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
        card.addEventListener('click', () => {
            const badge = card.querySelector('.track-badge').innerText;
            const title = card.querySelector('.track-title').innerText;
            const desc = card.querySelector('.track-desc').innerText;
            
            const detailedDesc = `${desc}\n\n[${badge} 트랙] 상세 교과목 및 연구실 정보는 학과 홈페이지 게시판을 참조하거나 지도교수님과 상담하시기 바랍니다.`;
            openModal(title, detailedDesc);
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
