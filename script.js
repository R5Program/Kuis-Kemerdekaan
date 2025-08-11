const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const nameForm = document.getElementById("nameForm");

startBtn.addEventListener("click", () => {
	// Animasi keluar intro
	intro.classList.add("fade-out");
	setTimeout(() => {
		intro.style.display = "none"; // hilangkan intro
		nameForm.classList.remove("hidden"); // tampilkan form
		nameForm.style.animationDelay = "0s"; // langsung animasi
	}, 500); // tunggu animasi keluar selesai
});

// const startBtn = document.getElementById("startBtn");
// const nameForm = document.getElementById("nameForm");
const submitName = document.getElementById("submitName");
const quizPage = document.getElementById("quizPage");
const welcomeText = document.getElementById("welcomeText");

startBtn.addEventListener("click", () => {
	document.getElementById("landingPage").classList.add("hidden");
	nameForm.classList.remove("hidden");
});

submitName.addEventListener("click", () => {
	const name = nameForm.querySelector("input").value.trim();
	if (name) {
		nameForm.classList.add("hidden");
		welcomeText.textContent = `Selamat datang ${name}`;
		quizPage.classList.remove("hidden");
	}
});

const questions = [
	{ q: "Siapakah proklamator kemerdekaan Indonesia?", options: ["Soekarno & Hatta", "Soekarno & Sjahrir", "Hatta & Tan Malaka", "Soepomo & Yamin"], answer: 0 },
	{ q: "Kapan Indonesia merdeka?", options: ["17 Agustus 1945", "18 Agustus 1945", "20 Mei 1945", "1 Juni 1945"], answer: 0 },
	{ q: "Dimana proklamasi kemerdekaan dibacakan?", options: ["Jl. Pegangsaan Timur No. 56", "Istana Merdeka", "Lapangan Ikada", "Gedung Pancasila"], answer: 0 },
	{ q: "Siapa penulis teks proklamasi?", options: ["Ahmad Soebardjo", "Moh. Yamin", "Soekarno", "Sayuti Melik"], answer: 0 },
	{ q: "Bendera merah putih pertama dijahit oleh?", options: ["Fatmawati", "Kartini", "Cut Nyak Dien", "Dewi Sartika"], answer: 0 },
	{ q: "Organisasi Budi Utomo berdiri tahun?", options: ["1908", "1928", "1945", "1918"], answer: 0 },
	{ q: "Sumpah Pemuda diikrarkan pada tahun?", options: ["1928", "1938", "1945", "1918"], answer: 0 },
	{ q: "Pahlawan dari Aceh yang terkenal?", options: ["Teuku Umar", "Pattimura", "Diponegoro", "Cut Nyak Dien"], answer: 0 },
	{ q: "Siapa Presiden RI ke-2?", options: ["BJ Habibie", "Soeharto", "Gus Dur", "Megawati"], answer: 1 },
	{ q: "Siapa penjahit bendera pusaka?", options: ["Fatmawati", "Kartini", "Cut Nyak Dien", "Martha Christina Tiahahu"], answer: 0 },
];

// Acak urutan soal
let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
let currentIndex = 0;
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const questionForm = document.getElementById("questionForm");

function showQuestion(index) {
	const q = shuffledQuestions[index];
	const questionText = document.getElementById("questionText");

	// Biar animasi bisa di-retrigger tiap kali soal ganti
	questionText.classList.remove("fade-up");
	void questionText.offsetWidth; // trik reset animasi
	questionText.classList.add("fade-up");

	questionText.textContent = q.q;

	// Reset pilihan & tombol
	optionsContainer.innerHTML = "";
	nextBtn.disabled = true;
	nextBtn.className = "px-4 py-2 rounded bg-gray-500 text-black cursor-not-allowed border border-transparent";

	// Render opsi
	q.options.forEach((opt, i) => {
		const label = document.createElement("label");
		label.className = "flex items-center space-x-3 border rounded px-4 py-2 cursor-pointer bg-white text-black";

		const input = document.createElement("input");
		input.type = "radio";
		input.name = "answer";
		input.value = i;
		input.className = "form-radio h-4 w-4 text-blue-500";

		const span = document.createElement("span");
		span.textContent = opt;

		label.appendChild(input);
		label.appendChild(span);
		optionsContainer.appendChild(label);
	});

	// Efek animasi juga buat opsi jawaban
	optionsContainer.classList.remove("fade-up");
	void optionsContainer.offsetWidth;
	optionsContainer.classList.add("fade-up");
}

// Enable tombol saat pilih jawaban
questionForm.addEventListener("change", () => {
	nextBtn.disabled = false;
	nextBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
	nextBtn.classList.add("bg-white");
});

// Saat klik next
// nextBtn.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	const selected = questionForm.querySelector("input[name='answer']:checked");
// 	if (!selected) return; // safety, kalau belum pilih

// 	currentIndex++;
// 	if (currentIndex < shuffledQuestions.length) {
// 		showQuestion(currentIndex);
// 	} else {
// 		alert("Kuis selesai!");
// 	}
// });

// Tampilkan soal pertama
showQuestion(currentIndex);

// Tambah score
let score = 0;

// Saat klik Next (dan jawabannya benar, tambah score)
// Hapus listener Next yang lama (yang ada alert-nya)
nextBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const selected = questionForm.querySelector("input[name='answer']:checked");
	if (!selected) return;

	const answer = parseInt(selected.value);
	if (answer === shuffledQuestions[currentIndex].answer) {
		score += 10;
	}

	currentIndex++;
	if (currentIndex < shuffledQuestions.length) {
		showQuestion(currentIndex);
	} else {
		showResult();
	}
});

function showResult() {
	document.getElementById("quizPage").classList.add("hidden");
	document.getElementById("resultContainer").classList.remove("hidden");

	let finalDisplay = document.getElementById("finalScore");
	let start = 0;
	let end = score;
	let duration = 800; // durasi animasi dalam ms
	let startTime = null;

	function animateScore(timestamp) {
		if (!startTime) startTime = timestamp;
		let progress = Math.min((timestamp - startTime) / duration, 1);
		let value = Math.floor(progress * (end - start) + start);
		finalDisplay.textContent = value;

		if (progress < 1) {
			requestAnimationFrame(animateScore);
		}
	}

	// Mulai animasi
	requestAnimationFrame(animateScore);
}
