import { Component } from "preact";

// Todo 这里太敷衍了


export class ErrorPage extends Component {
  render() {
    return <><style>{/*css*/`#err {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 16px;
      text-wrap: no-wrap;
      transform: translate(-50%, -50%);
    
      &::after {
        content: "! 404 Not Found, You entered a unexisted page !";
      }
    
      background-color: pink;
    }`}
  </style>
  <div id={"err"}>
  </div>
  </>;
  }
}
