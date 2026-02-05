async function carregar() {
    const res = await fetch('http://localhost:8081/produtos')
    const dados = await res.json()
    const lista = document.getElementById('lista')

    dados.forEach(item => {
        const li = document.createElement('li')
        
        const nomeDiv = document.createElement('div')
        nomeDiv.className = 'item-nome'
        nomeDiv.textContent = item.nome

        const precoDiv = document.createElement('div')
        precoDiv.className = 'item-preco'
        precoDiv.textContent = 'R$ ' + item.preco

        li.appendChild(nomeDiv)
        li.appendChild(precoDiv)
        lista.appendChild(li)
    })
}
carregar()