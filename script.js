// --- Tab Switching ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(btn => btn.addEventListener('click', () => {
  const target = btn.dataset.tab;
  contents.forEach(c => c.classList.add('hidden'));
  const activeTab = document.getElementById(`tab-${target}`);
  if (activeTab) activeTab.classList.remove('hidden');

  tabs.forEach(b => b.classList.remove('text-blue-400'));
  btn.classList.add('text-blue-400');
}));

// --- Oil Conversion ---
const wtInput = document.getElementById('wtInput');
const cstInput = document.getElementById('cstInput');
const oilResult = document.getElementById('oilResult');

function wtToCst(wt) { return Math.round(wt * 10 + 50); }
function cstToWt(cst) { return Math.round((cst - 50) / 10); }

if (wtInput && cstInput) {
  wtInput.addEventListener('input', () => {
    const wt = parseFloat(wtInput.value);
    if (!isNaN(wt)) {
      const cst = wtToCst(wt);
      cstInput.value = cst;
      oilResult.textContent = `${wt} WT ≈ ${cst} cSt`;
    } else oilResult.textContent = "";
  });

  cstInput.addEventListener('input', () => {
    const cst = parseFloat(cstInput.value);
    if (!isNaN(cst)) {
      const wt = cstToWt(cst);
      wtInput.value = wt;
      oilResult.textContent = `${cst} cSt ≈ ${wt} WT`;
    } else oilResult.textContent = "";
  });
}

// --- KV to RPM ---
const kvInput = document.getElementById('kvInput');
const voltInput = document.getElementById('voltInput');
const rpmOutput = document.getElementById('rpmOutput');

if (kvInput && voltInput && rpmOutput) {
  function updateRPM() {
    const kv = parseFloat(kvInput.value);
    const volt = parseFloat(voltInput.value);
    if (!isNaN(kv) && !isNaN(volt)) {
      rpmOutput.value = Math.round(kv * volt).toLocaleString() + " RPM";
    } else rpmOutput.value = "";
  }
  kvInput.addEventListener('input', updateRPM);
  voltInput.addEventListener('input', updateRPM);
}

// --- Gear Ratio & Speed ---
const pinionInput = document.getElementById('pinionInput');
const spurInput = document.getElementById('spurInput');
const fdrInput = document.getElementById('fdrInput');
const diameterInput = document.getElementById('diameterInput');
const motorRPMInput = document.getElementById('motorRPMInput');
const gearResult = document.getElementById('gearResult');

if (pinionInput && spurInput && fdrInput && diameterInput && motorRPMInput) {
  function updateGear() {
    const pinion = parseFloat(pinionInput.value);
    const spur = parseFloat(spurInput.value);
    const fdr = parseFloat(fdrInput.value);
    const diameter = parseFloat(diameterInput.value);
    const rpm = parseFloat(motorRPMInput.value);

    if ([pinion, spur, fdr, diameter, rpm].some(isNaN)) {
      gearResult.textContent = "";
      return;
    }

    const ratio = (spur / pinion) * fdr;
    const wheelRPM = rpm / ratio;
    const wheelCirc = Math.PI * (diameter / 1000);
    const speedMps = wheelCirc * (wheelRPM / 60);
    const speedKph = speedMps * 3.6;
    const speedMph = speedMps * 2.23694;

    gearResult.textContent = `Final Drive Ratio: ${ratio.toFixed(2)} • Wheel RPM: ${Math.round(wheelRPM).toLocaleString()} • Est. Top Speed: ${speedKph.toFixed(1)} km/h (${speedMph.toFixed(1)} mph)`;
  }

  [pinionInput, spurInput, fdrInput, diameterInput, motorRPMInput].forEach(el => el.addEventListener('input', updateGear));
}

// --- Battery Runtime ---
const batCapacity = document.getElementById('batCapacity');
const batDraw = document.getElementById('batDraw');
const batResult = document.getElementById('batResult');

if (batCapacity && batDraw && batResult) {
  function updateBattery() {
    const cap = parseFloat(batCapacity.value);
    const draw = parseFloat(batDraw.value);
    if (!isNaN(cap) && !isNaN(draw) && draw > 0) {
      const runtime = (cap / 1000 / draw) * 60;
      batResult.textContent = `Estimated Runtime: ${runtime.toFixed(1)} minutes`;
    } else batResult.textContent = "";
  }

  [batCapacity, batDraw].forEach(el => el.addEventListener('input', updateBattery));
}

// --- Dynamic Schematics List ---
const schematicList = document.getElementById('schematicList');
if (schematicList) {
  const pdfFiles = [
    { name: "MJX 16208 Instruction Manual", file: "MJX-16208.pdf" },
    { name: "SCY 1101-102-103-201", file: "SCY-1101-102-103-201.pdf" }, // new PDF
    { name: "ECX-AMP-MT10", file: "ECX-AMP-MT10.pdf" } // new PDF
  ];

  // Populate the list
  pdfFiles.forEach(pdf => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "pdf/" + pdf.file; // make sure it points to the pdf folder
    a.target = "_blank";
    a.textContent = pdf.name;
    li.appendChild(a);
    schematicList.appendChild(li);
  });
}

