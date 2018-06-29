/*
 * Copyright (c) 2018, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import i18next from "i18next";

i18next
  .init({
    interpolation: {
      escapeValue: false
    },
    lng: "en-US", // "en-US" | "pt-BR"
    resources: {
      "en-US": {
        translations: {
          "Type the link and press enter": "Type the link and press enter",
          "Invalid Link": "Invalid Link",
          "Can't show plugin, component \"{{type}}\" not found.": "Can't show plugin, component \"{{type}}\" not found.",
          "Block List": "Block List"
        }
      },
      "pt-BR": {
        translations: {
          "Type the link and press enter": "Digite o link e pressione enter",
          "Invalid Link": "Link inválido",
          "Can't show plugin, component \"{{type}}\" not found.": "Não é possível exibir o plugin, componente \"{{type}}\" não encontrado",
          "Block List": "Lista de Blocos"
        }
      }
    }
  });

export default i18next;
