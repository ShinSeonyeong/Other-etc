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
  const aboutBox = document.getElementById("intro_random_about");
  const scrollY = window.scrollY;

  // 👇 여기 수정!
  const triggerPoint = introSection.offsetTop + introSection.offsetHeight / 2;
  if (!aboutShown && scrollY > triggerPoint) {
    const randomIndex = Math.floor(Math.random() * randomAboutMe.length);
    aboutBox.textContent = randomAboutMe[randomIndex];
    aboutBox.classList.add("visible");
    aboutShown = true;
  }
});
