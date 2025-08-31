function logout() {
    window.location.href = '/login/'
}

async function buscarAlugueis() {

    let endpoint = 'https://universidade-jynx-back.onrender.com/notebooks/getAllNotebooks'

    let resp = await fetch(endpoint)
    let data = await resp.json()

    console.log(data)

    for (let i = 0; i < data.length; i++) {

        let cadaAluguel = data[i]
        let container = document.querySelector('#tbody')

        let dataAluguel = cadaAluguel.date.slice(0, 10)
        let dataFormatada = dataAluguel.split('-').reverse().join().replaceAll(',', '/')

        let estado = ''
        let status = cadaAluguel.status

        status == 'Emprestado' ? estado = 'emprestado' : estado = 'devolvido'


        let palavra = ''
        status == 'Emprestado' ? palavra = 'Devolver' : palavra = '-'

        let html = `
            <div class="tr">
                <p>${cadaAluguel.student}</p>
                <p>${dataFormatada}</p>
                <p>${cadaAluguel.classe}</p>
                <p class="${estado}">${status}</p>
                <p class="devolver" onclick="atualizarStatus('${cadaAluguel.id}')">${palavra}</p>
                <p class="deletar" onclick="deletar('${cadaAluguel.id}')" >Deletar</p>
            </div>
        `

        container.innerHTML += html

    }

}

buscarAlugueis()


async function deletar(id) {

    let endpoint = `https://universidade-jynx-back.onrender.com/notebooks/deleteNotebook/${id}`

    let resp = await fetch(endpoint, {
        method: 'DELETE'
    })

    window.location.reload()

}

async function atualizarStatus(id) {

    let endpoint = `https://universidade-jynx-back.onrender.com/notebooks/put/${id}`

    let put = {
        status: "Devolvido"
    }

    let resp = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(put)
    })

    window.location.reload()

}

async function cadastrar() {

    let nome = document.querySelector('#txt_aluno').value
    let data = document.querySelector('#txt_data').value
    let classe = document.querySelector('#txt_classe').value

    let post = {
        student: nome,
        date: data,
        classe: classe

    }

    let endpoint = 'https://universidade-jynx-back.onrender.com/notebooks/post'

    let resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    window.location.reload()

}

async function buscaUnidades() {

    let endpoint = 'https://universidade-jynx-back.onrender.com/classe/getAllClasses'

    let response = await fetch(endpoint)
    let data = await response.json()

    for (let i = 0; i < data.length; i++) {

        let cadaTurma = data[i]

        let container = document.querySelector('#txt_classe')

        let html = `
        <option value="${cadaTurma.name}">${cadaTurma.name}</option>
        `

        container.innerHTML += html

    }

}
buscaUnidades()


// Exporta o conteúdo já renderizado em #tbody para Excel (CSV)
function exportarExcel() {
    var tbody = document.getElementById('tbody');
    if (!tbody) {
        console.error('Elemento #tbody não encontrado. Chame exportarExcel() após renderizar a tabela.');
        return;
    }

    // Cabeçalhos
    var linhas = [["Aluno", "Data", "Turma", "Status"]];

    // Coleta das linhas existentes
    var rows = tbody.getElementsByClassName('tr');
    for (var i = 0; i < rows.length; i++) {
        var ps = rows[i].getElementsByTagName('p');
        var aluno = ps.length > 0 ? (ps[0].textContent || '').trim() : '';
        var data = ps.length > 1 ? (ps[1].textContent || '').trim() : '';
        var turma = ps.length > 1 ? (ps[2].textContent || '').trim() : '';
        var status = ps.length > 1 ? (ps[3].textContent || '').trim() : '';
        linhas.push([aluno, data, turma, status]);
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
    a.download = 'notebooks_alugados' + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    (window.URL || window.webkitURL).revokeObjectURL(url);
}