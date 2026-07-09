const devices = [
  {
    id: "mmoptics-laser-duo",
    brand: "MMOptics",
    model: "Laser Duo",
    type: "low",
    wavelengths: [660, 808],
    maxPowerW: 0.1,
    modes: ["continuo"],
    spotCm2: 0.04,
    contact: "Contato ou leve afastamento",
    accessories: "Ponteira periodontal, clareamento, analgesia, fibra optica",
    applications: "Fotobiomodulacao, analgesia, reparo tecidual, mucosite, parestesia",
    limitations: "Nao indicado para corte, vaporizacao ou hemostasia cirurgica."
  },
  {
    id: "dmc-therapy-ec",
    brand: "DMC",
    model: "Therapy EC",
    type: "low",
    wavelengths: [660, 808],
    maxPowerW: 0.1,
    modes: ["continuo"],
    spotCm2: 0.028,
    contact: "Contato",
    accessories: "Ponteiras intraorais e extraorais",
    applications: "Lesoes de mucosa, DTM, dor pos-operatoria, edema",
    limitations: "Requer calculo cuidadoso de area para fluencias altas."
  },
  {
    id: "thor-lx2",
    brand: "THOR Photomedicine",
    model: "LX2 Dental",
    type: "low",
    wavelengths: [660, 810, 850],
    maxPowerW: 0.2,
    modes: ["continuo", "pulsado"],
    spotCm2: 0.07,
    contact: "Contato e nao contato",
    accessories: "Clusters LED/laser, sondas intraorais",
    applications: "Mucosite oral, analgesia, reparo, controle inflamatorio",
    limitations: "Protocolos devem respeitar tamanho da sonda e divergencia do feixe."
  },
  {
    id: "biolase-epic-x",
    brand: "Biolase",
    model: "Epic X",
    type: "high",
    wavelengths: [940],
    maxPowerW: 10,
    modes: ["continuo", "pulsado"],
    spotCm2: 0.002,
    contact: "Contato com fibra iniciada",
    accessories: "Fibras cirurgicas, ponteiras de clareamento e dor",
    applications: "Incisao, excisao, descontaminacao, hemostasia, analgesia em baixa energia",
    limitations: "Risco termico; usar aspiracao, movimento continuo e parametros cirurgicos validados."
  },
  {
    id: "fotona-lightwalker",
    brand: "Fotona",
    model: "LightWalker",
    type: "high",
    wavelengths: [1064, 2940],
    maxPowerW: 20,
    modes: ["pulsado", "superpulsado"],
    spotCm2: 0.01,
    contact: "Nao contato e contato conforme ponteira",
    accessories: "Ponteiras Er:YAG, Nd:YAG, scanner, fibra",
    applications: "Cirurgia, descontaminacao periodontal, peri-implantite, bioestimulo",
    limitations: "Exige treinamento especifico, controle de agua/ar e protecao ocular dupla por comprimento de onda."
  },
  {
    id: "waterlase-iplus",
    brand: "Biolase",
    model: "Waterlase iPlus",
    type: "high",
    wavelengths: [2780],
    maxPowerW: 10,
    modes: ["pulsado"],
    spotCm2: 0.008,
    contact: "Nao contato ou proximidade",
    accessories: "Pontas para tecido duro e mole, spray agua/ar",
    applications: "Cirurgia, preparo cavitario, tecido mole, descontaminacao",
    limitations: "Ajustar agua/ar e evitar carbonizacao ou dano termico."
  }
];

const protocols = [
  {
    id: "mucosite-oral",
    name: "Mucosite oral",
    category: "mucosa",
    keywords: ["oncologia", "quimioterapia", "radioterapia", "ulcera", "dor"],
    summary: "Inflamacao ulcerativa da mucosa associada a tratamento oncologico, com dor, disfagia e risco infeccioso.",
    manifestations: "Eritema, ulceracao, pseudomembrana, dor intensa, limitacao alimentar.",
    goals: ["Analgesia", "Reparo tecidual", "Reducao da inflamacao"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 2,
    fluenceJcm2: 6,
    irradianceWcm2: 2.5,
    points: "Aplicar em grade sobre mucosa de risco ou ao redor das ulceras, evitando sobreposicao excessiva.",
    area: "Conforme extensao da mucosa acometida",
    mode: "Continuo",
    frequency: "Diaria ou 3 a 5 vezes por semana conforme fase e risco",
    sessions: "Preventivo durante terapia oncologica; terapeutico ate regressao clinica",
    safety: "Oculos especificos para 660/808 nm, controle de infeccao, evitar irradiacao direta em tecido tumoral ativo salvo protocolo oncológico validado.",
    contraindications: "Neoplasia ativa no campo sem autorizacao da equipe oncologica, fotossensibilizantes sem avaliacao, falta de diagnostico.",
    adverse: "Raro desconforto local; suspender diante de piora inesperada, sangramento importante ou infeccao nao controlada.",
    evidence: "Alta para prevencao em contextos oncologicos selecionados; moderada para tratamento sintomatico.",
    refs: [
      "Zadik Y et al. Supportive Care in Cancer. 2020. DOI: 10.1007/s00520-019-04890-2",
      "Oberoi S et al. Annals of Oncology. 2014. DOI: 10.1093/annonc/mdt443",
      "MASCC/ISOO clinical practice guidelines for mucositis care"
    ]
  },
  {
    id: "afta-recorrente",
    name: "Afta recorrente",
    category: "mucosa",
    keywords: ["ulcera aftosa", "dor", "mucosa"],
    summary: "Ulcera imunoinflamatoria recorrente, dolorosa, geralmente autolimitada.",
    manifestations: "Ulcera rasa, halo eritematoso, dor a alimentacao e fala.",
    goals: ["Analgesia", "Reparo tecidual"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 2,
    fluenceJcm2: 4,
    irradianceWcm2: 2.5,
    points: "Perilesional e leito ulcerado sem contato traumatico.",
    area: "Lesao e margem de 2 a 3 mm",
    mode: "Continuo",
    frequency: "1 sessao inicial; repetir em 24-48 h se dor persistir",
    sessions: "1 a 3 sessoes",
    safety: "Oculos, ponteira protegida, baixa pressao sobre tecido ulcerado.",
    contraindications: "Ulcera persistente sem diagnostico, suspeita de malignidade, infeccao sistemica sem avaliacao.",
    adverse: "Irritacao por contato; reavaliar lesoes que nao cicatrizam.",
    evidence: "Moderada para analgesia e reducao de tempo de cicatrizacao.",
    refs: [
      "Kalhori KAM et al. Photobiomodulation, Photomedicine and Laser Surgery. 2019. DOI: 10.1089/photob.2019.4706",
      "Ensaios clinicos de PBM em ulceras aftosas"
    ]
  },
  {
    id: "herpes-simples",
    name: "Herpes simples labial/oral",
    category: "mucosa",
    keywords: ["vesicula", "HSV", "labio", "recorrente"],
    summary: "Reativacao viral com vesiculas, ulceras e crostas, mais responsiva nas fases iniciais.",
    manifestations: "Prodromo, ardor, vesiculas agrupadas, ulceracao e crosta.",
    goals: ["Analgesia", "Reparo tecidual", "Reducao de recorrencia"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 1,
    fluenceJcm2: 3,
    irradianceWcm2: 2.5,
    points: "Sobre area prodrômica ou periferia da lesao; evitar romper vesiculas.",
    area: "Lesao ativa e margem",
    mode: "Continuo",
    frequency: "Diaria no inicio; repetir conforme sintomas",
    sessions: "2 a 4 sessoes",
    safety: "Controle de biosseguranca rigoroso; desinfetar ponteiras; considerar antiviral quando indicado.",
    contraindications: "Disseminacao, imunossupressao grave sem avaliacao medica, lesao atipica.",
    adverse: "Contaminacao cruzada se biosseguranca inadequada.",
    evidence: "Moderada para dor/cicatrizacao; variavel para prevencao de recorrencias.",
    refs: [
      "Kalhori KAM et al. Photobiomodulation, Photomedicine and Laser Surgery. 2019. DOI: 10.1089/photob.2019.4706",
      "Diretrizes de manejo de HSV oral"
    ]
  },
  {
    id: "parestesia",
    name: "Parestesia trigeminal",
    category: "dor",
    keywords: ["nervo", "sensibilidade", "alveolar inferior", "lingual"],
    summary: "Alteracao sensitiva apos trauma, cirurgia, endodontia ou compressao neural.",
    manifestations: "Dormencia, formigamento, dor neuropatica, disestesia.",
    goals: ["Biomodulacao neural", "Analgesia", "Reparo neural"],
    laserType: "low",
    wavelengths: [808, 850],
    powerW: 0.1,
    energyJ: 4,
    fluenceJcm2: 8,
    irradianceWcm2: 2.5,
    points: "Trajeto neural intra e extraoral, forames, area de parestesia e pontos dolorosos.",
    area: "Mapa sensitivo documentado",
    mode: "Continuo ou pulsado",
    frequency: "2 a 3 vezes por semana",
    sessions: "10 a 20 sessoes com reavaliacao seriada",
    safety: "Registrar teste sensitivo, etiologia e tempo de lesao; encaminhar quando houver dano iatrogenico importante.",
    contraindications: "Compressao ativa nao tratada, infeccao, fratura ou corpo estranho sem abordagem causal.",
    adverse: "Atraso de tratamento causal se usado isoladamente.",
    evidence: "Baixa a moderada; melhor como adjuvante precoce.",
    refs: ["Revisoes sobre PBM em reparo neural periferico", "Relatos e ensaios clinicos odontologicos"]
  },
  {
    id: "peri-implantite",
    name: "Peri-implantite",
    category: "periodonto",
    keywords: ["implante", "biofilme", "bolsa", "descontaminacao"],
    summary: "Inflamacao peri-implantar com perda ossea progressiva associada ao biofilme.",
    manifestations: "Sangramento, supuracao, profundidade aumentada, perda ossea radiografica.",
    goals: ["Descontaminacao", "Reducao da inflamacao", "Reparo tecidual"],
    laserType: "high",
    wavelengths: [940, 1064, 2780, 2940],
    powerW: 1,
    energyJ: 0,
    fluenceJcm2: 0,
    irradianceWcm2: 0,
    points: "Irradiacao controlada no sulco/bolsa com fibra ou ponteira indicada; sempre associar debridamento mecanico.",
    area: "Superficie peri-implantar acometida",
    mode: "Pulsado conforme equipamento",
    frequency: "Durante terapia periodontal/peri-implantar; reavaliar em 4 a 8 semanas",
    sessions: "1 a 4 sessoes adjuvantes",
    safety: "Evitar superaquecimento do implante; movimento continuo, baixa energia, irrigacao quando aplicavel.",
    contraindications: "Mobilidade implantar, defeito avancado sem plano cirurgico, ausencia de controle de biofilme.",
    adverse: "Dano termico a osso/implante e tecidos se parametros inadequados.",
    evidence: "Moderada como adjuvante; protocolos heterogeneos.",
    refs: ["Revisoes sistematicas sobre laser em peri-implantite", "Diretrizes periodontais para tratamento peri-implantar"]
  },
  {
    id: "hipersensibilidade",
    name: "Hipersensibilidade dentinaria",
    category: "periodonto",
    keywords: ["dentina", "dor", "frio", "raiz exposta"],
    summary: "Dor curta e aguda por estimulo em dentina exposta, sem outra patologia explicativa.",
    manifestations: "Dor ao frio, toque, evaporacao ou osmose.",
    goals: ["Analgesia", "Obliteracao tubular adjuvante"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 2,
    fluenceJcm2: 4,
    irradianceWcm2: 2.5,
    points: "Regiao cervical sensivel e apice correspondente; associar controle etiologico.",
    area: "Superficie cervical",
    mode: "Continuo",
    frequency: "Semanal",
    sessions: "2 a 4 sessoes",
    safety: "Diagnosticar carie, trinca, pulpite ou restauracao defeituosa antes.",
    contraindications: "Dor espontanea, pulpite, lesao cariosa ativa sem tratamento.",
    adverse: "Mascaramento de dor pulpar se diagnostico incorreto.",
    evidence: "Moderada como tratamento adjuvante.",
    refs: ["Ensaios clinicos sobre laser em hipersensibilidade dentinaria"]
  },
  {
    id: "pos-operatorio",
    name: "Dor, edema e trismo pos-operatorio",
    category: "cirurgia",
    keywords: ["terceiro molar", "cirurgia", "edema", "trismo"],
    summary: "Resposta inflamatoria apos procedimentos cirurgicos odontologicos.",
    manifestations: "Dor, edema, limitacao de abertura, desconforto funcional.",
    goals: ["Analgesia", "Controle de edema", "Reparo tecidual"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 4,
    fluenceJcm2: 8,
    irradianceWcm2: 2.5,
    points: "Intraoral ao redor da ferida e extraoral sobre trajetos linfaticos/masseter conforme queixa.",
    area: "Campo cirurgico e musculatura relacionada",
    mode: "Continuo",
    frequency: "Imediato pos-operatorio e 24-72 h",
    sessions: "1 a 3 sessoes",
    safety: "Nao substituir analgesia, anti-inflamatorio ou antibiotico quando indicados.",
    contraindications: "Sangramento nao controlado, infeccao progressiva, complicacao cirurgica sem reavaliacao.",
    adverse: "Baixo risco; investigar piora progressiva.",
    evidence: "Moderada; resultados dependem de dose, tempo e procedimento.",
    refs: ["Revisoes sistematicas em PBM apos extracao de terceiros molares"]
  },
  {
    id: "dtm-miofascial",
    name: "Dor miofascial e DTM",
    category: "dtm",
    keywords: ["ATM", "masseter", "temporal", "musculo", "dor"],
    summary: "Dor musculoesqueletica mastigatoria, com pontos gatilho e limitacao funcional variavel.",
    manifestations: "Dor em masseter/temporal, cefaleia, fadiga muscular, abertura limitada.",
    goals: ["Analgesia", "Relaxamento muscular", "Reducao inflamatoria"],
    laserType: "low",
    wavelengths: [808, 850],
    powerW: 0.1,
    energyJ: 4,
    fluenceJcm2: 8,
    irradianceWcm2: 1.5,
    points: "Pontos gatilho em masseter, temporal, pterigoideo acessivel e regiao da ATM.",
    area: "Pontos dolorosos palpaveis",
    mode: "Continuo ou pulsado",
    frequency: "1 a 2 vezes por semana",
    sessions: "4 a 8 sessoes associadas a autocuidado e terapia oclusal quando indicada",
    safety: "Avaliar sinais articulares, neurologicos e dor referida nao odontogenica.",
    contraindications: "Tumor, infeccao, fratura, dor neurologica sem diagnostico.",
    adverse: "Alivio incompleto se fatores perpetuantes nao forem tratados.",
    evidence: "Baixa a moderada; melhor como parte de plano multimodal.",
    refs: ["Revisoes sistematicas sobre PBM em DTM dolorosa"]
  },
  {
    id: "liquen-plano-oral",
    name: "Liquen plano oral atrofico/erosivo",
    category: "mucosa",
    keywords: ["liquen", "erosivo", "autoimune", "mucosa", "dor"],
    summary: "Doenca inflamatoria cronica imunomediada da mucosa oral, com formas reticulares, atroficas e erosivas.",
    manifestations: "Estrias brancas, eritema, erosoes dolorosas, ardor e exacerbacao por trauma local.",
    goals: ["Reducao da inflamacao", "Analgesia", "Reparo tecidual"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 2,
    fluenceJcm2: 4,
    irradianceWcm2: 2.5,
    points: "Aplicacao pontual sobre areas sintomaticas e margens erosivas, sem substituir biopsia quando indicada.",
    area: "Placas ou erosoes sintomaticas",
    mode: "Continuo",
    frequency: "2 a 3 sessoes por semana",
    sessions: "4 a 8 semanas, com reavaliacao clinica",
    safety: "Confirmar diagnostico, controlar fatores irritativos e acompanhar risco de transformacao maligna.",
    contraindications: "Lesao suspeita sem diagnostico histopatologico, displasia nao acompanhada, infeccao secundaria nao tratada.",
    adverse: "Atraso diagnostico se usado antes de investigar lesoes atipicas.",
    evidence: "Moderada como terapia adjuvante para dor e inflamacao.",
    refs: [
      "Al-Maweri SA et al. Lasers in Medical Science. 2017. DOI: 10.1007/s10103-017-2233-7",
      "Ruiz-Roca JA et al. Dentistry Journal. 2022. DOI: 10.3390/dj10120221",
      "Hanna R et al. Journal of Biophotonics. 2023. DOI: 10.1002/jbio.202300046"
    ]
  },
  {
    id: "lesoes-autoimunes-gengivais",
    name: "Lesoes gengivais autoimunes",
    category: "mucosa",
    keywords: ["penfigo", "penfigoide", "gengiva", "autoimune", "descamativa"],
    summary: "Manifestações orais de penfigo vulgar e penfigoide de membranas mucosas, frequentemente com gengivite descamativa.",
    manifestations: "Erosao, bolhas, sangramento, dor, gengiva descamativa e dificuldade de higiene.",
    goals: ["Analgesia", "Reducao da inflamacao", "Reparo tecidual"],
    laserType: "low",
    wavelengths: [660, 808],
    powerW: 0.1,
    energyJ: 3,
    fluenceJcm2: 6,
    irradianceWcm2: 2.5,
    points: "Aplicar em areas erosivas e margens gengivais sintomaticas como adjuvante ao tratamento medico/odontologico.",
    area: "Gengiva ou mucosa acometida",
    mode: "Continuo",
    frequency: "2 a 3 sessoes por semana",
    sessions: "Conforme controle da atividade da doenca",
    safety: "Exigir diagnostico e acompanhamento multiprofissional; evitar trauma mecanico da ponteira.",
    contraindications: "Doenca bolhosa sem diagnostico, infeccao secundaria nao tratada, imunossupressao descompensada.",
    adverse: "Pode mascarar atividade da doenca se nao houver acompanhamento especializado.",
    evidence: "Baixa a moderada como terapia adjuvante.",
    refs: ["de Carvalho MM et al. Clinical Oral Investigations. 2022. DOI: 10.1007/s00784-021-04362-0"]
  },
  {
    id: "leucoplasia-oral",
    name: "Leucoplasia oral",
    category: "mucosa",
    keywords: ["lesao potencialmente maligna", "placa branca", "displasia", "co2", "diodo"],
    summary: "Placa branca potencialmente maligna que exige diagnostico, estratificacao de risco e seguimento.",
    manifestations: "Placa branca nao removivel, homogenea ou nao homogenea, possivel displasia epitelial.",
    goals: ["Excisao cirurgica", "Vaporizacao tecidual", "Seguimento clinico"],
    laserType: "high",
    wavelengths: [940, 1064, 2780, 2940],
    powerW: 2,
    energyJ: 0,
    fluenceJcm2: 0,
    irradianceWcm2: 0,
    points: "Excisao ou vaporizacao com laser cirurgico apos confirmacao histopatologica e plano de margem.",
    area: "Lesao e margem clinica definida",
    mode: "Continuo ou pulsado conforme equipamento",
    frequency: "Procedimento unico com acompanhamento periodico",
    sessions: "Reintervencao conforme recidiva, displasia ou margem",
    safety: "Biopsia previa ou excisional, histopatologia obrigatoria quando indicado, protecao ocular e controle termico.",
    contraindications: "Vaporizar lesao suspeita sem material para histopatologia, lesao extensa sem planejamento oncoestomatologico.",
    adverse: "Perda de material diagnostico, cicatriz, recidiva e dano termico se parametros inadequados.",
    evidence: "Moderada para uso cirurgico; seguimento segue obrigatorio.",
    refs: ["Condor D et al. Applied Sciences. 2021. DOI: 10.3390/app11167744"]
  },
  {
    id: "lesoes-benignas-tecidos-moles",
    name: "Lesoes benignas de tecidos moles",
    category: "cirurgia",
    keywords: ["fibroma", "mucocele", "papiloma", "hiperplasia", "excisao"],
    summary: "Lesoes benignas como fibroma, mucocele, papiloma e hiperplasias podem ser excisadas com laser de alta potencia.",
    manifestations: "Nodulos, aumento de volume, trauma cronico, lesoes pediculadas ou sésseis.",
    goals: ["Excisao cirurgica", "Hemostasia", "Conforto pos-operatorio"],
    laserType: "high",
    wavelengths: [940, 1064, 2780, 2940],
    powerW: 2,
    energyJ: 0,
    fluenceJcm2: 0,
    irradianceWcm2: 0,
    points: "Incisao/excisao com fibra ou ponteira indicada, enviando a peca para histopatologia.",
    area: "Base da lesao e margem conforme diagnostico",
    mode: "Continuo ou pulsado",
    frequency: "Procedimento unico",
    sessions: "1 sessao e revisoes pos-operatorias",
    safety: "Evitar carbonizacao excessiva, preservar material para histopatologia, usar aspiracao e protecao ocular.",
    contraindications: "Lesao suspeita sem planejamento diagnostico, proximidade de estruturas nobres sem treinamento.",
    adverse: "Dano termico, artefato histologico marginal, cicatriz ou recidiva.",
    evidence: "Moderada para cirurgia oral menor.",
    refs: [
      "Costa DL et al. Oral and Maxillofacial Surgery Clinics of North America. 2021. DOI: 10.1016/j.coms.2020.08.006",
      "Condor D et al. Applied Sciences. 2021. DOI: 10.3390/app11167744"
    ]
  },
  {
    id: "lesoes-vasculares-orais",
    name: "Lesoes vasculares orais",
    category: "cirurgia",
    keywords: ["hemangioma", "malformacao venosa", "lago venoso", "fotocoagulacao", "vaporizacao"],
    summary: "Hemangiomas, malformacoes venosas e lagos venosos podem receber fotocoagulacao ou vaporizacao em casos selecionados.",
    manifestations: "Lesao azulada ou violacea, compressivel, superficial ou profunda, com risco de sangramento.",
    goals: ["Fotocoagulacao", "Vaporizacao tecidual", "Hemostasia"],
    laserType: "high",
    wavelengths: [940, 1064, 2940],
    powerW: 1.5,
    energyJ: 0,
    fluenceJcm2: 0,
    irradianceWcm2: 0,
    points: "Fotocoagulacao em lesoes superficiais e de baixo fluxo; Nd:YAG para maior profundidade; CO2/Er para vaporizacao superficial conforme caso.",
    area: "Extensao vascular delimitada e protegida",
    mode: "Pulsado ou continuo com movimentos controlados",
    frequency: "1 ou mais sessoes conforme resposta",
    sessions: "1 a 4 sessoes, com reavaliacao vascular",
    safety: "Avaliar fluxo, profundidade, diagnostico diferencial e risco de sangramento; considerar imagem e encaminhamento.",
    contraindications: "Lesao de alto fluxo sem avaliacao vascular, diagnostico incerto, area extensa sem suporte cirurgico.",
    adverse: "Sangramento, necrose, cicatriz, edema e dano termico.",
    evidence: "Moderada para lesoes selecionadas; depende de tipo vascular e laser.",
    refs: [
      "Nammour S et al. International Journal of Environmental Research and Public Health. 2020. DOI: 10.3390/ijerph17228665",
      "Monteiro LS et al. Revista Portuguesa de Estomatologia, Medicina Dentaria e Cirurgia Maxilofacial. 2013. DOI: 10.1016/j.rpemd.2013.07.001"
    ]
  },
  {
    id: "pdt-apdt-lesoes-orais",
    name: "Terapia fotodinamica PDT/aPDT",
    category: "mucosa",
    keywords: ["pdt", "apdt", "fotodinamica", "azul de metileno", "toluidina", "candidose", "peri-implantite"],
    summary: "Terapia fotodinamica associando luz vermelha e fotossensibilizador para descontaminacao e efeito localizado.",
    manifestations: "Indicada como adjuvante em infeccoes fungicas/bacterianas, feridas contaminadas, periodontite, peri-implantite e MRONJ.",
    goals: ["Descontaminacao", "Controle microbiologico", "Reducao da inflamacao"],
    laserType: "low",
    wavelengths: [660],
    powerW: 0.1,
    energyJ: 6,
    fluenceJcm2: 100,
    irradianceWcm2: 2.5,
    points: "Aplicar fotossensibilizador, aguardar 3 a 5 minutos de pre-irradiacao e irradiar pontos ou varredura conforme area.",
    area: "Area infectada, bolsa periodontal/peri-implantar ou leito de ferida",
    mode: "Continuo",
    frequency: "1 a 4 sessoes conforme condicao clinica",
    sessions: "1 a 4 sessoes",
    safety: "PDT depende obrigatoriamente de fotossensibilizador compativel; proteger tecidos adjacentes e remover excesso quando indicado.",
    contraindications: "Alergia ao fotossensibilizador, uso como substituto de debridamento ou tratamento causal, lesao potencialmente maligna sem diagnostico.",
    adverse: "Pigmentacao temporaria, irritacao local e resposta insuficiente sem descontaminacao mecanica.",
    evidence: "Mais consistente para descontaminacao microbiana; adjuvante em mucosa inflamatoria e potencialmente maligna.",
    refs: [
      "Akram Z et al. Photodiagnosis and Photodynamic Therapy. DOI: 10.1016/j.pdpdt.2017.06.005",
      "de Freitas LF, Hamblin MR. IEEE Journal of Selected Topics in Quantum Electronics. DOI: 10.1109/JSTQE.2016.2561201",
      "Asnaashari M et al. Journal of Lasers in Medical Sciences. 2023"
    ]
  }
];

const services = [
  {
    name: "Faculdade de Odontologia da UFAL (FOUFAL)",
    type: "SUS",
    category: "Universidade / Clínica Escola",
    specialties: "Estomatologia, cirurgia, pesquisa clínica e fotobiomodulação.",
    laser: true,
    address: "Cidade Universitária, Av. Lourival Melo Mota, s/n, Tabuleiro do Martins, Maceió-AL, CEP 57072-970",
    phone: "(82) 3214-1163",
    hours: "Atendimento conforme agenda da clínica escola",
    distance: 2.1
  },
  {
    name: "PAM Salgadinho - Serviço de Estomatologia",
    type: "SUS",
    category: "Referência SUS",
    specialties: "Referência estadual para diagnóstico de câncer de boca; encaminhamento para CACON; potencial uso de PBM.",
    laser: true,
    address: "Rua Cônego Machado, Farol, Maceió-AL",
    phone: "Atendimento mediante encaminhamento da APS",
    hours: "Consultar fluxo municipal",
    distance: 3.4
  },
  {
    name: "CESMAC Campus I",
    type: "Privado",
    category: "Clínica Escola",
    specialties: "Centro de Laser, Liga Acadêmica de Lasers e atendimento clínico.",
    laser: true,
    address: "Rua Cônego Machado, 984, Farol, Maceió-AL, CEP 57051-160",
    phone: "(82) 3215-5000",
    hours: "Atendimento conforme agenda da clínica escola",
    distance: 3.7
  },
  {
    name: "Universidade Federal da Paraíba (Campus I)",
    type: "SUS",
    category: "Universidade",
    specialties: "Clínica de Estomatologia, pesquisa e atendimento especializado.",
    laser: true,
    address: "Cidade Universitária, Castelo Branco, João Pessoa-PB, CEP 58051-900",
    phone: "Clínica de Estomatologia (Faculdade de Odontologia)",
    hours: "Consultar agenda institucional",
    distance: 4.6
  },
  {
    name: "Hospital Napoleão Laureano",
    type: "SUS",
    category: "CACON",
    specialties: "Odontologia hospitalar, mucosite oral e pacientes oncológicos.",
    laser: true,
    address: "Av. Capitão José Pessoa, 1140, Jaguaribe, João Pessoa-PB, CEP 58015-170",
    phone: "(83) 3015-6200",
    hours: "Consultar hospital",
    distance: 5.2
  },
  {
    name: "Brasil Sorridente - Centro de Especialidades Odontológicas",
    type: "SUS",
    category: "CEO",
    specialties: "Estomatologia e especialidades odontológicas.",
    laser: false,
    address: "Rua Alberto de Brito, 411, Jaguaribe, João Pessoa-PB",
    phone: "(83) 3218-9804",
    hours: "Consultar regulação municipal",
    distance: 5.6
  },
  {
    name: "CEO Mangabeira",
    type: "SUS",
    category: "CEO",
    specialties: "Especialidades odontológicas.",
    laser: false,
    address: "Rua Romário Cupertino de Morais, s/n, Mangabeira, João Pessoa-PB",
    phone: "(83) 3213-7625",
    hours: "Consultar regulação municipal",
    distance: 6.2
  },
  {
    name: "CEO Torre - Urgência 24 horas",
    type: "SUS",
    category: "CEO",
    specialties: "Atendimento odontológico especializado.",
    laser: false,
    address: "Av. Rui Barbosa, Torre, João Pessoa-PB",
    phone: "(83) 3213-7626",
    hours: "Urgência 24 horas",
    distance: 6.7
  },
  {
    name: "UNIFAL - Faculdade de Odontologia",
    type: "SUS",
    category: "Universidade",
    specialties: "Clínica de Estomatologia, cirurgia e laser.",
    laser: true,
    address: "Rua Gabriel Monteiro da Silva, 700, Centro, Alfenas-MG",
    phone: "Clínica de Estomatologia: (35) 3701-9416",
    hours: "Consultar agenda institucional",
    distance: 8.4
  },
  {
    name: "Hospital Universitário Alzira Velano",
    type: "SUS",
    category: "Hospital Universitário",
    specialties: "Atendimento hospitalar e apoio às especialidades odontológicas.",
    laser: false,
    address: "Rua Geraldo Freitas da Costa, 120, Jardim Aeroporto III, Alfenas-MG",
    phone: "(35) 3299-3500",
    hours: "Consultar hospital",
    distance: 8.9
  },
  {
    name: "Hospital das Clínicas Samuel Libânio",
    type: "SUS",
    category: "Hospital Universitário",
    specialties: "Hospital de referência regional.",
    laser: false,
    address: "Rua Comendador José Garcia, 777, Centro, Pouso Alegre-MG",
    phone: "(35) 3429-3200",
    hours: "Consultar hospital",
    distance: 9.6
  }
];

const learning = [
  { title: "Atlas clinico ilustrado", text: "Galeria curada para mucosite, aftas, herpes, liquen plano, candidose, peri-implantite e complicacoes cirurgicas." },
  { title: "Videos demonstrativos", text: "Aplicacao pontual, varredura, protecao ocular, preparo da fibra e fluxo de biosseguranca." },
  { title: "Casos comentados", text: "Raciocinio clinico com diagnostico, selecao de equipamento, parametros, evolucao e criterios de interrupcao." },
  { title: "FAQ", text: "Diferencas entre energia, fluencia, irradiancia, potencia media, modo pulsado e area do spot." },
  { title: "Modulo graduacao", text: "Fundamentos fisicos, interacao laser-tecido, dosimetria e seguranca." },
  { title: "Modulo pos-graduacao", text: "Protocolos avancados, laser cirurgico, terapia periodontal, oncologia e pesquisa clinica." }
];

let selectedProtocol = protocols[0];
let selectedDevice = devices[0];
let selectedService = services[0];
let patients = loadStored("laserOralAidPatients", [
  {
    id: "sample-joao-pessoa",
    username: "paciente",
    password: "1234",
    name: "Paciente exemplo",
    age: "46",
    sex: "Feminino",
    city: "Joao Pessoa",
    address: "Bairro Centro",
    therapyPlace: "Hospital Universitario - Servico de Estomatologia",
    notes: "Acompanhamento de mucosite oral",
    createdAt: new Date().toISOString()
  }
]);
const adminProfile = {
  username: "maceio",
  password: "maceio",
  name: "Administrador"
};
let professionals = loadStored("laserOralAidProfessionals", null);
let professional = loadStored("laserOralAidProfessional", null);
let currentSession = loadStored("laserOralAidSession", null);

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const fmt = (n, digits = 1) => Number(n).toFixed(digits).replace(/\.0$/, "");
const normalize = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLowerCase();

function init() {
  localizeTextRecords([devices, protocols, services, learning, patients]);
  validateSession();
  migratePatientAccess();
  migrateProfessionalAccess();
  populateDevices();
  populateDatalist();
  bindNavigation();
  bindSearchAndFilters();
  bindSimulator();
  bindCalculators();
  bindMap();
  bindAssistant();
  bindPatientModule();
  renderProtocols();
  renderProtocolDetail(selectedProtocol);
  renderDevices();
  renderServices();
  renderLearning();
  renderPatientModule();
  renderSummary();
  registerServiceWorker();
}

function validateSession() {
  if (currentSession?.role === "patient" && !patients.some((patient) => patient.id === currentSession.id)) {
    currentSession = null;
  }
  if (currentSession?.role === "professional" && !getCurrentProfessional()) {
    currentSession = null;
  }
  if (currentSession?.role === "admin" && !isAdminSession(currentSession)) currentSession = null;
  saveStored("laserOralAidSession", currentSession);
}

function migratePatientAccess() {
  let changed = false;
  patients = patients.map((patient, index) => {
    if (patient.username && patient.password) return patient;
    changed = true;
    return {
      ...patient,
      username: patient.username || (index === 0 ? "paciente" : `paciente${index + 1}`),
      password: patient.password || "1234"
    };
  });
  if (changed) saveStored("laserOralAidPatients", patients);
}

function migrateProfessionalAccess() {
  if (!Array.isArray(professionals)) {
    professionals = professional ? [{ ...professional, id: professional.id || createId() }] : [];
    if (currentSession?.role === "professional" && !currentSession.id && professionals[0]) {
      currentSession = { role: "professional", id: professionals[0].id };
      saveStored("laserOralAidSession", currentSession);
    }
    saveStored("laserOralAidProfessionals", professionals);
  }
  professional = getCurrentProfessional() || professionals[0] || null;
  if (professional) saveStored("laserOralAidProfessional", professional);
}

function localizeTextRecords(collections) {
  const skipKeys = new Set(["id", "username", "password", "email", "phone"]);
  const visit = (value, key = "") => {
    if (typeof value === "string") return skipKeys.has(key) ? value : accentText(value);
    if (Array.isArray(value)) return value.map((item) => visit(item, key));
    if (value && typeof value === "object") {
      Object.keys(value).forEach((itemKey) => {
        value[itemKey] = visit(value[itemKey], itemKey);
      });
    }
    return value;
  };
  collections.forEach((collection) => visit(collection));
}

function accentText(text) {
  const replacements = [
    [/\bSaude\b/g, "Saúde"],
    [/\bsaude\b/g, "saúde"],
    [/\bDoenca\b/g, "Doença"],
    [/\bdoenca\b/g, "doença"],
    [/\bclinica\b/g, "clínica"],
    [/\bclinico\b/g, "clínico"],
    [/\bclinicos\b/g, "clínicos"],
    [/\bClinica\b/g, "Clínica"],
    [/\bOdontologica\b/g, "Odontológica"],
    [/\bodontologica\b/g, "odontológica"],
    [/\bevidencia\b/g, "evidência"],
    [/\bEvidencia\b/g, "Evidência"],
    [/\bevidencias\b/g, "evidências"],
    [/\bindicacao\b/g, "indicação"],
    [/\bIndicacao\b/g, "Indicação"],
    [/\bdecisao\b/g, "decisão"],
    [/\bexecucao\b/g, "execução"],
    [/\bvalidacao\b/g, "validação"],
    [/\blegislacao\b/g, "legislação"],
    [/\bbiosseguranca\b/g, "biossegurança"],
    [/\bdiagnostico\b/g, "diagnóstico"],
    [/\bDiagnostico\b/g, "Diagnóstico"],
    [/\bavaliacao\b/g, "avaliação"],
    [/\bavaliacoes\b/g, "avaliações"],
    [/\bautorizacao\b/g, "autorização"],
    [/\bautorizacoes\b/g, "autorizações"],
    [/\bterapeutico\b/g, "terapêutico"],
    [/\bterapeutica\b/g, "terapêutica"],
    [/\boncologico\b/g, "oncológico"],
    [/\boncologica\b/g, "oncológica"],
    [/\boncologicos\b/g, "oncológicos"],
    [/\binfeccao\b/g, "infecção"],
    [/\binfeccoes\b/g, "infecções"],
    [/\birritacao\b/g, "irritação"],
    [/\bIrritacao\b/g, "Irritação"],
    [/\bcompressao\b/g, "compressão"],
    [/\bCompressao\b/g, "Compressão"],
    [/\bcomplicacao\b/g, "complicação"],
    [/\bcomplicacoes\b/g, "complicações"],
    [/\bneurologicos\b/g, "neurológicos"],
    [/\bneurologica\b/g, "neurológica"],
    [/\bInflamacao\b/g, "Inflamação"],
    [/\binflamacao\b/g, "inflamação"],
    [/\bReducao\b/g, "Redução"],
    [/\breducao\b/g, "redução"],
    [/\bDescontaminacao\b/g, "Descontaminação"],
    [/\bdescontaminacao\b/g, "descontaminação"],
    [/\bFotobiomodulacao\b/g, "Fotobiomodulação"],
    [/\bfotobiomodulacao\b/g, "fotobiomodulação"],
    [/\bpotencia\b/g, "potência"],
    [/\bPotencia\b/g, "Potência"],
    [/\bparametros\b/g, "parâmetros"],
    [/\bParametros\b/g, "Parâmetros"],
    [/\btermico\b/g, "térmico"],
    [/\btermica\b/g, "térmica"],
    [/\bproteção\b/g, "proteção"],
    [/\bprotecao\b/g, "proteção"],
    [/\boculos\b/g, "óculos"],
    [/\bseguranca\b/g, "segurança"],
    [/\bSeguranca\b/g, "Segurança"],
    [/\bLesao\b/g, "Lesão"],
    [/\blesao\b/g, "lesão"],
    [/\bLesoes\b/g, "Lesões"],
    [/\blesoes\b/g, "lesões"],
    [/\bulcera\b/g, "úlcera"],
    [/\bulceras\b/g, "úlceras"],
    [/\bulceracao\b/g, "ulceração"],
    [/\bUlcerativas\b/g, "Ulcerativas"],
    [/\bcirurgico\b/g, "cirúrgico"],
    [/\bcirurgica\b/g, "cirúrgica"],
    [/\bcirurgicas\b/g, "cirúrgicas"],
    [/\bpos-operatorio\b/g, "pós-operatório"],
    [/\bpos-operatoria\b/g, "pós-operatória"],
    [/\bPos-operatoria\b/g, "Pós-operatória"],
    [/\boperatorias\b/g, "operatórias"],
    [/\baplicacao\b/g, "aplicação"],
    [/\bAplicacao\b/g, "Aplicação"],
    [/\bselecao\b/g, "seleção"],
    [/\bevolucao\b/g, "evolução"],
    [/\bcriterios\b/g, "critérios"],
    [/\bRaciocinio\b/g, "Raciocínio"],
    [/\braciocinio\b/g, "raciocínio"],
    [/\bDiferencas\b/g, "Diferenças"],
    [/\bdiferencas\b/g, "diferenças"],
    [/\bfisicos\b/g, "físicos"],
    [/\binteracao\b/g, "interação"],
    [/\bavancados\b/g, "avançados"],
    [/\bcronica\b/g, "crônica"],
    [/\bCronica\b/g, "Crônica"],
    [/\baguda\b/g, "aguda"],
    [/\barea\b/g, "área"],
    [/\bArea\b/g, "Área"],
    [/\bareas\b/g, "áreas"],
    [/\bAreas\b/g, "Áreas"],
    [/\bnumero\b/g, "número"],
    [/\bNumero\b/g, "Número"],
    [/\bproximas\b/g, "próximas"],
    [/\bproximo\b/g, "próximo"],
    [/\btransformacao\b/g, "transformação"],
    [/\bestratificacao\b/g, "estratificação"],
    [/\bremovivel\b/g, "removível"],
    [/\bhomogenea\b/g, "homogênea"],
    [/\bNodulos\b/g, "Nódulos"],
    [/\bnodulos\b/g, "nódulos"],
    [/\bcronico\b/g, "crônico"],
    [/\bFotocoagulacao\b/g, "Fotocoagulação"],
    [/\bfotocoagulacao\b/g, "fotocoagulação"],
    [/\bvaporizacao\b/g, "vaporização"],
    [/\bReferencias\b/g, "Referências"],
    [/\breferencias\b/g, "referências"],
    [/\bRevisoes\b/g, "Revisões"],
    [/\brevisoes\b/g, "revisões"],
    [/\bNao\b/g, "Não"],
    [/\bnao\b/g, "não"],
    [/\bsera\b/g, "será"],
    [/\bsao\b/g, "são"],
    [/\bpossivel\b/g, "possível"],
    [/\bPossivel\b/g, "Possível"],
    [/\bPossiveis\b/g, "Possíveis"],
    [/\bpossiveis\b/g, "possíveis"],
    [/\bnecessario\b/g, "necessário"],
    [/\bNecessario\b/g, "Necessário"],
    [/\bdisponivel\b/g, "disponível"],
    [/\bmaximo\b/g, "máximo"],
    [/\btecnico\b/g, "técnico"],
    [/\bmecanico\b/g, "mecânico"],
    [/\bfluencia\b/g, "fluência"],
    [/\bFluencia\b/g, "Fluência"],
    [/\bIrradiancia\b/g, "Irradiância"],
    [/\birradiancia\b/g, "irradiância"],
    [/\bcontraindicacoes\b/g, "contraindicações"],
    [/\bContraindicacoes\b/g, "Contraindicações"],
    [/\bmanifestacoes\b/g, "manifestações"],
    [/\bManifestacoes\b/g, "Manifestações"],
    [/\bAssociacoes\b/g, "Associações"],
    [/\bassociacoes\b/g, "associações"],
    [/\bObservacoes\b/g, "Observações"],
    [/\bobservacoes\b/g, "observações"],
    [/\bEndereco\b/g, "Endereço"],
    [/\bendereco\b/g, "endereço"],
    [/\bSessao\b/g, "Sessão"],
    [/\bsessao\b/g, "sessão"],
    [/\bsessoes\b/g, "sessões"],
    [/\bSessoes\b/g, "Sessões"],
    [/\bOla\b/g, "Olá"],
    [/\bVoce\b/g, "Você"]
  ];
  return replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

function populateDevices() {
  const select = $("#deviceSelect");
  select.innerHTML = devices.map((device) => `<option value="${device.id}">${device.brand} ${device.model}</option>`).join("");
  select.addEventListener("change", () => {
    selectedDevice = devices.find((device) => device.id === select.value) || devices[0];
    renderProtocolDetail(selectedProtocol);
    renderDevices();
    updateParameterAlerts();
  });
}

function populateDatalist() {
  $("#diagnosisList").innerHTML = protocols.map((protocol) => `<option value="${protocol.name}"></option>`).join("");
}

function bindNavigation() {
  const titles = {
    home: "Laser Oral Aid",
    protocols: "Protocolos clínicos",
    simulator: "Simulador inteligente",
    patients: "Pacientes e profissionais",
    calculator: "Calculadoras",
    devices: "Equipamentos",
    map: "Rede de atendimento",
    learning: "Ensino e atlas",
    assistant: "Assistente IA"
  };
  $$("#navList .nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      activateView(button.dataset.view, titles);
    });
  });
  $$(".home-jump").forEach((button) => {
    button.addEventListener("click", () => activateView(button.dataset.viewTarget, titles));
  });
}

function activateView(view, titles) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $$(".view").forEach((viewNode) => viewNode.classList.remove("active"));
  const activeView = $(`#${view}View`);
  activeView.classList.add("active");
  $("#pageTitle").textContent = titles[view];
  if (matchMedia("(max-width: 980px)").matches) {
    activeView.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bindSearchAndFilters() {
  $("#protocolSearch").addEventListener("input", renderProtocols);
  $("#protocolSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    renderProtocols();
  });
  $("#conditionFilter").addEventListener("change", renderProtocols);
  $("#lesionPreference").addEventListener("change", renderProtocols);
}

function renderProtocols() {
  const term = $("#protocolSearch").value.trim().toLowerCase();
  const category = $("#conditionFilter").value;
  const lesionPreference = $("#lesionPreference").value;
  const filtered = protocols.filter((protocol) => {
    const haystack = [protocol.name, protocol.summary, protocol.category, ...protocol.keywords, ...protocol.goals].join(" ").toLowerCase();
    return (category === "all" || protocol.category === category)
      && matchesLesionPreference(protocol, lesionPreference)
      && (!term || haystack.includes(term));
  });
  $("#conditionList").innerHTML = filtered.map((protocol) => `
    <button class="condition-card ${protocol.id === selectedProtocol.id ? "active" : ""}" data-id="${protocol.id}" type="button">
      <strong>${protocol.name}</strong>
      <span>${protocol.summary}</span>
      <div class="badge-row">
        <span class="badge">${protocol.laserType === "low" ? "Baixa potência" : "Alta potência"}</span>
        <span class="badge warn">${protocol.evidence}</span>
      </div>
    </button>
  `).join("") || `<p class="muted">Nenhum protocolo encontrado.</p>`;
  $$(".condition-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedProtocol = protocols.find((protocol) => protocol.id === card.dataset.id) || protocols[0];
      renderProtocols();
      renderProtocolDetail(selectedProtocol);
    });
  });
  renderSummary();
}

function matchesLesionPreference(protocol, preference) {
  if (preference === "all") return true;
  const haystack = [
    protocol.id,
    protocol.name,
    protocol.summary,
    protocol.manifestations,
    protocol.category,
    ...protocol.keywords,
    ...protocol.goals
  ].join(" ").toLowerCase();
  const preferences = {
    ulcerativas: ["ulcera", "ulceracao", "mucosite", "afta", "liquen", "mucosa", "erosivo"],
    autoimunes: ["autoimune", "liquen", "penfigo", "penfigoide", "descamativa"],
    infecciosas: ["herpes", "hsv", "candidose", "infecc", "microbiologico", "pdt", "apdt"],
    vasculares: ["vascular", "hemangioma", "venosa", "lago venoso", "sangramento"],
    cirurgicas: ["excisao", "cirurg", "fibroma", "mucocele", "papiloma", "tecidos moles", "leucoplasia"],
    dor: ["dor", "parestesia", "neurossensorial", "dtm", "miofascial", "hipersensibilidade", "trismo"]
  };
  return preferences[preference].some((keyword) => haystack.includes(keyword));
}

function renderProtocolDetail(protocol) {
  const compatible = isCompatible(protocol, selectedDevice);
  const adjusted = adaptProtocol(protocol, selectedDevice);
  $("#protocolDetail").innerHTML = `
    <div class="badge-row">
      <span class="badge">${protocol.laserType === "low" ? "Fotobiomodulação" : "Laser de alta potência"}</span>
      <span class="badge ${compatible ? "" : "danger"}">${compatible ? "Compatível com equipamento" : "Ajuste necessário"}</span>
      <span class="badge warn">Evidência: ${protocol.evidence}</span>
    </div>
    <h2>${protocol.name}</h2>
    <p>${protocol.summary}</p>
    <div class="meta-grid">
      <div><h3>Manifestações</h3><p>${protocol.manifestations}</p></div>
      <div><h3>Objetivos</h3><p>${protocol.goals.join(", ")}</p></div>
      <div><h3>Indicacoes e pontos</h3><p>${protocol.points}</p></div>
      <div><h3>Contraindicações</h3><p>${protocol.contraindications}</p></div>
    </div>
    <div class="parameter-grid">
      ${metric("Comprimento de onda", `${adjusted.wavelength} nm`)}
      ${metric("Potência", `${fmt(adjusted.powerW, 2)} W`)}
      ${metric("Energia por ponto", `${fmt(adjusted.energyJ, 1)} J`)}
      ${metric("Densidade energia", `${fmt(adjusted.fluenceJcm2, 1)} J/cm2`)}
      ${metric("Irradiância", `${fmt(adjusted.irradianceWcm2, 1)} W/cm2`)}
      ${metric("Tempo por ponto", `${fmt(adjusted.seconds, 0)} s`)}
      ${metric("Modo", protocol.mode)}
      ${metric("Sessoes", protocol.sessions)}
    </div>
    <h3>Posologia</h3>
    <p>${protocol.frequency}. Area: ${protocol.area}. Tempo total estimado: ${fmt(adjusted.totalSeconds / 60, 1)} min para ${adjusted.pointsCount} pontos.</p>
    <h3>Segurança</h3>
    <p>${protocol.safety}</p>
    <h3>Associações e eventos adversos</h3>
    <p>Associar terapias medicamentosas, periodontais, cirúrgicas ou oncológicas quando indicadas. Possíveis efeitos: ${protocol.adverse}</p>
    <h3>Referências base</h3>
    <ul>${protocol.refs.map((ref) => `<li>${ref}</li>`).join("")}</ul>
    ${compatible ? "" : `<p class="clinical-warning">O equipamento selecionado não cobre integralmente o protocolo original. O app selecionou o comprimento de onda mais próximo e limitou a potência ao máximo cadastrado; valide clinicamente antes do uso.</p>`}
  `;
}

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function isCompatible(protocol, device) {
  const typeOk = protocol.laserType === device.type;
  const wavelengthOk = protocol.wavelengths.some((wavelength) => device.wavelengths.includes(wavelength));
  return typeOk && wavelengthOk;
}

function adaptProtocol(protocol, device, area = 1) {
  const wavelength = nearestWavelength(protocol.wavelengths, device.wavelengths);
  const powerW = Math.min(protocol.powerW || device.maxPowerW * 0.2, device.maxPowerW);
  const energyJ = protocol.energyJ || Math.max(0.2, powerW * 10);
  const seconds = energyJ > 0 && powerW > 0 ? energyJ / powerW : 0;
  const pointsCount = Math.max(1, Math.ceil(area / Math.max(device.spotCm2, 0.01)));
  return {
    wavelength,
    powerW,
    energyJ,
    fluenceJcm2: energyJ / Math.max(device.spotCm2, 0.01),
    irradianceWcm2: powerW / Math.max(device.spotCm2, 0.01),
    seconds,
    pointsCount,
    totalSeconds: seconds * pointsCount
  };
}

function nearestWavelength(protocolWaves, deviceWaves) {
  let best = deviceWaves[0];
  let bestDistance = Infinity;
  protocolWaves.forEach((target) => {
    deviceWaves.forEach((candidate) => {
      const distance = Math.abs(target - candidate);
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    });
  });
  return best;
}

function bindSimulator() {
  $("#simulatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const protocol = protocols.find((item) => item.name.toLowerCase() === data.diagnosis.toLowerCase())
      || protocols.find((item) => item.name.toLowerCase().includes(data.diagnosis.toLowerCase()))
      || protocols[0];
    const adjusted = adaptProtocol(protocol, selectedDevice, Number(data.area) || 1);
    const compatible = isCompatible(protocol, selectedDevice);
    $("#simulatorResult").innerHTML = `
      <div class="badge-row">
        <span class="badge">${data.goal}</span>
        <span class="badge">${data.phase}</span>
        <span class="badge ${compatible ? "" : "danger"}">${compatible ? "Parâmetros compatíveis" : "Compatibilidade parcial"}</span>
      </div>
      <h2>Protocolo personalizado</h2>
      <p><strong>Diagnóstico:</strong> ${protocol.name}. <strong>Local:</strong> ${data.site || "não informado"}. <strong>Paciente:</strong> ${data.age} anos.</p>
      <div class="parameter-grid">
        ${metric("Equipamento", `${selectedDevice.brand} ${selectedDevice.model}`)}
        ${metric("Comprimento de onda", `${adjusted.wavelength} nm`)}
        ${metric("Potência sugerida", `${fmt(adjusted.powerW, 2)} W`)}
        ${metric("Energia por ponto", `${fmt(adjusted.energyJ, 1)} J`)}
        ${metric("Pontos estimados", adjusted.pointsCount)}
        ${metric("Tempo por ponto", `${fmt(adjusted.seconds, 0)} s`)}
        ${metric("Tempo total", `${fmt(adjusted.totalSeconds / 60, 1)} min`)}
        ${metric("Modo", protocol.mode)}
      </div>
      <h3>Justificativa dos parâmetros</h3>
      <p>A sugestão parte do protocolo cadastrado para ${protocol.name}, ajusta o comprimento de onda ao emissor disponível e limita a potência ao máximo técnico do aparelho. A energia por ponto e a grade de pontos foram estimadas pela área informada e pela área de spot cadastrada.</p>
      <h3>Cuidados clínicos</h3>
      <p>${protocol.safety} Contraindicações: ${protocol.contraindications}</p>
      <h3>Protocolos alternativos</h3>
      <p>${alternativeText(protocol)}</p>
      <h3>Referências</h3>
      <ul>${protocol.refs.map((ref) => `<li>${ref}</li>`).join("")}</ul>
    `;
  });
}

function alternativeText(protocol) {
  if (protocol.laserType === "low") {
    return "Quando houver resposta insuficiente, comparar aplicação pontual com varredura, ajustar energia dentro da janela terapêutica e reavaliar diagnóstico, fase da lesão e terapia associada.";
  }
  return "Para lasers cirúrgicos, comparar fibra em contato, modo pulsado e abordagens convencionais, priorizando menor dano térmico e descontaminação mecânica adequada.";
}

function bindCalculators() {
  ["energyCalc", "fluenceCalc", "pointsCalc"].forEach((id) => {
    const form = $(`#${id}`);
    form.addEventListener("input", () => updateCalculator(id));
    updateCalculator(id);
  });
  updateParameterAlerts();
}

function updateCalculator(id) {
  const form = $(`#${id}`);
  const data = Object.fromEntries(new FormData(form));
  const output = form.querySelector("output");
  if (id === "energyCalc") {
    const seconds = Number(data.energy) / Number(data.power);
    output.textContent = Number.isFinite(seconds) ? `${fmt(seconds, 0)} s` : "Verifique";
  }
  if (id === "fluenceCalc") {
    const fluence = Number(data.energy) / Number(data.area);
    output.textContent = Number.isFinite(fluence) ? `${fmt(fluence, 1)} J/cm2` : "Verifique";
  }
  if (id === "pointsCalc") {
    const points = Math.ceil(Number(data.area) / Number(data.spot));
    output.textContent = Number.isFinite(points) ? `${points} pontos` : "Verifique";
  }
  updateParameterAlerts();
}

function updateParameterAlerts() {
  const adapted = adaptProtocol(selectedProtocol, selectedDevice);
  const alerts = [];
  if (!isCompatible(selectedProtocol, selectedDevice)) alerts.push("Equipamento selecionado tem compatibilidade parcial com o protocolo ativo.");
  if (adapted.fluenceJcm2 > 150 && selectedDevice.type === "low") alerts.push("Fluência estimada elevada para fotobiomodulação; confirme área de spot e energia por ponto.");
  if (adapted.irradianceWcm2 > 5 && selectedDevice.type === "low") alerts.push("Irradiância alta; reduzir potência ou aumentar área efetiva pode ser necessário.");
  if (selectedDevice.type === "high") alerts.push("Laser de alta potência exige treinamento específico, controle térmico e proteção ocular para cada comprimento de onda.");
  $("#parameterAlerts").innerHTML = `<h2>Alertas inteligentes</h2>${alerts.map((alert) => `<p class="clinical-warning">${alert}</p>`).join("") || "<p class='muted'>Nenhum alerta para o protocolo e equipamento atuais.</p>"}`;
}

function renderDevices() {
  $("#deviceCount").textContent = `${devices.length} cadastrados`;
  $("#deviceGrid").innerHTML = devices.map((device) => `
    <article class="device-card">
      <strong>${device.brand} ${device.model}</strong>
      <span>${device.type === "low" ? "Baixa potência" : "Alta potência"} · ${device.wavelengths.join("/")} nm</span>
      <dl>
        <dt>Potencia max.</dt><dd>${device.maxPowerW} W</dd>
        <dt>Modos</dt><dd>${device.modes.join(", ")}</dd>
        <dt>Spot/fibra</dt><dd>${device.spotCm2} cm2</dd>
        <dt>Aplicacao</dt><dd>${device.contact}</dd>
        <dt>Acessorios</dt><dd>${device.accessories}</dd>
        <dt>Indicacoes</dt><dd>${device.applications}</dd>
        <dt>Limites</dt><dd>${device.limitations}</dd>
      </dl>
    </article>
  `).join("");
}

function bindMap() {
  const cities = Array.from(new Set(services.map((service) => getServiceCity(service)).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  $("#serviceCityFilter").innerHTML = [
    `<option value="all">Todas as cidades</option>`,
    ...cities.map((city) => `<option value="${escapeHTML(city)}">${escapeHTML(city)}</option>`)
  ].join("");
  $("#serviceCityFilter").addEventListener("change", renderServices);
  $$(".filters input").forEach((input) => input.addEventListener("change", renderServices));
}

function renderServices() {
  const enabled = $$(".filters input:checked").map((input) => input.value);
  const selectedCity = $("#serviceCityFilter").value;
  const filtered = services
    .filter((service) => enabled.includes(service.type))
    .filter((service) => enabled.includes("Laser") ? service.laser : true)
    .filter((service) => selectedCity === "all" || getServiceCity(service) === selectedCity)
    .sort((a, b) => (a.type === "SUS" ? -1 : 1) - (b.type === "SUS" ? -1 : 1) || a.distance - b.distance);
  if (!filtered.includes(selectedService)) selectedService = filtered[0] || services[0];
  renderMapPanel(selectedService);
  $("#serviceList").innerHTML = filtered.map((service) => `
    <article class="service-card">
      <strong>${service.name}</strong>
      <span>${service.type} · ${service.category || "Serviço odontológico"}</span>
      <p>${service.specialties}</p>
      <p>${service.address}<br>${[service.phone, service.email].filter(Boolean).join(" · ")}<br>${service.hours}</p>
      <div class="badge-row">
        <span class="badge">${service.distance} km</span>
        <span class="badge ${service.laser ? "" : "warn"}">${service.laser ? "Laserterapia cadastrada" : "Sem laser cadastrado"}</span>
        <button class="badge map-select ${service === selectedService ? "active" : ""}" data-service-name="${escapeHTML(service.name)}" type="button">Ver mapa</button>
        <a class="badge" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}" target="_blank" rel="noreferrer">Rota</a>
      </div>
    </article>
  `).join("") || `<p class="muted">Nenhuma unidade corresponde aos filtros.</p>`;

  $$("[data-service-name]").forEach((button) => {
    button.addEventListener("click", () => {
      const service = services.find((item) => item.name === button.dataset.serviceName);
      if (!service) return;
      selectedService = service;
      renderServices();
    });
  });
}

function getServiceCity(service) {
  const match = service.address.match(/,\s*([^,]+?)-(?:AL|PB|MG)\b/);
  return match ? match[1].trim() : "";
}

function renderMapPanel(service) {
  if (!service) {
    $("#mapPanel").innerHTML = `<p class="muted">Selecione um serviço para visualizar o mapa.</p>`;
    return;
  }
  const query = encodeURIComponent(service.address);
  $("#mapPanel").innerHTML = `
    <iframe
      class="map-frame"
      title="Mapa: ${escapeHTML(service.name)}"
      src="https://www.google.com/maps?q=${query}&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
    <div class="map-caption">
      <strong>${escapeHTML(service.name)}</strong>
      <span>${escapeHTML(service.address)}</span>
      <a class="badge" href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" rel="noreferrer">Abrir rota</a>
    </div>
  `;
}

function bindPatientModule() {
  $("#patientLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const patient = patients.find((item) => item.username === data.username.trim() && item.password === data.password);
    if (!patient) {
      setAuthMessage("Login ou senha do paciente não conferem.");
      return;
    }
    currentSession = { role: "patient", id: patient.id };
    saveStored("laserOralAidSession", currentSession);
    event.currentTarget.reset();
    setAuthMessage("Paciente conectado.");
    setPatientForm(patient);
    renderPatientModule();
    renderSummary();
  });

  $("#professionalLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const loggedProfessional = professionals.find((item) => item.username === data.username.trim() && item.password === data.password);
    if (!loggedProfessional) {
      setAuthMessage("Login ou senha do profissional não conferem.");
      return;
    }
    professional = loggedProfessional;
    saveStored("laserOralAidProfessional", professional);
    currentSession = { role: "professional", id: loggedProfessional.id };
    saveStored("laserOralAidSession", currentSession);
    event.currentTarget.reset();
    setAuthMessage("Profissional conectado.");
    renderPatientModule();
    renderSummary();
  });

  $("#adminLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const valid = data.username.trim() === adminProfile.username && data.password === adminProfile.password;
    if (!valid) {
      setAuthMessage("Login ou senha do admin não conferem.");
      return;
    }
    currentSession = { role: "admin", username: adminProfile.username };
    saveStored("laserOralAidSession", currentSession);
    event.currentTarget.reset();
    setAuthMessage("Admin conectado. Você pode ver todos os pacientes e profissionais.");
    renderPatientModule();
    renderSummary();
  });

  $("#patientForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const id = data.id || "";
    const username = data.username.trim();
    const duplicate = patients.some((patient) => patient.username === username && patient.id !== id);
    if (duplicate) {
      setAuthMessage("Este login de paciente já está em uso.");
      return;
    }
    const patient = {
      id: id || createId(),
      username,
      password: data.password,
      name: data.name.trim(),
      age: data.age.trim(),
      sex: data.sex,
      city: data.city.trim(),
      address: data.address.trim(),
      therapyPlace: data.therapyPlace.trim(),
      notes: data.notes.trim(),
      createdAt: patients.find((item) => item.id === id)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    patients = id
      ? patients.map((item) => item.id === id ? patient : item)
      : [patient, ...patients];
    saveStored("laserOralAidPatients", patients);
    if (currentSession?.role !== "admin") {
      currentSession = { role: "patient", id: patient.id };
      saveStored("laserOralAidSession", currentSession);
    }
    setAuthMessage(id ? "Cadastro do paciente atualizado." : "Paciente cadastrado e conectado.");
    setPatientForm(patient);
    renderPatientModule();
    renderSummary();
  });

  $("#professionalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const id = data.id || "";
    const username = data.username.trim();
    const duplicate = professionals.some((item) => item.username === username && item.id !== id);
    if (duplicate) {
      setAuthMessage("Este login profissional já está em uso.");
      return;
    }
    professional = {
      id: id || createId(),
      username,
      password: data.password,
      name: data.name.trim(),
      registry: data.registry.trim(),
      city: data.city.trim(),
      workplace: data.workplace.trim(),
      updatedAt: new Date().toISOString()
    };
    professionals = id
      ? professionals.map((item) => item.id === id ? professional : item)
      : [professional, ...professionals];
    saveStored("laserOralAidProfessionals", professionals);
    saveStored("laserOralAidProfessional", professional);
    if (currentSession?.role !== "admin") {
      currentSession = { role: "professional", id: professional.id };
      saveStored("laserOralAidSession", currentSession);
      $("#cityPatientFilter").value = professional.city;
    }
    setAuthMessage(currentSession?.role === "admin" ? "Cadastro profissional salvo." : "Cadastro profissional salvo e conectado.");
    renderPatientModule();
    renderSummary();
  });

  $("#cancelPatientEditBtn").addEventListener("click", () => {
    const patient = getCurrentPatient();
    if (patient) {
      setPatientForm(patient);
    } else {
      resetPatientForm();
    }
  });

  $("#cityPatientFilter").addEventListener("input", () => {
    renderPatientList();
    renderSummary();
  });
}

function renderPatientModule() {
  professional = getCurrentProfessional() || professional;
  if (professional) {
    const form = $("#professionalForm");
    form.elements.id.value = professional.id || "";
    form.elements.username.value = professional.username || "";
    form.elements.password.value = professional.password || "";
    form.elements.name.value = professional.name || "";
    form.elements.registry.value = professional.registry || "";
    form.elements.city.value = professional.city || "";
    form.elements.workplace.value = professional.workplace || "";
    if (currentSession?.role !== "admin" && !$("#cityPatientFilter").value) $("#cityPatientFilter").value = professional.city || "";
  }
  const patient = getCurrentPatient();
  if (patient && currentSession?.role === "patient") {
    setPatientForm(patient);
  } else if (!$("#patientForm").elements.id.value) {
    resetPatientForm();
  }
  renderSessionBox();
  renderProfessionalProfile();
  renderPatientList();
  renderProfessionalList();
}

function renderSessionBox() {
  const box = $("#sessionBox");
  const patient = getCurrentPatient();
  if (currentSession?.role === "patient" && patient) {
    box.innerHTML = `
      <strong>Paciente conectado: ${escapeHTML(patient.name)}</strong>
      <span>${escapeHTML(patient.city)} · ${escapeHTML(patient.therapyPlace)}</span>
      <button class="secondary" id="logoutBtn" type="button">Sair</button>
    `;
  } else if (currentSession?.role === "professional" && professional) {
    box.innerHTML = `
      <strong>Profissional conectado: ${escapeHTML(professional.name)}</strong>
      <span>${escapeHTML(professional.registry)} · ${escapeHTML(professional.city)}</span>
      <button class="secondary" id="logoutBtn" type="button">Sair</button>
    `;
  } else if (currentSession?.role === "admin") {
    box.innerHTML = `
      <strong>Admin conectado: ${escapeHTML(adminProfile.name)}</strong>
      <span>Acesso a todos os pacientes e profissionais cadastrados neste dispositivo.</span>
      <button class="secondary" id="logoutBtn" type="button">Sair</button>
    `;
  } else {
    box.innerHTML = `<span class="muted">Entre para editar cadastro, acompanhar pacientes por cidade ou administrar todos os registros.</span>`;
  }
  $("#logoutBtn")?.addEventListener("click", () => {
    currentSession = null;
    saveStored("laserOralAidSession", currentSession);
    setAuthMessage("Sessão encerrada.");
    resetPatientForm();
    renderPatientModule();
    renderSummary();
  });
}

function renderProfessionalProfile() {
  const profile = $("#professionalProfile");
  if (!professional) {
    profile.innerHTML = `<p class="muted">Cadastre o profissional para listar automaticamente os pacientes que moram na mesma cidade.</p>`;
    return;
  }
  profile.innerHTML = `
    <strong>${escapeHTML(professional.name)}</strong>
    <p class="muted">${escapeHTML(professional.registry)} · ${escapeHTML(professional.city)} · login ${escapeHTML(professional.username || "não definido")}</p>
    <p>${escapeHTML(professional.workplace || "Local de trabalho não informado")}</p>
  `;
}

function renderPatientList() {
  const isAdmin = currentSession?.role === "admin";
  const city = normalize($("#cityPatientFilter").value || (isAdmin ? "" : professional?.city));
  let visiblePatients = [];
  if (currentSession?.role === "professional" && professional) {
    visiblePatients = patients.filter((patient) => !city || normalize(patient.city) === city);
  }
  if (isAdmin) {
    visiblePatients = patients.filter((patient) => !city || normalize(patient.city) === city);
  }
  if (currentSession?.role === "patient") {
    visiblePatients = patients.filter((patient) => patient.id === currentSession.id);
  }
  if (!currentSession) {
    $("#patientListTitle").textContent = "Pacientes cadastrados";
    $("#patientList").innerHTML = `<p class="muted">Faça login como profissional para ver os pacientes da cidade, como paciente para editar seu cadastro ou como admin para ver todos.</p>`;
    return;
  }
  $("#patientListTitle").textContent = isAdmin ? "Todos os pacientes cadastrados" : "Pacientes cadastrados na cidade do profissional";
  $("#patientList").innerHTML = visiblePatients.map((patient) => `
    <article class="patient-record">
      <header>
        <div>
          <strong>${escapeHTML(patient.name)}</strong>
          <span class="muted">${escapeHTML(patient.age)} anos · ${escapeHTML(patient.sex)}</span>
        </div>
        <span class="badge">${escapeHTML(patient.city)}</span>
      </header>
      <dl>
        <dt>Endereço</dt><dd>${escapeHTML(patient.address)}</dd>
        <dt>Laserterapia</dt><dd>${escapeHTML(patient.therapyPlace)}</dd>
        <dt>Observações</dt><dd>${escapeHTML(patient.notes || "Sem observações")}</dd>
      </dl>
      <div class="patient-actions">
        <button class="secondary" data-edit-patient="${patient.id}" type="button">Editar</button>
        ${canManageRecords() ? `<button class="icon-button" data-remove-patient="${patient.id}" title="Remover paciente" type="button">&times;</button>` : ""}
      </div>
    </article>
  `).join("") || `<p class="muted">${isAdmin ? "Nenhum paciente cadastrado." : "Nenhum paciente encontrado para esta cidade."}</p>`;

  $$("[data-edit-patient]").forEach((button) => {
    button.addEventListener("click", () => {
      const patient = patients.find((item) => item.id === button.dataset.editPatient);
      if (!patient) return;
      if (currentSession?.role === "patient" && currentSession.id !== patient.id) return;
      setPatientForm(patient);
      setAuthMessage("Cadastro carregado para edição.");
      $("#patientForm").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  $$("[data-remove-patient]").forEach((button) => {
    button.addEventListener("click", () => {
      patients = patients.filter((patient) => patient.id !== button.dataset.removePatient);
      saveStored("laserOralAidPatients", patients);
      renderPatientModule();
      renderSummary();
    });
  });
}

function renderProfessionalList() {
  const list = $("#professionalList");
  if (!list) return;
  if (currentSession?.role !== "admin") {
    list.innerHTML = `<p class="muted">Entre como admin para ver todos os profissionais cadastrados.</p>`;
    return;
  }
  list.innerHTML = professionals.map((item) => `
    <article class="patient-record">
      <header>
        <div>
          <strong>${escapeHTML(item.name)}</strong>
          <span class="muted">${escapeHTML(item.registry)} · login ${escapeHTML(item.username || "não definido")}</span>
        </div>
        <span class="badge">${escapeHTML(item.city)}</span>
      </header>
      <dl>
        <dt>Local</dt><dd>${escapeHTML(item.workplace || "Local de trabalho não informado")}</dd>
        <dt>Registro</dt><dd>${escapeHTML(item.registry)}</dd>
      </dl>
      <div class="patient-actions">
        <button class="secondary" data-edit-professional="${item.id}" type="button">Editar</button>
      </div>
    </article>
  `).join("") || `<p class="muted">Nenhum profissional cadastrado.</p>`;

  $$("[data-edit-professional]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = professionals.find((item) => item.id === button.dataset.editProfessional);
      if (!selected) return;
      professional = selected;
      saveStored("laserOralAidProfessional", professional);
      const form = $("#professionalForm");
      form.elements.id.value = selected.id || "";
      form.elements.username.value = selected.username || "";
      form.elements.password.value = selected.password || "";
      form.elements.name.value = selected.name || "";
      form.elements.registry.value = selected.registry || "";
      form.elements.city.value = selected.city || "";
      form.elements.workplace.value = selected.workplace || "";
      setAuthMessage("Cadastro profissional carregado para edição.");
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderSummary() {
  const canViewSummary = currentSession?.role === "professional" || currentSession?.role === "admin";
  $("#appSummary").hidden = !canViewSummary;
  if (!canViewSummary) return;
  const city = normalize($("#cityPatientFilter")?.value || (currentSession?.role === "admin" ? "" : professional?.city));
  const cityCount = patients.filter((patient) => city && normalize(patient.city) === city).length;
  $("#summaryProtocolCount").textContent = protocols.length;
  $("#summaryPatientCount").textContent = patients.length;
  $("#summaryCityCount").textContent = currentSession?.role === "admin" && !city ? professionals.length : city ? cityCount : 0;
}

function setPatientForm(patient) {
  const form = $("#patientForm");
  form.elements.id.value = patient.id || "";
  form.elements.username.value = patient.username || "";
  form.elements.password.value = patient.password || "";
  form.elements.name.value = patient.name || "";
  form.elements.age.value = patient.age || "";
  form.elements.sex.value = patient.sex || "";
  form.elements.city.value = patient.city || "";
  form.elements.address.value = patient.address || "";
  form.elements.therapyPlace.value = patient.therapyPlace || "";
  form.elements.notes.value = patient.notes || "";
  $("#patientFormTitle").textContent = "Editar cadastro do paciente";
  $("#savePatientBtn").textContent = "Atualizar paciente";
  $("#cancelPatientEditBtn").hidden = false;
}

function resetPatientForm() {
  const form = $("#patientForm");
  form.reset();
  form.elements.id.value = "";
  $("#patientFormTitle").textContent = "Cadastro para acompanhamento";
  $("#savePatientBtn").textContent = "Salvar paciente";
  $("#cancelPatientEditBtn").hidden = true;
}

function getCurrentPatient() {
  if (currentSession?.role !== "patient") return null;
  return patients.find((patient) => patient.id === currentSession.id) || null;
}

function getCurrentProfessional() {
  if (!Array.isArray(professionals)) return professional || null;
  if (currentSession?.role === "professional" && currentSession.id) {
    return professionals.find((item) => item.id === currentSession.id) || null;
  }
  if (currentSession?.role === "professional" && professional) return professional;
  return professional && professionals.some((item) => item.id === professional.id) ? professional : null;
}

function isAdminSession(session) {
  return session?.role === "admin" && session.username === adminProfile.username;
}

function canManageRecords() {
  return currentSession?.role === "professional" || currentSession?.role === "admin";
}

function setAuthMessage(message) {
  $("#authMessage").textContent = message;
}

function renderLearning() {
  $("#learningGrid").innerHTML = learning.map((item) => `
    <article class="learning-card">
      <h2>${item.title}</h2>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function bindAssistant() {
  const intro = "Olá. Posso explicar protocolos, calcular parâmetros e lembrar critérios de segurança. Minhas respostas usam a base local do app e precisam de validação clínica.";
  addMessage(intro, "bot");
  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const message = new FormData(event.currentTarget).get("message").trim();
    if (!message) return;
    addMessage(message, "user");
    addMessage(answerQuestion(message), "bot");
    event.currentTarget.reset();
  });
}

function addMessage(text, type) {
  const node = document.createElement("div");
  node.className = `message ${type}`;
  node.textContent = text;
  $("#chatLog").append(node);
  $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
}

function answerQuestion(message) {
  const text = message.toLowerCase();
  const match = protocols.find((protocol) => text.includes(protocol.name.toLowerCase()) || protocol.keywords.some((keyword) => text.includes(keyword)));
  if (text.includes("segur") || text.includes("oculos") || text.includes("contra")) {
    return `Segurança: use óculos específicos para o comprimento de onda do equipamento, controle tecidos adjacentes, evite irradiar área sem diagnóstico e revise contraindicações. Para ${selectedDevice.brand} ${selectedDevice.model}, comprimentos cadastrados: ${selectedDevice.wavelengths.join("/")} nm.`;
  }
  if (text.includes("tempo") || text.includes("calcular") || text.includes("dose")) {
    const adapted = adaptProtocol(match || selectedProtocol, selectedDevice);
    return `Com o equipamento selecionado, a base atual sugere ${fmt(adapted.energyJ, 1)} J por ponto a ${fmt(adapted.powerW, 2)} W, resultando em aproximadamente ${fmt(adapted.seconds, 0)} segundos por ponto. Confirme área do spot, diagnóstico e janela terapêutica.`;
  }
  if (match) {
    const adapted = adaptProtocol(match, selectedDevice);
    return `${match.name}: objetivo principal ${match.goals.join(", ")}. Parâmetro adaptado: ${adapted.wavelength} nm, ${fmt(adapted.powerW, 2)} W, ${fmt(adapted.energyJ, 1)} J/ponto, ${fmt(adapted.seconds, 0)} s/ponto. Evidência: ${match.evidence}.`;
  }
  return "Não encontrei um protocolo exato na base local. Informe diagnóstico, objetivo, área tratada e equipamento para gerar uma sugestão no simulador; em caso de lesão persistente ou suspeita de malignidade, priorize diagnóstico e encaminhamento.";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").then(() => {
    $("#syncStatus").textContent = "Offline sincronizado";
  }).catch(() => {
    $("#syncStatus").textContent = "Offline indisponivel";
  });
}

function loadStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `patient-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
