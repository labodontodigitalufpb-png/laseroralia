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
  { name: "Centro de Especialidades Odontologicas - CEO Centro", type: "SUS", specialties: "Estomatologia, periodontia, cirurgia oral", laser: true, address: "Av. Central, 1200", phone: "(83) 3000-1001", email: "ceo.centro@saude.gov", hours: "Seg-sex, 7h-17h", distance: 1.8 },
  { name: "Hospital Universitario - Servico de Estomatologia", type: "SUS", specialties: "Diagnostico oral, biopsia, laserterapia", laser: true, address: "Campus Universitario", phone: "(83) 3000-2200", email: "estomatologia@hu.edu", hours: "Seg-sex, 8h-16h", distance: 4.6 },
  { name: "Policlinica Odontologica Municipal", type: "SUS", specialties: "Cirurgia, periodontia, atendimento especial", laser: false, address: "Rua da Saude, 88", phone: "(83) 3000-3300", email: "poliodonto@saude.gov", hours: "Seg-sex, 7h-19h", distance: 3.1 },
  { name: "Clinica Integrada de Laser Odontologico", type: "Privado", specialties: "Laserterapia, DTM, peri-implantite", laser: true, address: "Rua das Acacias, 410", phone: "(83) 3000-4400", email: "contato@laserodonto.com", hours: "Seg-sab, 8h-20h", distance: 2.4 }
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

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const fmt = (n, digits = 1) => Number(n).toFixed(digits).replace(/\.0$/, "");

function init() {
  populateDevices();
  populateDatalist();
  bindNavigation();
  bindSearchAndFilters();
  bindSimulator();
  bindCalculators();
  bindMap();
  bindAssistant();
  renderProtocols();
  renderProtocolDetail(selectedProtocol);
  renderDevices();
  renderServices();
  renderLearning();
  registerServiceWorker();
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
    protocols: "Protocolos clinicos",
    simulator: "Simulador inteligente",
    calculator: "Calculadoras",
    devices: "Equipamentos",
    map: "Rede de atendimento",
    learning: "Ensino e atlas",
    assistant: "Assistente IA"
  };
  $$("#navList .nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".nav-item").forEach((item) => item.classList.remove("active"));
      $$(".view").forEach((view) => view.classList.remove("active"));
      button.classList.add("active");
      $(`#${button.dataset.view}View`).classList.add("active");
      $("#pageTitle").textContent = titles[button.dataset.view];
    });
  });
}

function bindSearchAndFilters() {
  $("#globalSearch").addEventListener("input", renderProtocols);
  $("#conditionFilter").addEventListener("change", renderProtocols);
}

function renderProtocols() {
  const term = $("#globalSearch").value.trim().toLowerCase();
  const category = $("#conditionFilter").value;
  const filtered = protocols.filter((protocol) => {
    const haystack = [protocol.name, protocol.summary, protocol.category, ...protocol.keywords, ...protocol.goals].join(" ").toLowerCase();
    return (category === "all" || protocol.category === category) && (!term || haystack.includes(term));
  });
  $("#conditionList").innerHTML = filtered.map((protocol) => `
    <button class="condition-card ${protocol.id === selectedProtocol.id ? "active" : ""}" data-id="${protocol.id}" type="button">
      <strong>${protocol.name}</strong>
      <span>${protocol.summary}</span>
      <div class="badge-row">
        <span class="badge">${protocol.laserType === "low" ? "Baixa potencia" : "Alta potencia"}</span>
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
}

function renderProtocolDetail(protocol) {
  const compatible = isCompatible(protocol, selectedDevice);
  const adjusted = adaptProtocol(protocol, selectedDevice);
  $("#protocolDetail").innerHTML = `
    <div class="badge-row">
      <span class="badge">${protocol.laserType === "low" ? "Fotobiomodulacao" : "Laser de alta potencia"}</span>
      <span class="badge ${compatible ? "" : "danger"}">${compatible ? "Compativel com equipamento" : "Ajuste necessario"}</span>
      <span class="badge warn">Evidencia: ${protocol.evidence}</span>
    </div>
    <h2>${protocol.name}</h2>
    <p>${protocol.summary}</p>
    <div class="meta-grid">
      <div><h3>Manifestacoes</h3><p>${protocol.manifestations}</p></div>
      <div><h3>Objetivos</h3><p>${protocol.goals.join(", ")}</p></div>
      <div><h3>Indicacoes e pontos</h3><p>${protocol.points}</p></div>
      <div><h3>Contraindicacoes</h3><p>${protocol.contraindications}</p></div>
    </div>
    <div class="parameter-grid">
      ${metric("Comprimento de onda", `${adjusted.wavelength} nm`)}
      ${metric("Potencia", `${fmt(adjusted.powerW, 2)} W`)}
      ${metric("Energia por ponto", `${fmt(adjusted.energyJ, 1)} J`)}
      ${metric("Densidade energia", `${fmt(adjusted.fluenceJcm2, 1)} J/cm2`)}
      ${metric("Irradiancia", `${fmt(adjusted.irradianceWcm2, 1)} W/cm2`)}
      ${metric("Tempo por ponto", `${fmt(adjusted.seconds, 0)} s`)}
      ${metric("Modo", protocol.mode)}
      ${metric("Sessoes", protocol.sessions)}
    </div>
    <h3>Posologia</h3>
    <p>${protocol.frequency}. Area: ${protocol.area}. Tempo total estimado: ${fmt(adjusted.totalSeconds / 60, 1)} min para ${adjusted.pointsCount} pontos.</p>
    <h3>Seguranca</h3>
    <p>${protocol.safety}</p>
    <h3>Associacoes e eventos adversos</h3>
    <p>Associar terapias medicamentosas, periodontais, cirurgicas ou oncológicas quando indicadas. Possiveis efeitos: ${protocol.adverse}</p>
    <h3>Referencias base</h3>
    <ul>${protocol.refs.map((ref) => `<li>${ref}</li>`).join("")}</ul>
    ${compatible ? "" : `<p class="clinical-warning">O equipamento selecionado nao cobre integralmente o protocolo original. O app selecionou o comprimento de onda mais proximo e limitou potencia ao maximo cadastrado; valide clinicamente antes do uso.</p>`}
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
        <span class="badge ${compatible ? "" : "danger"}">${compatible ? "Parametros compativeis" : "Compatibilidade parcial"}</span>
      </div>
      <h2>Protocolo personalizado</h2>
      <p><strong>Diagnostico:</strong> ${protocol.name}. <strong>Local:</strong> ${data.site || "nao informado"}. <strong>Paciente:</strong> ${data.age} anos.</p>
      <div class="parameter-grid">
        ${metric("Equipamento", `${selectedDevice.brand} ${selectedDevice.model}`)}
        ${metric("Comprimento de onda", `${adjusted.wavelength} nm`)}
        ${metric("Potencia sugerida", `${fmt(adjusted.powerW, 2)} W`)}
        ${metric("Energia por ponto", `${fmt(adjusted.energyJ, 1)} J`)}
        ${metric("Pontos estimados", adjusted.pointsCount)}
        ${metric("Tempo por ponto", `${fmt(adjusted.seconds, 0)} s`)}
        ${metric("Tempo total", `${fmt(adjusted.totalSeconds / 60, 1)} min`)}
        ${metric("Modo", protocol.mode)}
      </div>
      <h3>Justificativa dos parametros</h3>
      <p>A sugestao parte do protocolo cadastrado para ${protocol.name}, ajusta o comprimento de onda ao emissor disponivel e limita a potencia ao maximo tecnico do aparelho. A energia por ponto e a grade de pontos foram estimadas pela area informada e pela area de spot cadastrada.</p>
      <h3>Cuidados clinicos</h3>
      <p>${protocol.safety} Contraindicacoes: ${protocol.contraindications}</p>
      <h3>Protocolos alternativos</h3>
      <p>${alternativeText(protocol)}</p>
      <h3>Referencias</h3>
      <ul>${protocol.refs.map((ref) => `<li>${ref}</li>`).join("")}</ul>
    `;
  });
}

function alternativeText(protocol) {
  if (protocol.laserType === "low") {
    return "Quando houver resposta insuficiente, comparar aplicacao pontual com varredura, ajustar energia dentro da janela terapeutica e reavaliar diagnostico, fase da lesao e terapia associada.";
  }
  return "Para lasers cirurgicos, comparar fibra em contato, modo pulsado e abordagens convencionais, priorizando menor dano termico e descontaminacao mecanica adequada.";
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
  if (adapted.fluenceJcm2 > 150 && selectedDevice.type === "low") alerts.push("Fluencia estimada elevada para fotobiomodulacao; confirme area de spot e energia por ponto.");
  if (adapted.irradianceWcm2 > 5 && selectedDevice.type === "low") alerts.push("Irradiancia alta; reduzir potencia ou aumentar area efetiva pode ser necessario.");
  if (selectedDevice.type === "high") alerts.push("Laser de alta potencia exige treinamento especifico, controle termico e protecao ocular para cada comprimento de onda.");
  $("#parameterAlerts").innerHTML = `<h2>Alertas inteligentes</h2>${alerts.map((alert) => `<p class="clinical-warning">${alert}</p>`).join("") || "<p class='muted'>Nenhum alerta para o protocolo e equipamento atuais.</p>"}`;
}

function renderDevices() {
  $("#deviceCount").textContent = `${devices.length} cadastrados`;
  $("#deviceGrid").innerHTML = devices.map((device) => `
    <article class="device-card">
      <strong>${device.brand} ${device.model}</strong>
      <span>${device.type === "low" ? "Baixa potencia" : "Alta potencia"} · ${device.wavelengths.join("/")} nm</span>
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
  $("#locateBtn").addEventListener("click", () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(() => {
      $("#locateBtn").textContent = "Localizacao ativa";
      renderServices();
    }, () => {
      $("#locateBtn").textContent = "Permissao negada";
    });
  });
  $$(".filters input").forEach((input) => input.addEventListener("change", renderServices));
}

function renderServices() {
  const enabled = $$(".filters input:checked").map((input) => input.value);
  const filtered = services
    .filter((service) => enabled.includes(service.type))
    .filter((service) => enabled.includes("Laser") ? service.laser : true)
    .sort((a, b) => (a.type === "SUS" ? -1 : 1) - (b.type === "SUS" ? -1 : 1) || a.distance - b.distance);
  $("#serviceList").innerHTML = filtered.map((service) => `
    <article class="service-card">
      <strong>${service.name}</strong>
      <span>${service.type} · ${service.specialties}</span>
      <p>${service.address}<br>${service.phone} · ${service.email}<br>${service.hours}</p>
      <div class="badge-row">
        <span class="badge">${service.distance} km</span>
        <span class="badge ${service.laser ? "" : "warn"}">${service.laser ? "Laserterapia cadastrada" : "Sem laser cadastrado"}</span>
        <a class="badge" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}" target="_blank" rel="noreferrer">Rota</a>
      </div>
    </article>
  `).join("") || `<p class="muted">Nenhuma unidade corresponde aos filtros.</p>`;
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
  const intro = "Ola. Posso explicar protocolos, calcular parametros e lembrar criterios de seguranca. Minhas respostas usam a base local do app e precisam de validacao clinica.";
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
    return `Seguranca: use oculos especificos para o comprimento de onda do equipamento, controle tecidos adjacentes, evite irradiar area sem diagnostico e revise contraindicacoes. Para ${selectedDevice.brand} ${selectedDevice.model}, comprimentos cadastrados: ${selectedDevice.wavelengths.join("/")} nm.`;
  }
  if (text.includes("tempo") || text.includes("calcular") || text.includes("dose")) {
    const adapted = adaptProtocol(match || selectedProtocol, selectedDevice);
    return `Com o equipamento selecionado, a base atual sugere ${fmt(adapted.energyJ, 1)} J por ponto a ${fmt(adapted.powerW, 2)} W, resultando em aproximadamente ${fmt(adapted.seconds, 0)} segundos por ponto. Confirme area do spot, diagnostico e janela terapeutica.`;
  }
  if (match) {
    const adapted = adaptProtocol(match, selectedDevice);
    return `${match.name}: objetivo principal ${match.goals.join(", ")}. Parametro adaptado: ${adapted.wavelength} nm, ${fmt(adapted.powerW, 2)} W, ${fmt(adapted.energyJ, 1)} J/ponto, ${fmt(adapted.seconds, 0)} s/ponto. Evidencia: ${match.evidence}.`;
  }
  return "Nao encontrei um protocolo exato na base local. Informe diagnostico, objetivo, area tratada e equipamento para gerar uma sugestao no simulador; em caso de lesao persistente ou suspeita de malignidade, priorize diagnostico e encaminhamento.";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").then(() => {
    $("#syncStatus").textContent = "Offline sincronizado";
  }).catch(() => {
    $("#syncStatus").textContent = "Offline indisponivel";
  });
}

init();
