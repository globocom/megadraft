/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Megadraft from "../../src/Megadraft";
import {editorStateToJSON, editorStateFromRaw} from "../../src/utils";

import styles from "../App.css";

import Tabs from "material-ui/Tabs/tabs";
import Tab from "material-ui/Tabs/tab";
import FontIcon from "material-ui/FontIcon";


const INITIAL_CONTENT = {
  "entityMap": {
    "0": {
      "type": "LINK",
      "mutability": "MUTABLE",
      "data": {
        "url": "http://mussumipsum.com/"
      }
    }
  },
  "blocks": [
    {
      "key": "ag6qs",
      "text": "Mussum ipsum cacilds, vidis litro abertis",
      "type": "header-two",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "64emu",
      "text": "Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui.",
      "type": "blockquote",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "60itd",
      "text": "Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 0,
          "length": 13,
          "style": "BOLD"
        }
      ],
      "entityRanges": []
    },
    {
      "key": "8a8ui",
      "text": "Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 0,
          "length": 147,
          "style": "ITALIC"
        }
      ],
      "entityRanges": []
    },
    {
      "key": "a48os",
      "text": "Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. ",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "agcpa",
      "text": "Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. ",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "3j9gr",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "8fl4c",
      "text": "Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "meq8",
      "text": "Casamentiss faiz malandris se pirulitá, Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "9f7g0",
      "text": "Lorem ipsum dolor sit amet, consectetuer Ispecialista im mé intende tudis nuam golada, vinho, uiski, carirí, rum da jamaikis, só num pode ser mijis. ",
      "type": "ordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "aji8q",
      "text": "Adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ",
      "type": "ordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "ebvpf",
      "text": "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "type": "ordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "61dr7",
      "text": "Cevadis im ampola pa arma uma pindureta. Nam varius eleifend orci, sed viverra nisl condimentum ut. Donec eget justis enim. Atirei o pau no gatis. Viva Forevis aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Copo furadis é disculpa de babadis, arcu quam euismod magna, bibendum egestas augue arcu ut est. Delegadis gente finis. In sit amet mattis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis. Pellentesque viverra accumsan ipsum elementum gravidis.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "alcbv",
      "text": "Ipsum by Mussum ipsum!",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 22,
          "key": 0
        }
      ]
    },
    {
      "key": "cfhg7",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    }
  ]
};

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    const content = editorStateFromRaw(INITIAL_CONTENT);
    this.state = {
      value: content,
      activeTab: "a"
    };
  }

  handleChange = (value) => {
    this.setState({
      activeTab: value
    });
  };

  onChange(value) {
    this.setState({
      value}
    );
  }

  render() {
    return (
        <Tabs value={this.state.activeTab} onChange={this.handleChange}>
          <Tab label="Editor"
               value="a"
               icon={<FontIcon className="material-icons">mode_edit</FontIcon>}>

            <div>
              <Megadraft
                  editorState={this.state.value}
                  onChange={::this.onChange} />
            </div>
          </Tab>
          <Tab label="Content JSON"
               value="b"
               icon={<FontIcon className="material-icons">code</FontIcon>}>
            <div>
              <textarea
                  value={editorStateToJSON(this.state.value)}
                  readOnly={true}
                  className={styles.jsonpreview}/>
            </div>
          </Tab>
        </Tabs>



    );
  }
}
