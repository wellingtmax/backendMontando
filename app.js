import tabela2024 from './tabela.js';

import express from 'express';

const app = express();
const PORT = 300

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela2024);
})

app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toLocaleUpperCase();
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

app.put('/criar', (req, res) => {
    const siglaInformada = req.params.siglas.toLocaleUpperCase();
    const solo = siglaInformada.fetch((m) => {
       
    })
})



app.listen(PORT, () => console.log(`✅ servidor rodando com sucesso na porta: http://localhost:${PORT}`));