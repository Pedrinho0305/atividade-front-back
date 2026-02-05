const form = document.getElementById('formCadastro')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nome = document.getElementById('nome').value
    const preco = document.getElementById('preco').value

    await fetch('http://localhost:8081/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, preco })
    })

    alert('Sucesso')
    form.reset()
})