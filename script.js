const APPS = [
  {
    name: "Quiz Me App",
    description: "A quiz-focused learning app built to practice concepts while experimenting with product ideas.",
    appUrl: "https://apps.aniketshedge.com/quiz-me/",
    faviconUrl: "https://raw.githubusercontent.com/aniketshedge/quiz-me-app/6ce57e6190552a84afb19754b3ae7ee78b092f67/frontend/public/favicon.svg",
    codeUrl: "https://github.com/aniketshedge/quiz-me-app",
    initials: "QM"
  },
  {
    name: "App Creator",
    description: "A hobby project around app-creation workflows and experimentation for learning.",
    appUrl: "https://apps.aniketshedge.com/app-creator/",
    faviconUrl: "https://raw.githubusercontent.com/aniketshedge/tds-project-1-app-creator/main/frontend/public/favicon.svg",
    codeUrl: "https://github.com/aniketshedge/tds-project-1-app-creator",
    initials: "TA"
  }
];

const THEME_HOURS = {
  lightStart: 7,
  darkStart: 19
};

const appGrid = document.getElementById("app-grid");
const themeToggle = document.getElementById("theme-toggle");
let activeTheme = pickThemeByTime();

applyTheme(activeTheme);
renderCards();

themeToggle.addEventListener("click", () => {
  activeTheme = activeTheme === "light" ? "dark" : "light";
  applyTheme(activeTheme);
});

function pickThemeByTime(now = new Date()) {
  const hour = now.getHours();
  return hour >= THEME_HOURS.lightStart && hour < THEME_HOURS.darkStart ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const nextTheme = theme === "light" ? "dark" : "light";
  themeToggle.textContent = `Switch to ${capitalize(nextTheme)}`;
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
}

function renderCards() {
  APPS.forEach((app) => {
    const listItem = document.createElement("li");
    const card = document.createElement("article");
    card.className = "app-card";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", `Open ${app.name}`);

    const top = document.createElement("div");
    top.className = "app-card-top";

    const iconWrap = document.createElement("div");
    iconWrap.className = "app-icon-wrap";

    const icon = document.createElement("img");
    icon.className = "app-icon";
    icon.alt = `${app.name} favicon`;
    icon.loading = "lazy";
    icon.decoding = "async";
    icon.src = app.faviconUrl;

    const iconFallback = document.createElement("span");
    iconFallback.className = "app-icon-fallback";
    iconFallback.textContent = app.initials;
    iconFallback.hidden = true;

    icon.addEventListener("load", () => {
      iconFallback.hidden = true;
    });

    icon.addEventListener("error", () => {
      icon.hidden = true;
      iconFallback.hidden = false;
    });

    const title = document.createElement("h2");
    title.className = "app-title";
    title.textContent = app.name;

    const description = document.createElement("p");
    description.className = "app-description";
    description.textContent = app.description;

    const actions = document.createElement("div");
    actions.className = "app-actions";

    const appLink = document.createElement("a");
    appLink.className = "btn btn-primary";
    appLink.href = app.appUrl;
    appLink.target = "_blank";
    appLink.rel = "noopener noreferrer";
    appLink.textContent = "Go to App";

    const codeLink = document.createElement("a");
    codeLink.className = "btn btn-secondary";
    codeLink.href = app.codeUrl;
    codeLink.target = "_blank";
    codeLink.rel = "noopener noreferrer";
    codeLink.textContent = "Code";

    actions.append(appLink, codeLink);
    iconWrap.append(icon, iconFallback);
    top.append(iconWrap, title);
    card.append(top, description, actions);
    listItem.append(card);
    appGrid.append(listItem);

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }
      if (hasTextSelection()) {
        return;
      }
      window.open(app.appUrl, "_blank", "noopener,noreferrer");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.open(app.appUrl, "_blank", "noopener,noreferrer");
      }
    });
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function hasTextSelection() {
  const selection = window.getSelection();
  if (!selection) {
    return false;
  }
  return selection.toString().trim().length > 0;
}
