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
        <option value="${cadaTurma.classe_id}">${cadaTurma.name}</option>
        `

        container.innerHTML += html

    }

}
buscaUnidades()