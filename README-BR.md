# Megadraft [![Build Status](https://secure.travis-ci.org/globocom/megadraft.png?branch=master)](https://travis-ci.org/globocom/megadraft) [![npm version](https://img.shields.io/npm/v/megadraft.svg?style=flat)](https://www.npmjs.com/package/megadraft)

Editor de Texto construido sobre [draft.js](https://github.com/facebook/draft-js) do Facebook.

## Discussão e Suporte

Entre no canal [#megadraft][megadraft-slack] no [Slack do time do DraftJS][draftjs-slack]!

## Demonstração & Documentação

Visite nosso website para uma [demostração](http://globocom.github.io/megadraft/) da ferramenta!

## Desenvolvimento

Para executar o servidor de desenvolvimento e ver exemplos:

```
git clone https://github.com/globocom/megadraft.git
cd megadraft/
make setup
make run
```

> [!IMPORTANT]  
> Nota: tenha certeza que está utilizando uma versão no node < 14

Depois acesse http://localhost:8080/#/ em seu navegador.

Para executar os testes locais:

```
make unit
```

Para executar o lint nos arquivos locais:

```
make lint
```

Para executar os testes e o lint dos arquivos:

```
make test
```

## Dependências

Megadraft depende do [Sass](http://sass-lang.com/) na construção dos artefatos de estilos.

## Importando os estilos padrão

Megadraft vem com um padrão de estilização disponivel onde o pacote foi instalado: node_modules/megadraft/dist/css/megadraft.css.

## Documentação

- [Visão geral & Uso][docs-overview-and-usage]
- [Customização][docs-customization]
- [Entidades Customizadas][docs-custom-entities]
- [Plugins][docs-plugins]
- [Salvando & Carregando][docs-saving-loading]

## Plugins

Acesse a [documentação][docs-plugins] para obter informações sobre a estrutura de um plugin. Para lhe ajudar no processo há um [Gerador de plugin (Yeoman Megadraft)][plugin-generator].

## Contribuindo

O desenvolvimento do Megadraft ocorre abertamente no Github, e nos somos gratos pela comunidade pela contribuição com correção de bugs e melhorias. Leia abaixo para ler como você pode fazer parte.

### [Guia de Contribuição](CONTRIBUTING.md)

Leia nosso [guia de contribuição](CONTRIBUTING.md) para aprender sobre nosso processo de desenvolvimento, como propor uma correção de bug e melhoria, e como efetuar o build e test de suas alterações no Megadraft.

## Licença

Megadraft é licenciada sobre a [licença do MIT](LICENSE)

## Participação de Terceiros

O Website do Megadraft usa uma foto de [Stocksnap.io by Tim Marshall](https://stocksnap.io/photo/K148YZIFJ3) licenciada sobre a [licença CC0](https://stocksnap.io/license).

A Landing Page usa uma foto de [Stocksnap.io by Tim Marshall][Ted Van Pelt](https://flic.kr/p/7Pr94f) licenciada sobre a [licença CC-BY](https://creativecommons.org/licenses/by/2.0/).

[plugin-generator]: https://github.com/globocom/generator-megadraft-plugin
[docs-overview-and-usage]: http://globocom.github.io/megadraft/#/docs/overview
[docs-customization]: http://globocom.github.io/megadraft/#/docs/customization
[docs-custom-entities]: http://globocom.github.io/megadraft/#/docs/custom-entities
[docs-plugins]: http://globocom.github.io/megadraft/#/docs/plugins
[docs-saving-loading]: http://globocom.github.io/megadraft/#/docs/saving-loading
[megadraft-slack]: https://draftjs.slack.com/messages/megadraft/
[draftjs-slack]: https://draftjs.herokuapp.com
