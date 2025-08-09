document.addEventListener("DOMContentLoaded", () => {
  // Lógica para Animação no Scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  // Opções para o Intersection Observer
  const observerOptions = {
    root: null, // usa o viewport como a área de observação
    rootMargin: "0px",
    threshold: 0.1, // 10% do elemento precisa estar visível para disparar
  };

  // Criação do observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Se o elemento está visível
      if (entry.isIntersecting) {
        // Adiciona a classe 'is-visible' para ativar a animação CSS
        entry.target.classList.add("is-visible");
        // Para de observar o elemento para não animar novamente
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Itera sobre todos os elementos e começa a observá-los
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

const members = document.querySelectorAll(".team-member");
let current = 0;
let intervalId;

function updateCarousel() {
  members.forEach((el, i) => {
    el.classList.remove("active", "next", "prev");
    if (i === current) el.classList.add("active");
    else if (i === (current + 1) % members.length) el.classList.add("next");
    else if (i === (current - 1 + members.length) % members.length)
      el.classList.add("prev");
  });
}

function nextMember() {
  current = (current + 1) % members.length;
  updateCarousel();
}

function prevMember() {
  current = (current - 1 + members.length) % members.length;
  updateCarousel();
}

document.querySelector(".carousel-btn.next-btn").onclick = () => {
  nextMember();
  resetInterval();
};
document.querySelector(".carousel-btn.prev-btn").onclick = () => {
  prevMember();
  resetInterval();
};

function startInterval() {
  intervalId = setInterval(nextMember, 5000);
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

updateCarousel();
startInterval();
