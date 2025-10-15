// Arquivo: formulario.js

// CONFIGURAÇÃO DO FORMULÁRIO (campos, categorias, condicionais, etc.)
const configForm = {
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
            { "id": "decisao", "label": "Melhorar a tomada de decisão" },
            { "id": "novas_oportunidades", "label": "Identificar novas oportunidades de mercado" },
            { "id": "acompanhar_kpis", "label": "Acompanhar performance de KPIs em tempo real" },
            { "id": "satisfacao_cliente", "label": "Melhorar a satisfação/ retenção dos clientes" },
            { "id": "dados_tempo_real", "label": "Ter dados atualizados em tempo real" },
            { "id": "outros", "label": "Outros objetivos (especificar abaixo)" }
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
        }
      ]
    }
  ]
};

// FUNÇÃO DE RENDERIZAÇÃO
function renderForm(config) {
  const container = document.getElementById('formulario');
  container.innerHTML = '';

  config.categorias.forEach((categoria) => {
    // Cria a seção da categoria
    const section = document.createElement('section');
    section.className = 'section';

    const h3 = document.createElement('h3');
    h3.textContent = categoria.titulo;
    section.appendChild(h3);

    if (categoria.descricao) {
      const subtitulo = document.createElement('div');
      subtitulo.className = 'subtitulo';
      subtitulo.textContent = categoria.descricao;
      section.appendChild(subtitulo);
    }

    // Renderiza campos da categoria
    categoria.campos.forEach((campo) => {
      renderField(section, campo, config);
    });

    container.appendChild(section);
  });

  // Cria botão de envio
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Enviar';

  // (adicione a lógica de validação conforme necessidade)
  submitBtn.onclick = () => {
    if (validateForm(config)) {
      alert('Formulário enviado com sucesso.');
    }
  };

  container.appendChild(submitBtn);
}

// FUNÇÃO PARA RENDERIZAR UM CAMPO INDIVIDUAL
function renderField(section, campo, config) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-group';

  // LABEL
  if (campo.label) {
    const label = document.createElement('label');
    label.setAttribute('for', campo.id);
    label.textContent = campo.label + (campo.obrigatorio ? ' *' : '');
    wrapper.appendChild(label);
  }

  // TIPS
  if (campo.dica) {
    const dica = document.createElement('div');
    dica.className = 'dica';
    dica.textContent = campo.dica;
    wrapper.appendChild(dica);
  }

  // TIPO DO CAMPO
  let input;
  switch (campo.tipo) {
    case 'text':
      input = document.createElement('input');
      input.type = 'text';
      break;
    case 'textarea':
      input = document.createElement('textarea');
      break;
    case 'select':
      input = document.createElement('select');
      input.appendChild(new Option('-- selecione --', ''));
      campo.opcoes.forEach(opt => {
        const option = new Option(opt.label, opt.id);
        input.appendChild(option);
      });
      break;
    case 'checkbox':
      input = document.createElement('div');
      input.className = 'checkbox-grid';
      campo.opcoes.forEach(opt => {
        const chkWrapper = document.createElement('div');
        chkWrapper.className = 'checkbox-item';

        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.id = campo.id + '_' + opt.id;
        chk.name = campo.id;
        chk.value = opt.id;

        const lbl = document.createElement('label');
        lbl.htmlFor = chk.id;
        lbl.textContent = opt.label;
        lbl.className = 'checkbox-label';

        chkWrapper.appendChild(chk);
        chkWrapper.appendChild(lbl);
        input.appendChild(chkWrapper);
      });
      break;
    case 'radio':
      input = document.createElement('div');
      campo.opcoes.forEach(opt => {
        const radioWrapper = document.createElement('div');
        radioWrapper.className = 'radio-item';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = campo.id;
        radio.value = opt.id;
        radio.id = campo.id + '_' + opt.id;

        const lbl = document.createElement('label');
        lbl.htmlFor = radio.id;
        lbl.textContent = opt.label;

        radioWrapper.appendChild(radio);
        radioWrapper.appendChild(lbl);
        input.appendChild(radioWrapper);
      });
      break;
    default:
      input = document.createElement('input');
      input.type = 'text';
  }
  if (['text', 'textarea', 'select'].includes(campo.tipo)) {
    input.id = campo.id;
    input.name = campo.id;
    if (campo.obrigatorio) input.required = true;
  }

  wrapper.appendChild(input);

  // CAMPO CONDICIONAL
  if (campo.campo_condicional || campo.condicional) {
    wrapper.dataset.cond = JSON.stringify(campo.campo_condicional || campo.condicional);
  }

  section.appendChild(wrapper);
}

// VALIDAÇÃO SIMPLES (pode expandir para validação de condicionais, exibição de mensagens de erro, etc)
function validateForm(config) {
  let valid = true;
  config.categorias.forEach(cat => {
    cat.campos.forEach(campo => {
      const el = document.getElementById(campo.id);
      if (campo.obrigatorio && el && !el.value) {
        valid = false;
        el.classList.add('erro');
      }
    });
  });
  return valid;
}

// AO CARREGAR
document.addEventListener('DOMContentLoaded', function () {
  renderForm(configForm);
});
