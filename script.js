const properties = [
  {
    id: 1,
    title: "3BHK Park Facing Apartment",
    city: "Gurugram",
    priceInLakhs: 185,
    bhk: "3 BHK",
    area: "1,850 sq.ft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "2BHK Modern Builder Floor",
    city: "Noida",
    priceInLakhs: 82,
    bhk: "2 BHK",
    area: "1,180 sq.ft",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "4BHK Independent Villa",
    city: "Bengaluru",
    priceInLakhs: 340,
    bhk: "4 BHK",
    area: "3,100 sq.ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "2BHK Ready-to-Move Flat",
    city: "Gurugram",
    priceInLakhs: 95,
    bhk: "2 BHK",
    area: "1,240 sq.ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  }
];

const propertyGrid = document.getElementById("propertyGrid");
const propertyCount = document.getElementById("propertyCount");
const cityFilter = document.getElementById("cityFilter");
const budgetFilter = document.getElementById("budgetFilter");
const resetBtn = document.getElementById("resetBtn");

function formatINR(lakhs) {
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${lakhs} Lakhs`;
}

function renderProperties(list) {
  propertyCount.textContent = `Showing ${list.length} ${list.length === 1 ? "property" : "properties"}`;

  if (list.length === 0) {
    propertyGrid.innerHTML = `<p class="meta">No properties match your selected filters.</p>`;
    return;
  }

  propertyGrid.innerHTML = list
    .map(
      (prop) => `
      <article class="card">
        <img src="${prop.image}" alt="${prop.title}" />
        <div class="card-body">
          <span class="badge">${prop.city} • ${prop.bhk}</span>
          <h3>${prop.title}</h3>
          <div class="price">${formatINR(prop.priceInLakhs)}</div>
          <p class="meta">Area: ${prop.area}</p>
        </div>
      </article>
    `
    )
    .join("");
}

function applyFilters() {
  const selectedCity = cityFilter.value;
  const maxBudget = budgetFilter.value === "all" ? Infinity : Number(budgetFilter.value);

  const filtered = properties.filter((item) => {
    const cityMatch = selectedCity === "all" || item.city === selectedCity;
    const budgetMatch = item.priceInLakhs <= maxBudget;
    return cityMatch && budgetMatch;
  });

  renderProperties(filtered);
}

cityFilter.addEventListener("change", applyFilters);
budgetFilter.addEventListener("change", applyFilters);
resetBtn.addEventListener("click", () => {
  cityFilter.value = "all";
  budgetFilter.value = "all";
  applyFilters();
});

// EMI Calculator Logic
const loanInput = document.getElementById("loanAmount");
const rateInput = document.getElementById("interestRate");
const tenureInput = document.getElementById("tenureYears");

const loanVal = document.getElementById("loanVal");
const rateVal = document.getElementById("rateVal");
const tenureVal = document.getElementById("tenureVal");
const emiOutput = document.getElementById("emiOutput");

function calculateEMI() {
  const principal = Number(loanInput.value) * 100000; // Lakhs to Rupees
  const annualRate = Number(rateInput.value);
  const years = Number(tenureInput.value);

  loanVal.textContent = loanInput.value;
  rateVal.textContent = annualRate.toFixed(1);
  tenureVal.textContent = years;

  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  emiOutput.textContent = `₹${Math.round(emi).toLocaleString("en-IN")}`;
}

loanInput.addEventListener("input", calculateEMI);
rateInput.addEventListener("input", calculateEMI);
tenureInput.addEventListener("input", calculateEMI);

// Initial render
applyFilters();
calculateEMI();