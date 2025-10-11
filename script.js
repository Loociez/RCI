const infoData = [
  {
    title: "Choosing Your First RC Car",
    category: "beginner",
    description: "Learn what to look for when buying your first electric RC car — from motor types to terrain compatibility.",
    image: "https://cdn.pixabay.com/photo/2018/02/17/21/26/rc-car-3159186_1280.jpg"
  },
  {
    title: "Battery Care 101",
    category: "batteries",
    description: "Understand LiPo battery charging, storage, and safety for long-lasting performance.",
    image: "https://cdn.pixabay.com/photo/2016/11/29/12/41/battery-1869211_1280.jpg"
  },
  {
    title: "Upgrading Motors for Speed",
    category: "performance",
    description: "Brushless vs. brushed — find out which motor type gives your RC car the edge on the track.",
    image: "https://cdn.pixabay.com/photo/2021/09/28/21/56/motor-6667537_1280.jpg"
  },
  {
    title: "Routine Maintenance Checklist",
    category: "maintenance",
    description: "Keep your RC car in peak condition with this simple after-race cleaning and tuning checklist.",
    image: "https://cdn.pixabay.com/photo/2018/01/16/14/06/tools-3086975_1280.jpg"
  }
];

const infoGrid = document.getElementById('infoGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function renderCards(data) {
  infoGrid.innerHTML = data.map(item => `
    <div class="card bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
      <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-semibold text-blue-400 mb-2">${item.title}</h3>
        <p class="text-gray-300 text-sm">${item.description}</p>
        <span class="inline-block mt-3 text-xs bg-blue-700 text-blue-100 px-3 py-1 rounded-full">${item.category}</span>
      </div>
    </div>
  `).join('');
}

function filterAndRender() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const filtered = infoData.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  renderCards(filtered);
}

searchInput.addEventListener('input', filterAndRender);
categoryFilter.addEventListener('change', filterAndRender);

renderCards(infoData);
