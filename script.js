const projects = [
  {
    name: "Innovation Hub",
    category: "Core Platform",
    filterCategory: ["ops"],
    description: "Central launchpad for innovation initiatives, shared resources, and connected internal workspaces.",
    url: "https://example.com/innovation-hub",
    status: "active",
    statusLabel: "Active",
    icon: "hub",
    metricValue: "24",
    metricLabel: "live spaces",
    usageHint: "Best starting point for navigating pilots and workstreams.",
    size: "featured",
    tone: "orange"
  },
  {
    name: "AI chatbot",
    category: "Artificial Intelligence",
    filterCategory: ["ai"],
    description: "Conversational assistant experience for answering questions, guiding workflows, and supporting teams.",
    url: "https://example.com/ai-chatbot",
    status: "active",
    statusLabel: "Active",
    icon: "robot",
    metricValue: "91%",
    metricLabel: "resolution rate",
    usageHint: "Use for quick answers, workflow guidance, and internal help.",
    size: "standard",
    tone: "astronaut"
  },
  {
    name: "AI Knowledgebase",
    category: "Knowledge System",
    filterCategory: ["ai", "knowledge"],
    description: "Searchable knowledge environment for documents, answers, references, and organization-wide learning.",
    url: "https://example.com/ai-knowledgebase",
    status: "beta",
    statusLabel: "Beta",
    icon: "book",
    metricValue: "3.2k",
    metricLabel: "indexed docs",
    usageHint: "Great for retrieval, references, and reusable project knowledge.",
    size: "standard",
    tone: "grey"
  },
  {
    name: "Setup Wizard",
    category: "Configuration",
    filterCategory: ["ops"],
    description: "Guided onboarding flow for setting up tools, environments, and project-ready configurations.",
    url: "https://example.com/setup-wizard/",
    status: "active",
    statusLabel: "Active",
    icon: "wand",
    metricValue: "12",
    metricLabel: "active flows",
    usageHint: "Guides teams into ready-to-use project environments.",
    size: "standard",
    tone: "orange"
  },
  {
    name: "Dashboard Variance",
    category: "Analytics",
    filterCategory: ["ops"],
    description: "Track performance movement, exceptions, and operational variance through a focused dashboard view.",
    url: "https://example.com/dashboard-variance",
    status: "active",
    statusLabel: "Active",
    icon: "chart",
    metricValue: "18",
    metricLabel: "signals today",
    usageHint: "Watch variances, spikes, and trend changes as they happen.",
    size: "featured",
    tone: "astronaut"
  },
  {
    name: "Project Portfolio Management",
    category: "Governance",
    filterCategory: ["ops"],
    description: "Portfolio-level visibility for prioritization, planning, dependencies, and decision support.",
    url: "https://example.com/project-portfolio-management",
    status: "beta",
    statusLabel: "Beta",
    icon: "layers",
    metricValue: "37",
    metricLabel: "tracked initiatives",
    usageHint: "Prioritize, sequence, and compare project bets in one view.",
    size: "standard",
    tone: "grey"
  },
  {
    name: "GLPi",
    category: "Service Management",
    filterCategory: ["ops"],
    description: "Service desk and IT asset management workspace for requests, issue handling, and operational support.",
    url: "https://example.com/glpi",
    status: "active",
    statusLabel: "Active",
    icon: "toolbox",
    metricValue: "128",
    metricLabel: "open requests",
    usageHint: "Useful for service workflows, asset support, and intake.",
    size: "standard",
    tone: "orange"
  },
  {
    name: "MediaWiki",
    category: "Collaboration",
    filterCategory: ["knowledge"],
    description: "Collaborative documentation space for process knowledge, project pages, and shared institutional memory.",
    url: "https://example.com/mediawiki",
    status: "active",
    statusLabel: "Active",
    icon: "library",
    metricValue: "460",
    metricLabel: "knowledge pages",
    usageHint: "Ideal for collaborative documentation and institutional memory.",
    size: "standard",
    tone: "astronaut"
  }
];

const projectGrid = document.getElementById("project-grid");
const projectCountBadge = document.getElementById("project-count-badge");
const projectSearch = document.getElementById("project-search");
const focusSearchButton = document.getElementById("focus-search-button");
const launchProjectButton = document.getElementById("launch-project-button");
const emptyState = document.getElementById("empty-state");
const resultsMeta = document.getElementById("results-meta");
const heroSection = document.getElementById("hero-section");
const projectsSection = document.getElementById("projects-section");
const topbar = document.getElementById("topbar");
const filterBar = document.getElementById("category-filters");
const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
const heroVisual = document.querySelector(".hero-visual");

const searchState = {
  query: "",
  isSearching: false,
  activeFilter: "all"
};

const iconSprites = {
  hub: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v5"></path>
      <path d="M12 16v5"></path>
      <path d="M3 12h5"></path>
      <path d="M16 12h5"></path>
      <circle cx="12" cy="12" r="4"></circle>
    </svg>
  `,
  robot: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v3"></path>
      <rect x="5" y="7" width="14" height="11" rx="3"></rect>
      <path d="M9 11h.01"></path>
      <path d="M15 11h.01"></path>
      <path d="M8 16h8"></path>
    </svg>
  `,
  book: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>
    </svg>
  `,
  wand: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="m4 20 16-16"></path>
      <path d="m15 4 1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"></path>
      <path d="m5 10 1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"></path>
    </svg>
  `,
  chart: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="m7 14 4-4 3 3 5-6"></path>
    </svg>
  `,
  layers: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3 9 5-9 5-9-5 9-5Z"></path>
      <path d="m3 12 9 5 9-5"></path>
      <path d="m3 16 9 5 9-5"></path>
    </svg>
  `,
  toolbox: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 5h4a2 2 0 0 1 2 2v1H8V7a2 2 0 0 1 2-2Z"></path>
      <rect x="3" y="8" width="18" height="11" rx="2"></rect>
      <path d="M3 13h18"></path>
      <path d="M10 13v2"></path>
      <path d="M14 13v2"></path>
    </svg>
  `,
  library: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 22h16"></path>
      <path d="M6 18V8"></path>
      <path d="M10 18V8"></path>
      <path d="M14 18V8"></path>
      <path d="M18 18V8"></path>
      <path d="M3 8l9-5 9 5"></path>
    </svg>
  `
};

function createStatusBadge(project) {
  if (project.status === "active") {
    return `
      <span class="status-badge status-badge-active" aria-label="${project.statusLabel}">
        <span class="status-dot"></span>
      </span>
    `;
  }

  return `<span class="status-badge status-badge-beta">${project.statusLabel}</span>`;
}

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = `project-card ${project.size} tone-${project.tone}`;
  article.tabIndex = 0;
  article.setAttribute("role", "link");
  article.setAttribute("aria-label", `Open ${project.name}`);
  article.dataset.url = project.url;
  article.dataset.category = JSON.stringify(project.filterCategory);
  article.dataset.search = [
    project.name,
    project.category,
    project.description,
    project.statusLabel,
    project.usageHint,
    project.metricLabel
  ].join(" ").toLowerCase();
  article.style.animationDelay = `${index * 90}ms`;

  article.innerHTML = `
    <div class="project-card-top">
      <div class="project-icon" aria-hidden="true">${iconSprites[project.icon] || ""}</div>
      ${createStatusBadge(project)}
    </div>
    <p class="project-meta">${project.category}</p>
    <h4 class="project-title">${project.name}</h4>
    <p class="project-description">${project.description}</p>
    <div class="project-insight">
      <div>
        <span class="project-metric-value">${project.metricValue}</span>
        <span class="project-metric-label">${project.metricLabel}</span>
      </div>
      <p class="project-hint">${project.usageHint}</p>
    </div>
    <div class="project-footer">
      <span class="project-status">${project.statusLabel}</span>
      <a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Launch ${project.name}">
        <span class="project-link-text">Launch</span>
        <span class="project-link-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17 17 7"></path>
            <path d="M8 7h9v9"></path>
          </svg>
        </span>
      </a>
    </div>
  `;

  article.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");
    if (!clickedLink) {
      window.open(project.url, "_blank", "noreferrer");
    }
  });

  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(project.url, "_blank", "noreferrer");
    }
  });

  return article;
}

const projectCards = projects.map((project, index) => createProjectCard(project, index));
projectCards.forEach((card) => {
  projectGrid.appendChild(card);
});

projectCountBadge.textContent = String(projects.length).padStart(2, "0");

function updateSearchState(nextState = {}) {
  Object.assign(searchState, nextState);

  const isSearching = searchState.query.trim().length > 0;
  searchState.isSearching = isSearching;

  heroSection.classList.toggle("hero-hidden", isSearching);
  projectsSection.classList.toggle("projects-section-priority", isSearching);

  if (isSearching) {
    topbar.classList.add("topbar-sticky-active");
  } else {
    topbar.classList.remove("topbar-sticky-active");
  }
}

function updateFilterState(filterValue) {
  searchState.activeFilter = filterValue;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filterValue;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  filterProjects(projectSearch.value);
}

function filterProjects(query) {
  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matchesSearch = !normalizedQuery || card.dataset.search.includes(normalizedQuery);
    const categories = JSON.parse(card.dataset.category || "[]");
    const matchesFilter = searchState.activeFilter === "all" || categories.includes(searchState.activeFilter);
    const matches = matchesSearch && matchesFilter;
    card.classList.toggle("is-hidden", !matches);

    if (matches) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;
  projectGrid.classList.toggle("is-empty", visibleCount === 0);

  if (!normalizedQuery) {
    const filterLabel = searchState.activeFilter === "all" ? "all" : searchState.activeFilter;
    resultsMeta.textContent = searchState.activeFilter === "all"
      ? `Showing all ${visibleCount} projects.`
      : `Showing ${visibleCount} ${filterLabel} project${visibleCount === 1 ? "" : "s"}.`;
    return;
  }

  resultsMeta.textContent = `Showing ${visibleCount} result${visibleCount === 1 ? "" : "s"} for "${trimmedQuery}".`;
}

function handleSearchInput(event) {
  const query = event.target.value;
  updateSearchState({ query });
  filterProjects(query);

  if (query.trim().length > 0) {
    topbar.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

projectSearch.addEventListener("input", handleSearchInput);
projectSearch.addEventListener("search", handleSearchInput);

projectSearch.addEventListener("keydown", (event) => {
  const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (isShortcut) {
    event.preventDefault();
    projectSearch.focus();
    projectSearch.select();
  }
});

document.addEventListener("keydown", (event) => {
  const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (isShortcut) {
    event.preventDefault();
    projectSearch.focus();
    projectSearch.select();
  }
});

filterBar.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-chip");
  if (!button) {
    return;
  }

  updateFilterState(button.dataset.filter);
});

focusSearchButton.addEventListener("click", () => {
  projectSearch.focus();
  projectSearch.select();
});

launchProjectButton.addEventListener("click", () => {
  projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (heroVisual) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;

    heroVisual.style.setProperty("--hero-tilt-x", `${x.toFixed(2)}deg`);
    heroVisual.style.setProperty("--hero-tilt-y", `${y.toFixed(2)}deg`);
    heroVisual.style.setProperty("--hero-glow-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    heroVisual.style.setProperty("--hero-glow-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--hero-tilt-x", "0deg");
    heroVisual.style.setProperty("--hero-tilt-y", "0deg");
    heroVisual.style.setProperty("--hero-glow-x", "50%");
    heroVisual.style.setProperty("--hero-glow-y", "50%");
  });
}

updateSearchState();
updateFilterState("all");
filterProjects("");
