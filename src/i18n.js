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
  "es-ES": {
    "Type the link and press enter": "Escribe el enlace y presiona enter",
    "Invalid Link": "Enlace no válido",
    "Can't show plugin, component {{type}} not found.":
      "No se puede mostrar el complemento, no se encontró el componente {{type}}.",
    "Can't show plugin, component not found.":
      "No se puede mostrar el complemento, componente no encontrado.",
    "Block List": "Lista de bloqueos",
    "Something went wrong in component '{{type}}'. {{error}}":
      "Algo salió mal en el componente '{{type}}'. {{error}}",
    "Something went wrong with the component type.":
      "Algo salió mal con el tipo de componente."
  }
};

export const replaceData = (str, data) => {
  const rgx = /{{\s?(\w+)\s?}}/gm;
  let msg = str;
  msg = msg.replace(rgx, (_, key) => data[key]);
  return msg;
};

export default i18nConfig;
