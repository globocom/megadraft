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
      "Não é possível exibir o plugin, componente {{type}} não encontrado",
    "Can't show plugin, component not found.":
      "Não é possível exibir o plugin, componente não encontrado",
    "Block List": "Lista de Blocos",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Algo esta errado no componente '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Algo esta errado com o tipo do componente"
  }
};

export const replaceData = (str, data) => {
  const rgx = /{{\s?(\w+)\s?}}/gm;
  let msg = str;
  msg = msg.replace(rgx, (_, key) => data[key]);
  return msg;
};

export default i18nConfig;
