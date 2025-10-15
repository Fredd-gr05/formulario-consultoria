// Importar a configuração diretamente (coloque em um arquivo separado se necessário)
const configForm = 
  {
    "categorias": [
      {
        "id": "perfil_empresa",
        "titulo": "Perfil da Empresa",
        "descricao": "Conte um pouco sobre a empresa para contextualizarmos a consultoria.",
        "campos": [
          {
            "id": "nome_empresa",
            "label": "Nome da empresa",
            "tipo": "text",
            "obrigatorio": true,
            "dica": "Nome pelo qual a empresa é conhecida no mercado."
          },
          {
            "id": "segmento",
            "label": "Segmento",
            "tipo": "select",
            "opcoes": [
              { "id": "industria",   "label": "Indústria" },
              { "id": "varejo",      "label": "Varejo" },
              { "id": "distribuicao","label": "Distribuição" },
              { "id": "servicos",    "label": "Serviços" },
              { "id": "outros",      "label": "Outros" }
            ],
            "obrigatorio": true,
            "dica": "Escolha o segmento que melhor representa sua empresa.",
            "campo_condicional": {
              "campo": "segmento",
              "valor": "outros",
              "mostrar": true,
              "campo_complementar": {
                "id": "segmento_outros_desc",
                "label": "Descreva o segmento",
                "tipo": "text",
                "obrigatorio": true
              }
            }
          },
          {
            "id": "porte_empresa",
            "label": "Porte da empresa",
            "tipo": "select",
            "opcoes": [
              { "id": "micro",   "label": "Microempresa (até 9 colaboradores)" },
              { "id": "pequeno", "label": "Pequeno porte (10 a 49)" },
              { "id": "medio",   "label": "Médio porte (50 a 249)" },
              { "id": "grande",  "label": "Grande porte (250+)" }
            ],
            "obrigatorio": true
          },
          {
            "id": "localizacao_cidade",
            "label": "Cidade",
            "tipo": "text",
            "obrigatorio": true
          },
          {
            "id": "localizacao_estado",
            "label": "Estado",
            "tipo": "select",
            "opcoes": [
              { "id":"AC", "label":"AC" }, { "id":"AL","label":"AL" }, { "id":"AP","label":"AP" },
              { "id":"AM","label":"AM" }, { "id":"BA","label":"BA" }, { "id":"CE","label":"CE" },
              { "id":"DF","label":"DF" }, { "id":"ES","label":"ES" }, { "id":"GO","label":"GO" },
              { "id":"MA","label":"MA" }, { "id":"MT","label":"MT" }, { "id":"MS","label":"MS" },
              { "id":"MG","label":"MG" }, { "id":"PA","label":"PA" }, { "id":"PB","label":"PB" },
              { "id":"PR","label":"PR" }, { "id":"PE","label":"PE" }, { "id":"PI","label":"PI" },
              { "id":"RJ","label":"RJ" }, { "id":"RN","label":"RN" }, { "id":"RS","label":"RS" },
              { "id":"RO","label":"RO" }, { "id":"RR","label":"RR" }, { "id":"SC","label":"SC" },
              { "id":"SP","label":"SP" }, { "id":"SE","label":"SE" }, { "id":"TO","label":"TO" }
            ],
            "obrigatorio": true
          },
          {
            "id": "linha_atuacao",
            "label": "Linha principal de atuação",
            "tipo": "text",
            "obrigatorio": false,
            "dica": "Ramo, produto ou serviço mais relevante para a empresa."
          }
        ]
      },
  
      {
        "id": "situacao_atual",
        "titulo": "Situação Atual – Análise Inteligente",
        "descricao": "Entenda o contexto atual e o uso de dados/tecnologia na empresa.",
        "campos": [
          {
            "id": "usa_bi",
            "label": "Já utiliza Business Intelligence?",
            "tipo": "radio",
            "opcoes": [
              { "id": "sim", "label": "Sim" },
              { "id": "nao", "label": "Não" }
            ],
            "obrigatorio": true
          },
          {
            "id": "tecnologias_bi",
            "label": "Quais tecnologias de BI são utilizadas?",
            "tipo": "checkbox",
            "opcoes": [
              { "id": "power_bi", "label": "Power BI" },
              { "id": "tableau", "label": "Tableau" },
              { "id": "qlik", "label": "Qlik" },
              { "id": "excel", "label": "Excel" },
              { "id": "google_data_studio", "label": "Google Data Studio" },
              { "id": "outros", "label": "Outros" }
            ],
            "obrigatorio": false
          },
          {
            "id": "tecnologias_bi_outros",
            "label": "Se outros, quais?",
            "tipo": "text",
            "obrigatorio": true,
            "condicional": { "campo": "tecnologias_bi", "valor": "outros" }
          },
          {
            "id": "objetivos_bi_lista",
            "label": "Principais objetivos com BI",
            "tipo": "checkbox",
            "opcoes": [
              { "id": "decisao", "label": "🧠 Melhorar a tomada de decisão" },
              { "id": "novas_oportunidades", "label": "🔍 Identificar novas oportunidades de mercado" },
              { "id": "acompanhar_kpis", "label": "📊 Acompanhar performance de KPIs em tempo real" },
              { "id": "satisfacao_cliente", "label": "❤️ Melhorar a satisfação/ retenção dos clientes" },
              { "id": "dados_tempo_real", "label": "⏱️ Ter dados atualizados em tempo real" },
              { "id": "outros", "label": "✍️ Outros objetivos (especificar abaixo)" }
            ],
            "obrigatorio": true,
            "mensagem_validacao": "Escolha ao menos um objetivo."
          },
          {
            "id": "objetivos_bi_outros",
            "label": "Detalhe outros objetivos",
            "tipo": "textarea",
            "obrigatorio": true,
            "condicional": { "campo": "objetivos_bi_lista", "valor": "outros" }
          }
        ]
      },
  
      {
        "id": "expectativas_passos",
        "titulo": "Expectativas e Próximos Passos",
        "descricao": "Para entender melhor suas necessidades e planejar os próximos passos:",
        "campos": [
          {
            "id": "frequencia_relatorios",
            "label": "Com que frequência você precisa de relatórios?",
            "tipo": "select",
            "opcoes": [
              { "id": "diario", "label": "Diariamente" },
              { "id": "semanal", "label": "Semanalmente" },
              { "id": "quinzenal", "label": "Quinzenalmente" },
              { "id": "mensal", "label": "Mensalmente" },
              { "id": "trimestral", "label": "Trimestralmente" },
              { "id": "anual", "label": "Anualmente" },
              { "id": "sob_demanda", "label": "Sob demanda" }
            ],
            "obrigatorio": true
          },
          {
            "id": "prazo_implementacao",
            "label": "Qual o prazo ideal para iniciar a implementação?",
            "tipo": "select",
            "opcoes": [
              { "id": "imediato", "label": "Imediato (1-3 meses)" },
              { "id": "curto_prazo", "label": "Curto Prazo (3-6 meses)" },
              { "id": "medio_prazo", "label": "Médio Prazo (6-12 meses)" },
              { "id": "longo_prazo", "label": "Longo Prazo (mais de 12 meses)" },
              { "id": "sem_prazo", "label": "Ainda não definido" }
            ],
            "obrigatorio": true
          },
          {
            "id": "decisor_principal",
            "label": "Quem é o principal decisor para esta solução?",
            "tipo": "select",
            "opcoes": [
              { "id": "diretor_ceo", "label": "Diretor/CEO" },
              { "id": "gerente", "label": "Gerente (de área específica)" },
              { "id": "proprietario", "label": "Proprietário/Sócio" },
              { "id": "equipe_ti", "label": "Equipe de TI" },
              { "id": "consultor_externo", "label": "Consultor Externo" },
              { "id": "outros", "label": "Outros" }
            ],
            "obrigatorio": true,
            "dica": "Ajuda a planejar a comunicação e priorizar próximos passos."
          },
          {
            "id": "motivacoes_segmento",
            "label": "Motivações para implementar BI",
            "tipo": "checkbox",
            "opcoes_dinamicas": {
              "industria": [
                { "id": "mot_ind_otimizar_producao", "label": "⚙️ Otimizar a produção e reduzir desperdícios." },
                { "id": "mot_ind_controle_qualidade", "label": "✅ Melhorar o controle de qualidade." },
                { "id": "mot_ind_prever_demanda_mp", "label": "📦 Prever demandas de matéria-prima." },
                { "id": "mot_ind_monitorar_oee", "label": "📊 Monitorar a eficiência de equipamentos (OEE)." },
                { "id": "mot_ind_reduzir_custos_op", "label": "💰 Reduzir custos operacionais na fábrica." },
                { "id": "mot_ind_cadeia_suprimentos", "label": "🔗 Gerenciar melhor a cadeia de suprimentos." },
                { "id": "mot_ind_decisoes_producao", "label": "🧠 Tomar decisões mais rápidas sobre linhas de produção." },
                { "id": "mot_ind_identificar_gargalos", "label": "🚧 Identificar gargalos na manufatura." },
                { "id": "mot_ind_performance_entregas", "label": "🚚 Acompanhar a performance de entregas." },
                { "id": "mot_ind_rentabilidade_produto", "label": "📈 Aumentar a rentabilidade por produto." },
                { "id": "mot_outros", "label": "✍️ Outras motivações (especificar abaixo)" }
              ],
              "varejo": [
                { "id": "mot_var_comportamento_cliente", "label": "❤️ Entender o comportamento de compra do cliente." },
                { "id": "mot_var_otimizar_mix", "label": "🛍️ Otimizar o mix de produtos por loja." },
                { "id": "mot_var_gerenciar_estoque", "label": "📉 Gerenciar o estoque para evitar rupturas/excesso." },
                { "id": "mot_var_analisar_vendas", "label": "📈 Analisar a performance de vendas por canal/produto." },
                { "id": "mot_var_personalizar_ofertas", "label": "🎁 Personalizar ofertas e promoções." },
                { "id": "mot_var_melhorar_experiencia", "label": "😊 Melhorar a experiência do cliente." },
                { "id": "mot_var_reduzir_perdas", "label": "💸 Reduzir perdas e furtos." },
                { "id": "mot_var_prever_tendencias", "label": "🔮 Prever tendências de mercado." },
                { "id": "mot_var_otimizar_precificacao", "label": "🏷️ Otimizar a precificação." },
                { "id": "mot_var_aumentar_fidelidade", "label": "🌟 Aumentar a fidelidade do cliente." },
                { "id": "mot_outros", "label": "✍️ Outras motivações (especificar abaixo)" }
              ],
              "distribuicao": [
                { "id": "mot_dis_otimizar_rotas", "label": "🚚 Otimizar rotas de entrega e logística." },
                { "id": "mot_dis_gestao_estoque_armazem", "label": "📦 Melhorar a gestão de estoque e armazém." },
                { "id": "mot_dis_reduzir_custos_frete", "label": "💰 Reduzir custos de frete e transporte." },
                { "id": "mot_dis_monitorar_fornecedores", "label": "🤝 Monitorar a performance de fornecedores." },
                { "id": "mot_dis_prever_demandas", "label": "📊 Prever demandas de produtos para distribuição." },
                { "id": "mot_dis_eficiencia_vendas", "label": "📈 Acompanhar a eficiência da equipe de vendas." },
                { "id": "mot_dis_reduzir_ciclo_pedido", "label": "⏱️ Reduzir o tempo de ciclo do pedido." },
                { "id": "mot_dis_identificar_giro", "label": "🔄 Identificar produtos com maior giro." },
                { "id": "mot_dis_satisfacao_cliente", "label": "😊 Melhorar a satisfação do cliente com entregas." },
                { "id": "mot_dis_expandir_estrategicamente", "label": "🗺️ Expandir para novas regiões de forma estratégica." },
                { "id": "mot_outros", "label": "✍️ Outras motivações (especificar abaixo)" }
              ],
              "servicos": [
                { "id": "mot_ser_otimizar_alocacao", "label": "👨‍💼 Otimizar a alocação de recursos e equipes." },
                { "id": "mot_ser_rentabilidade_projeto", "label": "💰 Monitorar a rentabilidade por projeto/cliente." },
                { "id": "mot_ser_satisfacao_retencao", "label": "❤️ Melhorar a satisfação e retenção de clientes." },
                { "id": "mot_ser_servicos_lucrativos", "label": "📈 Identificar serviços mais lucrativos." },
                { "id": "mot_ser_produtividade_equipe", "label": "⏱️ Gerenciar o tempo e produtividade da equipe." },
                { "id": "mot_ser_prever_demanda", "label": "📊 Prever a demanda por serviços." },
                { "id": "mot_ser_reduzir_custos", "label": "💸 Reduzir custos operacionais." },
                { "id": "mot_ser_ciclo_cliente", "label": "🔄 Acompanhar o ciclo de vida do cliente." },
                { "id": "mot_ser_precificacao", "label": "💲 Melhorar a precificação de serviços." },
                { "id": "mot_ser_expandir_oferta", "label": "🚀 Expandir a oferta de serviços." },
                { "id": "mot_outros", "label": "✍️ Outras motivações (especificar abaixo)" }
              ],
              "default": [
                { "id": "mot_geral_visao_360", "label": "🌐 Ter uma visão 360º do negócio." },
                { "id": "mot_geral_decisoes_dados", "label": "🧠 Tomar decisões baseadas em dados." },
                { "id": "mot_geral_oportunidades", "label": "🔍 Identificar oportunidades de crescimento." },
                { "id": "mot_geral_otimizar_processos", "label": "⚙️ Otimizar processos internos." },
                { "id": "mot_geral_reduzir_custos", "label": "💰 Reduzir custos operacionais." },
                { "id": "mot_geral_eficiencia_equipe", "label": "👨‍👩‍👧‍👦 Aumentar a eficiência da equipe." },
                { "id": "mot_geral_gestao_financeira", "label": "💸 Melhorar a gestão financeira." },
                { "id": "mot_geral_acompanhar_kpis", "label": "📊 Acompanhar KPIs e métricas importantes." },
                { "id": "mot_geral_automatizar_relatorios", "label": "⏰ Automatizar a geração de relatórios." },
                { "id": "mot_outros", "label": "✍️ Outras motivações (especificar abaixo)" }
              ]
            },
            "obrigatorio": true,
            "mensagem_validacao": "Escolha pelo menos uma motivação."
          },
          {
            "id": "motivacoes_outros_detalhe",
            "label": "Detalhe outras motivações",
            "tipo": "textarea",
            "obrigatorio": true,
            "condicional": { "campo": "motivacoes_segmento", "valor": "mot_outros" }
          }
        ]
      }
    ]
  }
  /* Cole aqui o objeto JS do seu arquivo base_formulario_consultoria.json, sem a nota 'PDF:' na frente! */;

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
