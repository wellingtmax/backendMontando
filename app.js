import tabela2024 from './tabela.js';

import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela2024);
})

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);
    if(!time /*alternativa ->(time === undefined)<- */){ // undefined -> se comporta com falso (not(!time)) => é verdaddeiro
        resposta.status(404)
        .send(
            'Time Não encontrado, Pode ser que esse time não faz parte desse Brasileirão!!'
        )
        return;
    }
    resposta.status(200).send(time);
});

app.put('/criar/:sigla', (req, res) => {
    const siglaInformada = req.params.sigla.toUpperCase();

    const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);

    if(!time){
        return res.status(404).send('Time não encontrado');
    }

    const{
        pontos,
        vitorias,
        empates,
        derrotas,
        golsMarcados,
        golsSofridos
    } = req.body;

    // Atualização dos campos (se presentes)
    if (typeof pontos === 'number') {
        time.pontos = pontos;
    }
    if (typeof vitorias === 'number') {
        time.vitorias = vitorias;
    }
    if (typeof empates === 'number') {
        time.empates = empates;
    }
    if (typeof derrotas === 'number') {
        time.derrotas = derrotas;
    }
    if (typeof golsMarcados === 'number') {
        time.golsMarcados = golsMarcados;
    }
    if (typeof golsSofridos === 'number') {
        time.golsSofridos = golsSofridos;
    }

    // Recalcula saldo de gols
    time.saldoGols = time.golsMarcados - time.golsSofridos;

    res.status(200).json({ mensagem: 'Time atualizado com sucesso', time });
});



app.listen(PORT, () => console.log(`✅ servidor rodando com sucesso na porta: http://localhost:${PORT}`));