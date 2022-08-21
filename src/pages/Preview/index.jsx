import { useEffect } from "react";
import { useSelector } from "react-redux";
import EditorNav from "../../components/EditorNav/EditorNav";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { selectPage } from "../../store/page/pageSlice";
import "./index.scss";

const Preview = () => {
  const page = useSelector(selectPage);
  let count = 0;

  const bindE = (cli, act, jumpTo) => {
    let c = 1
    if (cli === "single") { 
      c = 1
    }
    if (cli === "double") {
      c = 2
    }
        count++;
        setTimeout(() => {
          if (count === c) {
            if (act === "jump") {
              window.open(`https://${jumpTo}`);
            }
            if (act === "mail") {
              window.location.href = `mailto:${jumpTo}?subject=Subject&body=message%20goes%20here`;          
            }
          }
          count = 0;
        }, 300);

  };

  useEffect(() => {
    const previewer = document.getElementById("previewer");
    previewer.innerHTML = sessionStorage.getItem("html");
    for (let i = 0; i < previewer.childNodes.length; i++) {
      let item = previewer.childNodes[i];
      if (item.getAttribute("contenteditable") == "true") {
        item.setAttribute("contenteditable", "false");
      }
      if (item.dataset.type === "button") {
        if (item.dataset.switch === "true") {
          item.addEventListener("click", function () {
            bindE(item.dataset.cli, item.dataset.act, item.dataset.jumpTo);
          });
        }
      }
    }
  });

  return (
    <div>
      <div className="Container">
        <div id="previewer"></div>
      </div>
    </div>
  );
};

export default Preview;
