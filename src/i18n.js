/*
 * Copyright (c) 2018, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const i18nConfig = {
  "en-US": {
    "Type the link and press enter": "Type the link and press enter",
    "Invalid Link": "Invalid Link",
    "Can't show plugin, component {{type}} not found.":
      "Can't show plugin, component {{type}} not found.",
    "Can't show plugin, component not found.":
      "Can't show plugin, component not found.",
    "Block List": "Block List",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Something went wrong in component '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Something went wrong with the component type."
  },
  "pt-BR": {
    "Type the link and press enter": "Digite o link e pressione enter",
    "Invalid Link": "Link inválido",
    "Can't show plugin, component {{type}} not found.":
      "Não é possível exibir o plugin, componente {{type}} não encontrado.",
    "Can't show plugin, component not found.":
      "Não é possível exibir o plugin, componente não encontrado.",
    "Block List": "Lista de Blocos",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Algo está errado no componente '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Algo está errado com o tipo do componente."
  },
  "fr-FR": {
    "Type the link and press enter": "Tapez le lien et appuyez sur Entrée",
    "Invalid Link": "Lien invalide",
    "Can't show plugin, component {{type}} not found.":
      "Impossible d'afficher le plug-in, composant {{type}} introuvable.",
    "Can't show plugin, component not found.":
      "Impossible d'afficher le plug-in, composant introuvable.",
    "Block List": "Liste de blocage",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Une erreur s'est produite dans le composant '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Une erreur s'est produite avec le type de composant."
  },
  "de-DE": {
    "Type the link and press enter":
      "Geben Sie den Link ein und drücken Sie die Eingabetaste",
    "Invalid Link": "Ungültiger Link",
    "Can't show plugin, component {{type}} not found.":
      "Plugin kann nicht angezeigt werden, Komponente {{type}} nicht gefunden.",
    "Can't show plugin, component not found.":
      "Plugin kann nicht angezeigt werden, Komponente nicht gefunden.",
    "Block List": "Blockliste",
    "Something went wrong in component '{{type}}'. {{error}}":
      "In Komponente '{{type}}' ist ein Fehler aufgetreten. {{error}}",
    "Something went wrong with the component type.":
      "Beim Komponententyp ist etwas schief gelaufen."
  },
  "tr-TR": {
    "Type the link and press enter": "Linki yazınız ve enter tuşuna basınız",
    "Invalid Link": "Geçersiz Link",
    "Can't show plugin, component {{type}} not found.":
      "Eklenti gösterilemiyor, {{type}} bileşeni bulunamadı.",
    "Can't show plugin, component not found.":
      "Eklenti gösterilemiyor, bileşen bulunamadı.",
    "Block List": "Blok Listesi",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Bileşen içerisinde hata mevcuttur '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Bileşen tipiyle ilgili hata mevcuttur."
  }
};

export const replaceData = (str, data) => {
  const rgx = /{{\s?(\w+)\s?}}/gm;
  let msg = str;
  msg = msg.replace(rgx, (_, key) => data[key]);
  return msg;
};

export default i18nConfig;
