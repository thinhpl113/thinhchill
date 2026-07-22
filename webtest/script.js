const profiles = [
  {
    name: "Minh Koi",
    tagline: "Nguoi thich bien y tuong ngau hung thanh nhung thu nho nho nhin la muon bam vao.",
    bio: "Ban than cua toi la mot ban phoi giua coder, nguoi chup anh duong pho va ke nghien viec ngoi o quan ca phe de nghi ra du an moi. Toi yeu nhung website co ca tinh va cam giac nhu mot tam name card dang chuyen dong.",
    roles: ["Frontend Tinkerer", "Night Walker", "UI Collector"],
    likes: ["Nghe city pop khi lam viec", "Chup anh bien hieu cu", "Nghich layout lech truoc khi can choi ngan"],
    quote: "Toi khong thich binh thuong. Toi thich nhung thu co nhip rieng."
  },
  {
    name: "Bao Moon",
    tagline: "Mot nguoi vua viet code, vua suu tam playlist, vua tim cach lam Internet vui hon mot chut.",
    bio: "Toi hay bat dau tu mot cam hung rat nho: mau sac cua vo dia, tam poster cu hay mot dong chu tren toa nha. Roi toi dem no vao giao dien, bien no thanh mot trai nghiem nho ma co hon.",
    roles: ["Creative Developer", "Playlist Curator", "Pixel Listener"],
    likes: ["Lam web theo concept album", "Viet note luc 2h sang", "San do vat retro online"],
    quote: "Neu giao dien khien ban muon dung lai 3 giay, no da co ly do de ton tai."
  },
  {
    name: "Linh Zest",
    tagline: "Toi tao ra nhung trang web nho xinh, dam chat ca nhan, va luon co chut bat ngo khi ban scroll.",
    bio: "Ngay thuong toi lam viec voi code, cuoi tuan toi di lang thang xem trien lam, nhat ve texture, typo, va mood. Moi du an voi toi la mot lan ghep tinh cach vao man hinh.",
    roles: ["Web Designer", "Motion Fan", "Moodboard Hoarder"],
    likes: ["Suu tam typeface la", "Them chuyen dong co chu dich", "Pha mau am nong thay vi an toan"],
    quote: "Website gioi thieu ban than khong can on ao, chi can that dung chat."
  },
  {
    name: "Khanh Orbit",
    tagline: "Lam san pham bang ly tri, nhung giu chat rieng bang truc giac va nhung so thich ky cuc.",
    bio: "Toi thich chia mot cau chuyen lon thanh nhung khoanh khac nho: mot cau mo dau tot, mot bang mau co tinh than, mot nut bam duoc dat dung cho. The la du.",
    roles: ["Product Mind", "Visual Explorer", "Coffee Optimizer"],
    likes: ["Ve wireframe tren giay nhap", "Di bo de giai bai toan kho", "Doc tap chi thiet ke cu"],
    quote: "Don gian khong co nghia la nhat. Don gian la da du."
  }
];

const themes = [
  {
    bg: "#f4efe7",
    bgAccent: "#f8d8b8",
    surface: "rgba(255, 252, 247, 0.78)",
    surfaceStrong: "#fff9f1",
    text: "#1e1b18",
    muted: "#645b54",
    primary: "#c8553d",
    secondary: "#275d63"
  },
  {
    bg: "#edf4ff",
    bgAccent: "#b1d4ff",
    surface: "rgba(247, 251, 255, 0.8)",
    surfaceStrong: "#ffffff",
    text: "#132238",
    muted: "#516173",
    primary: "#ff6b35",
    secondary: "#005f73"
  },
  {
    bg: "#f7f0ff",
    bgAccent: "#ffd6cc",
    surface: "rgba(255, 251, 255, 0.78)",
    surfaceStrong: "#fffaff",
    text: "#22162b",
    muted: "#6c5a75",
    primary: "#e76f51",
    secondary: "#6d597a"
  },
  {
    bg: "#eef6ee",
    bgAccent: "#cfe7bd",
    surface: "rgba(252, 255, 248, 0.8)",
    surfaceStrong: "#fbfff6",
    text: "#1b2418",
    muted: "#5f6955",
    primary: "#bc6c25",
    secondary: "#386641"
  }
];

const nameEl = document.getElementById("name");
const taglineEl = document.getElementById("tagline");
const bioEl = document.getElementById("bio");
const rolesEl = document.getElementById("roles");
const likesEl = document.getElementById("likes");
const quoteEl = document.getElementById("quote");
const shuffleBtn = document.getElementById("shuffleBtn");

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function renderList(element, items) {
  element.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg-accent", theme.bgAccent);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-strong", theme.surfaceStrong);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
}

function renderProfile() {
  const profile = randomItem(profiles);
  const theme = randomItem(themes);

  nameEl.textContent = profile.name;
  taglineEl.textContent = profile.tagline;
  bioEl.textContent = profile.bio;
  quoteEl.textContent = profile.quote;

  renderList(rolesEl, profile.roles);
  renderList(likesEl, profile.likes);
  applyTheme(theme);
}

shuffleBtn.addEventListener("click", renderProfile);
renderProfile();
