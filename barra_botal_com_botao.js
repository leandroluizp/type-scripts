function criarBarra(var_nome, var_avatar) {
    var varStatus = document.createElement("span");
    varStatus.className = "status";
    var elementoPai = document.getElementsByTagName("typebot-standard")[0].shadowRoot.querySelector('.typebot-container');
    var userBar = document.createElement("div");
    userBar.className = "user-bar";
    var avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = '<img src="'+var_avatar+'">';
    var name = document.createElement("div");
    name.className = "name";
    name.innerHTML = ''+var_nome+' ';
    name.appendChild(varStatus);
    userBar.appendChild(avatar);
    userBar.appendChild(name);
    if (elementoPai) {
        elementoPai.prepend(userBar);
    }

    const botBody = elementoPai;
    const status = varStatus;
    let mensagesLength = 0;
    setInterval(() => {
        const isTyping = botBody.querySelector('.bubble1');
        const sibling = isTyping?.parentElement?.parentElement?.nextSibling;
        if (isTyping && sibling?.src) {
            status.innerText = 'gravando audio...';
        } else if (isTyping) {
            status.innerText = 'digitando...';
        } else {
            status.innerText = 'Online';
        }

        const allMessages = botBody.querySelector('.typebot-chat-view').querySelectorAll('.items-start.typebot-host-bubble');
        if (allMessages.length > mensagesLength) {
            if (!isTyping) {
                for (let i = mensagesLength; i < allMessages.length; i++) {
                    const iconContainer = document.createElement('div');
                    const checkIcon = `
                        <svg id="checkIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34B7F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    `;
                    iconContainer.innerHTML = checkIcon;
                    const currentMsg = allMessages[i];
                    currentMsg.append(iconContainer);
                }
                mensagesLength = allMessages.length;
            }
        }
    }, 400);

    // Carrega o CSS do seu repositório
    var cssId = 'myCss';
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName("typebot-standard")[0].shadowRoot.querySelector('.typebot-container');
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://leandroluizp.github.io/type-scripts/stylebot_com_botao.css';
        link.media = 'all';
        head.appendChild(link);
    }
}

// ============================================
// FUNÇÃO PARA CRIAR BOTÃO DE VOLTAR AO INÍCIO
// ============================================

function criarBotaoVoltar() {
    // Aguarda o elemento estar carregado
    const checkElement = setInterval(() => {
        const shadowRoot = document.getElementsByTagName("typebot-standard")[0]?.shadowRoot;
        const container = shadowRoot?.querySelector('.typebot-container');
        
        if (container && !document.getElementById('btn-voltar-inicio')) {
            clearInterval(checkElement);
            
            // Cria o botão
            const botaoVoltar = document.createElement('button');
            botaoVoltar.id = 'btn-voltar-inicio';
            botaoVoltar.className = 'btn-voltar-inicio';
            botaoVoltar.innerHTML = `Início`;
            
            // Adiciona o evento de clique
            botaoVoltar.addEventListener('click', function() {
                // Encontra o primeiro bloco de mensagens
                const chatView = container.querySelector('.typebot-chat-view');
                if (chatView) {
                    chatView.scrollTop = 0;
                }
                
                // Reinicia o fluxo do typebot
                location.reload();
            });
            
            // Adiciona o botão ao container (dentro do shadow DOM)
            container.appendChild(botaoVoltar);
        }
    }, 100);
}

// Chama a função quando o script é carregado
criarBotaoVoltar();
