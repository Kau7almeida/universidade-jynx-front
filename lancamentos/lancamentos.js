const donutCtx = document.getElementById('donut');

const donutData = {
    labels: ['Aulas', 'Monitorias'],
    datasets: [{ data: [50, 50], backgroundColor: ['#3b82f6','#8b5cf6'] }]
};

const donut = new Chart(donutCtx, {
    type: 'doughnut',
    data: donutData,
    options: {
        cutout: '60%',
        plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 18, color: '#838383ff' } },
            tooltip: { callbacks: { label: c => `${c.label}: ${c.parsed}%` } }
        }
    }
});