function logout() {
    window.location.href = '/login/'
}

async function buscaChamada() {

    let endpoint = 'https://universidade-jynx-back.onrender.com/call/getAllCall'

    let response = await fetch(endpoint)
    let data = await response.json()

    for (let i = 0; i < data.length; i++) {

        let cadaChamada = data[i]

        let container = document.querySelector('#tbody')

        let html = `
        <div class="tr">
                                <p>${cadaChamada.turma}</p>
                                <p>${cadaChamada.name}</p>
                                <svg onclick="excluirChamada('${cadaChamada.id}')" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                    viewBox="0,0,256,256" style="fill:#FA5252;">
                                    <g fill="#fa5252" fill-rule="nonzero" stroke="none" stroke-width="1"
                                        stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                        stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                                        font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                        <g transform="scale(5.33333,5.33333)">
                                            <path
                                                d="M24,4c-3.29586,0 -6,2.70413 -6,6h-6.25391c-0.08901,-0.01526 -0.17922,-0.02245 -0.26953,-0.02148c-0.07269,0.0019 -0.14515,0.00908 -0.2168,0.02148h-3.75977c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.5v25.5c0,3.01977 2.48023,5.5 5.5,5.5h17c3.01977,0 5.5,-2.48023 5.5,-5.5v-25.5h2.5c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-3.75391c-0.16103,-0.02645 -0.3253,-0.02645 -0.48633,0h-6.25977c0,-3.29587 -2.70414,-6 -6,-6zM24,7c1.67413,0 3,1.32587 3,3h-6c0,-1.67413 1.32587,-3 3,-3zM13,13h22v25.5c0,1.39823 -1.10177,2.5 -2.5,2.5h-17c-1.39823,0 -2.5,-1.10177 -2.5,-2.5zM20.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM27.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
        `

        container.innerHTML += html

    }

}
buscaChamada()

async function excluirChamada(id) {

    let endpoint = `https://universidade-jynx-back.onrender.com/call/deleteCalls/${id}`

    let response = await fetch(endpoint, {
        method: 'DELETE'
    })

    window.location.reload()

}

async function limparChamada() {

    let endpoint = `https://universidade-jynx-back.onrender.com/call/delete`

    let response = await fetch(endpoint, {
        method: 'DELETE'
    })

    window.location.reload()

}

// Exporta o conteúdo já renderizado em #tbody para Excel (CSV)
function exportarExcel() {
    var tbody = document.getElementById('tbody');
    if (!tbody) {
        console.error('Elemento #tbody não encontrado. Chame exportarExcel() após renderizar a tabela.');
        return;
    }

    // Cabeçalhos
    var linhas = [["Turma", "Nome"]];

    // Coleta das linhas existentes
    var rows = tbody.getElementsByClassName('tr');
    for (var i = 0; i < rows.length; i++) {
        var ps = rows[i].getElementsByTagName('p');
        var turma = ps.length > 0 ? (ps[0].textContent || '').trim() : '';
        var nome = ps.length > 1 ? (ps[1].textContent || '').trim() : '';
        linhas.push([turma, nome]);
    }

    // Montagem do CSV (separador ;, com BOM para acentos)
    var csv = '\uFEFF' + linhas.map(function (linha) {
        return linha.map(function (v) {
            v = String(v == null ? '' : v);
            return /[;"\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
        }).join(';');
    }).join('\n');

    // Download
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'chamadas_' + linhas[1][0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    (window.URL || window.webkitURL).revokeObjectURL(url);
}