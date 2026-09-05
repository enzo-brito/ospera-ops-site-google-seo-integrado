(function () {
  const config = window.OSPERA_CONFIG || {};
  const modal = document.getElementById("lead-modal");
  const form = document.getElementById("lead-form");
  const success = document.getElementById("form-success");
  const scheduleLink = document.getElementById("schedule-link");
  const leadsKey = "ospera_ops_leads";
  const params = new URLSearchParams(window.location.search);

  document.getElementById("year").textContent = new Date().getFullYear();
  ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
    const field = form.elements[key];
    if (field) field.value = params.get(key) || "";
  });

  function openModal() { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; setTimeout(() => form.elements.nome.focus(), 100); }
  function closeModal() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  document.querySelectorAll(".open-lead").forEach((button) => button.addEventListener("click", openModal));
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

  function eventData(name, detail = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...detail });
    window.dispatchEvent(new CustomEvent("ospera:" + name, { detail }));
  }
  eventData("ospera_page_view", { source: params.get("utm_source") || "direct" });
  document.querySelectorAll(".open-lead").forEach((button) => button.addEventListener("click", () => eventData("ospera_cta_click", { label: button.textContent.trim() })));
  form.addEventListener("focusin", () => eventData("ospera_form_start"), { once: true });

  async function saveLead(payload) {
    if (config.leadEndpoint) {
      const response = await fetch(config.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Lead endpoint returned an error");
      return "crm";
    }
    const leads = JSON.parse(localStorage.getItem(leadsKey) || "[]");
    leads.push(payload);
    localStorage.setItem(leadsKey, JSON.stringify(leads));
    return "local";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    submit.textContent = "Enviando...";
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.created_at = new Date().toISOString();
    payload.page_url = window.location.href;
    payload.lead_id = "OPS-" + Date.now().toString(36).toUpperCase();
    try {
      payload.delivery = await saveLead(payload);
      form.hidden = true;
      success.hidden = false;
      if (config.scheduleUrl) { scheduleLink.href = config.scheduleUrl; scheduleLink.hidden = false; }
      else { scheduleLink.hidden = true; }
      eventData("ospera_lead_submit", { lead_id: payload.lead_id, challenge: payload.desafio, delivery: payload.delivery });
    } catch (error) {
      submit.disabled = false;
      submit.innerHTML = "Tentar novamente <span>↗</span>";
      alert("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
})();
