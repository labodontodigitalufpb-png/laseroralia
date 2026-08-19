import {
  cancelAppointment as cancelRemoteAppointment,
  createAppointment as createRemoteAppointment,
  createAvailability as createRemoteAvailability,
  createEducationalMaterialUrl,
  deleteAvailability as deleteRemoteAvailability,
  deleteEducationalMaterial as deleteRemoteEducationalMaterial,
  getAccount,
  loadWorkspaceData,
  onAuthChange,
  savePatientRecord,
  saveProfessionalRecord,
  sendPasswordReset,
  signIn,
  signOut,
  signUp,
  uploadEducationalMaterial as uploadRemoteEducationalMaterial,
  updatePassword
} from "./supabase-client.js";

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
    name: "Faculdade de Odontologia da Universidade Federal de Alagoas (FOUFAL)",
    type: "SUS",
    category: "Instituição de ensino",
    specialties: "Referência em fotobiomodulação com laser de baixa e alta potência.",
    laser: true,
    address: "Universidade Federal de Alagoas, Av. Lourival Melo Mota, s/n, Tabuleiro do Martins, Maceió-AL, CEP 57072-900",
    access: "Acesso direto via aplicativo",
    hours: "Serviço com acesso direto via aplicativo",
    distance: 2.1
  },
  {
    name: "CEO Dr. Luiz de França Canuto - PAM Salgadinho",
    type: "SUS",
    category: "Centro de Especialidades Odontológicas",
    specialties: "Referência em fotobiomodulação com laser de baixa potência.",
    laser: true,
    address: "Rua Mizael Domingues, 241, Centro, Maceió-AL, CEP 57020-600",
    access: "Acesso mediante regulação ou pactuação municipal",
    hours: "Atendimento conforme regulação da Prefeitura de Maceió",
    distance: 3.4
  },
  {
    name: "Centro de Laser em Saúde - Curso de Odontologia do CESMAC",
    type: "Privado",
    category: "Instituição de ensino",
    specialties: "Referência em fotobiomodulação com laser de baixa e alta potência.",
    laser: true,
    address: "Rua Cônego Machado, 984, Farol, Maceió-AL, CEP 57051-160",
    access: "Acesso direto via aplicativo",
    hours: "Serviço com acesso direto via aplicativo",
    distance: 3.7
  },
  {
    name: "Curso de Odontologia da Afya Maceió",
    type: "Privado",
    category: "Instituição de ensino",
    specialties: "Referência em fotobiomodulação com laser de baixa potência.",
    laser: true,
    address: "Av. Comendador Gustavo Paiva, 5017, Cruz das Almas, Maceió-AL, CEP 57038-000",
    access: "Acesso direto via aplicativo",
    hours: "Serviço com acesso direto via aplicativo",
    distance: 4.0
  },
  {
    name: "CEO Rafael de Matos - Unidade Básica de Saúde Arthur Ramos",
    type: "SUS",
    category: "Centro de Especialidades Odontológicas",
    specialties: "Referência em fotobiomodulação com laser de baixa potência.",
    laser: true,
    address: "Conjunto Henrique Equelman, Rua I, s/n, próximo ao terminal de ônibus, Tabuleiro, Maceió-AL, CEP 57083-030",
    access: "Acesso mediante regulação ou pactuação municipal",
    hours: "Atendimento conforme regulação da Prefeitura de Maceió",
    distance: 4.3
  },
  {
    name: "CEO do Município de Campo Alegre",
    type: "SUS",
    category: "Centro de Especialidades Odontológicas",
    specialties: "Referência em fotobiomodulação com laser de baixa potência.",
    laser: true,
    address: "Av. Senador Máximo, 330, Campo Alegre-AL, CEP 57250-000",
    access: "Acesso mediante regulação ou pactuação municipal",
    hours: "Atendimento conforme regulação da Prefeitura de Campo Alegre",
    distance: 5.0
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

const customServices = loadStored("laserOralAidCustomServices", []);
if (Array.isArray(customServices)) {
  customServices.forEach((customService) => {
    if (!services.some((service) => String(service.name).localeCompare(String(customService.name), "pt-BR", { sensitivity: "base" }) === 0)) services.push(customService);
  });
}

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
let patients = [];
let professionals = [];
let professional = null;
let currentSession = null;
let availabilities = [];
let appointments = [];
let educationalMaterials = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const fmt = (n, digits = 1) => Number(n).toFixed(digits).replace(/\.0$/, "");
const normalize = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLowerCase();

const viewTitles = {
  home: "Laser Oral Aid",
  protocols: "Protocolos clínicos",
  simulator: "Simulador inteligente",
  patients: "Acesso",
  registration: "Cadastro",
  tracking: "Acompanhamento",
  schedule: "Agenda",
  calculator: "Calculadoras",
  devices: "Equipamentos",
  map: "Rede de atendimento",
  learning: "Ensino e atlas",
  assistant: "Assistente IA"
};

async function init() {
  localizeTextRecords([devices, protocols, services, learning, patients]);
  populateDevices();
  populateDatalist();
  populatePreferredServices();
  populateProfessionalServices();
  setupRegistrationPage();
  setupTrackingPage();
  bindNavigation();
  bindSearchAndFilters();
  bindSimulator();
  bindCalculators();
  bindMap();
  bindAssistant();
  bindPatientModule();
  bindSchedule();
  bindLearningMaterials();
  bindSupabaseSession();
  await refreshBackendData();
  renderProtocols();
  renderProtocolDetail(selectedProtocol);
  renderDevices();
  renderServices();
  renderLearning();
  renderPatientModule();
  renderSchedule();
  renderSummary();
  registerServiceWorker();
}

async function refreshBackendData() {
  currentSession = await getAccount();
  const data = await loadWorkspaceData(currentSession);
  patients = data.patients;
  professionals = data.professionals;
  availabilities = data.availabilities;
  appointments = data.appointments;
  educationalMaterials = data.educationalMaterials;
  professional = currentSession?.role === "professional"
    ? professionals.find((item) => item.id === currentSession.id) || null
    : null;
  $("#syncStatus").textContent = currentSession ? "Supabase sincronizado" : "Supabase conectado";
}

function bindSupabaseSession() {
  onAuthChange((event) => {
    if (event !== "PASSWORD_RECOVERY") return;
    $("#passwordRecoveryPanel").hidden = false;
    $("#passwordRecoveryForm").hidden = true;
    $("#passwordUpdateForm").hidden = false;
    $("#passwordRecoveryTitle").textContent = "Crie uma nova senha";
    activateView("patients");
  });
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

function populatePreferredServices() {
  $("#preferredServiceSelect").innerHTML = [
    `<option value="">Selecione uma unidade</option>`,
    ...services.filter((service) => service.laser).map((service) =>
      `<option value="${escapeHTML(service.name)}">${escapeHTML(service.name)} · ${escapeHTML(getServiceCity(service))}</option>`
    )
  ].join("");
}

function populateProfessionalServices() {
  $("#professionalServiceChecklist").innerHTML = services
    .filter((service) => service.laser)
    .map((service) => serviceCheckboxHTML(service.name, getServiceCity(service)))
    .join("");
}

function serviceCheckboxHTML(name, detail = "Unidade adicionada pelo profissional") {
  return `<label class="service-check-option">
    <input name="serviceNames" type="checkbox" value="${escapeHTML(name)}" />
    <span><strong>${escapeHTML(name)}</strong><small>${escapeHTML(detail)}</small></span>
  </label>`;
}

function addProfessionalService() {
  const fields = {
    name: $("#newProfessionalServiceName"),
    type: $("#newProfessionalServiceType"),
    city: $("#newProfessionalServiceCity"),
    state: $("#newProfessionalServiceState"),
    address: $("#newProfessionalServiceAddress"),
    phone: $("#newProfessionalServicePhone")
  };
  const name = fields.name.value.trim();
  const city = fields.city.value.trim();
  const state = fields.state.value.trim().toUpperCase();
  const streetAddress = fields.address.value.trim();
  if (name.length < 3 || !city || !/^[A-Z]{2}$/.test(state) || streetAddress.length < 5) {
    $("#newServiceMessage").textContent = "Informe nome, cidade, UF com 2 letras e endereço da unidade.";
    fields.name.focus();
    return;
  }
  const checkboxes = Array.from($("#professionalServiceChecklist").querySelectorAll('[name="serviceNames"]'));
  const existing = checkboxes.find((checkbox) => normalize(checkbox.value) === normalize(name));
  if (existing) {
    existing.checked = true;
    existing.closest(".service-check-option")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    $("#newServiceMessage").textContent = "Essa unidade já estava na lista e foi marcada.";
  } else {
    const checkedNames = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    const newService = {
      id: createId("service"),
      name,
      type: fields.type.value,
      category: "Unidade cadastrada pelo profissional",
      specialties: "Atendimento odontológico com laserterapia.",
      laser: true,
      address: `${streetAddress}, ${city}-${state}`,
      city,
      state,
      phone: formatPhone(fields.phone.value),
      access: "Agendamento direto pelo aplicativo",
      hours: "Consultar horários disponíveis na agenda",
      distance: 0,
      custom: true,
      createdAt: new Date().toISOString()
    };
    services.push(newService);
    saveStored("laserOralAidCustomServices", services.filter((service) => service.custom));
    populateProfessionalServices();
    $("#professionalServiceChecklist").querySelectorAll('[name="serviceNames"]').forEach((checkbox) => {
      checkbox.checked = checkedNames.includes(checkbox.value) || checkbox.value === name;
    });
    populatePreferredServices();
    populateServiceCityFilter();
    $("#serviceCityFilter").value = city;
    selectedService = newService;
    renderServices();
    $("#newServiceMessage").textContent = "Nova unidade adicionada à Rede de atendimento e marcada neste cadastro.";
  }
  [fields.name, fields.city, fields.state, fields.address, fields.phone].forEach((field) => { field.value = ""; });
}

function bindNavigation() {
  $$("#navList .nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      activateView(button.dataset.view);
    });
  });
  $$(".home-jump").forEach((button) => {
    button.addEventListener("click", () => activateView(button.dataset.viewTarget));
  });
}

function activateView(view) {
  if (view === "learning" && !["professional", "admin"].includes(currentSession?.role)) {
    setAuthMessage("O módulo de ensino está disponível apenas para profissionais e administradores.");
    view = "patients";
  }
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $$(".view").forEach((viewNode) => viewNode.classList.remove("active"));
  const activeView = $(`#${view}View`);
  activeView.classList.add("active");
  $("#pageTitle").textContent = viewTitles[view] || "Laser Oral Aid";
  if (view === "schedule") renderSchedule();
  if (matchMedia("(max-width: 980px)").matches) {
    activeView.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setupRegistrationPage() {
  const forms = $(".patients-layout");
  $("#registrationForms").append(forms);
  $$('[data-registration-role]').forEach((button) => {
    button.addEventListener("click", () => openRegistrationPage(button.dataset.registrationRole));
  });
  $("#backToAccessBtn").addEventListener("click", () => activateView("patients"));
}

function setupTrackingPage() {
  $("#trackingContent").append($(".patients-panel"));
}

function openRegistrationPage(role, editing = false) {
  const isPatient = role === "patient";
  $(".patient-card").hidden = !isPatient;
  $(".professional-card").hidden = isPatient;
  $("#professionalProfile").hidden = isPatient || !editing;
  if (!editing) {
    if (isPatient) resetPatientForm();
    else resetProfessionalForm();
  }
  $("#registrationPageTitle").textContent = editing
    ? isPatient ? "Editar cadastro do paciente" : "Editar cadastro profissional"
    : isPatient ? "Cadastro de paciente" : "Cadastro profissional";
  $("#registrationPageDescription").textContent = editing
    ? "Atualize seus dados e salve as alterações."
    : "Preencha os dados abaixo para criar seu acesso.";
  activateView("registration");
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
  populateServiceCityFilter();
  $("#serviceCityFilter").addEventListener("change", renderServices);
  $$(".filters input").forEach((input) => input.addEventListener("change", renderServices));
}

function populateServiceCityFilter() {
  const previousCity = $("#serviceCityFilter").value || "all";
  const cities = Array.from(new Set(services.map((service) => getServiceCity(service)).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  $("#serviceCityFilter").innerHTML = [
    `<option value="all">Todas as cidades</option>`,
    ...cities.map((city) => `<option value="${escapeHTML(city)}">${escapeHTML(city)}</option>`)
  ].join("");
  $("#serviceCityFilter").value = cities.includes(previousCity) ? previousCity : "all";
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
      <strong>${escapeHTML(service.name)}</strong>
      <span>${escapeHTML(service.type)} · ${escapeHTML(service.category || "Serviço odontológico")}</span>
      <p>${escapeHTML(service.specialties)}</p>
      <p>${escapeHTML(service.address)}<br>${escapeHTML([service.phone, service.email].filter(Boolean).join(" · "))}<br>${escapeHTML(service.hours)}</p>
      <div class="badge-row">
        <span class="badge">${service.custom ? "Unidade cadastrada" : `${service.distance} km`}</span>
        <span class="badge ${service.laser ? "" : "warn"}">${service.laser ? "Laserterapia cadastrada" : "Sem laser cadastrado"}</span>
        ${service.access ? `<span class="badge">${escapeHTML(service.access)}</span>` : ""}
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
  if (service.city) return service.city;
  const match = service.address.match(/,\s*([^,]+?)-[A-Z]{2}\b/);
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
  $("#patientForm").elements.phone.addEventListener("input", (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value);
  });

  $("#addProfessionalServiceBtn").addEventListener("click", addProfessionalService);
  $("#newProfessionalServiceName").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addProfessionalService();
  });
  $("#newProfessionalServiceState").addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase();
  });

  $$('[data-recovery-role]').forEach((button) => {
    button.addEventListener('click', () => openPasswordRecovery(button.dataset.recoveryRole));
  });
  $('#closePasswordRecoveryBtn').addEventListener('click', closePasswordRecovery);
  $('#cancelPasswordRecoveryBtn').addEventListener('click', closePasswordRecovery);
  $('#passwordRecoveryForm').addEventListener('submit', handlePasswordRecovery);
  $('#passwordUpdateForm').addEventListener('submit', handlePasswordUpdate);

  $("#patientLoginForm").addEventListener("submit", (event) => handleLogin(event, "patient"));
  $("#professionalLoginForm").addEventListener("submit", (event) => handleLogin(event, "professional"));
  $("#adminLoginForm").addEventListener("submit", (event) => handleLogin(event, "admin"));

  $("#patientForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const id = currentSession?.role === "patient" ? currentSession.id : data.id || "";
    const patient = {
      id,
      email: data.email.trim(),
      name: data.name.trim(),
      phone: formatPhone(data.phone),
      age: data.age.trim(),
      sex: data.sex,
      city: data.city.trim(),
      address: data.address.trim(),
      therapyPlace: data.therapyPlace.trim(),
      preferredService: data.preferredService,
      notes: data.notes.trim(),
      createdAt: patients.find((item) => item.id === id)?.createdAt
    };
    setFormBusy(form, true);
    try {
      if (!id) {
        if (currentSession) throw new Error("Saia da sessão atual antes de criar outro acesso.");
        const result = await signUp("patient", data);
        form.reset();
        setAuthMessage(result.requiresConfirmation
          ? `Cadastro criado. Confirme o e-mail enviado para ${result.email}.`
          : "Cadastro criado e conectado com segurança.");
        if (!result.requiresConfirmation) await refreshBackendData();
      } else {
        const saved = await savePatientRecord(patient);
        patients = patients.map((item) => item.id === saved.id ? saved : item);
        setPatientForm(saved);
        setAuthMessage("Cadastro do paciente atualizado no Supabase.");
      }
      renderPatientModule();
      renderSummary();
      activateView("patients");
    } catch (error) {
      setAuthMessage(error.message);
    } finally {
      setFormBusy(form, false);
    }
  });

  $("#professionalForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (currentSession?.role === "patient") {
      setAuthMessage("O paciente pode editar apenas o próprio cadastro.");
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const selectedServices = Array.from(form.querySelectorAll('[name="serviceNames"]:checked')).map((input) => input.value);
    const serviceNames = [...new Set(selectedServices)];
    if (!serviceNames.length) {
      setAuthMessage("Selecione ou informe pelo menos uma unidade que ofereça laserterapia.");
      return;
    }
    const id = currentSession?.role === "professional" ? currentSession.id : data.id || "";
    professional = {
      id,
      email: data.email.trim(),
      name: data.name.trim(),
      registry: data.registry.trim(),
      city: data.city.trim(),
      workplace: data.workplace.trim(),
      serviceNames,
      serviceName: serviceNames[0]
    };
    setFormBusy(form, true);
    try {
      if (!id) {
        if (currentSession) throw new Error("Saia da sessão atual antes de criar outro acesso.");
        const result = await signUp("professional", data, serviceNames);
        form.reset();
        setAuthMessage(result.requiresConfirmation
          ? `Cadastro criado. Confirme o e-mail enviado para ${result.email}.`
          : "Cadastro profissional criado e conectado com segurança.");
        if (!result.requiresConfirmation) await refreshBackendData();
      } else {
        const saved = await saveProfessionalRecord(professional);
        professionals = professionals.map((item) => item.id === saved.id ? saved : item);
        professional = saved;
        setProfessionalForm(saved);
        setAuthMessage("Cadastro profissional atualizado no Supabase.");
      }
      renderPatientModule();
      renderSummary();
      activateView("patients");
    } catch (error) {
      setAuthMessage(error.message);
    } finally {
      setFormBusy(form, false);
    }
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

function openPasswordRecovery(role) {
  const loginForms = {
    patient: "#patientLoginForm",
    professional: "#professionalLoginForm",
    admin: "#adminLoginForm"
  };
  const loginForm = $(loginForms[role] || "#patientLoginForm");
  const form = $("#passwordRecoveryForm");
  form.reset();
  form.hidden = false;
  $("#passwordUpdateForm").hidden = true;
  form.elements.email.value = loginForm.elements.email.value.trim();
  $("#passwordRecoveryTitle").textContent = "Recuperar acesso";
  $("#passwordRecoveryPanel").hidden = false;
  setAuthMessage("Enviaremos um link seguro para redefinir sua senha.");
  form.elements.email.focus();
}

function closePasswordRecovery() {
  $("#passwordRecoveryForm").reset();
  $("#passwordRecoveryForm").hidden = false;
  $("#passwordUpdateForm").reset();
  $("#passwordUpdateForm").hidden = true;
  $("#passwordRecoveryPanel").hidden = true;
}

async function handlePasswordRecovery(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  setFormBusy(form, true);
  try {
    await sendPasswordReset(data.email);
    closePasswordRecovery();
    setAuthMessage("Link de recuperação enviado. Verifique sua caixa de entrada.");
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    setFormBusy(form, false);
  }
}

async function handlePasswordUpdate(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  if (data.newPassword !== data.confirmPassword) {
    setAuthMessage("A confirmação não corresponde à nova senha.");
    return;
  }
  setFormBusy(form, true);
  try {
    await updatePassword(data.newPassword);
    closePasswordRecovery();
    setAuthMessage("Senha atualizada com segurança.");
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    setFormBusy(form, false);
  }
}

async function handleLogin(event, expectedRole) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  setFormBusy(form, true);
  try {
    await signIn(data.email, data.password, expectedRole);
    await refreshBackendData();
    form.reset();
    setAuthMessage("Acesso autenticado e dados sincronizados.");
    renderPatientModule();
    renderSummary();
    activateView("patients");
  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    setFormBusy(form, false);
  }
}

function setFormBusy(form, busy) {
  form.querySelectorAll("button, input, select, textarea").forEach((field) => {
    field.disabled = busy;
  });
}

function renderPatientModule() {
  updateRoleNavigation();
  professional = getCurrentProfessional() || professional;
  if (professional && (currentSession?.role === "professional" || currentSession?.role === "admin")) {
    setProfessionalForm(professional);
    if (currentSession?.role !== "admin" && !$("#cityPatientFilter").value) $("#cityPatientFilter").value = professional.city || "";
  } else if (currentSession?.role === "patient") {
    resetProfessionalForm();
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
  renderSchedule();
}

function updateRoleNavigation() {
  const canAccessLearning = ["professional", "admin"].includes(currentSession?.role);
  $$('[data-restricted-roles]').forEach((item) => {
    const roles = item.dataset.restrictedRoles.split(",");
    item.hidden = !roles.includes(currentSession?.role);
  });
  renderLearning();
  if ($("#learningView").classList.contains("active") && !canAccessLearning) {
    activateView("patients");
  }
}

function renderSessionBox() {
  const box = $("#sessionBox");
  const patient = getCurrentPatient();
  if (currentSession?.role === "patient" && patient) {
    box.innerHTML = `
      <strong>Paciente conectado: ${escapeHTML(patient.name)}</strong>
      <span>${escapeHTML(patient.city)} · ${escapeHTML(patient.therapyPlace)}</span>
      <div class="session-actions">
        <button class="secondary" id="editOwnProfileBtn" type="button">Editar meu cadastro</button>
        <button class="secondary" id="logoutBtn" type="button">Sair</button>
      </div>
    `;
  } else if (currentSession?.role === "professional" && professional) {
    box.innerHTML = `
      <strong>Profissional conectado: ${escapeHTML(professional.name)}</strong>
      <span>${escapeHTML(professional.registry)} · ${escapeHTML(professional.city)}</span>
      <div class="session-actions">
        <button class="secondary" id="editOwnProfileBtn" type="button">Editar meu cadastro</button>
        <button class="primary" id="openTrackingBtn" type="button">Abrir acompanhamento</button>
        <button class="secondary" id="logoutBtn" type="button">Sair</button>
      </div>
    `;
  } else if (currentSession?.role === "admin") {
    box.innerHTML = `
      <strong>Administrador conectado</strong>
      <span>${escapeHTML(currentSession.email)} · acesso protegido pelo Supabase.</span>
      <button class="secondary" id="logoutBtn" type="button">Sair</button>
    `;
  } else {
    box.innerHTML = `<span class="muted">Entre para editar cadastro, acompanhar pacientes por cidade ou administrar todos os registros.</span>`;
  }
  $("#editOwnProfileBtn")?.addEventListener("click", () => {
    if (currentSession?.role === "patient" && patient) {
      setPatientForm(patient);
      setAuthMessage("Seu cadastro está pronto para edição.");
      openRegistrationPage("patient", true);
      return;
    }
    if (currentSession?.role === "professional" && professional) {
      setProfessionalForm(professional);
      setAuthMessage("Seu cadastro profissional está pronto para edição.");
      openRegistrationPage("professional", true);
    }
  });
  $("#openTrackingBtn")?.addEventListener("click", () => activateView("tracking"));
  $("#logoutBtn")?.addEventListener("click", async () => {
    try {
      await signOut();
      currentSession = null;
      patients = [];
      professionals = [];
      professional = null;
      availabilities = [];
      appointments = [];
      setAuthMessage("Sessão encerrada.");
      resetPatientForm();
      renderPatientModule();
      renderSummary();
    } catch (error) {
      setAuthMessage(error.message);
    }
  });
}

function renderProfessionalProfile() {
  const profile = $("#professionalProfile");
  if (currentSession?.role === "patient") {
    profile.innerHTML = `<p class="muted">Seu acesso permite editar apenas o cadastro de paciente conectado.</p>`;
    return;
  }
  if (!professional) {
    profile.innerHTML = `<p class="muted">Cadastre o profissional para listar automaticamente os pacientes que moram na mesma cidade.</p>`;
    return;
  }
  profile.innerHTML = `
    <strong>${escapeHTML(professional.name)}</strong>
    <p class="muted">${escapeHTML(professional.registry)} · ${escapeHTML(professional.city)} · ${escapeHTML(professional.email || "e-mail protegido")}</p>
    <p>${escapeHTML(getProfessionalServiceNames(professional).join(" · ") || "Serviço de atendimento não selecionado")}</p>
    <p class="muted">${escapeHTML(professional.workplace || "Local de trabalho não informado")}</p>
  `;
}

function renderPatientList() {
  const isAdmin = currentSession?.role === "admin";
  const isProfessional = currentSession?.role === "professional" && professional;
  const cityFilter = $("#cityPatientFilter");
  cityFilter.disabled = !isAdmin;
  if (isProfessional) cityFilter.value = professional.city || "";
  if (!currentSession || currentSession.role === "patient") cityFilter.value = "";
  $("#cityPatientFilterLabel").textContent = isProfessional ? "Cidade do profissional" : "Filtrar cidade";
  $("#trackingAccessSummary").textContent = isProfessional
    ? `Exibindo exclusivamente pacientes cadastrados em ${professional.city}.`
    : isAdmin
      ? "Acesso administrativo a pacientes de todas as cidades."
      : currentSession?.role === "patient"
        ? "Você pode consultar e atualizar o seu próprio cadastro."
        : "Entre como profissional para consultar os pacientes cadastrados na sua cidade.";
  const city = isAdmin ? normalize(cityFilter.value) : isProfessional ? normalize(professional.city) : "";
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
  $("#patientListTitle").textContent = isAdmin
    ? "Todos os pacientes cadastrados"
    : isProfessional
      ? `Pacientes cadastrados em ${professional.city}`
      : "Meu cadastro de acompanhamento";
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
        <dt>Telefone</dt><dd>${escapeHTML(patient.phone || "Não informado")}</dd>
        <dt>Endereço</dt><dd>${escapeHTML(patient.address)}</dd>
        <dt>Laserterapia</dt><dd>${escapeHTML(patient.therapyPlace)}</dd>
        <dt>Preferência</dt><dd>${escapeHTML(patient.preferredService || "Não informada")}</dd>
        <dt>Observações</dt><dd>${escapeHTML(patient.notes || "Sem observações")}</dd>
      </dl>
      <div class="patient-actions">
        ${(isAdmin || currentSession?.id === patient.id) ? `<button class="secondary" data-edit-patient="${patient.id}" type="button">Editar</button>` : ""}
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
      openRegistrationPage("patient", true);
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
          <span class="muted">${escapeHTML(item.registry)} · ${escapeHTML(item.email || "e-mail protegido")}</span>
        </div>
        <span class="badge">${escapeHTML(item.city)}</span>
      </header>
      <dl>
        <dt>Unidades</dt><dd>${escapeHTML(getProfessionalServiceNames(item).join(" · ") || "Não selecionadas")}</dd>
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
      setProfessionalForm(selected);
      setAuthMessage("Cadastro profissional carregado para edição.");
      openRegistrationPage("professional", true);
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

function bindSchedule() {
  $("#scheduleAccessBtn").addEventListener("click", () => activateView("patients"));
  $("#availabilityForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const activeProfessional = getCurrentProfessional();
    if (currentSession?.role !== "professional" || !activeProfessional) {
      setScheduleMessage("Entre como profissional para publicar horários.");
      return;
    }
    const professionalServices = getProfessionalServiceNames(activeProfessional);
    if (!professionalServices.length) {
      setScheduleMessage("Edite seu cadastro e selecione o serviço onde você atende.");
      return;
    }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!professionalServices.includes(data.serviceName)) {
      setScheduleMessage("Selecione uma das unidades vinculadas ao seu cadastro.");
      return;
    }
    if (data.date < localDateKey()) {
      setScheduleMessage("Escolha uma data de hoje em diante.");
      return;
    }
    if (timeToMinutes(data.end) <= timeToMinutes(data.start)) {
      setScheduleMessage("O horário final deve ser posterior ao horário inicial.");
      return;
    }
    if (timeToMinutes(data.end) - timeToMinutes(data.start) < Number(data.interval)) {
      setScheduleMessage("A faixa informada precisa comportar pelo menos uma consulta.");
      return;
    }
    const overlaps = availabilities.some((item) =>
      item.professionalId === activeProfessional.id && item.date === data.date &&
      timeToMinutes(data.start) < timeToMinutes(item.end) && timeToMinutes(data.end) > timeToMinutes(item.start)
    );
    if (overlaps) {
      setScheduleMessage("Já existe uma faixa de horários que se sobrepõe a esse período.");
      return;
    }
    const record = {
      professionalId: activeProfessional.id,
      serviceName: data.serviceName,
      date: data.date,
      start: data.start,
      end: data.end,
      interval: Number(data.interval)
    };
    setFormBusy(event.currentTarget, true);
    try {
      availabilities.push(await createRemoteAvailability(record));
      setScheduleMessage("Horários publicados e sincronizados.");
      renderSchedule();
    } catch (error) {
      setScheduleMessage(error.message);
    } finally {
      setFormBusy(event.currentTarget, false);
    }
  });

  ["#bookingServiceSelect", "#bookingProfessionalSelect", "#bookingDateSelect"].forEach((selector) => {
    $(selector).addEventListener("change", () => populateBookingSelectors(selector));
  });

  $("#bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const patient = getCurrentPatient();
    if (!patient) {
      setScheduleMessage("Entre como paciente para confirmar o agendamento.");
      return;
    }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const [availabilityId, time] = String(data.slot || "").split("|");
    const availability = availabilities.find((item) => item.id === availabilityId);
    const selectedProfessional = professionals.find((item) => item.id === data.professionalId);
    const occupied = appointments.some((item) => item.availabilityId === availabilityId && item.time === time && item.status !== "cancelled");
    const validSlot = availability && generateSlots(availability).includes(time);
    if (!availability || !selectedProfessional || availability.professionalId !== selectedProfessional.id ||
      availability.serviceName !== data.serviceName || availability.date !== data.date || availability.date < localDateKey() || !validSlot || occupied) {
      setScheduleMessage("Este horário não está mais disponível. Escolha outro.");
      renderSchedule();
      return;
    }
    const record = {
      availabilityId,
      professionalId: selectedProfessional.id,
      patientId: patient.id,
      serviceName: availability.serviceName,
      date: availability.date,
      time,
      notes: data.notes.trim()
    };
    setFormBusy(event.currentTarget, true);
    try {
      appointments.push(await createRemoteAppointment(record));
      event.currentTarget.elements.notes.value = "";
      setScheduleMessage("Agendamento confirmado e sincronizado.");
      renderSchedule();
    } catch (error) {
      setScheduleMessage(error.message.includes("appointments_active_slot_idx")
        ? "Este horário acabou de ser reservado. Escolha outro."
        : error.message);
      await refreshBackendData();
      renderSchedule();
    } finally {
      setFormBusy(event.currentTarget, false);
    }
  });
}

function renderSchedule() {
  if (!$("#scheduleView")) return;
  const role = currentSession?.role;
  const activeProfessional = getCurrentProfessional();
  const patient = getCurrentPatient();
  const hasSession = ["patient", "professional", "admin"].includes(role);
  $("#scheduleAccessBtn").hidden = hasSession;
  $("#availabilityForm").hidden = role !== "professional";
  $("#bookingForm").hidden = role !== "patient";
  $("#scheduleHelp").hidden = hasSession;
  $("#scheduleRecords").hidden = !hasSession;

  if (role === "professional" && activeProfessional) {
    const professionalServices = getProfessionalServiceNames(activeProfessional);
    $("#scheduleIntro").textContent = "Publique horários por unidade e acompanhe as reservas recebidas.";
    $("#availabilityServiceLabel").textContent = professionalServices.length
      ? `${professionalServices.length} ${professionalServices.length === 1 ? "unidade vinculada" : "unidades vinculadas"} ao seu cadastro.`
      : "Selecione pelo menos uma unidade no seu cadastro antes de publicar horários.";
    const availabilityServiceSelect = $("#availabilityServiceSelect");
    const previousService = availabilityServiceSelect.value;
    availabilityServiceSelect.innerHTML = optionList("Selecione uma unidade", professionalServices.map((name) => [name, name]));
    if (professionalServices.includes(previousService)) availabilityServiceSelect.value = previousService;
    const dateInput = $("#availabilityForm").elements.date;
    dateInput.min = localDateKey();
    if (!dateInput.value || dateInput.value < dateInput.min) dateInput.value = dateInput.min;
  } else if (role === "patient" && patient) {
    $("#scheduleIntro").textContent = `Olá, ${patient.name}. Escolha um horário publicado pelos profissionais da rede.`;
    populateBookingSelectors();
  } else if (role === "admin") {
    $("#scheduleIntro").textContent = "Visualize todos os horários publicados e agendamentos deste dispositivo.";
  } else {
    $("#scheduleIntro").textContent = "Entre como paciente para agendar ou como profissional para publicar horários.";
  }
  renderAppointmentList();
}

function populateBookingSelectors(changedSelector = "") {
  const serviceSelect = $("#bookingServiceSelect");
  const professionalSelect = $("#bookingProfessionalSelect");
  const dateSelect = $("#bookingDateSelect");
  const slotSelect = $("#bookingSlotSelect");
  const future = availabilities.filter((item) => item.date >= localDateKey());
  const previousService = serviceSelect.value;
  const servicesWithAvailability = [...new Set(future.map((item) => item.serviceName).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  serviceSelect.innerHTML = optionList("Selecione um serviço", servicesWithAvailability.map((name) => [name, name]));
  if (servicesWithAvailability.includes(previousService)) serviceSelect.value = previousService;

  const serviceName = serviceSelect.value;
  const professionalIds = [...new Set(future.filter((item) => item.serviceName === serviceName).map((item) => item.professionalId))];
  const availableProfessionals = professionalIds.map((id) => professionals.find((item) => item.id === id)).filter(Boolean);
  const previousProfessional = professionalSelect.value;
  professionalSelect.innerHTML = optionList("Selecione um profissional", availableProfessionals.map((item) => [item.id, `${item.name} · ${item.registry}`]));
  if (changedSelector !== "#bookingServiceSelect" && availableProfessionals.some((item) => item.id === previousProfessional)) professionalSelect.value = previousProfessional;

  const professionalId = professionalSelect.value;
  const dates = [...new Set(future.filter((item) => item.professionalId === professionalId && item.serviceName === serviceName).map((item) => item.date))].sort();
  const previousDate = dateSelect.value;
  dateSelect.innerHTML = optionList("Selecione uma data", dates.map((date) => [date, formatScheduleDate(date)]));
  if (changedSelector !== "#bookingProfessionalSelect" && dates.includes(previousDate)) dateSelect.value = previousDate;

  const date = dateSelect.value;
  const slotOptions = future
    .filter((item) => item.professionalId === professionalId && item.serviceName === serviceName && item.date === date)
    .flatMap((item) => generateSlots(item).map((time) => ({ item, time })))
    .filter(({ item, time }) => !appointments.some((appointment) => appointment.availabilityId === item.id && appointment.time === time && appointment.status !== "cancelled"))
    .sort((a, b) => a.time.localeCompare(b.time));
  slotSelect.innerHTML = optionList("Selecione um horário", slotOptions.map(({ item, time }) => [`${item.id}|${time}`, time]));

  const submit = $("#bookingForm").querySelector('button[type="submit"]');
  submit.disabled = slotOptions.length === 0;
}

function renderAppointmentList() {
  const list = $("#appointmentList");
  const role = currentSession?.role;
  const activeProfessional = getCurrentProfessional();
  const patient = getCurrentPatient();
  let visibleAppointments = appointments;
  let visibleAvailability = availabilities;
  if (role === "patient" && patient) {
    visibleAppointments = appointments.filter((item) => item.patientId === patient.id);
    visibleAvailability = [];
    $("#scheduleRecordsTitle").textContent = "Meus agendamentos";
  } else if (role === "professional" && activeProfessional) {
    visibleAppointments = appointments.filter((item) => item.professionalId === activeProfessional.id);
    visibleAvailability = availabilities.filter((item) => item.professionalId === activeProfessional.id);
    $("#scheduleRecordsTitle").textContent = "Minha agenda";
  } else if (role === "admin") {
    $("#scheduleRecordsTitle").textContent = "Agenda da rede";
  } else {
    list.innerHTML = "";
    return;
  }
  visibleAppointments.sort(compareScheduleItems);
  visibleAvailability.sort(compareScheduleItems);
  const availabilityCards = visibleAvailability.filter((item) => item.date >= localDateKey()).map((item) => {
    const activeBookings = appointments.filter((appointment) => appointment.availabilityId === item.id && appointment.status !== "cancelled").length;
    const totalSlots = generateSlots(item).length;
    const owner = professionals.find((professionalItem) => professionalItem.id === item.professionalId);
    const canRemove = role === "admin" || (role === "professional" && activeProfessional?.id === item.professionalId);
    return `<article class="appointment-card availability-card">
      <header><div><span class="appointment-type">Horários publicados</span><strong>${formatScheduleDate(item.date)} · ${item.start}–${item.end}</strong></div><span class="badge">${activeBookings}/${totalSlots} reservados</span></header>
      <p>${escapeHTML(item.serviceName)}${role === "admin" && owner ? `<br>${escapeHTML(owner.name)}` : ""}</p>
      ${canRemove ? `<div class="patient-actions"><button class="secondary" data-remove-availability="${item.id}" type="button">Remover faixa</button></div>` : ""}
    </article>`;
  });
  const appointmentCards = visibleAppointments.map((item) => {
    const appointmentPatient = patients.find((patientItem) => patientItem.id === item.patientId);
    const appointmentProfessional = professionals.find((professionalItem) => professionalItem.id === item.professionalId);
    const canCancel = item.status !== "cancelled" && (role === "admin" || patient?.id === item.patientId || activeProfessional?.id === item.professionalId);
    return `<article class="appointment-card ${item.status === "cancelled" ? "is-cancelled" : ""}">
      <header><div><span class="appointment-type">Consulta</span><strong>${formatScheduleDate(item.date)} · ${item.time}</strong></div><span class="badge ${item.status === "cancelled" ? "warn" : ""}">${item.status === "cancelled" ? "Cancelado" : "Confirmado"}</span></header>
      <dl>
        <dt>Serviço</dt><dd>${escapeHTML(item.serviceName)}</dd>
        ${role !== "patient" ? `<dt>Paciente</dt><dd>${escapeHTML(appointmentPatient?.name || "Cadastro indisponível")}${appointmentPatient?.phone ? ` · ${escapeHTML(appointmentPatient.phone)}` : ""}</dd>` : ""}
        ${role !== "professional" ? `<dt>Profissional</dt><dd>${escapeHTML(appointmentProfessional?.name || "Cadastro indisponível")}</dd>` : ""}
        <dt>Motivo</dt><dd>${escapeHTML(item.notes || "Não informado")}</dd>
      </dl>
      ${canCancel ? `<div class="patient-actions"><button class="secondary" data-cancel-appointment="${item.id}" type="button">Cancelar agendamento</button></div>` : ""}
    </article>`;
  });
  list.innerHTML = [...availabilityCards, ...appointmentCards].join("") || `<p class="muted">Nenhum horário ou agendamento encontrado.</p>`;
  $$('[data-cancel-appointment]').forEach((button) => button.addEventListener("click", async () => {
    try {
      const updated = await cancelRemoteAppointment(button.dataset.cancelAppointment);
      appointments = appointments.map((item) => item.id === updated.id ? updated : item);
      setScheduleMessage("Agendamento cancelado e sincronizado.");
      renderSchedule();
    } catch (error) {
      setScheduleMessage(error.message);
    }
  }));
  $$('[data-remove-availability]').forEach((button) => button.addEventListener("click", async () => {
    const hasBookings = appointments.some((item) => item.availabilityId === button.dataset.removeAvailability && item.status !== "cancelled");
    if (hasBookings) {
      setScheduleMessage("Cancele os agendamentos ativos desta faixa antes de removê-la.");
      return;
    }
    try {
      await deleteRemoteAvailability(button.dataset.removeAvailability);
      availabilities = availabilities.filter((item) => item.id !== button.dataset.removeAvailability);
      setScheduleMessage("Faixa de horários removida do Supabase.");
      renderSchedule();
    } catch (error) {
      setScheduleMessage(error.message);
    }
  }));
}

function generateSlots(availability) {
  const slots = [];
  const end = timeToMinutes(availability.end);
  const interval = Number(availability.interval) || 30;
  for (let minutes = timeToMinutes(availability.start); minutes + interval <= end; minutes += interval) {
    slots.push(`${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`);
  }
  return slots;
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value || "0:0").split(":").map(Number);
  return hours * 60 + minutes;
}

function localDateKey() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function formatScheduleDate(value) {
  if (!value) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function compareScheduleItems(a, b) {
  return `${a.date}${a.time || a.start || ""}`.localeCompare(`${b.date}${b.time || b.start || ""}`);
}

function optionList(placeholder, entries) {
  return [`<option value="">${escapeHTML(placeholder)}</option>`, ...entries.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`)].join("");
}

function setScheduleMessage(message) {
  $("#scheduleMessage").textContent = message;
}

function setPatientForm(patient) {
  const form = $("#patientForm");
  form.elements.id.value = patient.id || "";
  form.elements.email.value = patient.email || "";
  form.elements.email.readOnly = true;
  form.elements.password.value = "";
  form.elements.password.required = false;
  form.elements.password.closest("label").hidden = true;
  form.elements.name.value = patient.name || "";
  form.elements.phone.value = patient.phone || "";
  form.elements.age.value = patient.age || "";
  form.elements.sex.value = patient.sex || "";
  form.elements.city.value = patient.city || "";
  form.elements.address.value = patient.address || "";
  form.elements.therapyPlace.value = patient.therapyPlace || "";
  if (patient.preferredService && !Array.from(form.elements.preferredService.options).some((option) => option.value === patient.preferredService)) {
    form.elements.preferredService.add(new Option(patient.preferredService, patient.preferredService));
  }
  form.elements.preferredService.value = patient.preferredService || "";
  form.elements.notes.value = patient.notes || "";
  $("#patientFormTitle").textContent = "Editar cadastro do paciente";
  $("#savePatientBtn").textContent = "Atualizar paciente";
  $("#cancelPatientEditBtn").hidden = false;
}

function setProfessionalForm(item) {
  const form = $("#professionalForm");
  form.elements.id.value = item.id || "";
  form.elements.email.value = item.email || "";
  form.elements.email.readOnly = true;
  form.elements.password.value = "";
  form.elements.password.required = false;
  form.elements.password.closest("label").hidden = true;
  form.elements.name.value = item.name || "";
  form.elements.registry.value = item.registry || "";
  form.elements.city.value = item.city || "";
  form.elements.workplace.value = item.workplace || "";
  const serviceNames = getProfessionalServiceNames(item);
  const knownServices = new Set(services.filter((service) => service.laser).map((service) => service.name));
  populateProfessionalServices();
  serviceNames.filter((name) => !knownServices.has(name)).forEach((name) => {
    $("#professionalServiceChecklist").insertAdjacentHTML("beforeend", serviceCheckboxHTML(name));
  });
  form.querySelectorAll('[name="serviceNames"]').forEach((input) => {
    input.checked = serviceNames.includes(input.value);
  });
  resetNewServiceFields();
  $("#newServiceMessage").textContent = "A unidade será adicionada à Rede de atendimento e ficará marcada neste cadastro.";
  $("#professionalFormTitle").textContent = "Editar cadastro profissional";
  $("#saveProfessionalBtn").textContent = "Atualizar meu cadastro";
}

function resetProfessionalForm() {
  const form = $("#professionalForm");
  form.reset();
  form.elements.email.readOnly = false;
  form.elements.password.required = true;
  form.elements.password.closest("label").hidden = false;
  populateProfessionalServices();
  resetNewServiceFields();
  form.elements.id.value = "";
  $("#newServiceMessage").textContent = "A unidade será adicionada à Rede de atendimento e ficará marcada neste cadastro.";
  $("#professionalFormTitle").textContent = "Cadastro profissional";
  $("#saveProfessionalBtn").textContent = "Salvar profissional";
}

function resetPatientForm() {
  const form = $("#patientForm");
  form.reset();
  form.elements.email.readOnly = false;
  form.elements.password.required = true;
  form.elements.password.closest("label").hidden = false;
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

function getProfessionalServiceNames(item) {
  if (!item) return [];
  if (Array.isArray(item.serviceNames)) return item.serviceNames.filter(Boolean);
  return item.serviceName ? [item.serviceName] : [];
}

function resetNewServiceFields() {
  ["#newProfessionalServiceName", "#newProfessionalServiceCity", "#newProfessionalServiceState", "#newProfessionalServiceAddress", "#newProfessionalServicePhone"]
    .forEach((selector) => { $(selector).value = ""; });
  $("#newProfessionalServiceType").value = "SUS";
}

function setAuthMessage(message) {
  $("#authMessage").textContent = message;
}

function renderLearning() {
  if (!["professional", "admin"].includes(currentSession?.role)) {
    $("#learningGrid").innerHTML = "";
    $("#materialList").innerHTML = "";
    return;
  }
  $("#learningGrid").innerHTML = learning.map((item) => `
    <article class="learning-card">
      <h2>${item.title}</h2>
      <p>${item.text}</p>
    </article>
  `).join("");
  renderEducationalMaterials();
}

function bindLearningMaterials() {
  $("#materialUploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = form.elements.file.files[0];
    setFormBusy(form, true);
    setMaterialMessage("Enviando PDF...");
    try {
      const material = await uploadRemoteEducationalMaterial(currentSession, {
        title: String(data.get("title") || ""),
        description: String(data.get("description") || ""),
        file
      });
      educationalMaterials.unshift(material);
      form.reset();
      setMaterialMessage("Material publicado com sucesso.");
      renderEducationalMaterials();
    } catch (error) {
      setMaterialMessage(error.message);
    } finally {
      setFormBusy(form, false);
    }
  });
}

function renderEducationalMaterials() {
  const list = $("#materialList");
  list.innerHTML = educationalMaterials.map((material) => {
    const author = professionals.find((item) => item.id === material.authorId);
    const canDelete = currentSession?.role === "admin" || currentSession?.id === material.authorId;
    return `
      <article class="material-card">
        <div>
          <h3>${escapeHTML(material.title)}</h3>
          ${material.description ? `<p>${escapeHTML(material.description)}</p>` : ""}
          <p class="material-meta">
            ${escapeHTML(author?.name || "Profissional/administrador")} ·
            ${escapeHTML(new Date(material.createdAt).toLocaleDateString("pt-BR"))} ·
            ${escapeHTML(formatFileSize(material.fileSize))}
          </p>
          <small>${escapeHTML(material.originalFilename)}</small>
        </div>
        <div class="material-actions">
          <button class="secondary" data-open-material="${material.id}" type="button">Abrir PDF</button>
          ${canDelete ? `<button class="secondary material-delete" data-delete-material="${material.id}" type="button">Remover</button>` : ""}
        </div>
      </article>
    `;
  }).join("") || `<p class="muted">Nenhum PDF foi publicado ainda.</p>`;

  $$('[data-open-material]').forEach((button) => {
    button.addEventListener("click", async () => {
      const material = educationalMaterials.find((item) => item.id === button.dataset.openMaterial);
      if (!material) return;
      button.disabled = true;
      setMaterialMessage("Preparando acesso seguro ao PDF...");
      try {
        const url = await createEducationalMaterialUrl(material.storagePath);
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
        setMaterialMessage("");
      } catch (error) {
        setMaterialMessage(error.message);
      } finally {
        button.disabled = false;
      }
    });
  });

  $$('[data-delete-material]').forEach((button) => {
    button.addEventListener("click", async () => {
      const material = educationalMaterials.find((item) => item.id === button.dataset.deleteMaterial);
      if (!material || !window.confirm(`Remover o material “${material.title}”?`)) return;
      button.disabled = true;
      try {
        await deleteRemoteEducationalMaterial(material);
        educationalMaterials = educationalMaterials.filter((item) => item.id !== material.id);
        setMaterialMessage("Material removido.");
        renderEducationalMaterials();
      } catch (error) {
        setMaterialMessage(error.message);
        button.disabled = false;
      }
    });
  });
}

function setMaterialMessage(message) {
  $("#materialMessage").textContent = message;
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".0", "")} MB`;
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

function createId(prefix = "record") {
  return globalThis.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

function formatPhone(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init().catch((error) => {
  console.error(error);
  const status = document.querySelector("#syncStatus");
  const message = document.querySelector("#authMessage");
  if (status) status.textContent = "Falha na sincronização";
  if (message) message.textContent = `Não foi possível conectar ao Supabase: ${error.message}`;
});
