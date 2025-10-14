// INR currency formatter
const fmtINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

// Demo products focused on Women & Girls
const PRODUCTS = [
  // Sarees
  { id: 1, title: "Kanjivaram Silk Saree", category: "sarees", price: 8499, img: "", desc: "Rich zari border, festive-ready." },
  { id: 2, title: "Chiffon Printed Saree", category: "sarees", price: 1999, img: "", desc: "Lightweight drape for daytime." },
  { id: 3, title: "Banarasi Tissue Saree", category: "sarees", price: 5999, img: "", desc: "Classic motifs with sheen." },

  // Lehengas
  { id: 4, title: "Embroidered Lehenga Set", category: "lehengas", price: 10999, img: "", desc: "Sequins and threadwork." },
  { id: 5, title: "Pastel Georgette Lehenga", category: "lehengas", price: 7999, img: "", desc: "Flowy silhouette, soft hues." },

  // Kurtas & Suits
  { id: 6, title: "Cotton Kurta Set", category: "kurtas", price: 2499, img: "", desc: "Breathable everyday set." },
  { id: 7, title: "Anarkali Suit Set", category: "kurtas", price: 4499, img: "", desc: "Flared fit with dupatta." },
  { id: 8, title: "Chikankari Kurti", category: "kurtas", price: 1899, img: "", desc: "Delicate hand-inspired pattern." },

  // Girls Collection
  { id: 9, title: "Girls Lehenga Choli", category: "girls", price: 2499, img: "", desc: "Light and comfy for functions." },
  { id: 10, title: "Girls Kurti-Palazzo Set", category: "girls", price: 1699, img: "", desc: "Bright prints, soft fabric." },

  // Accessories
  { id: 11, title: "Kundan Earrings", category: "accessories", price: 799, img: "", desc: "Statement festive piece." },
  { id: 12, title: "Embroidered Potli Bag", category: "accessories", price: 999, img: "", desc: "Perfect ethnic add-on." }
];

const state = {
  filter: "all",
  sort: "popular",
  cart: []
};

// DOM refs
const productGrid = document.getElementById("productGrid");
const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const yearEl = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

// Init
document.addEventListener("DOMContentLoaded", () => {
  yearEl.textContent = new Date().getFullYear();
  renderProducts();
});

filterCategory.addEventListener("change", e => {
  state.filter = e.target.value;
  renderProducts();
});

sortBy.addEventListener("change", e => {
  state.sort = e.target.value;
  renderProducts();
});

// Category cards quick filter
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.category;
    filterCategory.value = cat;
    state.filter = cat;
    renderProducts();
  });
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  const open = navLinks.style.display === "block";
  navLinks.style.display = open ? "none" : "block";
});

// Cart drawer controls
cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

checkoutBtn.addEventListener("click", () => {
  alert("Demo checkout — integrate Razorpay/Stripe or COD flow.");
});

function openCart(){
  cartDrawer.classList.add("open");
  overlay.hidden = false;
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  overlay.hidden = true;
  cartDrawer.setAttribute("aria-hidden", "true");
}

function renderProducts(){
  const filtered = PRODUCTS.filter(p => state.filter === "all" ? true : p.category === state.filter);
  const sorted = filtered.sort((a,b) => {
    if(state.sort === "price-asc") return a.price - b.price;
    if(state.sort === "price-desc") return b.price - a.price;
    return a.id - b.id; // popular fallback by id
  });

  productGrid.innerHTML = "";
  sorted.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("div");
    img.className = "img";
    img.textContent = "Image";
    // If you have image URLs, set: img.style.background = `url(${p.img}) center/cover`;

    const title = document.createElement("h3");
    title.textContent = p.title;

    const desc = document.createElement("p");
    desc.textContent = p.desc;

    const priceRow = document.createElement("div");
    priceRow.className = "price-row";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = fmtINR(p.price);

    const addBtn = document.createElement("button");
    addBtn.className = "btn";
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(p));

    priceRow.append(price, addBtn);

    card.append(img, title, desc, priceRow);
    productGrid.append(card);
  });
}

function addToCart(product){
  const existing = state.cart.find(i => i.id === product.id);
  if(existing){
    existing.qty += 1;
  }else{
    state.cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function updateCartUI(){
  // Count
  const count = state.cart.reduce((sum,i)=>sum+i.qty,0);
  cartCount.textContent = count;

  // Items
  cartItems.innerHTML = "";
  state.cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const thumb = document.createElement("div");
    thumb.className = "thumb";

    const info = document.createElement("div");
    const h4 = document.createElement("h4");
    h4.textContent = item.title;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${fmtINR(item.price)} • ${prettyCat(item.category)}`;
    info.append(h4, meta);

    const qty = document.createElement("div");
    qty.className = "qty";
    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () => changeQty(item.id, -1));
    const num = document.createElement("span");
    num.textContent = item.qty;
    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () => changeQty(item.id, 1));

    qty.append(minus, num, plus);

    row.append(thumb, info, qty);
    cartItems.append(row);
  });

  // Totals
  const subtotal = state.cart.reduce((sum,i)=>sum + i.price * i.qty, 0);
  cartSubtotal.textContent = fmtINR(subtotal);
}

function changeQty(id, delta){
  const item = state.cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    state.cart = state.cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function prettyCat(cat){
  const map = {
    sarees: "Sarees",
    lehengas: "Lehengas",
    kurtas: "Kurtas & Suits",
    girls: "Girls",
    accessories: "Accessories"
  };
  return map[cat] || cat;
}

// Contact form (demo)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending...";
  setTimeout(()=>{
    formStatus.textContent = "Thanks! We will get back to you soon. (Demo)";
    contactForm.reset();
  }, 700);
});
