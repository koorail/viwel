const listEl = document.getElementById("terms-list");

function renderTerms() {
  const progress = PW.loadProgress();
  const all = PW.allEntries();
  const unlocked = all.filter(function (e) { return progress.solved[e.id]; });
  const missed = all.filter(function (e) { return !progress.solved[e.id] && progress.misses[e.id]; });
  const locked = all.length - unlocked.length - missed.length;

  document.getElementById("terms-title").textContent = BRANCH.name;
  document.getElementById("terms-note").textContent =
    unlocked.length + " of " + all.length + " terms unlocked · " +
    missed.length + " missed · " + locked + " still locked. Play to unlock more.";

  listEl.innerHTML = "";

  if (unlocked.length + missed.length === 0) {
    const empty = document.createElement("div");
    empty.className = "term-card";
    empty.textContent = "Nothing here yet. Terms you solve or miss will show up here.";
    listEl.appendChild(empty);
    return;
  }

  function addCard(entry, badgeClass, badgeText) {
    const card = document.createElement("div");
    card.className = "term-card";

    const head = document.createElement("div");
    head.className = "term-head";

    const name = document.createElement("h2");
    name.className = "term-name";
    name.textContent = entry.term;

    const badge = document.createElement("span");
    badge.className = "term-badge " + badgeClass;
    badge.textContent = badgeText;

    head.append(name, badge);
    card.appendChild(head);
    listEl.appendChild(card);
  }

  unlocked.forEach(function (entry) { addCard(entry, "solved", "Unlocked"); });
  missed.forEach(function (entry) { addCard(entry, "review", "Missed"); });
}

renderTerms();
