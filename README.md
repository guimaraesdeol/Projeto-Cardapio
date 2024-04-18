# Projeto-Cardapio
 Projeto Cardápido feito tudo do zero
 Com base no canal Sujeito Programador

https://guimaraesburguer.netlify.app/ - Preview do site 

deixa uma star ai :p

qualquer dúvida abrir uma issue

## O projeto tem horário de funcionamento no javascript, recomendo alterar ou remover, pois não sei quando o professor irá acessar o site. Quando o site está fora do horário do script, ele desabilita a opção de finalizar o carrinho.


 # DOCS PARA QUEM VAI FAZER O TRABALHO DO DIOGO:
#### Recomento baixar o github desktop e visual studio, se for rodar o projeto na sua máquina, baixar as bibliotecas necessárias (dá pra publicar direto na netlify ou vercel e editar dando publish mesmo pra não precisar ir atrás disso)

 
 ### O código foi desenvolvido com as tecnologias: Html, Css, Node, Tailwind e JavaScript.
 Para mudar qualquer coisa na aparência do código, é só alterar pelo próprio HTML, aperta CTRL+F no seu editor de código e digita oq tu quer mudar - não mude os ids declarados no html pra não dar conflito no backend.
 Caso queira, você pode mudar todas as fotos do site, adicionar quantos itens/produtos quiser.

 - Para adicionar imagens, lembre-se de informar o diretório da imagem na sessão <img/> de cada conteúdo!
```
<img 
          src="./assets/nome_imagem.png" - Nome que você colocou na nova imagem
          alt="NOME-DO-ITEM" - Nome da imagem
          class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300" - Estilização
        />
```

 # Para adicionar novos items, copie e adapte o cógido a seguir, colando dentro da sessão   <!--INICIO MENU-->
 ```
<!--PRODUTO ITEM-->
      <div class="flex gap-2">
        <img 
          src="./assets/hamb-1.png"
          alt="NOME-DO-ITEM"
          class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
        />
        <div>
          <p class="font-bold">NOME-DO-ITEM</p>
          <p class="text-sm">Descrição aqui Descrição aqui Descrição aqui Descrição aqui Descrição aqui Descrição aqui </p> 
          <div class="flex items-center gap-2 justify-between mt-3">
            <p class="font-bold text-lg">R$99,99</p>
            <button class="bg-gray-900 px-5 rounded add-to-cart-btn"
            data-name="ID-DO-ITEM"
            data-price="99.99"
            >
              <i class="fa fa-cart-plus text-lg text-white"></i>
            </button>
          </div>
        </div>
      </div>
<!--FIM ITEM-->
```
 ### Lembrando: Sempre que adicionar um novo item, configure o data-name e o data-price também, para o back puxar os dados

# Para adicionar algo na sessão bebidas, copie o código e adapte a seguir, colando dentro da sessão <!--GRID BEBIDAS--> :
```
<!--BEBIDA ITEM-->
      <div class="flex gap-2 w-full">
        <img src="./assets/refri-1.png" alt="Coca Lata" class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"/>
        <div class="w-full">
          <p class="font-bold">NOME-BEBIDA-DISPLAY</p>
          <div class="flex items-center gap-2 justify-between mt-3">
            <p class="font-bold text-lg">R$6,00</p>
            <button class="bg-gray-900 px-5 rounded add-to-cart-btn"
            data-name="NOME-BEBIDA"
            data-price="6"
            >
              <i class="fa fa-cart-plus text-lg text-white"></i>
            </button>
          </div>
        </div>
      </div>
      <!--FIM BEBIDA ITEM-->
```

# Lembre se de editar os nomes pessoais, número de envio do whatsapp no javascript, etc.
### Recomendo hospedar na netlify ou vercel, não tem segredo, só dar fork e linkar o github ou baixar o projeto zipado e dar commit direto.
