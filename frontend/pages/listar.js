async function carregar() {
    const res = await fetch('http://localhost:8081/produtos')
    const dados = await res.json()
    const lista = document.getElementById('lista')

    lista.innerHTML = ''

    dados.forEach(item => {
        const li = document.createElement('li')
        
        const nomeDiv = document.createElement('div')
        nomeDiv.className = 'item-nome'
        nomeDiv.textContent = item.nome

        const precoDiv = document.createElement('div')
        precoDiv.className = 'item-preco'
        precoDiv.textContent = 'R$ ' + parseFloat(item.preco).toFixed(2)

        // --- INÍCIO DO BOTÃO DE EDITAR ---
        const btnEditar = document.createElement('button')
        btnEditar.className = 'btn-editar'
        btnEditar.title = 'Editar produto'
        
        // Ícone de lápis
        btnEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        `

        btnEditar.addEventListener('click', async () => {
            const novoNome = prompt(`Editar nome do produto:`, item.nome)
            if (novoNome === null) return // Sai se o usuário cancelar

            const novoPrecoStr = prompt(`Editar preço do produto (R$):`, item.preco)
            if (novoPrecoStr === null) return 

            const novoPreco = parseFloat(novoPrecoStr.replace(',', '.'))

            // Validação simples
            if (novoNome.trim() === '' || isNaN(novoPreco)) {
                alert('Dados inválidos. A edição foi cancelada.')
                return
            }

            // Requisição PUT
            try {
                const resposta = await fetch(`http://localhost:8081/produtos/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: novoNome,
                        preco: novoPreco
                    })
                })

                if (resposta.ok) {
                    alert('Produto atualizado com sucesso!')
                    carregar() // Recarrega a lista para mostrar os novos dados
                } else {
                    alert('Erro ao atualizar o produto no servidor.')
                }
            } catch (erro) {
                console.error('Erro na requisição:', erro)
                alert('Falha de conexão ao tentar editar.')
            }
        })
        // --- FIM DO BOTÃO DE EDITAR ---

        const btnApagar = document.createElement('button')
        btnApagar.className = 'btn-apagar'
        btnApagar.title = 'Apagar produto'
        
        btnApagar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `
        
        btnApagar.addEventListener('click', async () => {
            const confirmacao = confirm(`Deseja realmente apagar o item: ${item.nome}?`)
            
            if (confirmacao) {
                try {
                    const resposta = await fetch(`http://localhost:8081/produtos/${item.id}`, {
                        method: 'DELETE'
                    })

                    if (resposta.ok) {
                        alert('Informação apagada com sucesso!')
                        carregar()
                    } else {
                        alert('Erro ao apagar o produto no servidor.')
                    }
                } catch (erro) {
                    console.error('Erro na requisição:', erro)
                    alert('Falha de conexão ao tentar apagar.')
                }
            }
        })

        li.appendChild(nomeDiv)
        li.appendChild(precoDiv)
        li.appendChild(btnEditar) // Inserindo o botão de editar no HTML da lista
        li.appendChild(btnApagar)
        lista.appendChild(li)
    })
}

carregar()