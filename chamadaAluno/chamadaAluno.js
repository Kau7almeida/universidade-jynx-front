function finalizar() {
    document.querySelector('#content').style.display = 'none'
    document.querySelector('#finaly').style.display = 'flex'
}


async function buscaUnidades() {

    let endpoint = 'http://127.0.0.1:3333/classe/getAllClasses'

    let response = await fetch(endpoint)
    let data = await response.json()

    for (let i = 0; i < data.length; i++) {

        let cadaTurma = data[i]

        let container = document.querySelector('#txt_unidades')

        let html = `
        <option value="${cadaTurma.classe_id}">${cadaTurma.name}</option>
        `

        container.innerHTML += html

    }

}
// buscaUnidades()

async function realizarChamada() {

    let turma = document.querySelector('#txt_unidades').value
    let aluno = document.querySelector('#txt_aluno').value

    if (!turma || !aluno) {
        alert('Preencha todos os campos')
        return
    }

    let endpoint = 'http://127.0.0.1:3333/call/post'

    let post = {
        name: aluno,
        classe_id: turma
    }

    let response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })

    finalizar()

}