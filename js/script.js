// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 카드에 호버 효과 추가
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const btn = card.querySelector('.btn');
            if (btn && btn.href) {
                window.location.href = btn.href;
            }
        });
    });
    
    // 네비게이션 아이템 클릭 효과
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        if (item.getAttribute('href') && item.getAttribute('href') !== '#') {
            return;
        }
        
        item.addEventListener('click', function(e) {
            if (item.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Channel.io는 이미 HTML에 포함되어 있으므로 추가 코드가 필요 없습니다.
    // 기존 챗봇 관련 코드는 제거했습니다.
});