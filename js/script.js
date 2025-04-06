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

    // 챗봇 기능 추가
    const body = document.querySelector('body');
    
    // 챗봇 버튼 추가
    const chatbotButton = document.createElement('div');
    chatbotButton.className = 'chatbot-button';
    chatbotButton.innerHTML = '<i class="fas fa-comments chatbot-icon"></i>';
    body.appendChild(chatbotButton);
    
    // 챗봇 컨테이너 추가
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    chatbotContainer.innerHTML = `
        <div class="chatbot-header">
            <h3>자격증 도우미</h3>
            <div class="chatbot-controls">
                <i class="fas fa-times close-button"></i>
            </div>
        </div>
        <div class="chatbot-messages">
            <div class="message bot-message">안녕하세요! 자격증 취득에 관해 궁금한 점이 있으신가요?</div>
        </div>
        <div class="chatbot-input">
            <input type="text" placeholder="질문을 입력하세요...">
            <button><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    body.appendChild(chatbotContainer);
    
    // 챗봇 버튼 클릭 이벤트
    chatbotButton.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotButton.innerHTML = '<i class="fas fa-times chatbot-icon"></i>';
        } else {
            chatbotButton.innerHTML = '<i class="fas fa-comments chatbot-icon"></i>';
        }
    });
    
    // 닫기 버튼 클릭 이벤트
    const closeButton = chatbotContainer.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
        chatbotButton.innerHTML = '<i class="fas fa-comments chatbot-icon"></i>';
    });

    // 메시지 전송 기능
    const input = chatbotContainer.querySelector('input');
    const sendButton = chatbotContainer.querySelector('button');
    const messagesContainer = chatbotContainer.querySelector('.chatbot-messages');

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            addMessage(message, 'user');
            input.value = '';
            
            // 간단한 응답 생성
            setTimeout(() => {
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 500);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getResponse(message) {
        const responses = {
            '사회복지사': '사회복지사 자격증은 1급과 2급이 있습니다. 2급은 실습 120시간이 필요하며, 1급은 2급 취득 후 3년 이상의 실무경력이 필요합니다.',
            '보육교사': '보육교사 2급 자격증은 전문대학 이상에서 보육 관련 학과를 졸업하고 실습 240시간을 이수하면 취득할 수 있습니다.',
            '평생교육사': '평생교육사 자격증은 1급, 2급, 3급이 있으며, 대학에서 평생교육 관련 과목을 이수하고 실습을 통해 취득할 수 있습니다.',
            '독학사': '독학사는 학위취득을 위한 국가시험으로, 4년제 대학 졸업과 동등한 학력을 인정받을 수 있습니다.',
            '시험': '자격증 시험은 일반적으로 필기와 실기로 구성되어 있으며, 일부 자격증은 실습 이수가 필요합니다.',
            '실습': '대부분의 자격증은 실습 이수가 필요하며, 실습 시간은 자격증 종류에 따라 다릅니다.',
            '취업': '자격증 취득 후에는 관련 분야의 공공기관, 민간기업, 사회복지시설 등에서 취업할 수 있습니다.',
            '비용': '자격증 취득 비용은 교육과정, 실습비, 시험 응시료 등으로 구성되며, 자격증 종류에 따라 다릅니다.'
        };

        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }

        return '죄송합니다. 자격증 취득에 대해 더 자세히 알고 싶으신 내용을 입력해주세요. 예를 들어, "사회복지사", "보육교사", "평생교육사", "독학사", "시험", "실습", "취업", "비용" 등에 대해 물어보실 수 있습니다.';
    }

    // 이벤트 리스너 추가
    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});