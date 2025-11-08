// barra_botal_ajustada.js
(function () {
  // Utilitário para aguardar o container do Typebot no shadow DOM
  function waitForContainer(cb) {
    const int = setInterval(() => {
      const host = document.getElementsByTagName("typebot-standard")[0];
      const shadowRoot = host && host.shadowRoot;
      const container = shadowRoot && shadowRoot.querySelector(".typebot-container");
      if (container) {
        clearInterval(int);
        cb(container, shadowRoot);
      }
    }, 100);
  }

  // Exposta globalmente para ser chamada pelo loader externo com var_nome e var_avatar
  window.criarBarra = function (var_nome, var_avatar) {
    waitForContainer((elementoPai) => {
      // Barra superior (nome, status, avatar)
      var varStatus = document.createElement("span");
      varStatus.className = "status";

      var userBar = document.createElement("div");
      userBar.className = "user-bar";

      var avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.innerHTML = '<img src="' + var_avatar + '">';

      var name = document.createElement("div");
      name.className = "name";
      name.innerHTML = "" + var_nome + " ";
      name.appendChild(varStatus);

      userBar.appendChild(avatar);
      userBar.appendChild(name);

      elementoPai.prepend(userBar);

      // Status (digitando/gravando/online) + ícone de check nas mensagens novas
      const botBody = elementoPai;
      const status = varStatus;
      let mensagesLength = 0;

      setInterval(() => {
        const isTyping = botBody.querySelector(".bubble1");
        const sibling = isTyping?.parentElement?.parentElement?.nextSibling;

        if (isTyping && sibling?.src) {
          status.innerText = "gravando audio...";
        } else if (isTyping) {
          status.innerText = "digitando...";
        } else {
          status.innerText = "Online";
        }

        const allMessages = botBody
          .querySelector(".typebot-chat-view")
          .querySelectorAll(".items-start.typebot-host-bubble");

        if (allMessages.length > mensagesLength) {
          if (!isTyping) {
            for (let i = mensagesLength; i < allMessages.length; i++) {
              const iconContainer = document.createElement("div");
              const checkIcon = `
                <svg id="checkIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="#34B7F1" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
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
    });

    // Injeta o CSS corrigido (referência certa)
    waitForContainer((container) => {
      const cssId = "stylebot-ajustado";
      if (!container.querySelector("#" + cssId)) {
        const link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.type = "text/css";
        // REFERÊNCIA CORRETA PARA O CSS AJUSTADO:
        link.href = "https://leandroluizp.github.io/type-scripts/stylebot_ajustado.css";
        link.media = "all";
        container.appendChild(link);
      }
    });

    // Cria o botão fixo "Início" no rodapé
    waitForContainer((container) => {
      if (!container.querySelector("#btn-voltar-inicio")) {
        const botaoVoltar = document.createElement("button");
        botaoVoltar.id = "btn-voltar-inicio";
        botaoVoltar.className = "btn-voltar-inicio";
        botaoVoltar.innerHTML = "Início";

        botaoVoltar.addEventListener("click", function () {
          const chatView = container.querySelector(".typebot-chat-view");
          if (chatView) chatView.scrollTop = 0;
          // Reinicia o fluxo (ajuste se você tiver um método próprio)
          location.reload();
          // Ex.: window.typebot?.restart?.();
        });

        container.appendChild(botaoVoltar);
      }
    });
  };
})();
