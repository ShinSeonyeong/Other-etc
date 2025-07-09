const randomAboutMe = [
  "코드는 결국 사람을 위한 것, 저는 언제나 사용자의 눈으로 시작합니다.",
  "매일 한 페이지씩, 저는 성장이라는 책을 써내려가고 있습니다.",
  "감사의 마음은 저를 더 단단하게, 더 따뜻하게 만들어줍니다.",
  "기술보다 중요한 건 사람, 그래서 저는 ‘공감’부터 시작합니다.",
  "코드를 잘 짜기 위해, 오늘도 몸과 마음을 튼튼하게 다집니다.",
];

let aboutShown = false;

window.addEventListener("scroll", () => {
  const introSection = document.getElementById("intro");
  const aboutText = document.getElementById("about_text");
  const scrollY = window.scrollY;

  // 👇 여기 수정!
  const triggerPoint = introSection.offsetTop + introSection.offsetHeight / 2;
  if (!aboutShown && scrollY > triggerPoint) {
    const randomIndex = Math.floor(Math.random() * randomAboutMe.length);
    aboutText.textContent = randomAboutMe[randomIndex];
    aboutText.classList.add("visible");
    aboutShown = true;
  }
});

const projectData = [
  {
    title: "Project1 - 꼬박2 가계부 앱",
    roles: ["월별, 년별 통계페이지 제작"],
    tags: ["html5", "css3", "github", "sourceTree"],
    period: "2024.01 (1개월)",
    url: "https://soye00.github.io/my-tests/p1/p1-firstpg.html",
  },
  {
    title: "Project2 - 제빙기청소 사이트",
    roles: ["예약페이지 제작"],
    tags: ["html5", "css3", "javaScript", "github", "sourceTree"],
    period: "2024.02 (1개월)",
    url: "https://haracedaily.github.io/iceClean/index.html",
  },
  {
    title: "Project3 - 제빙기청소 사이트(리뉴얼)",
    roles: ["게시판 제작, db 연동"],
    tags: ["html5", "css3", "javaScript", "supabase", "github", "sourceTree"],
    period: "2024.03 (1개월)",
    url: "https://haracedaily.github.io/renew_ice_clean/",
  },
  {
    title: "Project4 - 제빙기청소 사이트",
    roles: ["관리자페이지 제작"],
    tags: [
      "html5",
      "css3",
      "javaScript",
      "tailwindCSS",
      "React",
      "supabase",
      "github",
      "sourceTree",
    ],
    period: "2024.04 (1개월)",
    url: "https://ice-care-admin.vercel.app/",
  },
  {
    title: "Project5 - 대중교통 서비스 제공 사이트",
    roles: ["경로 시각화 기능"],
    tags: [
      "html5",
      "css3",
      "javaScript",
      "tailwindCSS",
      "antdesign",
      "tago API",
      "대구 API",
      "React",
      "supabase",
      "vercel",
      "axios",
      "kakaoMap",
      "postman",
      "github",
      "sourceTree",
    ],
    period: "2024.05 (1개월)",
    url: "https://public-traffic-alpha.vercel.app/",
  },
  {
    title: "Project4 - 제빙기청소 사이트",
    roles: ["관리자페이지 리뉴얼"],
    tags: [
      "html5",
      "css3",
      "javaScript",
      "tailwindCSS",
      "React",
      "supabase",
      "github",
      "sourceTree",
    ],
    period: "2024.06 (1개월)",
    url: "https://mini-project06-ice-admin.vercel.app/login",
  },
];

const container = document.getElementById("projects_section");

projectData.forEach((project) => {
  const card = document.createElement("a");
  card.href = project.url;
  card.target = "_blank";
  card.className = "project_card";

  card.innerHTML = `
    <h4>내용 & 역할</h4>
    <ul>
      ${project.roles.map((role) => `<li>${role}</li>`).join("")}
    </ul>
    <div class="project_title">
      <strong>${project.title}</strong>
      <div class="tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
    <div class="period">${project.period}</div>
  `;

  container.appendChild(card);
});

const careerData = [
  {
    company: "(주)케이아이에스",
    role: "MES/ERP운용",
    period: "2023.10 ~ 2024.11"
  },
  {
    company: "세명대학교",
    role: "조교",
    period: "2022.03 ~ 2023.03"
  },
  {
    company: "주식회사미래융합정보기술",
    role: "교육융합부",
    period: "2021.09 ~ 2022.03"
  }
];

const timeline = document.getElementById("career_timeline");

careerData.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "career_item";
  div.style.animationDelay = `${index * 0.2}s`;
  div.innerHTML = `
    <h3>${item.company}</h3>
    <p class="role">${item.role}</p>
    <p class="period">${item.period}</p>
  `;
  timeline.appendChild(div);
});