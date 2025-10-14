// formulario_dynamic.js
// JS modularizado para formulário dinâmico de consultoria BI (carregando config do JSON externo)

async function carregarConfig() {
  try {
    // Lê o JSON na mesma pasta
    const resp = await fetch('base_formulario_consultoria.json');
    if (!resp.ok) throw new Error('Erro ao carregar configuração do formulário!');
    // Caso o arquivo tenha algum prefixo ou texto errado (ex: "PDF: {"), vamos tratar
    let texto = await resp.text();
    // Remove qualquer prefixo "PDF:" ou comentários JSON
    texto = texto.replace(/^PDF:\s*/, '').replace(/(\r?\n|\r)/g, '');
    // Tenta decodificar normalmente
    let config = JSON.parse(texto);
    return config;
  } catch (err) {
    document.getElementById('formulario').innerHTML =
      `<div class="erro">Erro ao carregar configuração do formulário: ${err.message}</div>`;
    throw err;
  }
}

// Utilitário: criar elementos DOM rapidamente
function criarElemento(tag, props = {}, ...filhos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.substr(2).toLowerCase(), v);
    else if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v);
  }
  filhos.forEach(f => {
    if (!f) return;
    else if (Array.isArray(f)) f.forEach(n => n && el.appendChild(n));
    else if (f instanceof Node) el.appendChild(f);
    else el.appendChild(document.createTextNode(f));
  });
  return el;
}

// Condicional (se o campo estiver ativo baseado em dependência)
function campoAtivo(campo, valores) {
  if (!campo.condicao) return true;
  let outroValor = valores[campo.condicao.campo];
  if (Array.isArray(outroValor)) {
    return outroValor.includes(campo.condicao.valor);
  }
  return outroValor === campo.condicao.valor;
}

// Renderização dinâmica do formulário
function renderFormulario(config, container, valores = {}) {
  container.innerHTML = '';
  config.categorias.forEach(categoria => {
    const sec = criarElemento('section', {class: 'section', id: categoria.id},
      criarElemento('h3', {}, categoria.titulo)
    );

    categoria.campos.forEach(campo => {
      if (!campoAtivo(campo, valores)) return;

      let fieldWrapper = criarElemento('div', {class: 'campo'});
      let inputEl = null;

      // LABEL + requerido
      const lab = criarElemento('label', {for: campo.id},
        campo.label, campo.obrigatorio ? criarElemento('span', {style: "color: #e74c3c"}, " *") : ''
      );
      fieldWrapper.appendChild(lab);

      // Campo principal
      if (campo.tipo === "text") {
        inputEl = criarElemento('input', {
          type: 'text', id: campo.id, name: campo.id, value: valores[campo.id] || '',
          required: campo.obrigatorio ? true : false,
          oninput: e => onFormUpdate()
        });
      } else if (campo.tipo === "textarea") {
        inputEl = criarElemento('textarea', {
          id: campo.id, name: campo.id, required: campo.obrigatorio ? true : false,
          oninput: e => onFormUpdate()
        }, valores[campo.id] || '');
      } else if (campo.tipo === "select") {
        inputEl = criarElemento('select', {
          id: campo.id, name: campo.id, required: campo.obrigatorio ? true : false,
          onchange: e => onFormUpdate()
        },
          criarElemento('option', {value: ""}, "Selecione...")
        );
        let opcoes = campo.opcoes;
        if (typeof campo.opcoes === 'object' && !Array.isArray(campo.opcoes)) {
          let segmento = valores['segmento'] || 'default';
          opcoes = campo.opcoes[segmento] || campo.opcoes['default'];
        }
        (opcoes || []).forEach(opt =>
          inputEl.appendChild(criarElemento('option', {value: opt}, opt.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())))
        );
      } else if (campo.tipo === "checkbox") {
        let opcoes = campo.opcoes;
        if (typeof campo.opcoes === 'object' && !Array.isArray(campo.opcoes)) {
          let segmento = valores['segmento'] || 'default';
          opcoes = campo.opcoes[segmento] || campo.opcoes['default'];
        }
        inputEl = criarElemento('div', {class: 'checkbox-grid'});
        (opcoes || []).forEach(opt => {
          const idOpt = `${campo.id}_${opt}`;
          let checked = (valores[campo.id] || []).includes(opt);
          const chk = criarElemento('input', {
            type: 'checkbox', id: idOpt, name: campo.id, value: opt,
            checked, onchange: e => onFormUpdate()
          });
          const lbl = criarElemento('label', {for: idOpt, class: 'checkbox-label'}, opt.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
          let item = criarElemento('div', {class: 'checkbox-item' + (checked ? ' checked': '')}, chk, lbl);
          inputEl.appendChild(item);
        });
      } else if (campo.tipo === "radio") {
        inputEl = criarElemento('div', {class: 'checkbox-grid'});
        (campo.opcoes || []).forEach(opt => {
          const idOpt = `${campo.id}_${opt}`;
          const radio = criarElemento('input', {
            type: 'radio', id: idOpt, name: campo.id, value: opt,
            checked: valores[campo.id] === opt,
            onchange: e => onFormUpdate()
          });
          const lbl = criarElemento('label', {for: idOpt, class: 'checkbox-label'}, opt);
          let item = criarElemento('div', {class: 'checkbox-item' + (valores[campo.id] === opt ? ' checked': '')}, radio, lbl);
          inputEl.appendChild(item);
        });
      }

      // Área de mensagens customizáveis para dicas/avisos (pronto para expandir depois)
      const mensagemDiv = criarElemento('div', {class: 'mensagem-dinamica'});
      // Exemplo de dica: você pode expandir conforme desejo

      fieldWrapper.appendChild(inputEl);
      fieldWrapper.appendChild(mensagemDiv);
      sec.appendChild(fieldWrapper);
    });
    container.appendChild(sec);
  });
}

// Coletar valores do form
function lerValores() {
  const data = {};
  const allInputs = document.querySelectorAll('#formulario input, #formulario textarea, #formulario select');
  allInputs.forEach(inp => {
    if (inp.type === "checkbox") {
      if (!inp.checked) return;
      if (!data[inp.name]) data[inp.name] = [];
      data[inp.name].push(inp.value);
    }
    else if (inp.type === "radio") {
      if (inp.checked) data[inp.name] = inp.value;
    }
    else {
      data[inp.name] = inp.value;
    }
  });
  return data;
}

// Atualizar dinamicamente o form conforme o usuário interage
function onFormUpdate() {
  if (!window._formConfig) return;
  const valores = lerValores();
  renderFormulario(window._formConfig, document.getElementById('formulario'), valores);
}

// Inicialização: carrega o JSON e monta tudo
window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('formulario');
  container.innerHTML = "<div class='info'>Carregando formulário...</div>";
  try {
    const config = await carregarConfig();
    window._formConfig = config;
    renderFormulario(config, container, {});
  } catch (e) {
    // já tratado na função carregarConfig()
  }
});
