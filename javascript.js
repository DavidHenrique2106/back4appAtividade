document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
            headers: {
                'X-Parse-Application-Id': 'zpVhBE2mk7xalFNZfWRyKLAMJrybgnXSeQ6KGW3K',
                'X-Parse-REST-API-Key': 'In32YgqCjH2Vbd1ZwOu8LhMzCklEfGbygYAW4vFW'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const chamadosDiv = document.getElementById('chamados');
            chamadosDiv.innerHTML = ''; 
            
            data.results.forEach(chamado => {
                const chamadoDiv = document.createElement('div');
                chamadoDiv.innerHTML = `
                    <h3>${chamado.assunto}</h3>
                    <p><strong>Nome:</strong> ${chamado.Nome}</p>
                    <p><strong>Email:</strong> ${chamado.Email}</p>
                    <p><strong>Mensagem:</strong> ${chamado.mensagem}</p>
                    <label for="resposta_${chamado.objectId}">Resposta:</label><br>
                    <textarea id="resposta_${chamado.objectId}"></textarea><br>
                    <button onclick="responderChamado('${chamado.objectId}')">Responder e Finalizar</button>
                `;
                chamadosDiv.appendChild(chamadoDiv);
            });
        } else {
            console.error('Erro ao buscar os chamados:', response.statusText);
            alert('Ocorreu um erro ao buscar os chamados. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro ao buscar os chamados:', error);
        alert('Ocorreu um erro ao buscar os chamados. Por favor, tente novamente mais tarde.');
    }
});

async function responderChamado(chamadoId) {
    const resposta = document.getElementById(`resposta_${chamadoId}`).value;
    
    const data = {
        resposta: resposta,
        finalizado: true 
    };

    const options = {
        method: 'POST', // mudança para POST
        headers: {
            'X-Parse-Application-Id': 'zpVhBE2mk7xalFNZfWRyKLAMJrybgnXSeQ6KGW3K',
            'X-Parse-REST-API-Key': 'In32YgqCjH2Vbd1ZwOu8LhMzCklEfGbygYAW4vFW',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Chamado/${chamadoId}`, options);

        if (response.ok) {
            alert('Resposta enviada e chamado finalizado com sucesso!');
            window.location.reload();
        } else {
            console.error('Erro ao responder o chamado:', response.statusText);
            alert('Ocorreu um erro ao responder o chamado. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro ao responder o chamado:', error);
        alert('Ocorreu um erro ao responder o chamado. Por favor, tente novamente mais tarde.');
    }
}
