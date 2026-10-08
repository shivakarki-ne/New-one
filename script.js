const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("loaded");

    }, 800);

});

const nav = $(".navbar");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  $(".progress").style.width = `${(scrollY / h) * 100}%`;
});

$(".menu-btn")?.addEventListener("click", () => $("nav").classList.toggle("open"));
$$(".navbar nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

$$(".filter").forEach(btn => btn.addEventListener("click", () => {
  $$(".filter").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  $$(".work-card").forEach(card => card.classList.toggle("hide", f !== "all" && card.dataset.category !== f));
}));

const modal = $("#projectModal");
$$(".view-btn").forEach(btn => btn.addEventListener("click", () => {
  $("#modalTitle").textContent = btn.dataset.title;
  $("#modalType").textContent = btn.dataset.type;
  modal.classList.add("show");
}));
$(".modal-close")?.addEventListener("click", () => modal.classList.remove("show"));
modal?.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });

$$(".video-link").forEach(link => link.addEventListener("click", e => {
  e.preventDefault();
  const id = link.dataset.video;
  if(id && !id.includes("YOUR_")) window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
  else alert("Replace YOUR_YOUTUBE_VIDEO_ID in index.html with your real YouTube video ID.");
}));

$("#year").textContent = new Date().getFullYear();

document.addEventListener("mousemove", e => {
  const cards = $$(".floating-card");
  const x = (e.clientX / innerWidth - .5) * 10;
  const y = (e.clientY / innerHeight - .5) * 10;
  cards.forEach((c,i) => c.style.transform = `translate(${x*(i+1)}px, ${y*(i+1)}px)`);
});
