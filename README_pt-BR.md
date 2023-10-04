# Megadraft [![Status de Build](https://secure.travis-ci.org/globocom/megadraft.png?branch=master)](https://travis-ci.org/globocom/megadraft) [![Versão do npm](https://img.shields.io/npm/v/megadraft.svg?style=flat)](https://www.npmjs.com/package/megadraft)

Editor de Rich Text construído sobre [draft.js do Facebook](https://github.com/facebook/draft-js).

## Discussão e Suporte

Junte-se ao canal [#megadraft][megadraft-slack] na equipe do [Slack do DraftJS][draftjs-slack]!

## Exemplo prático e Documentação

Confira nosso site com uma [demonstração ao vivo](http://globocom.github.io/megadraft/)!

## Desenvolvimento

Para executar o servidor de desenvolvimento e ver os exemplos, é necessário digitar os seguintes comandos no terminal:

```
git clone https://github.com/globocom/megadraft.git
cd megadraft/
make setup
make run
```

> Nota: certifique-se de que está a utilizar a versão do Node < 14,

Em seguida, visite o link http://localhost:8080/#/ no seu browser.

Para efetuar testes locais:

```
make unit
```

Para verificar arquivos de origem local:

```
make lint
```

Para executar testes e verificação de código:

```
make test
```

## Dependências

O Megadraft depende do [Sass](http://sass-lang.com/) para processar os arquivos de estilo.

## Importando os estilos padrão

O Megadraft vem com um estilo padrão disponível neste local no pacote instalado: node_modules/megadraft/dist/css/megadraft.css.


## Documentação

- [Visão Geral e Uso][docs-overview-and-usage]
- [Customização][docs-customization]
- [Entidades Customizadas][docs-custom-entities]
- [Plugins][docs-plugins]
- [Salvar & Carregar][docs-saving-loading]

## Plugins

Confira a [documentação][docs-plugins] para obter informações sobre a estrutura de plugins.
Para ajudar nesse processo, existe um [Gerador de Plugins Megadraft Yeoman][plugin-generator].

## Contribuindo

O desenvolvimento do Megadraft acontece de forma aberta no GitHub, e somos gratos à comunidade por contribuir com correções de bugs e melhorias. Leia abaixo para aprender como você pode contribuir para melhorar o Megadraft.

### [Guia de Contribuição](CONTRIBUTING.md)

Leia nosso [guia de contribuição](CONTRIBUTING.md) para aprender sobre nosso processo de desenvolvimento, como propor correções de bugs e melhorias, e como criar e testar suas alterações no Megadraft.

## Licença

O Megadraft está licenciado sob a [licença MIT](LICENSE).

## Terceiros

O site do Megadraft utiliza uma imagem de
[Stocksnap.io por Tim Marshall](https://stocksnap.io/photo/K148YZIFJ3) licenciada
sob [licença CC0](https://stocksnap.io/license).

A página de destino utiliza uma imagem do Megadeth de [Ted Van Pelt](https://flic.kr/p/7Pr94f)
licenciada sob [CC-BY](https://creativecommons.org/licenses/by/2.0/).

[plugin-generator]: https://github.com/globocom/generator-megadraft-plugin
[docs-overview-and-usage]: http://globocom.github.io/megadraft/#/docs/overview
[docs-customization]: http://globocom.github.io/megadraft/#/docs/customization
[docs-custom-entities]: http://globocom.github.io/megadraft/#/docs/custom-entities
[docs-plugins]: http://globocom.github.io/megadraft/#/docs/plugins
[docs-saving-loading]: http://globocom.github.io/megadraft/#/docs/saving-loading
[megadraft-slack]: https://draftjs.slack.com/messages/megadraft/
[draftjs-slack]: https://draftjs.herokuapp.com