// Importar a configuração diretamente (coloque em um arquivo separado se necessário)
const configForm = /* Cole aqui o objeto JS do seu arquivo base_formulario_consultoria.json, sem a nota 'PDF:' na frente! */;

// Utilidade: Cria elementos DOM
function el(tag, opts = {}, ...children) {
  const e = document.createElement(tag);
  for (let [k, v] of Object.entries(opts)) {
    if (k === 'class') e.className = v;
    else if (k === 'for') e.htmlFor = v;
    else if (k === 'dataset') Object.assign(e.dataset, v);
    else if (k.startsWith('on')) e.addEventListener(k.substring(2), v);
    else if (k === 'value') e.value = v;
    else e.setAttribute(k, v);
  }
  children.forEach(c => c != null && e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return e;
}

// Função para obter campo por ID (inclusive campos condicionais)
function getFieldById(categorias, id) {
  for (let cat of categorias) {
    for (let campo of cat.campos) {
      if (campo.id === id) return campo;
    }
  }
  return null;
}

// Renderização principal
function renderFormulario(container, config) {
  container.innerHTML = "";
  config.categorias.forEach(categoria => {
    const section = el('section', {class: 'section'});
    section.appendChild(el('h3', {}, categoria.titulo));
    if (categoria.descricao)
      section.appendChild(el('div', {class: 'subtitulo'}, categoria.descricao));
    categoria.campos.forEach(campo => {
      renderCampo(section, campo, config, {});
    });
    container.appendChild(section);
  });

  // Botão de envio no final
  container.appendChild(el('button', {
    type: "submit",
    onclick: (e) => {
      e.preventDefault();
      if(validarFormulario(container, config)) {
        alert("Formulário enviado com sucesso!");
      }
    }
  }, 'Enviar'));
}

// Renderização dinâmica de campos, incluindo condicionais e mensagens
function renderCampo(parent, campo, config, respostas) {
  // Ocultamento por condicional
  if (campo.condicional) {
    const val = respostas[campo.condicional.campo];
    if (!(Array.isArray(val) ? val.includes(campo.condicional.valor) : val === campo.condicional.valor)) {
      return; // Não renderiza se não for condicionalmente válido
    }
  }

  let wrapper = el('div', {class: 'campo-wrapper', id: `wrapper_${campo.id}`});
  const obrig = campo.obrigatorio ? ' *' : '';
  wrapper.appendChild(el('label', {for: campo.id}, campo.label + obrig));

  let input;
  let mensagem = el('div', {id: `msg_${campo.id}`});

  switch (campo.tipo) {
    case 'text':
      input = el('input', {
        type: 'text', id: campo.id, name: campo.id,
        required: campo.obrigatorio, value: "",
        oninput: (e) => {
          atualizaMensagens(campo, e.target.value, mensagem);
          atualizaCondicionais(parent, campo.id, e.target.value, config, respostas);
        }
      });
      break;
    case 'textarea':
      input = el('textarea', {
        id: campo.id, name: campo.id,
        required: campo.obrigatorio,
        oninput: (e) => {
          atualizaMensagens(campo, e.target.value, mensagem);
          atualizaCondicionais(parent, campo.id, e.target.value, config, respostas);
        }
      });
      break;
    case 'select':
      input = el('select', {
        id: campo.id, name: campo.id,
        required: campo.obrigatorio,
        onchange: (e) => {
          atualizaMensagens(campo, e.target.value, mensagem);
          atualizaCondicionais(parent, campo.id, e.target.value, config, respostas);
        }
      },
        el('option', {value: ""}, "-- selecione --"),
        ...(campo.opcoes || []).map(op =>
          el('option', {value: op.id}, op.label)
        )
      );
      break;
    case 'checkbox':
      input = el('div', {class: 'checkbox-grid'});
      let valuesChk = [];
      (campo.opcoes || []).forEach(op=>{
        let checkbox = el('input', {
          type: 'checkbox', id: `${campo.id}_${op.id}`,
          name: campo.id, value: op.id,
          onchange: (e)=>{
            // Atualiza array de selecionados
            if(e.target.checked) valuesChk.push(op.id);
            else valuesChk = valuesChk.filter(v=>v!==op.id);

            atualizaMensagens(campo, valuesChk, mensagem);
            atualizaCondicionais(parent, campo.id, valuesChk, config, respostas);
          }
        });
        let opDiv = el('label', {class:'checkbox-item'},
          checkbox,
          el('span', {class:'checkbox-label'}, op.label)
        );
        input.appendChild(opDiv);
      });
      break;
    case 'radio':
      input = el('div');
      (campo.opcoes || []).forEach(op=>{
        let radio = el('input', {
          type: 'radio',
          id: `${campo.id}_${op.id}`,
          name: campo.id,
          value: op.id,
          onchange: (e)=>{
            atualizaMensagens(campo, op.id, mensagem);
            atualizaCondicionais(parent, campo.id, op.id, config, respostas);
          }
        });
        let opDiv = el('label', {class: 'checkbox-item'}, radio,
          el('span', {class:'checkbox-label'}, op.label));
        input.appendChild(opDiv);
      });
      break;
    default: // custom future
      input = el('input', {type:'text', id: campo.id, name: campo.id});
  }

  // Dica inicial
  if (campo.dica) {
    mensagem.className = "dica";
    mensagem.textContent = campo.dica;
  }
  // Inicialmente oculto, será tratado nas interações

  wrapper.appendChild(input);
  wrapper.appendChild(mensagem);
  parent.appendChild(wrapper);

  // Campo complementar/condicional (ex: "Outros - descreva")
  if (campo.campo_condicional) {
    let comp_id = campo.campo_condicional.valor;
    // O campo complementar só aparece se valor selecionado === comp_id
    let funcRenderCond = (val) =>{
      let already = document.getElementById('wrapper_' + campo.campo_condicional.campo_complementar.id);
      if (val === comp_id) {
        if(!already)
          renderCampo(parent, campo.campo_condicional.campo_complementar, config, respostas);
      } else {
        if(already) already.remove();
      }
    };
    // Gatilho inicial (esconde do início)
    funcRenderCond();
    // Adiciona listener dinâmico no select
    input.addEventListener('change', (e)=>{
      funcRenderCond(e.target.value);
    });
  }
}

// Atualiza mensagens baseadas em interação
function atualizaMensagens(campo, valor, msgDiv) {
  msgDiv.className = ""; msgDiv.textContent = "";
  // Dica padrão
  if (campo.dica) { msgDiv.className = "dica"; msgDiv.textContent = campo.dica;}
  // Mensagens customizadas por valor (exemplo: opções específicas)
  // Adapte aqui se ampliar configuração!

  // Exemplo de alerta textual pelo campo (adapte por seu json)
  if (campo.mensagem_validacao && campo.tipo === 'checkbox') {
    if (!valor || valor.length === 0) {
      msgDiv.className = "alerta";
      msgDiv.textContent = campo.mensagem_validacao;
    }
  }
}

// (re)Renderiza campos condicionais
function atualizaCondicionais(parent, campoId, valor, config, respostas) {
  respostas[campoId] = valor;
  config.categorias.forEach(cat=>{
    cat.campos.forEach(c=>{
      if (c.condicional && c.condicional.campo === campoId) {
        // Remove ou mostra
        let area = parent.querySelector(`#wrapper_${c.id}`);
        if (Array.isArray(valor) ? valor.includes(c.condicional.valor) : valor === c.condicional.valor) {
          if(!area) renderCampo(parent, c, config, respostas);
        } else if (area) {
          area.remove();
        }
      }
    });
  });
}

// Validação mínima antes do envio
function validarFormulario(container, config) {
  let ok = true;
  const campos = container.querySelectorAll('input, textarea, select');
  campos.forEach(c=>{
    if(c.required && (c.type ==='checkbox'
       ? !c.checked
       : !c.value)) {
      ok = false;
      c.classList.add('erro');
    } else {
      c.classList.remove('erro');
    }
  });
  return ok;
}

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", ()=>{
  const container = document.getElementById('formulario');
  renderFormulario(container, configForm);
});
