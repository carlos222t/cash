/* ============================================================
   Gigs — shared data & logic for index.html, onboarding.html, home.html
   ============================================================ */

const STORAGE_KEY = "gigs_user_v1";
const GIGS_SAVED_KEY = "gigs_saved_v1";

const GENRES = [
  "Rock", "Pop", "Hip-Hop", "R&B", "Jazz", "Blues", "Country", "Folk",
  "Classical", "Electronic", "House", "Techno", "Reggae", "Latin", "Metal",
  "Punk", "Indie", "Alternative", "Soul", "Funk", "Gospel", "Disco",
  "Ambient", "Lo-fi", "K-Pop", "Afrobeats", "Dancehall", "Bluegrass",
  "Singer-Songwriter", "Acoustic", "Swing", "Other"
];

const COUNTRY_CODES = [
  { code: "+1", label: "US/CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "AU (+61)" },
  { code: "+353", label: "IE (+353)" },
  { code: "+64", label: "NZ (+64)" },
  { code: "+49", label: "DE (+49)" },
  { code: "+33", label: "FR (+33)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+91", label: "IN (+91)" },
  { code: "+27", label: "ZA (+27)" }
];

const SAMPLE_GIGS = [
  { id: 1, title: "Friday Night Acoustic Set", venue: "The Velvet Hollow", location: "Austin, TX", pay: "$150–$250", date: "Nov 14", genre: "Acoustic", postedDaysAgo: 2, desc: "Looking for a solo acoustic act to open our Friday night bill. Warm, intimate room with a built-in PA and friendly sound tech. Two 40-minute sets, originals or covers both welcome." },
  { id: 2, title: "Weekend DJ Residency", venue: "Lowtide Warehouse", location: "Miami, FL", pay: "$400/night", date: "Nov 20", genre: "House", postedDaysAgo: 1, desc: "Monthly residency open for a house/techno DJ comfortable reading a late-night warehouse crowd. CDJ-3000s and a full L-Acoustics rig on site. Trial night first, residency to follow." },
  { id: 3, title: "Sunday Jazz Brunch Trio", venue: "Fernglass Garden Bar", location: "New Orleans, LA", pay: "$300 flat", date: "Nov 16", genre: "Jazz", postedDaysAgo: 4, desc: "Easygoing brunch service, 11am–2pm. Piano, bass, and light percussion preferred. Tips are excellent and the kitchen feeds the band." },
  { id: 4, title: "Album Release Afterparty", venue: "The Brass Owl", location: "Nashville, TN", pay: "$500 flat", date: "Nov 22", genre: "Indie", postedDaysAgo: 3, desc: "Private afterparty following an album release show. One 45-minute set, indie/alternative leaning. Green room, catering, and guest list spots included." },
  { id: 5, title: "Rooftop Sunset Sessions", venue: "Marigold Rooftop", location: "Los Angeles, CA", pay: "$275/set", date: "Nov 18", genre: "Lo-fi", postedDaysAgo: 5, desc: "Chill rooftop series overlooking the skyline, golden-hour vibes only. Looking for lo-fi/ambient selectors who can hold a mellow room for 90 minutes." },
  { id: 6, title: "Open Mic Host & Performer", venue: "The Paper Moon", location: "Portland, OR", pay: "$120 + tips", date: "Nov 13", genre: "Singer-Songwriter", postedDaysAgo: 6, desc: "Host our weekly open mic and play a short feature set between sign-ups. Friendly room, regulars love a good host with their own songs." },
  { id: 7, title: "Wedding Reception Band", venue: "Hollow Pines Amphitheater", location: "Denver, CO", pay: "$1,200 flat", date: "Nov 29", genre: "Soul", postedDaysAgo: 1, desc: "Full band needed for a 150-guest reception. Cocktail hour background music plus a dance-floor set. Soul, funk, and crowd-pleasers preferred." },
  { id: 8, title: "Holiday Pop-Up DJ Set", venue: "Copperline Tavern", location: "Chicago, IL", pay: "$350/night", date: "Dec 5", genre: "Disco", postedDaysAgo: 2, desc: "Festive pop-up night with a disco/funk theme. Decor and lighting provided, just bring the selections and the energy." },
  { id: 9, title: "Late Night Funk Jam", venue: "The Rusty Anchor", location: "Seattle, WA", pay: "$220/night", date: "Nov 15", genre: "Funk", postedDaysAgo: 7, desc: "House band hosts a rotating late-night jam. Looking for guest musicians comfortable sitting in on funk and soul standards after midnight." },
  { id: 10, title: "Indie Showcase Night", venue: "The Gilded Crow", location: "Brooklyn, NY", pay: "$180/band", date: "Nov 19", genre: "Alternative", postedDaysAgo: 3, desc: "Three-band showcase for up-and-coming alternative acts. 30-minute sets, sound check at 6pm, doors at 8pm. Good press turnout expected." },
  { id: 11, title: "Corporate Gala Entertainment", venue: "Midnight Atrium", location: "San Francisco, CA", pay: "$900 flat", date: "Dec 2", genre: "Classical", postedDaysAgo: 4, desc: "String trio or similar needed for cocktail hour at a corporate gala. Elegant atmosphere, formal attire provided guidance, early load-in." },
  { id: 12, title: "Sunday Blues Residency", venue: "Saltwater Social Club", location: "Charleston, SC", pay: "$260/night", date: "Nov 23", genre: "Blues", postedDaysAgo: 8, desc: "Weekly Sunday residency for a blues act, 7–10pm. Loyal regular crowd, easy load-in, and a standing offer if the first few nights go well." },
  { id: 13, title: "Reggae Beach Party Set", venue: "Driftwood Pier Stage", location: "San Diego, CA", pay: "$300/set", date: "Nov 27", genre: "Reggae", postedDaysAgo: 2, desc: "Outdoor beachside stage looking for a reggae/dancehall selector for a sunset-to-dusk set. PA and lighting on site, parking provided." },
  { id: 14, title: "K-Pop Dance Night DJ", venue: "Cinder Row Hall", location: "Los Angeles, CA", pay: "$280/night", date: "Nov 21", genre: "K-Pop", postedDaysAgo: 1, desc: "Monthly K-pop dance night needs a DJ who knows the current and classic catalog cold. High-energy crowd, full video wall available to sync visuals." },
  { id: 15, title: "Afrobeats Block Party", venue: "Ember & Oak Lounge", location: "Atlanta, GA", pay: "$375/night", date: "Nov 30", genre: "Afrobeats", postedDaysAgo: 5, desc: "Outdoor block party headliner slot. Afrobeats and dancehall focus, 90-minute set, big sound system and an enthusiastic crowd guaranteed." }
];

/* ---------- storage helpers ---------- */
function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setUser(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateUser(patch) {
  const current = getUser() || {};
  const next = Object.assign({}, current, patch);
  setUser(next);
  return next;
}

function getSavedGigs() {
  try {
    const raw = localStorage.getItem(GIGS_SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setSavedGigs(ids) {
  localStorage.setItem(GIGS_SAVED_KEY, JSON.stringify(ids));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function initials(name) {
  if (!name) return "G";
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0].toUpperCase()).join("");
}

function nameFromEmail(email) {
  if (!email) return "Guest";
  const local = email.split("@")[0].replace(/[._-]+/g, " ");
  return local.split(" ").filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

/* ============================================================
   AUTH PAGE (index.html)
   ============================================================ */
function initAuthPage() {
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const panelLogin = document.getElementById("panelLogin");
  const panelSignup = document.getElementById("panelSignup");

  function setMode(mode) {
    const isSignup = mode === "signup";
    tabLogin.classList.toggle("active", !isSignup);
    tabSignup.classList.toggle("active", isSignup);
    tabLogin.setAttribute("aria-selected", String(!isSignup));
    tabSignup.setAttribute("aria-selected", String(isSignup));
    panelLogin.classList.toggle("active", !isSignup);
    panelSignup.classList.toggle("active", isSignup);
  }

  tabLogin.addEventListener("click", () => setMode("login"));
  tabSignup.addEventListener("click", () => setMode("signup"));
  document.querySelectorAll("[data-switch-mode]").forEach(btn => {
    btn.addEventListener("click", () => setMode(btn.dataset.switchMode));
  });

  // show/hide password toggles
  document.querySelectorAll(".input-adornment[data-toggle-password]").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.togglePassword);
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.textContent = showing ? "Show" : "Hide";
      btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
  });

  /* ---- Login ---- */
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailField = document.getElementById("loginEmail");
    const passField = document.getElementById("loginPassword");
    let valid = true;

    if (!isValidEmail(emailField.value.trim())) {
      setFieldError(emailField, "Enter a valid email address.");
      valid = false;
    } else {
      clearFieldError(emailField);
    }

    if (!passField.value) {
      setFieldError(passField, "Enter your password.");
      valid = false;
    } else {
      clearFieldError(passField);
    }

    if (!valid) return;

    const existing = getUser();
    updateUser({ email: emailField.value.trim() });
    // Returning users with a completed profile go straight to the home page.
    if (existing && existing.onboardingComplete) {
      window.location.href = "home.html";
    } else {
      window.location.href = "onboarding.html";
    }
  });

  /* ---- Sign up ---- */
  const signupForm = document.getElementById("signupForm");
  const signupPassword = document.getElementById("signupPassword");
  signupPassword.addEventListener("input", () => renderStrengthMeter(signupPassword.value));

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailField = document.getElementById("signupEmail");
    let valid = true;

    if (!isValidEmail(emailField.value.trim())) {
      setFieldError(emailField, "Enter a valid email address.");
      valid = false;
    } else {
      clearFieldError(emailField);
    }

    const strength = passwordStrength(signupPassword.value);
    if (signupPassword.value.length < 8) {
      setFieldError(signupPassword, "Use at least 8 characters.");
      valid = false;
    } else {
      clearFieldError(signupPassword);
    }

    if (!valid) return;

    updateUser({ email: emailField.value.trim(), onboardingComplete: false });
    window.location.href = "onboarding.html";
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldError(input, message) {
  const field = input.closest(".field");
  if (!field) return;
  field.classList.add("has-error");
  const msgEl = field.querySelector(".error-msg");
  if (msgEl) msgEl.textContent = message;
}

function clearFieldError(input) {
  const field = input.closest(".field");
  if (!field) return;
  field.classList.remove("has-error");
}

function passwordStrength(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.min(score, 4);
}

function renderStrengthMeter(value) {
  const bars = document.querySelectorAll("#strengthMeter .bar");
  const label = document.getElementById("strengthLabel");
  if (!bars.length) return;
  const score = value ? passwordStrength(value) : 0;
  const colors = ["var(--ink-200)", "#E6453C", "#E3A008", "#1DA974", "#1DA974"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  bars.forEach((bar, i) => {
    bar.style.background = i < score ? colors[score] : "var(--ink-100)";
  });
  if (label) {
    label.textContent = value ? labels[score] : "";
    label.style.color = value ? colors[score] : "var(--ink-400)";
  }
}

/* ============================================================
   ONBOARDING PAGE (onboarding.html)
   ============================================================ */
const ONBOARD_STEP_KEY = "gigs_onboard_step_v1";
const ONBOARD_STEPS = ["account", "phone", "photo", "venues", "genres", "done"];

function initOnboardingPage() {
  const user = getUser() || {};
  let venues = Array.isArray(user.venues) ? user.venues.slice() : [];
  let genres = Array.isArray(user.genres) ? user.genres.slice() : [];
  let customGenre = user.customGenre || "";
  let photoDataUrl = user.photo || null;

  let stepIndex = 0;
  const savedStep = parseInt(sessionStorage.getItem(ONBOARD_STEP_KEY) || "0", 10);
  if (savedStep > 0 && savedStep < ONBOARD_STEPS.length - 1) stepIndex = savedStep;

  const stepEls = {
    account: document.getElementById("stepAccount"),
    phone: document.getElementById("stepPhone"),
    photo: document.getElementById("stepPhoto"),
    venues: document.getElementById("stepVenues"),
    genres: document.getElementById("stepGenres"),
    done: document.getElementById("stepDone")
  };
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const transitionScreen = document.getElementById("transitionScreen");

  // Prefill account step with the email captured during sign-up.
  const accountEmail = document.getElementById("onboardEmail");
  if (user.email) accountEmail.value = user.email;
  const accountPassword = document.getElementById("onboardPassword");

  function renderProgress() {
    const visibleTotal = ONBOARD_STEPS.length - 1; // exclude "done" from the count
    const current = Math.min(stepIndex, visibleTotal - 1);
    const pct = Math.round(((current + 1) / visibleTotal) * 100);
    progressFill.style.width = pct + "%";
    progressLabel.textContent = `Step ${current + 1} of ${visibleTotal}`;
  }

  function showStep(name) {
    Object.entries(stepEls).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
    if (name !== "done") renderProgress();
    else {
      progressFill.style.width = "100%";
      progressLabel.textContent = "All set!";
    }
  }

  function goToStep(index) {
    stepIndex = Math.max(0, Math.min(index, ONBOARD_STEPS.length - 1));
    sessionStorage.setItem(ONBOARD_STEP_KEY, String(stepIndex));
    showStep(ONBOARD_STEPS[stepIndex]);
    if (ONBOARD_STEPS[stepIndex] === "genres") renderSelectedCount();
  }

  showStep(ONBOARD_STEPS[stepIndex]);

  /* ---- Step 1: Account ---- */
  document.getElementById("accountNext").addEventListener("click", () => {
    let valid = true;
    if (!isValidEmail(accountEmail.value.trim())) {
      setFieldError(accountEmail, "Enter a valid email address.");
      valid = false;
    } else {
      clearFieldError(accountEmail);
    }
    const needsPassword = !user.email;
    if (needsPassword && accountPassword.value.length < 8) {
      setFieldError(accountPassword, "Use at least 8 characters.");
      valid = false;
    } else {
      clearFieldError(accountPassword);
    }
    if (!valid) return;
    updateUser({ email: accountEmail.value.trim() });
    goToStep(1);
  });

  /* ---- Step 2: Phone ---- */
  const countrySelect = document.getElementById("countryCode");
  COUNTRY_CODES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.code;
    opt.textContent = c.label;
    countrySelect.appendChild(opt);
  });
  if (user.countryCode) countrySelect.value = user.countryCode;
  const phoneInput = document.getElementById("phoneNumber");
  if (user.phone) phoneInput.value = user.phone;

  document.getElementById("phoneBack").addEventListener("click", () => goToStep(0));
  document.getElementById("phoneSkip").addEventListener("click", () => runTransition());
  document.getElementById("phoneNext").addEventListener("click", () => {
    updateUser({ phone: phoneInput.value.trim(), countryCode: countrySelect.value });
    runTransition();
  });

  function runTransition() {
    transitionScreen.classList.add("active");
    setTimeout(() => {
      transitionScreen.classList.remove("active");
      goToStep(2);
    }, 2500);
  }

  /* ---- Step 3: Profile picture ---- */
  const avatarCircle = document.getElementById("avatarCircle");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");
  const avatarPlaceholder = document.getElementById("avatarPlaceholder");
  const avatarZoomRow = document.getElementById("avatarZoomRow");
  const avatarZoom = document.getElementById("avatarZoom");

  if (photoDataUrl) {
    avatarPreview.src = photoDataUrl;
    avatarPreview.style.display = "block";
    avatarPlaceholder.style.display = "none";
    avatarZoomRow.classList.add("show");
  }

  avatarCircle.addEventListener("click", () => avatarInput.click());
  avatarCircle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); avatarInput.click(); }
  });
  avatarCircle.addEventListener("dragover", (e) => { e.preventDefault(); avatarCircle.classList.add("dragover"); });
  avatarCircle.addEventListener("dragleave", () => avatarCircle.classList.remove("dragover"));
  avatarCircle.addEventListener("drop", (e) => {
    e.preventDefault();
    avatarCircle.classList.remove("dragover");
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handlePhotoFile(file);
  });
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files && avatarInput.files[0];
    if (file) handlePhotoFile(file);
  });

  function handlePhotoFile(file) {
    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      photoDataUrl = reader.result;
      avatarPreview.src = photoDataUrl;
      avatarPreview.style.display = "block";
      avatarPlaceholder.style.display = "none";
      avatarZoomRow.classList.add("show");
      avatarZoom.value = 100;
      avatarPreview.style.transform = "scale(1)";
    };
    reader.readAsDataURL(file);
  }

  avatarZoom.addEventListener("input", () => {
    avatarPreview.style.transform = `scale(${avatarZoom.value / 100})`;
  });

  document.getElementById("photoBack").addEventListener("click", () => goToStep(1));
  document.getElementById("photoSkip").addEventListener("click", () => { photoDataUrl = null; updateUser({ photo: null }); goToStep(3); });
  document.getElementById("photoNext").addEventListener("click", () => {
    updateUser({ photo: photoDataUrl });
    goToStep(3);
  });

  /* ---- Step 4: Venues ---- */
  const venueInput = document.getElementById("venueInput");
  const venueAddBtn = document.getElementById("venueAddBtn");
  const venuesWrap = document.getElementById("venuesWrap");

  function renderVenues() {
    if (!venues.length) {
      venuesWrap.innerHTML = '<p class="empty-state">No venues added yet — type a venue name above and press Enter.</p>';
      return;
    }
    venuesWrap.innerHTML = venues.map((v, i) =>
      `<span class="chip removable">${escapeHtml(v)}<button type="button" class="chip-remove" data-remove-venue="${i}" aria-label="Remove ${escapeHtml(v)}">&times;</button></span>`
    ).join("");
  }

  function addVenue() {
    const value = venueInput.value.trim();
    if (!value) return;
    if (venues.some(v => v.toLowerCase() === value.toLowerCase())) {
      showToast("That venue is already on your list.");
      venueInput.value = "";
      return;
    }
    venues.push(value);
    venueInput.value = "";
    renderVenues();
  }

  venueAddBtn.addEventListener("click", addVenue);
  venueInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addVenue(); }
  });
  venuesWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-venue]");
    if (!btn) return;
    venues.splice(parseInt(btn.dataset.removeVenue, 10), 1);
    renderVenues();
  });
  renderVenues();

  document.getElementById("venuesBack").addEventListener("click", () => goToStep(2));
  document.getElementById("venuesSkip").addEventListener("click", () => { updateUser({ venues: [] }); venues = []; goToStep(4); });
  document.getElementById("venuesNext").addEventListener("click", () => {
    updateUser({ venues });
    goToStep(4);
  });

  /* ---- Step 5: Genres ---- */
  const genreGrid = document.getElementById("genreGrid");
  const otherGenreField = document.getElementById("otherGenreField");
  const otherGenreInput = document.getElementById("otherGenreInput");
  const selectedCountBadge = document.getElementById("selectedCountBadge");
  const genresNext = document.getElementById("genresNext");

  genreGrid.innerHTML = GENRES.map(g =>
    `<button type="button" class="chip" data-genre="${escapeHtml(g)}">${escapeHtml(g)}</button>`
  ).join("");

  function syncGenreChipStates() {
    genreGrid.querySelectorAll(".chip").forEach(chip => {
      chip.classList.toggle("selected", genres.includes(chip.dataset.genre));
    });
    otherGenreField.classList.toggle("show", genres.includes("Other"));
  }

  function renderSelectedCount() {
    const count = genres.length;
    selectedCountBadge.textContent = count === 0 ? "No genres selected yet" : `${count} genre${count > 1 ? "s" : ""} selected`;
    genresNext.disabled = count === 0;
  }

  genreGrid.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const g = chip.dataset.genre;
    const idx = genres.indexOf(g);
    if (idx > -1) genres.splice(idx, 1);
    else genres.push(g);
    syncGenreChipStates();
    renderSelectedCount();
    if (g === "Other" && genres.includes("Other")) otherGenreInput.focus();
  });

  if (customGenre) otherGenreInput.value = customGenre;
  syncGenreChipStates();
  renderSelectedCount();

  document.getElementById("genresBack").addEventListener("click", () => goToStep(3));
  genresNext.addEventListener("click", () => {
    if (!genres.length) return;
    customGenre = genres.includes("Other") ? otherGenreInput.value.trim() : "";
    updateUser({ genres, customGenre, onboardingComplete: true });
    sessionStorage.removeItem(ONBOARD_STEP_KEY);
    goToStep(5);
    launchConfetti();
  });

  /* ---- Final: All done ---- */
  document.getElementById("goHomeBtn").addEventListener("click", () => {
    window.location.href = "home.html";
  });

  function launchConfetti() {
    const colors = ["#5B3DF5", "#FF6B4A", "#1DA974", "#E3A008", "#B2ADC4"];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 1.5) + "s";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }
}

/* ============================================================
   HOME PAGE (home.html)
   ============================================================ */
function initHomePage() {
  const user = getUser() || {};
  let savedIds = new Set(getSavedGigs());
  let activeGenreFilter = null;

  /* ---- Nav / profile ---- */
  const displayName = nameFromEmail(user.email);
  document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = displayName);

  const avatarSlot = document.getElementById("avatarSlot");
  if (user.photo) {
    avatarSlot.innerHTML = `<img src="${user.photo}" class="avatar-img" alt="${escapeHtml(displayName)}'s profile picture">`;
  } else {
    avatarSlot.innerHTML = `<span class="avatar-fallback">${escapeHtml(initials(displayName))}</span>`;
  }

  const dropdown = document.getElementById("profileDropdown");
  const avatarBtn = document.getElementById("avatarBtn");
  avatarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });
  document.addEventListener("click", () => dropdown.classList.remove("open"));
  document.getElementById("signOutBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  /* ---- Genre filter chips (pre-selected from onboarding) ---- */
  const userGenres = (user.genres || []).filter(g => g !== "Other").concat(user.customGenre ? [user.customGenre] : []);
  const filterChipRow = document.getElementById("filterChipRow");
  const chipGenres = userGenres.length ? userGenres : ["Rock", "Pop", "Hip-Hop", "Electronic", "Jazz"];
  filterChipRow.innerHTML = chipGenres.map(g =>
    `<button type="button" class="chip" data-filter-genre="${escapeHtml(g)}">${escapeHtml(g)}</button>`
  ).join("");

  filterChipRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const g = chip.dataset.filterGenre;
    const isActive = chip.classList.contains("selected");
    filterChipRow.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
    activeGenreFilter = isActive ? null : g;
    if (activeGenreFilter) chip.classList.add("selected");
    document.getElementById("searchWhat").value = activeGenreFilter || "";
    runSearch();
  });

  /* ---- Search ---- */
  const searchWhat = document.getElementById("searchWhat");
  const searchWhere = document.getElementById("searchWhere");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch();
  });

  function runSearch() {
    const whatVal = searchWhat.value.trim().toLowerCase();
    const whereVal = searchWhere.value.trim().toLowerCase();
    const results = SAMPLE_GIGS.filter(g => {
      const matchesWhat = !whatVal || g.title.toLowerCase().includes(whatVal) || g.genre.toLowerCase().includes(whatVal) || g.venue.toLowerCase().includes(whatVal);
      const matchesWhere = !whereVal || g.location.toLowerCase().includes(whereVal);
      return matchesWhat && matchesWhere;
    });
    renderFeed(results);
  }

  /* ---- Feed rendering ---- */
  const gigFeed = document.getElementById("gigFeed");
  const resultsCount = document.getElementById("resultsCount");

  function renderFeed(gigs) {
    resultsCount.textContent = `${gigs.length} gig${gigs.length === 1 ? "" : "s"}`;
    if (!gigs.length) {
      gigFeed.innerHTML = `<div class="no-results"><h3>No gigs match that search</h3><p>Try a different genre, city, or clearing your filters.</p></div>`;
      return;
    }
    gigFeed.innerHTML = gigs.map(g => {
      const saved = savedIds.has(g.id);
      return `
      <article class="gig-card" data-gig-id="${g.id}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(g.title)}">
        <div class="gig-card-main">
          <h3 class="gig-title">${escapeHtml(g.title)}</h3>
          <p class="gig-venue">${escapeHtml(g.venue)} &middot; ${escapeHtml(g.location)}</p>
          <div class="gig-meta-row">
            <span>${dateIcon()} ${escapeHtml(g.date)}</span>
            <span>${payIcon()} ${escapeHtml(g.pay)}</span>
            <span class="posted-time">Posted ${g.postedDaysAgo} day${g.postedDaysAgo === 1 ? "" : "s"} ago</span>
          </div>
          <div class="gig-tags">
            <span class="tag-genre">${escapeHtml(g.genre)}</span>
            <span class="tag-pay">${escapeHtml(g.pay)}</span>
          </div>
        </div>
        <div class="gig-card-actions">
          <button type="button" class="save-btn ${saved ? "saved" : ""}" data-save-id="${g.id}" aria-label="${saved ? "Remove from saved" : "Save gig"}" aria-pressed="${saved}">${heartIcon()}</button>
          <button type="button" class="btn btn-primary btn-sm" data-apply-id="${g.id}">Apply</button>
        </div>
      </article>`;
    }).join("");
  }

  function dateIcon() { return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>'; }
  function payIcon() { return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.5 2.5 0 0 1 2.5-1 2.5 2.5 0 0 1 0 5h-1a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 2.5-1"/></svg>'; }
  function heartIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.2-4.6-10-9.3C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.7 19.2 16.4 12 21 12 21z"/></svg>'; }

  /* ---- Card interactions: save, apply, open modal ---- */
  gigFeed.addEventListener("click", (e) => {
    const saveBtn = e.target.closest("[data-save-id]");
    if (saveBtn) {
      e.stopPropagation();
      toggleSave(parseInt(saveBtn.dataset.saveId, 10));
      return;
    }
    const applyBtn = e.target.closest("[data-apply-id]");
    if (applyBtn) {
      e.stopPropagation();
      showToast("Application sent! The venue will reach out soon.");
      return;
    }
    const card = e.target.closest(".gig-card");
    if (card) openModal(parseInt(card.dataset.gigId, 10));
  });
  gigFeed.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest(".gig-card");
    if (card) openModal(parseInt(card.dataset.gigId, 10));
  });

  function toggleSave(id) {
    if (savedIds.has(id)) savedIds.delete(id);
    else savedIds.add(id);
    setSavedGigs(Array.from(savedIds));
    runSearch();
    renderSidebar();
  }

  /* ---- Modal ---- */
  const modalOverlay = document.getElementById("gigModal");
  const modalBody = document.getElementById("modalBody");

  function openModal(id) {
    const gig = SAMPLE_GIGS.find(g => g.id === id);
    if (!gig) return;
    const saved = savedIds.has(id);
    modalBody.innerHTML = `
      <h2>${escapeHtml(gig.title)}</h2>
      <span class="modal-venue">${escapeHtml(gig.venue)} &middot; ${escapeHtml(gig.location)}</span>
      <div class="modal-meta-grid">
        <div><div class="mm-label">Date</div><div class="mm-value">${escapeHtml(gig.date)}</div></div>
        <div><div class="mm-label">Pay</div><div class="mm-value">${escapeHtml(gig.pay)}</div></div>
        <div><div class="mm-label">Genre</div><div class="mm-value">${escapeHtml(gig.genre)}</div></div>
        <div><div class="mm-label">Posted</div><div class="mm-value">${gig.postedDaysAgo} day${gig.postedDaysAgo === 1 ? "" : "s"} ago</div></div>
      </div>
      <p class="modal-desc">${escapeHtml(gig.desc)}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-primary" data-apply-id="${gig.id}">Apply now</button>
        <button type="button" class="btn btn-secondary ${saved ? "saved" : ""}" data-save-id="${gig.id}">${saved ? "Saved" : "Save for later"}</button>
      </div>`;
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
  }

  modalBody.addEventListener("click", (e) => {
    const applyBtn = e.target.closest("[data-apply-id]");
    if (applyBtn) { showToast("Application sent! The venue will reach out soon."); return; }
    const saveBtn = e.target.closest("[data-save-id]");
    if (saveBtn) { toggleSave(parseInt(saveBtn.dataset.saveId, 10)); closeModal(); }
  });
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---- Sidebar ---- */
  function renderSidebar() {
    const fields = ["email", "phone", "photo", "venues", "genres"];
    const labels = { email: "Account created", phone: "Phone added", photo: "Profile photo", venues: "Venues listed", genres: "Genres selected" };
    const done = fields.filter(f => {
      const v = user[f];
      return Array.isArray(v) ? v.length > 0 : Boolean(v);
    });
    const pct = Math.round((done.length / fields.length) * 100);

    const ring = document.getElementById("completenessRing");
    ring.style.setProperty("--pct", pct);
    ring.setAttribute("data-pct", pct);

    document.getElementById("completenessList").innerHTML = fields.map(f =>
      `<li class="${done.includes(f) ? "done" : ""}">${done.includes(f) ? "✓" : "○"} ${labels[f]}</li>`
    ).join("");

    const genreWrap = document.getElementById("sidebarGenres");
    const genresList = (user.genres || []).filter(g => g !== "Other").concat(user.customGenre ? [user.customGenre] : []);
    genreWrap.innerHTML = genresList.length
      ? genresList.map(g => `<span class="chip">${escapeHtml(g)}</span>`).join("")
      : '<p class="empty-state">No genres yet.</p>';

    const venueWrap = document.getElementById("sidebarVenues");
    venueWrap.innerHTML = (user.venues && user.venues.length)
      ? user.venues.map(v => `<span class="chip">${escapeHtml(v)}</span>`).join("")
      : '<p class="empty-state">No venues yet.</p>';

    const savedWrap = document.getElementById("sidebarSaved");
    const savedGigs = SAMPLE_GIGS.filter(g => savedIds.has(g.id));
    savedWrap.innerHTML = savedGigs.length
      ? savedGigs.map(g => `<div class="saved-mini-item"><div><div class="smi-title">${escapeHtml(g.title)}</div><div class="smi-venue">${escapeHtml(g.venue)}</div></div></div>`).join("")
      : '<p class="empty-state">Gigs you save will show up here.</p>';
  }

  renderFeed(SAMPLE_GIGS);
  renderSidebar();
}

/* ============================================================
   Router — runs the right init function for the current page
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "auth") initAuthPage();
  else if (page === "onboarding") initOnboardingPage();
  else if (page === "home") initHomePage();
});
