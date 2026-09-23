import { useRef, useState } from "react";

const API_URL = 'https://crudcrud.com/api/0da58609dbbe4c409958127904777e86/pagamentos';

function App(){

  const infoPagamento = {
    valor: 42.00,
    cpf: '262.970.790-30',
    metodo: 'pix',
    chavePix: 'cpf',
    qrCode: null,
    status: null
  };

  const [pagamento, setPagamento] = useState({...infoPagamento});

  const estaProcessando = useRef(false);

  const efetuarPagamento = () => {

    if (estaProcessando.current) {
      console.log('Já está sendo processada');
      return;
    }

    estaProcessando.current = true;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pagamento)
    })
      .then(res => res.json())
      .then(pagamentoCriado => {
        setPagamento((prev) => ({
          ...prev,
          idPagamento: pagamentoCriado._id,
          qrCode: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?_=20200615212723',
          status: 'CRIADO'}));
      })
      .catch(error => {
        console.error('Erro ao criar pagamento:', error);
      });

  };

  return (
    <div>
      <button onClick={() => {
        efetuarPagamento();
        efetuarPagamento(); // Simula double click
      }}>
        Pagar com PIX
      </button>
      <br />
      {pagamento.status && <img width="120" src={pagamento.qrCode} />}
    </div>
  );
}

export default App;
