// 1. Xử lý lật Flashcard khi Click
const flashcard = document.querySelector('.flashcard-inner');
flashcard.addEventListener('click', () => {
    flashcard.style.transform = flashcard.style.transform === 'rotateY(180deg)' 
                                ? 'rotateY(0deg)' 
                                : 'rotateY(180deg)';
});

// 2. Dữ liệu Quiz mẫu (Sau này sẽ lấy từ Backend/AI)
const quizData = [
    {
        question: "Thành phần nào sau đây là bộ não của máy tính?",
        options: ["RAM", "CPU", "Ổ cứng", "Màn hình"],
        answer: 1
    },
    {
        question: "Ngôn ngữ nào dùng để tạo cấu trúc trang web?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: 2
    }
];

let currentQuiz = 0;

// 3. Hàm hiển thị câu hỏi Quiz
function loadQuiz() {
    const quizBox = document.querySelector('.quiz-box');
    const data = quizData[currentQuiz];
    
    quizBox.innerHTML = `
        <p><strong>Câu ${currentQuiz + 1}:</strong> ${data.question}</p>
        ${data.options.map((opt, index) => `
            <label><input type="radio" name="quiz" value="${index}"> ${opt}</label><br>
        `).join('')}
        <button class="btn-next" onclick="nextQuestion()">Câu tiếp theo</button>
    `;
}

function nextQuestion() {
    const selector = document.querySelector('input[name="quiz"]:checked');
    if (selector) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            alert("Chúc mừng! Bạn đã hoàn thành bài ôn tập.");
            currentQuiz = 0;
            loadQuiz();
        }
    } else {
        alert("Vui lòng chọn một đáp án!");
    }
}

// 4. Xử lý nút AI (Giả lập)
const aiBtn = document.querySelector('.btn-ai');
aiBtn.addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        aiBtn.innerText = "Đang phân tích giáo trình...";
        aiBtn.style.backgroundColor = "#ff9800";
        
        // Giả lập chờ AI phản hồi trong 3 giây
        setTimeout(() => {
            alert("AI đã tạo xong bộ câu hỏi từ file của bạn!");
            aiBtn.innerText = "Bắt đầu tạo với AI";
            aiBtn.style.backgroundColor = "#1a73e8";
        }, 3000);
    } else {
        alert("Hãy chọn một file PDF giáo trình trước!");
    }
});

// Chạy hàm load Quiz lần đầu
loadQuiz();

async function askAI() {
    const fileInput = document.getElementById('fileInput');
    const queryInput = document.getElementById('aiQuery');
    const responseBox = document.getElementById('aiResponse');
    const responseText = document.getElementById('aiText');
    const btn = document.querySelector('.btn-ai');

    const query = queryInput.value.trim();

    if (!query && fileInput.files.length === 0) {
        alert("Vui lòng nhập yêu cầu hoặc chọn file giáo trình!");
        return;
    }

    // Hiệu ứng đang tải
    btn.innerText = "AI đang suy nghĩ...";
    btn.disabled = true;
    responseBox.style.display = "block";
    responseText.innerText = "Đang kết nối với Gemini API...";

    // GIẢ LẬP: Sau này bạn sẽ thay đoạn này bằng lệnh fetch() tới Backend
    setTimeout(() => {
        btn.innerText = "Gửi yêu cầu tới AI";
        btn.disabled = false;
        
        if (query.toLowerCase().includes("trắc nghiệm")) {
            responseText.innerText = "Đã hiểu! Tôi đã tạo xong 5 câu trắc nghiệm mới dựa trên giáo trình của bạn. Bạn có thể bắt đầu làm bài ngay.";
        } else {
            responseText.innerText = "Dựa trên yêu cầu: '" + query + "', tôi đã phân tích tài liệu và sẵn sàng hỗ trợ bạn ôn tập.";
        }
    }, 2000);
}