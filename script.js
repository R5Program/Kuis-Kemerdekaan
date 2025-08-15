// Ambil elemen
const backBtn = document.getElementById("backBtn");
const retryBtn = document.getElementById("retryBtn");
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const nameForm = document.getElementById("nameForm");
const submitName = document.getElementById("submitName");
const quizPage = document.getElementById("quizPage");
const welcomeText = document.getElementById("welcomeText");

// Halaman tambahan
const pressurePage = document.getElementById("pressurePage");
const readyPage = document.getElementById("readyPage");
const pressureText = document.getElementById("pressureText");
const continueBtn = document.getElementById("continueBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Mulai → ke form nama
startBtn.addEventListener("click", () => {
	intro.classList.add("fade-out");
	setTimeout(() => {
		intro.classList.add("hidden");
		nameForm.classList.remove("hidden");
		nameForm.classList.add("fade-up");
	}, 500);
});

// ======== TEKS PRESSURE PER BAGIAN ========
const pressureParts = [
	(name) => `Halo ${name}, pada kuis ini akan diberikan 10 acak dari 100 soal yang sudah disiapkan.`,
	() => `Soalnya kurang lebih mengenai sejarah Indonesia sampai merdeka.
Sistemnya Pilihan Ganda, jadi kalau skor kamu dibawah 50 berarti kamu bodoh, idiot, stupid, ga suka menabung, sombong.....`,
	() => `becanda hehe........`,
	() => `Kalau skor kamu dibawah 50 sih, jiwa nasionalisme dipertanyakan sih. Semangat dan Jangan Nyontek😁`,
	() => `<span class = text-2xl font-bold>JANGAN NYONTEK!</span>`,
];

let pressureIndex = 0;

// Submit nama → ke pressurePage (bagian pertama)
submitName.addEventListener("click", () => {
	const name = nameForm.querySelector("input").value.trim();
	if (!name) return;

	welcomeText.textContent = `Selamat datang, ${name}!`;

	nameForm.classList.add("hidden");
	pressureIndex = 0;
	showPressurePart(name);
	pressurePage.classList.remove("hidden");
});

function showPressurePart(name) {
	pressureText.classList.remove("fade-up");
	void pressureText.offsetWidth; // reset animasi
	pressureText.innerHTML = pressureParts[pressureIndex](name);
	pressureText.classList.add("fade-up");
}

// Klik tombol lanjut di pressure
continueBtn.addEventListener("click", () => {
	const name = nameForm.querySelector("input").value.trim();
	pressureIndex++;

	if (pressureIndex < pressureParts.length) {
		showPressurePart(name);
	} else {
		// Kalau sudah habis → ke ready page
		pressurePage.classList.add("hidden");
		readyPage.classList.remove("hidden");
		readyPage.classList.add("fade-up");
	}
});

// Ready YA → mulai kuis
yesBtn.addEventListener("click", () => {
	readyPage.classList.add("hidden");
	quizPage.classList.remove("hidden");
	quizPage.classList.add("fade-up");
	showQuestion(currentIndex);
});

// Efek tombol "TIDAK" kabur
let hasMoved = false;

noBtn.addEventListener("mouseenter", () => {
	const container = readyPage.getBoundingClientRect();
	const btnWidth = noBtn.offsetWidth;
	const btnHeight = noBtn.offsetHeight;

	if (!hasMoved) {
		noBtn.style.position = "absolute"; // jadi absolute setelah hover
		hasMoved = true;
	}

	const maxX = container.width - btnWidth - 20;
	const maxY = container.height - btnHeight - 20;

	const randomX = Math.floor(Math.random() * maxX);
	const randomY = Math.floor(Math.random() * maxY);

	noBtn.style.left = `${randomX}px`;
	noBtn.style.top = `${randomY}px`;
});

// Ready TIDAK → balik intro
noBtn.addEventListener("click", () => {
	alert("Oke, balik lagi kalau udah siap!");
	readyPage.classList.add("hidden");
	intro.classList.remove("hidden");
	intro.classList.add("fade-up");
});

// ----------------- SOAL -----------------
const questions = [
	// 1
	{ q: "Siapakah proklamator kemerdekaan Indonesia?", options: ["Soekarno & Hatta", "Soekarno & Sjahrir", "Hatta & Tan Malaka", "Soepomo & Yamin"], answer: 0 },
	// 2
	{ q: "Kapan Indonesia merdeka?", options: ["18 Agustus 1945", "20 Mei 1945", "17 Agustus 1945", "1 Juni 1945"], answer: 2 },
	// 3
	{ q: "Dimana proklamasi kemerdekaan dibacakan?", options: ["Istana Merdeka", "Jl. Pegangsaan Timur No. 56", "Lapangan Ikada", "Gedung Pancasila"], answer: 1 },
	// 4
	{ q: "Siapa penulis teks proklamasi?", options: ["Moh. Yamin", "Soekarno", "Sayuti Melik", "Ahmad Soebardjo"], answer: 3 },
	// 5
	{ q: "Bendera merah putih pertama dijahit oleh?", options: ["Fatmawati", "Kartini", "Cut Nyak Dien", "Dewi Sartika"], answer: 0 },
	// 6
	{ q: "Organisasi Budi Utomo berdiri tahun?", options: ["1928", "1945", "1908", "1918"], answer: 2 },
	//
	{ q: "Sumpah Pemuda diikrarkan pada tahun?", options: ["1928", "1938", "1945", "1918"], answer: 0 },
	// 8
	{ q: "Pahlawan dari Aceh yang terkenal?", options: ["Pattimura", "Diponegoro", "Teuku Umar", "KH. Zainal Mustafa"], answer: 2 },
	// 9
	{ q: "Siapa Presiden RI ke-2?", options: ["BJ Habibie", "Soeharto", "Gus Dur", "Megawati"], answer: 1 },
	// 10
	{ q: "Siapa yang mengusulkan agar proklamasi dibacakan secepatnya?", options: ["Golongan Muda", "Golongan Tua", "BKR", "PETA"], answer: 0 },
	// 11
	{ q: "Peristiwa Rengasdengklok terjadi pada tanggal", options: ["16 Juli 1945", "14 Agustus 1945", "16 Agustus 1945", "15 Agustus 1945"], answer: 2 },
	// 12
	{ q: "Negara yang pertama menjajah Indonesia adalah?", options: ["Jepang", "Belanda", "Portugis", "Spanyol"], answer: 2 },
	// 13
	{ q: "Siapa yang menjadi Panglima Tertinggi Angkatan Perang Indonesia?", options: ["Soekarno", "Hatta", "Suharto", "Jenderal Sudirman"], answer: 3 },
	// 14
	{ q: "Apa nama organisasi yang didirikan oleh Soekarno pada tahun 1927?", options: ["Partai Nasional Indonesia", "Budi Utomo", "Sarekat Islam", "Gerakan Pramuka"], answer: 0 },
	// 15
	{ q: "Siapa yang menjadi Ketua PPKI pada saat proklamasi?", options: ["Soekarno", "Hatta", "Sutan Sjahrir", "Radjiman Wediodiningrat"], answer: 0 },
	// 16
	{ q: "Apa nama perjanjian yang mengakhiri agresi militer Belanda?", options: ["Perjanjian Linggarjati", "Perjanjian Renville", "Perjanjian Roem-Royen", "Perjanjian KMB"], answer: 2 },
	// 17
	{ q: "Apa nama organisasi yang didirikan oleh Dr. Wahidin Sudirohusodo?", options: ["Budi Utomo", "Sarekat Islam", "Partai Nasional Indonesia", "Gerakan Pramuka"], answer: 0 },
	// 18
	{ q: "Apa nama organisasi yang didirikan oleh Dr. Sutomo?", options: ["Budi Utomo", "Sarekat Islam", "Partai Nasional Indonesia", "Gerakan Pramuka"], answer: 0 },
	// 19
	{ q: "Negara Jepang menyerah kepada Sekutu pada tanggal ....", options: ["13 Agustus 1945", "14 Agustus 1945", "15 Agustus 1945", "16 Agustus 1945"], answer: 1 },
	// 20
	{ q: "Berita Jepang menyerah kepada sekutu diperoleh pemuda Bandung melalui ...", options: ["Majalah", "Koran", "Televisi", "Radio"], answer: 3 },
	// 21
	{ q: "Tokoh yang mengusulkan agar naskah proklamasi ditandatangani Ir. Soekarno dan Moh. Hatta atas nama bangsa Indonesia adalah ?", options: ["Wikana", "Soekarni", "HOS. Tjokroaminoto", "Ahmad Soebardjo"], answer: 3 },
];

let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10); // Ambil 10 soal acak
let currentIndex = 0;
let score = 0;

const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const questionForm = document.getElementById("questionForm");

// Tampilkan soal
function showQuestion(index) {
	const q = shuffledQuestions[index];
	const questionText = document.getElementById("questionText");

	questionText.classList.remove("fade-up");
	void questionText.offsetWidth;
	questionText.classList.add("fade-up");

	questionText.textContent = q.q;
	optionsContainer.innerHTML = "";
	nextBtn.disabled = true;
	nextBtn.className = "px-4 py-2 rounded bg-gray-500 text-black cursor-not-allowed border border-transparent";

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

	optionsContainer.classList.remove("fade-up");
	void optionsContainer.offsetWidth;
	optionsContainer.classList.add("fade-up");
}

// Enable tombol saat pilih
questionForm.addEventListener("change", () => {
	nextBtn.disabled = false;
	nextBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
	nextBtn.classList.add("bg-white");
});

// Klik next
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

// Hasil
function showResult() {
	quizPage.classList.add("hidden");
	document.getElementById("resultContainer").classList.remove("hidden");

	let finalDisplay = document.getElementById("finalScore");
	let start = 0;
	let end = score;
	let duration = 800;
	let startTime = null;

	function animateScore(timestamp) {
		if (!startTime) startTime = timestamp;
		let progress = Math.min((timestamp - startTime) / duration, 1);
		let value = Math.floor(progress * (end - start) + start);
		finalDisplay.textContent = value;
		if (progress < 1) requestAnimationFrame(animateScore);
	}
	requestAnimationFrame(animateScore);
}

// Event listener tombol kembali & ulang
document.getElementById("backBtn").addEventListener("click", () => {
	score = 0;
	currentIndex = 0;

	// Acak ulang pertanyaan
	shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);

	// Sembunyikan semua section
	document.getElementById("resultContainer").classList.add("hidden");
	quizPage.classList.add("hidden");
	pressurePage.classList.add("hidden");
	readyPage.classList.add("hidden");

	// Tampilkan intro
	intro.classList.remove("hidden");
	intro.classList.add("fade-up");
});

document.getElementById("retryBtn").addEventListener("click", () => {
	score = 0;
	currentIndex = 0;
	shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10); // Acak ulang pertanyaan
	document.getElementById("resultContainer").classList.add("hidden");
	quizPage.classList.remove("hidden");
	showQuestion(currentIndex);
});
